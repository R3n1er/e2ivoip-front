import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, getClientIdentifier } from "@/lib/api/rate-limit";
import {
  sanitize,
  escapeHtml,
  escapeHtmlMultiline,
  isValidEmail,
  sanitizeHeader,
} from "@/lib/api/email-safety";
import { RGPD_RIGHTS, getRightById, type RgpdRight } from "@/lib/rgpd/rights";
import { createRgpdToken } from "@/lib/api/rgpd-tokens";
import { checkBotId } from "botid/server";

/**
 * Réception des demandes d'exercice de droits RGPD — étape 1/2.
 *
 * Le POST ne déclenche plus immédiatement la notification interne : il
 * crée un jeton de confirmation, envoie un mail au demandeur contenant un
 * lien /api/rgpd/confirm?token=..., et c'est le clic sur ce lien qui
 * consommera le jeton et enverra la notification à l'équipe.
 *
 * Trois raisons à ce double opt-in :
 *  - un bot qui ne contrôle pas la boîte mail qu'il a fournie ne peut
 *    jamais aboutir à un mail interne ;
 *  - le délai légal d'un mois part de la confirmation, ce qui est plus
 *    protecteur pour le demandeur ;
 *  - une adresse invalide ou usurpée est détectée plus tôt (Resend
 *    remonte les bounces).
 *
 * BotID (Vercel) bloque les requêtes automatisées avant tout envoi de
 * mail — invisible pour l'utilisateur.
 */

// Une demande d'exercice de droits est un acte rare : un quota serré suffit
// et limite l'usage de la route comme relais d'emails.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const MIN_SUBMIT_DELAY_MS = 2500;
const FORM_INTENT_HEADER = "x-e2i-form";
const FORM_INTENT_VALUE = "rgpd-rights";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const DELAI_LEGAL = "un mois";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
}

const FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254, // RFC 5321
  phone: 30,
  details: 2000,
  pageUrl: 500,
  company: 120,
  turnstileToken: 4096,
} as const;

/** Nombre maximum d'identifiants de droits acceptés dans un envoi. */
const MAX_REQUEST_TYPES = RGPD_RIGHTS.length;

export interface RgpdDemandePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  requestTypes: string[];
  details?: string;
  pageUrl?: string;
  company?: string;
  formStartedAt?: number;
  turnstileToken?: string;
}

function json(
  body: Record<string, unknown>,
  init?: { status?: number; headers?: HeadersInit }
) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      Vary: "Sec-Fetch-Site, Origin",
      ...init?.headers,
    },
  });
}

function hasAcceptedContentType(request: Request): boolean {
  return request.headers
    .get("content-type")
    ?.toLowerCase()
    .startsWith("application/json") === true;
}

function hasAcceptedBodySize(request: Request): boolean {
  const value = request.headers.get("content-length");
  if (!value) return true;
  const length = Number(value);
  return Number.isFinite(length) && length <= MAX_BODY_BYTES;
}

function hasSameOriginSignal(request: Request): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function hasFormIntentHeader(request: Request): boolean {
  return request.headers.get(FORM_INTENT_HEADER) === FORM_INTENT_VALUE;
}

function hasHumanTimingSignal(value: unknown): boolean {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  return Date.now() - value >= MIN_SUBMIT_DELAY_MS;
}

async function parseJsonBody(
  request: Request
): Promise<Partial<RgpdDemandePayload> | "too-large" | null> {
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return "too-large";
    }
    return JSON.parse(raw) as Partial<RgpdDemandePayload>;
  } catch {
    return null;
  }
}

async function verifyTurnstileToken(
  token: string,
  request: Request
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const ip = getClientIdentifier(request);
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip && ip !== "unknown") formData.append("remoteip", ip);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) return false;

    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error(
      "[rgpd/demande] Turnstile failed:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

function resolveRights(value: unknown): RgpdRight[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  if (value.length > MAX_REQUEST_TYPES) return null;

  const rights: RgpdRight[] = [];
  for (const id of value) {
    if (typeof id !== "string") return null;
    const right = getRightById(id.trim());
    if (!right) return null;
    if (!rights.includes(right)) rights.push(right);
  }
  return rights;
}

/**
 * Construit l'URL absolue du lien de confirmation. En production, on s'appuie
 * sur NEXT_PUBLIC_SITE_URL ; en test/dev, on déduit depuis l'origine de la
 * requête — mais celle-ci peut être 'null' pour des appels Next en interne.
 */
function buildConfirmationLink(token: string, request: Request): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  return `${base.replace(/\/$/, "")}/api/rgpd/confirm?token=${encodeURIComponent(token)}`;
}

export async function POST(request: Request) {
  try {
    // 1. BotID (Vercel). Invisible pour l'utilisateur, géré côté serveur.
    //    En l'absence de déploiement Vercel (tests, dev local), la fonction
    //    peut renvoyer { isBot: false } par défaut : on n'ajoute pas de
    //    bypass explicite — c'est au mock de test d'en décider.
    const botCheck = await checkBotId();
    if (botCheck.isBot) {
      return json(
        { error: "Activité suspecte détectée. Réessayez." },
        { status: 403 }
      );
    }

    if (!hasSameOriginSignal(request) || !hasFormIntentHeader(request)) {
      return json(
        { error: "La demande ne peut être envoyée que depuis le formulaire." },
        { status: 403 }
      );
    }

    if (!hasAcceptedContentType(request)) {
      return json(
        { error: "Format de requête non accepté." },
        { status: 415 }
      );
    }

    if (!hasAcceptedBodySize(request)) {
      return json(
        { error: "La demande est trop volumineuse." },
        { status: 413 }
      );
    }

    const { allowed, retryAfter } = checkRateLimit(
      getClientIdentifier(request),
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS
    );
    if (!allowed) {
      return json(
        { error: "Trop de demandes. Réessayez dans quelques minutes." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const body = await parseJsonBody(request);
    if (body === "too-large") {
      return json(
        { error: "La demande est trop volumineuse." },
        { status: 413 }
      );
    }

    if (!body) {
      return json(
        { error: "Le contenu de la demande est illisible." },
        { status: 400 }
      );
    }

    const firstName = sanitize(body.firstName, FIELD_LIMITS.firstName);
    const lastName = sanitize(body.lastName, FIELD_LIMITS.lastName);
    const email = sanitize(body.email, FIELD_LIMITS.email);
    const phone = sanitize(body.phone, FIELD_LIMITS.phone);
    const details = sanitize(body.details, FIELD_LIMITS.details);
    const pageUrl = sanitize(body.pageUrl, FIELD_LIMITS.pageUrl);
    const company = sanitize(body.company, FIELD_LIMITS.company);
    const turnstileToken = sanitize(
      body.turnstileToken,
      FIELD_LIMITS.turnstileToken
    );

    if (company || !hasHumanTimingSignal(body.formStartedAt)) {
      return json(
        { error: "Votre demande n'a pas pu être validée. Réessayez." },
        { status: 400 }
      );
    }

    if (!firstName || !lastName || !email) {
      return json(
        { error: "Prénom, nom et email sont requis." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return json(
        { error: "L'adresse email n'est pas valide." },
        { status: 400 }
      );
    }

    const rights = resolveRights(body.requestTypes);
    if (!rights) {
      return json(
        { error: "Sélectionnez au moins un droit à exercer." },
        { status: 400 }
      );
    }

    const turnstileOk = await verifyTurnstileToken(turnstileToken, request);
    if (!turnstileOk) {
      return json(
        { error: "La vérification anti-robot a échoué. Réessayez." },
        { status: 400 }
      );
    }

    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const from = requireEnv("RESEND_FROM_EMAIL");

    // Crée le jeton de confirmation : c'est cet identifiant qui sera inséré
    // dans le mail, jamais la donnée brute.
    const { token, expiresAt } = createRgpdToken({
      firstName,
      lastName,
      email,
      phone,
      requestTypes: rights.map((r) => r.id),
      details,
      pageUrl,
    });

    const confirmationLink = buildConfirmationLink(token, request);
    const expiresAtFormatted = new Date(expiresAt).toLocaleString("fr-FR");
    const rightsList = rights.map((r) => `${r.label} (${r.article})`);

    const ackSubject = sanitizeHeader(
      "Confirmez votre demande d'exercice de droits — E2I VoIP"
    );

    const ackHtml = `
      <h2>Confirmez votre demande d'exercice de droits</h2>
      <p>Bonjour ${escapeHtml(firstName)},</p>
      <p>Pour que votre demande d'exercice de droits soit enregistrée
      et transmise à notre équipe, merci de cliquer sur le lien ci-dessous.
      Ce lien expire le ${escapeHtml(expiresAtFormatted)}.</p>
      <p style="margin: 24px 0;">
        <a href="${escapeHtml(confirmationLink)}"
           style="display:inline-block;background:#dc2626;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
          Confirmer ma demande
        </a>
      </p>
      <p>Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre
      navigateur :</p>
      <p style="word-break:break-all;font-family:monospace;font-size:12px;">
        ${escapeHtml(confirmationLink)}
      </p>
      <p>Cette confirmation garantit que vous êtes bien à l'origine de la
      démarche. Sans elle, nous ne pouvons pas traiter votre demande.</p>
      <p>Conformément au RGPD, une réponse vous sera adressée dans un délai
      d'${DELAI_LEGAL} à compter de la réception de votre confirmation.
      Nous pouvons être amenés à vous demander un justificatif d'identité
      avant de vous communiquer des données personnelles.</p>
      <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont
      pas respectés, vous pouvez saisir la CNIL (www.cnil.fr).</p>
      <hr />
      <p><strong>Rappel de votre demande :</strong></p>
      <ul>
        ${rightsList.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
      </ul>
      ${details ? `<p><strong>Précisions :</strong><br />${escapeHtmlMultiline(details)}</p>` : ""}
      <p>E2I ASSISTANCE</p>
    `;

    const ackText = `
Confirmez votre demande d'exercice de droits

Bonjour ${firstName},

Pour que votre demande soit enregistrée et transmise à notre équipe, merci
de cliquer sur le lien ci-dessous. Il expire le ${expiresAtFormatted}.

${confirmationLink}

Cette confirmation garantit que vous êtes bien à l'origine de la démarche.
Sans elle, nous ne pouvons pas traiter votre demande.

Conformément au RGPD, une réponse vous sera adressée dans un délai
d'${DELAI_LEGAL} à compter de la réception de votre confirmation.
Nous pouvons être amenés à vous demander un justificatif d'identité
avant de vous communiquer des données personnelles.

Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
respectés, vous pouvez saisir la CNIL (www.cnil.fr).

Rappel de votre demande :
${rightsList.map((r) => `- ${r}`).join("\n")}
${details ? `\nPrécisions :\n${details}\n` : ""}

E2I ASSISTANCE
    `.trim();

    // Le mail interne ne part plus ici : il attend la confirmation explicite
    // (étape 2 traitée par /api/rgpd/confirm).
    // En cas d'échec du mail de confirmation, on renvoie 500 — sans mail
    // reçu, le demandeur ne peut pas confirmer et la demande n'aboutit pas.
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: ackSubject,
        html: ackHtml,
        text: ackText,
      });
    } catch (e) {
      console.error(
        "[rgpd/demande] mail de confirmation échoué:",
        e instanceof Error ? e.message : e
      );
      return json(
        { error: "L'envoi de votre demande a échoué. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return json({ ok: true });
  } catch (e: unknown) {
    console.error("[rgpd/demande]", e instanceof Error ? e.message : e);
    return json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
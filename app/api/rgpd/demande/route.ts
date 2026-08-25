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

/**
 * Réception des demandes d'exercice de droits RGPD.
 *
 * Deux envois de statut différent :
 *  - la notification interne est bloquante — si elle échoue, la demande n'a
 *    atteint personne et le visiteur doit le savoir pour recommencer ;
 *  - l'accusé de réception au demandeur est best-effort — son échec ne doit
 *    pas laisser croire que la demande est perdue alors qu'elle est arrivée.
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

/**
 * Convertit les identifiants reçus en droits connus.
 * Retourne `null` dès qu'un identifiant est inconnu : mieux vaut refuser la
 * demande que d'en traiter une version amputée à l'insu du demandeur.
 */
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

export async function POST(request: Request) {
  try {
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
        { error: "Votre demande n’a pas pu être validée. Réessayez." },
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
        { error: "L’adresse email n’est pas valide." },
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
    const to = requireEnv("RGPD_EMAIL_TO");

    const receivedAt = new Date();
    const rightsList = rights.map((r) => `${r.label} (${r.article})`);
    const identite = `${firstName} ${lastName}`;

    const internalSubject = sanitizeHeader(
      `[RGPD] Demande d’exercice de droits — ${identite}`
    );

    const internalHtml = `
      <h2>Demande d’exercice de droits RGPD</h2>
      <p><strong>Demandeur :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "non renseigné"}</p>
      <p><strong>Reçue le :</strong> ${receivedAt.toLocaleString("fr-FR")}</p>
      <hr />
      <p><strong>Droits invoqués :</strong></p>
      <ul>
        ${rightsList.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
      </ul>
      ${details ? `<p><strong>Précisions :</strong><br />${escapeHtmlMultiline(details)}</p>` : ""}
      <hr />
      <p><strong>Source :</strong> ${escapeHtml(pageUrl) || "exercer-mes-droits"}</p>
      <p><em>Délai de réponse légal : ${DELAI_LEGAL} à compter de la réception.
      Vérifiez l’identité du demandeur avant toute communication de données.</em></p>
    `;

    const internalText = `
Demande d’exercice de droits RGPD

Demandeur : ${firstName} ${lastName}
Email : ${email}
Téléphone : ${phone || "non renseigné"}
Reçue le : ${receivedAt.toLocaleString("fr-FR")}

Droits invoqués :
${rightsList.map((r) => `- ${r}`).join("\n")}
${details ? `\nPrécisions :\n${details}\n` : ""}
Source : ${pageUrl || "exercer-mes-droits"}

Délai de réponse légal : ${DELAI_LEGAL} à compter de la réception.
Vérifiez l’identité du demandeur avant toute communication de données.
    `.trim();

    const ackSubject = sanitizeHeader(
      "Votre demande d’exercice de droits — E2I VoIP"
    );

    const ackHtml = `
      <h2>Nous avons bien reçu votre demande</h2>
      <p>Bonjour ${escapeHtml(firstName)},</p>
      <p>Votre demande d’exercice de droits a été enregistrée le
      ${escapeHtml(receivedAt.toLocaleDateString("fr-FR"))}. Elle porte sur :</p>
      <ul>
        ${rightsList.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
      </ul>
      <p>Conformément au RGPD, une réponse vous sera adressée dans un délai
      d’${DELAI_LEGAL} à compter de cette date. Nous pouvons être amenés à
      vous demander un justificatif d’identité avant de vous communiquer des
      données personnelles.</p>
      <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont
      pas respectés, vous pouvez saisir la CNIL (www.cnil.fr).</p>
      <p>E2I ASSISTANCE</p>
    `;

    const ackText = `
Nous avons bien reçu votre demande

Bonjour ${firstName},

Votre demande d’exercice de droits a été enregistrée le ${receivedAt.toLocaleDateString("fr-FR")}. Elle porte sur :
${rightsList.map((r) => `- ${r}`).join("\n")}

Conformément au RGPD, une réponse vous sera adressée dans un délai d’${DELAI_LEGAL} à compter de cette date. Nous pouvons être amenés à vous demander un justificatif d’identité avant de vous communiquer des données personnelles.

Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (www.cnil.fr).

E2I ASSISTANCE
    `.trim();

    const [internalResult, ackResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: internalSubject,
        html: internalHtml,
        text: internalText,
      }),
      resend.emails.send({
        from,
        to: email,
        subject: ackSubject,
        html: ackHtml,
        text: ackText,
      }),
    ]);

    if (internalResult.status === "rejected") {
      console.error("[rgpd/demande] Resend (interne) failed:", internalResult.reason);
      return json(
        { error: "L’envoi de votre demande a échoué. Veuillez réessayer." },
        { status: 500 }
      );
    }

    if (ackResult.status === "rejected") {
      // La demande est bien arrivée : on confirme au visiteur, mais l'absence
      // d'accusé de réception doit rester visible en logs.
      console.error("[rgpd/demande] Resend (accusé) failed:", ackResult.reason);
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

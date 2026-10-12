import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, getClientIdentifier } from "@/lib/api/rate-limit";
import {
  escapeHtml,
  escapeHtmlMultiline,
  sanitizeHeader,
} from "@/lib/api/email-safety";
import { getRightById } from "@/lib/rgpd/rights";
import { consumeRgpdToken, wasAlreadyConsumed } from "@/lib/api/rgpd-tokens";
import { checkBotId } from "botid/server";

/**
 * Confirmation d'une demande d'exercice de droits RGPD — étape 2/2.
 *
 * Le visiteur clique un lien reçu par mail ; on consomme le jeton, on
 * envoie enfin la notification interne + l'accusé de réception final.
 *
 * Si le jeton est inconnu / expiré / déjà consommé, on redirige vers la
 * page de statut sans rien envoyer. C'est idempotent : un second clic
 * renvoie `status=already` sans ré-envoyer les mails.
 *
 * Anti-leak : les erreurs sont loggées sans le token, pour qu'un dump de
 * logs ne permette pas de rejouer une confirmation.
 */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const DELAI_LEGAL = "un mois";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
}

/**
 * Construit l'URL de redirection vers la page de statut. On préfère une
 * page serveur (Next.js) à un simple composant client, pour pouvoir
 * afficher le bon message sans JavaScript et garder une URL canonique.
 */
function statusRedirect(status: "invalid" | "expired" | "confirmed" | "already"): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.e2i-voip.com";
  return `${base.replace(/\/$/, "")}/juridique/exercer-mes-droits?status=${status}`;
}

function redirectTo(target: string): NextResponse {
  return NextResponse.redirect(target, 302);
}

export async function GET(request: Request) {
  let tokenForLog: string | null = null;

  try {
    // BotID bloque les scans de liens par les bots à la recherche de
    // tokens valides. Sans cette garde, un script pourrait épuiser le
    // stock de tokens en GET sur /api/rgpd/confirm.
    const botCheck = await checkBotId();
    if (botCheck.isBot) {
      return redirectTo(statusRedirect("invalid"));
    }

    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return redirectTo(statusRedirect("invalid"));
    }
    tokenForLog = token;

    // Rate-limit par IP sur la confirmation : un attaquant qui aurait
    // récupéré une URL valide ne peut pas l'utiliser en boucle depuis
    // la même IP.
    const { allowed, retryAfter } = checkRateLimit(
      getClientIdentifier(request),
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS
    );
    if (!allowed) {
      return new NextResponse("Trop de tentatives.", {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      });
    }

    const entry = consumeRgpdToken(token);
    if (!entry) {
      // Soit le token est inconnu, soit il a déjà été consommé. On
      // distingue les deux pour offrir un message plus clair au visiteur.
      if (wasAlreadyConsumed(token)) {
        return redirectTo(statusRedirect("already"));
      }
      return redirectTo(statusRedirect("invalid"));
    }

    if (entry.expired) {
      return redirectTo(statusRedirect("expired"));
    }

    const rights = entry.payload.requestTypes
      .map((id) => getRightById(id))
      .filter((r): r is NonNullable<typeof r> => Boolean(r));

    if (rights.length === 0) {
      // Filet de sécurité : un payload ne devrait jamais avoir des droits
      // inconnus, mais si c'est le cas, on préfère signaler l'échec.
      console.error("[rgpd/confirm] payload sans droit reconnu");
      return redirectTo(statusRedirect("invalid"));
    }

    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const from = requireEnv("RESEND_FROM_EMAIL");
    const to = requireEnv("RGPD_EMAIL_TO");

    const receivedAt = new Date();
    const rightsList = rights.map((r) => `${r.label} (${r.article})`);
    const identite = `${entry.payload.firstName} ${entry.payload.lastName}`;

    const internalSubject = sanitizeHeader(
      `[RGPD] Demande d'exercice de droits — ${identite}`
    );

    const internalHtml = `
      <h2>Demande d'exercice de droits RGPD</h2>
      <p><strong>Demandeur :</strong> ${escapeHtml(entry.payload.firstName)} ${escapeHtml(entry.payload.lastName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(entry.payload.email)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(entry.payload.phone ?? "") || "non renseigné"}</p>
      <p><strong>Confirmée le :</strong> ${escapeHtml(receivedAt.toLocaleString("fr-FR"))}</p>
      <hr />
      <p><strong>Droits invoqués :</strong></p>
      <ul>
        ${rightsList.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
      </ul>
      ${entry.payload.details ? `<p><strong>Précisions :</strong><br />${escapeHtmlMultiline(entry.payload.details)}</p>` : ""}
      <hr />
      <p><strong>Source :</strong> ${escapeHtml(entry.payload.pageUrl ?? "") || "exercer-mes-droits"}</p>
      <p><em>Délai de réponse légal : ${DELAI_LEGAL} à compter de la confirmation.
      Vérifiez l'identité du demandeur avant toute communication de données.</em></p>
    `;

    const internalText = `
Demande d'exercice de droits RGPD

Demandeur : ${entry.payload.firstName} ${entry.payload.lastName}
Email : ${entry.payload.email}
Téléphone : ${entry.payload.phone || "non renseigné"}
Confirmée le : ${receivedAt.toLocaleString("fr-FR")}

Droits invoqués :
${rightsList.map((r) => `- ${r}`).join("\n")}
${entry.payload.details ? `\nPrécisions :\n${entry.payload.details}\n` : ""}
Source : ${entry.payload.pageUrl || "exercer-mes-droits"}

Délai de réponse légal : ${DELAI_LEGAL} à compter de la confirmation.
Vérifiez l'identité du demandeur avant toute communication de données.
    `.trim();

    const ackSubject = sanitizeHeader(
      "Votre demande d'exercice de droits — E2I VoIP"
    );

    const ackHtml = `
      <h2>Nous avons bien reçu votre demande</h2>
      <p>Bonjour ${escapeHtml(entry.payload.firstName)},</p>
      <p>Votre demande d'exercice de droits a été confirmée le
      ${escapeHtml(receivedAt.toLocaleDateString("fr-FR"))}. Elle porte sur :</p>
      <ul>
        ${rightsList.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
      </ul>
      <p>Conformément au RGPD, une réponse vous sera adressée dans un délai
      d'${DELAI_LEGAL} à compter de cette date. Nous pouvons être amenés à
      vous demander un justificatif d'identité avant de vous communiquer des
      données personnelles.</p>
      <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont
      pas respectés, vous pouvez saisir la CNIL (www.cnil.fr).</p>
      <p>E2I ASSISTANCE</p>
    `;

    const ackText = `
Nous avons bien reçu votre demande

Bonjour ${entry.payload.firstName},

Votre demande d'exercice de droits a été confirmée le ${receivedAt.toLocaleDateString("fr-FR")}. Elle porte sur :
${rightsList.map((r) => `- ${r}`).join("\n")}

Conformément au RGPD, une réponse vous sera adressée dans un délai d'${DELAI_LEGAL} à compter de cette date. Nous pouvons être amenés à vous demander un justificatif d'identité avant de vous communiquer des données personnelles.

Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (www.cnil.fr).

E2I ASSISTANCE
    `.trim();

    const [internalResult, ackResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: entry.payload.email,
        subject: internalSubject,
        html: internalHtml,
        text: internalText,
      }),
      resend.emails.send({
        from,
        to: entry.payload.email,
        subject: ackSubject,
        html: ackHtml,
        text: ackText,
      }),
    ]);

    if (internalResult.status === "rejected") {
      console.error(
        "[rgpd/confirm] mail interne échoué:",
        internalResult.reason instanceof Error
          ? internalResult.reason.message
          : internalResult.reason
      );
      // Le visiteur a confirmé : on lui confirme aussi côté UX même si
      // l'envoi interne a échoué, mais on note l'incident pour Alban.
      return redirectTo(statusRedirect("invalid"));
    }

    if (ackResult.status === "rejected") {
      console.error(
        "[rgpd/confirm] mail d'accusé échoué:",
        ackResult.reason instanceof Error
          ? ackResult.reason.message
          : ackResult.reason
      );
    }

    return redirectTo(statusRedirect("confirmed"));
  } catch (e: unknown) {
    // Anti-leak : on ne loggue jamais le token. Le visiteur tombe sur
    // un message neutre ; Alban voit la cause en console.
    console.error(
      "[rgpd/confirm] erreur:",
      e instanceof Error ? e.message : e,
      "token présent:",
      Boolean(tokenForLog)
    );
    return redirectTo(statusRedirect("invalid"));
  }
}
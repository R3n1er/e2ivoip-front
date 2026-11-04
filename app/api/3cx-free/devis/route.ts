import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/api/rate-limit";
import {
  sanitize,
  escapeHtml,
  escapeHtmlMultiline,
  isValidEmail,
  sanitizeHeader,
} from "@/lib/api/email-safety";
import {
  verifierSiret,
  type VerificationSiret,
} from "@/lib/devis-3cx-free/siret";
import {
  EN_TETE_FORMULAIRE,
  TEXTE_CONSENTEMENT_RGPD,
  estBesoinNumeros,
  libelleBesoin,
  type BesoinNumeros,
} from "@/lib/devis-3cx-free/formulaire";

/**
 * Demande de devis 3CX Free.
 *
 * Arbitrages Alban (2026-11-03) :
 *  - anti-spam invisible : BotID (Vercel), limite d'envois, champ piège
 *    et délai minimal de saisie ;
 *  - le site vérifie lui-même le SIRET (API de l'État) et envoie l'accusé
 *    Resend : le client reçoit sa réponse même si n8n est en panne ;
 *  - le lead part vers un webhook n8n protégé par une clé secrète. n8n
 *    trie avec le modèle clef (Ollama Cloud) et prévient l'équipe
 *    commerciale ;
 *  - un SIRET fermé, introuvable ou non vérifié ne bloque pas l'envoi :
 *    il est signalé dans `anomalies`.
 *
 * Si n8n ne répond pas, le lead part par mail à l'équipe commerciale
 * (DEVIS_COMMERCIAL_EMAIL) pour qu'aucune demande ne soit perdue.
 */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const MIN_SUBMIT_DELAY_MS = 2500;
const WEBHOOK_TIMEOUT_MS = 8000;
const MAX_NOMBRE_NUMEROS = 999;

const LIMITES = {
  nom: 100,
  prenom: 100,
  societe: 160,
  siret: 20,
  telephone: 30,
  email: 254,
  message: 3000,
  pageUrl: 500,
  website: 200,
} as const;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
}

function json(body: Record<string, unknown>, init?: { status?: number; headers?: HeadersInit }) {
  return NextResponse.json(body, {
    ...init,
    headers: { Vary: "Sec-Fetch-Site, Origin", ...init?.headers },
  });
}

function origineAutorisee(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function lireCorps(request: Request): Promise<Record<string, unknown> | "trop-gros" | null> {
  try {
    const brut = await request.text();
    if (new TextEncoder().encode(brut).byteLength > MAX_BODY_BYTES) return "trop-gros";
    const parsed = JSON.parse(brut);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function lireNombreNumeros(v: unknown): number | null {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1 || n > MAX_NOMBRE_NUMEROS) return null;
  return n;
}

const ANOMALIE_SIRET: Partial<Record<VerificationSiret["statut"], string>> = {
  ferme: "siret-ferme",
  introuvable: "siret-introuvable",
  "format-invalide": "siret-format-invalide",
  "non-verifie": "siret-non-verifie",
};

export interface LeadDevis3cxFree {
  source: "site-e2ivoip/3cx-free";
  soumisLe: string;
  contact: {
    nom: string;
    prenom: string;
    societe: string;
    telephoneFixe: string;
    telephoneMobile: string;
    email: string;
  };
  besoin: { numeros: BesoinNumeros; nombreNumeros: number | null };
  message: string;
  consentementRgpd: { accepte: true; texte: string; horodatage: string };
  siret: VerificationSiret;
  anomalies: string[];
  pageUrl: string;
}

async function envoyerAN8n(lead: LeadDevis3cxFree): Promise<boolean> {
  const url = process.env.N8N_DEVIS_3CX_FREE_WEBHOOK_URL;
  const secret = process.env.N8N_DEVIS_3CX_FREE_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error("[3cx-free/devis] webhook n8n non configuré");
    return false;
  }
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), WEBHOOK_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-E2I-Webhook-Secret": secret,
      },
      body: JSON.stringify(lead),
      signal: controleur.signal,
    });
    if (!res.ok) console.error("[3cx-free/devis] n8n a répondu", res.status);
    return res.ok;
  } catch (e) {
    console.error("[3cx-free/devis] n8n injoignable:", e instanceof Error ? e.message : e);
    return false;
  } finally {
    clearTimeout(minuteur);
  }
}

function texteLead(lead: LeadDevis3cxFree): string {
  const c = lead.contact;
  return [
    "Nouvelle demande de devis 3CX Free (n8n indisponible : lead transmis par mail de secours)",
    "",
    `Société : ${c.societe}`,
    `Contact : ${c.prenom} ${c.nom}`,
    `E-mail : ${c.email}`,
    `Mobile : ${c.telephoneMobile}`,
    `Fixe : ${c.telephoneFixe || "non renseigné"}`,
    `SIRET : ${lead.siret.siret || "non renseigné"} (${lead.siret.statut}${lead.siret.raisonSociale ? `, ${lead.siret.raisonSociale}` : ""})`,
    `Numéros : ${libelleBesoin(lead.besoin.numeros)}${lead.besoin.nombreNumeros ? ` (${lead.besoin.nombreNumeros})` : ""}`,
    `Anomalies : ${lead.anomalies.length ? lead.anomalies.join(", ") : "aucune"}`,
    "",
    "Message :",
    lead.message,
    "",
    `Consentement RGPD : « ${lead.consentementRgpd.texte} » (${lead.consentementRgpd.horodatage})`,
    `Page : ${lead.pageUrl || "inconnue"}`,
  ].join("\n");
}

function accuseReception(lead: LeadDevis3cxFree) {
  const c = lead.contact;
  const besoin = libelleBesoin(lead.besoin.numeros);
  const subject = sanitizeHeader("E2I VoIP — Votre demande 3CX Free a bien été reçue");
  const html = `
    <p>Bonjour ${escapeHtml(c.prenom)},</p>
    <p>Nous avons bien reçu votre demande de devis 3CX Free pour ${escapeHtml(c.societe)}.
    Un conseiller E2I VoIP vous contactera pour faire le point sur vos besoins en téléphonie et préparer votre devis.</p>
    <p><strong>Votre besoin en téléphonie :</strong></p>
    <ul>
      <li>Numéros de téléphone : ${escapeHtml(besoin)}${lead.besoin.nombreNumeros ? ` (${lead.besoin.nombreNumeros})` : ""}</li>
      <li>Téléphone mobile : ${escapeHtml(c.telephoneMobile)}</li>
    </ul>
    <p><strong>Votre message :</strong><br />${escapeHtmlMultiline(lead.message)}</p>
    <p>E2I VoIP</p>
  `;
  const text = `Bonjour ${c.prenom},

Nous avons bien reçu votre demande de devis 3CX Free pour ${c.societe}.
Un conseiller E2I VoIP vous contactera pour faire le point sur vos besoins en téléphonie et préparer votre devis.

Votre besoin en téléphonie :
- Numéros de téléphone : ${besoin}${lead.besoin.nombreNumeros ? ` (${lead.besoin.nombreNumeros})` : ""}
- Téléphone mobile : ${c.telephoneMobile}

Votre message :
${lead.message}

E2I VoIP`;
  return { subject, html, text };
}

export async function POST(request: Request) {
  try {
    const botCheck = await checkBotId();
    if (botCheck.isBot) {
      return json({ error: "Votre envoi n’a pas pu être vérifié. Veuillez réessayer." }, { status: 403 });
    }

    if (!origineAutorisee(request) || request.headers.get("x-e2i-form") !== EN_TETE_FORMULAIRE) {
      return json({ error: "Veuillez envoyer votre demande depuis le formulaire 3CX Free." }, { status: 403 });
    }

    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ error: "Le format de votre demande n’est pas accepté. Veuillez utiliser le formulaire 3CX Free." }, { status: 415 });
    }

    const { allowed, retryAfter } = checkRateLimit(
      `3cx-free-devis:${getClientIdentifier(request)}`,
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS,
    );
    if (!allowed) {
      return json(
        { error: "Vous avez atteint la limite d’envoi. Veuillez réessayer plus tard." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }

    const corps = await lireCorps(request);
    if (corps === "trop-gros") {
      return json({ error: "Votre demande est trop longue. Veuillez raccourcir votre message." }, { status: 413 });
    }
    if (!corps) {
      return json({ error: "Votre demande n’a pas pu être lue. Veuillez réessayer depuis le formulaire 3CX Free." }, { status: 400 });
    }

    const website = sanitize(corps.website, LIMITES.website);
    const debut = corps.formStartedAt;
    const delaiHumain =
      typeof debut === "number" && Number.isFinite(debut) && Date.now() - debut >= MIN_SUBMIT_DELAY_MS;
    if (website || !delaiHumain) {
      return json({ error: "Votre demande n’a pas pu être validée. Veuillez réessayer." }, { status: 400 });
    }

    const nom = sanitize(corps.nom, LIMITES.nom);
    const prenom = sanitize(corps.prenom, LIMITES.prenom);
    const societe = sanitize(corps.societe, LIMITES.societe);
    const siretSaisi = sanitize(corps.siret, LIMITES.siret);
    const telephoneFixe = sanitize(corps.telephoneFixe, LIMITES.telephone);
    const telephoneMobile = sanitize(corps.telephoneMobile, LIMITES.telephone);
    const email = sanitize(corps.email, LIMITES.email);
    const message = sanitize(corps.message, LIMITES.message);
    const pageUrl = sanitize(corps.pageUrl, LIMITES.pageUrl);

    if (!nom || !prenom || !societe || !telephoneMobile || !email || !message) {
      return json(
        { error: "Veuillez renseigner votre nom, votre prénom, votre société, votre téléphone mobile, votre e-mail et votre message." },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return json({ error: "Veuillez saisir une adresse e-mail valide." }, { status: 400 });
    }
    if (corps.consentementRgpd !== true) {
      return json({ error: "Pour envoyer votre demande, acceptez le traitement de vos données." }, { status: 400 });
    }
    if (!estBesoinNumeros(corps.besoinNumeros)) {
      return json({ error: "Sélectionnez votre besoin en numéros de téléphone." }, { status: 400 });
    }

    const siret = await verifierSiret(siretSaisi);
    const anomalie = ANOMALIE_SIRET[siret.statut];
    const maintenant = new Date().toISOString();

    const lead: LeadDevis3cxFree = {
      source: "site-e2ivoip/3cx-free",
      soumisLe: maintenant,
      contact: { nom, prenom, societe, telephoneFixe, telephoneMobile, email },
      besoin: { numeros: corps.besoinNumeros, nombreNumeros: lireNombreNumeros(corps.nombreNumeros) },
      message,
      consentementRgpd: { accepte: true, texte: TEXTE_CONSENTEMENT_RGPD, horodatage: maintenant },
      siret,
      anomalies: anomalie ? [anomalie] : [],
      pageUrl,
    };

    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const from = requireEnv("RESEND_FROM_EMAIL");

    // 1. Le lead d'abord : c'est lui qui ne doit jamais être perdu.
    let leadTransmis = await envoyerAN8n(lead);
    if (!leadTransmis) {
      try {
        await resend.emails.send({
          from,
          to: requireEnv("DEVIS_COMMERCIAL_EMAIL"),
          replyTo: email,
          subject: sanitizeHeader(`[Secours n8n] Devis 3CX Free — ${societe}`),
          text: texteLead(lead),
        });
        leadTransmis = true;
      } catch (e) {
        console.error("[3cx-free/devis] mail de secours échoué:", e instanceof Error ? e.message : e);
      }
    }
    if (!leadTransmis) {
      return json({ error: "Votre demande n’a pas pu être envoyée. Veuillez réessayer." }, { status: 500 });
    }

    // 2. L'accusé client : utile mais non bloquant, le lead est déjà parti.
    try {
      await resend.emails.send({ from, to: email, ...accuseReception(lead) });
    } catch (e) {
      console.error("[3cx-free/devis] accusé client échoué:", e instanceof Error ? e.message : e);
    }

    return json({ ok: true });
  } catch (e) {
    console.error("[3cx-free/devis]", e instanceof Error ? e.message : e);
    return json({ error: "Un problème empêche l’envoi de votre demande. Veuillez réessayer." }, { status: 500 });
  }
}

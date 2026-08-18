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
import { StudioDemoCategory, getDemoById } from "@/lib/studio-demos";

const HS_BASE = "https://api.hubapi.com";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
}

/**
 * Longueurs maximales acceptées par champ. Le corps de requête n'est pas
 * validé à l'exécution (le cast TypeScript ne protège de rien) : sans
 * plafond, un POST forgé peut pousser plusieurs Mo vers Resend et HubSpot.
 */
const FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254, // RFC 5321
  phone: 30,
  company: 200,
  category: 50,
  demoId: 100,
  customScript: 5000,
  finalScript: 5000,
  tone: 50,
  voice: 50,
  language: 50,
  music: 50,
  notes: 2000,
  pageUrl: 500,
} as const;

function normalizePhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

async function findContactByEmail(token: string, email: string) {
  const res = await fetch(`${HS_BASE}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filterGroups: [
        { filters: [{ propertyName: "email", operator: "EQ", value: email }] },
      ],
      properties: ["firstname", "lastname", "email", "phone", "mobilephone", "company"],
      limit: 1,
    }),
  });
  if (!res.ok) throw new Error(`HubSpot search failed: ${res.status}`);
  const data = await res.json();
  return data.results?.[0] || null;
}

async function upsertContact(
  token: string,
  props: Record<string, string>,
  id?: string
) {
  const url = id
    ? `${HS_BASE}/crm/v3/objects/contacts/${id}`
    : `${HS_BASE}/crm/v3/objects/contacts`;
  const method = id ? "PATCH" : "POST";
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties: props }),
  });
  if (!res.ok) throw new Error(`HubSpot contact upsert failed: ${res.status}`);
  return res.json();
}

async function createNoteForContact(
  token: string,
  contactId: string,
  title: string,
  body: string
) {
  const noteRes = await fetch(`${HS_BASE}/crm/v3/objects/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        hs_note_body: `**${title}**\n\n${body}`,
        hs_timestamp: new Date().toISOString(),
      },
    }),
  });
  if (!noteRes.ok)
    throw new Error(`HubSpot note creation failed: ${noteRes.status}`);
  const note = await noteRes.json();

  const assocRes = await fetch(
    `${HS_BASE}/crm/v4/objects/notes/${note.id}/associations/contacts/${contactId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 },
      ]),
    }
  );
  if (!assocRes.ok)
    throw new Error(`Association note-contact failed: ${assocRes.status}`);
  return note;
}

/**
 * Validation volontairement stricte : le jeu de caractères est restreint à
 * ce qu'on attend d'une adresse professionnelle, ce qui exclut d'office les
 * métacaractères utilisables pour forger un en-tête (`<`, `>`, `"`, `,`, `:`).
 */
export interface StudioDevisPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  category: StudioDemoCategory;
  demoId?: string;
  customScript?: string;
  finalScript: string;
  tone: string;
  voice: string;
  language: string;
  music: string;
  notes: string;
  pageUrl?: string;
}

export async function POST(request: Request) {
  try {
    const { allowed, retryAfter } = checkRateLimit(
      getClientIdentifier(request),
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS
    );
    if (!allowed) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const body = (await request.json()) as Partial<StudioDevisPayload>;

    // Toute valeur issue du client est bornée et ramenée à une chaîne avant
    // d'atteindre Resend ou HubSpot.
    const firstName = sanitize(body.firstName, FIELD_LIMITS.firstName);
    const lastName = sanitize(body.lastName, FIELD_LIMITS.lastName);
    const email = sanitize(body.email, FIELD_LIMITS.email);
    const phone = sanitize(body.phone, FIELD_LIMITS.phone);
    const company = sanitize(body.company, FIELD_LIMITS.company);
    const category = sanitize(body.category, FIELD_LIMITS.category);
    const demoId = sanitize(body.demoId, FIELD_LIMITS.demoId);
    const customScript = sanitize(body.customScript, FIELD_LIMITS.customScript);
    const finalScript = sanitize(body.finalScript, FIELD_LIMITS.finalScript);
    const tone = sanitize(body.tone, FIELD_LIMITS.tone);
    const voice = sanitize(body.voice, FIELD_LIMITS.voice);
    const language = sanitize(body.language, FIELD_LIMITS.language);
    const music = sanitize(body.music, FIELD_LIMITS.music);
    const notes = sanitize(body.notes, FIELD_LIMITS.notes);
    const pageUrl = sanitize(body.pageUrl, FIELD_LIMITS.pageUrl);

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Prénom, nom et email sont requis." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "L’adresse email n’est pas valide." },
        { status: 400 }
      );
    }

    if (!finalScript) {
      return NextResponse.json(
        { error: "Le message final est requis." },
        { status: 400 }
      );
    }

    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const from = requireEnv("RESEND_FROM_EMAIL");
    const to = requireEnv("STUDIO_EMAIL_TO");
    const hubspotToken = requireEnv("HUBSPOT_ACCESS_TOKEN");

    const demo = demoId ? getDemoById(demoId) : undefined;
    const categoryLabel = demo?.category ?? category;

    const emailSubject = sanitizeHeader(
      `[Studio Voix Humaines] Nouvelle demande de ${company || email}`
    );
    // `demo.title` provient de notre catalogue, mais on l'échappe comme le
    // reste : le jour où le catalogue devient éditable, la protection tient.
    const emailHtml = `
      <h2>Nouvelle demande de devis — Studio Voix Humaines</h2>
      <p><strong>Contact :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "non renseigné"}</p>
      <p><strong>Entreprise :</strong> ${escapeHtml(company) || "non renseignée"}</p>
      <hr />
      <p><strong>Type de message :</strong> ${escapeHtml(categoryLabel)}</p>
      <p><strong>Ton :</strong> ${escapeHtml(tone) || "standard"}</p>
      <p><strong>Voix :</strong> ${escapeHtml(voice) || "non précisée"}</p>
      <p><strong>Langue :</strong> ${escapeHtml(language) || "français"}</p>
      <p><strong>Musique :</strong> ${escapeHtml(music) || "non précisée"}</p>
      <p><strong>Modèle choisi :</strong> ${escapeHtml(demo?.title || "texte personnalisé")}</p>
      <hr />
      <h3>Message final</h3>
      <blockquote style="border-left:4px solid #ccc;padding-left:12px;font-style:italic;">
        ${escapeHtmlMultiline(finalScript)}
      </blockquote>
      ${customScript ? `<h3>Texte libre initial</h3><p>${escapeHtmlMultiline(customScript)}</p>` : ""}
      ${notes ? `<h3>Notes complémentaires</h3><p>${escapeHtmlMultiline(notes)}</p>` : ""}
      <hr />
      <p><small>Source : ${escapeHtml(pageUrl || "studio-attente/devis")}</small></p>
    `;
    const emailText = `
Nouvelle demande de devis — Studio Voix Humaines

Contact : ${firstName} ${lastName}
Email : ${email}
Téléphone : ${phone || "non renseigné"}
Entreprise : ${company || "non renseignée"}

Type de message : ${categoryLabel}
Ton : ${tone || "standard"}
Voix : ${voice || "non précisée"}
Langue : ${language || "français"}
Musique : ${music || "non précisée"}
Modèle choisi : ${demo?.title || "texte personnalisé"}

Message final :
---
${finalScript}
---
${customScript ? `Texte libre initial :\n${customScript}\n` : ""}${notes ? `Notes :\n${notes}\n` : ""}
Source : ${pageUrl || "studio-attente/devis"}
    `.trim();

    // L'email prime : c'est lui qui déclenche le traitement commercial.
    // HubSpot est best-effort, mais son échec doit rester visible en logs.
    const [emailResult, hubspotResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      }),
      (async () => {
        const existing = await findContactByEmail(hubspotToken, email);
        const properties = {
          firstname: firstName,
          lastname: lastName,
          email,
          phone: normalizePhone(phone),
          company: company || "",
          lead_source: "Studio Voix Humaines",
          last_studio_request: new Date().toISOString(),
        };
        const contact = await upsertContact(hubspotToken, properties, existing?.id);
        const noteTitle = `Studio Voix Humaines — ${categoryLabel}`;
        const noteBody = [
          `Type: ${categoryLabel}`,
          `Ton: ${tone || "standard"}`,
          `Voix: ${voice || "non précisée"}`,
          `Langue: ${language || "français"}`,
          `Musique: ${music || "non précisée"}`,
          `Modèle: ${demo?.title || "texte personnalisé"}`,
          "",
          "Message final:",
          finalScript,
          customScript ? `\nTexte libre initial:\n${customScript}` : "",
          notes ? `\nNotes:\n${notes}` : "",
          `\nSource: ${pageUrl || "studio-attente/devis"}`,
        ].join("\n");
        await createNoteForContact(hubspotToken, contact.id, noteTitle, noteBody);
        return contact;
      })(),
    ]);

    if (hubspotResult.status === "rejected") {
      // Le lead n'est pas perdu (l'email part quand même), mais l'absence de
      // synchro CRM ne doit pas passer inaperçue.
      console.error("[studio/devis] HubSpot sync failed:", hubspotResult.reason);
    }

    if (emailResult.status === "rejected") {
      console.error("[studio/devis] Resend failed:", emailResult.reason);
      return NextResponse.json(
        { error: "L’envoi de l’email a échoué. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("[studio/devis]", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

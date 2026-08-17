import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, getClientIdentifier } from "@/lib/api/rate-limit";
import { StudioDemoCategory, getDemoById } from "@/lib/studio-demos";

const HS_BASE = "https://api.hubapi.com";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
}

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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

    const body = (await request.json()) as StudioDevisPayload;
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      category,
      demoId,
      customScript,
      finalScript,
      tone,
      voice,
      language,
      music,
      notes,
      pageUrl,
    } = body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
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

    if (!finalScript?.trim()) {
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

    const emailSubject = `[Studio Voix Humaines] Nouvelle demande de ${company || email}`;
    const emailHtml = `
      <h2>Nouvelle demande de devis — Studio Voix Humaines</h2>
      <p><strong>Contact :</strong> ${firstName} ${lastName}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone || "non renseigné"}</p>
      <p><strong>Entreprise :</strong> ${company || "non renseignée"}</p>
      <hr />
      <p><strong>Type de message :</strong> ${categoryLabel}</p>
      <p><strong>Ton :</strong> ${tone || "standard"}</p>
      <p><strong>Voix :</strong> ${voice || "non précisée"}</p>
      <p><strong>Langue :</strong> ${language || "français"}</p>
      <p><strong>Musique :</strong> ${music || "non précisée"}</p>
      <p><strong>Modèle choisi :</strong> ${demo?.title || "texte personnalisé"}</p>
      <hr />
      <h3>Message final</h3>
      <blockquote style="border-left:4px solid #ccc;padding-left:12px;font-style:italic;">
        ${finalScript.replace(/\n/g, "<br />")}
      </blockquote>
      ${customScript ? `<h3>Texte libre initial</h3><p>${customScript.replace(/\n/g, "<br />")}</p>` : ""}
      ${notes ? `<h3>Notes complémentaires</h3><p>${notes.replace(/\n/g, "<br />")}</p>` : ""}
      <hr />
      <p><small>Source : ${pageUrl || "studio-attente/devis"}</small></p>
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

    const [emailResult] = await Promise.allSettled([
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

    if (emailResult.status === "rejected") {
      console.error("[studio/devis] Resend failed:", emailResult.reason);
      return NextResponse.json(
        { error: "L’envoi de l’email a échoué. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[studio/devis]", e?.message || e);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

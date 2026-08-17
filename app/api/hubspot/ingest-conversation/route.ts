import { NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/api/rate-limit";

const HS_BASE = "https://api.hubapi.com";

// Route publique qui écrit dans le CRM : on plafonne les créations de contacts
// par appelant. 5 demandes en 10 minutes couvrent largement un usage légitime
// (un visiteur ouvre le chat une fois, éventuellement après un échec réseau).
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v;
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
      properties: ["firstname", "lastname", "email", "phone", "mobilephone"],
      limit: 1,
    }),
  });
  if (!res.ok) throw new Error(`HubSpot search failed: ${res.status}`);
  const data = await res.json();
  return data.results?.[0] || null;
}

async function upsertContact(
  token: string,
  props: Record<string, any>,
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
        hs_note_title: title,
        hs_note_body: body,
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
      body: JSON.stringify({
        associationCategory: "HUBSPOT_DEFINED",
        associationTypeId: 202,
      }),
    }
  );
  if (!assocRes.ok)
    throw new Error(`Association note-contact failed: ${assocRes.status}`);
  return note;
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

    const token = requireEnv("HUBSPOT_ACCESS_TOKEN");
    const {
      firstName,
      lastName,
      email,
      phone,
      mobile,
      message,
      source,
      conversationId,
      pageUrl,
      company,
    } = await request.json();

    if (!email)
      return NextResponse.json({ error: "email requis" }, { status: 400 });

    const existing = await findContactByEmail(token, email);

    const properties = {
      firstname: firstName || "",
      lastname: lastName || "",
      email,
      phone: phone || "",
      mobilephone: mobile || "",
      company: company || "",
      last_chat_message: message || "",
      chat_source: source || "website",
      chat_conversation_id: conversationId || "",
    } as Record<string, any>;

    const contact = await upsertContact(token, properties, existing?.id);

    const noteTitle = "Chat site web";
    const noteBody = `Source: ${source || "website"}\nURL: ${
      pageUrl || "-"
    }\nConversation ID: ${conversationId || "-"}\n\nDernier message:\n${
      message || "-"
    }`;
    await createNoteForContact(token, contact.id, noteTitle, noteBody);

    return NextResponse.json({ ok: true, contactId: contact.id });
  } catch (e: any) {
    // Le détail reste côté serveur : il expose le statut HubSpot et le nom des
    // variables d'environnement. Le client n'affiche qu'un message générique.
    console.error("[ingest-conversation]", e?.message || e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

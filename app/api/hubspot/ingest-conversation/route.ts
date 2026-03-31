import { NextResponse } from "next/server";

const HS_BASE = "https://api.hubapi.com";

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
    const token = requireEnv("HUBSPOT_ACCESS_TOKEN");
    const body = await request.json();
    const { firstName, email, company, source, pageUrl } = body;

    if (!email)
      return NextResponse.json({ error: "email requis" }, { status: 400 });

    const existing = await findContactByEmail(token, email);

    // Proprietes HubSpot standard uniquement (pas de proprietes custom)
    const properties: Record<string, string> = {
      firstname: firstName || "",
      email,
      company: company || "",
    };
    // Champs optionnels — ne pas envoyer vide a HubSpot
    if (body.lastName) properties.lastname = body.lastName;
    if (body.phone) properties.phone = body.phone;

    const contact = await upsertContact(token, properties, existing?.id);

    // Note optionnelle — ne pas bloquer le chat si la creation echoue
    try {
      const noteBody = `Source: ${source || "website"}\nURL: ${
        pageUrl || "-"
      }\nEntreprise: ${company || "-"}`;
      await createNoteForContact(token, contact.id, "Chat site web", noteBody);
    } catch (noteErr) {
      console.warn("Note creation failed (non-blocking):", noteErr);
    }

    return NextResponse.json({ ok: true, contactId: contact.id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

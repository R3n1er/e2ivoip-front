/**
 * vuln-0002 (scan Strix 2026-08-20) : la route publique du chat écrit le
 * message du visiteur dans une note HubSpot. Ce message ne doit jamais
 * arriver dans le CRM sous forme de HTML actif.
 *
 * @jest-environment node
 */

import { POST } from "@/app/api/hubspot/ingest-conversation/route";
import { resetRateLimits } from "@/lib/api/rate-limit";

type FetchMock = jest.Mock<Promise<unknown>, [string, RequestInit?]>;

function buildRequest(payload: unknown): Request {
  return new Request("https://www.e2i-voip.com/api/hubspot/ingest-conversation", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-real-ip": "203.0.113.10" },
    body: JSON.stringify(payload),
  });
}

function noteBodySent(fetchMock: FetchMock): string {
  const call = fetchMock.mock.calls.find(([url]) =>
    String(url).endsWith("/crm/v3/objects/notes")
  );
  if (!call) throw new Error("Aucune note HubSpot créée");
  const body = JSON.parse(String(call[1]?.body));
  return body.properties.hs_note_body;
}

describe("POST /api/hubspot/ingest-conversation", () => {
  const originalEnv = process.env;
  let fetchMock: FetchMock;

  beforeEach(() => {
    resetRateLimits();
    process.env = { ...originalEnv, HUBSPOT_ACCESS_TOKEN: "test-token" };
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], id: "objet-1" }),
    }) as FetchMock;
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("échappe le HTML du message avant de l'écrire dans la note", async () => {
    const response = await POST(
      buildRequest({
        email: "visiteur@example.fr",
        message: '<img src=x onerror="alert(1)">',
        pageUrl: '<a href="https://phishing.example">lien</a>',
      })
    );

    expect(response.status).toBe(200);
    const note = noteBodySent(fetchMock);
    expect(note).not.toContain("<img");
    expect(note).not.toContain('<a href="https://phishing.example"');
    expect(note).toContain("&lt;img src=x");
  });

  it("garde le contenu lisible dans la note", async () => {
    await POST(
      buildRequest({
        email: "visiteur@example.fr",
        message: "Bonjour,\nje souhaite un devis.",
      })
    );

    const note = noteBodySent(fetchMock);
    expect(note).toContain("Bonjour,<br />je souhaite un devis.");
  });
});

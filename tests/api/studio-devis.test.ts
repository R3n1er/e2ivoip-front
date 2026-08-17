/**
 * Tests de la route publique /api/studio/devis.
 *
 * L'enjeu couvert ici est la robustesse face à un corps de requête forgé :
 * la route est ouverte, non authentifiée, et alimente à la fois un email
 * envoyé depuis notre domaine et le CRM.
 *
 * L'environnement global du projet est jsdom (tests de composants), qui
 * n'expose ni `Request` ni `Response` — indispensables à `next/server`.
 * On bascule donc ce fichier seul en environnement Node.
 *
 * @jest-environment node
 */

const mockSend = jest.fn();

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

import { POST } from "@/app/api/studio/devis/route";
import { resetRateLimits } from "@/lib/api/rate-limit";

const VALID_PAYLOAD = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.fr",
  phone: "+33 1 23 45 67 89",
  company: "Société Exemple",
  category: "pre-decroche",
  finalScript: "Bienvenue chez Société Exemple.",
  tone: "chaleureux",
  voice: "masculine",
  language: "fr",
  music: "bibliotheque",
  notes: "",
};

function buildRequest(payload: unknown, ip = "1.2.3.4"): Request {
  return new Request("https://e2i-voip.com/api/studio/devis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
  });
}

/** Dernier email transmis à Resend. */
function lastEmail() {
  return mockSend.mock.calls[mockSend.mock.calls.length - 1][0];
}

describe("POST /api/studio/devis", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    resetRateLimits();
    mockSend.mockReset();
    mockSend.mockResolvedValue({ id: "email-1" });

    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "test-key",
      RESEND_FROM_EMAIL: "studio@notifications.e2i-voip.com",
      STUDIO_EMAIL_TO: "commerciaux@e2-voip.com",
      HUBSPOT_ACCESS_TOKEN: "test-token",
    };

    // HubSpot : contact introuvable, puis création et note acceptées.
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], id: "contact-1" }),
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("accepte une demande valide", async () => {
    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("refuse une demande sans champ obligatoire", async () => {
    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, firstName: "   " })
    );

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse une adresse email malformée", async () => {
    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, email: "jean<script>@example.fr" })
    );

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("échappe le HTML injecté dans les champs texte", async () => {
    await POST(
      buildRequest({
        ...VALID_PAYLOAD,
        firstName: '<img src=x onerror="alert(1)">',
        finalScript: '<a href="https://phishing.example">Validez ici</a>',
      })
    );

    const { html } = lastEmail();
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain('<a href="https://phishing.example"');
    expect(html).toContain("&lt;img src=x");
    expect(html).toContain("&lt;a href=");
  });

  it("préserve les retours ligne du message tout en échappant le contenu", async () => {
    await POST(
      buildRequest({
        ...VALID_PAYLOAD,
        finalScript: "Ligne 1\n<b>Ligne 2</b>",
      })
    );

    const { html } = lastEmail();
    expect(html).toContain("Ligne 1<br />&lt;b&gt;Ligne 2&lt;/b&gt;");
  });

  it("tronque les champs démesurés avant l'envoi", async () => {
    await POST(
      buildRequest({ ...VALID_PAYLOAD, finalScript: "a".repeat(20000) })
    );

    const { text } = lastEmail();
    expect(text).toContain("a".repeat(5000));
    expect(text).not.toContain("a".repeat(5001));
  });

  it("neutralise un retour ligne injecté dans le sujet", async () => {
    await POST(
      buildRequest({
        ...VALID_PAYLOAD,
        company: "Acme\nBcc: victime@example.com",
      })
    );

    expect(lastEmail().subject).not.toMatch(/[\r\n]/);
  });

  it("bloque au-delà du quota par adresse IP", async () => {
    for (let i = 0; i < 3; i += 1) {
      await POST(buildRequest(VALID_PAYLOAD, "9.9.9.9"));
    }

    const res = await POST(buildRequest(VALID_PAYLOAD, "9.9.9.9"));

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("répond malgré un échec HubSpot, sans perdre le lead", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: false, status: 401 }) as unknown as typeof fetch;
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      "[studio/devis] HubSpot sync failed:",
      expect.anything()
    );

    errorSpy.mockRestore();
  });

  it("signale une erreur si l'envoi de l'email échoue", async () => {
    mockSend.mockRejectedValue(new Error("Resend down"));
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(500);
    errorSpy.mockRestore();
  });
});

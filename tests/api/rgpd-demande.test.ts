/**
 * Tests de la route publique /api/rgpd/demande.
 *
 * Cette route matérialise une obligation légale : une demande d'exercice de
 * droits doit atteindre l'entreprise, et le demandeur doit conserver une
 * trace écrite de sa démarche (délai de réponse d'un mois). Les deux envois
 * n'ont pas le même statut — la notification interne est bloquante, l'accusé
 * de réception est best-effort.
 *
 * Comme pour /api/studio/devis, l'environnement global jsdom n'expose ni
 * `Request` ni `Response` : ce fichier bascule seul en environnement Node.
 *
 * @jest-environment node
 */

const mockSend = jest.fn();

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

import { POST } from "@/app/api/rgpd/demande/route";
import { resetRateLimits } from "@/lib/api/rate-limit";

const VALID_PAYLOAD = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.fr",
  phone: "+33 1 23 45 67 89",
  requestTypes: ["acces", "effacement"],
  details: "Je souhaite connaître les données détenues me concernant.",
  pageUrl: "https://www.e2i-voip.com/exercer-mes-droits",
  formStartedAt: Date.now() - 3000,
  company: "",
};

function buildRequest(
  payload: unknown,
  ip = "1.2.3.4",
  headers: Record<string, string> = {}
): Request {
  return new Request("https://e2i-voip.com/api/rgpd/demande", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-E2I-Form": "rgpd-rights",
      "x-forwarded-for": ip,
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

/** Email adressé à la boîte RGPD interne. */
function internalEmail() {
  return mockSend.mock.calls
    .map((call) => call[0])
    .find((mail) => mail.to === "rgpd@e2i-voip.com");
}

/** Accusé de réception adressé au demandeur. */
function acknowledgementEmail() {
  return mockSend.mock.calls
    .map((call) => call[0])
    .find((mail) => mail.to === VALID_PAYLOAD.email);
}

describe("POST /api/rgpd/demande", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    resetRateLimits();
    mockSend.mockReset();
    mockSend.mockResolvedValue({ id: "email-1" });

    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "test-key",
      RESEND_FROM_EMAIL: "rgpd@notifications.e2i-voip.com",
      RGPD_EMAIL_TO: "rgpd@e2i-voip.com",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("refuse une requête sans en-tête d'intention du formulaire", async () => {
    const request = new Request("https://e2i-voip.com/api/rgpd/demande", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "1.2.3.4",
      },
      body: JSON.stringify(VALID_PAYLOAD),
    });

    const res = await POST(request);

    expect(res.status).toBe(403);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse une requête cross-site", async () => {
    const res = await POST(
      buildRequest(VALID_PAYLOAD, "1.2.3.4", {
        Origin: "https://spam.example",
        "Sec-Fetch-Site": "cross-site",
      })
    );

    expect(res.status).toBe(403);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse un type de contenu simple exploitable par un formulaire externe", async () => {
    const request = new Request("https://e2i-voip.com/api/rgpd/demande", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "X-E2I-Form": "rgpd-rights",
      },
      body: JSON.stringify(VALID_PAYLOAD),
    });

    const res = await POST(request);

    expect(res.status).toBe(415);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse un corps trop volumineux avant parsing JSON", async () => {
    const res = await POST(
      buildRequest(VALID_PAYLOAD, "1.2.3.4", {
        "Content-Length": String(20 * 1024),
      })
    );

    expect(res.status).toBe(413);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse un corps trop volumineux même sans Content-Length fiable", async () => {
    const request = new Request("https://e2i-voip.com/api/rgpd/demande", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-E2I-Form": "rgpd-rights",
      },
      body: JSON.stringify({
        ...VALID_PAYLOAD,
        details: "a".repeat(20 * 1024),
      }),
    });

    const res = await POST(request);

    expect(res.status).toBe(413);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("accepte une demande valide et envoie les deux emails", async () => {
    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(internalEmail()).toBeDefined();
    expect(acknowledgementEmail()).toBeDefined();
  });

  it("adresse la notification interne à la boîte RGPD, pas à la boîte commerciale", async () => {
    process.env.STUDIO_EMAIL_TO = "commerciaux@e2i-voip.com";

    await POST(buildRequest(VALID_PAYLOAD));

    const destinataires = mockSend.mock.calls.map((call) => call[0].to);
    expect(destinataires).toContain("rgpd@e2i-voip.com");
    expect(destinataires).not.toContain("commerciaux@e2i-voip.com");
  });

  it("rappelle le délai légal d'un mois dans l'accusé de réception", async () => {
    await POST(buildRequest(VALID_PAYLOAD));

    const ack = acknowledgementEmail();
    expect(ack.subject).toMatch(/demande/i);
    expect(ack.text).toMatch(/un mois/i);
  });

  it("liste les droits demandés en clair dans la notification interne", async () => {
    await POST(buildRequest(VALID_PAYLOAD));

    const { text } = internalEmail();
    expect(text).toMatch(/Droit d’accès/);
    expect(text).toMatch(/Droit à l’effacement/);
  });

  it("refuse une demande sans identité", async () => {
    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, lastName: "   " })
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

  it("refuse une demande ne portant sur aucun droit", async () => {
    const res = await POST(buildRequest({ ...VALID_PAYLOAD, requestTypes: [] }));

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse une soumission trop rapide pour être humaine", async () => {
    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, formStartedAt: Date.now() })
    );

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("refuse une soumission qui remplit le honeypot", async () => {
    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, company: "Robot SARL" })
    );

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("exige un jeton Turnstile si la clé serveur est configurée", async () => {
    process.env.TURNSTILE_SECRET_KEY = "turnstile-secret";

    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("valide le jeton Turnstile avant d'envoyer les emails", async () => {
    process.env.TURNSTILE_SECRET_KEY = "turnstile-secret";
    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      );

    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, turnstileToken: "token-ok" })
    );

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" })
    );
    expect(mockSend).toHaveBeenCalledTimes(2);
    fetchMock.mockRestore();
  });

  it("refuse un droit inconnu plutôt que de le relayer tel quel", async () => {
    const res = await POST(
      buildRequest({ ...VALID_PAYLOAD, requestTypes: ["acces", "<script>"] })
    );

    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("échappe le HTML injecté dans les champs texte", async () => {
    await POST(
      buildRequest({
        ...VALID_PAYLOAD,
        firstName: '<img src=x onerror="alert(1)">',
        details: '<a href="https://phishing.example">Validez ici</a>',
      })
    );

    const { html } = internalEmail();
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain('<a href="https://phishing.example"');
    expect(html).toContain("&lt;img src=x");
  });

  it("tronque un champ démesuré avant l'envoi", async () => {
    await POST(buildRequest({ ...VALID_PAYLOAD, details: "a".repeat(2500) }));

    const { text } = internalEmail();
    expect(text).toContain("a".repeat(2000));
    expect(text).not.toContain("a".repeat(2001));
  });

  it("neutralise un retour ligne injecté dans le sujet", async () => {
    await POST(
      buildRequest({
        ...VALID_PAYLOAD,
        lastName: "Dupont\nBcc: victime@example.com",
      })
    );

    expect(internalEmail().subject).not.toMatch(/[\r\n]/);
  });

  it("bloque au-delà du quota par adresse IP", async () => {
    for (let i = 0; i < 3; i += 1) {
      await POST(buildRequest(VALID_PAYLOAD, "9.9.9.9"));
    }

    const res = await POST(buildRequest(VALID_PAYLOAD, "9.9.9.9"));

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("confirme la demande même si l'accusé de réception échoue", async () => {
    mockSend.mockImplementation(async (mail: { to: string }) => {
      if (mail.to === VALID_PAYLOAD.email) throw new Error("boîte pleine");
      return { id: "email-1" };
    });
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(200);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("signale une erreur si la notification interne échoue", async () => {
    mockSend.mockRejectedValue(new Error("Resend down"));
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(buildRequest(VALID_PAYLOAD));

    expect(res.status).toBe(500);
    errorSpy.mockRestore();
  });
});

/**
 * Tests de la route GET /api/rgpd/confirm.
 *
 * Cette route matérialise le double opt-in : le visiteur clique un lien
 * reçu par mail, on consomme le jeton, on envoie la notification interne
 * + l'accusé de réception final.
 *
 * - Token inconnu / invalide / expiré : 302 vers /juridique/exercer-mes-droits?status=...
 * - Token valide : 302 vers ?status=confirmed, deux mails envoyés.
 * - Le clic est idempotent : un second appel renvoie "déjà confirmé".
 * - Le lien ne peut pas fuiter dans les logs (logs scrubbés).
 *
 * @jest-environment node
 */

const mockSend = jest.fn();
const mockLogError = jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

jest.mock("botid/server", () => ({
  checkBotId: jest.fn().mockResolvedValue({ isBot: false }),
}));

import { GET } from "@/app/api/rgpd/confirm/route";
import {
  createRgpdToken,
  __resetRgpdTokensForTests,
} from "@/lib/api/rgpd-tokens";
import { resetRateLimits } from "@/lib/api/rate-limit";
import type { RgpdDemandePayload } from "@/app/api/rgpd/demande/route";

const SAMPLE_PAYLOAD: RgpdDemandePayload = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.fr",
  requestTypes: ["acces"],
};

function buildRequest(
  token: string | null,
  ip = "1.2.3.4",
  headers: Record<string, string> = {}
): Request {
  const url = token
    ? `https://e2i-voip.com/api/rgpd/confirm?token=${encodeURIComponent(token)}`
    : "https://e2i-voip.com/api/rgpd/confirm";
  return new Request(url, {
    method: "GET",
    headers: {
      "x-forwarded-for": ip,
      ...headers,
    },
  });
}

describe("GET /api/rgpd/confirm", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    __resetRgpdTokensForTests();
    resetRateLimits();
    mockSend.mockReset();
    mockSend.mockResolvedValue({ id: "email-1" });
    mockLogError.mockClear();

    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "test-key",
      RESEND_FROM_EMAIL: "rgpd@notifications.e2i-voip.com",
      RGPD_EMAIL_TO: "rgpd@e2i-voip.com",
      NEXT_PUBLIC_SITE_URL: "https://www.e2i-voip.com",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("redirige vers la page de statut quand le token est manquant", async () => {
    const res = await GET(buildRequest(null));

    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toMatch(/status=invalid/);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("redirige vers la page de statut quand le token est inconnu", async () => {
    const res = await GET(buildRequest("deadbeef".repeat(8)));

    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toMatch(/status=invalid/);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("confirme une demande valide et envoie deux emails (interne + accusé)", async () => {
    const { token } = createRgpdToken(SAMPLE_PAYLOAD);

    const res = await GET(buildRequest(token));

    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toMatch(/status=confirmed/);
    expect(mockSend).toHaveBeenCalledTimes(2);

    const to = mockSend.mock.calls.map((call) => call[0].to);
    expect(to).toContain("rgpd@e2i-voip.com");
    expect(to).toContain(SAMPLE_PAYLOAD.email);
  });

  it("est idempotent : un second clic renvoie status=already", async () => {
    const { token } = createRgpdToken(SAMPLE_PAYLOAD);

    const first = await GET(buildRequest(token));
    const second = await GET(buildRequest(token));

    expect(first.headers.get("Location")).toMatch(/status=confirmed/);
    expect(second.headers.get("Location")).toMatch(/status=already/);
    // Les emails ne sont envoyés qu'une seule fois (au premier clic).
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("redirige vers status=expired si le token a expiré", async () => {
    const { token, expiresAt } = createRgpdToken(SAMPLE_PAYLOAD);
    const originalNow = Date.now;
    Date.now = () => expiresAt + 1;

    try {
      const res = await GET(buildRequest(token));
      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toMatch(/status=expired/);
      expect(mockSend).not.toHaveBeenCalled();
    } finally {
      Date.now = originalNow;
    }
  });

  it("ne fait jamais fuiter le token dans les logs en cas d'erreur", async () => {
    mockSend.mockRejectedValue(new Error("Resend down"));

    const { token } = createRgpdToken(SAMPLE_PAYLOAD);
    await GET(buildRequest(token));

    const allLogArgs = mockLogError.mock.calls
      .map((call) => JSON.stringify(call))
      .join("\n");
    expect(allLogArgs).not.toContain(token);
  });
});
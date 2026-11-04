/**
 * Route /api/3cx-free/devis — formulaire de devis 3CX Free.
 *
 * Arbitrages Alban (2026-11-03) :
 *  - anti-spam invisible : BotID + limite d'envois + champ piège ;
 *  - le site vérifie le SIRET et envoie lui-même l'accusé Resend ;
 *  - le lead part vers un webhook n8n (clé secrète), qui trie avec le
 *    modèle clef (Ollama Cloud) et prévient l'équipe commerciale ;
 *  - un SIRET fermé ou introuvable ne bloque pas : il est signalé.
 *
 * @jest-environment node
 */

const mockSend = jest.fn();
jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

jest.mock("botid/server", () => ({
  checkBotId: jest.fn().mockResolvedValue({ isBot: false }),
}));

const mockVerifierSiret = jest.fn();
jest.mock("@/lib/devis-3cx-free/siret", () => ({
  ...jest.requireActual("@/lib/devis-3cx-free/siret"),
  verifierSiret: (...args: unknown[]) => mockVerifierSiret(...args),
}));

import { POST } from "@/app/api/3cx-free/devis/route";
import { resetRateLimits } from "@/lib/api/rate-limit";

const WEBHOOK_URL = "https://n8n.example.test/webhook/devis-3cx-free";
const WEBHOOK_SECRET = "secret-de-test";
const EMAIL_COMMERCIAL = "commercial@e2i-voip.com";

const PAYLOAD = {
  nom: "Dupont",
  prenom: "Marie",
  societe: "Boulangerie Dupont",
  siret: "552 081 317 66522",
  telephoneFixe: "0590 12 34 56",
  telephoneMobile: "0690 12 34 56",
  email: "marie@boulangerie.example",
  besoinNumeros: "portabilite",
  nombreNumeros: 2,
  message: "Nous voulons garder nos deux numéros.",
  consentementRgpd: true,
  website: "",
  formStartedAt: Date.now() - 5000,
  pageUrl: "https://www.e2i-voip.com/3cx-free",
};

function requete(
  payload: unknown,
  ip = "1.2.3.4",
  headers: Record<string, string> = {},
): Request {
  return new Request("https://e2i-voip.com/api/3cx-free/devis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-E2I-Form": "devis-3cx-free",
      "x-forwarded-for": ip,
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

const fetchMock = jest.fn();

function appelWebhook() {
  return fetchMock.mock.calls.find(([url]) => url === WEBHOOK_URL);
}
function corpsWebhook() {
  return JSON.parse(appelWebhook()![1].body as string);
}
function mailA(destinataire: string) {
  return mockSend.mock.calls
    .map((c) => c[0])
    .find((m) => m.to === destinataire);
}

describe("POST /api/3cx-free/devis", () => {
  const envOrigine = process.env;
  const fetchOrigine = global.fetch;

  beforeEach(() => {
    resetRateLimits();
    mockSend.mockReset().mockResolvedValue({ id: "mail-1" });
    mockVerifierSiret.mockReset().mockResolvedValue({
      siret: "55208131766522",
      statut: "actif",
      raisonSociale: "BOULANGERIE DUPONT",
    });
    fetchMock.mockReset().mockResolvedValue({ ok: true, status: 200 });
    global.fetch = fetchMock as unknown as typeof fetch;
    const { checkBotId } = require("botid/server") as { checkBotId: jest.Mock };
    checkBotId.mockReset().mockResolvedValue({ isBot: false });
    process.env = {
      ...envOrigine,
      RESEND_API_KEY: "re_test",
      RESEND_FROM_EMAIL: "E2I VoIP <noreply@e2i-voip.com>",
      N8N_DEVIS_3CX_FREE_WEBHOOK_URL: WEBHOOK_URL,
      N8N_DEVIS_3CX_FREE_WEBHOOK_SECRET: WEBHOOK_SECRET,
      DEVIS_COMMERCIAL_EMAIL: EMAIL_COMMERCIAL,
    };
  });

  afterAll(() => {
    process.env = envOrigine;
    global.fetch = fetchOrigine;
  });

  describe("cas nominal", () => {
    it("répond 200, envoie le lead à n8n avec la clé secrète et l'accusé au client", async () => {
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);

      const appel = appelWebhook();
      expect(appel).toBeDefined();
      expect(appel![1].method).toBe("POST");
      expect(appel![1].headers["X-E2I-Webhook-Secret"]).toBe(WEBHOOK_SECRET);

      const accuse = mailA(PAYLOAD.email);
      expect(accuse).toBeDefined();
      expect(accuse.html).toContain("Marie");
    });

    it("transmet à n8n le contact, le besoin, le message, le consentement horodaté et le SIRET vérifié", async () => {
      await POST(requete(PAYLOAD));
      const lead = corpsWebhook();
      expect(lead.source).toBe("site-e2ivoip/3cx-free");
      expect(lead.contact).toMatchObject({
        nom: "Dupont",
        prenom: "Marie",
        societe: "Boulangerie Dupont",
        telephoneFixe: "0590 12 34 56",
        telephoneMobile: "0690 12 34 56",
        email: "marie@boulangerie.example",
      });
      expect(lead.besoin).toEqual({ numeros: "portabilite", nombreNumeros: 2 });
      expect(lead.message).toBe(PAYLOAD.message);
      expect(lead.consentementRgpd.accepte).toBe(true);
      expect(lead.consentementRgpd.texte).toMatch(/relation commerciale/);
      expect(typeof lead.consentementRgpd.horodatage).toBe("string");
      expect(lead.siret).toEqual({
        siret: "55208131766522",
        statut: "actif",
        raisonSociale: "BOULANGERIE DUPONT",
      });
      expect(lead.anomalies).toEqual([]);
    });

    it("le téléphone fixe et le SIRET sont facultatifs", async () => {
      mockVerifierSiret.mockResolvedValue({ siret: "", statut: "non-renseigne" });
      const res = await POST(
        requete({ ...PAYLOAD, telephoneFixe: "", siret: "" }),
      );
      expect(res.status).toBe(200);
    });
  });

  describe("SIRET : signalé, jamais bloquant", () => {
    it.each([
      ["ferme", "siret-ferme"],
      ["introuvable", "siret-introuvable"],
      ["format-invalide", "siret-format-invalide"],
      ["non-verifie", "siret-non-verifie"],
    ])("statut %s → envoi accepté et anomalie %s", async (statut, anomalie) => {
      mockVerifierSiret.mockResolvedValue({ siret: "55208131766522", statut });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);
      expect(corpsWebhook().anomalies).toContain(anomalie);
    });
  });

  describe("anti-spam", () => {
    it("BotID détecte un robot → 403, rien n'est envoyé", async () => {
      const { checkBotId } = require("botid/server") as { checkBotId: jest.Mock };
      checkBotId.mockResolvedValue({ isBot: true });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(403);
      expect(fetchMock).not.toHaveBeenCalled();
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("champ piège rempli → refus, rien n'est envoyé", async () => {
      const res = await POST(requete({ ...PAYLOAD, website: "http://spam" }));
      expect(res.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("envoi trop rapide après l'affichage → refus", async () => {
      const res = await POST(requete({ ...PAYLOAD, formStartedAt: Date.now() }));
      expect(res.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("sans l'en-tête du formulaire → 403", async () => {
      const res = await POST(requete(PAYLOAD, "1.2.3.4", { "X-E2I-Form": "" }));
      expect(res.status).toBe(403);
    });

    it("limite d'envois dépassée → 429", async () => {
      let derniere: Response | undefined;
      for (let i = 0; i < 6; i++) derniere = await POST(requete(PAYLOAD, "9.9.9.9"));
      expect(derniere!.status).toBe(429);
    });
  });

  describe("validation des champs", () => {
    it.each(["nom", "prenom", "societe", "telephoneMobile", "email", "message"])(
      "%s manquant → 400",
      async (champ) => {
        const res = await POST(requete({ ...PAYLOAD, [champ]: "" }));
        expect(res.status).toBe(400);
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );

    it("consentement RGPD non coché → 400", async () => {
      const res = await POST(requete({ ...PAYLOAD, consentementRgpd: false }));
      expect(res.status).toBe(400);
    });

    it("e-mail invalide → 400", async () => {
      const res = await POST(requete({ ...PAYLOAD, email: "pas-un-mail" }));
      expect(res.status).toBe(400);
    });

    it("besoin inconnu → 400", async () => {
      const res = await POST(requete({ ...PAYLOAD, besoinNumeros: "autre" }));
      expect(res.status).toBe(400);
    });
  });

  describe("pannes", () => {
    it("n8n en panne → le lead part par mail à l'équipe commerciale, réponse 200", async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 502 });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);
      const secours = mailA(EMAIL_COMMERCIAL);
      expect(secours).toBeDefined();
      expect(secours.text).toContain("Boulangerie Dupont");
    });

    it("n8n et mail de secours en panne → 500, le client doit réessayer", async () => {
      fetchMock.mockRejectedValue(new Error("down"));
      mockSend.mockImplementation(async (m: { to: string }) => {
        if (m.to === EMAIL_COMMERCIAL) throw new Error("resend down");
        return { id: "ok" };
      });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(500);
    });

    it("accusé client en échec → le lead est quand même transmis, réponse 200", async () => {
      mockSend.mockRejectedValue(new Error("resend down"));
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);
      expect(appelWebhook()).toBeDefined();
    });
  });
});

/**
 * Route /api/3cx-smb-solo/devis — formulaire de devis de l'offre mono-utilisateur.
 *
 * Le socle est celui de 3CX Free (2026-11-03) : anti-spam invisible, vérification
 * du SIRET, accusé Resend, lead transmis à n8n par webhook protégé.
 * Ce qui change ici : la formule visée et le sort du numéro.
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

import { POST } from "@/app/api/3cx-smb-solo/devis/route";
import { resetRateLimits } from "@/lib/api/rate-limit";

const WEBHOOK_URL = "https://n8n.example.test/webhook/devis-3cx-smb-solo";
const WEBHOOK_SECRET = "secret-smb-solo-test";
const EMAIL_COMMERCIAL = "commercial@e2i-voip.com";

const PAYLOAD = {
  nom: "Dupont",
  prenom: "Marie",
  societe: "Atelier Dupont",
  siret: "552 081 317 66522",
  telephoneFixe: "0596 12 34 56",
  telephoneMobile: "0696 12 34 56",
  email: "marie@atelier.example",
  formule: "advanced",
  besoinNumeros: "portabilite",
  message: "Je garde mon numéro 0596 et je travaille seul.",
  consentementRgpd: true,
  website: "",
  formStartedAt: Date.now() - 5000,
  pageUrl: "https://www.e2i-voip.com/telephonie-entreprise/3cx-smb-solo",
};

function requete(
  payload: unknown,
  ip = "1.2.3.4",
  headers: Record<string, string> = {},
): Request {
  return new Request("https://e2i-voip.com/api/3cx-smb-solo/devis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-E2I-Form": "devis-3cx-smb-solo",
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
  return mockSend.mock.calls.map((c) => c[0]).find((m) => m.to === destinataire);
}

describe("POST /api/3cx-smb-solo/devis", () => {
  const envOrigine = process.env;
  const fetchOrigine = global.fetch;

  beforeEach(() => {
    resetRateLimits();
    mockSend.mockReset().mockResolvedValue({ id: "mail-1" });
    mockVerifierSiret.mockReset().mockResolvedValue({
      siret: "55208131766522",
      statut: "actif",
      raisonSociale: "ATELIER DUPONT",
    });
    fetchMock.mockReset().mockResolvedValue({ ok: true, status: 200 });
    global.fetch = fetchMock as unknown as typeof fetch;
    const { checkBotId } = require("botid/server") as { checkBotId: jest.Mock };
    checkBotId.mockReset().mockResolvedValue({ isBot: false });
    process.env = {
      ...envOrigine,
      RESEND_API_KEY: "re_test",
      RESEND_FROM_EMAIL: "E2I VoIP <noreply@e2i-voip.com>",
      N8N_DEVIS_3CX_SMB_SOLO_WEBHOOK_URL: WEBHOOK_URL,
      N8N_DEVIS_3CX_SMB_SOLO_WEBHOOK_SECRET: WEBHOOK_SECRET,
      DEVIS_COMMERCIAL_EMAIL: EMAIL_COMMERCIAL,
    };
  });

  afterAll(() => {
    process.env = envOrigine;
    global.fetch = fetchOrigine;
  });

  describe("cas nominal", () => {
    it("répond 200, transmet le lead à n8n avec la clé secrète et accuse réception au client", async () => {
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);

      const appel = appelWebhook();
      expect(appel).toBeDefined();
      expect(appel![1].headers["X-E2I-Webhook-Secret"]).toBe(WEBHOOK_SECRET);

      const accuse = mailA(PAYLOAD.email);
      expect(accuse).toBeDefined();
      expect(accuse.subject).toMatch(/3CX SMB SOLO/);
    });

    it("transmet la formule, le besoin d'un seul numéro et le SIRET vérifié", async () => {
      await POST(requete(PAYLOAD));
      const lead = corpsWebhook();
      expect(lead.source).toBe("site-e2ivoip/3cx-smb-solo");
      expect(lead.version).toBe(1);
      expect(lead.formule).toBe("advanced");
      expect(lead.besoin).toEqual({ numeros: "portabilite", nombreNumeros: 1 });
      expect(lead.contact.societe).toBe("Atelier Dupont");
      expect(lead.siret.statut).toBe("actif");
      expect(lead.anomalies).toEqual([]);
    });

    it("ne déclare aucun numéro quand le client n'en a pas à transférer", async () => {
      await POST(requete({ ...PAYLOAD, besoinNumeros: "sans-numero" }));
      expect(corpsWebhook().besoin).toEqual({ numeros: "sans-numero", nombreNumeros: null });
    });

    it("retombe sur l'identité du contact quand le nom d'activité est vide", async () => {
      await POST(requete({ ...PAYLOAD, societe: "" }));
      expect(corpsWebhook().contact.societe).toBe("Marie Dupont");
    });

    it("accepte la formule « à conseiller »", async () => {
      await POST(requete({ ...PAYLOAD, formule: "a-conseiller" }));
      expect(corpsWebhook().formule).toBe("a-conseiller");
    });
  });

  describe("champs obligatoires", () => {
    it.each([
      ["nom", ""],
      ["prenom", ""],
      ["telephoneMobile", ""],
      ["email", ""],
      ["message", ""],
    ])("refuse un %s vide", async (champ, valeur) => {
      const res = await POST(requete({ ...PAYLOAD, [champ]: valeur }));
      expect(res.status).toBe(400);
      expect(appelWebhook()).toBeUndefined();
    });

    it("refuse un mobile sans chiffres exploitables", async () => {
      const res = await POST(requete({ ...PAYLOAD, telephoneMobile: "à venir" }));
      expect(res.status).toBe(400);
    });

    it("refuse une adresse e-mail malformée", async () => {
      const res = await POST(requete({ ...PAYLOAD, email: "marie(at)atelier" }));
      expect(res.status).toBe(400);
    });

    it("refuse l'envoi sans consentement RGPD", async () => {
      const res = await POST(requete({ ...PAYLOAD, consentementRgpd: false }));
      expect(res.status).toBe(400);
    });

    it("refuse une formule inconnue", async () => {
      const res = await POST(requete({ ...PAYLOAD, formule: "premium" }));
      expect(res.status).toBe(400);
    });

    it("refuse un besoin de numéro inconnu", async () => {
      const res = await POST(requete({ ...PAYLOAD, besoinNumeros: "peut-etre" }));
      expect(res.status).toBe(400);
    });

    it("refuse un message au-delà de 5 000 caractères", async () => {
      const res = await POST(requete({ ...PAYLOAD, message: "x".repeat(5001) }));
      expect(res.status).toBe(400);
    });
  });

  describe("anti-spam", () => {
    it("refuse quand le champ piège est rempli", async () => {
      const res = await POST(requete({ ...PAYLOAD, website: "https://spam.example" }));
      expect(res.status).toBe(400);
      expect(appelWebhook()).toBeUndefined();
    });

    it("refuse une soumission trop rapide pour un humain", async () => {
      const res = await POST(requete({ ...PAYLOAD, formStartedAt: Date.now() }));
      expect(res.status).toBe(400);
    });

    it("refuse un envoi cross-site", async () => {
      const res = await POST(requete(PAYLOAD, "1.2.3.4", { "sec-fetch-site": "cross-site" }));
      expect(res.status).toBe(403);
    });

    it("refuse un envoi sans l'en-tête du formulaire", async () => {
      const res = await POST(requete(PAYLOAD, "1.2.3.4", { "X-E2I-Form": "autre-formulaire" }));
      expect(res.status).toBe(403);
    });

    it("refuse un contenu qui n'est pas du JSON", async () => {
      const res = await POST(
        new Request("https://e2i-voip.com/api/3cx-smb-solo/devis", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "X-E2I-Form": "devis-3cx-smb-solo",
            "x-forwarded-for": "5.6.7.8",
          },
          body: "bonjour",
        }),
      );
      expect(res.status).toBe(415);
    });

    it("bloque au-delà de cinq envois depuis la même adresse, sans atteindre n8n", async () => {
      for (let i = 0; i < 5; i += 1) {
        await POST(requete(PAYLOAD, "9.9.9.9"));
      }
      const appelsAvant = fetchMock.mock.calls.length;
      const res = await POST(requete(PAYLOAD, "9.9.9.9"));
      expect(res.status).toBe(429);
      expect(fetchMock.mock.calls.length).toBe(appelsAvant);
    });

    it("refuse un visiteur identifié comme robot", async () => {
      const { checkBotId } = require("botid/server") as { checkBotId: jest.Mock };
      checkBotId.mockResolvedValue({ isBot: true });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(403);
      expect(appelWebhook()).toBeUndefined();
    });

    it("refuse un corps de plus de 32 Ko, indépendamment de la limite du message", async () => {
      // Le message reste court : seul le volume total dépasse la limite. Sans
      // cette distinction, le test passerait encore si le contrôle des 32 Ko
      // disparaissait, puisque la limite de 5 000 caractères rejetterait aussi.
      const res = await POST(requete({ ...PAYLOAD, telephoneFixe: "0".repeat(40000) }));
      expect(res.status).toBe(413);
      expect(appelWebhook()).toBeUndefined();
    });
  });

  describe("panne de n8n", () => {
    it("n'envoie AUCUN mail de secours quand n8n a accepté le lead", async () => {
      await POST(requete(PAYLOAD));
      expect(mailA(EMAIL_COMMERCIAL)).toBeUndefined();
      expect(mockSend).toHaveBeenCalledTimes(1); // l'accusé client seulement
    });

    it("répond 200 même si l'accusé client échoue", async () => {
      mockSend.mockResolvedValue({ error: { message: "domaine non vérifié" } });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);
      expect(appelWebhook()).toBeDefined();
    });

    it("répond 500 si n8n n'est pas configuré et qu'aucun secours n'est possible", async () => {
      // Ni webhook, ni destinataire de secours : le lead n'a aucun chemin.
      delete process.env.N8N_DEVIS_3CX_SMB_SOLO_WEBHOOK_URL;
      delete process.env.DEVIS_COMMERCIAL_EMAIL;
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(500);
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("réutilise le secret du webhook 3CX Free quand le secret dédié manque", async () => {
      delete process.env.N8N_DEVIS_3CX_SMB_SOLO_WEBHOOK_SECRET;
      process.env.N8N_DEVIS_3CX_FREE_WEBHOOK_SECRET = "secret-partage";
      await POST(requete(PAYLOAD));
      expect(appelWebhook()![1].headers["X-E2I-Webhook-Secret"]).toBe("secret-partage");
    });

    it("envoie le lead par mail de secours quand le webhook échoue", async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 502 });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(200);
      const secours = mailA(EMAIL_COMMERCIAL);
      expect(secours).toBeDefined();
      expect(secours.subject).toMatch(/Secours n8n/);
      expect(secours.text).toMatch(/3CX SMB SOLO/);
    });

    it("répond 500 quand ni n8n ni le mail de secours n'aboutissent", async () => {
      fetchMock.mockRejectedValue(new Error("réseau"));
      mockSend.mockResolvedValue({ error: { message: "refus" } });
      const res = await POST(requete(PAYLOAD));
      expect(res.status).toBe(500);
    });
  });

  describe("confidentialité de l'accusé", () => {
    it("ne recopie aucun texte libre du client dans l'accusé", async () => {
      await POST(requete({ ...PAYLOAD, message: "Message privé à ne pas renvoyer" }));
      const accuse = mailA(PAYLOAD.email);
      expect(accuse.text).not.toMatch(/Message privé/);
      expect(accuse.html).not.toMatch(/Message privé/);
    });

    it("n'accepte pas une pageUrl d'un autre domaine", async () => {
      await POST(requete({ ...PAYLOAD, pageUrl: "https://pirate.example/page" }));
      expect(corpsWebhook().pageUrl).toBe("");
    });
  });
});

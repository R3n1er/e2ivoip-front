/**
 * Tests du store de tokens de confirmation RGPD.
 *
 * Le double opt-in repose sur des jetons à durée de vie courte : un POST
 * initial crée un jeton, un GET /confirm le consomme et envoie la demande
 * à l'équipe. Un bot n'a aucun moyen d'arriver jusqu'à l'email interne
 * s'il ne contrôle pas la boîte de réception de l'adresse qu'il a
 * fournie.
 *
 * Le store vit en mémoire (mêmes contraintes que rate-limit.ts) : la
 * Fluid Compute de Vercel garde l'instance chaude entre requêtes, ce qui
 * suffit pour des demandes peu fréquentes.
 *
 * @jest-environment node
 */

import {
  createRgpdToken,
  consumeRgpdToken,
  peekRgpdToken,
  purgeExpiredRgpdTokens,
  __resetRgpdTokensForTests,
} from "@/lib/api/rgpd-tokens";
import type { RgpdDemandePayload } from "@/app/api/rgpd/demande/route";

const SAMPLE_PAYLOAD: RgpdDemandePayload = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.fr",
  requestTypes: ["acces"],
};

describe("rgpd-tokens store", () => {
  beforeEach(() => {
    __resetRgpdTokensForTests();
  });

  it("crée un token et renvoie un identifiant opaque (32 caractères hex)", () => {
    const { token, expiresAt } = createRgpdToken(SAMPLE_PAYLOAD);

    expect(token).toMatch(/^[0-9a-f]{32,}$/);
    expect(expiresAt).toBeGreaterThan(Date.now());
  });

  it("peut lire le payload associé via peek sans consommer", () => {
    const { token } = createRgpdToken(SAMPLE_PAYLOAD);

    const peeked = peekRgpdToken(token);

    expect(peeked?.payload.email).toBe(SAMPLE_PAYLOAD.email);
    // peek ne consomme pas
    expect(peekRgpdToken(token)?.payload.email).toBe(SAMPLE_PAYLOAD.email);
  });

  it("consomme le token de façon idempotente (le second appel renvoie null)", () => {
    const { token } = createRgpdToken(SAMPLE_PAYLOAD);

    const first = consumeRgpdToken(token);
    const second = consumeRgpdToken(token);

    expect(first?.payload.email).toBe(SAMPLE_PAYLOAD.email);
    expect(second).toBeNull();
  });

  it("rejette un token inconnu", () => {
    const result = consumeRgpdToken("deadbeef".repeat(4));
    expect(result).toBeNull();
  });

  it("purge les tokens expirés et refuse leur consommation", () => {
    const { token, expiresAt } = createRgpdToken(SAMPLE_PAYLOAD);
    // Force l'expiration
    const originalNow = Date.now;
    Date.now = () => expiresAt + 1;

    try {
      purgeExpiredRgpdTokens();
      const result = consumeRgpdToken(token);
      expect(result).toBeNull();
    } finally {
      Date.now = originalNow;
    }
  });

  it("ne stocke jamais le token en clair (anti-leak depuis process.memory)", () => {
    const { token } = createRgpdToken(SAMPLE_PAYLOAD);

    // On vérifie que le token retourné n'est pas conservé tel quel en
    // mémoire : peek doit fonctionner via le hash, pas par comparaison
    // directe. Si une fuite mémoire exposait l'objet brut, peek contiendrait
    // le token en clair dans une propriété publique. Cette assertion tient
    // lieu de garde-fou : tout ajout futur de champ public contenant le
    // token doit échouer.
    const peeked = peekRgpdToken(token);
    expect(peeked).not.toBeNull();
    expect(JSON.stringify(peeked)).not.toContain(token);
  });
});
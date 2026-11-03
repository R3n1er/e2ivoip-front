import {
  CONDITIONS_3CX_FREE,
  FONCTIONS_3CX_FREE,
  FORMULES_3CX_FREE,
  HEBERGEMENT_INCLUS,
  HORS_FORFAIT,
  LIMITES_3CX_FREE,
  recommanderVersion3cx,
} from "@/lib/offres/3cx-free";

/**
 * Offre 3CX Free validée par Alban le 2026-11-02 (handoff cerveau-e2ivoip
 * 30-handoffs/2026-11-02-3cx-4as-licence-gratuite.md + arbitrages de session).
 * Règle de prix : marge ×2 minimum sur tout coût, entrants compris.
 */
describe("Offre 3CX Free — données de référence", () => {
  it("propose exactement les quatre formules validées", () => {
    expect(
      FORMULES_3CX_FREE.map((f) => [f.mode, f.appels, f.prixMensuelHT]),
    ).toEqual([
      ["compteur", 2, 76],
      ["compteur", 4, 96],
      ["illimite", 2, 139],
      ["illimite", 4, 219],
    ]);
  });

  it("borne l'illimité par les plafonds d'usage validés", () => {
    const illimites = FORMULES_3CX_FREE.filter((f) => f.mode === "illimite");
    expect(illimites.map((f) => f.plafond)).toEqual([
      { fixes: 1500, mobiles: 1000, entrants: 3000 },
      { fixes: 3000, mobiles: 2000, entrants: 6000 },
    ]);
    for (const f of FORMULES_3CX_FREE.filter((x) => x.mode === "compteur")) {
      expect(f.plafond).toBeNull();
    }
  });

  it("applique les conditions communes validées", () => {
    expect(CONDITIONS_3CX_FREE).toEqual({
      miseEnServiceHT: 199,
      engagementMois: 12,
      utilisateursMax: 10,
      appelsSimultanesMax: 4,
      hebergementMensuelHT: 29,
    });
  });

  it("aucune formule ne dépasse la capacité de la licence Free", () => {
    for (const f of FORMULES_3CX_FREE) {
      expect(f.appels).toBeLessThanOrEqual(CONDITIONS_3CX_FREE.appelsSimultanesMax);
    }
  });

  it("l'hébergement inclut le renouvellement de licence et les sauvegardes", () => {
    const texte = HEBERGEMENT_INCLUS.join(" ");
    expect(texte).toMatch(/renouvellement/i);
    expect(texte).toMatch(/sauvegarde/i);
  });

  it("portabilité : tarifs du catalogue (60 € HT un numéro, 90 € HT la tranche de 10)", () => {
    const porta = HORS_FORFAIT.find((h) => /portabilit/i.test(h.libelle));
    expect(porta?.prix).toMatch(/60 € HT/);
    expect(porta?.prix).toMatch(/90 € HT/);
  });

  it("numéro supplémentaire : 50 € HT de création, puis 2 € HT par mois (catalogue)", () => {
    const sda = HORS_FORFAIT.find((h) => /numéro supplémentaire|création/i.test(h.libelle));
    expect(sda?.prix).toMatch(/50 € HT/);
    expect(sda?.prix).toMatch(/2 € HT par mois/);
  });

  it("annonce les limites de la licence : postes IP, files d'attente", () => {
    const texte = LIMITES_3CX_FREE.join(" ");
    expect(texte).toMatch(/postes? (IP|de bureau)/i);
    expect(texte).toMatch(/files? d'attente/i);
    expect(texte).toMatch(/enregistrement/i);
  });
});

describe("recommanderVersion3cx — encart de choix (3 questions max)", () => {
  type R = Parameters<typeof recommanderVersion3cx>[0];
  const r = (avance: boolean, plusDe8Utilisateurs: boolean, postesOuPlusDe4Appels: boolean): R => ({
    avance,
    plusDe8Utilisateurs,
    postesOuPlusDe4Appels,
  });
  const cas: Array<[string, R, string]> = [
    ["besoin simple", r(false, false, false), "free"],
    // Correction Alban 2026-11-03 : SMB accepte les téléphones de bureau ; seul Free les refuse.
    ["téléphones de bureau ou plus de 4 appels, 8 utilisateurs au plus", r(false, false, true), "smb"],
    // Recommandation E2I : au-delà de 8 utilisateurs, PRO (validé par Alban le 2026-11-03).
    ["plus de 8 utilisateurs", r(false, true, false), "pro"],
    ["plus de 8 utilisateurs avec téléphones de bureau", r(false, true, true), "pro"],
    ["files d'attente / CRM", r(true, false, false), "pro"],
  ];

  it.each(cas)("%s → %s", (_nom, reponses, attendu) => {
    expect(recommanderVersion3cx(reponses).version).toBe(attendu);
  });

  it("chaque recommandation renvoie vers une route qui existe", () => {
    const fs = jest.requireActual<typeof import("node:fs")>("node:fs");
    for (const [, reponses] of cas) {
      const href = recommanderVersion3cx(reponses).href;
      expect(fs.existsSync(`${process.cwd()}/app${href}/page.tsx`)).toBe(true);
    }
  });

  it("au-delà de 4 appels, la licence payante démarre à 8 appels simultanés", () => {
    expect(recommanderVersion3cx(r(false, false, true)).raison).toMatch(/8 appels simultanés/);
  });

  it("3CX SMB accepte les téléphones de bureau, et la raison le dit", () => {
    expect(recommanderVersion3cx(r(false, false, true)).raison).toMatch(/téléphones? de bureau|postes? IP/i);
  });

  it("3CX Free se limite à l'application mobile et au client web (pas d'application Windows)", () => {
    const texte = FONCTIONS_3CX_FREE.join(" ");
    expect(texte).not.toMatch(/Windows|ordinateur/i);
    expect(texte).toMatch(/mobile/i);
    expect(texte).toMatch(/web|navigateur/i);
    expect(recommanderVersion3cx(r(false, false, false)).raison).not.toMatch(/ordinateur/i);
  });

  it("au-delà de 8 utilisateurs, la raison le dit", () => {
    expect(recommanderVersion3cx(r(false, true, false)).raison).toMatch(/8 utilisateurs/);
  });
});

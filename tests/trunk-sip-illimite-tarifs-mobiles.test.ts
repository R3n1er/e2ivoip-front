import fs from "node:fs";
import path from "node:path";

/**
 * Grille communications client final corrigée le 2026-10-24 :
 * les mobiles Martinique et La Réunion sont au même prix que les mobiles
 * Guadeloupe (0,0600 € HT/min). L'ancien 0,0180 € était une erreur de saisie.
 * Source : cerveau-e2ivoip 10-wiki/commercial/grille-communications-compteur-client-final.md
 */
const source = fs.readFileSync(
  path.join(process.cwd(), "app/telephonie-entreprise/trunk-sip-illimite/page.tsx"),
  "utf8",
);

function prixMobile(destination: string): string | undefined {
  const re = new RegExp(`destination: "${destination}", prix: "([^"]+)"`);
  return source.match(re)?.[1];
}

describe("Trunk SIP illimité — tarifs mobiles DOM", () => {
  it.each(["Mobile Martinique", "Mobile La Réunion", "Mobile Guyane"])(
    "%s est facturé 0,0600 €",
    (destination) => {
      expect(prixMobile(destination)).toBe("0,0600 €");
    },
  );

  it("n'affiche plus l'ancien tarif erroné de 0,0180 €", () => {
    expect(source).not.toContain("0,0180 €");
  });
});

/**
 * Arbitrage Alban (2026-11-02) : l'illimité est interdit aux centres
 * d'appels (fair use). La page ne peut citer les centres d'appels que pour
 * les EXCLURE, jamais comme cible.
 */
describe("Trunk SIP illimité — centres d'appels exclus", () => {
  it("ne présente jamais les centres d'appels comme cible", () => {
    const phrases = source
      .replace(/&apos;/g, "'")
      .split(/[.\n"]/)
      .filter((p) => /centres? d'appels/i.test(p));
    expect(phrases.length).toBeGreaterThan(0);
    for (const p of phrases) {
      expect(p).toMatch(/exclu|comme ceux/i);
    }
  });
});

/**
 * Arbitrage Alban (2026-11-02) : le seuil « ~200 min/mois » était
 * invérifiable (200 min de fixes coûtent 3 à 5 € HT au compteur). Aucun
 * seuil de rentabilité chiffré sans calcul publié.
 */
describe("Trunk SIP illimité — pas de seuil de rentabilité invérifiable", () => {
  it("n'annonce aucun seuil en minutes par mois", () => {
    expect(source).not.toMatch(/min\/mois/);
  });
});

/**
 * Arbitrage Alban (2026-11-02) : « tout inclus », « pas de frais cachés » et
 * « sans surprise » sont contredits par les mobiles au compteur et les frais
 * de mise en service. Interdits sur la page.
 */
describe("Trunk SIP illimité — pas de promesse « tout inclus »", () => {
  it.each([/tout inclus/i, /frais cachés/i, /sans surprise/i, /mauvaise\s+surprise/i])(
    "n'utilise pas %s",
    (motif) => {
      expect(source.replace(/\s+/g, " ")).not.toMatch(motif);
    },
  );
});

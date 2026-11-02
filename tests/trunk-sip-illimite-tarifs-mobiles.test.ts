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

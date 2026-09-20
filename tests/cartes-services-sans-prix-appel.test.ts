import fs from "node:fs";
import path from "node:path";

/**
 * Arbitrage Alban (2026-09-19) : les cartes de service n'affichent pas de
 * prix d'appel.
 *
 * Deux raisons distinctes :
 *  1. Commerciale — « À partir de 50€ » sur le studio exposait un plancher
 *     qui ne correspondait à aucune prestation vendue telle quelle.
 *  2. Légale — le montant était écrit sans mention « HT », alors que les
 *     mêmes 50 € dans `lib/faq-data.tsx` sont bien libellés « 50 € HT ».
 *     L'arrêté du 3 décembre 1987 impose d'indiquer si un prix B2B s'entend
 *     hors taxes.
 *
 * Ce garde-fou balaie LES DEUX composants qui portent des cartes. La revue
 * croisée de septembre a montré que le défaut récurrent n'est pas l'absence
 * de test mais le test qui ne regarde qu'un seul des fichiers concernés.
 */
const COMPOSANTS_CARTES = [
  "components/services-section-simple.tsx",
  "app/nos-services/page.tsx",
];

/** Les valeurs du champ `price:` déclarées dans un composant. */
function prixDeclares(relativePath: string): string[] {
  const source = fs.readFileSync(
    path.join(process.cwd(), relativePath),
    "utf8",
  );
  return [...source.matchAll(/price:\s*"([^"]*)"/g)].map((m) => m[1]);
}

describe("cartes de service — aucun prix d'appel", () => {
  it.each(COMPOSANTS_CARTES)(
    "%s n'affiche aucun montant introduit par « à partir de »",
    (relativePath) => {
      for (const prix of prixDeclares(relativePath)) {
        expect(prix).not.toMatch(/à partir de\s*\d/i);
      }
    },
  );

  it.each(COMPOSANTS_CARTES)(
    "%s n'annonce aucun dimensionnement chiffré en guise de prix",
    (relativePath) => {
      // « À partir de 2 canaux voix » n'est pas un prix : c'est un
      // dimensionnement inventé, du même type que celui retiré des
      // métadonnées par la PR #66.
      for (const prix of prixDeclares(relativePath)) {
        expect(prix).not.toMatch(/\d+\s*canaux/i);
      }
    },
  );

  it.each(COMPOSANTS_CARTES)(
    "%s libelle « HT » tout montant en euros qu'il affiche encore",
    (relativePath) => {
      // Un tarif public reste permis — celui de la 3CX SMB l'est. Mais un
      // prix B2B sans mention HT/TTC est une infraction, pas un détail.
      for (const prix of prixDeclares(relativePath)) {
        if (/\d\s*€/.test(prix)) expect(prix).toMatch(/\bHT\b/);
      }
    },
  );
});

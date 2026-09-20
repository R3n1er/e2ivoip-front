import fs from "node:fs";
import path from "node:path";

/**
 * Maillage interne du hub /standard-telephonique.
 *
 * Le hub est né sans aucun lien entrant : il n'était atteignable que par le
 * sitemap, qui fait découvrir une page mais ne lui transmet pas d'autorité.
 *
 * Arbitrage Alban (2026-09-19) : le lien vit dans le FOOTER uniquement. Le
 * sous-menu « Téléphonie d'entreprise » du header reste une liste de
 * produits ; y placer un hub de sujet brouillait sa lecture.
 *
 * Ce fichier teste les DEUX directions. Ne vérifier que la présence au
 * footer laisserait réintroduire le lien au header sans rien casser — le
 * défaut exact relevé quatre fois par la revue croisée de septembre.
 */
const HUB_HREF = "/standard-telephonique";

function lire(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

/** Les href de navigation déclarés dans un composant. */
function hrefs(relativePath: string): string[] {
  return [...lire(relativePath).matchAll(/href[=:]\s*["']([^"']+)["']/g)].map(
    (m) => m[1],
  );
}

describe("maillage du hub /standard-telephonique", () => {
  it("le footer pointe vers le hub", () => {
    expect(hrefs("components/layout/footer.tsx")).toContain(HUB_HREF);
  });

  it("le header ne pointe pas vers le hub", () => {
    // Exact et non `startsWith` : les pages territoriales
    // (/standard-telephonique/guyane) ne sont pas concernées par cet
    // arbitrage, seul le hub l'est.
    expect(hrefs("components/layout/header-simple.tsx")).not.toContain(
      HUB_HREF,
    );
  });

  it("le hub garde au moins un lien entrant dans la navigation globale", () => {
    // Garde-fou de dernier recours : si un jour le lien disparaissait aussi
    // du footer, ce test échouerait avant que le hub ne redevienne orphelin.
    const liens = [
      ...hrefs("components/layout/footer.tsx"),
      ...hrefs("components/layout/header-simple.tsx"),
    ];
    expect(liens.filter((h) => h === HUB_HREF).length).toBeGreaterThan(0);
  });
});

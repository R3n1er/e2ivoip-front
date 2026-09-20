import fs from "node:fs";
import path from "node:path";

/**
 * Le H1 de la home est le deuxième signal de pertinence après le <title>.
 * Il n'était gardé par aucun test avant ce fichier — c'est précisément le
 * motif relevé par la revue croisée : un actif SEO majeur sans filet.
 *
 * Ces tests vérifient le *contrat* (quels termes doivent ou ne doivent pas
 * apparaître), jamais la phrase littérale : reformuler reste possible,
 * perdre le mot-clé cible ne l'est pas.
 */
const HERO = path.join(
  process.cwd(),
  "components/homepage-hero-section-simple.tsx",
);

function lireHero(): string {
  return fs.readFileSync(HERO, "utf8");
}

/** Extrait le contenu textuel du <h1>, entités HTML résolues. */
function extraireH1(source: string): string {
  const bloc = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!bloc) throw new Error("Aucun <h1> trouvé dans le hero de la home.");
  return bloc[1]
    .replace(/\{[^}]*\}/g, " ") // expressions JSX : {" "}, {variable}
    .replace(/<[^>]+>/g, " ") // balises imbriquées : <span>, <br />
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

describe("H1 de la home — mot-clé cible", () => {
  it("porte « téléphonie IP », la requête sur laquelle le site se positionne", () => {
    expect(extraireH1(lireHero())).toMatch(/téléphonie\s+IP/i);
  });

  it("n'emploie plus « téléphonie DOM », expression sans volume de recherche", () => {
    expect(extraireH1(lireHero())).not.toMatch(/téléphonie\s+DOM/i);
  });

  it("conserve l'ancrage territorial", () => {
    // Le territoire doit rester dans le H1 : sans lui, la page perd le
    // signal local qui la distingue des opérateurs métropolitains.
    expect(extraireH1(lireHero())).toMatch(/Antilles|Guyane|Réunion|DOM/i);
  });

  it("conserve l'échéance cuivre, qui porte la tension de l'accroche", () => {
    // La ligne éditoriale interdit le prix en accroche : c'est la date qui
    // crée l'urgence. La perdre ferait retomber le H1 dans le générique.
    expect(extraireH1(lireHero())).toMatch(/cuivre/i);
    expect(extraireH1(lireHero())).toMatch(/\b20\d{2}\b/);
  });

  it("reste unique — une seule balise h1 dans le hero", () => {
    expect(lireHero().match(/<h1[\s>]/g)?.length ?? 0).toBe(1);
  });
});

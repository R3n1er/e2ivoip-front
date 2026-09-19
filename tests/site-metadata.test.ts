import { readFileSync } from "fs";
import path from "path";
import { HOME_PAGE_TITLE } from "@/lib/site";

describe("métadonnées de la page d'accueil", () => {
  it("nomme les produits vendus dans une longueur SEO maîtrisée", () => {
    // Arbitrage Alban (2026-09-19), après revue croisée Codex + Opus.
    //
    // « Opérateur de services télécom DOM » ne disait pas ce qui est vendu —
    // Google recomposait l'encart avec les puces de la page. Une première
    // version basculait vers « Standard téléphonique & Trunk SIP » mais
    // évacuait « téléphonie IP », le champ sur lequel le site est déjà 2e.
    //
    // On verrouille le CONTRAT (les trois actifs présents, la longueur
    // tenue), pas la chaîne exacte : un `toBe` littéral transformait tout
    // ajustement ultérieur du titre en cassage de test, ce qui décourage de
    // revenir en arrière si Search Console montrait une perte de position.
    expect(HOME_PAGE_TITLE).toMatch(/opérateur/i);
    expect(HOME_PAGE_TITLE).toMatch(/téléphonie IP/i);
    expect(HOME_PAGE_TITLE).toMatch(/standard téléphonique/i);
    expect(HOME_PAGE_TITLE).toContain("E2I VoIP");
    expect(HOME_PAGE_TITLE.length).toBeLessThanOrEqual(60);
  });

  it("la description de la home nomme les produits et reste dans le format SERP", () => {
    // Google recoupe la meta avec le contenu visible ; elle doit citer les
    // mêmes produits que le titre.
    const layout = readFileSync(
      path.join(process.cwd(), "app", "layout.tsx"),
      "utf-8",
    );
    const description = layout.match(/description:\s*\n\s*"([^"]{80,})"/)?.[1];
    expect(description).toBeTruthy();
    expect(description).toMatch(/standard téléphonique/i);
    expect(description).toMatch(/Trunk SIP/);
    expect(description!.length).toBeLessThanOrEqual(160);
  });
});

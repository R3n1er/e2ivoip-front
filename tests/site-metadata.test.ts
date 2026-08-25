import { HOME_PAGE_TITLE } from "@/lib/site";

describe("métadonnées de la page d'accueil", () => {
  it("cible l'opérateur télécom DOM dans une longueur SEO maîtrisée", () => {
    expect(HOME_PAGE_TITLE).toBe(
      "Opérateur de services télécom DOM | E2I VoIP",
    );
    expect(HOME_PAGE_TITLE.startsWith("Opérateur de services télécom DOM")).toBe(true);
    expect(HOME_PAGE_TITLE.length).toBeLessThanOrEqual(60);
  });
});

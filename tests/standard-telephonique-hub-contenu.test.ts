import fs from "node:fs";
import path from "node:path";

/**
 * Le hub /standard-telephonique s'adresse à l'acheteur, pas au technicien :
 * ses titres emploient le vocabulaire métier. Mais éviter complètement le
 * jargon lui faisait perdre « Trunk SIP », que les prospects avertis
 * recherchent et auquel deux pages du site sont consacrées.
 *
 * Arbitrage Alban (2026-09-19) : le terme figure dans le H3 et dans le
 * corps, en équivalence explicite avec la formulation métier. Ces tests
 * gardent le contrat — la présence du mot-clé et le maillage vers le silo —
 * sans figer les phrases qui l'expriment.
 */
const HUB = path.join(process.cwd(), "app/standard-telephonique/page.tsx");

function lireHub(): string {
  return fs.readFileSync(HUB, "utf8");
}

describe("hub /standard-telephonique — mot-clé Trunk SIP", () => {
  it("mentionne « Trunk SIP » dans le corps de la page", () => {
    expect(lireHub()).toMatch(/Trunk SIP/);
  });

  it("porte « Trunk SIP » dans un titre de section, pas seulement en note", () => {
    // Un mot-clé cité une fois en bas de page ne pèse pas. Le H3 est le
    // niveau où Google lit la structure du sujet.
    const titres = [...lireHub().matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(
      (m) => m[1],
    );
    expect(titres.some((titre) => /Trunk SIP/.test(titre))).toBe(true);
  });

  it("conserve la glose métier à côté du jargon", () => {
    // Le terme seul exclurait le dirigeant qui ne le connaît pas : la page
    // doit continuer de dire ce qu'est un Trunk SIP.
    expect(lireHub()).toMatch(/raccordement|lien entre votre standard/i);
  });

  it("maille vers les deux formules du silo Trunk SIP", () => {
    const source = lireHub();
    expect(source).toContain("/telephonie-entreprise/trunk-sip-compteur");
    expect(source).toContain("/telephonie-entreprise/trunk-sip-illimite");
  });
});

describe("hub /standard-telephonique — l'instance dédiée est nommée", () => {
  /** Les titres de section de la page. */
  function titresH3(): string[] {
    return [...lireHub().matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) =>
      m[1].replace(/&apos;/g, "'").replace(/\s+/g, " ").trim(),
    );
  }

  it("annonce un serveur de téléphonie dans le cloud dès le titre", () => {
    // « Instance dédiée » seul est un terme d'infrastructure : sans volume
    // de recherche, et ambigu pour un dirigeant qui peut y entendre une
    // machine à installer sur site.
    expect(
      titresH3().some((titre) => /serveur de téléphonie/i.test(titre)),
    ).toBe(true);
    expect(titresH3().some((titre) => /cloud/i.test(titre))).toBe(true);
  });

  it("précise que rien n'est hébergé dans les locaux du client", () => {
    // L'offre est cloud : l'écrire noir sur blanc évite un malentendu
    // commercial qui se paie en rendez-vous perdus.
    expect(lireHub()).toMatch(/rien à installer|dans le cloud/i);
  });
});

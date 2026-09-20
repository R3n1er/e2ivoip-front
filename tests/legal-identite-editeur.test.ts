import fs from "node:fs";
import path from "node:path";
import { COMPANY } from "@/lib/legal/company";

/**
 * Identité de l'éditeur — mentions légales.
 *
 * L'article 6-III de la LCEN impose de publier le nom ET la forme juridique
 * de l'éditeur. La page affichait « E2I ASSISTANCE » sans dire ce que ce nom
 * désigne, et ne portait aucune mention de TVA alors que l'article 293 B du
 * CGI l'exige d'un assujetti qui n'en facture pas.
 *
 * Ces tests gardent trois décisions d'Alban (2026-09-19). Deux d'entre elles
 * sont des ABSENCES volontaires — pas d'e-mail, pas de RCS — et une absence
 * non testée finit par être « corrigée » de bonne foi par quelqu'un qui la
 * prend pour un oubli. C'est précisément ce que ces tests empêchent.
 */
const MENTIONS = path.join(
  process.cwd(),
  "app/juridique/mentions-legales/page.tsx",
);

function lireMentions(): string {
  return fs.readFileSync(MENTIONS, "utf8");
}

describe("identité de l'éditeur — mentions obligatoires", () => {
  it("déclare une forme juridique", () => {
    expect(COMPANY.legalForm).toMatch(/entreprise individuelle/i);
  });

  it("déclare la mention de TVA avec son fondement", () => {
    expect(COMPANY.vatStatus).toMatch(/TVA non applicable/i);
    // Le fondement cité protège la mention : sans lui, un relecteur peut la
    // prendre pour un oubli de numéro intracommunautaire.
    expect(COMPANY.vatStatus).toMatch(/293 B/);
    expect(COMPANY.vatStatus).toMatch(/294/);
  });

  it("affiche la forme juridique et la mention TVA sur la page", () => {
    // Un champ renseigné dans le registre mais jamais rendu ne vaut rien :
    // c'est la page qui porte l'obligation, pas la constante.
    const source = lireMentions();
    expect(source).toContain("COMPANY.legalForm");
    expect(source).toContain("COMPANY.vatStatus");
  });
});

describe("absences volontaires — ne pas « corriger »", () => {
  it("ne publie aucun numéro de TVA intracommunautaire", () => {
    // La Guyane est hors du champ territorial de la TVA (CGI art. 294) :
    // E2I ASSISTANCE n'a pas de numéro intracommunautaire à afficher, et en
    // inventer un serait une fausse mention.
    expect(JSON.stringify(COMPANY)).not.toMatch(/\bFR\s?\d{2}\s?\d{9}\b/);
  });

  it("ne déclare ni RCS ni capital social", () => {
    // Une entreprise individuelle n'a ni l'un ni l'autre. Les afficher
    // serait une fausse déclaration sur l'identité de l'éditeur.
    const champs = Object.keys(COMPANY);
    expect(champs).not.toContain("rcs");
    expect(champs).not.toContain("capital");
    expect(champs).not.toContain("capitalSocial");
  });

  it("ne publie aucune adresse e-mail de contact", () => {
    // Arbitrage : le site expose un formulaire et quatre numéros, ce qui
    // satisfait l'exigence de « coordonnées permettant de contacter
    // rapidement » (LCEN art. 6-III). Publier une adresse l'exposerait au
    // spam. Le test porte sur la page rendue, pas sur le registre.
    const texte = lireMentions().replace(/mailto:/g, "");
    expect(texte).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  });
});

describe("contrepartie de l'absence d'e-mail", () => {
  it("la page renvoie vers le formulaire de contact", () => {
    // L'absence d'e-mail n'est défendable que si le canal de remplacement
    // est atteignable depuis la page elle-même. Si ce lien disparaît,
    // l'arbitrage cesse d'être conforme — d'où ce test.
    expect(lireMentions()).toMatch(/["']\/contact["']/);
  });
});

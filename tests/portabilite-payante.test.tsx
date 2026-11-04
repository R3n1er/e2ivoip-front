import fs from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { TARIFS_CREATION_NUMERO, TARIFS_PORTABILITE } from "@/lib/offres/portabilite";
import {
  buildTerritoryFaq,
  COMPTEUR_FAQ,
  FAQ_STANDARD_TELEPHONIQUE,
  type RichFaqItem,
} from "@/lib/faq-data";
import { STANDARD_TELEPHONE_TERRITORIES } from "@/lib/territoires/standard-telephonique";

/**
 * Décision Alban 2026-11-03 : la portabilité n'est pas gratuite. Tarifs du
 * catalogue HubSpot du 2026-10-07 (cerveau-e2ivoip, source des prix).
 */
const texte = (item: RichFaqItem) => {
  const { container } = render(<div>{item.answer}</div>);
  return [item.answerText, container.textContent ?? ""];
};
const portabilite = (faq: RichFaqItem[]) =>
  faq.filter((i) => /portabilit|garder|conserver/i.test(i.question));

describe("Portabilité payante", () => {
  it("tarifs alignés sur le catalogue", () => {
    expect(TARIFS_PORTABILITE).toEqual({ numeroUniqueHT: 60, trancheDe10HT: 90, fiabilisationHT: 60 });
  });

  const fichiers = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return e.name === "node_modules" ? [] : fichiers(p);
      return /\.(tsx?|txt|mdx?)$/.test(e.name) ? [p] : [];
    });
  const cibles = ["app", "components", "lib", "content", "public"]
    .filter((d) => fs.existsSync(d))
    .flatMap(fichiers);

  it.each(cibles)("%s n'annonce pas de portabilité gratuite", (f) => {
    const t = fs.readFileSync(f, "utf8").replace(/\s+/g, " ");
    expect(t).not.toMatch(/portabilit[^."`]{0,60}(gratuit|incluses?\b|offerte)|(gratuitement|sans frais)[^."`]{0,30}portabilit/i);
  });

  it.each([
    ["FAQ standard téléphonique", FAQ_STANDARD_TELEPHONIQUE],
    ["FAQ trunk au compteur", COMPTEUR_FAQ],
    ["FAQ territoire", buildTerritoryFaq(STANDARD_TELEPHONE_TERRITORIES[0])],
  ] as const)("%s : la réponse portabilité affiche les tarifs", (_n, faq) => {
    const items = portabilite([...faq]);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      for (const t of texte(item)) {
        expect(t).toMatch(/60 € HT/);
        expect(t).toMatch(/90 € HT/);
      }
    }
  });
});

describe("Création de numéro SDA France et DOM", () => {
  it("tarifs alignés sur le catalogue", () => {
    expect(TARIFS_CREATION_NUMERO).toEqual({ creationSdaHT: 50, redevanceMensuelleHT: 2, suiteLogiqueHT: 50 });
  });

  const toutesFaq = Object.values(require("@/lib/faq-data") as Record<string, unknown>)
    .filter((v): v is RichFaqItem[] => Array.isArray(v))
    .flat()
    .filter((i) => i && typeof i === "object" && "question" in i);

  it("chaque FAQ sur la création de numéro affiche 50 € HT et 2 € HT par mois", () => {
    const items = toutesFaq.filter((i) => /cr[ée]er|cr[ée]ation|nouveaux? num|suite logique/i.test(i.question));
    expect(items.length).toBeGreaterThanOrEqual(2);
    for (const item of items) {
      for (const t of texte(item)) {
        expect(t).toMatch(/50 € HT/);
      }
    }
  });

  it("la suite logique n'est plus annoncée « 50 €/mois » (c'est un frais unique)", () => {
    for (const item of toutesFaq) {
      expect(item.answerText).not.toMatch(/50 ?€ ?(HT ?)?\/ ?mois/);
    }
  });

  it("la création standard annonce la redevance de 2 € HT par mois", () => {
    const item = toutesFaq.find((i) => /créer de nouveaux numéros/i.test(i.question));
    for (const t of texte(item!)) expect(t).toMatch(/2 € HT par mois/);
  });
});

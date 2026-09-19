import { readFileSync } from "fs";
import path from "path";
import { HOME_PAGE_TITLE } from "@/lib/site";

const read = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), "utf-8");

/**
 * Contrat éditorial de la page d'accueil (arbitrage Alban, 2026-09-19).
 *
 * Google ignore la meta description de la home et recompose le snippet à partir
 * des premières puces visibles. Les puces historiques (« Téléphonie IP
 * disponible par Internet », « À partir de 2 canaux voix ») composaient donc
 * l'encart de marque : elles annonçaient un détail technique au lieu du produit
 * vendu, et « Fixe & Mobile » laissait croire à une offre de téléphonie mobile
 * (périmètre retiré du site).
 *
 * Deux règles verrouillées ici :
 * 1. La home nomme les produits réellement vendus : le standard téléphonique
 *    (3CX / Yeastar) d'abord, puis le Trunk SIP final qui l'alimente.
 * 2. Aucune promesse de téléphonie mobile — les mobiles ne sont évoqués que
 *    comme destination d'appel, jamais comme offre.
 *
 * Les offres revendeurs (Trunk SIP pour agents vocaux IA) ne portent pas le
 * discours tarifaire public : elles restent cantonnées à leur page dédiée.
 */
describe("home — discours produit (anti-snippet)", () => {
  const SOURCES_PUCES = [
    "components/transformation-section.tsx",
    "components/services-section-simple.tsx",
    "app/nos-services/page.tsx",
  ];

  it.each(SOURCES_PUCES)(
    "%s n'annonce plus « Téléphonie IP disponible par Internet »",
    (relativePath) => {
      // Cette formulation était la première puce visible de la home : Google
      // l'a reprise telle quelle dans l'encart de marque.
      expect(read(relativePath)).not.toContain(
        "Téléphonie IP disponible par Internet",
      );
    },
  );

  it.each(SOURCES_PUCES)(
    "%s ne présente pas une offre de téléphonie mobile",
    (relativePath) => {
      // « Fixe & Mobile » collé à la zone géographique se lit comme une offre
      // mobile. La mention n'est légitime que qualifiée (« appels vers »).
      expect(read(relativePath)).not.toMatch(/Fixe\s*&\s*Mobile/);
    },
  );

  it("la home nomme le standard téléphonique parmi ses avantages", () => {
    const source = read("components/transformation-section.tsx");
    expect(source).toMatch(/<strong>Standard téléphonique/);
  });

  it("la home ne vend plus le plancher « 2 canaux voix » comme argument", () => {
    const source = read("components/transformation-section.tsx");
    expect(source).not.toMatch(/À partir de 2 canaux voix/);
  });

  it("la home avance le plancher confirmé de 2 canaux voix, jamais un autre", () => {
    // Arbitrage Alban (2026-09-19) : la grille publique Trunk SIP démarre à
    // 2 canaux voix. Toute autre borne sur la home serait une invention — et
    // un chiffre faux sur la home se retrouve tel quel dans l'encart Google.
    const source = read("components/transformation-section.tsx");
    expect(source).toMatch(/à partir de 2 canaux voix/i);
    expect(source).not.toMatch(/\b(?:[3-9]|\d{2,})\s+canaux voix/i);
  });

  // La version précédente de ce garde-fou ne lisait que
  // transformation-section.tsx, alors que la faute (« de 22 à 64 canaux
  // voix ») avait été introduite dans app/layout.tsx : le test cherchait au
  // mauvais endroit et restait vert. Les métadonnées sont ce que Google,
  // LinkedIn et WhatsApp affichent — elles doivent être couvertes en premier.
  describe("métadonnées — aucun dimensionnement inventé", () => {
    const SOURCES_META = ["app/layout.tsx", "lib/site.ts", "app/page.tsx"];

    it.each(SOURCES_META)("%s n'invente aucune borne de canaux voix", (relativePath) => {
      const source = read(relativePath);
      // Seul « 2 canaux voix » est une borne publiée ; toute autre valeur
      // accolée à cette unité ne correspond à aucun palier de la grille.
      expect(source).not.toMatch(/\b(?:[3-9]|\d{2,})\s+canaux voix/i);
    });

    it.each(SOURCES_META)("%s ne mélange pas appels simultanés et canaux voix", (relativePath) => {
      const source = read(relativePath);
      // Deux unités, deux produits : 3CX PRO se dimensionne en appels
      // simultanés (4 à 64), le Trunk SIP au compteur en canaux voix. Les
      // agréger produit une métrique qui ne décrit aucune offre réelle.
      expect(source).not.toMatch(/appels simultanés[^.]{0,40}canaux voix/i);
      expect(source).not.toMatch(/canaux voix[^.]{0,40}appels simultanés/i);
    });

    it("le titre de la home tient dans la limite de troncature SERP", () => {
      expect(HOME_PAGE_TITLE.length).toBeLessThanOrEqual(60);
    });

    it("le titre conserve les trois actifs de positionnement", () => {
      // Arbitrage Alban (2026-09-19) : on ADDITIONNE le nouveau champ sans
      // abandonner celui sur lequel le site est déjà 2e (« téléphonie IP »),
      // ni le différenciant face aux intégrateurs locaux (« opérateur »).
      expect(HOME_PAGE_TITLE).toMatch(/opérateur/i);
      expect(HOME_PAGE_TITLE).toMatch(/téléphonie IP/i);
      expect(HOME_PAGE_TITLE).toMatch(/standard téléphonique/i);
      expect(HOME_PAGE_TITLE).toContain("E2I VoIP");
    });
  });
});

describe("home — hiérarchie des offres", () => {
  const CARTES = [
    "components/services-section-simple.tsx",
    "app/nos-services/page.tsx",
  ];

  it.each(CARTES)(
    "%s place le standard téléphonique avant le Trunk SIP",
    (relativePath) => {
      // Le standard est ce que les prospects cherchent ; le Trunk SIP est le
      // raccordement. L'ancien ordre (trunk d'abord) inversait la vente.
      // On compare les positions des TITRES de carte : une simple recherche
      // dans le fichier entier tomberait sur la meta description, qui cite les
      // deux offres dans un ordre libre.
      const source = read(relativePath);
      const standardIndex = source.indexOf('title: "Standard téléphonique 3CX"');
      const trunkIndex = source.indexOf('title: "Trunk SIP DOM"');
      expect(standardIndex).toBeGreaterThan(-1);
      expect(trunkIndex).toBeGreaterThan(-1);
      expect(standardIndex).toBeLessThan(trunkIndex);
    },
  );

  it.each(CARTES)(
    "%s ne titre plus la carte par le seul sigle « 3CX SMB PRO »",
    (relativePath) => {
      // Le prospect cherche « standard téléphonique », pas un nom de licence.
      expect(read(relativePath)).not.toMatch(/title:\s*"3CX SMB PRO"/);
    },
  );
});

describe("métadonnées — produits vendus", () => {
  it("la meta description de la home nomme standard téléphonique et Trunk SIP", () => {
    const layout = read("app/layout.tsx");
    const description = layout.match(
      /description:\s*\n\s*"([^"]{80,})"/,
    )?.[1];
    expect(description).toBeTruthy();
    expect(description).toMatch(/standard téléphonique/i);
    expect(description).toMatch(/Trunk SIP/);
    expect(description!.length).toBeLessThanOrEqual(160);
  });

  it("la home déclare les mots-clés produit", () => {
    const layout = read("app/layout.tsx");
    const keywords = layout.match(/keywords:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
    expect(keywords).toMatch(/standard téléphonique/);
    expect(keywords).toMatch(/trunk SIP/i);
  });

  it("le titre de la home garde l'entité opérateur et les deux champs produit", () => {
    // Arbitrage Alban (2026-09-19) : « Trunk SIP » sort du titre de la home.
    // C'est un terme d'acheteur technique, que le dirigeant de PME ne tape
    // pas, et il ranke déjà sur sa page dédiée. Les 11 caractères libérés
    // servent à conserver « téléphonie IP », le champ sur lequel le site est
    // 2e, et « opérateur », le différenciant face aux intégrateurs locaux.
    const site = read("lib/site.ts");
    expect(site).toMatch(/HOME_PAGE_TITLE\s*=\s*\n?\s*"[^"]+"/);
    const title = site.match(/HOME_PAGE_TITLE\s*=\s*\n?\s*"([^"]+)"/)![1];
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title).toMatch(/opérateur/i);
    expect(title).toMatch(/téléphonie IP/i);
    expect(title).toMatch(/standard téléphonique/i);
    expect(title).toMatch(/E2I VoIP/);
  });
});

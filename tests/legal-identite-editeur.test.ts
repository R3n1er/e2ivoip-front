import fs from "node:fs";
import path from "node:path";
import { COMPANY } from "@/lib/legal/company";

/**
 * Identité de l'éditeur — mentions légales.
 *
 * Ce fichier a été profondément corrigé le 2026-09-20 après une revue
 * déléguée à Codex, qui a invalidé trois de ses prémisses juridiques :
 *
 *  1. La mention TVA citait les articles 293 B ET 294 du CGI. Seul le 294
 *     s'applique : il place la Guyane hors du CHAMP TERRITORIAL de la taxe,
 *     inconditionnellement. Le 293 B est la franchise en base, qui
 *     présuppose un territoire soumis à la TVA et dépend d'un seuil de
 *     chiffre d'affaires — le citer laissait croire à un statut révocable.
 *
 *  2. Le fichier interdisait toute clé `rcs`, au motif qu'« une entreprise
 *     individuelle n'a pas de RCS ». C'est faux : une EI exerçant une
 *     activité commerciale EST immatriculée au RCS. C'est l'activité qui
 *     tranche, pas la forme juridique.
 *
 *  3. Le fichier testait l'ABSENCE d'adresse e-mail, sur le fondement de
 *     l'article 6-III de la LCEN. Le texte applicable est l'article 19, qui
 *     vise le commerce électronique et impose bien une adresse.
 *
 * Leçon conservée ici : une affirmation juridique confiante n'est pas une
 * affirmation vérifiée. Chaque test porte désormais son fondement en
 * commentaire, pour qu'il soit contestable plutôt que cru sur parole.
 */
const MENTIONS = path.join(
  process.cwd(),
  "app/juridique/mentions-legales/page.tsx",
);

function lireMentions(): string {
  return fs.readFileSync(MENTIONS, "utf8");
}

describe("identité de l'éditeur — mentions obligatoires", () => {
  it("déclare la qualité de l'éditeur", () => {
    expect(COMPANY.legalForm).toMatch(/entrepreneur individuel/i);
  });

  it("déclare la mention de TVA sur le fondement territorial", () => {
    expect(COMPANY.vatStatus).toMatch(/TVA non applicable/i);
    // L'article 294 — hors champ territorial — et NON le 293 B.
    expect(COMPANY.vatStatus).toMatch(/294/);
    expect(COMPANY.vatStatus).not.toMatch(/293/);
  });

  it("affiche la qualité de l'éditeur et la mention TVA sur la page", () => {
    // Un champ renseigné dans le registre mais jamais rendu ne vaut rien :
    // c'est la page qui porte l'obligation, pas la constante.
    const source = lireMentions();
    expect(source).toContain("COMPANY.legalForm");
    expect(source).toContain("COMPANY.vatStatus");
  });
});

describe("adresse de contact — article 19 de la LCEN", () => {
  it("publie une adresse de courrier électronique", () => {
    // L'article 19 l'impose à toute activité de commerce électronique,
    // définie à l'article 14 comme « l'activité par laquelle une personne
    // propose ou assure à distance et par voie électronique la fourniture
    // de biens ou de services ». Un site qui présente des offres et
    // recueille des demandes de devis entre dans cette définition.
    expect(COMPANY.contactEmail).toMatch(/^[\w.+-]+@[\w-]+\.[a-z]{2,}$/i);
  });

  it("emploie une adresse dédiée, jamais une boîte nominative", () => {
    // Une adresse publiée sera collectée. Le risque spam — réel, et la
    // raison pour laquelle Alban ne voulait pas d'e-mail — se traite par le
    // filtrage d'une boîte dédiée, pas en exposant une boîte de travail.
    const local = COMPANY.contactEmail.split("@")[0].toLowerCase();
    expect(["contact", "legal", "info", "rgpd"]).toContain(local);
    expect(local).not.toMatch(/alban|renier/);
  });

  it("l'affiche sur la page, en lien mailto cliquable", () => {
    const source = lireMentions();
    expect(source).toContain("COMPANY.contactEmail");
    expect(source).toMatch(/mailto:\$\{COMPANY\.contactEmail\}/);
  });

  it("la page renvoie aussi vers le formulaire de contact", () => {
    // L'e-mail satisfait l'article 19 ; le formulaire reste le canal que
    // les prospects utilisent réellement. Les deux, pas l'un ou l'autre.
    expect(lireMentions()).toMatch(/["']\/contact["']/);
  });

  it("n'expose pas l'adresse hors des pages juridiques", () => {
    // L'obligation porte sur les mentions légales. La répandre sur le
    // footer ou llms.txt multiplierait la collecte sans rien ajouter à la
    // conformité.
    for (const surface of ["components/layout/footer.tsx", "public/llms.txt"]) {
      const source = fs.readFileSync(path.join(process.cwd(), surface), "utf8");
      expect(source).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
    }
  });
});

describe("absences volontaires — ne pas « corriger »", () => {
  it("ne publie aucun numéro de TVA intracommunautaire", () => {
    // La Guyane est hors du champ territorial de la TVA (CGI art. 294) :
    // E2I ASSISTANCE n'a pas de numéro intracommunautaire, et en inventer
    // un serait une fausse mention.
    //
    // La regex tolère les espaces et ignore la casse : Codex a montré que
    // « fr36517434577 » et « FR 36 517 434 577 » traversaient la version
    // précédente sans être vus.
    expect(JSON.stringify(COMPANY)).not.toMatch(/\bFR\s?\d{2}\s?(\d\s?){9}/i);
  });

  it("ne déclare aucun capital social, à quelque profondeur que ce soit", () => {
    // Une entreprise individuelle n'a pas de capital social.
    //
    // Le RCS n'est PAS interdit ici : une EI commerçante en a un. Le point
    // reste à vérifier sur l'extrait RNE (TODO dans company.ts) — d'ici là
    // la page n'affirme rien à son sujet, ni dans un sens ni dans l'autre.
    //
    // Le parcours est récursif : Codex a montré qu'un champ imbriqué comme
    // `{ registration: { shareCapital: "…" } }` échappait à un simple
    // Object.keys de premier niveau.
    const INTERDITS = /^(capital|capital[_-]?social|share[_-]?capital)$/i;
    const cheminsInterdits: string[] = [];

    const parcourir = (valeur: unknown, chemin: string[] = []): void => {
      if (valeur === null || typeof valeur !== "object") return;
      for (const [cle, sousValeur] of Object.entries(valeur)) {
        if (INTERDITS.test(cle)) cheminsInterdits.push([...chemin, cle].join("."));
        parcourir(sousValeur, [...chemin, cle]);
      }
    };
    parcourir(COMPANY);

    expect(cheminsInterdits).toEqual([]);
  });
});

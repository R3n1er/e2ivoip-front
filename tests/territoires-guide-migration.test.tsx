import { PORTABILITE_TARIF_TEXTE } from "@/lib/offres/portabilite";
import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";

import {
  CONCURRENTS_CITABLES,
  getPublishedTerritories,
  getTerritory,
} from "@/lib/territoires/standard-telephonique";
import { GuideTrunkOuHeberge } from "@/components/territoires/guide-trunk-ou-heberge";
import { MigrationOperateurs } from "@/components/territoires/migration-operateurs";

/**
 * Arbitrage Alban (2026-11-02) : les concurrents peuvent être NOMMÉS, mais
 * uniquement comme opérateur d'origine d'une portabilité — factuel, sans
 * jugement, sans comparaison de prix ni de qualité, sans logo.
 */

const mq = getTerritory("martinique")!;
const gf = getTerritory("guyane")!;
const re = getTerritory("la-reunion")!;

describe("Registre — opérateurs d'origine par territoire", () => {
  it("chaque territoire publié déclare au moins deux opérateurs d'origine", () => {
    for (const t of getPublishedTerritories()) {
      expect(t.migrationOperators.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("chaque opérateur cité figure dans la liste des concurrents citables", () => {
    for (const t of getPublishedTerritories()) {
      for (const op of t.migrationOperators) {
        expect(CONCURRENTS_CITABLES).toContain(op);
      }
    }
  });

  it("Dauphin Telecom n'est cité ni en Guyane ni à La Réunion", () => {
    expect(gf.migrationOperators).not.toContain("Dauphin Telecom");
    expect(re.migrationOperators).not.toContain("Dauphin Telecom");
  });

  it("les opérateurs Caraïbe ne sont pas cités à La Réunion", () => {
    expect(re.migrationOperators).not.toContain("SFR Caraïbe");
    expect(re.migrationOperators).not.toContain("Digicel");
  });
});

describe("Section « trunk SIP ou standard hébergé »", () => {
  it("présente les deux architectures et renvoie vers leurs pages", () => {
    render(<GuideTrunkOuHeberge territory={mq} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /trunk SIP ou standard hébergé/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);

    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/telephonie-entreprise/trunk-sip-compteur");
    expect(hrefs).toContain("/telephonie-entreprise/3cx-smb-mutualisee");
  });

  it("n'affiche aucun prix (règle des cartes sans prix d'appel)", () => {
    const { container } = render(<GuideTrunkOuHeberge territory={mq} />);
    expect(container.textContent).not.toMatch(/€/);
  });

  it("ne nomme aucun concurrent", () => {
    const { container } = render(<GuideTrunkOuHeberge territory={mq} />);
    for (const c of CONCURRENTS_CITABLES) {
      expect(container.textContent).not.toContain(c);
    }
  });
});

describe("Section migration / portabilité", () => {
  it("nomme les opérateurs d'origine du territoire dans le titre", () => {
    render(<MigrationOperateurs territory={mq} />);
    const h2 = screen.getByRole("heading", { level: 2 });
    for (const op of mq.migrationOperators) {
      expect(h2).toHaveTextContent(op);
    }
    expect(h2).toHaveTextContent(/portabilité/i);
  });

  it("parle des numéros du territoire, pas d'un autre", () => {
    render(<MigrationOperateurs territory={gf} />);
    const section = screen.getByRole("region", { name: /migrer depuis/i });
    expect(section).toHaveTextContent("0594");
    expect(section).not.toHaveTextContent("Dauphin Telecom");
  });

  it("décrit le déroulé en étapes ordonnées", () => {
    render(<MigrationOperateurs territory={mq} />);
    const etapes = within(screen.getByRole("list", { name: /déroulé/i })).getAllByRole(
      "listitem",
    );
    expect(etapes.length).toBeGreaterThanOrEqual(4);
  });

  it("ne porte ni jugement ni comparaison de prix", () => {
    const { container } = render(<MigrationOperateurs territory={mq} />);
    const texte = container.textContent ?? "";
    // Seuls prix admis : nos frais de portabilité (décision 2026-11-03).
    expect(texte.replace(PORTABILITE_TARIF_TEXTE, "")).not.toMatch(/€/);
    expect(texte).toContain(PORTABILITE_TARIF_TEXTE);
    expect(texte).not.toMatch(/moins cher|plus cher|meilleur|mauvais|bons? accès/i);
  });
});

describe("Cadre de citation — aucun concurrent hors de la section migration", () => {
  // Orange est exclu de ce contrôle : il est cité comme pilote du plan de
  // fermeture du cuivre (source Arcep), usage factuel antérieur à ce cadre.
  const SURVEILLES = CONCURRENTS_CITABLES.filter((c) => c !== "Orange");
  const AUTORISES = new Set([
    path.join("lib", "territoires", "standard-telephonique.ts"),
  ]);

  function fichiers(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return fichiers(p);
      return /\.(tsx?|mdx?)$/.test(e.name) ? [p] : [];
    });
  }

  it("aucun nom de concurrent n'est écrit en dur dans app/, components/ ou lib/", () => {
    const fautifs: string[] = [];
    for (const racine of ["app", "components", "lib"]) {
      for (const f of fichiers(path.join(process.cwd(), racine))) {
        const rel = path.relative(process.cwd(), f);
        if (AUTORISES.has(rel)) continue;
        const contenu = fs.readFileSync(f, "utf8");
        for (const c of SURVEILLES) {
          if (contenu.includes(c)) fautifs.push(`${rel} → ${c}`);
        }
      }
    }
    expect(fautifs).toEqual([]);
  });
});

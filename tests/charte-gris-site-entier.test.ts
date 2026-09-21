import fs from "node:fs";
import path from "node:path";

/**
 * Charte graphique — gris de texte et de bordure, site entier.
 *
 * Trois garde-fous existaient, chacun sur sa surface : les pages juridiques
 * (PR #72), leurs composants (PR #73), le layout global (PR #75). Chacun a été
 * écrit APRÈS qu'une violation a été constatée sur sa zone, et ne regardait
 * que celle-là. Celui-ci balaie `components/` et `app/` en entier.
 *
 * DURCI le 2026-09-20 après relecture adverse croisée (Codex + Kimi 2.7). La
 * première version passait au vert sur quatre mutations fautives :
 *
 *   1. un gris interdit ajouté n'importe où dans un fichier « excepté » —
 *      l'exception portait sur le FICHIER, pas sur l'occurrence ;
 *   2. `bg-blue-marine text-ui-muted` (1,57:1) — le contrôle de fond sombre
 *      cherchait `drop-shadow`, un indice, au lieu de regarder le fond ;
 *   3. `className={"text-ui-muted hover:text-ui-muted"}` — seuls les
 *      `className="…"` littéraux étaient lus, pas les expressions JSX ;
 *   4. le hero gradient retiré de 19 fichiers sur 20 — une seule occurrence
 *      suffisait à satisfaire la garde.
 *
 * Chacune de ces quatre mutations échoue désormais. Un garde-fou qu'on n'a pas
 * essayé de tromper n'est pas un garde-fou : c'est une formalité.
 *
 * PÉRIMÈTRE : gris de TEXTE et de BORDURE uniquement. Les fonds
 * (`bg-gray-50`), les accents (`text-red-600`, `text-blue-*`) et les dégradés
 * décoratifs n'ont pas encore de token et demandent un arbitrage de marque —
 * cf. DESIGN.md §9.1. Ils font l'objet de la vague 2.
 *
 * Référence : docs/CHARTE_GRAPHIQUE.md (règle absolue n°1), DESIGN.md §2.
 */

/** Règle absolue n°2 : la chaîne ne se paraphrase pas, on la neutralise. */
const HERO_GRADIENT = "from-blue-900/85 via-blue-800/80 to-red-600/85";

/**
 * Nombre de fichiers portant le hero gradient, relevé le 2026-09-20.
 *
 * La version initiale se contentait de `> 0` : retirer le gradient de 19
 * fichiers sur 20 passait au vert. Ce compte exact est volontairement rigide —
 * s'il bouge, c'est soit une page ajoutée (mettre à jour ce nombre), soit une
 * substitution fautive (règle absolue n°2 violée). Les deux méritent un regard.
 */
const HERO_FICHIERS_ATTENDUS = 20;

/**
 * Gris de texte et de bordure. Tokens de remplacement, arrêtés le 2026-09-20 :
 *
 *   text-gray-900/800/700  →  text-gray-dark   (#1F2937, 14,68:1)
 *   text-gray-600/500/400  →  text-ui-muted    (#4B5563,  7,56:1)
 *   border-gray-200/100    →  border-ui-border (#E5E7EB)
 */
const GRIS_INTERDITS = /\b(?:text|border)-gray-\d{2,3}(?:\/\d{1,3})?\b/g;

/**
 * Vague 2 (2026-09-21) — fonds neutres et fonds de marque.
 *
 * Les fonds n'avaient aucun token en vague 1, d'où leur exclusion. Quatre ont
 * été créés depuis :
 *
 *   bg-gray-50  → bg-ui-surface     (#F9FAFB, valeur identique)
 *   bg-gray-100 → bg-ui-surface-2   (#F3F4F6, valeur identique)
 *   bg-gray-200 → bg-ui-border      (#E5E7EB, valeur identique)
 *   bg-red-50   → bg-red-primary-50 (#FDECEC, teinte de marque)
 *   bg-blue-50  → bg-blue-marine-50 (#EEF1F5, teinte de marque)
 *
 * Seules les nuances CLAIRES (50/100/200) sont couvertes : les fonds soutenus
 * (`bg-red-600` sur un bouton, `bg-gray-800` sur une section sombre) relèvent
 * des accents, qui restent hors périmètre faute d'arbitrage — cf. DESIGN.md.
 */
const FONDS_INTERDITS =
  /\b(?:bg|from|via|to)-(?:gray|red|blue)-(?:50|100|200)(?:\/\d{1,3})?\b/g;

/**
 * EXCEPTIONS — portées par l'OCCURRENCE, jamais par le fichier.
 *
 * La première version listait des chemins : tout gris ajouté ailleurs dans ces
 * fichiers passait inaperçu. Chaque entrée désigne désormais la classe
 * précise tolérée, et le fichier doit la porter — sans quoi l'exception est
 * périmée et le test le signale.
 *
 * Deux entrées ont été RETIRÉES à cette occasion, leur justification étant
 * fausse : `components/chat-fallback.tsx` survole en `border-red-primary` et
 * `app/global-error.tsx` en `bg-gray-50` — ni l'un ni l'autre n'a le
 * `hover:border-gray-400` que le commentaire invoquait. Leurs bordures ont été
 * substituées, ce qui n'a jamais présenté de risque. Les deux relecteurs
 * indépendants ont pointé cette erreur.
 */
const EXCEPTIONS: ReadonlyArray<{
  fichier: string;
  classes: readonly string[];
  motif: string;
}> = [
  {
    fichier: "components/homepage-hero-section-simple.tsx",
    classes: ["text-gray-200", "text-gray-300"],
    motif:
      "gris CLAIRS sur le hero gradient. `ui-muted` (#4B5563) est foncé : " +
      "1,57:1 sur blue-marine, illisible. Aucun token de texte clair en charte.",
  },
  {
    fichier: "app/nos-services/page.tsx",
    classes: ["text-gray-300"],
    motif:
      "idem — gris clair sur section sombre, même raison que le hero de " +
      "la page d'accueil.",
  },
  {
    fichier: "app/blog/page.tsx",
    classes: ["border-gray-300", "border-gray-400"],
    motif:
      "bouton secondaire dont le survol repose sur l'écart border-gray-300 → " +
      "border-gray-400. Un token unique le rendrait inerte.",
  },
  {
    fichier: "app/blog/categorie/[slug]/page.tsx",
    classes: ["border-gray-300", "border-gray-400"],
    motif: "idem — même bouton, même mécanique de survol.",
  },
  {
    fichier: "components/services-section-simple.tsx",
    classes: ["bg-red-200"],
    motif:
      "état de survol d'une pastille d'icône : `bg-red-primary-100` au repos, " +
      "`hover:bg-red-200` au survol. La charte s'arrête à -100 : la mapper " +
      "dessus rendrait le survol inerte. Un token -200 reste à arbitrer.",
  },
  {
    fichier: "app/offline/page.tsx",
    classes: ["bg-blue-200"],
    motif:
      "idem côté bleu : `bg-blue-marine-100` au repos, `hover:bg-blue-200` " +
      "au survol. Même arbitrage en attente.",
  },
];

function fichiers(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules") fichiers(p, acc);
    } else if (e.name.endsWith(".tsx")) {
      acc.push(p);
    }
  }
  return acc;
}

function surfaces(): string[] {
  return [
    ...fichiers(path.join(process.cwd(), "components")),
    ...fichiers(path.join(process.cwd(), "app")),
  ];
}

function relatif(f: string): string {
  return path.relative(process.cwd(), f);
}

/** Classes tolérées pour ce fichier, vide s'il n'a aucune exception. */
function toleres(rel: string): readonly string[] {
  return EXCEPTIONS.find((e) => e.fichier === rel)?.classes ?? [];
}

/**
 * Tous les attributs de classe d'un fichier, littéraux ET expressions JSX.
 *
 * Seuls les `className="…"` étaient lus : `className={"a hover:a"}`, les
 * templates et `cn(...)` passaient au travers. On capture désormais aussi le
 * contenu des accolades, puis on en extrait les segments entre guillemets —
 * une analyse AST serait plus rigoureuse, mais cette lecture couvre les quatre
 * formes réellement employées dans ce dépôt sans y ajouter de dépendance.
 */
function attributsDeClasse(source: string): string[] {
  const out: string[] = [];

  for (const [, v] of source.matchAll(/class(?:Name)?="([^"]*)"/g)) out.push(v);

  for (const [, expr] of source.matchAll(
    /class(?:Name)?=\{((?:[^{}]|\{[^{}]*\})*)\}/g,
  )) {
    // Chaque littéral de l'expression est un jeu de classes potentiel :
    // ternaires, cn(), template strings, tableaux.
    for (const [, lit] of expr.matchAll(/["'`]([^"'`]*)["'`]/g)) {
      if (/[a-z]-/.test(lit)) out.push(lit);
    }
  }

  return out;
}

describe("charte graphique — gris du site entier", () => {
  it("balaie bien l'ensemble des surfaces", () => {
    // Si le parcours casse, les tests suivants passeraient au vert sans rien
    // vérifier. Mesure du 2026-09-20 : 98 fichiers .tsx. Seuil bas : il
    // détecte un parcours rompu, pas une variation normale du nombre de pages.
    const tous = surfaces();
    expect(tous.length).toBeGreaterThan(80);
    expect(tous.some((f) => relatif(f).startsWith("components/"))).toBe(true);
    expect(tous.some((f) => relatif(f).startsWith("app/"))).toBe(true);
  });

  it.each(surfaces().map((p) => [relatif(p), p]))(
    "%s n'emploie aucun gris Tailwind non toléré",
    (rel, fichier) => {
      const source = fs
        .readFileSync(fichier, "utf8")
        .split(HERO_GRADIENT)
        .join("");
      const permis = toleres(rel);
      // L'exception ne blanchit QUE ses classes nommées : tout autre gris du
      // même fichier reste une violation.
      const trouves = [...new Set(source.match(GRIS_INTERDITS) ?? [])].filter(
        (c) => !permis.includes(c),
      );
      expect(trouves).toEqual([]);
    },
  );

  it.each(surfaces().map((p) => [relatif(p), p]))(
    "%s n'emploie aucun fond clair Tailwind (vague 2)",
    (rel, fichier) => {
      const source = fs
        .readFileSync(fichier, "utf8")
        .split(HERO_GRADIENT)
        .join("");
      const permis = toleres(rel);
      const trouves = [...new Set(source.match(FONDS_INTERDITS) ?? [])].filter(
        (c) => !permis.includes(c),
      );
      expect(trouves).toEqual([]);
    },
  );
});

/**
 * Une exception dont l'objet a disparu est une porte laissée ouverte : le
 * fichier peut accumuler n'importe quel gris sans que rien ne le voie.
 */
describe("exceptions — toujours justifiées", () => {
  it.each(EXCEPTIONS.map((e) => [e.fichier, e]))(
    "%s porte encore les classes que son exception couvre",
    (_f, exception) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), exception.fichier),
        "utf8",
      );
      // Chaque classe tolérée doit être présente. Si elle a disparu, la
      // dérogation doit être retirée plutôt que laissée à traîner.
      for (const c of exception.classes) {
        expect(source).toContain(c);
      }
    },
  );

  it("ne compte pas plus de six exceptions", () => {
    // Seuil délibéré. Ces exceptions sont un état transitoire en attente de la
    // vague 2 (fonds et accents), pas un mécanisme d'évitement. Si la liste
    // s'allonge, c'est que la vague 2 doit être traitée plutôt que contournée.
    expect(EXCEPTIONS.length).toBeLessThanOrEqual(6);
  });

  it("documente un motif pour chacune", () => {
    for (const e of EXCEPTIONS) {
      expect(e.motif.length).toBeGreaterThan(40);
      expect(e.classes.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Le risque propre à une substitution de masse : trois nuances distinctes
 * convergent vers un même token et un survol devient inerte.
 *
 * Précédent réel (PR #72) : `bg-red-600 hover:bg-red-700` est devenu
 * `bg-red-primary hover:bg-red-primary`. Les deux classes sont valides, aucun
 * test de conformité ne le voit — mais l'intention d'interaction a disparu.
 */
describe("interaction — aucun survol annulé par la substitution", () => {
  it.each(surfaces().map((p) => [relatif(p), p]))(
    "%s ne redéclare aucun survol à l'identique",
    (_r, fichier) => {
      const source = fs.readFileSync(fichier, "utf8");
      const inertes = attributsDeClasse(source).filter((classes) =>
        [...classes.matchAll(/(?:^|\s)((?:bg|text|border)-[\w/-]+)/g)].some(
          ([, utilitaire]) =>
            new RegExp(`(?:^|\\s)hover:${utilitaire}(?:\\s|$)`).test(classes),
        ),
      );
      expect(inertes).toEqual([]);
    },
  );
});

/**
 * Contraste. La faute inverse de la non-conformité : un token de charte posé
 * là où il devient illisible.
 *
 * Sur blanc — gray-dark 14,68:1 · ui-muted 7,56:1 · blue-marine 11,86:1 ·
 * gray-secondary 3,85:1 · red-primary 4,13:1.
 *
 * Sur fond sombre — ui-muted sur blue-marine 1,57:1 · sur gray-dark 1,94:1.
 */
describe("contraste — les tokens posés restent lisibles", () => {
  /**
   * Fonds sombres du site. `ui-muted` (#4B5563) posé sur l'un d'eux tombe
   * sous 2:1 : illisible, quel que soit le seuil retenu.
   */
  const FONDS_SOMBRES =
    /\b(?:bg-(?:blue-marine|gray-dark|gray-800|gray-900|slate-800|slate-900|black)|bg-gradient-to-\w+)\b/;

  it("ne pose jamais un gris foncé sur un fond sombre", () => {
    // La version initiale cherchait `drop-shadow` — un INDICE de fond sombre,
    // pas le fond lui-même. `bg-blue-marine text-ui-muted` (1,57:1) passait.
    // On regarde désormais le fond réellement déclaré dans le même attribut.
    const fautifs: string[] = [];
    for (const f of surfaces()) {
      const source = fs.readFileSync(f, "utf8");
      for (const classes of attributsDeClasse(source)) {
        const sombre = FONDS_SOMBRES.test(classes);
        const grisFonce = /\btext-(?:ui-muted|gray-dark|gray-secondary)\b/.test(
          classes,
        );
        // Un ternaire peut porter `text-white` et `text-ui-muted` pour deux
        // états exclusifs : la présence de `text-white` lève l'alerte.
        const aussiClair = /\btext-white\b/.test(classes);
        if (sombre && grisFonce && !aussiClair) {
          fautifs.push(`${relatif(f)} :: ${classes.slice(0, 120)}`);
        }
      }
    }
    expect(fautifs).toEqual([]);
  });
});

/**
 * Règle absolue n°2 — le hero gradient ne se paraphrase pas.
 *
 * La garde initiale n'exigeait qu'un fichier porteur : en retirer 19 sur 20
 * passait au vert. On vérifie désormais le compte exact.
 */
describe("hero gradient — règle absolue n°2", () => {
  it(`reste présent dans exactement ${HERO_FICHIERS_ATTENDUS} fichiers`, () => {
    const porteurs = surfaces().filter((f) =>
      fs.readFileSync(f, "utf8").includes(HERO_GRADIENT),
    );
    // Message explicite : ce test échouera un jour sur un ajout de page
    // légitime, et le lecteur doit comprendre quoi faire.
    expect({
      compte: porteurs.length,
      fichiers: porteurs.map(relatif).sort(),
    }).toEqual({
      compte: HERO_FICHIERS_ATTENDUS,
      fichiers: porteurs.map(relatif).sort(),
    });
  });

  it("ne remplace le hero par aucune variante tokenisée", () => {
    // Le risque visé : qu'une passe de mise en charte « corrige » le hero en
    // remplaçant `from-blue-900/85 …` par des tokens, cassant l'identité.
    //
    // ATTENTION au faux positif — une première écriture de ce test traquait
    // toute association `from-red-primary … to-blue-marine` et remontait 23
    // dégradés décoratifs parfaitement légitimes, antérieurs au chantier.
    // DESIGN.md §2 nomme d'ailleurs `from-red-primary to-blue-marine` comme
    // « illustration de principe » de la charte. Un dégradé de marque ailleurs
    // sur le site n'est pas une paraphrase du hero.
    //
    // On cible donc uniquement la signature du hero — l'ordre bleu → rouge
    // avec ses trois arrêts — écrite en tokens.
    const paraphrases: string[] = [];
    for (const f of surfaces()) {
      const source = fs.readFileSync(f, "utf8");
      for (const [motif] of source.matchAll(
        /from-blue-marine[^"'`]*via-[^"'`]*to-red-primary/g,
      )) {
        paraphrases.push(`${relatif(f)} :: ${motif}`);
      }
    }
    expect(paraphrases).toEqual([]);
  });
});

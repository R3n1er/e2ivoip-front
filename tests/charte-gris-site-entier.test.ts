import fs from "node:fs";
import path from "node:path";

/**
 * Charte graphique — gris de texte et de bordure, site entier.
 *
 * Trois garde-fous existaient, chacun sur sa surface : les pages juridiques
 * (PR #72), leurs composants (PR #73), le layout global (PR #75). Chacun a été
 * écrit APRÈS qu'une violation a été constatée sur sa zone, et ne regardait
 * que celle-là.
 *
 * L'audit du 2026-09-20 a chiffré le reste : 797 occurrences sur 61 fichiers,
 * soit 30 fois le volume de la PR #75. Un garde-fou par surface ne tient pas
 * cette échelle — celui-ci balaie `components/` et `app/` en entier.
 *
 * PÉRIMÈTRE VOLONTAIREMENT ÉTROIT : gris de TEXTE et de BORDURE uniquement.
 * Les fonds (`bg-gray-50`), les accents (`text-red-600`, `text-blue-*`) et les
 * dégradés décoratifs n'ont pas encore de token et demandent un arbitrage de
 * marque — cf. DESIGN.md §9.1. Les inclure ici bloquerait le dépôt sur des
 * décisions non prises. Ils feront l'objet d'une seconde vague.
 *
 * Référence : docs/CHARTE_GRAPHIQUE.md (règle absolue n°1), DESIGN.md §2.
 */

/** Règle absolue n°2 : la chaîne ne se paraphrase pas, on la neutralise. */
const HERO_GRADIENT = "from-blue-900/85 via-blue-800/80 to-red-600/85";

/**
 * Gris de texte et de bordure. Tokens de remplacement, arrêtés le 2026-09-20 :
 *
 *   text-gray-900/800/700  →  text-gray-dark   (#1F2937, 14,68:1)
 *   text-gray-600/500/400  →  text-ui-muted    (#4B5563,  7,56:1)
 *   border-gray-200/100    →  border-ui-border (#E5E7EB)
 */
const GRIS_INTERDITS = /\b(?:text|border)-gray-\d{2,3}(?:\/\d{1,3})?\b/g;

/**
 * EXCEPTIONS — textes clairs sur fond sombre.
 *
 * `text-gray-200` et `text-gray-300` posés sur le hero gradient sont des gris
 * CLAIRS, choisis pour rester lisibles sur un fond bleu profond. Les mapper sur
 * `ui-muted` (#4B5563, foncé) les rendrait illisibles : gris foncé sur bleu
 * foncé. C'est la faute inverse de celle que ce test prévient, et elle serait
 * plus grave que la non-conformité qu'elle corrige.
 *
 * Ces gris clairs n'ont pas encore de token — la charte est construite pour des
 * fonds blancs. À trancher avec la vague 2 (fonds et accents).
 */
const EXCEPTIONS_FOND_SOMBRE = new Set([
  "components/homepage-hero-section-simple.tsx",
  "app/nos-services/page.tsx",
]);

/**
 * EXCEPTIONS — bordures à survol actif.
 *
 * `border-gray-300` avec `hover:border-gray-400` sur les boutons secondaires :
 * le survol repose sur l'écart entre les deux nuances. Un mapping unique vers
 * `ui-border` le rendrait inerte — le défaut constaté en PR #72, où
 * `bg-red-600 hover:bg-red-700` est devenu `bg-red-primary hover:bg-red-primary`.
 *
 * Il faudrait un second token de bordure (état survolé) pour les traiter. À
 * arbitrer avec la vague 2.
 */
const EXCEPTIONS_SURVOL_BORDURE = new Set([
  "components/chat-fallback.tsx",
  "app/blog/page.tsx",
  "app/blog/categorie/[slug]/page.tsx",
  "app/global-error.tsx",
]);

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

function grisInterdits(fichier: string): string[] {
  const source = fs
    .readFileSync(fichier, "utf8")
    .split(HERO_GRADIENT)
    .join("");
  return [...new Set(source.match(GRIS_INTERDITS) ?? [])];
}

describe("charte graphique — gris du site entier", () => {
  it("balaie bien l'ensemble des surfaces", () => {
    // Si le parcours casse, les tests suivants passeraient au vert sans rien
    // vérifier. Mesure du 2026-09-20 : 98 fichiers .tsx sous `components/` et
    // `app/`. Le seuil est délibérément bas — il détecte un parcours rompu, pas
    // une variation normale du nombre de pages.
    const tous = surfaces();
    expect(tous.length).toBeGreaterThan(80);
    expect(tous.some((f) => relatif(f).startsWith("components/"))).toBe(true);
    expect(tous.some((f) => relatif(f).startsWith("app/"))).toBe(true);
  });

  const aVerifier = surfaces().filter((f) => {
    const r = relatif(f);
    return !EXCEPTIONS_FOND_SOMBRE.has(r) && !EXCEPTIONS_SURVOL_BORDURE.has(r);
  });

  it.each(aVerifier.map((p) => [relatif(p), p]))(
    "%s n'emploie aucun gris Tailwind pour du texte ou une bordure",
    (_r, fichier) => {
      expect(grisInterdits(fichier)).toEqual([]);
    },
  );
});

/**
 * Les exceptions ne valent que TANT QU'ELLES SERVENT. Une exception dont
 * l'objet a disparu est une porte laissée ouverte : le fichier peut accumuler
 * n'importe quel gris sans que rien ne le voie.
 */
describe("exceptions — toujours justifiées", () => {
  it.each([...EXCEPTIONS_FOND_SOMBRE])(
    "%s porte bien un gris clair sur fond sombre",
    (r) => {
      const source = fs.readFileSync(path.join(process.cwd(), r), "utf8");
      // Un gris clair (100 à 300) : la raison d'être de l'exception.
      expect(source).toMatch(/\btext-gray-(?:100|200|300)\b/);
    },
  );

  it.each([...EXCEPTIONS_SURVOL_BORDURE])(
    "%s porte bien une bordure à survol actif",
    (r) => {
      const source = fs.readFileSync(path.join(process.cwd(), r), "utf8");
      expect(source).toMatch(/\bborder-gray-(?:300|400)\b/);
    },
  );

  it("ne compte pas plus de six exceptions", () => {
    // Seuil délibéré. Ces exceptions sont un état transitoire en attente de la
    // vague 2 (fonds et accents), pas un mécanisme d'évitement. Si la liste
    // s'allonge, c'est que la vague 2 doit être traitée plutôt que contournée.
    const total =
      EXCEPTIONS_FOND_SOMBRE.size + EXCEPTIONS_SURVOL_BORDURE.size;
    expect(total).toBeLessThanOrEqual(6);
  });
});

/**
 * Le risque propre à une substitution de masse : trois nuances distinctes
 * convergent vers un même token et un survol devient inerte.
 *
 * Précédent réel (PR #72) : `bg-red-600 hover:bg-red-700` est devenu
 * `bg-red-primary hover:bg-red-primary`. Les deux classes sont valides, aucun
 * test de conformité ne le voit — mais l'intention d'interaction a disparu.
 *
 * 797 substitutions viennent d'être appliquées : ce contrôle n'est pas
 * théorique.
 */
describe("interaction — aucun survol annulé par la substitution", () => {
  it.each(surfaces().map((p) => [relatif(p), p]))(
    "%s ne redéclare aucun survol à l'identique",
    (_r, fichier) => {
      const source = fs.readFileSync(fichier, "utf8");
      const inertes = [...source.matchAll(/class(?:Name)?="([^"]*)"/g)]
        .map((m) => m[1])
        .filter((classes) =>
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
 */
describe("contraste — les tokens posés restent lisibles", () => {
  it("n'emploie pas ui-muted sur un fond sombre", () => {
    // `ui-muted` (#4B5563) est un gris FONCÉ. Sur le hero gradient il serait
    // illisible. Un `drop-shadow` dans le même attribut signale un texte posé
    // sur une image ou un fond sombre.
    const fautifs: string[] = [];
    for (const f of surfaces()) {
      const source = fs.readFileSync(f, "utf8");
      for (const [, classes] of source.matchAll(/class(?:Name)?="([^"]*)"/g)) {
        if (/\btext-ui-muted\b/.test(classes) && /\bdrop-shadow/.test(classes)) {
          fautifs.push(`${relatif(f)} :: ${classes}`);
        }
      }
    }
    expect(fautifs).toEqual([]);
  });
});

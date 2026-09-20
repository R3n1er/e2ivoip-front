import fs from "node:fs";
import path from "node:path";

/**
 * Charte graphique — couleurs des pages juridiques.
 *
 * Contexte : un garde-fou interdisant `text-green-600` existait déjà dans ce
 * dépôt (`tests/services-section-prd.test.tsx`), mais il ne scannait qu'UN
 * composant. Les cinq pages juridiques portaient 205 classes de couleur hors
 * charte sans que rien ne le voie — dont ce même `text-green-600`.
 *
 * Ce test balaie donc le DOSSIER, pas une liste de fichiers : une sixième
 * page juridique créée demain sera couverte sans que personne y pense. C'est
 * la correction du motif récurrent relevé six fois pendant l'audit de
 * septembre — des garde-fous qui existent mais ne regardent pas là où la
 * faute se commet.
 *
 * Référence : docs/CHARTE_GRAPHIQUE.md (règle absolue n°1 du projet).
 */
const DOSSIER = path.join(process.cwd(), "app/juridique");

/**
 * Le hero gradient est la règle absolue n°2 du projet : il DOIT rester
 * exactement cette chaîne, et ses composantes Tailwind ne sont donc pas des
 * violations. On le neutralise avant de chercher.
 */
const HERO_GRADIENT = "from-blue-900/85 via-blue-800/80 to-red-600/85";

/**
 * Palettes Tailwind interdites pour les couleurs de MARQUE. Les gris
 * d'interface (`border-gray-200`, `bg-gray-50`) restent tolérés : la charte
 * régit le texte et les accents, pas les bordures et fonds neutres.
 */
const PALETTES_INTERDITES =
  /(?:text|bg|border|ring|divide|from|via|to)-(?:red|green|blue|yellow|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|slate|zinc|neutral|stone)-\d{2,3}(?:\/\d{1,3})?/g;

function pagesJuridiques(): string[] {
  return fs
    .readdirSync(DOSSIER, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(DOSSIER, e.name, "page.tsx"))
    .filter((p) => fs.existsSync(p));
}

function classesInterdites(fichier: string): string[] {
  const source = fs
    .readFileSync(fichier, "utf8")
    .split(HERO_GRADIENT)
    .join("");
  return [...new Set(source.match(PALETTES_INTERDITES) ?? [])];
}

describe("charte graphique — pages juridiques", () => {
  it("le dossier contient bien les pages attendues", () => {
    // Si ce test échoue parce qu'une page a disparu, les suivants ne
    // vérifieraient plus rien en silence.
    expect(pagesJuridiques().length).toBeGreaterThanOrEqual(5);
  });

  it.each(pagesJuridiques().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'emploie aucune couleur de palette Tailwind",
    (_relatif, fichier) => {
      expect(classesInterdites(fichier)).toEqual([]);
    },
  );

  it("préserve le hero gradient à l'identique", () => {
    // Règle absolue n°2 : la chaîne ne se paraphrase pas. Une « correction »
    // de charte qui remplacerait ses composantes par des tokens casserait
    // l'identité visuelle du site.
    const avecGradient = pagesJuridiques().filter((f) =>
      fs.readFileSync(f, "utf8").includes(HERO_GRADIENT),
    );
    expect(avecGradient.length).toBeGreaterThan(0);
  });
});

/**
 * Contraste WCAG. Les tokens de la charte n'ont pas tous le même pouvoir :
 * `red-primary` est à 4,13:1 sur blanc et `gray-secondary` à 3,85:1 — tous
 * deux SOUS le seuil AA de 4,5:1 pour du texte normal.
 *
 * Ces tests empêchent la faute inverse de celle qu'on vient de corriger :
 * remplacer une couleur hors charte par un token conforme mais illisible.
 */
describe("contraste — les liens de texte restent lisibles", () => {
  it.each(pagesJuridiques().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'emploie pas red-primary sur un lien souligné",
    (_relatif, fichier) => {
      // red-primary (4,13:1) échoue pour du texte normal. Les liens de ces
      // pages utilisent blue-marine (11,86:1), qui est aussi un token de
      // charte. Sur un titre — grand texte, seuil 3:1 — red-primary reste
      // permis, d'où le ciblage sur `underline`.
      // `underline` comme `hover:underline` : dans les deux cas c'est du
      // texte, et 4,13:1 reste sous le seuil AA de 4,5:1.
      const source = fs.readFileSync(fichier, "utf8");
      expect(source).not.toMatch(/text-red-primary[^"']*\bunderline/);
      expect(source).not.toMatch(/\bunderline[^"']*text-red-primary/);
    },
  );

  it.each(pagesJuridiques().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'emploie pas gray-secondary pour du texte courant",
    (_relatif, fichier) => {
      // gray-secondary (3,85:1) est réservé aux textes secondaires en
      // grande taille. Sur un <p> de corps, il passe sous le seuil AA.
      const source = fs.readFileSync(fichier, "utf8");
      expect(source).not.toMatch(/text-gray-secondary[^"']*text-(?:base|lg)\b/);
    },
  );
});

/**
 * Le passage aux tokens réduit la palette : deux nuances Tailwind distinctes
 * peuvent converger vers un même token. `bg-red-600 hover:bg-red-700` est
 * ainsi devenu `bg-red-primary hover:bg-red-primary` — un bouton qui ne
 * réagit plus au survol.
 *
 * Un test de conformité de couleur ne voit pas ce défaut : les deux classes
 * sont valides. C'est l'INTENTION d'interaction qui a disparu.
 */
describe("interaction — le survol reste perceptible", () => {
  it.each(pagesJuridiques().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'annule aucun survol en le redéclarant à l'identique",
    (_relatif, fichier) => {
      const source = fs.readFileSync(fichier, "utf8");
      // Un `hover:` qui reprend exactement la valeur du même utilitaire déjà
      // posé au repos, dans le même attribut class.
      const inertes = [
        ...source.matchAll(
          /class(?:Name)?="([^"]*)"/g,
        ),
      ]
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

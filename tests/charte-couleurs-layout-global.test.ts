import fs from "node:fs";
import path from "node:path";

/**
 * Charte graphique — couleurs du layout global.
 *
 * Contexte : l'audit de septembre a corrigé les pages juridiques (PR #72) puis
 * un composant qu'elles importaient (PR #73). Le header, le footer et le fil
 * d'Ariane sont restés hors périmètre — visibles sur TOUTES les pages du site,
 * et porteurs de 27 classes Tailwind hors charte.
 *
 * Ce test ferme cette dernière surface. Il balaie `components/layout/` en
 * entier : un composant de chrome ajouté demain sera couvert sans que
 * personne y pense.
 *
 * DIFFÉRENCE ASSUMÉE avec `charte-couleurs-pages-juridiques.test.ts` : ce
 * test-là tolère explicitement les gris d'interface (`border-gray-200`).
 * Ici non. Le layout est la surface la plus vue du site, et la décision de
 * septembre a été de lui donner des tokens de bordure nommés plutôt que des
 * utilitaires Tailwind. Les deux tests ont donc des seuils différents, par
 * choix et non par oubli.
 *
 * Référence : docs/CHARTE_GRAPHIQUE.md (règle absolue n°1), DESIGN.md §2.
 */
const DOSSIER = path.join(process.cwd(), "components/layout");

/**
 * Règle absolue n°2 : le hero gradient ne se paraphrase pas. Ses composantes
 * Tailwind ne sont pas des violations, on retire la chaîne avant de chercher.
 */
const HERO_GRADIENT = "from-blue-900/85 via-blue-800/80 to-red-600/85";

/**
 * EXCEPTION DOCUMENTÉE — `hover:text-red-700` dans footer.tsx.
 *
 * Le lien « Espace client » est en `text-red-primary font-black text-sm`.
 * `red-primary` vaut 4,13:1 sur blanc, sous le seuil AA de 4,5:1 : à 14px,
 * même en poids 900, WCAG le classe en texte normal (le seuil « texte large »
 * demande 18pt, ou 14pt gras — soit 18,66px).
 *
 * Le survol vers `red-700` (#B91C1C, 6,47:1) fait donc REMONTER le contraste
 * au-dessus du seuil. Substituer `red-primary` y ramènerait 4,13:1 et
 * casserait le mécanisme ; `blue-marine` tiendrait l'accessibilité mais
 * changerait la teinte du survol.
 *
 * Décision (2026-09-20) : on conserve `red-700` comme correctif
 * d'accessibilité assumé. Cette constante existe pour que l'exception soit
 * VISIBLE et argumentée, plutôt que silencieusement absente de la regex.
 */
const EXCEPTION_A11Y_FOOTER = "hover:text-red-700";

/**
 * Palettes Tailwind interdites. Contrairement au test des pages juridiques,
 * les gris sont inclus : le layout doit passer par `ui-border` et `ui-muted`.
 */
const PALETTES_INTERDITES =
  /(?:text|bg|border|ring|divide|from|via|to|fill|stroke|placeholder|decoration|outline|accent|shadow)-(?:gray|red|green|blue|yellow|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|slate|zinc|neutral|stone)-\d{2,3}(?:\/\d{1,3})?/g;

function composantsLayout(): string[] {
  return fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => path.join(DOSSIER, f));
}

function classesInterdites(fichier: string): string[] {
  const source = fs
    .readFileSync(fichier, "utf8")
    .split(HERO_GRADIENT)
    .join("")
    .split(EXCEPTION_A11Y_FOOTER)
    .join("");
  return [...new Set(source.match(PALETTES_INTERDITES) ?? [])];
}

describe("charte graphique — layout global", () => {
  it("couvre bien tous les composants de chrome", () => {
    // Si un fichier disparaît, les tests suivants ne vérifieraient plus rien
    // en silence. Le header et le footer sont les deux surfaces non
    // négociables.
    const surfaces = composantsLayout().map((f) => path.basename(f));
    expect(surfaces).toContain("header-simple.tsx");
    expect(surfaces).toContain("footer.tsx");
    expect(surfaces.length).toBeGreaterThanOrEqual(5);
  });

  it.each(composantsLayout().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'emploie aucune couleur de palette Tailwind",
    (_relatif, fichier) => {
      expect(classesInterdites(fichier)).toEqual([]);
    },
  );

  it("conserve l'exception d'accessibilité du footer", () => {
    // L'exception n'est valable que TANT QU'ELLE SERT. Si quelqu'un retire ce
    // hover, la constante ci-dessus devient un mensonge documentaire et la
    // regex porte une dérogation sans objet.
    const footer = fs.readFileSync(path.join(DOSSIER, "footer.tsx"), "utf8");
    expect(footer).toContain(EXCEPTION_A11Y_FOOTER);
  });
});

/**
 * Contraste WCAG. La faute inverse de celle qu'on corrige : remplacer une
 * couleur hors charte par un token conforme mais illisible.
 *
 * Valeurs sur blanc — gray-dark 14,68:1 · ui-muted 7,56:1 · blue-marine
 * 11,86:1 · gray-secondary 3,85:1 · red-primary 4,13:1.
 */
describe("contraste — la navigation reste lisible", () => {
  it.each(composantsLayout().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'emploie pas gray-secondary sur un lien de texte",
    (_relatif, fichier) => {
      // gray-secondary (3,85:1) échoue en AA pour du texte normal. C'était la
      // substitution naïve envisagée pour `text-gray-600` (7,56:1) : elle
      // aurait DÉGRADÉ l'accessibilité du menu en la croyant conforme.
      // Le token de remplacement est `ui-muted`, à iso-contraste.
      //
      // SEUIL VARIABLE — ce test ne peut pas se contenter de « lien + gris
      // faible ». WCAG applique trois seuils selon ce qui est rendu :
      //   texte normal          4,5:1  (critère 1.4.3)
      //   grand texte (≥18,66px) 3:1   (critère 1.4.3)
      //   composant d'interface   3:1   (critère 1.4.11)
      //
      // Le lien LinkedIn du footer est une icône de 22px avec `aria-label` :
      // à 3,85:1 il est conforme, et une version antérieure de ce test le
      // signalait à tort. On exclut donc les conteneurs qui n'ont pas de
      // dimension de texte, faute de quoi le test crie au loup et finit
      // désactivé.
      const source = fs.readFileSync(fichier, "utf8");
      const liensGrisFaible = [
        ...source.matchAll(/class(?:Name)?="([^"]*)"/g),
      ]
        .map((m) => m[1])
        .filter(
          (classes) =>
            /\btext-gray-secondary\b/.test(classes) &&
            /\b(?:hover:text-|group-hover:text-)/.test(classes) &&
            // Une classe de taille de texte signe un contenu textuel.
            // `text-xs`/`text-sm`/`text-base` restent sous 18,66px, donc
            // seuil 4,5:1 ; au-delà (`text-lg`+) le seuil retombe à 3:1.
            /\btext-(?:xs|sm|base)\b/.test(classes),
        );
      expect(liensGrisFaible).toEqual([]);
    },
  );

  it("n'emploie plus aucun gris sous le seuil AA pour du texte", () => {
    // `text-gray-400` (2,54:1) portait les chevrons du fil d'Ariane. Même
    // décoratif, il tombait très bas ; la décision de septembre l'aligne sur
    // `ui-muted`. Ce test empêche sa réapparition sous une autre forme.
    for (const fichier of composantsLayout()) {
      const source = fs.readFileSync(fichier, "utf8");
      expect(source).not.toMatch(/text-gray-(?:300|400)\b/);
    }
  });
});

/**
 * Le passage aux tokens réduit la palette : deux nuances Tailwind distinctes
 * peuvent converger vers un même token, et un survol devient inerte.
 *
 * Précédent réel (PR #72) : `bg-red-600 hover:bg-red-700` est devenu
 * `bg-red-primary hover:bg-red-primary`. Les deux classes sont valides, un
 * test de conformité ne voit rien — mais l'INTENTION d'interaction a disparu.
 *
 * Ce risque est élevé ici : `text-gray-600`, `-500` et `-400` convergent tous
 * les trois vers `ui-muted`.
 */
describe("interaction — le survol reste perceptible", () => {
  it.each(composantsLayout().map((p) => [path.relative(process.cwd(), p), p]))(
    "%s n'annule aucun survol en le redéclarant à l'identique",
    (_relatif, fichier) => {
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

  it("préserve la hiérarchie du menu sur deux niveaux distincts", () => {
    // La décision de septembre : niveau 1 en `gray-dark` (14,68:1), niveaux 2
    // et 3 en `ui-muted` (7,56:1). Si tout converge vers un seul token, la
    // hiérarchie visuelle du menu disparaît — conforme mais illisible comme
    // structure.
    const header = fs.readFileSync(
      path.join(DOSSIER, "header-simple.tsx"),
      "utf8",
    );
    expect(header).toMatch(/\btext-gray-dark\b/);
    expect(header).toMatch(/\btext-ui-muted\b/);
  });
});

/**
 * Les tokens doivent EXISTER dans la configuration Tailwind. Une classe
 * `text-ui-muted` non déclarée ne produit aucun style : le texte tombe sur la
 * couleur héritée, sans erreur ni avertissement.
 */
describe("tokens — les gris d'interface sont déclarés", () => {
  const config = fs.readFileSync(
    path.join(process.cwd(), "tailwind.config.js"),
    "utf8",
  );

  it.each([
    ["ui-muted", "#4B5563"],
    ["ui-border", "#E5E7EB"],
  ])("déclare %s = %s", (token, valeur) => {
    expect(config).toMatch(
      new RegExp(`["']${token}["']\\s*:\\s*["']${valeur}["']`, "i"),
    );
  });

  it("n'altère aucune des cinq couleurs de marque", () => {
    // Les gris d'interface s'AJOUTENT à la charte, ils ne la remplacent pas.
    // Ce test est le garde-fou de la règle absolue n°3.
    for (const [token, valeur] of [
      ["red-primary", "#E53E3E"],
      ["blue-marine", "#2D3848"],
      ["gray-secondary", "#818096"],
      ["gray-dark", "#1F2937"],
    ]) {
      expect(config).toMatch(
        new RegExp(`["']${token}["']\\s*:\\s*["']${valeur}["']`, "i"),
      );
    }
  });
});

import { readFileSync, readdirSync, statSync } from "fs"
import path from "path"

const APP_DIR = path.join(process.cwd(), "app")

/** Parcourt app/ et retourne les fichiers .tsx contenant un export de métadonnées. */
function findMetadataFiles(dir: string): string[] {
  const found: string[] = []

  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)

    if (statSync(full).isDirectory()) {
      found.push(...findMetadataFiles(full))
      continue
    }

    if (!entry.endsWith(".tsx")) continue

    const source = readFileSync(full, "utf-8")
    if (
      source.includes("export const metadata") ||
      source.includes("export async function generateMetadata") ||
      source.includes("export function generateMetadata")
    ) {
      found.push(full)
    }
  }

  return found
}

describe("canonical SEO", () => {
  const metadataFiles = findMetadataFiles(APP_DIR)

  it("trouve des pages avec métadonnées à contrôler", () => {
    expect(metadataFiles.length).toBeGreaterThan(0)
  })

  it("le layout racine ne déclare aucun canonical par défaut", () => {
    // Un canonical à la racine est hérité par toute page n'en déclarant pas :
    // elle signale alors à Google qu'elle duplique la home.
    const rootLayout = readFileSync(path.join(APP_DIR, "layout.tsx"), "utf-8")
    // [\s\S] plutôt que le flag /s : le tsconfig du projet cible une version
    // d'ECMAScript antérieure à es2018, où le flag dotAll n'existe pas.
    expect(rootLayout).not.toMatch(/alternates:[\s\S]*?\{[^}]*canonical/)
  })

  it("chaque page exportant des métadonnées déclare un canonical explicite", () => {
    // Deux formes acceptées : un `alternates.canonical` écrit à la main, ou un
    // appel à pageMetadata() — qui le construit à partir de `path`.
    const sansCanonical = metadataFiles
      .filter((file) => {
        const source = readFileSync(file, "utf-8")
        return !source.includes("canonical") && !source.includes("pageMetadata")
      })
      .map((file) => path.relative(process.cwd(), file))

    expect(sansCanonical).toEqual([])
  })

  it("le canonical déclaré correspond à la route du fichier", () => {
    // Un canonical syntaxiquement présent mais pointant ailleurs est pire que
    // pas de canonical : le test vérifie la valeur, pas seulement le mot-clé.
    const incoherents: string[] = []

    for (const file of metadataFiles) {
      const source = readFileSync(file, "utf-8")
      const relatif = path.relative(process.cwd(), file)

      // Capture la valeur du canonical, qu'il soit littéral (guillemets) ou
      // interpolé (`${SITE_URL}/blog`), ou dérivé du `path` de pageMetadata().
      const declare =
        source.match(/canonical:\s*["`]([^"`]+)["`]/)?.[1] ??
        source.match(/path:\s*"([^"]+)"/)?.[1]

      if (!declare) continue

      // Un canonical cross-page assumé (deux URL pour la même offre, une seule
      // de référence) est déclaré via `canonicalOverride` : il doit alors être
      // commenté sur place. C'est l'exception, pas la règle.
      if (source.includes("canonicalOverride")) continue

      // app/qui-sommes-nous/page.tsx -> /qui-sommes-nous ; app/page.tsx -> /
      const attendu =
        "/" +
        relatif
          .replace(/^app\//, "")
          .replace(/(^|\/)(page|layout)\.tsx$/, "")
          .replace(/\/$/, "")

      // Les routes dynamiques ([slug]) construisent leur canonical à l'exécution.
      if (attendu.includes("[")) continue

      // Le domaine peut être préfixé (`${SITE_URL}/blog`) : seul le chemin compte.
      const cheminDeclare = declare
        .replace(/^\$\{SITE_URL\}/, "")
        .replace(/^https?:\/\/[^/]+/, "")

      if ((cheminDeclare || "/") !== attendu) {
        incoherents.push(
          `${relatif} déclare "${cheminDeclare}", attendu "${attendu}"`,
        )
      }
    }

    expect(incoherents).toEqual([])
  })
})

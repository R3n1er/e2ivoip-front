import { readFileSync, readdirSync, statSync } from "fs"
import path from "path"

const APP_DIR = path.join(process.cwd(), "app")

/**
 * Next.js remplace `openGraph` en bloc plutôt que de le fusionner avec le
 * layout racine : une page qui en déclare un partiel perd `og:image`, `og:url`
 * et `og:site_name`, et son lien partagé s'affiche sans visuel.
 *
 * `pageMetadata()` (lib/page-metadata.ts) réinjecte ces champs. Ce test
 * interdit d'écrire un bloc `openGraph` à la main sans les fournir.
 */
function findPageFiles(dir: string): string[] {
  const found: string[] = []

  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)

    if (statSync(full).isDirectory()) {
      found.push(...findPageFiles(full))
      continue
    }

    if (entry.endsWith(".tsx")) found.push(full)
  }

  return found
}

/**
 * Pages hors périmètre d'indexation : leur aperçu social n'a pas d'usage.
 * `app/layout.tsx` porte les valeurs de référence, il est la source.
 */
const HORS_PERIMETRE = [
  "app/layout.tsx",
  "app/admin/",
  "app/offline/",
  "app/global-error.tsx",
]

describe("métadonnées Open Graph", () => {
  const fichiers = findPageFiles(APP_DIR)
    .map((f) => path.relative(process.cwd(), f))
    .filter((f) => !HORS_PERIMETRE.some((exclu) => f.startsWith(exclu)))

  it("trouve des pages à contrôler", () => {
    expect(fichiers.length).toBeGreaterThan(0)
  })

  it("aucune page ne déclare un openGraph partiel écrit à la main", () => {
    const partiels = fichiers.filter((relativePath) => {
      const source = readFileSync(path.join(process.cwd(), relativePath), "utf-8")
      if (!source.includes("openGraph:")) return false

      // Un openGraph écrit à la main doit fournir les champs que le layout
      // racine ne transmet pas. pageMetadata() s'en charge.
      const utilisePageMetadata = source.includes("pageMetadata")

      // `images` peut être une valeur littérale ou une variable construite en
      // amont (articles de blog : image de couverture propre à chaque post).
      const fournitImages = /(^|\s)images[,:]/m.test(source)

      return !utilisePageMetadata && !fournitImages
    })

    expect(partiels).toEqual([])
  })
})

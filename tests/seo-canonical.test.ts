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
    expect(rootLayout).not.toMatch(/alternates:\s*\{[^}]*canonical/s)
  })

  it("chaque page exportant des métadonnées déclare un canonical explicite", () => {
    const sansCanonical = metadataFiles
      .filter((file) => !readFileSync(file, "utf-8").includes("canonical"))
      .map((file) => path.relative(process.cwd(), file))

    expect(sansCanonical).toEqual([])
  })
})

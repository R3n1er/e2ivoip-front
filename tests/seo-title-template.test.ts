import { readFileSync } from "fs"
import path from "path"

/** Pages du périmètre audité dont le title ne doit pas contenir le suffixe marque. */
const PAGES = [
  "app/assistance/page.tsx",
  "app/contact/page.tsx",
  "app/nos-services/page.tsx",
  "app/qui-sommes-nous/page.tsx",
  "app/telephonie-3cx/page.tsx",
]

describe("title et template de marque", () => {
  it("le layout racine applique bien un template de suffixe", () => {
    const rootLayout = readFileSync(
      path.join(process.cwd(), "app", "layout.tsx"),
      "utf-8",
    )
    expect(rootLayout).toContain("template: `%s | ${SITE_NAME}`")
  })

  it.each(PAGES)(
    "%s ne répète pas le suffixe marque dans son title",
    (relativePath) => {
      const source = readFileSync(path.join(process.cwd(), relativePath), "utf-8")

      // Toutes les déclarations title: "..." du fichier (metadata + openGraph).
      const titles = [...source.matchAll(/title:\s*"([^"]*)"/g)].map((m) => m[1])

      expect(titles.length).toBeGreaterThan(0)
      for (const title of titles) {
        expect(title).not.toContain("E2I VoIP")
      }
    },
  )
})

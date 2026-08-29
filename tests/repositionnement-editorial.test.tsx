import { readFileSync } from "fs"
import path from "path"

const read = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), "utf-8")

describe("repositionnement éditorial — home", () => {
  const hero = () => read("components/homepage-hero-section-simple.tsx")

  it("le H1 ne vend plus l'économie tarifaire", () => {
    expect(hero()).not.toContain("Économisez 20")
  })

  it("le H1 porte l'ancrage territorial DOM", () => {
    // Finding n°4 de l'audit : ni « DOM » ni « Antilles-Guyane » dans le H1.
    const h1Match = hero().match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
    expect(h1Match).not.toBeNull()
    expect(h1Match![1]).toContain("DOM")
  })

  it("le CTA principal ouvre une conversation, pas un devis", () => {
    // Le mot « devis » conditionne le visiteur à demander un prix.
    expect(hero()).toContain('href="/contact"')
    expect(hero()).not.toContain("Faire un devis")
  })

  it("la stat d'économie est remplacée par une preuve de déploiement", () => {
    expect(hero()).not.toMatch(/value:\s*"20%"/)
    expect(hero()).toContain("60+")
  })
})

describe("repositionnement éditorial — nos-services", () => {
  const page = () => read("app/nos-services/page.tsx")

  it("ne construit plus son argumentaire sur les 20 % d'économies", () => {
    expect(page()).not.toContain("20% d'économies")
    expect(page()).not.toContain("Prêt à économiser")
  })
})

describe("conformité juridique", () => {
  it("aucun superlatif absolu non prouvable", () => {
    expect(read("components/about-section-simple.tsx")).not.toMatch(
      /[Ss]eul opérateur/,
    )
  })
})

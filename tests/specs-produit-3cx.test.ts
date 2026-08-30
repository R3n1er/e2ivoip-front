import { readFileSync } from "fs"
import path from "path"

const read = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), "utf-8")

/**
 * Grilles de dimensionnement officielles (source : arbitrage Alban, 2026-08-30).
 *
 * 3CX PRO se dimensionne en appels simultanés — jamais en postes ni en
 * utilisateurs. Le Trunk SIP illimité a sa propre grille, plafonnée à 16 :
 * c'est ce qui distingue les deux offres, elles ne doivent pas afficher les
 * mêmes bornes.
 */
const PALIERS_3CX_PRO = [4, 8, 16, 24, 32, 64]
const PALIERS_TRUNK_ILLIMITE = [4, 8, 16]

/**
 * Toute page ou composant présentant l'offre 3CX PRO.
 *
 * Cette liste doit rester exhaustive : une page absente d'ici peut afficher
 * des specs contradictoires sans qu'aucun test ne le voie. C'est ce qui s'est
 * produit pour /telephonie-3cx (« De 8 à 1024 utilisateurs », valeur reprise
 * de la documentation éditeur 3CX) et /3cx-pro (grille démarrant à 8).
 */
const SOURCES_3CX_PRO = [
  "components/services-section-simple.tsx",
  "app/nos-services/page.tsx",
  "app/telephonie-3cx/page.tsx",
  "app/3cx-pro/page.tsx",
]

describe("specs produit 3CX PRO", () => {
  it("la grille de référence monte jusqu'à 64 appels simultanés", () => {
    expect(PALIERS_3CX_PRO[0]).toBe(4)
    expect(PALIERS_3CX_PRO[PALIERS_3CX_PRO.length - 1]).toBe(64)
  })

  it.each(SOURCES_3CX_PRO)(
    "%s n'annonce pas de plancher d'appels simultanés contradictoire",
    (relativePath) => {
      // « 4 appels simultanés minimum » et « 8 appels simultanés minimum »
      // coexistaient pour la même offre. Le dimensionnement s'exprime par une
      // amplitude, pas par un minimum qui varie d'une page à l'autre.
      expect(read(relativePath)).not.toMatch(/\d+\s*appels? simultanés? minimum/)
    },
  )

  // Pages annonçant l'offre par une mention textuelle d'amplitude.
  const SOURCES_AMPLITUDE_TEXTUELLE = SOURCES_3CX_PRO.filter(
    (s) => s !== "app/3cx-pro/page.tsx",
  )

  it.each(SOURCES_AMPLITUDE_TEXTUELLE)(
    "%s annonce l'amplitude complète de la grille 3CX PRO",
    (relativePath) => {
      expect(read(relativePath)).toContain("4 à 64 appels simultanés")
    },
  )

  it("/3cx-pro décline exactement les paliers de la grille", () => {
    // Cette page présente les paliers un par un (`pricingTiers`) plutôt qu'une
    // amplitude textuelle : on vérifie la grille elle-même.
    const source = read("app/3cx-pro/page.tsx")
    const paliers = [...source.matchAll(/calls:\s*(\d+)/g)].map((m) =>
      Number(m[1]),
    )
    expect(paliers).toEqual(PALIERS_3CX_PRO)
  })

  it.each(SOURCES_3CX_PRO)(
    "%s ne dimensionne pas 3CX PRO en milliers d'utilisateurs",
    (relativePath) => {
      // « De 8 à 1024 utilisateurs » est une limite de licence 3CX reprise de
      // la documentation éditeur, pas une caractéristique de notre offre.
      expect(read(relativePath)).not.toMatch(/\d{3,}\s*utilisateurs/)
    },
  )

  it("aucune page ne dimensionne 3CX PRO en postes ou utilisateurs", () => {
    // « Instance dédiée +50 postes » relevait du cas client TBF, pas de la
    // spec produit : un volume observé chez un client n'est pas une
    // caractéristique de l'offre.
    for (const source of [...SOURCES_3CX_PRO, "app/qui-sommes-nous/page.tsx"]) {
      expect(read(source)).not.toMatch(/3CX PRO\s*:?\s*[^.]{0,40}\+?\d+\s*postes/)
    }
  })
})

describe("specs produit Trunk SIP illimité", () => {
  const page = () => read("app/telephonie-entreprise/trunk-sip-illimite/page.tsx")

  it("plafonne à 16 appels simultanés", () => {
    expect(PALIERS_TRUNK_ILLIMITE[PALIERS_TRUNK_ILLIMITE.length - 1]).toBe(16)
    // La page ne doit pas laisser croire aux paliers hauts de 3CX PRO.
    expect(page()).not.toMatch(/\b(24|32|64)\s*appels simultanés/)
  })

  it("annonce ses trois paliers", () => {
    expect(page()).toMatch(/4,\s*8\s*ou\s*16\s*appels simultanés/)
  })
})

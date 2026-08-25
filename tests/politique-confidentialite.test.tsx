import { render, screen } from '@testing-library/react'

import PolitiqueConfidentialitePage from '../app/juridique/politique-confidentialite/page'
import { SUB_PROCESSORS } from '@/lib/legal/company'
import { RGPD_RIGHTS } from '@/lib/rgpd/rights'

describe('Page Politique de Confidentialité', () => {
  it('affiche le titre principal', () => {
    render(<PolitiqueConfidentialitePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Politique de confidentialité'
    )
  })

  it('identifie le responsable du traitement', () => {
    render(<PolitiqueConfidentialitePage />)
    expect(screen.getAllByText(/E2I ASSISTANCE/).length).toBeGreaterThan(0)
    expect(screen.getByText(/51743457700014/)).toBeInTheDocument()
  })

  it('contient les sections attendues d’une politique conforme', () => {
    render(<PolitiqueConfidentialitePage />)

    expect(screen.getByText(/Qui est responsable de vos données/)).toBeInTheDocument()
    expect(screen.getByText(/Ce que nous traitons, et sur quelle base/)).toBeInTheDocument()
    expect(screen.getByText(/Cookies et traceurs/)).toBeInTheDocument()
    expect(screen.getByText(/À qui vos données sont transmises/)).toBeInTheDocument()
    expect(screen.getByText(/Comment vos données sont protégées/)).toBeInTheDocument()
    expect(screen.getByText(/Vos droits/)).toBeInTheDocument()
    expect(screen.getByText(/Réclamation auprès de la CNIL/)).toBeInTheDocument()
  })

  it('énumère les six droits RGPD depuis la source unique', () => {
    render(<PolitiqueConfidentialitePage />)

    for (const right of RGPD_RIGHTS) {
      expect(screen.getAllByText(new RegExp(right.label)).length).toBeGreaterThan(0)
    }
  })

  it('nomme chaque sous-traitant : l’information est due au visiteur', () => {
    render(<PolitiqueConfidentialitePage />)

    for (const processor of SUB_PROCESSORS) {
      expect(screen.getByText(processor.name)).toBeInTheDocument()
    }
  })

  it('précise une base légale et une durée pour chaque traitement', () => {
    render(<PolitiqueConfidentialitePage />)

    const basesLegales = screen.getAllByText(/Base légale :/)
    const durees = screen.getAllByText(/Conservation :/)
    expect(basesLegales.length).toBe(durees.length)
    expect(basesLegales.length).toBeGreaterThanOrEqual(5)
  })

  it('renvoie vers le formulaire d’exercice des droits', () => {
    render(<PolitiqueConfidentialitePage />)

    const liens = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href') === '/juridique/exercer-mes-droits')
    expect(liens.length).toBeGreaterThan(0)
  })

  it('affiche une date de dernière mise à jour', () => {
    render(<PolitiqueConfidentialitePage />)
    expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument()
  })

  it('respecte la hiérarchie des titres', () => {
    render(<PolitiqueConfidentialitePage />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(3)
  })
})

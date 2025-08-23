import { render, screen } from '@testing-library/react'

import PolitiqueConfidentialitePage from '../app/politique-confidentialite/page'

describe('Page Politique de Confidentialité', () => {
  it('affiche le titre principal', () => {
    render(<PolitiqueConfidentialitePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Politique de confidentialité')
  })

  it('affiche le nom de la société', () => {
    render(<PolitiqueConfidentialitePage />)
    const companyNames = screen.getAllByText('E2I ASSISTANCE')
    expect(companyNames.length).toBeGreaterThan(0)
    expect(companyNames[0]).toBeInTheDocument()
  })

  it('contient les sections principales', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText(/Identité du responsable du traitement/)).toBeInTheDocument()
    expect(screen.getByText(/données recueillies et utilisées/)).toBeInTheDocument()
    expect(screen.getByText(/Comment vos données sont-elles protégées/)).toBeInTheDocument()
    expect(screen.getByText(/Vos droits/)).toBeInTheDocument()
  })

  it('contient les droits RGPD', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText(/Droit d'accès/)).toBeInTheDocument()
    expect(screen.getByText(/Droit de rectification/)).toBeInTheDocument()
    expect(screen.getByText(/droit à l'oubli/)).toBeInTheDocument()
    expect(screen.getByText(/Droit à la portabilité/)).toBeInTheDocument()
  })

  it('contient les liens vers le formulaire de contact', () => {
    render(<PolitiqueConfidentialitePage />)
    
    const contactLinks = screen.getAllByRole('link', { name: /formulaire de contact/i })
    expect(contactLinks.length).toBeGreaterThan(0)
    contactLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/contact')
    })
  })

  it('contient la certification 3CX', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText(/3CX Bronze/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Découvrir 3CX/i })).toHaveAttribute('href', 'https://www.3cx.fr/pabx/download-pabx-ip/?resellerId=208715')
  })

  it('respecte la structure sémantique', () => {
    render(<PolitiqueConfidentialitePage />)
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(5) // Au moins 6 titres
    
    // Vérifier la hiérarchie des titres
    const h1 = screen.getByRole('heading', { level: 1 })
    const h2s = screen.getAllByRole('heading', { level: 2 })
    
    expect(h1).toBeInTheDocument()
    expect(h2s.length).toBeGreaterThan(3)
  })
})
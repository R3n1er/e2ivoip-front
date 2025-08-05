import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PolitiqueConfidentialitePage from '@/app/politique-confidentialite/page'

describe('Page Politique de Confidentialité', () => {
  it('affiche le titre principal', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText('Politique de Confidentialité')).toBeInTheDocument()
  })

  it('affiche les informations de contact E2I', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText('E2I Assistance')).toBeInTheDocument()
    expect(screen.getByText('05 94 96 35 00')).toBeInTheDocument()
    expect(screen.getByText('contact@e2i-voip.com')).toBeInTheDocument()
  })

  it('contient les sections RGPD essentielles', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText('1. Identité du responsable de traitement')).toBeInTheDocument()
    expect(screen.getByText('2. Données personnelles collectées')).toBeInTheDocument()
    expect(screen.getByText('3. Finalités du traitement')).toBeInTheDocument()
    expect(screen.getByText('4. Vos droits')).toBeInTheDocument()
  })

  it('mentionne les droits RGPD', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText(/Droit d'accès/)).toBeInTheDocument()
    expect(screen.getByText(/Droit de rectification/)).toBeInTheDocument()
    expect(screen.getByText(/Droit à l'effacement/)).toBeInTheDocument()
  })

  it('contient les informations sur les cookies', () => {
    render(<PolitiqueConfidentialitePage />)
    
    expect(screen.getByText('5. Cookies et technologies similaires')).toBeInTheDocument()
    expect(screen.getByText(/Google Analytics, HubSpot/)).toBeInTheDocument()
  })
})
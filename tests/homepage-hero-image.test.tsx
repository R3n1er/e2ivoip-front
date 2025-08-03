import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomepageHeroSection } from '@/components/homepage-hero-section'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    h1: ({ children, className, ...props }: any) => (
      <h1 className={className} {...props}>{children}</h1>
    ),
    p: ({ children, className, ...props }: any) => (
      <p className={className} {...props}>{children}</p>
    ),
  },
}))

describe('HomepageHeroSection', () => {
  it('affiche la section héros avec l\'image de background', () => {
    render(<HomepageHeroSection />)
    
    // Vérifier que le titre principal est présent
    expect(screen.getByText(/Votre standard/)).toBeInTheDocument()
    expect(screen.getByText(/représente/)).toBeInTheDocument()
    expect(screen.getByText(/votre entreprise/)).toBeInTheDocument()
    
    // Vérifier que le badge est présent
    expect(screen.getByText('Leader en solutions VoIP depuis 2008')).toBeInTheDocument()
    
    // Vérifier que la description est présente
    expect(screen.getByText(/Solutions de.*phonie IP professionnelles/)).toBeInTheDocument()
  })

  it('applique les styles de background image correctement', () => {
    render(<HomepageHeroSection />)
    
    // Trouver l'élément avec l'image de background
    const backgroundElement = document.querySelector('[style*="pexels-ketut-subiyanto-4559714-min.jpg"]')
    expect(backgroundElement).toBeInTheDocument()
    
    // Vérifier que les styles CSS sont appliqués
    if (backgroundElement) {
      expect(backgroundElement.getAttribute('style')).toContain('pexels-ketut-subiyanto-4559714-min.jpg')
    }
  })

  it('affiche les statistiques', () => {
    render(<HomepageHeroSection />)
    
    expect(screen.getByText('500+')).toBeInTheDocument()
    expect(screen.getByText('Clients satisfaits')).toBeInTheDocument()
    expect(screen.getByText('15+')).toBeInTheDocument()
    expect(screen.getByText('Années d\'expérience')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
    expect(screen.getByText('Disponibilité')).toBeInTheDocument()
  })

  it('affiche les boutons CTA', () => {
    render(<HomepageHeroSection />)
    
    expect(screen.getByText('Demander un devis gratuit')).toBeInTheDocument()
    expect(screen.getByText('Voir la démo')).toBeInTheDocument()
  })

  it('contient le gradient overlay', () => {
    render(<HomepageHeroSection />)
    
    const gradientOverlay = document.querySelector('.bg-gradient-to-r.from-blue-900\\/85')
    expect(gradientOverlay).toBeInTheDocument()
  })
})
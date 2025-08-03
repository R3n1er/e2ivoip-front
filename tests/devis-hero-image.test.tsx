import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { DevisHeroSection } from '@/components/devis-hero-section'

// Mock du composant d'animation
vi.mock('@/components/devis-animations', () => ({
  AnimatedHero: ({ children, className }: any) => (
    <div className={className} data-testid="animated-hero">
      {children}
    </div>
  ),
}))

describe('DevisHeroSection', () => {
  it('affiche la section héros avec l\'image de background', () => {
    render(<DevisHeroSection />)
    
    // Vérifier que le titre principal est présent
    expect(screen.getByText('Recevez un devis personnalisé')).toBeInTheDocument()
    expect(screen.getByText('en moins de 24h')).toBeInTheDocument()
    
    // Vérifier que le badge est présent
    expect(screen.getByText('Devis Rapide et Gratuit')).toBeInTheDocument()
    
    // Vérifier que la description est présente
    expect(screen.getByText(/Que vous cherchiez à mettre en place/)).toBeInTheDocument()
  })

  it('applique les styles de background image correctement', () => {
    render(<DevisHeroSection />)
    
    // Trouver l'élément avec l'image de background
    const backgroundElement = document.querySelector('[style*="man-oniphone-business-min.jpg"]')
    expect(backgroundElement).toBeInTheDocument()
    
    // Vérifier que les styles CSS sont appliqués
    if (backgroundElement) {
      const styles = window.getComputedStyle(backgroundElement)
      expect(backgroundElement.getAttribute('style')).toContain('man-oniphone-business-min.jpg')
    }
  })

  it('a une hauteur minimale définie', () => {
    render(<DevisHeroSection />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('min-h-[600px]')
  })

  it('contient le gradient overlay', () => {
    render(<DevisHeroSection />)
    
    const gradientOverlay = document.querySelector('.bg-gradient-to-r.from-red-600\\/85')
    expect(gradientOverlay).toBeInTheDocument()
  })
})
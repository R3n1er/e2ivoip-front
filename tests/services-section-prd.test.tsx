import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServicesSection } from '@/components/services-section'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div className={className} style={style} {...props}>{children}</div>
    ),
    button: ({ children, className, style, ...props }: any) => (
      <button className={className} style={style} {...props}>{children}</button>
    ),
    li: ({ children, className, style, ...props }: any) => (
      <li className={className} style={style} {...props}>{children}</li>
    ),
  },
}))

describe('ServicesSection - Charte Graphique PRD (Icônes Corrigées)', () => {
  it('affiche le titre avec les couleurs PRD', () => {
    render(<ServicesSection />)
    
    // Vérifier que le titre principal est présent
    expect(screen.getByText(/Services de/)).toBeInTheDocument()
    expect(screen.getByText('Téléphonie IP')).toBeInTheDocument()
    
    // Vérifier que le badge est présent
    expect(screen.getByText('Nos Solutions')).toBeInTheDocument()
  })

  it('affiche tous les services de téléphonie IP', () => {
    render(<ServicesSection />)
    
    // Vérifier que tous les services sont présents
    expect(screen.getByText('Standards téléphoniques IP')).toBeInTheDocument()
    expect(screen.getByText('Centre d\'appels')).toBeInTheDocument()
    expect(screen.getByText('Trunk SIP')).toBeInTheDocument()
    expect(screen.getByText('Softphones mobiles')).toBeInTheDocument()
    expect(screen.getByText('Installation & maintenance')).toBeInTheDocument()
    expect(screen.getByText('Sécurité & monitoring')).toBeInTheDocument()
  })

  it('affiche les badges de service', () => {
    render(<ServicesSection />)
    
    expect(screen.getByText('Populaire')).toBeInTheDocument()
    expect(screen.getByText('Nouveau')).toBeInTheDocument()
    expect(screen.getByText('Économique')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByText('Sécurisé')).toBeInTheDocument()
  })

  it('affiche la section CTA avec les couleurs PRD', () => {
    render(<ServicesSection />)
    
    expect(screen.getByText('Prêt à moderniser votre téléphonie ?')).toBeInTheDocument()
    expect(screen.getByText('Demander un devis gratuit')).toBeInTheDocument()
  })

  it('affiche la disponibilité 99.9% pour chaque service', () => {
    render(<ServicesSection />)
    
    // Il devrait y avoir 6 mentions de "99.9%" (une par service)
    const availabilityElements = screen.getAllByText('99.9%')
    expect(availabilityElements).toHaveLength(6)
  })

  it('utilise uniquement les couleurs PRD pour les icônes', () => {
    const { container } = render(<ServicesSection />)
    
    // Vérifier que seules les couleurs PRD sont utilisées
    const elementsWithPRDColors = container.querySelectorAll('[style*="#E53E3E"], [style*="#2D3848"], [style*="#818096"]')
    expect(elementsWithPRDColors.length).toBeGreaterThan(0)
    
    // Vérifier qu'aucune autre couleur n'est utilisée pour les icônes
    const elementsWithOtherColors = container.querySelectorAll('[style*="#16a34a"], [style*="#9333ea"], [style*="#ea580c"], [style*="#6366f1"]')
    expect(elementsWithOtherColors.length).toBe(0)
  })

  it('le bouton "Demander un devis gratuit" redirige vers la page devis en ligne', () => {
    render(<ServicesSection />)
    
    const devisButton = screen.getByText('Demander un devis gratuit')
    expect(devisButton).toBeInTheDocument()
    
    // Vérifier que le bouton est dans un lien vers /devis-en-ligne
    const linkElement = devisButton.closest('a')
    expect(linkElement).toHaveAttribute('href', '/devis-en-ligne')
  })
})
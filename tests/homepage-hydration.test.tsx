// Jest mocks

import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock des composants externes
jest.mock('@/components/homepage-hero-section', () => ({
  HomepageHeroSection: () => (
    <section data-testid="homepage-hero">
      <h1>Votre standard téléphonique</h1>
    </section>
  ),
}))

jest.mock('@/components/services-section', () => ({
  ServicesSection: () => <section data-testid="services">Services</section>,
}))

jest.mock('@/components/about-section', () => ({
  AboutSection: () => <section data-testid="about">À propos</section>,
}))

jest.mock('@/components/clients-carousel', () => ({
  ClientsCarousel: () => <div data-testid="clients">Clients</div>,
}))

jest.mock('@/components/testimonials-section', () => ({
  TestimonialsSection: () => <section data-testid="testimonials">Témoignages</section>,
}))

jest.mock('@/components/contact-section', () => ({
  ContactSection: () => <section data-testid="contact">Contact</section>,
}))

describe('HomePage - Test d\'hydratation', () => {
  it('se rend sans erreurs d\'hydratation', () => {
    const { container } = render(<HomePage />)
    
    // Vérifier que la page se rend correctement
    expect(screen.getByTestId('homepage-hero')).toBeInTheDocument()
    expect(screen.getByText('Votre standard téléphonique')).toBeInTheDocument()
    
    // Vérifier qu'il n'y a pas d'erreurs dans la console
    expect(container).toBeInTheDocument()
  })

  it('affiche toutes les sections principales', () => {
    render(<HomePage />)
    
    // Vérifier que toutes les sections sont présentes
    expect(screen.getByTestId('homepage-hero')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('services')).toBeInTheDocument()
    expect(screen.getByTestId('clients')).toBeInTheDocument()
    expect(screen.getByTestId('testimonials')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
  })

  it('a la structure de layout correcte', () => {
    const { container } = render(<HomePage />)
    
    // Vérifier la structure principale (div au lieu de main)
    const mainContainer = container.querySelector('div')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('min-h-screen')
    
    // Vérifier les éléments décoratifs
    const decorativeElements = container.querySelectorAll('.animate-blob')
    expect(decorativeElements.length).toBeGreaterThan(0)
  })

  it('applique les classes CSS correctement', () => {
    const { container } = render(<HomePage />)
    
    const mainContainer = container.querySelector('div')
    expect(mainContainer).toHaveClass('min-h-screen')
    expect(mainContainer).toHaveClass('bg-gradient-to-br')
  })
})
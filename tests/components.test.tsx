import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroSection } from '../components/hero-section'

describe('HeroSection', () => {
  it('renders hero section with correct content', () => {
    render(<HeroSection />)
    
    // Vérifier que le titre principal est présent
    expect(screen.getByText(/Votre standard téléphonique/i)).toBeInTheDocument()
    
    // Vérifier que les boutons CTA sont présents
    expect(screen.getByRole('button', { name: /Demander un devis/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Découvrir nos services/i })).toBeInTheDocument()
  })
}) 
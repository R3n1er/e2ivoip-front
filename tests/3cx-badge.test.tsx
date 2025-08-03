import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThreeCXBadge } from '../components/ui/3cx-badge'

describe('3CX Bronze Partner Badge', () => {
  it('should render the 3CX logo correctly', () => {
    render(<ThreeCXBadge />)
    
    // Vérifier que le logo 3CX est présent
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('X')).toBeInTheDocument()
    expect(screen.getByText('®')).toBeInTheDocument()
  })

  it('should render the Bronze Partner text', () => {
    render(<ThreeCXBadge />)
    
    // Vérifier que le texte Bronze Partner est présent
    expect(screen.getByText('Bronze')).toBeInTheDocument()
    expect(screen.getByText('Partner')).toBeInTheDocument()
  })

  it('should have the star icon', () => {
    render(<ThreeCXBadge />)
    
    // Vérifier que l'étoile est présente
    expect(screen.getByText('★')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    const { container } = render(<ThreeCXBadge />)
    
    // Vérifier que le badge a les bonnes classes CSS
    const badge = container.querySelector('div')
    expect(badge).toHaveClass('flex', 'items-center', 'space-x-3', 'bg-white', 'rounded-lg', 'p-3', 'shadow-lg')
  })
}) 
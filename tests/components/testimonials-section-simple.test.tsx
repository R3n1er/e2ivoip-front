import { render, screen } from '@testing-library/react'
import { TestimonialsSectionSimple } from '@/components/testimonials-section-simple'

// Read the source file content for static analysis tests
const fs = require('fs')
const path = require('path')
const sourceCode = fs.readFileSync(
  path.join(__dirname, '../../components/testimonials-section-simple.tsx'),
  'utf-8'
)

describe('TestimonialsSectionSimple - Monolithe Design System compliance', () => {
  test('does NOT import from @/components/ui/card', () => {
    expect(sourceCode).not.toMatch(/from\s+['"]@\/components\/ui\/card['"]/)
  })

  test('does NOT import from @/components/ui/badge', () => {
    expect(sourceCode).not.toMatch(/from\s+['"]@\/components\/ui\/badge['"]/)
  })

  test('does NOT contain hover:shadow-lg', () => {
    expect(sourceCode).not.toContain('hover:shadow-lg')
  })

  test('does NOT contain font-semibold or font-bold or font-medium', () => {
    expect(sourceCode).not.toMatch(/font-semibold|font-bold|font-medium/)
  })

  test('contains font-black for author name styling', () => {
    expect(sourceCode).toContain('font-black')
  })

  test('renders 3 testimonial cards with expected content', () => {
    render(<TestimonialsSectionSimple />)
    expect(screen.getByText(/Marie Dubois/)).toBeInTheDocument()
    expect(screen.getByText(/Jean-Pierre Martin/)).toBeInTheDocument()
    expect(screen.getByText(/Sophie Laurent/)).toBeInTheDocument()
  })

  test('exports TestimonialsSectionSimple as named export', () => {
    expect(typeof TestimonialsSectionSimple).toBe('function')
  })
})

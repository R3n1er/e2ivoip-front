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

describe('TestimonialsSectionSimple - Props and empty state', () => {
  test('accepts optional testimonials prop', () => {
    const customTestimonials = [
      {
        content: 'Custom review',
        author: 'Test Author',
        role: 'CEO',
        company: 'Test Corp',
        location: 'Guadeloupe' as const,
        rating: 4 as const,
      },
    ]
    render(<TestimonialsSectionSimple testimonials={customTestimonials} />)
    expect(screen.getByText(/Test Author/)).toBeInTheDocument()
    expect(screen.getByText(/Custom review/)).toBeInTheDocument()
  })

  test('returns null when testimonials is empty array', () => {
    const { container } = render(<TestimonialsSectionSimple testimonials={[]} />)
    expect(container.innerHTML).toBe('')
  })

  test('renders default testimonials when no prop passed', () => {
    render(<TestimonialsSectionSimple />)
    expect(screen.getByText(/Marie Dubois/)).toBeInTheDocument()
  })

  test('contains DEFAULT_TESTIMONIALS constant in source', () => {
    expect(sourceCode).toContain('DEFAULT_TESTIMONIALS')
  })

  test('contains TestimonialsSectionProps interface in source', () => {
    expect(sourceCode).toContain('TestimonialsSectionProps')
  })
})

describe('TestimonialsSectionSimple - 3CX Badge Strip', () => {
  test('renders 3CX badge strip with text PARTENAIRE 3CX CERTIFIE', () => {
    render(<TestimonialsSectionSimple />)
    expect(screen.getByText('PARTENAIRE 3CX CERTIFIE')).toBeInTheDocument()
  })

  test('renders badge image from 3cx-Silver-Partner-badge.webp', () => {
    render(<TestimonialsSectionSimple />)
    const img = screen.getByAltText('3CX Silver Partner')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('3cx-Silver-Partner-badge'))
  })

  test('badge strip appears before testimonial cards in DOM order', () => {
    const { container } = render(<TestimonialsSectionSimple />)
    const html = container.innerHTML
    const badgePos = html.indexOf('PARTENAIRE 3CX CERTIFIE')
    const authorPos = html.indexOf('Marie Dubois')
    expect(badgePos).toBeGreaterThan(-1)
    expect(authorPos).toBeGreaterThan(-1)
    expect(badgePos).toBeLessThan(authorPos)
  })

  test('contains 3cx-Silver-Partner-badge in source', () => {
    expect(sourceCode).toContain('3cx-Silver-Partner-badge')
  })
})

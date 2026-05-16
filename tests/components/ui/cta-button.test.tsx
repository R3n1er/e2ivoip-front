import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CTAButton, CTAButtonMarine, CTAButtonSecondary } from '@/components/ui/cta-button'

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ href, children, className, onClick, ...rest }: {
    href: string
    children: React.ReactNode
    className?: string
    onClick?: () => void
    [key: string]: unknown
  }) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }
})

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

// Mock trackEvent
jest.mock('@/lib/analytics/track-event', () => ({
  trackEvent: jest.fn(),
}))

describe('CTAButton - Link-only pattern', () => {
  test('CTAButton renders a Link element (not a button) for internal hrefs', () => {
    render(
      <CTAButton href="/devis-en-ligne">
        Calculez vos economies
      </CTAButton>
    )

    const link = screen.getByRole('link', { name: /Calculez vos economies/i })
    expect(link).toBeInTheDocument()

    // Should NOT have a nested button
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  test('CTAButton renders an anchor element (not a button) for external hrefs', () => {
    render(
      <CTAButton href="https://example.com" external>
        Visiter
      </CTAButton>
    )

    const link = screen.getByRole('link', { name: /Visiter/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))

    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  test('CTAButton applies className "monolith-btn" on the outer element', () => {
    render(
      <CTAButton href="/test">
        Test
      </CTAButton>
    )

    const link = screen.getByRole('link', { name: /Test/i })
    expect(link.className).toContain('monolith-btn')
  })

  test('CTAButton inner span uses font-black uppercase tracking-[0.2em]', () => {
    const { container } = render(
      <CTAButton href="/test">
        Test Button
      </CTAButton>
    )

    const span = container.querySelector('span')
    expect(span).not.toBeNull()
    expect(span!.className).toContain('font-black')
    expect(span!.className).toContain('uppercase')
    expect(span!.className).toContain('tracking-[0.2em]')
    // Must NOT have old typography
    expect(span!.className).not.toContain('font-semibold')
    expect(span!.className).not.toContain('text-lg')
  })

  test('CTAButton does NOT render any gradient overlay div', () => {
    const { container } = render(
      <CTAButton href="/test">
        Test
      </CTAButton>
    )

    const html = container.innerHTML
    expect(html).not.toContain('gradient')
  })

  test('CTAButton does NOT render an arrow icon (lni-arrow-right)', () => {
    const { container } = render(
      <CTAButton href="/test">
        Test
      </CTAButton>
    )

    const html = container.innerHTML
    expect(html).not.toContain('arrow-right')
  })

  test('CTAButton does NOT contain shadow-md, shadow-xl, hover:shadow-xl, or hover:-translate-y-0.5', () => {
    const { container } = render(
      <CTAButton href="/test">
        Test
      </CTAButton>
    )

    const html = container.innerHTML
    expect(html).not.toContain('shadow-md')
    expect(html).not.toContain('shadow-xl')
    expect(html).not.toContain('hover:shadow-xl')
    expect(html).not.toContain('hover:-translate-y-0.5')
  })

  test('CTAButtonMarine renders with bg-blue-marine variant', () => {
    const { container } = render(
      <CTAButtonMarine href="/test">
        Marine
      </CTAButtonMarine>
    )

    const span = container.querySelector('span')
    expect(span).not.toBeNull()
    expect(span!.className).toContain('bg-blue-marine')

    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  test('CTAButtonSecondary renders with bg-white text-[#091421] variant', () => {
    const { container } = render(
      <CTAButtonSecondary href="/test">
        Secondary
      </CTAButtonSecondary>
    )

    const span = container.querySelector('span')
    expect(span).not.toBeNull()
    expect(span!.className).toContain('bg-white')
    expect(span!.className).toContain('text-[#091421]')

    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  test('CTAButton external tel: does not open a new tab', () => {
    render(
      <CTAButton href="tel:+33189560500" external>
        Appeler
      </CTAButton>
    )

    const link = screen.getByRole('link', { name: /Appeler/i })
    expect(link).toHaveAttribute('href', 'tel:+33189560500')
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })
})

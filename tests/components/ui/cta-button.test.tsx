import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CTAButton, CTAButtonMarine, CTAButtonSecondary } from '@/components/ui/cta-button'

describe('CTA Buttons', () => {
  test('CTAButton renders a link-wrapped button for internal href', () => {
    render(
      <CTAButton href="/devis-en-ligne" icon="lni-phone">
        Calculez vos économies
      </CTAButton>
    )

    // Link is accessible with the button text as its name
    const link = screen.getByRole('link', { name: /Calculez vos économies/i })
    expect(link).toBeInTheDocument()

    // The visual element is a button inside the link
    const btn = screen.getByRole('button', { name: /Calculez vos économies/i })
    expect(btn).toBeInTheDocument()
  })

  test('CTAButton external tel: does not open a new tab', () => {
    render(
      <CTAButton href="tel:+33189560500" external icon="lni-phone">
        Appeler
      </CTAButton>
    )

    const link = screen.getByRole('link', { name: /Appeler/i })
    expect(link).toHaveAttribute('href', 'tel:+33189560500')
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  test('CTAButton external http: opens in a new tab with rel noopener', () => {
    render(
      <CTAButton href="https://example.com" external icon="lni-external-link">
        Visiter
      </CTAButton>
    )

    const link = screen.getByRole('link', { name: /Visiter/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  test('CTAButton fullWidth applies full width to button element', () => {
    render(
      <CTAButton href="/test" fullWidth>
        Pleine largeur
      </CTAButton>
    )

    const btn = screen.getByRole('button', { name: /Pleine largeur/i })
    expect(btn.className).toMatch(/\bw-full\b/)
  })

  test('CTAButtonMarine external tel: does not open in new tab', () => {
    render(
      <CTAButtonMarine href="tel:+33189560500" external>
        Contacter
      </CTAButtonMarine>
    )

    const link = screen.getByRole('link', { name: /Contacter/i })
    expect(link).toHaveAttribute('href', 'tel:+33189560500')
    expect(link).not.toHaveAttribute('target')
  })

  test('CTAButtonSecondary behaves like CTAButton for external tel', () => {
    render(
      <CTAButtonSecondary href="tel:+33189560500" external>
        Téléphone
      </CTAButtonSecondary>
    )

    const link = screen.getByRole('link', { name: /Téléphone/i })
    expect(link).toHaveAttribute('href', 'tel:+33189560500')
    expect(link).not.toHaveAttribute('target')
  })
})


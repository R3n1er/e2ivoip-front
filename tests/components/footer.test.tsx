import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Footer } from '@/components/layout/footer'

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ href, children, className, ...rest }: {
    href: string
    children: React.ReactNode
    className?: string
    [key: string]: unknown
  }) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }
})

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock trackEvent
jest.mock('@/lib/analytics/track-event', () => ({
  trackEvent: jest.fn(),
}))

describe('Footer - Phone Links', () => {
  test('renders 4 territory phone numbers as clickable tel: links', () => {
    render(<Footer />)

    const telLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href')?.startsWith('tel:')
    )
    expect(telLinks.length).toBeGreaterThanOrEqual(4)
  })

  test('footer phone links use PhoneLink component (checking tel: href format)', () => {
    render(<Footer />)

    // PhoneLink renders tel: links with the full international format
    const telLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href')?.startsWith('tel:+')
    )
    expect(telLinks.length).toBeGreaterThanOrEqual(4)
  })
})

describe('Footer — accès aux dispositifs RGPD', () => {
  test('expose un lien vers le formulaire d’exercice des droits', () => {
    render(<Footer />)

    const lien = screen.getByRole('link', { name: /exercer mes droits/i })
    expect(lien).toHaveAttribute('href', '/exercer-mes-droits')
  })

  test('permet de rouvrir le choix cookies : retirer doit être aussi simple qu’accepter', () => {
    render(<Footer />)

    expect(
      screen.getByRole('button', { name: /gérer mes cookies/i })
    ).toBeInTheDocument()
  })
})

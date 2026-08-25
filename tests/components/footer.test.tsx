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
  test('expose les liens directs CGV, mentions légales et exercer mes droits', () => {
    render(<Footer />)

    const cgv = screen.getByRole('link', { name: /conditions générales de vente/i })
    expect(cgv).toHaveAttribute('href', '/juridique/conditions-generales-de-vente')

    const mentions = screen.getByRole('link', { name: /mentions légales/i })
    expect(mentions).toHaveAttribute('href', '/juridique/mentions-legales')

    const droits = screen.getByRole('link', { name: /exercer mes droits/i })
    expect(droits).toHaveAttribute('href', '/juridique/exercer-mes-droits')
  })

  test('permet de rouvrir le choix cookies : retirer doit être aussi simple qu’accepter', () => {
    render(<Footer />)

    expect(
      screen.getByRole('button', { name: /gérer mes cookies/i })
    ).toBeInTheDocument()
  })
})

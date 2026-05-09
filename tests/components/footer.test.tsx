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

// Mock ThreeCXBadge
jest.mock('@/components/ui/3cx-badge', () => ({
  ThreeCXBadge: () => <div data-testid="3cx-badge">3CX Badge</div>,
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

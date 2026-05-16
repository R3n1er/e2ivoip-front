import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { DevisButtonsSection } from '@/components/devis-buttons-section'

// Mock framer-motion to keep tests synchronous
jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripMotionProps = (props: Record<string, any>) => {
    const {
      initial: _i,
      animate: _a,
      transition: _t,
      whileHover: _h,
      whileTap: _w,
      ...rest
    } = props
    void _i; void _a; void _t; void _h; void _w
    return rest
  }
  return {
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) =>
        React.createElement('div', stripMotionProps(props), children),
      a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & Record<string, unknown>) =>
        React.createElement('a', stripMotionProps(props), children),
    },
  }
})

// Mock next/navigation usePathname (consumed via trackEvent caller indirectly here, kept for safety)
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

// Mock trackEvent
jest.mock('@/lib/analytics/track-event', () => ({
  trackEvent: jest.fn(),
}))

import { trackEvent } from '@/lib/analytics/track-event'

describe('DevisButtonsSection — analytics tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all 4 devis buttons', () => {
    render(<DevisButtonsSection />)
    expect(screen.getByRole('link', { name: /Devis Trunk SIP/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Devis Portabilité/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Devis VoIP 3CX/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Devis Projet PBX/i })).toBeInTheDocument()
  })

  test('clicking a devis button fires trackEvent("cta_click", ...) with the button label', () => {
    render(<DevisButtonsSection />)
    const link = screen.getByRole('link', { name: /Devis Trunk SIP/i })

    fireEvent.click(link)

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith('cta_click', expect.objectContaining({
      element_text: 'Devis Trunk SIP',
      element_id: expect.stringContaining('urlr.me'),
    }))
  })

  test('clicking the urgent phone link fires trackEvent("phone_click", ...)', () => {
    render(<DevisButtonsSection />)
    const phoneLink = screen.getByRole('link', { name: /05 94 96 35 00/ })

    fireEvent.click(phoneLink)

    expect(trackEvent).toHaveBeenCalledWith('phone_click', expect.objectContaining({
      element_id: 'tel:+594594963500',
    }))
  })

  test('component does not introduce off-charte hex colors (bg-red-600, #1d3557, #2a4365)', () => {
    const { container } = render(<DevisButtonsSection />)
    const html = container.innerHTML
    expect(html).not.toContain('bg-red-600')
    expect(html).not.toContain('#1d3557')
    expect(html).not.toContain('#2a4365')
  })

  test('component uses charte-mapped classes (bg-red-primary or bg-blue-marine)', () => {
    const { container } = render(<DevisButtonsSection />)
    const html = container.innerHTML
    // At least one button must carry the charte primary background
    expect(html).toMatch(/bg-red-primary|bg-blue-marine/)
  })
})

import { render, screen, fireEvent } from '@testing-library/react'

// Mock posthog-js
jest.mock('posthog-js', () => ({
  __esModule: true,
  default: { capture: jest.fn(), init: jest.fn() },
}))

// Mock trackEvent
const mockTrackEvent = jest.fn()
jest.mock('@/lib/analytics/track-event', () => ({
  trackEvent: (...args: any[]) => mockTrackEvent(...args),
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

import { CTAButton, CTAButtonMarine, CTAButtonSecondary } from '@/components/ui/cta-button'

describe('Event tracking integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('CTA button tracking', () => {
    it('fires cta_click when CTAButton is clicked', () => {
      render(
        <CTAButton href="/contact" data-testid="hero-cta">
          Demander un devis
        </CTAButton>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockTrackEvent).toHaveBeenCalledWith('cta_click', {
        page: '/test-page',
        element_id: expect.any(String),
        element_text: 'Demander un devis',
      })
    })

    it('fires phone_click when CTAButton with tel: href is clicked', () => {
      render(
        <CTAButton href="tel:+33189560500" external={true}>
          Appeler
        </CTAButton>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockTrackEvent).toHaveBeenCalledWith('phone_click', {
        page: '/test-page',
        element_id: expect.any(String),
        element_text: 'Appeler',
      })
    })

    it('fires cta_click when CTAButtonMarine is clicked', () => {
      render(
        <CTAButtonMarine href="/devis">
          Devis
        </CTAButtonMarine>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockTrackEvent).toHaveBeenCalledWith('cta_click', expect.objectContaining({
        page: '/test-page',
        element_text: 'Devis',
      }))
    })

    it('fires cta_click when CTAButtonSecondary is clicked', () => {
      render(
        <CTAButtonSecondary href="/contact">
          Contact
        </CTAButtonSecondary>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockTrackEvent).toHaveBeenCalledWith('cta_click', expect.objectContaining({
        page: '/test-page',
        element_text: 'Contact',
      }))
    })
  })

  describe('HubSpot form tracking', () => {
    it('fires form_submit when HubSpot form is submitted', () => {
      // Mock window.hbspt to capture the onFormSubmitted callback
      let capturedOnFormSubmitted: ((data: any) => void) | null = null

      ;(window as any).hbspt = {
        forms: {
          create: jest.fn((config: any) => {
            capturedOnFormSubmitted = config.onFormSubmitted
          }),
        },
      }

      // Dynamic import to get fresh module with hbspt available
      const { HubSpotForm } = require('@/components/hubspot/hubspot-form')

      render(<HubSpotForm formId="test-form-123" testId="hs-test" />)

      // Simulate HubSpot calling onFormSubmitted
      if (capturedOnFormSubmitted) {
        capturedOnFormSubmitted({ submissionValues: {} })
      }

      expect(mockTrackEvent).toHaveBeenCalledWith('form_submit', expect.objectContaining({
        element_id: expect.stringContaining('hubspot'),
      }))
    })
  })

  describe('Tally popup tracking', () => {
    it('fires form_submit when Tally form is submitted via postMessage', () => {
      const { TallyPopupClean } = require('@/components/tally-popup-clean')

      render(<TallyPopupClean />)

      // Simulate Tally form submission via postMessage
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            event: 'Tally.FormSubmitted',
            formId: 'mDY1bl',
          },
        })
      )

      expect(mockTrackEvent).toHaveBeenCalledWith('form_submit', expect.objectContaining({
        element_id: expect.stringContaining('tally'),
      }))
    })
  })
})

import type { EventPayload } from '@/lib/analytics/types'

// Mock posthog-js before importing trackEvent
const mockCapture = jest.fn()
jest.mock('posthog-js', () => ({
  __esModule: true,
  default: {
    capture: mockCapture,
  },
}))

import { trackEvent } from '@/lib/analytics/track-event'

describe('trackEvent', () => {
  const payload: EventPayload = {
    page: '/contact',
    element_id: 'hero-cta',
    element_text: 'Demander un devis',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('calls posthog.capture with event name and payload', () => {
    trackEvent('cta_click', payload)

    expect(mockCapture).toHaveBeenCalledWith('cta_click', payload)
  })

  it('does not throw when posthog is undefined', () => {
    // Temporarily override the mock to return undefined
    jest.resetModules()
    jest.mock('posthog-js', () => ({
      __esModule: true,
      default: undefined,
    }))

    // Re-import with new mock
    const { trackEvent: trackEventSafe } = require('@/lib/analytics/track-event')

    expect(() => {
      trackEventSafe('cta_click', payload)
    }).not.toThrow()
  })

  it('catches errors from posthog.capture and logs them', () => {
    mockCapture.mockImplementation(() => {
      throw new Error('PostHog capture failed')
    })

    expect(() => {
      trackEvent('cta_click', payload)
    }).not.toThrow()

    expect(console.error).toHaveBeenCalledWith(
      '[Analytics] Failed to track event:',
      'cta_click',
      expect.any(Error)
    )
  })
})

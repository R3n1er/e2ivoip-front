import type { AnalyticsEventName, EventPayload } from './types'

export function trackEvent(event: AnalyticsEventName, payload: EventPayload): void {
  if (typeof window === 'undefined') return

  void import('posthog-js')
    .then(({ default: posthog }) => {
      if (posthog?.capture) {
        posthog.capture(event, payload)
      }
    })
    .catch((error) => {
      console.error('[Analytics] Failed to track event:', event, error)
    })
}

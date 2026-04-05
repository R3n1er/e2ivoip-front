import posthog from 'posthog-js'
import type { AnalyticsEventName, EventPayload } from './types'

export function trackEvent(event: AnalyticsEventName, payload: EventPayload): void {
  try {
    if (typeof window !== 'undefined' && posthog?.capture) {
      posthog.capture(event, payload)
    }
  } catch (error) {
    console.error('[Analytics] Failed to track event:', event, error)
  }
}

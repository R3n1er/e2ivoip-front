import type { AnalyticsEventName, EventPayload } from './types'

export function trackEvent(event: AnalyticsEventName, payload: EventPayload): void {
  if (typeof window === 'undefined') return

  void import('posthog-js')
    .then(({ default: posthog }) => {
      if (posthog?.capture) {
        posthog.capture(event, payload)
      }
    })
    .catch(() => {
      // Analytics bloqué (bloqueur de pub/traceurs) ou indisponible : on ignore
      // silencieusement. Le suivi est non bloquant et non critique pour l'UX.
    })
}

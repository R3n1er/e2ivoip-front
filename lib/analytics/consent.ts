export type ConsentChoice = 'accepted' | 'declined'
export const CONSENT_KEY = 'e2i-cookie-consent'

export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(CONSENT_KEY)
  return value === 'accepted' || value === 'declined' ? value : null
}

export function hasAcceptedCookies(): boolean {
  return getConsent() === 'accepted'
}

export async function acceptCookies(): Promise<void> {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, 'accepted')
  const { default: posthog } = await import('posthog-js')
  posthog.set_config({ persistence: 'localStorage+cookie' })
}

export function declineCookies(): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, 'declined')
  // PostHog reste en persistence:'memory' (cookieless) — rien à changer.
}

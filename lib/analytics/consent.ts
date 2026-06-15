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

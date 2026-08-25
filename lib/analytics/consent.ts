export type ConsentChoice = 'accepted' | 'declined'
export const CONSENT_KEY = 'e2i-cookie-consent'

// Événement émis quand le visiteur fait son choix cookies. Permet aux autres
// éléments fixes (ex. bouton chat) de réagir à la disparition du bandeau.
export const CONSENT_CHANGE_EVENT = 'e2i-consent-change'

function notifyConsentChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT))
}

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
  notifyConsentChange()
  await import('posthog-js')
    .then(({ default: posthog }) => {
      if (posthog?.set_config) {
        posthog.set_config({ persistence: 'localStorage+cookie' })
      }
    })
    .catch(() => {
      // Bascule de persistance impossible (SDK bloqué) : sans impact pour l'UX.
    })
}

export function declineCookies(): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, 'declined')
  notifyConsentChange()
  // PostHog reste en persistence:'memory' (cookieless) — rien à changer.
}

/**
 * Oublie le choix mémorisé : le bandeau réapparaît au prochain rendu.
 *
 * Le RGPD impose que retirer son consentement soit aussi simple que le
 * donner. Repasser PostHog en persistance mémoire est indispensable — sans
 * cela, le retrait n'aurait aucun effet tant que le visiteur n'a pas
 * explicitement refusé dans le bandeau réaffiché.
 */
export async function resetConsent(): Promise<void> {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CONSENT_KEY)
  notifyConsentChange()
  await import('posthog-js')
    .then(({ default: posthog }) => {
      if (posthog?.set_config) {
        posthog.set_config({ persistence: 'memory' })
      }
    })
    .catch(() => {
      // SDK bloqué : le choix est oublié malgré tout, le bandeau reviendra.
    })
}

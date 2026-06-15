import { getConsent, hasAcceptedCookies, CONSENT_KEY } from '@/lib/analytics/consent'

describe('getConsent', () => {
  beforeEach(() => localStorage.clear())

  it('retourne null si aucun choix mémorisé', () => {
    expect(getConsent()).toBeNull()
  })

  it('retourne la valeur mémorisée', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    expect(getConsent()).toBe('accepted')
  })

  it('hasAcceptedCookies est vrai seulement si accepted', () => {
    expect(hasAcceptedCookies()).toBe(false)
    localStorage.setItem(CONSENT_KEY, 'declined')
    expect(hasAcceptedCookies()).toBe(false)
    localStorage.setItem(CONSENT_KEY, 'accepted')
    expect(hasAcceptedCookies()).toBe(true)
  })
})

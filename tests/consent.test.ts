import {
  getConsent,
  hasAcceptedCookies,
  CONSENT_KEY,
  CONSENT_CHANGE_EVENT,
  acceptCookies,
  declineCookies,
  resetConsent,
} from '@/lib/analytics/consent'

const setConfigMock = jest.fn()
jest.mock('posthog-js', () => ({
  __esModule: true,
  default: { set_config: (...args: unknown[]) => setConfigMock(...args) },
}))

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

describe('acceptCookies / declineCookies', () => {
  beforeEach(() => {
    localStorage.clear()
    setConfigMock.mockClear()
  })

  it('acceptCookies mémorise accepted et active les cookies PostHog', async () => {
    await acceptCookies()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted')
    expect(setConfigMock).toHaveBeenCalledWith({ persistence: 'localStorage+cookie' })
  })

  it('declineCookies mémorise declined sans toucher la persistance', () => {
    declineCookies()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('declined')
    expect(setConfigMock).not.toHaveBeenCalled()
  })
})

describe('resetConsent', () => {
  beforeEach(() => {
    localStorage.clear()
    setConfigMock.mockClear()
  })

  it('oublie le choix mémorisé pour que le bandeau réapparaisse', async () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')

    await resetConsent()

    expect(getConsent()).toBeNull()
  })

  it('repasse PostHog en persistance mémoire : retirer doit valoir refuser', async () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')

    await resetConsent()

    expect(setConfigMock).toHaveBeenCalledWith({ persistence: 'memory' })
  })

  it('émet l’événement de changement pour les éléments fixes de la page', async () => {
    const listener = jest.fn()
    window.addEventListener(CONSENT_CHANGE_EVENT, listener)

    await resetConsent()

    expect(listener).toHaveBeenCalled()
    window.removeEventListener(CONSENT_CHANGE_EVENT, listener)
  })
})

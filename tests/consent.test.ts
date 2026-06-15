import { getConsent, hasAcceptedCookies, CONSENT_KEY, acceptCookies, declineCookies } from '@/lib/analytics/consent'

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

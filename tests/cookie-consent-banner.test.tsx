import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import * as consent from '@/lib/analytics/consent'

jest.mock('@/lib/analytics/consent')

// L'automock vide les constantes : on récupère le nom réel de l'événement
// pour que le test et le composant parlent bien du même signal.
const { CONSENT_CHANGE_EVENT } = jest.requireActual<
  typeof import('@/lib/analytics/consent')
>('@/lib/analytics/consent')

afterEach(() => jest.restoreAllMocks())

describe('CookieConsentBanner — visibilité', () => {
  it('ne rend rien si un choix a déjà été fait', () => {
    jest.spyOn(consent, 'getConsent').mockReturnValue('accepted')
    const { container } = render(<CookieConsentBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('affiche le bandeau si aucun choix mémorisé', () => {
    jest.spyOn(consent, 'getConsent').mockReturnValue(null)
    render(<CookieConsentBanner />)
    expect(screen.getByRole('button', { name: /accepter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /refuser/i })).toBeInTheDocument()
  })
})

describe('CookieConsentBanner — actions', () => {
  beforeEach(() => {
    jest.spyOn(consent, 'getConsent').mockReturnValue(null)
    jest.spyOn(consent, 'acceptCookies').mockResolvedValue(undefined)
    jest.spyOn(consent, 'declineCookies').mockReturnValue(undefined)
  })

  it('clic Accepter appelle acceptCookies puis masque le bandeau', async () => {
    render(<CookieConsentBanner />)
    fireEvent.click(screen.getByRole('button', { name: /accepter/i }))
    expect(consent.acceptCookies).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /accepter/i })).not.toBeInTheDocument()
    )
  })

  it('clic Refuser appelle declineCookies puis masque le bandeau', async () => {
    render(<CookieConsentBanner />)
    fireEvent.click(screen.getByRole('button', { name: /refuser/i }))
    expect(consent.declineCookies).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /refuser/i })).not.toBeInTheDocument()
    )
  })
})

describe('CookieConsentBanner — retrait du consentement', () => {
  it('réapparaît quand le choix mémorisé est oublié', async () => {
    // Choix déjà fait au montage : le bandeau est masqué.
    const getConsent = jest.spyOn(consent, 'getConsent').mockReturnValue('accepted')
    render(<CookieConsentBanner />)
    expect(screen.queryByRole('button', { name: /accepter/i })).not.toBeInTheDocument()

    // « Gérer mes cookies » efface le choix puis émet l'événement.
    getConsent.mockReturnValue(null)
    fireEvent(window, new CustomEvent(CONSENT_CHANGE_EVENT))

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /accepter/i })).toBeInTheDocument()
    )
  })

  it('ne se réaffiche pas quand l’événement accompagne un choix ferme', async () => {
    jest.spyOn(consent, 'getConsent').mockReturnValue('declined')
    render(<CookieConsentBanner />)

    fireEvent(window, new CustomEvent(CONSENT_CHANGE_EVENT))

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /accepter/i })).not.toBeInTheDocument()
    )
  })
})

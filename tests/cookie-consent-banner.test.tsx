import { render, screen } from '@testing-library/react'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import * as consent from '@/lib/analytics/consent'

jest.mock('@/lib/analytics/consent')

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

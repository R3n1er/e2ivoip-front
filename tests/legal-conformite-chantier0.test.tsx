import { render, screen } from '@testing-library/react'

import MentionsLegalesPage from '../app/juridique/mentions-legales/page'
import PolitiqueConfidentialitePage from '../app/juridique/politique-confidentialite/page'
import ConditionsGeneralesPage from '../app/juridique/conditions-generales-de-vente/page'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { COMPANY, SUB_PROCESSORS, COOKIES } from '@/lib/legal/company'

/**
 * Chantier 0 — conformité et identité légale.
 *
 * Ces tests couvrent trois écarts constatés entre le code et les documents
 * publiés :
 *  1. E2I ASSISTANCE n'est pas inscrite au RCS : le champ `rcs` affiche une
 *     immatriculation inexistante. Ne s'invente pas une inscription.
 *  2. PostHog est réellement initialisé (instrumentation-client.ts) et traite
 *     donc des données : il doit figurer au registre des sous-traitants et des
 *     traceurs, au même titre que HubSpot. Un sous-traitant non déclaré est une
 *     violation de l'article 28 du RGPD.
 *  3. Le bandeau cookie affirme que le chat dépose ses cookies « indépendamment
 *     de ce choix », ce qui contredit la politique de confidentialité qui promet
 *     qu'aucun traceur n'est écrit sans acceptation.
 */
describe('Chantier 0 — registre légal (lib/legal/company.ts)', () => {
  it('n’expose plus de numéro RCS : l’entreprise est immatriculée en Guyane, pas au registre du commerce', () => {
    expect(Object.keys(COMPANY)).not.toContain('rcs')
    expect(JSON.stringify(COMPANY)).not.toMatch(/RCS/i)
  })

  it('conserve le SIRET et le siège de Cayenne', () => {
    expect(COMPANY.siret).toBe('51743457700014')
    expect(COMPANY.address.city).toBe('Cayenne')
    expect(COMPANY.address.postalCode).toBe('97300')
  })

  it('déclare PostHog parmi les sous-traitants', () => {
    const posthog = SUB_PROCESSORS.find((p) => /posthog/i.test(p.name))
    expect(posthog).toBeDefined()
    // Un sous-traitant déclaré doit documenter sa finalité, ses données et son lieu.
    expect(posthog?.purpose).toBeTruthy()
    expect(posthog?.data).toBeTruthy()
    expect(posthog?.location).toBeTruthy()
  })

  it('déclare PostHog parmi les traceurs, avec consentement requis', () => {
    const traceur = COOKIES.find(
      (c) => /posthog/i.test(c.origin) || /^ph_/i.test(c.name)
    )
    expect(traceur).toBeDefined()
    expect(traceur?.requiresConsent).toBe(true)
  })

  it('conserve HubSpot déclaré avec consentement requis', () => {
    const hubspot = COOKIES.find((c) => /hubspot/i.test(c.origin))
    expect(hubspot).toBeDefined()
    expect(hubspot?.requiresConsent).toBe(true)
  })
})

describe('Chantier 0 — mentions légales', () => {
  it('n’affiche plus aucune référence au RCS', () => {
    const { container } = render(<MentionsLegalesPage />)
    expect(container.textContent).not.toMatch(/\bRCS\b/)
  })

  it('affiche toujours l’immatriculation réelle (SIRET)', () => {
    const { container } = render(<MentionsLegalesPage />)
    expect(container.textContent).toMatch(/51743457700014/)
  })
})

describe('Chantier 0 — politique de confidentialité', () => {
  it('nomme PostHog, qui traite effectivement des données aujourd’hui', () => {
    render(<PolitiqueConfidentialitePage />)
    // PostHog doit apparaître au moins une fois. Il est légitimement cité deux
    // fois : parmi les traceurs (cookie) et parmi les sous-traitants (art. 28).
    expect(screen.getAllByText(/PostHog/i).length).toBeGreaterThan(0)
  })
})

describe('Chantier 0 — bandeau cookies', () => {
  it('ne contredit plus la politique de confidentialité sur le dépôt des cookies du chat', () => {
    const { container } = render(<CookieConsentBanner />)
    expect(container.textContent).not.toMatch(/indépendamment de ce choix/i)
  })
})

describe('Chantier 0 — CGV', () => {
  it('ne présente plus la compétence exclusive de Cayenne comme absolue', () => {
    const { container } = render(<ConditionsGeneralesPage />)
    expect(container.textContent).not.toMatch(/Tribunaux compétents de Cayenne/)
  })
})

import { render, screen } from '@testing-library/react'

import MentionsLegales from '../app/mentions-legales/page'
import { COMPANY, COOKIES, HOSTING, NON_TRACKING_TOOLS } from '@/lib/legal/company'

describe('Page Mentions légales', () => {
  it('affiche le titre principal', () => {
    render(<MentionsLegales />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Mentions légales'
    )
  })

  it('identifie l’éditeur par son immatriculation réelle', () => {
    render(<MentionsLegales />)

    expect(screen.getAllByText(new RegExp(COMPANY.legalName)).length).toBeGreaterThan(0)
    expect(screen.getByText(new RegExp(COMPANY.siret))).toBeInTheDocument()
  })

  it('mentionne le RNE et jamais le RCS : l’entreprise n’y est pas inscrite', () => {
    const { container } = render(<MentionsLegales />)

    expect(screen.getByText(/Registre National des Entreprises/)).toBeInTheDocument()
    expect(container.textContent).not.toMatch(/\bRCS\b/)
  })

  it('distingue l’hébergeur du site du gestionnaire du nom de domaine', () => {
    render(<MentionsLegales />)

    expect(screen.getByText(/Hébergeur du site/)).toBeInTheDocument()
    expect(screen.getAllByText(new RegExp(HOSTING.provider)).length).toBeGreaterThan(0)

    expect(screen.getByText(/Gestion du nom de domaine/)).toBeInTheDocument()
    expect(screen.getAllByText(/OVH/).length).toBeGreaterThan(0)
  })

  it('nomme chaque traceur réellement déposé, depuis la source unique', () => {
    render(<MentionsLegales />)

    for (const cookie of COOKIES) {
      expect(screen.getAllByText(new RegExp(cookie.origin.split(' ')[0])).length).toBeGreaterThan(0)
    }
  })

  it('cite PostHog, actif sur le site, parmi les traceurs soumis à consentement', () => {
    render(<MentionsLegales />)

    const posthog = COOKIES.find((cookie) => cookie.origin.includes('PostHog'))
    expect(posthog).toBeDefined()
    expect(posthog?.requiresConsent).toBe(true)
    expect(screen.getAllByText(/PostHog/).length).toBeGreaterThan(0)
  })

  it('mentionne les outils sans traceur sans les mélanger aux cookies', () => {
    render(<MentionsLegales />)

    for (const tool of NON_TRACKING_TOOLS) {
      expect(screen.getByText(new RegExp(tool.name))).toBeInTheDocument()
    }
    expect(
      COOKIES.some((cookie) => cookie.origin.includes('Search Console'))
    ).toBe(false)
  })

  it('affiche le vrai badge 3CX Silver Partner, pas un placeholder', () => {
    render(<MentionsLegales />)

    const badge = screen.getByAltText(/3CX Silver Partner/i)
    expect(badge).toBeInTheDocument()
    expect(badge.getAttribute('src')).toContain('3cx-Silver-Partner-badge')
  })
})

import { render, screen, within } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer', () => {
beforeEach(() => {
    render(<Footer />)
  })

  it("affiche l'accroche de marque", () => {
    expect(
      screen.getByText(/Solutions de téléphonie IP et communications d'entreprise/)
    ).toBeInTheDocument()
  })

  it('présente les coordonnées de contact principales', () => {
    expect(screen.getByText('contact@e2i-voip.com')).toBeInTheDocument()
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
  })

  it('énumère les numéros de téléphone DOM et France', () => {
    const phoneSection = screen.getByText('Nous contacter').closest('div')
    const { getByText } = within(phoneSection as HTMLElement)

    expect(getByText('Guyane :')).toBeInTheDocument()
    expect(getByText('+594 594 963 500')).toBeInTheDocument()

    expect(getByText('Guadeloupe :')).toBeInTheDocument()
    expect(getByText('+590 590 173 500')).toBeInTheDocument()

    expect(getByText('Martinique :')).toBeInTheDocument()
    expect(getByText('+596 596 313 500')).toBeInTheDocument()

    expect(getByText('France :')).toBeInTheDocument()
    expect(getByText('+33 1 XX XX XX XX')).toBeInTheDocument()
  })

  it('rend le badge partenaire 3CX et les liens certifiés', () => {
    expect(
      screen.getByAltText('3CX Bronze Partner Badge')
    ).toBeInTheDocument()

    const partnerBar = screen.getByText('Partenaires certifiés :').closest('div')
    const { getByRole } = within(partnerBar as HTMLElement)

    expect(getByRole('link', { name: '3CX' })).toHaveAttribute('href', 'https://www.3cx.fr')
    expect(getByRole('link', { name: 'Yeastar' })).toHaveAttribute('href', 'https://www.yeastar.com')
    expect(getByRole('link', { name: 'Grandstream' })).toHaveAttribute('href', 'https://www.grandstream.com')
  })

  it('propose les sections de navigation clé', () => {
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Informations')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Trunk SIP au compteur' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('affiche le copyright annuel', () => {
    expect(screen.getByText(/© 2024 E2I VoIP/)).toBeInTheDocument()
  })
})

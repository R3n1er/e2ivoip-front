import { render, screen, within } from '@testing-library/react'
import { Footer } from '@/components/layout/footer'

describe('Footer', () => {
beforeEach(() => {
    render(<Footer />)
  })

  it("affiche l'accroche de marque", () => {
    expect(
      screen.getByText(/Solutions de telephonie IP et communications d.entreprise/)
    ).toBeInTheDocument()
  })

  it('présente les coordonnées de contact principales', () => {
    expect(screen.getByText('contact@e2i-voip.com')).toBeInTheDocument()
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
  })

  it('énumère les numéros de téléphone DOM (France exclue du footer)', () => {
    const phoneSection = screen.getByText('Nous contacter').closest('div')
    const { getByText } = within(phoneSection as HTMLElement)

    expect(getByText('Guyane :')).toBeInTheDocument()
    expect(getByText('05 94 96 35 00')).toBeInTheDocument()

    expect(getByText('Guadeloupe :')).toBeInTheDocument()
    expect(getByText('05 90 17 35 00')).toBeInTheDocument()

    expect(getByText('Martinique :')).toBeInTheDocument()
    expect(getByText('05 96 31 35 00')).toBeInTheDocument()

    expect(getByText('La Reunion :')).toBeInTheDocument()
    expect(getByText('02 63 08 55 00')).toBeInTheDocument()
  })

  it('rend le badge partenaire 3CX et les liens certifiés', () => {
    expect(
      screen.getByAltText('3CX Bronze Partner Badge')
    ).toBeInTheDocument()

    const partnerBar = screen.getByText('Partenaires certifies :').closest('div')
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

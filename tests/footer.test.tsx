import { render, screen, within } from '@testing-library/react'
import { Footer } from '@/components/layout/footer'

describe('Footer', () => {
beforeEach(() => {
    render(<Footer />)
  })

  it("affiche l'accroche de marque", () => {
    expect(
      screen.getByText(/Opérateur de service de télécommunication pour les entreprises/)
    ).toBeInTheDocument()
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

  it('rend les logos partenaires certifiés', () => {
    const partnerBar = screen.getByText('Partenaires certifiés :').closest('div')
    const { getByRole } = within(partnerBar as HTMLElement)

    expect(getByRole('link', { name: '3CX Silver Partner' })).toHaveAttribute('href', 'https://www.3cx.fr')
    expect(getByRole('link', { name: 'Yeastar Certified Expert' })).toHaveAttribute('href', 'https://www.yeastar.com')
    expect(getByRole('link', { name: 'Grandstream' })).toHaveAttribute('href', 'https://www.grandstream.com')
    expect(getByRole('link', { name: 'Aircall Partner' })).toHaveAttribute('href', 'https://aircall.io/fr/')
  })

  it('propose les sections de navigation clé', () => {
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Informations')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Trunk SIP au compteur' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('affiche le copyright de l\'année courante', () => {
    // L'année est calculée dynamiquement : le test vérifie la propriété
    // (l'année en cours s'affiche) plutôt qu'une valeur figée qui périme
    // chaque 1er janvier.
    const anneeCourante = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`© ${anneeCourante} E2I VoIP`)),
    ).toBeInTheDocument()
  })
})

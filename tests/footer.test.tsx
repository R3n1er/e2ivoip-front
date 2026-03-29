import { render, screen, within } from '@testing-library/react'
import { Footer } from '@/components/layout/footer'

describe('Footer', () => {
beforeEach(() => {
    render(<Footer />)
  })

  it("affiche l'accroche de marque", () => {
    expect(
      screen.getByText(/Solutions de téléphonie IP et communications d'entreprise depuis plus de 15 ans. Spécialiste des DOM./)
    ).toBeInTheDocument()
  })

  it('présente les coordonnées de contact principales', () => {
    expect(screen.getByText('contact@e2i-voip.com')).toBeInTheDocument()
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
    expect(screen.getByText('+33 1 89 56 05 00')).toBeInTheDocument()
  })

  it('affiche les liens partenaires dans le sub-footer', () => {
    const partnerBar = screen.getByText('PARTENAIRES :').closest('div')
    const { getByRole } = within(partnerBar as HTMLElement)

    expect(getByRole('link', { name: '3CX' })).toHaveAttribute('href', 'https://www.3cx.fr')
    expect(getByRole('link', { name: 'YEASTAR' })).toHaveAttribute('href', 'https://www.yeastar.com')
    expect(getByRole('link', { name: 'GRANDSTREAM' })).toHaveAttribute('href', 'https://www.grandstream.com')
  })

  it('propose les sections de navigation clé et la newsletter', () => {
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Liens utiles')).toBeInTheDocument()
    expect(screen.getByText('NEWSLETTER')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Trunk SIP au compteur' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "S'inscrire" })).toBeInTheDocument()
  })

  it('affiche le copyright avec l\'année courante', () => {
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(`© ${currentYear} E2I VoIP. TOUS DROITS RÉSERVÉS.`))).toBeInTheDocument()
  })
})

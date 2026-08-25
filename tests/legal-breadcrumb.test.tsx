import { render, screen } from '@testing-library/react'
import { Breadcrumb, LegalBreadcrumb } from '@/components/legal/breadcrumb'

describe("Fil d'Ariane (Breadcrumb)", () => {
  it('rend les liens intermédiaires et le courant en aria-current', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mentions légales' },
        ]}
      />
    )

    const nav = screen.getByRole('navigation', { name: /fil d'ariane/i })
    expect(nav).toBeInTheDocument()

    const home = screen.getByRole('link', { name: 'Accueil' })
    expect(home).toHaveAttribute('href', '/')

    expect(screen.getByText('Mentions légales')).toHaveAttribute(
      'aria-current',
      'page'
    )
    // La page courante ne doit jamais être un lien (auto-référence)
    expect(
      screen.queryByRole('link', { name: 'Mentions légales' })
    ).not.toBeInTheDocument()
  })

  it('embarque le JSON-LD schema.org BreadcrumbList', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'CGV' },
        ]}
      />
    )
    const ld = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')!.textContent!
    )
    expect(ld['@type']).toBe('BreadcrumbList')
    expect(ld.itemListElement[0]).toMatchObject({
      position: 1,
      name: 'Accueil',
      item: 'https://www.e2i-voip.com/',
    })
    expect(ld.itemListElement[1]).toMatchObject({ position: 2, name: 'CGV' })
    // Le dernier item n'a pas de propriété item (page courante)
    expect(ld.itemListElement[1].item).toBeUndefined()
  })
})

describe('LegalBreadcrumb', () => {
  it('sur une page juridique : Accueil › [page courante]', () => {
    render(<LegalBreadcrumb current="Politique de confidentialité" />)
    expect(
      screen.queryByRole('link', { name: 'Politique de confidentialité' })
    ).not.toBeInTheDocument()
    expect(screen.getByText('Politique de confidentialité')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('ne contient pas de niveau "Espace juridique" (hub supprimé)', () => {
    render(<LegalBreadcrumb current="CGV" />)
    expect(
      screen.queryByText('Espace juridique')
    ).not.toBeInTheDocument()
  })
})
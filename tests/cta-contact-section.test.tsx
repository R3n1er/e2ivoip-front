import fs from 'fs'
import path from 'path'
import { render, screen } from '@testing-library/react'
import { CTAContactSection } from '@/components/cta-contact-section'

const ROOT = path.resolve(__dirname, '..')

/**
 * Suppression du calendrier Microsoft Bookings (décision Alban, 2026-11-07).
 * Le composant iframe est retiré des 3 pages produit ; un bloc d'appel à
 * l'action vers /contact le remplace, en conservant les ancres #rendez-vous
 * et #calendrier pour ne casser aucun lien existant.
 */
describe('Suppression du calendrier Microsoft Bookings', () => {
  it("le composant bookings-calendar n'existe plus", () => {
    expect(fs.existsSync(path.join(ROOT, 'components/bookings-calendar.tsx'))).toBe(false)
  })

  it('les constantes Bookings sont retirées', () => {
    expect(fs.existsSync(path.join(ROOT, 'lib/constants/bookings.ts'))).toBe(false)
  })

  it("aucun fichier source n'importe plus Bookings", () => {
    const hits: string[] = []
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          walk(full)
        } else if (/\.(ts|tsx)$/.test(entry.name)) {
          const content = fs.readFileSync(full, 'utf8')
          if (
            content.includes('bookings-calendar') ||
            content.includes('BOOKINGS_COMMERCIAL') ||
            content.includes('constants/bookings')
          ) {
            hits.push(path.relative(ROOT, full))
          }
        }
      }
    }
    for (const dir of ['app', 'components', 'lib']) walk(path.join(ROOT, dir))
    expect(hits).toEqual([])
  })

  it('les pages produit ne montent plus le calendrier Bookings', () => {
    const pages = [
      'app/3cx-pro/page.tsx',
      'app/3cx-free/page.tsx',
      'app/telephonie-entreprise/3cx-smb-solo/page.tsx',
    ]
    for (const page of pages) {
      const content = fs.readFileSync(path.join(ROOT, page), 'utf8')
      expect(content).not.toContain('BookingsCalendar')
      expect(content).not.toContain('bookings.cloud.microsoft')
    }
  })

  it('les ancres #rendez-vous et #calendrier sont conservées', () => {
    const free = fs.readFileSync(path.join(ROOT, 'app/3cx-free/page.tsx'), 'utf8')
    expect(free).toContain('id="rendez-vous"')
    const smb = fs.readFileSync(
      path.join(ROOT, 'app/telephonie-entreprise/3cx-smb-solo/page.tsx'),
      'utf8'
    )
    expect(smb).toContain('id="rendez-vous"')
    const pro = fs.readFileSync(path.join(ROOT, 'app/3cx-pro/page.tsx'), 'utf8')
    expect(pro).toContain('id="calendrier"')
  })
})

describe('CTAContactSection', () => {
  it('propose un lien vers la page contact', () => {
    render(<CTAContactSection />)
    const links = screen.getAllByRole('link')
    const contactLink = links.find((l) => l.getAttribute('href') === '/contact')
    expect(contactLink).toBeDefined()
  })

  it("n'affiche plus aucune iframe", () => {
    const { container } = render(<CTAContactSection />)
    expect(container.querySelector('iframe')).toBeNull()
  })
})

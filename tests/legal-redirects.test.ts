import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { LEGAL_PAGES } from '@/lib/legal/documents'

/**
 * Garde-fou anti-régression : les anciennes URLs racine des pages légales
 * doivent partir en 301 vers /juridique/<slug> (migration SEO, cf ADR).
 */
describe('Redirections 301 de l’espace juridique', () => {
  const config = readFileSync(
    path.join(process.cwd(), 'next.config.js'),
    'utf-8'
  )

  it('next.config.js contient une entrée 301 par ancienne URL légale', () => {
    const legacy = [
      '/mentions-legales',
      '/politique-confidentialite',
      '/politique-confidentialites',
      '/exercer-mes-droits',
      '/conditions-generales-de-vente',
      '/accord-sous-traitance-rgpd',
    ]
    for (const source of legacy) {
      expect(config).toContain(`["${source}", "/juridique/`)
    }
  })

  it('les anciens chemins ne correspondent plus à des routes physiques', () => {
    const removed = [
      'app/mentions-legales',
      'app/politique-confidentialite',
      'app/exercer-mes-droits',
      'app/conditions-generales-de-vente',
      'app/accord-sous-traitance-rgpd',
    ]
    for (const dir of removed) {
      expect(existsSync(path.join(process.cwd(), dir))).toBe(false)
    }
  })

  it('chaque slug du registre a sa contrepartie physique sous app/juridique/', () => {
    for (const doc of LEGAL_PAGES) {
      expect(
        existsSync(
          path.join(process.cwd(), 'app', 'juridique', doc.slug, 'page.tsx')
        )
      ).toBe(true)
    }
  })
})

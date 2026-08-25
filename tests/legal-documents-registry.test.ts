import { LEGAL_PAGES, LEGAL_PDFS, legalHref } from '@/lib/legal/documents'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

describe('Registre des documents juridiques', () => {
  it('expose exactement les 5 pages de l’espace juridique', () => {
    expect(LEGAL_PAGES).toHaveLength(5)
    expect(LEGAL_PAGES.map((d) => d.slug)).toEqual([
      'conditions-generales-de-vente',
      'accord-sous-traitance-rgpd',
      'politique-confidentialite',
      'exercer-mes-droits',
      'mentions-legales',
    ])
  })

  it('construit des hrefs sous /juridique/', () => {
    for (const doc of LEGAL_PAGES) {
      expect(legalHref(doc.slug)).toBe(`/juridique/${doc.slug}`)
    }
  })

  it('chaque page du registre existe physiquement dans app/juridique/', () => {
    for (const doc of LEGAL_PAGES) {
      const pagePath = path.join(
        process.cwd(),
        'app',
        'juridique',
        doc.slug,
        'page.tsx'
      )
      expect(existsSync(pagePath)).toBe(true)
    }
  })

  it('les PDFs du registre existent dans public/documents/ avec version cohérente', () => {
    const manifest = JSON.parse(
      readFileSync(
        path.join(process.cwd(), '..', '..', 'Cowork', 'e2ivoip', 'website-ready', 'manifest.json'),
        'utf-8'
      )
    ) as { documents: Array<{ filename: string; pages: number }> }

    for (const pdf of LEGAL_PDFS) {
      const filePath = path.join(process.cwd(), 'public', 'documents', pdf.slug)
      expect(existsSync(filePath)).toBe(true)

      const mirror = manifest.documents.find((d) => d.filename === pdf.slug)
      expect(mirror).toBeDefined()
      expect(pdf.pages).toBe(mirror!.pages)
    }
  })

  it('les hrefs PDF ne pointent jamais vers /docs/ (ancienne convention manifest)', () => {
    for (const pdf of LEGAL_PDFS) {
      expect(pdf.href).toMatch(/^\/documents\//)
      expect(pdf.href.endsWith(pdf.slug)).toBe(true)
    }
  })
})

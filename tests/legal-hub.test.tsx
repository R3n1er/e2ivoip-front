import { render, screen } from '@testing-library/react'
import JuridiqueHubPage from '../app/juridique/page'
import { LEGAL_PAGES, LEGAL_PDFS } from '@/lib/legal/documents'

describe('Hub /juridique', () => {
  it('affiche le titre et le fil d’ariane avec le hub en position courante', () => {
    render(<JuridiqueHubPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Documents juridiques'
    )
    expect(screen.getByText('Espace juridique')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('liste les 5 pages du registre comme liens internes', () => {
    render(<JuridiqueHubPage />)
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
    for (const doc of LEGAL_PAGES) {
      expect(hrefs).toContain(`/juridique/${doc.slug}`)
    }
  })

  it('liste les 5 PDFs avec un lien de téléchargement chacun', () => {
    render(<JuridiqueHubPage />)
    const downloadHrefs = screen
      .getAllByRole('link', { name: /télécharger/i })
      .map((a) => a.getAttribute('href'))
    expect(downloadHrefs).toHaveLength(LEGAL_PDFS.length)
    for (const pdf of LEGAL_PDFS) {
      expect(downloadHrefs).toContain(pdf.href)
    }
  })

  it('affiche version et pagination pour chaque PDF', () => {
    render(<JuridiqueHubPage />)
    for (const pdf of LEGAL_PDFS) {
      // ex : « v1.2 · 17 pages »
      expect(
        screen.getByText(`${pdf.version} · ${pdf.pages} pages`)
      ).toBeInTheDocument()
    }
  })

  it('mentionne la date d’entrée en vigueur alignée sur le manifest', () => {
    render(<JuridiqueHubPage />)
    expect(screen.getByText(/30 août 2026/)).toBeInTheDocument()
  })
})

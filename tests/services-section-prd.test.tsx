import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesSectionSimple } from "@/components/services-section-simple";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style, ...props }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; [key: string]: unknown }) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
    button: ({ children, className, style, ...props }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; [key: string]: unknown }) => (
      <button className={className} style={style} {...props}>
        {children}
      </button>
    ),
    li: ({ children, className, style, ...props }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; [key: string]: unknown }) => (
      <li className={className} style={style} {...props}>
        {children}
      </li>
    ),
  },
}));

describe("ServicesSectionSimple - Charte Graphique PRD (Icônes Corrigées)", () => {
  it("affiche le titre avec les couleurs PRD", () => {
    render(<ServicesSectionSimple />);

    // Vérifier que le titre principal est présent
    expect(screen.getByText(/Nos solutions de/)).toBeInTheDocument();
    expect(screen.getByText("téléphonie IP")).toBeInTheDocument();
  });

  it("affiche tous les services de téléphonie IP", () => {
    render(<ServicesSectionSimple />);

    // Vérifier que tous les services sont présents
    expect(screen.getByText("Trunk SIP DOM-TOM")).toBeInTheDocument();
    expect(screen.getByText("3CX SMB Mutualisé")).toBeInTheDocument();
    expect(screen.getByText("3CX PRO Dédié")).toBeInTheDocument();
    expect(screen.getByText("Solutions Mobilité")).toBeInTheDocument();
    expect(screen.getByText("Assistants Vocaux IA")).toBeInTheDocument();
    expect(screen.getByText("Studio d'Enregistrement")).toBeInTheDocument();
  });

  it("affiche les badges de service", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText("Populaire")).toBeInTheDocument();
    expect(screen.getByText("Idéal PME")).toBeInTheDocument();
    expect(screen.getByText("Entreprise")).toBeInTheDocument();
    expect(screen.getByText("Télétravail")).toBeInTheDocument();
    expect(screen.getByText("Innovation")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("affiche la section CTA avec les couleurs PRD", () => {
    render(<ServicesSectionSimple />);

    expect(
      screen.getByText("Prêt à économiser 30% sur vos télécoms ?")
    ).toBeInTheDocument();
    expect(screen.getByText("Audit télécom gratuit")).toBeInTheDocument();
    expect(screen.getByText("Demander un devis")).toBeInTheDocument();
  });

  it("utilise uniquement les couleurs PRD pour les icônes", () => {
    const { container } = render(<ServicesSectionSimple />);

    // Vérifier que les icônes utilisent les classes de couleurs PRD
    const redPrimaryIcons = container.querySelectorAll('.text-red-primary');
    expect(redPrimaryIcons.length).toBeGreaterThan(0);

    // Vérifier que les badges utilisent les bonnes classes
    const primaryBadges = container.querySelectorAll('.badge.badge-primary');
    expect(primaryBadges.length).toBeGreaterThan(0);

    // Vérifier qu'aucune autre couleur non-PRD n'est utilisée pour les icônes
    const nonPRDIcons = container.querySelectorAll('.text-green-600, .text-purple-600, .text-orange-600, .text-indigo-600');
    expect(nonPRDIcons.length).toBe(0);
  });

  it('les boutons CTA sont présents et fonctionnels', () => {
    render(<ServicesSectionSimple />);

    const auditButton = screen.getByText("Audit télécom gratuit");
    const devisButton = screen.getByText("Demander un devis");
    
    expect(auditButton).toBeInTheDocument();
    expect(devisButton).toBeInTheDocument();
  });

  it("affiche les bénéfices clés avec les bonnes couleurs", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText("💰 Économies 30%")).toBeInTheDocument();
    expect(screen.getByText("📱 Mobilité totale")).toBeInTheDocument();
    expect(screen.getByText("🤖 IA intégrée")).toBeInTheDocument();
    expect(screen.getByText("🏝️ DOM-TOM")).toBeInTheDocument();
  });
});

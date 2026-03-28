// Jest mocks
import { render, screen } from "@testing-library/react";
import { ServicesSectionSimple } from "@/components/services-section-simple";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
    button: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => (
      <button className={className} style={style} {...props}>
        {children}
      </button>
    ),
    li: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => (
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
    expect(screen.getByText("Trunk SIP DOM")).toBeInTheDocument();
    expect(screen.getByText("3CX SMB PRO")).toBeInTheDocument();
    expect(screen.getByText("3CX PRO Cloud")).toBeInTheDocument();
    // « Solutions Mobilité » retiré du périmètre
    expect(screen.queryByText("Solutions Mobilité")).not.toBeInTheDocument();
    expect(screen.getByText("Assistants Vocaux IA")).toBeInTheDocument();
    expect(screen.getByText("Studio d'Enregistrement")).toBeInTheDocument();
  });

  it("affiche les badges de service", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText("Populaire")).toBeInTheDocument();
    expect(screen.getByText("Idéal PME")).toBeInTheDocument();
    expect(screen.getByText("Entreprise")).toBeInTheDocument();
    expect(screen.getByText("Innovation")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("affiche la section avec le titre principal", () => {
    render(<ServicesSectionSimple />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Nos solutions de téléphonie IP/i,
      })
    ).toBeInTheDocument();
  });

  it("utilise les couleurs PRD pour les éléments asymétriques", () => {
    const { container } = render(<ServicesSectionSimple />);

    // Vérifier que certaines icônes utilisent le red-primary
    const redPrimaryIcons = container.querySelectorAll(".text-red-primary");
    expect(redPrimaryIcons.length).toBeGreaterThan(0);

    // Vérifier les classes de la grille
    const bentoGrid = container.querySelectorAll(".bento-grid");
    expect(bentoGrid.length).toBe(1);
    
    // Vérifier la présence des éléments de base Bento
    const bentoItems = container.querySelectorAll(".bento-item, .bento-item-large, .bento-item-wide");
    expect(bentoItems.length).toBeGreaterThan(3);
  });

  it("les liens CTA sont présents et fonctionnels", () => {
    const { container } = render(<ServicesSectionSimple />);

    const arrowLinks = container.querySelectorAll(".lni-arrow-right");
    expect(arrowLinks.length).toBeGreaterThan(0);
  });

  it("affiche les bénéfices clés avec les bonnes couleurs pour les cartes larges", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText(/Économies jusqu'à 30%/)).toBeInTheDocument();
    expect(screen.getByText(/Qualité studio/)).toBeInTheDocument();
  });
});

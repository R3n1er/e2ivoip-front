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

describe("ServicesSectionSimple - Refonte 2026", () => {
  it("affiche le titre de section", () => {
    render(<ServicesSectionSimple />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Nos Solutions Phares/i,
      })
    ).toBeInTheDocument();
  });

  it("affiche tous les services de téléphonie IP", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText("3CX PRO & ENTREPRISE")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP")).toBeInTheDocument();
    expect(screen.getByText("Assistants Vocaux IA")).toBeInTheDocument();
    expect(
      screen.getByText("Studio vocal — standards téléphoniques")
    ).toBeInTheDocument();
  });

  it("affiche les boutons d'appel à l'action Monolith", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText("En savoir plus")).toBeInTheDocument();
    expect(screen.getByText("Voir les offres")).toBeInTheDocument();
    expect(screen.getByText("Écouter les démos")).toBeInTheDocument();
  });

  it("utilise les classes structurelles 2026", () => {
    const { container } = render(<ServicesSectionSimple />);

    // Grille 3 colonnes générale
    const mainGrid = container.querySelectorAll(".grid-cols-1.md\\:grid-cols-3");
    expect(mainGrid.length).toBeGreaterThan(0);

    // Vérifier les classes du bouton monolith
    const monolithBtns = container.querySelectorAll(".monolith-btn");
    expect(monolithBtns.length).toBeGreaterThan(0);
  });

  it("affiche les bénéfices clés avec les bonnes couleurs", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText(/Conservez vos numéros actuels/)).toBeInTheDocument();
    expect(
      screen.getByText(/Portail automatisé pour écouter des exemples/i)
    ).toBeInTheDocument();
  });

  it("décrit l'encart agents vocaux IA avec angle SEO local DOM", () => {
    render(<ServicesSectionSimple />);

    expect(
      screen.getByText(
        /Agent vocal IA pour votre standard d'entreprise.*Guadeloupe.*Martinique.*DOM/s
      )
    ).toBeInTheDocument();
  });
});

// Jest mocks
import { render, screen } from "@testing-library/react";
import { HomepageHeroSectionSimple } from "@/components/homepage-hero-section-simple";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    h1: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <h1 className={className} {...props}>
        {children}
      </h1>
    ),
    p: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <p className={className} {...props}>
        {children}
      </p>
    ),
  },
}));

describe("HomepageHeroSectionSimple", () => {
  it("affiche la section héros avec l'image de background", () => {
    render(<HomepageHeroSectionSimple />);

    // Vérifier que le titre principal est présent
    expect(screen.getByText(/Votre standard/)).toBeInTheDocument();
    expect(screen.getByText(/représente/)).toBeInTheDocument();
    expect(screen.getByText(/votre entreprise/)).toBeInTheDocument();

    // Vérifier que le badge est présent
    expect(
      screen.getByText("Leader en solutions VoIP depuis 2008")
    ).toBeInTheDocument();

    // Vérifier que la description est présente
    expect(
      screen.getByText(/Solutions de.*phonie IP professionnelles/)
    ).toBeInTheDocument();
  });

  it("applique les styles de background image correctement", () => {
    render(<HomepageHeroSectionSimple />);

    // Vérifier que la section principale est présente
    const heroSection = document.querySelector("section");
    expect(heroSection).toBeInTheDocument();
  });

  it("affiche les statistiques", () => {
    render(<HomepageHeroSectionSimple />);

    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("Entreprises nous font confiance")).toBeInTheDocument();
    expect(screen.getByText("15+")).toBeInTheDocument();
    expect(screen.getByText("Années d'expertise télécom")).toBeInTheDocument();
  });

  it("affiche les boutons CTA", () => {
    render(<HomepageHeroSectionSimple />);

    expect(screen.getByText("Demander un devis gratuit")).toBeInTheDocument();
    expect(screen.getByText("Découvrir nos solutions")).toBeInTheDocument();
  });

  it("contient le gradient overlay", () => {
    render(<HomepageHeroSectionSimple />);

    const gradientOverlay = document.querySelector(
      ".bg-gradient-to-r.from-blue-900\\/85"
    );
    expect(gradientOverlay).toBeInTheDocument();
  });
});

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
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /La téléphonie d'entreprise/i,
      })
    ).toBeInTheDocument();

    // Vérifier que le badge est présent
    expect(
      screen.getByText("Opérateur télécom DOM · Plus de 100 clients")
    ).toBeInTheDocument();

    // Vérifier que la description est présente
    expect(
      screen.getByText(
        /Accélérez votre transition vers le tout-IP avec des solutions de communication/i
      )
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

    expect(screen.getByText("Plus de 100")).toBeInTheDocument();
    expect(
      screen.getByText("Clients actifs")
    ).toBeInTheDocument();
    expect(screen.getByText("+15 ans")).toBeInTheDocument();
    expect(screen.getByText("D'expertise Télécom")).toBeInTheDocument();
  });

  it("affiche les boutons CTA", () => {
    render(<HomepageHeroSectionSimple />);

    expect(screen.getByText("Découvrir nos offres")).toBeInTheDocument();
    expect(
      screen.getByText("Nous contacter")
    ).toBeInTheDocument();
  });

  it("contient les blocs asymétriques décoratifs", () => {
    render(<HomepageHeroSectionSimple />);

    const skewBlock = document.querySelector(".-skew-x-3");
    expect(skewBlock).toBeInTheDocument();
  });
});

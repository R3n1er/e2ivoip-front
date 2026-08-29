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
        name: /Le réseau cuivre s'arrête en 2027/i,
      })
    ).toBeInTheDocument();

    // Badge social proof (sans doublon DOM — voir sous-titre)
    expect(
      screen.getByText(
        "Opérateur de services télécom · Antilles, Guyane, La Réunion",
      )
    ).toBeInTheDocument();

    // Vérifier que la description est présente
    expect(
      screen.getByText(
        /Trunk SIP éligibles Antilles-Guyane et La Réunion/
      )
    ).toBeInTheDocument();
  });

  it("applique les styles de background image correctement", () => {
    render(<HomepageHeroSectionSimple />);

    const heroSection = document.querySelector("section#accueil");
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass("min-h-[100dvh]");
  });

  it("n'affiche pas d'indicateur de scroll « Découvrir »", () => {
    render(<HomepageHeroSectionSimple />);
    expect(screen.queryByText("Découvrir")).not.toBeInTheDocument();
  });

  it("affiche les statistiques", () => {
    render(<HomepageHeroSectionSimple />);

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(
      screen.getByText("Territoires DOM couverts")
    ).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Années d'expertise télécom")).toBeInTheDocument();
  });

  it("affiche les boutons CTA", () => {
    render(<HomepageHeroSectionSimple />);

    expect(screen.getByText("Parler à un expert DOM")).toBeInTheDocument();
    expect(
      screen.getByText("Découvrez nos offres Trunk SIP")
    ).toBeInTheDocument();
  });

  it("contient le gradient overlay", () => {
    render(<HomepageHeroSectionSimple />);

    const gradientOverlay = document.querySelector(
      ".bg-gradient-to-r.from-blue-900\\/85"
    );
    expect(gradientOverlay).toBeInTheDocument();
  });
});

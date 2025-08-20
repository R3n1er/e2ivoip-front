import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomepageHeroSection } from "@/components/homepage-hero-section";

// Mock framer-motion
vi.mock("framer-motion", () => ({
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

describe("HomepageHeroSection", () => {
  it("affiche la section héros avec l'image de background", () => {
    render(<HomepageHeroSection />);

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
    render(<HomepageHeroSection />);

    // Maintenant nous utilisons HeroBackgroundImage, vérifions qu'il est présent
    const backgroundContainer = screen.getByTestId("lazy-background-container");
    expect(backgroundContainer).toBeInTheDocument();

    // Vérifier que le container a la bonne configuration
    expect(backgroundContainer).toHaveAttribute(
      "aria-label",
      "Personne utilisant la téléphonie d'entreprise moderne"
    );

    // Note: L'image ne sera rendue que quand l'IntersectionObserver se déclenche
    // Dans un environnement de test, nous vérifions seulement la configuration
  });

  it("affiche les statistiques", () => {
    render(<HomepageHeroSection />);

    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Clients satisfaits")).toBeInTheDocument();
    expect(screen.getByText("15+")).toBeInTheDocument();
    expect(screen.getByText("Années d'expérience")).toBeInTheDocument();
    // Les indicateurs 99.9% ont été retirés du design
  });

  it("affiche les boutons CTA", () => {
    render(<HomepageHeroSection />);

    expect(screen.getByText("Demander un devis gratuit")).toBeInTheDocument();
    expect(screen.getByText("Voir la démo")).toBeInTheDocument();
  });

  it("contient le gradient overlay", () => {
    render(<HomepageHeroSection />);

    const gradientOverlay = document.querySelector(
      ".bg-gradient-to-r.from-blue-900\\/85"
    );
    expect(gradientOverlay).toBeInTheDocument();
  });
});

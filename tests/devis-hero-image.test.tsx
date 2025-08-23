// Jest mocks
import { render, screen, waitFor } from "@testing-library/react";
import { DevisHeroSection } from "@/components/devis-hero-section";

// Mock du composant d'animation
jest.mock("@/components/devis-animations", () => ({
  AnimatedHero: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="animated-hero">
      {children}
    </div>
  ),
}));

describe("DevisHeroSection", () => {
  it("affiche la section héros avec l'image de background", () => {
    render(<DevisHeroSection />);

    // Vérifier que le titre principal est présent
    expect(
      screen.getByText("Recevez un devis personnalisé")
    ).toBeInTheDocument();
    expect(screen.getByText("en moins de 24h")).toBeInTheDocument();

    // Vérifier que le badge est présent
    expect(screen.getByText("Devis Rapide et Gratuit")).toBeInTheDocument();

    // Vérifier que la description est présente
    expect(
      screen.getByText(/Que vous cherchiez à mettre en place/)
    ).toBeInTheDocument();
  });

  it("applique les styles de background image correctement", () => {
    render(<DevisHeroSection />);

    // Maintenant nous utilisons ContentBackgroundImage, vérifions qu'il est présent
    const backgroundContainer = screen.getByTestId("lazy-background-container");
    expect(backgroundContainer).toBeInTheDocument();

    // Vérifier que le container a la bonne configuration
    expect(backgroundContainer).toHaveAttribute(
      "aria-label",
      "Homme d'affaires utilisant son téléphone pour les communications professionnelles"
    );
    expect(backgroundContainer).toHaveClass("bg-gray-800"); // fallback color

    // Note: L'image ne sera rendue que quand l'IntersectionObserver se déclenche
    // Dans un environnement de test, nous vérifions seulement la configuration
  });

  it("a une hauteur minimale définie", () => {
    render(<DevisHeroSection />);

    const section = document.querySelector("section");
    expect(section).toHaveClass("min-h-[600px]");
  });

  it("contient le gradient overlay", () => {
    render(<DevisHeroSection />);

    const gradientOverlay = document.querySelector(
      ".bg-gradient-to-r.from-red-600\\/85"
    );
    expect(gradientOverlay).toBeInTheDocument();
  });
});

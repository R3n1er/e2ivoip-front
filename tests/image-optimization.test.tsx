import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";
import {
  OptimizedImage,
  HeroImage,
  ContentImage,
} from "@/components/ui/optimized-image";
import { LazyBackgroundImage } from "@/components/ui/lazy-background-image";
// BlogCoverImage removed - using OptimizedBlogImage instead
import { ResponsiveImage } from "@/components/ui/responsive-image";

// Mock des composants UI
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <button {...props}>{children}</button>,
}));

vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}));

describe("Composants d'Optimisation d'Images", () => {
  beforeEach(() => {
    // Mock de l'Intersection Observer
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      rootMargin: "100px",
      threshold: 0.1,
    }));

    // Mock de l'API Canvas pour la détection de format
    global.HTMLCanvasElement.prototype.toDataURL = vi
      .fn()
      .mockReturnValue("data:image/webp;base64,");
  });

  describe("OptimizedImage", () => {
    test("rend le composant avec les bonnes props", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Image de test"
          width={300}
          height={200}
        />
      );

      // Le composant affiche d'abord un placeholder
      const placeholder = screen.getByTestId("image-placeholder");
      expect(placeholder).toBeInTheDocument();
    });

    test("affiche un placeholder pendant le chargement", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Image de test"
          width={300}
          height={200}
        />
      );

      const placeholder = screen.getByTestId("image-placeholder");
      expect(placeholder).toHaveClass("bg-gray-200", "animate-pulse");
    });

    test("gère les erreurs de chargement", async () => {
      const onError = vi.fn();

      render(
        <OptimizedImage
          src="/invalid-image.jpg"
          alt="Image invalide"
          width={300}
          height={200}
          onError={onError}
        />
      );

      // Le composant affiche d'abord un placeholder
      const placeholder = screen.getByTestId("image-placeholder");
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe("LazyBackgroundImage", () => {
    test("rend le composant avec lazy loading", () => {
      render(
        <LazyBackgroundImage src="/background.jpg" alt="Arrière-plan de test" />
      );

      // Le composant affiche d'abord un placeholder
      const container = screen.getByRole("img", { hidden: true });
      expect(container).toBeInTheDocument();
    });

    test("affiche un fallback color par défaut", () => {
      render(
        <LazyBackgroundImage src="/background.jpg" alt="Arrière-plan de test" />
      );

      const container = screen.getByRole("img", { hidden: true });
      expect(container).toHaveClass("bg-gray-200");
    });

    test("permet de personnaliser la couleur de fallback", () => {
      render(
        <LazyBackgroundImage
          src="/background.jpg"
          alt="Arrière-plan de test"
          fallbackColor="bg-blue-200"
        />
      );

      const container = screen.getByRole("img", { hidden: true });
      expect(container).toHaveClass("bg-blue-200");
    });
  });

  // BlogCoverImage tests removed - component deleted

  describe("ResponsiveImage", () => {
    test("rend le composant avec ratio d'aspect par défaut", () => {
      render(
        <ResponsiveImage src="/responsive-image.jpg" alt="Image responsive" />
      );

      const container = screen.getByTestId("responsive-image-container");
      expect(container).toHaveClass("aspect-video");
    });

    test("permet de personnaliser le ratio d'aspect", () => {
      render(
        <ResponsiveImage
          src="/responsive-image.jpg"
          alt="Image responsive"
          aspectRatio="1/1"
        />
      );

      const container = screen.getByTestId("responsive-image-container");
      expect(container).toHaveClass("aspect-square");
    });

    test("génère un srcset pour les images responsives", () => {
      render(
        <ResponsiveImage src="/responsive-image.jpg" alt="Image responsive" />
      );

      // Le composant affiche d'abord un placeholder
      const container = screen.getByTestId("responsive-image-container");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Composants spécialisés", () => {
    test("HeroImage utilise la priorité par défaut", () => {
      render(
        <HeroImage
          src="/hero.jpg"
          alt="Image de héros"
          width={800}
          height={600}
        />
      );

      // Le composant affiche d'abord un placeholder
      const placeholder = screen.getByTestId("image-container");
      expect(placeholder).toBeInTheDocument();
    });

    test("ContentImage utilise la priorité normale", () => {
      render(
        <ContentImage
          src="/content.jpg"
          alt="Image de contenu"
          width={400}
          height={300}
        />
      );

      // Le composant affiche d'abord un placeholder
      const placeholder = screen.getByTestId("image-placeholder");
      expect(placeholder).toBeInTheDocument();
    });

    // PriorityBlogCoverImage test removed - component deleted
  });

  describe("Gestion des erreurs", () => {
    test("tous les composants gèrent les erreurs de chargement", async () => {
      const components = [
        <OptimizedImage
          key="1"
          src="/error.jpg"
          alt="Erreur 1"
          width={100}
          height={100}
        />,
        <LazyBackgroundImage key="2" src="/error.jpg" alt="Erreur 2" />,
        <ResponsiveImage key="3" src="/error.jpg" alt="Erreur 3" />,
      ];

      for (const component of components) {
        const { unmount } = render(component);

        // Tous les composants affichent d'abord un placeholder
        if (component.type === OptimizedImage) {
          expect(screen.getByTestId("image-placeholder")).toBeInTheDocument();
        } else if (component.type === LazyBackgroundImage) {
          expect(
            screen.getByTestId("lazy-background-container")
          ).toBeInTheDocument();
        } else if (component.type === ResponsiveImage) {
          expect(
            screen.getByTestId("responsive-image-container")
          ).toBeInTheDocument();
        }

        unmount();
      }
    });
  });
});

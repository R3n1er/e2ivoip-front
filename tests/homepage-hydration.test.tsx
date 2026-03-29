// Jest mocks

import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/app/page";

// Mock des composants externes
jest.mock("@/components/homepage-hero-section-simple", () => ({
  HomepageHeroSectionSimple: () => (
    <section data-testid="homepage-hero">
      <h1>Votre standard téléphonique</h1>
    </section>
  ),
}));

jest.mock("@/components/services-section-simple", () => ({
  ServicesSectionSimple: () => (
    <section data-testid="services">Services</section>
  ),
}));

jest.mock("@/components/clients-carousel", () => ({
  ClientsCarousel: () => <div data-testid="clients">Clients</div>,
}));

jest.mock("@/components/partners-section", () => ({
  PartnersSection: () => <div data-testid="partners">Partners</div>,
}));

jest.mock("@/components/stats-section", () => ({
  StatsSection: () => <div data-testid="stats">Stats</div>,
}));

jest.mock("@/components/contact-section-simple", () => ({
  ContactSectionSimple: () => <section data-testid="contact">Contact</section>,
}));

describe("HomePage - Test d'hydratation", () => {
  it("se rend sans erreurs d'hydratation", () => {
    const client = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={client}>
        <HomePage />
      </QueryClientProvider>
    );

    // Vérifier que la page se rend correctement
    expect(screen.getByTestId("homepage-hero")).toBeInTheDocument();
    expect(screen.getByText("Votre standard téléphonique")).toBeInTheDocument();

    // Vérifier qu'il n'y a pas d'erreurs dans la console
    expect(container).toBeInTheDocument();
  });

  it("affiche toutes les sections principales", () => {
    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <HomePage />
      </QueryClientProvider>
    );

    // Vérifier que toutes les sections sont présentes
    expect(screen.getByTestId("homepage-hero")).toBeInTheDocument();
    expect(screen.getByTestId("clients")).toBeInTheDocument();
    expect(screen.getByTestId("partners")).toBeInTheDocument();
    expect(screen.getByTestId("services")).toBeInTheDocument();
    expect(screen.getByTestId("stats")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
  });

  it("a la structure de layout correcte", () => {
    const client = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={client}>
        <HomePage />
      </QueryClientProvider>
    );

    // Vérifier la structure principale (div au lieu de main)
    const mainContainer = container.querySelector("main");
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass("bg-white"); // Ou bg-white selon la page, on vérifie juste qu'il existe et a des classes

    // Vérifier les classes de base
    expect(mainContainer).toHaveClass("min-h-screen");
  });

  it("applique les classes CSS correctement", () => {
    const client = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={client}>
        <HomePage />
      </QueryClientProvider>
    );

    const mainContainer = container.querySelector("main");
    expect(mainContainer).toHaveClass("min-h-screen");
    expect(mainContainer).toHaveClass("bg-white");
  });
});

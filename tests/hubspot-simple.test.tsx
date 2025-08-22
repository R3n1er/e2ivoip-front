import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HubSpotSimple } from "../components/hubspot-simple";

// Mock de window.hbspt
const mockHbspt = {
  forms: {
    create: vi.fn(),
  },
};

describe("HubSpotSimple", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock de window.hbspt
    Object.defineProperty(window, "hbspt", {
      value: mockHbspt,
      writable: true,
    });
  });

  it("affiche le message de chargement initial", () => {
    render(<HubSpotSimple />);
    
    expect(screen.getByText("Chargement du formulaire...")).toBeInTheDocument();
  });

  it("a le bon ID de conteneur", () => {
    render(<HubSpotSimple />);
    
    // Utiliser querySelector pour trouver l'élément avec l'ID
    const container = document.getElementById("hubspot-form-simple");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("id", "hubspot-form-simple");
  });

  it("a la bonne structure de base", () => {
    render(<HubSpotSimple />);
    
    // Vérifier que le composant a la bonne structure
    const container = document.getElementById("hubspot-form-simple");
    expect(container).toBeInTheDocument();
    
    // Vérifier que le message de chargement est centré
    const loadingMessage = screen.getByText("Chargement du formulaire...");
    expect(loadingMessage).toHaveClass("text-center", "text-gray-500", "py-4");
  });

  it("utilise les bonnes classes CSS", () => {
    render(<HubSpotSimple />);
    
    // Vérifier les classes CSS du conteneur
    const container = screen.getByText("Chargement du formulaire...").closest("div");
    expect(container).toHaveClass("text-center", "text-gray-500", "py-4");
  });
});


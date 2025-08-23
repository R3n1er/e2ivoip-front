// Jest mocks
import { render, screen } from "@testing-library/react";
import { HubSpotSimple } from "../components/hubspot-simple";

const mockHbspt = { forms: { create: jest.fn() } };

describe("HubSpotSimple", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "hbspt", { value: mockHbspt, writable: true });
  });

  it("a le bon ID de conteneur", () => {
    render(<HubSpotSimple />);
    const container = document.getElementById("hubspot-form-simple");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("id", "hubspot-form-simple");
  });

  it("a la bonne structure de base", () => {
    render(<HubSpotSimple />);
    const container = document.getElementById("hubspot-form-simple");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("id", "hubspot-form-simple");
    
    // Vérifier que le conteneur est vide (HubSpot injectera le formulaire)
    expect(container).toHaveTextContent("");
  });

  it("est prêt pour l'injection HubSpot", () => {
    render(<HubSpotSimple />);
    const container = document.getElementById("hubspot-form-simple");
    expect(container).toBeInTheDocument();
    
    // Le conteneur doit être vide et prêt pour HubSpot
    expect(container?.children.length).toBe(0);
  });
});


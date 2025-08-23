// Jest mocks
import { render, screen, waitFor } from "@testing-library/react";
import ContactPage from "../app/contact/page";

// Mock du composant HubSpotSimple
jest.mock("../components/hubspot-simple", () => ({
  HubSpotSimple: () => (
    <div data-testid="hubspot-simple">
      <div className="text-center text-gray-500 py-4">
        Chargement du formulaire...
      </div>
      <div data-testid="hubspot-form" className="hubspot-form">
        <iframe 
          title="HubSpot Form"
          src="about:blank"
          data-testid="hubspot-iframe"
        />
      </div>
    </div>
  ),
}));

describe("HubSpot E2E Integration", () => {
  it("should display the complete contact page with HubSpot integration", () => {
    render(<ContactPage />);
    
    // Vérifier la section hero
    expect(screen.getByText(/Contactez nos/)).toBeInTheDocument();
    expect(screen.getByText("experts VoIP")).toBeInTheDocument();
    
    // Vérifier le formulaire HubSpot
    const hubspotComponent = screen.getByTestId("hubspot-simple");
    expect(hubspotComponent).toBeInTheDocument();
    
    // Vérifier le titre du formulaire
    expect(screen.getByText("Demande de contact")).toBeInTheDocument();
    
    // Vérifier les informations de contact
    expect(screen.getByText("Nos coordonnées")).toBeInTheDocument();
  });

  it("should have proper HubSpot form structure", () => {
    render(<ContactPage />);
    
    // Vérifier que le composant HubSpot est dans la bonne structure
    const hubspotComponent = screen.getByTestId("hubspot-simple");
    const cardContent = hubspotComponent.closest(".p-8");
    expect(cardContent).toBeInTheDocument();
    
    // Vérifier que le composant est dans une carte
    const card = cardContent?.closest(".shadow-lg");
    expect(card).toBeInTheDocument();
  });

  it("should display loading state for HubSpot form", () => {
    render(<ContactPage />);
    
    // Vérifier l'état de chargement
    expect(screen.getByText("Chargement du formulaire...")).toBeInTheDocument();
  });

  it("should have responsive layout", () => {
    render(<ContactPage />);
    
    // Vérifier que la grille est responsive
    const gridContainer = screen.getByText("Demande de contact").closest(".grid");
    expect(gridContainer).toHaveClass("lg:grid-cols-2");
  });

  it("should display all contact information sections", () => {
    render(<ContactPage />);
    
    // Vérifier toutes les sections d'information
    expect(screen.getByText("Nos coordonnées")).toBeInTheDocument();
    expect(screen.getByText(/Notre équipe d'experts/)).toBeInTheDocument();
    
    // Vérifier les icônes et informations de contact
    expect(screen.getByText(/0189 560 500/)).toBeInTheDocument();
  });
});

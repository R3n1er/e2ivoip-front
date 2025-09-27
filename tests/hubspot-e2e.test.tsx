// Jest mocks
import { render, screen, waitFor } from "@testing-library/react";
import ContactPage from "../app/contact/page";

// Mock du composant HubspotFormInline (évite de charger le script HubSpot réel)
jest.mock("@/components/hubspot-form-inline", () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div className={className} data-testid="hubspot-form-inline">
      <div className="flex items-center justify-center min-h-[200px]">
        <p>Chargement du formulaire...</p>
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
    const hubspotComponent = screen.getByTestId("hubspot-form-inline");
    expect(hubspotComponent).toBeInTheDocument();
    
    // Vérifier le titre du formulaire
    expect(screen.getByText("Demande de contact")).toBeInTheDocument();
    
    // Vérifier les informations de contact
    expect(screen.getByText("Nos coordonnées")).toBeInTheDocument();
  });

  it("should have proper HubSpot form structure", () => {
    render(<ContactPage />);

    // Vérifier que le composant HubSpot est dans la bonne structure
    const hubspotComponent = screen.getByTestId("hubspot-form-inline");
    const cardBody = screen.getByTestId("contact-form-body");
    const card = screen.getByTestId("contact-form-card");

    expect(cardBody).toContainElement(hubspotComponent);
    expect(card).toContainElement(cardBody);
  });

  it("should display loading state for HubSpot form", () => {
    render(<ContactPage />);
    
    // Vérifier l'état de chargement
    expect(screen.getAllByText("Chargement du formulaire...")[0]).toBeInTheDocument();
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

// Jest mocks
import { render, screen } from "@testing-library/react";
import ContactPage from "../app/contact/page";

// Mock du hook useHubSpotFormsScript
jest.mock("@/lib/hooks/hubspot/use-hubspot-script", () => ({
  useHubSpotFormsScript: () => ({
    loaded: true,
    loading: false,
    error: null,
  }),
}));

// Mock du nouveau composant InlineContactForm
jest.mock("@/components/hubspot", () => ({
  InlineContactForm: ({ className }: { className?: string }) => (
    <div className={className} data-testid="inline-contact-form">
      <div data-testid="hubspot-form-container" />
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
    const hubspotComponent = screen.getByTestId("inline-contact-form");
    expect(hubspotComponent).toBeInTheDocument();
    
    // Vérifier le titre du formulaire
    expect(screen.getByText("Demande de contact")).toBeInTheDocument();
    
    // Vérifier les informations de contact
    expect(screen.getByText("Nos coordonnées")).toBeInTheDocument();
  });

  it("should have proper HubSpot form structure", () => {
    render(<ContactPage />);

    // Vérifier que le composant HubSpot est dans la bonne structure
    const hubspotComponent = screen.getByTestId("inline-contact-form");
    const cardBody = screen.getByTestId("contact-form-body");
    const card = screen.getByTestId("contact-form-card");

    expect(cardBody).toContainElement(hubspotComponent);
    expect(card).toContainElement(cardBody);
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

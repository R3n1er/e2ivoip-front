// Jest mocks
import { render, screen } from "@testing-library/react";
import ContactPage from "../app/contact/page";

// Mock du composant HubSpotSimple
jest.mock("../components/hubspot-simple", () => ({
  HubSpotSimple: () => (
    <div data-testid="hubspot-simple">
      <div className="text-center text-gray-500 py-4">
        Chargement du formulaire...
      </div>
    </div>
  ),
}));

describe("ContactPage HubSpot Integration", () => {
  it("should display the HubSpot form container", () => {
    render(<ContactPage />);
    
    // Vérifier que le composant HubSpot est présent
    const hubspotComponent = screen.getByTestId("hubspot-simple");
    expect(hubspotComponent).toBeInTheDocument();
  });

  it("should have the correct HubSpot form container", () => {
    render(<ContactPage />);
    
    // Vérifier que le composant HubSpot est dans la bonne section
    const hubspotComponent = screen.getByTestId("hubspot-simple");
    const cardContent = hubspotComponent.closest(".p-8");
    expect(cardContent).toBeInTheDocument();
  });

  it("should display the contact form title", () => {
    render(<ContactPage />);
    
    expect(screen.getByText("Demande de contact")).toBeInTheDocument();
    expect(screen.getByText(/Remplissez ce formulaire/)).toBeInTheDocument();
  });

  it("should display contact information", () => {
    render(<ContactPage />);
    
    expect(screen.getByText("Nos coordonnées")).toBeInTheDocument();
    expect(screen.getByText(/Notre équipe d'experts/)).toBeInTheDocument();
  });

  it("should display the hero section", () => {
    render(<ContactPage />);
    
    expect(screen.getByText(/Contactez nos/)).toBeInTheDocument();
    expect(screen.getByText("experts VoIP")).toBeInTheDocument();
    expect(screen.getByText(/Prêt à moderniser/)).toBeInTheDocument();
  });
});

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

const mockCreate = jest.fn();

beforeEach(() => {
  mockCreate.mockClear();
  (window as any).hbspt = { forms: { create: mockCreate } };
});

describe("ContactPage HubSpot Integration", () => {
  it("should display the HubSpot form container", () => {
    render(<ContactPage />);

    // Vérifier que le conteneur HubSpot est présent
    const hubspotContainer = screen.getByTestId('hubspot-form-container');
    expect(hubspotContainer).toBeInTheDocument();
  });

  it("should have the correct HubSpot form container", () => {
    render(<ContactPage />);
    
    // Vérifier que le conteneur HubSpot est dans la bonne section
    const formBody = screen.getByTestId("contact-form-body");
    expect(formBody).toBeInTheDocument();
    expect(formBody).toHaveClass("card-body", "p-8");
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

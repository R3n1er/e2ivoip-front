// Jest mocks
import { render, screen } from "@testing-library/react";
import ContactPage from "../app/contact/page";

const mockCreate = jest.fn();

beforeEach(() => {
  mockCreate.mockClear();
  (window as any).hbspt = { forms: { create: mockCreate } };
});

describe("ContactPage HubSpot Integration", () => {
  it("should display the HubSpot form container", () => {
    render(<ContactPage />);

    // Vérifier que le conteneur HubSpot est présent
    const hubspotContainer = document.getElementById('hubspot-form-container');
    expect(hubspotContainer).toBeInTheDocument();
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        portalId: "26878201",
        formId: "312a9f67-e613-4651-9690-4586646554a0",
        region: "eu1",
      })
    );
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

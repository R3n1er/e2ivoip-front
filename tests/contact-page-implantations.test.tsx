// Jest mocks
import { render, screen } from "@testing-library/react";
import ContactPage from "../app/contact/page";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region: string;
  className: string;
}

// Mock des composants externes
jest.mock("@/components/hubspot-contact-form-global", () => ({
  HubSpotContactFormGlobal: ({
    portalId,
    formId,
    region,
    className,
  }: HubSpotFormProps) => (
    <div
      data-testid="hubspot-form"
      data-portal-id={portalId}
      data-form-id={formId}
      data-region={region}
      className={className}
    >
      HubSpot Form Mock
    </div>
  ),
}));

jest.mock("@/components/secure-email", () => ({
  SecureEmail: ({ email }: { email: string }) => (
    <span data-testid="secure-email">{email}</span>
  ),
}));

describe("ContactPage - Section Nos Implantations", () => {
  it('affiche la section "Nos implantations" avec le titre correct', () => {
    render(<ContactPage />);
    const title = screen.getByRole("heading", { name: /Nos\s+implantations/i });
    expect(title).toBeInTheDocument();
  });

  it("affiche la description de la section", () => {
    render(<ContactPage />);

    const description = screen.getByText(/Équipes techniques locales en France Métropolitaine et DOM/);
    expect(description).toBeInTheDocument();
  });

  it("affiche les implantations avec leurs numéros de téléphone", () => {
    render(<ContactPage />);

    expect(screen.getByTestId("location-france")).toBeInTheDocument();
    expect(screen.getByTestId("location-guyane")).toBeInTheDocument();
    expect(screen.getByTestId("location-guadeloupe")).toBeInTheDocument();
    expect(screen.getByTestId("location-martinique")).toBeInTheDocument();
    expect(screen.getByTestId("location-reunion")).toBeInTheDocument();

    expect(screen.getByTestId("phone-france")).toHaveTextContent("01 89 56 05 00");
    expect(screen.getByTestId("phone-guyane")).toHaveTextContent("05 94 96 35 00");
    expect(screen.getByTestId("phone-guadeloupe")).toHaveTextContent("+590 590 173 500");
    expect(screen.getByTestId("phone-martinique")).toHaveTextContent("+596 596 313 500");
    expect(screen.getByTestId("phone-reunion")).toHaveTextContent("+262 263 085 500");
  });

  it("affiche les liens téléphoniques cliquables", () => {
    render(<ContactPage />);

    expect(screen.getByTestId("phone-guyane")).toHaveAttribute("href", "tel:+594594963500");
    expect(screen.getByTestId("phone-france")).toHaveAttribute("href", "tel:+33189560500");
  });

  it("applique le style dégradé correct à la section", () => {
    render(<ContactPage />);

    const section = document.querySelector(
      "section.bg-gradient-to-r.from-red-primary.to-blue-marine"
    );
    expect(section).toBeInTheDocument();
  });
});

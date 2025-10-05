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
jest.mock("@/components/hubspot/legacy/hubspot-contact-form-global", () => ({
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

describe("ContactPage - Section Nos Implantations (Style mis à jour)", () => {
  it('affiche la section "Nos implantations" avec le titre correct', () => {
    render(<ContactPage />);

    const title = screen.getByRole("heading", { name: /Nos\s+implantations/i });
    expect(title).toBeInTheDocument();
  });

  it("affiche les 4 implantations avec le style Card de qui-sommes-nous", () => {
    render(<ContactPage />);

    // Vérifier que les 4 implantations sont présentes
    expect(screen.getByText("Guyane")).toBeInTheDocument();
    expect(screen.getByText("Guadeloupe")).toBeInTheDocument();
    expect(screen.getByText("Martinique")).toBeInTheDocument();
    expect(screen.getByText("La Réunion")).toBeInTheDocument();
  });

  it("affiche les numéros de téléphone cliquables", () => {
    render(<ContactPage />);

    // Vérifier que les numéros sont des liens cliquables
    const guyanePhone = screen.getByText("+594 594 963 500");
    const guadeloupePhone = screen.getByText("+590 590 173 500");
    const martiniquePhone = screen.getByText("+596 596 313 500");
    const reunionPhone = screen.getByText("+262 263 085 500");

    expect(guyanePhone).toHaveAttribute("href", "tel:+594594963500");
    expect(guadeloupePhone).toHaveAttribute("href", "tel:+590590173500");
    expect(martiniquePhone).toHaveAttribute("href", "tel:+596596313500");
    expect(reunionPhone).toHaveAttribute("href", "tel:+262263085500");
  });

  it("utilise le gradient de fond correct (from-red-primary to-blue-marine)", () => {
    render(<ContactPage />);
    const title = screen.getByRole("heading", { name: /Nos\s+implantations/i });
    const section = title.closest("section");
    expect(section).toHaveClass("bg-gradient-to-r");
  });

  it("utilise le layout en grille responsive", () => {
    render(<ContactPage />);
    const title = screen.getByRole("heading", { name: /Nos\s+implantations/i });
    const section = title.closest("section");
    const grid = section?.querySelector("div.grid");
    expect(grid).toBeTruthy();
  });
});

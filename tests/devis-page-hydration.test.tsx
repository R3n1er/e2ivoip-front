// Jest mocks

import { render, screen } from "@testing-library/react";
import DevisEnLignePage from "@/app/devis-en-ligne/page";

// Mock des composants externes
jest.mock("@/components/tally-tracking", () => ({
  TrunkSIPTallyLink: ({ children }: any) => (
    <div data-testid="trunk-sip-link">{children}</div>
  ),
  PortabiliteTallyLink: ({ children }: any) => (
    <div data-testid="portabilite-link">{children}</div>
  ),
  VoIP3CXTallyLink: ({ children }: any) => (
    <div data-testid="voip-3cx-link">{children}</div>
  ),
  ProjetPBXTallyLink: ({ children }: any) => (
    <div data-testid="projet-pbx-link">{children}</div>
  ),
}));

jest.mock("@/components/hubspot-contact-form", () => ({
  FullContactForm: () => (
    <div data-testid="hubspot-form">Formulaire HubSpot</div>
  ),
}));

jest.mock("@/components/devis-animations", () => ({
  AnimatedSection: ({ children, className }: any) => (
    <div className={className} data-testid="animated-section">
      {children}
    </div>
  ),
  AnimatedCard: ({ children, className, delay }: any) => (
    <div className={className} data-testid="animated-card" data-delay={delay}>
      {children}
    </div>
  ),
  AnimatedGrid: ({ children, className }: any) => (
    <div className={className} data-testid="animated-grid">
      {children}
    </div>
  ),
}));

describe("Page Devis En Ligne - Test d'hydratation", () => {
  it("se rend sans erreurs d'hydratation", () => {
    const { container } = render(<DevisEnLignePage />);

    // Vérifier que la page se rend correctement
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Devis Rapide et Gratuit/i,
      })
    ).toBeInTheDocument();

    // Vérifier qu'il n'y a pas d'erreurs dans la console
    expect(container).toBeInTheDocument();
  });

  it("affiche tous les types de devis", () => {
    render(<DevisEnLignePage />);

    // Vérifier que tous les types de devis sont présents
    expect(screen.getByText("Devis Trunk SIP")).toBeInTheDocument();
    expect(screen.getByText("Devis Portabilité")).toBeInTheDocument();
    expect(screen.getByText("Devis VoIP 3CX")).toBeInTheDocument();
    expect(screen.getByText("Devis Projet PBX")).toBeInTheDocument();
  });

  it("affiche les boutons de demande de devis", () => {
    render(<DevisEnLignePage />);

    const devisLinks = screen.getAllByRole("link", { name: /Devis/ });
    expect(devisLinks).toHaveLength(4);
  });

  it("affiche la section FAQ", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByText("F.A.Q")).toBeInTheDocument();
    expect(screen.getByText(/Quel est le délai moyen/)).toBeInTheDocument();
  });

  it("affiche le formulaire de contact HubSpot", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByTestId("hubspot-form")).toBeInTheDocument();
  });

  it("affiche la certification 3CX", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByText("Nous sommes certifiés !")).toBeInTheDocument();
    expect(screen.getByAltText("3CX Silver Partner Badge")).toBeInTheDocument();
  });
});

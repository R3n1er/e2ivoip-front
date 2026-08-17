// Jest mocks

import { render, screen } from "@testing-library/react";
import DevisEnLignePage from "@/app/devis-en-ligne/page";

// Mock du hook useHubSpotFormsScript
jest.mock("@/lib/hooks/hubspot/use-hubspot-script", () => ({
  useHubSpotFormsScript: () => ({
    loaded: true,
    loading: false,
    error: null,
  }),
}));

// Mock du nouveau composant FullContactForm
jest.mock("@/components/hubspot", () => ({
  FullContactForm: () => (
    <div data-testid="full-contact-form">Formulaire HubSpot</div>
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

  it("pointe chaque devis vers une URL de destination réelle", () => {
    render(<DevisEnLignePage />);

    const devisLinks = screen.getAllByRole("link", { name: /Devis/ });

    devisLinks.forEach((link) => {
      const href = link.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
      // Garde-fou : des URLs de démonstration (« …-devis ») ont déjà été
      // livrées en 404. Une destination doit être un identifiant réel.
      expect(href).not.toMatch(/tally\.so\/r\/[a-z-]+-devis$/);
    });

    // Les quatre destinations doivent être distinctes.
    const hrefs = devisLinks.map((link) => link.getAttribute("href"));
    expect(new Set(hrefs).size).toBe(4);
  });

  it("affiche la section FAQ", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByText("F.A.Q")).toBeInTheDocument();
    expect(screen.getByText(/Quel est le délai moyen/)).toBeInTheDocument();
  });

  it("affiche le formulaire de contact HubSpot", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByTestId("full-contact-form")).toBeInTheDocument();
  });

  it("affiche la certification 3CX", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByText("Nous sommes certifiés !")).toBeInTheDocument();
    expect(screen.getByAltText("3CX Silver Partner Badge")).toBeInTheDocument();
  });
});

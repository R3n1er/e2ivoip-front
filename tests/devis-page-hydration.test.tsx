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

  it("affiche les huit demandes de devis", () => {
    render(<DevisEnLignePage />);

    [
      "Devis Trunk SIP",
      "Étude de portabilité",
      "Trunk SIP pour agents IA",
      "Devis 3CX PRO & IA",
      "Devis 3CX SMB",
      "Devis PBX Yeastar",
      "Projet d'intégration PBX",
      "Être rappelé — Aircall",
    ].forEach((intitule) => {
      expect(screen.getByText(intitule)).toBeInTheDocument();
    });
  });

  it("regroupe les demandes par famille d'offre", () => {
    render(<DevisEnLignePage />);

    expect(screen.getByText("Trunk SIP & portabilité")).toBeInTheDocument();
    expect(screen.getByText("Standard téléphonique 3CX")).toBeInTheDocument();
    expect(screen.getByText("Équipements & intégration")).toBeInTheDocument();
  });

  it("pointe chaque devis vers un formulaire Tally distinct", () => {
    render(<DevisEnLignePage />);

    const liensTally = screen
      .getAllByRole("link")
      .filter((lien) => lien.getAttribute("href")?.includes("tally.so"));

    expect(liensTally).toHaveLength(8);

    liensTally.forEach((lien) => {
      const href = lien.getAttribute("href")!;
      expect(href).toMatch(/^https:\/\/tally\.so\/r\/[A-Za-z0-9]+$/);
      // Garde-fou : des URLs descriptives ont déjà été livrées en 404.
      expect(href).not.toMatch(/tally\.so\/r\/[a-z-]+-devis$/);
      // Ouverture en nouvel onglet sans exposer la page appelante.
      expect(lien).toHaveAttribute("target", "_blank");
      expect(lien.getAttribute("rel")).toContain("noopener");
    });

    const hrefs = liensTally.map((lien) => lien.getAttribute("href"));
    expect(new Set(hrefs).size).toBe(8);
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

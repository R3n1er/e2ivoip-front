import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StudioDevisPage from "@/app/studio-attente/devis/page";
import { STUDIO_DEMOS } from "@/lib/studio-demos";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

// Mock fetch for submission
const mockFetch = jest.fn();
global.fetch = mockFetch;

function fillStep4() {
  const inputs = screen.getAllByRole("textbox");
  fireEvent.change(inputs.find((el) => el.id === "firstName")!, {
    target: { value: "Jean" },
  });
  fireEvent.change(inputs.find((el) => el.id === "lastName")!, {
    target: { value: "Dupont" },
  });
  fireEvent.change(screen.getByLabelText(/Email professionnel/i), {
    target: { value: "jean.dupont@test.fr" },
  });
}

describe("StudioDevisPage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("affiche la première étape avec les catégories", () => {
    render(<StudioDevisPage />);
    expect(screen.getByText(/Quel type de message souhaitez-vous ?/i)).toBeInTheDocument();
    expect(screen.getByText(/Pré-décroché/i)).toBeInTheDocument();
  });

  it("permet de choisir une catégorie et d’avancer", () => {
    render(<StudioDevisPage />);
    fireEvent.click(screen.getByRole("button", { name: /Choisir Attente/i }));
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));
    expect(screen.getByRole("heading", { name: /Choisissez un modèle/i })).toBeInTheDocument();
  });

  it("affiche les démos audio correspondant à la catégorie", () => {
    render(<StudioDevisPage />);
    fireEvent.click(screen.getByText(/Fermeture \/ répondeur/i));
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));
    const fermetureDemos = STUDIO_DEMOS.filter((d) => d.category === "fermeture");
    fermetureDemos.forEach((demo) => {
      expect(screen.getByText(demo.title)).toBeInTheDocument();
    });
  });

  it("valide les champs obligatoires à l’étape 4", () => {
    render(<StudioDevisPage />);
    fireEvent.click(screen.getByText(/Pré-décroché/i));
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));
    // Étape 2 : sélectionner un modèle
    fireEvent.click(screen.getByText(STUDIO_DEMOS[0].title));
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));
    // Étape 3
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));
    // Étape 4 : champs vides
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));
    expect(screen.getByText(/Le prénom est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/L’email est requis/i)).toBeInTheDocument();
  });

  it("soumet le formulaire et affiche le succès", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    render(<StudioDevisPage />);

    // Étape 1
    fireEvent.click(screen.getByText(/Pré-décroché/i));
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));

    // Étape 2 : choisir un modèle
    fireEvent.click(screen.getByText(STUDIO_DEMOS[0].title));
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));

    // Étape 3
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));

    // Étape 4
    fillStep4();
    fireEvent.click(screen.getByRole("button", { name: /Suivant/i }));

    // Étape 5 : envoyer
    fireEvent.click(screen.getByRole("button", { name: /Envoyer ma demande/i }));

    await waitFor(() => {
      expect(screen.getByText(/Demande envoyée/i)).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/studio/devis",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });
});

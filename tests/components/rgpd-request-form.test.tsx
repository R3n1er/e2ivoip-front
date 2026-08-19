/**
 * Formulaire d'exercice des droits RGPD.
 *
 * Le point sensible n'est pas l'esthétique mais la fiabilité du dépôt : une
 * demande soumise doit partir avec les droits réellement cochés, et le
 * visiteur doit obtenir une confirmation explicite — c'est sa seule preuve
 * immédiate d'avoir engagé la démarche.
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RgpdRequestForm } from "@/components/forms/rgpd-request-form";
import { RGPD_RIGHTS } from "@/lib/rgpd/rights";

function remplirIdentite() {
  fireEvent.change(screen.getByLabelText(/prénom/i), {
    target: { value: "Jean" },
  });
  fireEvent.change(screen.getByLabelText(/^nom/i), {
    target: { value: "Dupont" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "jean.dupont@example.fr" },
  });
}

describe("RgpdRequestForm", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }) as unknown as typeof fetch;
  });

  afterEach(() => jest.restoreAllMocks());

  it("propose les six droits du RGPD", () => {
    render(<RgpdRequestForm />);

    for (const right of RGPD_RIGHTS) {
      expect(screen.getByLabelText(new RegExp(right.label, "i"))).toBeInTheDocument();
    }
  });

  it("refuse la soumission si aucun droit n’est coché", async () => {
    render(<RgpdRequestForm />);
    remplirIdentite();

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(await screen.findByText(/au moins un droit/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("transmet les droits cochés à la route API", async () => {
    render(<RgpdRequestForm />);
    remplirIdentite();
    fireEvent.click(screen.getByLabelText(/Droit d’accès/i));
    fireEvent.click(screen.getByLabelText(/Droit à l’effacement/i));

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("/api/rgpd/demande");
    expect(init.headers).toMatchObject({
      "Content-Type": "application/json",
      "X-E2I-Form": "rgpd-rights",
    });
    expect(JSON.parse(init.body)).toMatchObject({
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.fr",
      requestTypes: ["acces", "effacement"],
      company: "",
    });
    expect(JSON.parse(init.body).formStartedAt).toEqual(expect.any(Number));
  });

  it("confirme le dépôt et rappelle le délai d’un mois", async () => {
    render(<RgpdRequestForm />);
    remplirIdentite();
    fireEvent.click(screen.getByLabelText(/Droit d’accès/i));

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(await screen.findByText(/un mois/i)).toBeInTheDocument();
  });

  it("affiche le message d’erreur renvoyé par le serveur", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Trop de demandes. Réessayez dans quelques minutes." }),
    }) as unknown as typeof fetch;

    render(<RgpdRequestForm />);
    remplirIdentite();
    fireEvent.click(screen.getByLabelText(/Droit d’accès/i));

    fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(await screen.findByText(/trop de demandes/i)).toBeInTheDocument();
  });
});

/**
 * Formulaire de devis 3CX SMB SOLO (composant client) et sa route.
 * Offre mono-utilisateur : le formulaire demande la formule et le sort du numéro.
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { DevisSmbSoloForm } from "@/components/forms/devis-smb-solo-form";
import { TEXTE_CONSENTEMENT_RGPD } from "@/lib/3cx-smb-solo/formulaire";

describe("DevisSmbSoloForm", () => {
  it.each([
    [/^Nom\s*\*/, true],
    [/^Prénom/, true],
    [/^Nom de votre activité/, false],
    [/^SIRET/, false],
    [/^Téléphone fixe/, false],
    [/^Téléphone mobile/, true],
    [/^E-mail/, true],
    [/^Votre besoin en quelques lignes/, true],
  ])("champ %s (obligatoire : %s)", (libelle, obligatoire) => {
    render(<DevisSmbSoloForm />);
    const champ = screen.getByLabelText(libelle);
    if (obligatoire) expect(champ).toBeRequired();
    else expect(champ).not.toBeRequired();
  });

  it("propose les trois choix de formule de l'offre", () => {
    render(<DevisSmbSoloForm />);
    expect(screen.getByLabelText(/Essential/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Advanced/)).toBeInTheDocument();
    expect(screen.getByLabelText(/conseillez-moi/)).toBeInTheDocument();
  });

  it("propose les quatre cas de numéro", () => {
    render(<DevisSmbSoloForm />);
    expect(screen.getByLabelText(/portabilité/)).toBeInTheDocument();
    expect(screen.getByLabelText(/nouveau numéro local/)).toBeInTheDocument();
    expect(screen.getByLabelText(/pas encore de numéro/)).toBeInTheDocument();
    expect(screen.getByLabelText("Je ne sais pas encore")).toBeInTheDocument();
  });

  it("affiche la case de consentement RGPD obligatoire avec le texte enregistré", () => {
    render(<DevisSmbSoloForm />);
    expect(screen.getByRole("checkbox", { name: TEXTE_CONSENTEMENT_RGPD })).toBeRequired();
  });

  it("contient un champ piège caché aux humains", () => {
    const { container } = render(<DevisSmbSoloForm />);
    const piege = container.querySelector('input[name="website"]');
    expect(piege).not.toBeNull();
    expect(piege).toHaveAttribute("tabindex", "-1");
  });

  it("envoie vers /api/3cx-smb-solo/devis avec l'en-tête du formulaire", async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    global.fetch = fetchMock as unknown as typeof fetch;
    render(<DevisSmbSoloForm />);
    const remplir = (l: RegExp, v: string) => fireEvent.change(screen.getByLabelText(l), { target: { value: v } });
    remplir(/^Nom\s*\*/, "Dupont");
    remplir(/^Prénom/, "Marie");
    remplir(/^Téléphone mobile/, "0690123456");
    remplir(/^E-mail/, "marie@example.fr");
    remplir(/^Votre besoin en quelques lignes/, "Je garde mon 0596.");
    fireEvent.click(screen.getByLabelText(/portabilité/));
    fireEvent.click(screen.getByLabelText(/Advanced/));
    fireEvent.click(screen.getByRole("checkbox", { name: TEXTE_CONSENTEMENT_RGPD }));
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/3cx-smb-solo/devis");
    expect(init.headers["X-E2I-Form"]).toBe("devis-3cx-smb-solo");
    const corps = JSON.parse(init.body);
    expect(corps).toMatchObject({
      formule: "advanced",
      besoinNumeros: "portabilite",
      consentementRgpd: true,
      website: "",
    });
  });
});

describe("BotID protège la route du devis 3CX SMB SOLO", () => {
  it("instrumentation-client.ts déclare /api/3cx-smb-solo/devis", () => {
    const t = fs.readFileSync(path.join(process.cwd(), "instrumentation-client.ts"), "utf8");
    expect(t).toMatch(/path: '\/api\/3cx-smb-solo\/devis', method: 'POST'/);
  });
});

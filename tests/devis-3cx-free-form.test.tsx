/**
 * Formulaire de devis 3CX Free (composant client).
 * Champs arbitrés par Alban le 2026-11-03.
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { Devis3cxFreeForm } from "@/components/forms/devis-3cx-free-form";
import { TEXTE_CONSENTEMENT_RGPD } from "@/lib/devis-3cx-free/formulaire";

describe("Devis3cxFreeForm", () => {
  it.each([
    [/^Nom\b/, true],
    [/^Prénom/, true],
    [/^Société/, true],
    [/^SIRET/, false],
    [/^Téléphone fixe/, false],
    [/^Téléphone mobile/, true],
    [/^E-mail/, true],
    [/^Message/, true],
  ])("champ %s (obligatoire : %s)", (libelle, obligatoire) => {
    render(<Devis3cxFreeForm />);
    const champ = screen.getByLabelText(libelle);
    if (obligatoire) expect(champ).toBeRequired();
    else expect(champ).not.toBeRequired();
  });

  it("propose le besoin en numéros : création, portabilité, les deux, à définir", () => {
    render(<Devis3cxFreeForm />);
    expect(screen.getByLabelText(/Créer de nouveaux numéros/)).toBeInTheDocument();
    expect(screen.getByLabelText(/portabilité/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Les deux/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Je ne sais pas encore/)).toBeInTheDocument();
  });

  it("affiche la case de consentement RGPD obligatoire avec le texte enregistré dans le lead", () => {
    render(<Devis3cxFreeForm />);
    const caseRgpd = screen.getByRole("checkbox", { name: TEXTE_CONSENTEMENT_RGPD });
    expect(caseRgpd).toBeRequired();
  });

  it("contient un champ piège caché aux humains", () => {
    const { container } = render(<Devis3cxFreeForm />);
    const piege = container.querySelector('input[name="website"]');
    expect(piege).not.toBeNull();
    expect(piege).toHaveAttribute("tabindex", "-1");
    expect(piege).toHaveAttribute("autocomplete", "off");
  });

  it("envoie vers /api/3cx-free/devis avec l'en-tête du formulaire", async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    global.fetch = fetchMock as unknown as typeof fetch;
    render(<Devis3cxFreeForm />);
    const remplir = (l: RegExp, v: string) => fireEvent.change(screen.getByLabelText(l), { target: { value: v } });
    remplir(/^Nom\b/, "Dupont");
    remplir(/^Prénom/, "Marie");
    remplir(/^Société/, "Boulangerie");
    remplir(/^Téléphone mobile/, "0690123456");
    remplir(/^E-mail/, "marie@example.fr");
    remplir(/^Message/, "Bonjour");
    fireEvent.click(screen.getByLabelText(/portabilité/));
    fireEvent.click(screen.getByRole("checkbox", { name: TEXTE_CONSENTEMENT_RGPD }));
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/3cx-free/devis");
    expect(init.headers["X-E2I-Form"]).toBe("devis-3cx-free");
    const corps = JSON.parse(init.body);
    expect(corps).toMatchObject({ besoinNumeros: "portabilite", consentementRgpd: true, website: "" });
  });
});

describe("BotID protège la route du devis 3CX Free", () => {
  it("instrumentation-client.ts déclare /api/3cx-free/devis", () => {
    const t = fs.readFileSync(path.join(process.cwd(), "instrumentation-client.ts"), "utf8");
    expect(t).toMatch(/path: '\/api\/3cx-free\/devis', method: 'POST'/);
  });
});

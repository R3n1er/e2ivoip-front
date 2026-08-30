import { render, screen } from "@testing-library/react";
import ThreeCXCloudPage, { metadata } from "@/app/3cx-cloud/page";

const TALLY_3CX_PRO_URL = "https://tally.so/r/EkALv4";

describe("Page 3CX PRO Cloud", () => {
  it("positionne clairement l'offre comme une instance cloud dédiée", () => {
    render(<ThreeCXCloudPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /3CX PRO/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/standard téléphonique sur une instance cloud dédiée/i),
    ).toBeInTheDocument();
    // Grille officielle 3CX PRO : 4 / 8 / 16 / 24 / 32 / 64 appels simultanés
    // (voir docs/ligne-editoriale.md § « Specs produit »).
    for (const palier of ["4", "8", "16", "24", "32", "64"]) {
      expect(screen.getByText(palier)).toBeInTheDocument();
    }
    expect(screen.getAllByText("appels simultanés")).toHaveLength(6);
  });

  it("relie tous les CTA de devis 3CX PRO au tunnel Tally", () => {
    render(<ThreeCXCloudPage />);

    const quoteLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === TALLY_3CX_PRO_URL);

    expect(quoteLinks).toHaveLength(2);
    quoteLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", TALLY_3CX_PRO_URL);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("ne contient plus les promesses commerciales non justifiées", () => {
    render(<ThreeCXCloudPage />);

    const content = document.body.textContent ?? "";
    expect(content).not.toMatch(/40\s*% d'économies/i);
    expect(content).not.toMatch(/sécurité maximale/i);
    expect(content).not.toMatch(/RGPD garantie/i);
    expect(content).not.toMatch(/AWS EU/i);
    expect(content).not.toMatch(/conseillers régionaux/i);
    expect(content).not.toMatch(/DOM-TOM/i);
  });

  it("ne répète pas les coordonnées sous le calendrier", () => {
    render(<ThreeCXCloudPage />);

    expect(
      screen.queryByText(/Vous préférez nous appeler directement/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Ou contactez directement notre équipe commerciale/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Appelez-nous directement/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Configuration et tarif sur devis/i),
    ).not.toBeInTheDocument();
  });

  it("conserve le hub 3CX comme URL canonique", () => {
    expect(metadata.alternates?.canonical).toBe(
      "https://www.e2i-voip.com/telephonie-3cx",
    );
  });
});

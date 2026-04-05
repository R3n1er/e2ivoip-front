import { render, screen } from "@testing-library/react";
import StudioAttentePage from "@/app/studio-attente/page";

describe("Page studio-attente (studio vocal standards téléphoniques)", () => {
  it("affiche le positionnement standard téléphonique, SVI et portail démos", () => {
    render(<StudioAttentePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /studio d'enregistrement vocal pour\s+standard téléphonique/i,
      })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/portail automatisé/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/SVI & menu vocal/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /écoutez des exemples & réalisations avant de commander/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /SVI & menu vocal/i })
    ).toBeInTheDocument();
  });
});

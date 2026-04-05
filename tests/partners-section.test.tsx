import { render, screen } from "@testing-library/react";
import { PartnersSection } from "@/components/partners-section";

describe("PartnersSection", () => {
  it("renders the active technology partners without the 3CX Silver badge", () => {
    render(<PartnersSection />);

    expect(
      screen.getByRole("heading", { name: /Nos Partenaires Technologiques/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText("Partenaire 3CX")).toBeInTheDocument();
    expect(screen.getByAltText("Partenaire Yeastar")).toBeInTheDocument();
    expect(screen.getByAltText("Partenaire SFR Business")).toBeInTheDocument();
    expect(screen.getByAltText("Partenaire Fanvil")).toBeInTheDocument();
    expect(screen.getByAltText("Partenaire Yealink")).toBeInTheDocument();
    expect(
      screen.queryByAltText("Partenaire 3CX Silver Partner")
    ).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import Blog from "@/app/blog/page";

describe("Blog Page - Test Simple", () => {
  it("se charge sans erreur", () => {
    // Ce test vérifie juste que la page se rend sans planter
    expect(() => render(<Blog />)).not.toThrow();
  });

  it("affiche le titre principal", () => {
    render(<Blog />);
    // Le titre est divisé en plusieurs éléments, cherchons "Blog"
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });
});

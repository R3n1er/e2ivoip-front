import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

describe("Reveal — apparitions au scroll sobres", () => {
  test("Reveal rend ses enfants", () => {
    render(
      <Reveal>
        <p>Contenu révélé</p>
      </Reveal>
    );
    expect(screen.getByText("Contenu révélé")).toBeInTheDocument();
  });

  test("Reveal transmet la className au wrapper", () => {
    const { container } = render(
      <Reveal className="text-center">
        <p>Contenu</p>
      </Reveal>
    );
    expect(container.firstElementChild).toHaveClass("text-center");
  });

  test("RevealGroup + RevealItem rendent la grille complète", () => {
    render(
      <RevealGroup className="grid">
        <RevealItem>
          <span>Card A</span>
        </RevealItem>
        <RevealItem>
          <span>Card B</span>
        </RevealItem>
      </RevealGroup>
    );
    expect(screen.getByText("Card A")).toBeInTheDocument();
    expect(screen.getByText("Card B")).toBeInTheDocument();
  });
});

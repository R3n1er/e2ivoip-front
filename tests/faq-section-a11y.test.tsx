import { render, screen } from "@testing-library/react";
import { FaqSection } from "@/components/faq-section";
import { RichFaqItem } from "@/lib/faq-data";

const mockItems: RichFaqItem[] = [
  {
    question: "Qu'est-ce que la VoIP ?",
    answerText: "La VoIP permet de passer des appels via Internet.",
    answer: <p>La VoIP permet de passer des appels via Internet.</p>,
  },
  {
    question: "Ai-je besoin d'un équipement spécial ?",
    answerText: "Non, un ordinateur ou un smartphone suffit.",
    answer: <p>Non, un ordinateur ou un smartphone suffit.</p>,
  },
];

describe("FaqSection — sémantique et accessibilité", () => {
  test("chaque question est un titre de niveau 3", () => {
    // Les questions doivent rester navigables via la liste des titres
    // des lecteurs d'écran, comme avant la factorisation.
    render(<FaqSection items={mockItems} title="Questions fréquentes" />);

    mockItems.forEach((item) => {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: item.question,
      });
      expect(heading).toBeInTheDocument();
    });
  });

  test("le heading de la question est un enfant direct du summary", () => {
    // La spec HTML n'autorise dans <summary> que du phrasing content
    // ou un heading unique — pas un <div>.
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    container.querySelectorAll("summary").forEach((summary) => {
      expect(summary.querySelector(":scope > h3")).not.toBeNull();
      expect(summary.querySelector(":scope > div")).toBeNull();
    });
  });

  test("le chevron décoratif est masqué aux technologies d'assistance", () => {
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    const svgs = container.querySelectorAll("summary svg");
    expect(svgs.length).toBeGreaterThan(0);

    svgs.forEach((svg) => {
      expect(svg.getAttribute("aria-hidden")).toBe("true");
      expect(svg.getAttribute("focusable")).toBe("false");
    });
  });

  test("le sous-titre est rendu quand il est fourni", () => {
    render(
      <FaqSection
        items={mockItems}
        title="FAQ"
        subtitle="Réponses aux questions fréquemment posées par nos clients"
      />
    );

    expect(
      screen.getByText(
        "Réponses aux questions fréquemment posées par nos clients"
      )
    ).toBeInTheDocument();
  });

  test("l'animation respecte prefers-reduced-motion", () => {
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    const details = container.querySelector("details");
    expect(details?.className).toMatch(/motion-reduce:transition-none/);

    const chevron = container.querySelector("summary svg")?.parentElement;
    expect(chevron?.className).toMatch(/motion-reduce:transform-none/);
  });

  test("les items utilisent une clé stable plutôt que l'index", () => {
    // Rendu avec l'ordre inversé : le contenu doit suivre sa question.
    const reversed = [...mockItems].reverse();
    const { container } = render(
      <FaqSection items={reversed} title="Questions fréquentes" />
    );

    const firstSummary = container.querySelector("summary h3");
    expect(firstSummary?.textContent).toBe(reversed[0].question);
  });
});

describe("FaqSection — mise en page responsive", () => {
  test("le composant porte son propre padding horizontal", () => {
    // 7 des 10 pages appelant FaqSection ne fournissent aucun conteneur
    // avec padding : sans cela, les cartes touchent les bords sur mobile.
    // Le composant réutilisable est responsable de sa propre gouttière.
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    // Le premier enfant est le <script> JSON-LD : on cible le conteneur visuel.
    const wrapper = container.querySelector("div.max-w-4xl");
    expect(wrapper).not.toBeNull();
    expect(wrapper!.className).toMatch(/px-4/);
  });
});

describe("Anciens composants FAQ supprimés", () => {
  test("faq-working et faq-trunk-sip-compteur ne sont plus résolvables", () => {
    // La factorisation de la PR #51 devait supprimer cette duplication.
    expect(() => require("@/components/faq-working")).toThrow();
    expect(() => require("@/components/faq-trunk-sip-compteur")).toThrow();
  });
});

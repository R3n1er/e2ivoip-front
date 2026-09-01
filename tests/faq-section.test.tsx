import { render, screen } from "@testing-library/react";
import { FaqSection } from "@/components/faq-section";
import { RichFaqItem } from "@/lib/faq-data";

const mockItems: RichFaqItem[] = [
  {
    question: "Qu'est-ce que la VoIP ?",
    answerText:
      "La VoIP (Voice over IP) est une technologie permettant de passer des appels téléphoniques via Internet.",
    answer: <p>La VoIP (Voice over IP) est une technologie permettant de passer des appels téléphoniques via Internet.</p>,
  },
  {
    question: "Ai-je besoin d'un équipement spécial ?",
    answerText:
      "Non, un simple ordinateur ou smartphone avec une connexion Internet suffit.",
    answer: <p>Non, un simple ordinateur ou smartphone avec une connexion Internet suffit.</p>,
  },
];

describe("FaqSection", () => {
  test("rend toutes les questions", () => {
    render(<FaqSection items={mockItems} title="Questions fréquentes" />);

    expect(screen.getByText("Qu'est-ce que la VoIP ?")).toBeInTheDocument();
    expect(
      screen.getByText("Ai-je besoin d'un équipement spécial ?")
    ).toBeInTheDocument();
  });

  test("affiche le titre", () => {
    render(<FaqSection items={mockItems} title="Questions fréquentes" />);

    // Le titre est rendu avec le dernier mot en rouge
    expect(screen.getByText(/Questions/)).toBeInTheDocument();
    expect(screen.getByText(/fréquentes/)).toBeInTheDocument();
  });

  test("affiche le sous-titre quand fourni", () => {
    render(
      <FaqSection
        items={mockItems}
        title="Questions fréquentes"
        subtitle="Tout savoir sur nos services"
      />
    );

    expect(screen.getByText("Tout savoir sur nos services")).toBeInTheDocument();
  });

  test("injecte le JSON-LD FAQPage quand jsonLd=true (défaut)", () => {
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    const jsonLdScript = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLdScript).toBeInTheDocument();

    const jsonContent = JSON.parse(jsonLdScript!.textContent || "{}");
    expect(jsonContent["@type"]).toBe("FAQPage");
    expect(jsonContent.mainEntity).toHaveLength(2);
    expect(jsonContent.mainEntity[0]["@type"]).toBe("Question");
    expect(jsonContent.mainEntity[0].name).toBe("Qu'est-ce que la VoIP ?");
    expect(jsonContent.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    expect(jsonContent.mainEntity[0].acceptedAnswer.text).toBe(
      "La VoIP (Voice over IP) est une technologie permettant de passer des appels téléphoniques via Internet."
    );
  });

  test("n'injecte pas le JSON-LD quand jsonLd=false", () => {
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" jsonLd={false} />
    );

    const jsonLdScript = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLdScript).not.toBeInTheDocument();
  });

  test("utilise des éléments details/summary accessibles", () => {
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    const details = container.querySelectorAll("details");
    expect(details).toHaveLength(2);

    const summaries = container.querySelectorAll("summary");
    expect(summaries).toHaveLength(2);
  });

  test("sync answerText ↔ answer : le texte du JSON-LD correspond au texte affiché", () => {
    const { container } = render(
      <FaqSection items={mockItems} title="Questions fréquentes" />
    );

    const jsonLdScript = container.querySelector(
      'script[type="application/ld+json"]'
    );
    const jsonContent = JSON.parse(jsonLdScript!.textContent || "{}");

    // Pour chaque item, le answerText (JSON-LD) doit contenir les mêmes infos clés que le answer (JSX)
    mockItems.forEach((item, index) => {
      const ldAnswer = jsonContent.mainEntity[index].acceptedAnswer.text;
      expect(ldAnswer).toBe(item.answerText);
      // Vérifier que la question correspond aussi
      expect(jsonContent.mainEntity[index].name).toBe(item.question);
    });
  });

  test("rend avec un titre personnalisé", () => {
    render(<FaqSection items={mockItems} title="F.A.Q" />);

    expect(screen.getByText("F.A.Q")).toBeInTheDocument();
  });

  test("rend avec zero items sans crasher", () => {
    const { container } = render(
      <FaqSection items={[]} title="Questions fréquentes" />
    );

    expect(container.querySelector("details")).not.toBeInTheDocument();
  });
});
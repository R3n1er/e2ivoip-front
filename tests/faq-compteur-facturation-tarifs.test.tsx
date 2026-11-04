/**
 * FAQ « facturation à la seconde » du Trunk SIP au compteur.
 *
 * Prix confirmés par Alban le 2026-11-04 (grille en vigueur depuis le
 * 24/10/2026) :
 *   - sortant vers un fixe DOM : 0,0240 €/min ;
 *   - entrant en BYOC : 0,0040 €/min (gratuit sur un trunk classique).
 *
 * Le texte visible et `answerText` (JSON-LD FAQPage) doivent annoncer les
 * mêmes chiffres : Google lit l'un, le prospect lit l'autre.
 */
import { render } from "@testing-library/react";
import { COMPTEUR_FAQ } from "@/lib/faq-data";

const item = COMPTEUR_FAQ.find((f) => /facturation à la seconde/i.test(f.question));

function texteVisible(): string {
  if (!item) throw new Error("question absente");
  const { container } = render(<>{item.answer}</>);
  return (container.textContent ?? "").replace(/\s+/g, " ");
}

describe("FAQ compteur — facturation à la seconde, grille du 24/10/2026", () => {
  it("la question existe", () => {
    expect(item).toBeDefined();
  });

  it.each([
    ["texte visible", () => texteVisible()],
    ["answerText (JSON-LD)", () => item?.answerText ?? ""],
  ])("%s : exemple calculé sur 0,0240 €/min, soit 0,0332 € pour 83 s", (_nom, lire) => {
    const t = lire();
    expect(t).toMatch(/0,0240\s*€\s*\/\s*min/);
    expect(t).toMatch(/0,0332\s*€/);
    // 83 s × 0,0240 €/min ÷ 60 = 0,0332 € : le chiffre affiché suit le calcul.
    expect(((83 * 0.024) / 60).toFixed(4)).toBe("0.0332");
  });

  it.each([
    ["texte visible", () => texteVisible()],
    ["answerText (JSON-LD)", () => item?.answerText ?? ""],
  ])("%s : entrant gratuit sur trunk classique, 0,0040 €/min en BYOC", (_nom, lire) => {
    const t = lire();
    expect(t).toMatch(/trunk classique/);
    expect(t).toMatch(/0,0040\s*€/);
    expect(t).toMatch(/BYOC/);
  });

  it.each([
    ["texte visible", () => texteVisible()],
    ["answerText (JSON-LD)", () => item?.answerText ?? ""],
  ])("%s : plus aucun ancien tarif (0,02 €/min, 0,0275 €)", (_nom, lire) => {
    const t = lire();
    expect(t).not.toMatch(/0,0275/);
    expect(t).not.toMatch(/0,02\s*€\s*\/\s*min/);
  });
});

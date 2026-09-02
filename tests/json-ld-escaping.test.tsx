import { render } from "@testing-library/react";
import { JsonLd } from "@/components/seo/json-ld";

describe("JsonLd — échappement du contexte HTML", () => {
  test("neutralise une balise fermante </script> dans une valeur", () => {
    // Sans échappement de `<`, le parseur HTML ferme la balise <script>
    // avant la fin du JSON : le reste devient du HTML exécutable.
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "</script><img src=x onerror=alert(1)>",
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    // La séquence brute ne doit jamais apparaître dans le HTML sérialisé.
    expect(script!.innerHTML).not.toContain("</script>");
    expect(script!.innerHTML).toContain("\\u003c");
    // Aucun élément n'a pu s'échapper du script.
    expect(container.querySelector("img")).toBeNull();
  });

  test("le JSON reste valide et fidèle après échappement", () => {
    const data = {
      "@type": "Question",
      name: "Comparaison < et > dans une réponse",
      text: "5 < 10 et 10 > 5",
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    // Le consommateur (Googlebot) doit retrouver les données d'origine.
    const parsed = JSON.parse(script!.textContent || "{}");
    expect(parsed).toEqual(data);
  });

  test("échappe les séparateurs de ligne Unicode U+2028 / U+2029", () => {
    // Valides en JSON mais interdits dans un littéral JavaScript :
    // ils cassent le parsing chez certains consommateurs.
    const data = {
      "@type": "Answer",
      text: "ligne1\u2028ligne2\u2029fin",
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    // Les caractères bruts ne doivent pas subsister dans le HTML.
    expect(script!.innerHTML).not.toMatch(/[\u2028\u2029]/);
    expect(script!.innerHTML).toContain("\\u2028");
    expect(JSON.parse(script!.textContent || "{}")).toEqual(data);
  });

  test("accepte un tableau de schémas", () => {
    const data = [{ "@type": "Organization" }, { "@type": "WebSite" }];

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(JSON.parse(script!.textContent || "[]")).toEqual(data);
  });
});

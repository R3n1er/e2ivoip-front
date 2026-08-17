import { stripHtml } from "@/lib/blog-utils";

describe("stripHtml", () => {
  it("retourne une chaîne vide pour undefined", () => {
    expect(stripHtml(undefined)).toBe("");
  });

  it("retourne une chaîne vide pour null", () => {
    expect(stripHtml(null as unknown as string)).toBe("");
  });

  it("retourne une chaîne vide pour une string vide", () => {
    expect(stripHtml("")).toBe("");
  });

  it("supprime les balises HTML simples", () => {
    expect(stripHtml("<p>Bonjour</p>")).toBe("Bonjour");
  });

  it("supprime les balises span imbriquées", () => {
    expect(stripHtml('<span style="color:red">Texte</span>')).toBe("Texte");
  });

  it("supprime les balises imbriquées p + span", () => {
    expect(stripHtml('<p><span class="hl">Mot</span> important</p>')).toBe(
      "Mot important"
    );
  });

  it("décode les entités HTML courantes", () => {
    expect(stripHtml("&amp;")).toBe("&");
    expect(stripHtml("&quot;")).toBe('"');
    expect(stripHtml("&#39;")).toBe("'");
    expect(stripHtml("&lt;")).toBe("<");
    expect(stripHtml("&gt;")).toBe(">");
  });

  it("remplace &nbsp; par un espace", () => {
    expect(stripHtml("A&nbsp;B")).toBe("A B");
  });

  it("nettoie les espaces multiples résiduels", () => {
    expect(stripHtml("<p>  A   B  </p>")).toBe("A B");
  });

  it("préserve le texte sans HTML", () => {
    expect(stripHtml("Texte plain sans balises")).toBe(
      "Texte plain sans balises"
    );
  });

  it("est idempotent (double appel = même résultat)", () => {
    const input = '<p><span class="x">Test</span></p>';
    const once = stripHtml(input);
    const twice = stripHtml(once);
    expect(twice).toBe(once);
  });

  it("gère les balises auto-fermantes", () => {
    expect(stripHtml("A<br/>B<hr/>C")).toBe("A B C");
  });

  it("gère les attributs avec chevrons échappés", () => {
    expect(stripHtml('<a href="?x=1&lt;2">lien</a>')).toBe("lien");
  });
});
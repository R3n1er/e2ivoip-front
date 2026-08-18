import { sanitizeBlogHtml, stripHtml } from "@/lib/blog-utils";

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

describe("sanitizeBlogHtml", () => {
  it("retourne une chaîne vide pour undefined", () => {
    expect(sanitizeBlogHtml(undefined)).toBe("");
  });

  it("préserve le HTML éditorial légitime", () => {
    const html =
      '<h2>Titre</h2><p>Un <strong>texte</strong> avec un <a href="https://e2i-voip.com">lien</a>.</p>';
    expect(sanitizeBlogHtml(html)).toContain("<h2>Titre</h2>");
    expect(sanitizeBlogHtml(html)).toContain("<strong>texte</strong>");
    expect(sanitizeBlogHtml(html)).toContain('href="https://e2i-voip.com"');
  });

  it("supprime les balises script (XSS stockée)", () => {
    const sortie = sanitizeBlogHtml("<p>OK</p><script>alert(1)</script>");
    expect(sortie).toContain("<p>OK</p>");
    expect(sortie).not.toContain("script");
    expect(sortie).not.toContain("alert");
  });

  it("supprime les gestionnaires d'événements inline", () => {
    const sortie = sanitizeBlogHtml(
      '<img src="https://cdn.test/a.jpg" onerror="alert(1)">'
    );
    expect(sortie).toContain('src="https://cdn.test/a.jpg"');
    expect(sortie).not.toContain("onerror");
  });

  it("neutralise les liens javascript:", () => {
    const sortie = sanitizeBlogHtml('<a href="javascript:alert(1)">clic</a>');
    expect(sortie).not.toContain("javascript:");
    expect(sortie).toContain("clic");
  });

  // HubSpot renvoie parfois dans postBody des modules HubL non compilés
  // (`{% module_block %}…{% end_module_block %}`) : sans nettoyage, ce code
  // s'affiche en clair au milieu de l'article.
  it("supprime les blocs de module HubL non rendus par HubSpot", () => {
    const html =
      '<p>Fin de l\'article.</p>\n{% module_block module "widget_8c9c652e-751a" %}{% module_attribute "button_text" is_json="true" %}{% raw %}"Contactez nous"{% endraw %}{% end_module_attribute %}{% end_module_block %}';
    const sortie = sanitizeBlogHtml(html);
    expect(sortie).toContain("<p>Fin de l'article.</p>");
    expect(sortie).not.toContain("module_block");
    expect(sortie).not.toContain("module_attribute");
    expect(sortie).not.toContain("{%");
  });

  it("supprime les expressions HubL isolées", () => {
    const sortie = sanitizeBlogHtml("<p>A</p>{{ content.absolute_url }}<p>B</p>");
    expect(sortie).not.toContain("{{");
    expect(sortie).not.toContain("absolute_url");
    expect(sortie).toContain("<p>A</p>");
    expect(sortie).toContain("<p>B</p>");
  });

  it("préserve les accolades légitimes du texte éditorial", () => {
    const sortie = sanitizeBlogHtml("<p>Le tarif est de 20 {euros} par mois.</p>");
    expect(sortie).toContain("20 {euros} par mois");
  });
});
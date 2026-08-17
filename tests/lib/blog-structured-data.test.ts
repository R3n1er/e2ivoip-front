import { blogPostingSchema, blogSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";

describe("blogPostingSchema", () => {
  const base = {
    title: "Comparaison 3CX vs Ringover",
    description: "Analyse des deux solutions pour les PME.",
    slug: "comparaison-3cx-vs-ringover",
  };

  it("produit un BlogPosting valide et adressable", () => {
    const schema = blogPostingSchema(base) as Record<string, any>;

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.url).toBe(`${SITE_URL}/blog/${base.slug}`);
    expect(schema.mainEntityOfPage["@id"]).toBe(schema.url);
    expect(schema.inLanguage).toBe("fr-FR");
    expect(schema.publisher["@id"]).toContain("#organization");
  });

  it("normalise les dates en ISO", () => {
    const schema = blogPostingSchema({
      ...base,
      publishDate: "2026-03-14T08:30:00Z",
      modifiedDate: "2026-05-02T10:00:00Z",
    }) as Record<string, any>;

    expect(schema.datePublished).toBe("2026-03-14T08:30:00.000Z");
    expect(schema.dateModified).toBe("2026-05-02T10:00:00.000Z");
  });

  it("retombe sur la date de publication faute de date de modification", () => {
    const schema = blogPostingSchema({
      ...base,
      publishDate: "2026-03-14T08:30:00Z",
    }) as Record<string, any>;

    expect(schema.dateModified).toBe(schema.datePublished);
  });

  it("ignore une date invalide plutôt que d'émettre un champ corrompu", () => {
    const schema = blogPostingSchema({
      ...base,
      publishDate: "pas-une-date",
    }) as Record<string, any>;

    expect(schema.datePublished).toBeUndefined();
    expect(schema.dateModified).toBeUndefined();
  });

  it("tronque les titres trop longs pour Google", () => {
    const schema = blogPostingSchema({
      ...base,
      title: "T".repeat(200),
    }) as Record<string, any>;

    expect(schema.headline.length).toBeLessThanOrEqual(110);
  });

  it("attribue l'article à son auteur, sinon à l'organisation", () => {
    const avecAuteur = blogPostingSchema({
      ...base,
      author: "Alban",
    }) as Record<string, any>;
    expect(avecAuteur.author).toEqual({ "@type": "Person", name: "Alban" });

    const sansAuteur = blogPostingSchema(base) as Record<string, any>;
    expect(sansAuteur.author["@id"]).toContain("#organization");
  });

  it("n'émet pas les champs optionnels absents", () => {
    const schema = blogPostingSchema(base) as Record<string, any>;

    expect(schema).not.toHaveProperty("image");
    expect(schema).not.toHaveProperty("wordCount");
    expect(schema).not.toHaveProperty("keywords");
  });
});

describe("blogSchema", () => {
  it("déclare chaque article du listing", () => {
    const schema = blogSchema([
      { title: "Article A", slug: "article-a", publishDate: "2026-01-05" },
      { title: "Article B", slug: "article-b" },
    ]) as Record<string, any>;

    expect(schema["@type"]).toBe("Blog");
    expect(schema.url).toBe(`${SITE_URL}/blog`);
    expect(schema.blogPost).toHaveLength(2);
    expect(schema.blogPost[0].url).toBe(`${SITE_URL}/blog/article-a`);
    expect(schema.blogPost[0].datePublished).toBe("2026-01-05T00:00:00.000Z");
    expect(schema.blogPost[1]).not.toHaveProperty("datePublished");
  });

  it("reste valide sans aucun article", () => {
    const schema = blogSchema([]) as Record<string, any>;

    expect(schema["@type"]).toBe("Blog");
    expect(schema.blogPost).toEqual([]);
  });
});

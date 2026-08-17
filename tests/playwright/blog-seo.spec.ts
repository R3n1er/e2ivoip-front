import { test, expect } from "@playwright/test";

/**
 * Le listing du blog était un composant client : le HTML servi ne contenait
 * aucun lien d'article, et les crawlers sans exécution JS — dont plusieurs
 * crawlers IA autorisés dans robots.txt — voyaient un blog vide.
 *
 * Ces tests coupent JavaScript pour vérifier ce que voit réellement un robot.
 */
test.describe("Blog — rendu serveur et référencement", () => {
  test.describe("sans JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("le listing expose les articles dans le HTML", async ({ page }) => {
      await page.goto("/blog");

      const liens = page.locator('a[href^="/blog/"]:not([href*="/categorie/"])');
      await expect(liens.first()).toBeAttached();

      const hrefs = await liens.evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute("href") ?? "")
      );
      const articles = [...new Set(hrefs)].filter((h) => h !== "/blog");

      // Le blog compte 13 articles ; on exige au minimum une vraie liste.
      expect(articles.length).toBeGreaterThanOrEqual(5);
    });

    test("le titre H1 et le contenu sont servis par le serveur", async ({
      page,
    }) => {
      await page.goto("/blog");

      await expect(page.locator("h1")).toContainText("Blog");
      await expect(
        page.getByRole("navigation", { name: "Tous les articles du blog" })
      ).toBeAttached();
    });

    test("un article est entièrement lisible sans JS", async ({ page }) => {
      await page.goto("/blog");

      const premier = await page
        .locator('a[href^="/blog/"]:not([href*="/categorie/"])')
        .first()
        .getAttribute("href");
      expect(premier).toBeTruthy();

      await page.goto(premier!);
      await expect(page.locator("h1")).toBeAttached();
    });
  });

  test("le listing porte un JSON-LD Blog listant les articles", async ({
    page,
  }) => {
    await page.goto("/blog");

    const blocs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();

    const schemas = blocs.flatMap((bloc) => {
      const parsed = JSON.parse(bloc);
      return Array.isArray(parsed) ? parsed : [parsed];
    });

    const blog = schemas.find((s) => s["@type"] === "Blog");
    expect(blog).toBeTruthy();
    expect(Array.isArray(blog.blogPost)).toBe(true);
    expect(blog.blogPost.length).toBeGreaterThanOrEqual(5);

    const fil = schemas.find((s) => s["@type"] === "BreadcrumbList");
    expect(fil).toBeTruthy();
  });

  test("un article porte un BlogPosting complet", async ({ page }) => {
    await page.goto("/blog");
    const premier = await page
      .locator('a[href^="/blog/"]:not([href*="/categorie/"])')
      .first()
      .getAttribute("href");

    await page.goto(premier!);

    const blocs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const schemas = blocs.flatMap((bloc) => {
      const parsed = JSON.parse(bloc);
      return Array.isArray(parsed) ? parsed : [parsed];
    });

    const article = schemas.find((s) => s["@type"] === "BlogPosting");
    expect(article).toBeTruthy();
    expect(article.headline).toBeTruthy();
    expect(article.headline.length).toBeLessThanOrEqual(110);
    expect(article.url).toMatch(/^https:\/\/.+\/blog\/.+/);
    expect(article.publisher["@id"]).toContain("#organization");
    expect(article.inLanguage).toBe("fr-FR");

    // Les dates, quand elles existent, doivent être en ISO 8601.
    if (article.datePublished) {
      expect(article.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    }
  });

  test("les pages du blog déclarent une canonical propre", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/blog$/
    );

    const premier = await page
      .locator('a[href^="/blog/"]:not([href*="/categorie/"])')
      .first()
      .getAttribute("href");
    await page.goto(premier!);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toMatch(/^https:\/\/.+\/blog\/.+/);
    expect(canonical).not.toMatch(/\/blog\/blog\//);
  });

  test("les métadonnées d'article sont exploitables en SERP", async ({
    page,
  }) => {
    await page.goto("/blog");
    const premier = await page
      .locator('a[href^="/blog/"]:not([href*="/categorie/"])')
      .first()
      .getAttribute("href");
    await page.goto(premier!);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    // L'extrait HubSpot arrive en HTML : aucune balise ne doit subsister.
    expect(description).not.toMatch(/<[^>]+>/);
    expect(description).not.toContain("&nbsp;");

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article"
    );
  });

  test("une page catégorie reste indexable et située", async ({ page }) => {
    await page.goto("/blog/categorie/3cx");

    await expect(page.locator("h1")).toBeAttached();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/blog\/categorie\/3cx$/
    );

    const blocs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const schemas = blocs.flatMap((bloc) => {
      const parsed = JSON.parse(bloc);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
    expect(schemas.some((s) => s["@type"] === "BreadcrumbList")).toBe(true);
  });
});

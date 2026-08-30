import { test, expect } from "@playwright/test";

/**
 * Contrôles SEO bloquants avant mise en ligne. Chaque page indexable doit
 * porter un titre, une description, une canonical et une balise OG.
 */
const PAGES = [
  "/",
  "/telephonie-entreprise",
  "/telephonie-3cx",
  "/3cx-pro",
  "/nos-services",
  "/devis-en-ligne",
  "/contact",
  "/qui-sommes-nous",
  "/assistance",
  "/blog",
];

test.describe("SEO — contrôles avant mise en ligne", () => {
  for (const chemin of PAGES) {
    test(`métadonnées complètes sur ${chemin}`, async ({ page }) => {
      await page.goto(chemin);

      const titre = await page.title();
      expect(titre.length).toBeGreaterThan(10);
      expect(titre.length).toBeLessThanOrEqual(70);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(canonical).toMatch(/^https:\/\//);
      // Jamais d'ancien domaine ni de localhost figé dans la canonical.
      expect(canonical).not.toMatch(/e2ivoip\.fr|localhost/);

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);

      // Une seule balise H1 par page.
      expect(await page.locator("h1").count()).toBe(1);

      // Aucune page indexable ne doit être en noindex.
      const robots = await page
        .locator('meta[name="robots"]')
        .getAttribute("content")
        .catch(() => null);
      if (robots) expect(robots).not.toMatch(/noindex/);
    });
  }

  test("le sitemap liste les routes réelles", async ({ request }) => {
    const reponse = await request.get("/sitemap.xml");
    expect(reponse.status()).toBe(200);

    const xml = await reponse.text();
    expect(xml).toContain("<urlset");
    expect(xml).not.toMatch(/e2ivoip\.fr|localhost/);

    for (const chemin of ["/telephonie-entreprise", "/devis-en-ligne", "/contact"]) {
      expect(xml).toContain(chemin);
    }
  });

  test("robots.txt autorise l'indexation et référence le sitemap", async ({
    request,
  }) => {
    const reponse = await request.get("/robots.txt");
    expect(reponse.status()).toBe(200);

    const texte = await reponse.text();
    expect(texte).toMatch(/Sitemap:\s*https:\/\//);
    // Un « Disallow: / » global bloquerait tout le référencement.
    expect(texte).not.toMatch(/^Disallow:\s*\/$/m);
  });

  test("les données structurées sont valides", async ({ page }) => {
    await page.goto("/");

    const blocs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(blocs.length).toBeGreaterThan(0);

    for (const bloc of blocs) {
      const donnees = JSON.parse(bloc);
      const entrees = Array.isArray(donnees) ? donnees : [donnees];
      for (const entree of entrees) {
        expect(entree["@context"]).toMatch(/schema\.org/);
        expect(entree["@type"]).toBeTruthy();
      }
    }
  });
});

import { test, expect } from "@playwright/test";

/**
 * Contrôles SEO bloquants avant mise en ligne. Chaque page indexable doit
 * porter un titre, une description, une canonical et une balise OG.
 */
const PAGES = [
  "/",
  "/standard-telephonique",
  "/standard-telephonique/guyane",
  "/standard-telephonique/martinique",
  "/standard-telephonique/guadeloupe",
  "/standard-telephonique/la-reunion",
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

  // Un slug absent du registre doit renvoyer un vrai 404, pas une page vide :
  // une URL qui répond 200 avec du contenu générique est indexable, et c'est
  // précisément la page satellite que le registre refuse de produire.
  //
  // La cible était « martinique », publiée depuis le 2026-09-19. Le contrôle
  // porte désormais sur un slug qui ne sera jamais publié — sinon le test se
  // désarme tout seul à chaque nouveau territoire.
  test("un territoire hors registre renvoie un 404 réel", async ({ page }) => {
    const reponse = await page.goto("/standard-telephonique/atlantide", {
      waitUntil: "domcontentloaded",
    });
    expect(reponse?.status()).toBe(404);
  });

  // Les quatre territoires publiés doivent être servis : le pendant positif
  // du test ci-dessus, sans lequel un `generateStaticParams` cassé passerait
  // inaperçu tant que les 404 tombent juste.
  for (const slug of ["guyane", "martinique", "guadeloupe", "la-reunion"]) {
    test(`le territoire ${slug} est servi en 200`, async ({ page }) => {
      const reponse = await page.goto(`/standard-telephonique/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(reponse?.status()).toBe(200);
    });
  }
});

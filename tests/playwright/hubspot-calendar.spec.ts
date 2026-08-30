import { test, expect } from "@playwright/test";

/**
 * Le calendrier de prise de RDV est un embed HubSpot : le script scanne les
 * conteneurs `.meetings-iframe-container` et remplace leur contenu par une
 * iframe pointant sur `data-src`.
 *
 * Le piège corrigé le 2026-08-16 : `data-src` visait
 * `www.e2i-voip.com/meetings/*`, un chemin servi par HubSpot CMS qui disparaît
 * à la bascule sur Next.js. L'URL doit viser le domaine HubSpot canonique.
 */
test.describe("Calendrier HubSpot — prise de rendez-vous", () => {
  const PAGE = "/3cx-pro";

  test("expose un conteneur d'embed pointant vers le domaine HubSpot", async ({
    page,
  }) => {
    await page.goto(PAGE);

    const container = page.getByTestId("hubspot-calendar-container");
    await container.scrollIntoViewIfNeeded();
    await expect(container).toBeVisible();

    const dataSrc = await container.getAttribute("data-src");
    expect(dataSrc).toBeTruthy();

    // Domaine HubSpot, jamais le domaine du site.
    expect(dataSrc).toMatch(/^https:\/\/meetings(-eu1)?\.hubspot\.com\//);
    expect(dataSrc).not.toMatch(/e2i-voip\.com/);
    // Le paramètre embed est requis pour le rendu en iframe.
    expect(dataSrc).toContain("embed=true");
  });

  test("charge le script d'embed HubSpot", async ({ page }) => {
    await page.goto(PAGE);

    await page
      .getByTestId("hubspot-calendar-container")
      .scrollIntoViewIfNeeded();

    await expect(
      page.locator('script[src*="MeetingsEmbedCode.js"]')
    ).toHaveCount(1, { timeout: 15000 });
  });

  test("affiche l'iframe de réservation une fois le script exécuté", async ({
    page,
  }) => {
    await page.goto(PAGE);

    const container = page.getByTestId("hubspot-calendar-container");
    await container.scrollIntoViewIfNeeded();

    // Le script HubSpot injecte l'iframe dans le conteneur.
    await expect(container.locator("iframe")).toBeVisible({ timeout: 30000 });

    const src = await container.locator("iframe").getAttribute("src");
    expect(src).toMatch(/meetings(-eu1)?\.hubspot\.com/);
  });

  test("masque le message de chargement une fois l'iframe affichée", async ({
    page,
  }) => {
    await page.goto(PAGE);

    const container = page.getByTestId("hubspot-calendar-container");
    await container.scrollIntoViewIfNeeded();

    await expect(container.locator("iframe")).toBeVisible({ timeout: 30000 });

    // Bug observé en prod : le message de chargement React reste affiché
    // par-dessus l'iframe injectée par le script HubSpot, faute de détection
    // de la fin du chargement (le composant ne connaît que "failed", jamais
    // "loaded").
    await expect(
      page.getByTestId("hubspot-calendar-loading")
    ).not.toBeVisible();
  });

  test("propose un lien de repli si le script échoue", async ({ page }) => {
    // Simule un bloqueur de traceurs ou une coupure réseau.
    await page.route("**/MeetingsEmbedCode.js", (route) => route.abort());

    await page.goto(PAGE);

    const fallback = page.getByTestId("hubspot-calendar-fallback");
    await fallback.scrollIntoViewIfNeeded();
    await expect(fallback).toBeVisible({ timeout: 15000 });

    const link = fallback.getByRole("link", {
      name: /Ouvrir le calendrier/i,
    });
    await expect(link).toHaveAttribute(
      "href",
      /^https:\/\/meetings(-eu1)?\.hubspot\.com\//
    );
  });

  test("propose un lien de repli si le script charge sans jamais injecter l'iframe", async ({
    page,
  }) => {
    // Cas distinct du précédent : le script répond 200 (onerror ne se
    // déclenche pas) mais n'injecte aucune iframe — lien de meeting
    // désactivé côté HubSpot, ou un outil de confidentialité qui laisse
    // passer le script mais bloque l'appel réseau de l'embed lui-même.
    await page.route("**/MeetingsEmbedCode.js", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "// script HubSpot chargé, mais n'injecte volontairement aucune iframe (test)",
      })
    );

    await page.goto(PAGE);

    const fallback = page.getByTestId("hubspot-calendar-fallback");
    await fallback.scrollIntoViewIfNeeded();
    await expect(fallback).toBeVisible({ timeout: 20000 });

    const link = fallback.getByRole("link", {
      name: /Ouvrir le calendrier/i,
    });
    await expect(link).toHaveAttribute(
      "href",
      /^https:\/\/meetings(-eu1)?\.hubspot\.com\//
    );
  });
});

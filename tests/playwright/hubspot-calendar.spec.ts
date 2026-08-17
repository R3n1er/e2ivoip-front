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
  const PAGE = "/3cx-cloud";

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
});

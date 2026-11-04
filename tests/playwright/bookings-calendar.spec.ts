import { test, expect, type Page } from "@playwright/test";

/**
 * Le calendrier de prise de RDV commercial est la page Microsoft Bookings
 * partagée Valérie / Alban, intégrée en iframe. Elle remplace l'embed HubSpot
 * Meetings le 2026-10-27.
 *
 * Seule la page `RDVcommercialE2IVOIP1@…` fait foi : une page voisine
 * `RDVCommercialE2IVOIP@…` (sans le « 1 ») est encore publiée et ne doit pas
 * être réutilisée.
 *
 * Bookings est simulé : les tests ne dépendent pas du réseau Microsoft.
 */
const BOOKINGS_URL =
  "https://bookings.cloud.microsoft/book/RDVcommercialE2IVOIP1@e2i-voip.com/";

// Source exacte du code d'intégration fourni par Bookings.
const BOOKINGS_EMBED_URL = `${BOOKINGS_URL}?ismsaljsauthenabled`;

const PAGE = "/3cx-pro";

async function mockBookings(page: Page) {
  await page.route(/bookings\.cloud\.microsoft/, (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: "<!doctype html><title>RDV commercial - E2I VOIP</title><p>Bookings simulé</p>",
    })
  );
}

test.describe("Calendrier Bookings — prise de rendez-vous commercial", () => {
  test("intègre la page Bookings commerciale en iframe", async ({ page }) => {
    await mockBookings(page);
    await page.goto(PAGE);

    const container = page.getByTestId("bookings-calendar");
    await container.scrollIntoViewIfNeeded();

    const iframe = container.locator("iframe");
    await expect(iframe).toHaveAttribute("src", BOOKINGS_EMBED_URL);
    await expect(iframe).toHaveAttribute("title", /rendez-vous/i);
  });

  test("masque le message de chargement une fois Bookings chargé", async ({
    page,
  }) => {
    await mockBookings(page);
    await page.goto(PAGE);

    const container = page.getByTestId("bookings-calendar");
    await container.scrollIntoViewIfNeeded();

    await expect(
      page.frameLocator('[data-testid="bookings-calendar"] iframe').getByText(
        "Bookings simulé"
      )
    ).toBeVisible();
    await expect(page.getByTestId("bookings-calendar-loading")).toHaveCount(0);
  });

  test("n'utilise plus l'embed HubSpot Meetings", async ({ page }) => {
    await mockBookings(page);
    await page.goto(PAGE);
    await page.getByTestId("bookings-calendar").scrollIntoViewIfNeeded();

    await expect(
      page.locator('script[src*="MeetingsEmbedCode.js"]')
    ).toHaveCount(0);
    await expect(page.locator(".meetings-iframe-container")).toHaveCount(0);
  });

  test("propose toujours un lien de secours vers Bookings", async ({ page }) => {
    // Simule un bloqueur ou un pare-feu qui empêche le chargement de l'iframe :
    // le lien de secours doit rester utilisable.
    await page.route(/bookings\.cloud\.microsoft/, (route) => route.abort());

    await page.goto(PAGE);

    const link = page.getByTestId("bookings-calendar-fallback");
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", BOOKINGS_URL);
    await expect(link).toHaveAttribute("target", "_blank");
  });

  test("sur mobile, le lien de secours précède le calendrier", async ({
    page,
  }) => {
    await mockBookings(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(PAGE);

    const container = page.getByTestId("bookings-calendar");
    await container.scrollIntoViewIfNeeded();

    // En cas d'échec, le visiteur ne doit pas avoir à faire défiler un cadre
    // vide de plusieurs écrans pour trouver le lien.
    const linkBox = await page.getByTestId("bookings-calendar-fallback").boundingBox();
    const iframeBox = await container.locator("iframe").boundingBox();
    expect(linkBox && iframeBox).toBeTruthy();
    expect(linkBox!.y).toBeLessThan(iframeBox!.y);
  });

  // Bookings ne communique pas sa hauteur (iframe cross-origin) : le cadre
  // prend une hauteur fixe qui couvre toute la page Bookings, jusqu'au bouton
  // « Réserver » (≈ 2 055 px mesurés le 2026-11-01, page totale ≈ 2 350 px).
  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 375, height: 667 },
  ]) {
    test(`affiche Bookings en pleine hauteur, sans défilement interne (${viewport.width} px)`, async ({
      page,
    }) => {
      await mockBookings(page);
      await page.setViewportSize(viewport);
      await page.goto(PAGE);

      const iframe = page.getByTestId("bookings-calendar").locator("iframe");
      await iframe.scrollIntoViewIfNeeded();

      await expect(iframe).toHaveAttribute("scrolling", "no");
      const box = await iframe.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(2300);
    });
  }

  test("se fond dans la page : ni cadre ni ombre, fond de section assorti à Bookings", async ({
    page,
  }) => {
    await mockBookings(page);
    await page.goto(PAGE);

    const container = page.getByTestId("bookings-calendar");
    await container.scrollIntoViewIfNeeded();

    const frame = container.locator("iframe").locator("..");
    await expect(frame).toHaveCSS("box-shadow", "none");
    await expect(frame).toHaveCSS("border-radius", "0px");

    // Fond de Bookings : #F4F4F4 ; `ui-surface-2` (#F3F4F6) s'y confond.
    const section = page.locator("section", { has: container });
    await expect(section).toHaveCSS("background-color", "rgb(243, 244, 246)");
  });
});

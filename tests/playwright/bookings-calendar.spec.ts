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

  test("sur mobile, le lien de secours précède le calendrier et le cadre tient dans l'écran", async ({
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

    expect(iframeBox!.height).toBeLessThanOrEqual(667);
  });
});

import { test, expect } from "@playwright/test";

/**
 * Le calendrier de prise de RDV commercial est la page Microsoft Bookings
 * partagée Valérie / Alban, intégrée en iframe. Elle remplace l'embed HubSpot
 * Meetings le 2026-10-27.
 *
 * Seule la page `RDVcommercialE2IVOIP1@…` fait foi : une page voisine
 * `RDVCommercialE2IVOIP@…` (sans le « 1 ») est encore publiée et ne doit pas
 * être réutilisée.
 */
const BOOKINGS_URL =
  "https://bookings.cloud.microsoft/book/RDVcommercialE2IVOIP1@e2i-voip.com/";

// Source exacte du code d'intégration fourni par Bookings.
const BOOKINGS_EMBED_URL = `${BOOKINGS_URL}?ismsaljsauthenabled`;

test.describe("Calendrier Bookings — prise de rendez-vous commercial", () => {
  const PAGE = "/3cx-pro";

  test("intègre la page Bookings commerciale en iframe", async ({ page }) => {
    await page.goto(PAGE);

    const container = page.getByTestId("bookings-calendar");
    await container.scrollIntoViewIfNeeded();

    const iframe = container.locator("iframe");
    await expect(iframe).toHaveAttribute("src", BOOKINGS_EMBED_URL);
    await expect(iframe).toHaveAttribute("title", /rendez-vous/i);
  });

  test("n'utilise plus l'embed HubSpot Meetings", async ({ page }) => {
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
    await page.route("**/bookings.cloud.microsoft/**", (route) => route.abort());

    await page.goto(PAGE);

    const link = page.getByTestId("bookings-calendar-fallback");
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", BOOKINGS_URL);
    await expect(link).toHaveAttribute("target", "_blank");
  });
});

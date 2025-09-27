import { test, expect } from "@playwright/test";

const HUBSPOT_SCRIPT_GLOB = "**/js-eu1.hsforms.net/forms/embed/v2.js";

test.describe("Page de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("affiche le hero et le conteneur HubSpot", async ({ page }) => {
    await expect(page).toHaveTitle(/Contact - E2I VoIP/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Contactez nos experts VoIP/i })
    ).toBeVisible();

    await expect(page.getByTestId("contact-form-card")).toBeVisible();
    await expect(page.getByTestId("contact-form-title")).toBeVisible();
    await expect(page.getByTestId("hubspot-form-inline")).toBeAttached();
  });

  test("met en avant les canaux de contact", async ({ page }) => {
    await expect(page.getByTestId("hotline-phone")).toHaveText(/0189 560 500/);
    await expect(page.getByTestId("whatsapp-phone")).toHaveText(/0594 96 35 00/);

    const implantations = [
      "France",
      "Guyane",
      "Guadeloupe",
      "Martinique",
      "La Réunion",
    ];

    for (const city of implantations) {
      await expect(
        page.getByRole("heading", { level: 3, name: city })
      ).toBeVisible();
    }
  });

  test("reste utilisable si le script HubSpot ne charge pas", async ({ page }) => {
    await page.route(HUBSPOT_SCRIPT_GLOB, (route) => route.abort());
    await page.reload();

    await expect(
      page.getByRole("heading", { level: 1, name: /Contactez nos experts VoIP/i })
    ).toBeVisible();
    await expect(page.getByTestId("contact-form-body")).toBeVisible();
    await expect(page.getByTestId("hubspot-form-inline")).toBeAttached();
  });
});

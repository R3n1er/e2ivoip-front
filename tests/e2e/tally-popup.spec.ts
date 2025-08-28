import { test, expect } from "@playwright/test";

test.describe("Tally Embed - Trunk SIP Compteur", () => {
  test("affiche l'embed Tally avec le titre sous la FAQ", async ({ page }) => {
    await page.goto(
      "http://localhost:3000/telephonie-entreprise/trunk-sip-compteur"
    );

    // Le titre du bloc embed
    await expect(
      page.getByRole("heading", { level: 2, name: /Nous contacter pour un devis/i })
    ).toBeVisible();

    // L'iframe doit être présente sans délai
    const tallyIframe = page.locator(
      'iframe[data-tally-src*="tally.so/embed/mDY1bl"]'
    );
    await expect(tallyIframe).toBeVisible();
  });
});

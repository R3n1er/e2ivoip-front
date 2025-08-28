import { test, expect } from "@playwright/test";

test.describe("Tally Popup - Trunk SIP Compteur", () => {
  test("ouvre le popup Tally automatiquement après 15s", async ({ page }) => {
    await page.goto(
      "http://localhost:3000/telephonie-entreprise/trunk-sip-compteur"
    );

    // Attendre un peu plus que 25s pour être robuste (~27s)
    await page.waitForTimeout(27000);

    // Le widget Tally insère un iframe dont la source contient "tally.so"
    const tallyIframe = page.locator('iframe[src*="tally.so"]');
    const count = await tallyIframe.count();
    expect(count).toBeGreaterThan(0);
  });
});

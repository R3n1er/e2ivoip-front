import { test, expect } from "@playwright/test";

test.describe("Tally Embed - Trunk SIP Compteur", () => {
  test("affiche le bloc formulaire avec ses éléments clés", async ({ page }) => {
    await page.goto(
      "/telephonie-entreprise/trunk-sip-compteur"
    );
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { level: 2, name: /Recevez nos tarifs personnalisés/i })
    ).toBeVisible();

    const advantages = [
      "Sans engagement",
      "Données confidentielles",
      "Envoi rapide par email",
      "Expert dédié",
    ];

    for (const label of advantages) {
      await expect(page.locator(`text=${label}`).first()).toBeVisible();
    }

    const tallyIframe = page.locator(
      'iframe[src*="tally.so/embed/7RpEBa"]'
    );
    await expect(tallyIframe).toBeAttached();
  });
});

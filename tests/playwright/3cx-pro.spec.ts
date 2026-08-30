import { expect, test } from "@playwright/test";

const TALLY_3CX_PRO_URL = "https://tally.so/r/EkALv4";

test.describe("Page 3CX PRO Cloud", () => {
  test("affiche l'offre dédiée et des CTA de devis fonctionnels", async ({ page }) => {
    await page.goto("/3cx-pro");

    await expect(page.getByRole("heading", { level: 1, name: /3CX PRO/i })).toBeVisible();
    await expect(
      page.getByText(/standard téléphonique sur une instance cloud dédiée/i),
    ).toBeVisible();

    const quoteLinks = page.locator(`a[href="${TALLY_3CX_PRO_URL}"]`);
    await expect(quoteLinks).toHaveCount(2);

    for (const link of await quoteLinks.all()) {
      await expect(link).toHaveAttribute("href", TALLY_3CX_PRO_URL);
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("reste lisible sans débordement horizontal sur mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/3cx-pro");

    await expect(page.getByRole("heading", { level: 1, name: /3CX PRO/i })).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});

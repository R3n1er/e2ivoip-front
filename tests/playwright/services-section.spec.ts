import { test, expect } from "@playwright/test";

test.describe("Section Services", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.locator("#services").scrollIntoViewIfNeeded();
  });

  test("affiche le titre Monolithe 2026", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /Nos Solutions Phares/i,
      })
    ).toBeVisible();
  });

  test("liste les offres phares (grille Stitch)", async ({ page }) => {
    const titles = [
      "3CX PRO & ENTREPRISE",
      "Trunk SIP",
      "Assistants Vocaux IA",
      "Studio vocal — standards téléphoniques",
    ];

    for (const title of titles) {
      await expect(
        page.locator("#services").getByRole("heading", { level: 3, name: title })
      ).toBeVisible();
    }
  });

  test("met en avant les pastilles IA et les CTA monolithe", async ({ page }) => {
    await expect(
      page.locator("#services").getByText("Réception Illimitée", { exact: true })
    ).toBeVisible();
    await expect(
      page.locator("#services").getByText("Analyse Sémantique", { exact: true })
    ).toBeVisible();

    const ctas = page.locator("#services a.monolith-btn");
    await expect(ctas).toHaveCount(3);
  });

  test("affiche les icônes Lineicons dans la section", async ({ page }) => {
    const icons = page.locator("#services .lni");
    await expect(icons.first()).toBeVisible();
    expect(await icons.count()).toBeGreaterThanOrEqual(4);
  });
});

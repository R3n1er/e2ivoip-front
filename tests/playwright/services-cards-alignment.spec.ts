import { test, expect } from "@playwright/test";

test.describe("Section Services — grille homepage", () => {
  test("les CTA monolithe sont visibles", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.locator("#services").scrollIntoViewIfNeeded();

    const ctas = page.locator("#services a.monolith-btn");
    const count = await ctas.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await expect(ctas.nth(i)).toBeVisible();
    }

    await page.screenshot({
      path: "tests/screenshots/services-bento-aligned.png",
      fullPage: false,
    });
  });

  test("les modules flex conservent une hauteur minimale", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.locator("#services").scrollIntoViewIfNeeded();

    const modules = page.locator('#services div[class*="min-h-"]');
    expect(await modules.count()).toBeGreaterThanOrEqual(4);
  });

  test("la grille responsive 3 colonnes est présente", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.locator("#services").scrollIntoViewIfNeeded();

    const grid = page.locator("#services .max-w-7xl > .grid");
    await expect(grid.first()).toBeVisible();
    await expect(grid.first()).toHaveClass(/grid-cols-1/);
    await expect(grid.first()).toHaveClass(/md:grid-cols-3/);
  });
});

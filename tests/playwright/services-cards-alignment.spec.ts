import { test, expect } from "@playwright/test";

test.describe("Services Section - Alignement des cartes Bento", () => {
  test("les liens de direction des cartes doivent être visibles", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    const links = page.locator('#services a i.lni-arrow-right');
    const linkCount = await links.count();

    expect(linkCount).toBeGreaterThan(0);

    for (let i = 0; i < linkCount; i++) {
      await expect(links.nth(i)).toBeVisible();
    }

    await page.screenshot({
      path: "tests/screenshots/services-bento-aligned.png",
      fullPage: false,
    });

    console.log(`✅ ${linkCount} cartes bento détectées avec flèches visibles`);
  });

  test("toutes les cartes Bento sont bien structurées", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    const items = page.locator('#services [class*="bento-item"]');
    const itemCount = await items.count();

    expect(itemCount).toBeGreaterThan(0);

    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);
      const classes = await item.getAttribute('class');
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-col');
      expect(classes).toContain('justify-between');
    }

    console.log(`✅ ${itemCount} éléments bento avec structure flex correcte (h-full implicite via grid)`);
  });

  test("le conteneur est une grille bento", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    const bentoGrid = page.locator('.bento-grid');
    await expect(bentoGrid).toBeVisible();

    console.log(`✅ Grille bento visible`);
  });
});

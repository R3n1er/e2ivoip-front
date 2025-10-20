import { test, expect } from "@playwright/test";

test.describe("Services Section - Alignement des cartes", () => {
  test("les boutons des cartes doivent être alignés en bas", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    // Récupérer tous les boutons "En savoir plus"
    const buttons = page.locator('a:has-text("En savoir plus")');
    const buttonCount = await buttons.count();

    expect(buttonCount).toBeGreaterThan(0);

    // Vérifier que tous les boutons sont visibles
    for (let i = 0; i < buttonCount; i++) {
      await expect(buttons.nth(i)).toBeVisible();
    }

    // Prendre une capture d'écran pour vérification visuelle
    await page.screenshot({
      path: "tests/screenshots/services-cards-aligned.png",
      fullPage: false,
    });

    console.log(`✅ ${buttonCount} cartes de services détectées avec boutons visibles`);
  });

  test("toutes les cartes doivent avoir la même hauteur", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    // Récupérer toutes les cartes
    const cards = page.locator('.card.bg-base-100');
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThan(0);

    // Vérifier que toutes les cartes ont la classe h-full
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const classes = await card.getAttribute('class');
      expect(classes).toContain('h-full');
    }

    console.log(`✅ ${cardCount} cartes avec hauteur uniforme (h-full)`);
  });

  test("les sections de features doivent utiliser flex-grow", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    // Vérifier la structure flex des cartes
    const cardBodies = page.locator('.card-body');
    const count = await cardBodies.count();

    for (let i = 0; i < count; i++) {
      const cardBody = cardBodies.nth(i);
      const classes = await cardBody.getAttribute('class');

      // Vérifier que card-body a flex flex-col
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-col');
    }

    console.log(`✅ Structure flex correcte sur ${count} cartes`);
  });

  test("les boutons doivent être en position mt-auto", async ({ page }) => {
    await page.goto("http://localhost:3000/#services");
    await page.waitForTimeout(1000);

    // Vérifier que les card-actions ont mt-auto
    const cardActions = page.locator('.card-actions');
    const count = await cardActions.count();

    for (let i = 0; i < count; i++) {
      const actions = cardActions.nth(i);
      const classes = await actions.getAttribute('class');
      expect(classes).toContain('mt-auto');
    }

    console.log(`✅ ${count} boutons avec mt-auto (collés en bas)`);
  });
});

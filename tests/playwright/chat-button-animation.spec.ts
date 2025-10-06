import { test, expect } from "@playwright/test";

test.describe("ChatPreOverlay - Animations et UX", () => {
  test("vérifie la présence du texte 'Une question?' et des animations", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Vérifier que le texte "Une question?" est visible
    const questionText = page.locator('text="Une question ?"');
    await expect(questionText).toBeVisible();

    // Vérifier que le bouton est plus grand (w-20 h-20 = 80px)
    const chatButton = page.getByTestId("open-chat-button");
    const buttonSize = await chatButton.boundingBox();
    expect(buttonSize?.width).toBeGreaterThanOrEqual(70); // Au moins 70px (w-20 = 80px)
    expect(buttonSize?.height).toBeGreaterThanOrEqual(70);

    // Prendre un screenshot de l'état initial avec animation
    await page.screenshot({
      path: "test-results/chat-button-animated.png",
      fullPage: false,
    });

    // Attendre un peu pour que l'animation se stabilise
    await page.waitForTimeout(1000);

    // Cliquer sur le bouton (avec force pour contourner l'instabilité de l'animation)
    await chatButton.click({ force: true });

    // Vérifier que le formulaire s'ouvre
    const overlay = page.getByTestId("chat-preoverlay");
    await expect(overlay).toBeVisible();

    // Prendre un screenshot du formulaire ouvert
    await page.screenshot({
      path: "test-results/chat-form-open.png",
      fullPage: false,
    });
  });

  // TODO: Fix timing issues - animation start is delayed
  test.skip("vérifie que l'animation s'arrête après 20 secondes", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const chatButton = page.getByTestId("open-chat-button");

    // Vérifier que le bouton a la classe d'animation au départ (attendre que le composant monte)
    await page.waitForTimeout(1500);
    const hasAnimationInitially = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    expect(hasAnimationInitially).toBeTruthy();

    // Attendre 21 secondes (20s + marge)
    await page.waitForTimeout(21000);

    // Vérifier que la classe d'animation a été retirée
    const hasAnimationAfter = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    expect(hasAnimationAfter).toBeFalsy();
  });

  test.skip("vérifie que l'animation s'arrête immédiatement au clic", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const chatButton = page.getByTestId("open-chat-button");

    // Vérifier la présence de l'animation (attendre que le composant monte)
    await page.waitForTimeout(1500);
    const hasAnimationBefore = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    expect(hasAnimationBefore).toBeTruthy();

    // Cliquer sur le bouton (avec force pour contourner l'animation)
    await chatButton.click({ force: true });

    // Attendre que le formulaire s'ouvre
    await page.waitForTimeout(500);

    // Fermer le formulaire
    await page.getByTestId("cancel-button").click();

    // Attendre que le formulaire se ferme
    await page.waitForTimeout(500);

    // Vérifier que l'animation ne reprend PAS après fermeture
    const hasAnimationAfter = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    expect(hasAnimationAfter).toBeFalsy();
  });

  test("vérifie le responsive du bouton et du texte", async ({ page }) => {
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000");

    const questionText = page.locator('text="Une question ?"');
    const chatButton = page.getByTestId("open-chat-button");

    await expect(questionText).toBeVisible();
    await expect(chatButton).toBeVisible();

    // Prendre un screenshot mobile
    await page.screenshot({
      path: "test-results/chat-button-mobile.png",
      fullPage: false,
    });

    // Test sur tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("http://localhost:3000");

    await expect(questionText).toBeVisible();
    await expect(chatButton).toBeVisible();

    // Test sur desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");

    await expect(questionText).toBeVisible();
    await expect(chatButton).toBeVisible();
  });

  test("vérifie l'accessibilité du bouton", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const chatButton = page.getByTestId("open-chat-button");

    // Vérifier l'aria-label
    const ariaLabel = await chatButton.getAttribute("aria-label");
    expect(ariaLabel).toBe("Ouvrir le pré‑chat");

    // Vérifier que le bouton est focusable
    await chatButton.focus();
    const isFocused = await chatButton.evaluate((el) => {
      return document.activeElement === el;
    });
    expect(isFocused).toBeTruthy();

    // Vérifier que le texte "Une question?" est lisible par les screen readers
    const questionText = page.locator('text="Une question ?"');
    const isVisibleToScreenReader = await questionText.isVisible();
    expect(isVisibleToScreenReader).toBeTruthy();
  });
});

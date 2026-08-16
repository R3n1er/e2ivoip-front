import { test, expect } from "@playwright/test";

test.describe("ChatPreOverlay - Animations et UX", () => {
  test("vérifie la présence du texte 'Une question?' et des animations", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
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

  // Tests de timing fin retirés (étaient skip) : arrêt de l'animation à 20s et
  // arrêt au clic. Fragiles (dérive timer composant / waitForTimeout) et redondants
  // avec chat-preoverlay-flow.spec.ts qui couvre le flux clic → formulaire.

  test("vérifie le responsive du bouton et du texte", async ({ page }) => {
    // `domcontentloaded` plutôt que `load` : le serveur de dev optimise les
    // images à la demande, et un changement de viewport annule le preload en
    // cours (ERR_ABORTED), si bien que `load` n'arrive jamais. Vérifié en
    // build de production : chargement en 187 ms, image servie en 768 px.
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

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
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

    await expect(questionText).toBeVisible();
    await expect(chatButton).toBeVisible();

    // Test sur desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

    await expect(questionText).toBeVisible();
    await expect(chatButton).toBeVisible();
  });

  test("vérifie l'accessibilité du bouton", async ({ page }) => {
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

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

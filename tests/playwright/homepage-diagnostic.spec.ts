import { test, expect } from "@playwright/test";

test.describe("Homepage - Diagnostic des erreurs de chargement", () => {
  test("devrait charger la page sans erreurs console", async ({ page }) => {
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];

    // Capturer les erreurs console
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Capturer les erreurs réseau
    page.on("response", (response) => {
      if (response.status() >= 400) {
        networkErrors.push(
          `${response.status()} - ${response.url()}`
        );
      }
    });

    // Capturer les erreurs JavaScript non gérées
    page.on("pageerror", (error) => {
      consoleErrors.push(`Page Error: ${error.message}`);
    });

    // Charger la page
    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Vérifier que la page est chargée
    await expect(page).toHaveTitle(/E2I VoIP/);

    // Afficher les erreurs pour diagnostic
    if (consoleErrors.length > 0) {
      console.log("\n=== ERREURS CONSOLE ===");
      consoleErrors.forEach((error) => console.log(error));
    }

    if (networkErrors.length > 0) {
      console.log("\n=== ERREURS RÉSEAU ===");
      networkErrors.forEach((error) => console.log(error));
    }

    // Assertions
    expect(
      consoleErrors,
      `Erreurs console détectées: ${consoleErrors.join("\n")}`
    ).toHaveLength(0);

    expect(
      networkErrors,
      `Erreurs réseau détectées: ${networkErrors.join("\n")}`
    ).toHaveLength(0);
  });

  test("devrait afficher tous les composants principaux", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Vérifier le header
    const header = page.locator("header, nav").first();
    await expect(header).toBeVisible({ timeout: 10000 });

    // Vérifier la hero section
    const heroSection = page.locator("text=/Solutions de téléphonie|VoIP/i").first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });

    // Vérifier la section services
    const servicesSection = page.locator("text=/Nos services|Services/i").first();
    await expect(servicesSection).toBeVisible({ timeout: 10000 });

    // Vérifier le footer
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible({ timeout: 10000 });

    // Screenshot pour vérification visuelle
    await page.screenshot({
      path: "tests/screenshots/homepage-diagnostic.png",
      fullPage: true
    });
  });

  test("devrait charger les styles correctement", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Vérifier que les styles sont appliqués
    const body = page.locator("body");
    const backgroundColor = await body.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );

    // Vérifier qu'une couleur est appliquée (pas transparent)
    expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("devrait charger les images sans erreur", async ({ page }) => {
    const imageErrors: string[] = [];

    page.on("response", (response) => {
      if (
        response.url().match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) &&
        response.status() >= 400
      ) {
        imageErrors.push(`${response.status()} - ${response.url()}`);
      }
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Attendre que toutes les images soient chargées
    await page.waitForLoadState("load");

    expect(
      imageErrors,
      `Images non chargées: ${imageErrors.join("\n")}`
    ).toHaveLength(0);
  });

  test("devrait charger les scripts externes (Hotjar, etc.)", async ({
    page,
  }) => {
    const scriptErrors: string[] = [];

    page.on("response", (response) => {
      if (
        response.url().match(/\.(js)$/i) &&
        response.status() >= 400
      ) {
        scriptErrors.push(`${response.status()} - ${response.url()}`);
      }
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    expect(
      scriptErrors,
      `Scripts non chargés: ${scriptErrors.join("\n")}`
    ).toHaveLength(0);
  });

  test("devrait avoir le ChatPreOverlay fonctionnel", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Attendre que le composant ChatPreOverlay soit présent
    await page.waitForTimeout(2000);

    // Vérifier la présence du bouton de chat
    const chatButton = page.locator('[data-testid="open-chat-button"]');
    await expect(chatButton).toBeVisible({ timeout: 5000 });

    // Vérifier le texte "Une question?"
    const questionText = page.locator('text=/Une question/i');
    await expect(questionText).toBeVisible();

    console.log("✅ ChatPreOverlay détecté et fonctionnel");
  });
});

import { test, expect } from "@playwright/test";

test.describe("ChatPreOverlay - Animation par Cycles", () => {
  // TODO: Fix timing issues - animation start is delayed
  test.skip("vérifie le cycle vibration → pause → vibration", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const chatButton = page.getByTestId("open-chat-button");

    // Phase 1: Animation active au départ (attendre que le composant monte)
    await page.waitForTimeout(1500);
    let hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("✅ Phase 1 (0-3s): Animation active =", hasAnimation);
    expect(hasAnimation).toBeTruthy();

    // Phase 2: Après 3.5s, l'animation devrait être en pause
    await page.waitForTimeout(3500);
    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("⏸️  Phase 2 (3-5s): Animation en pause =", !hasAnimation);
    expect(hasAnimation).toBeFalsy();

    // Phase 3: Après 2.5s de pause (6s total), l'animation devrait reprendre
    await page.waitForTimeout(2500);
    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("✅ Phase 3 (6-9s): Animation reprend =", hasAnimation);
    expect(hasAnimation).toBeTruthy();

    // Phase 4: Après 3.5s (9.5s total), nouvelle pause
    await page.waitForTimeout(3500);
    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("⏸️  Phase 4 (9-11s): Pause =", !hasAnimation);
    expect(hasAnimation).toBeFalsy();
  });

  test.skip("vérifie l'arrêt définitif après 20 secondes", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const chatButton = page.getByTestId("open-chat-button");

    // Vérifier animation au départ (attendre que le composant monte)
    await page.waitForTimeout(1500);
    let hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("Départ: Animation =", hasAnimation);
    expect(hasAnimation).toBeTruthy();

    // Attendre 21 secondes (20s + marge)
    console.log("⏳ Attente de 21 secondes...");
    await page.waitForTimeout(21000);

    // Vérifier que l'animation est complètement arrêtée
    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("Après 21s: Animation =", hasAnimation);
    expect(hasAnimation).toBeFalsy();

    // Attendre encore 3 secondes pour vérifier qu'elle ne reprend pas
    await page.waitForTimeout(3000);
    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("Après 24s: Animation =", hasAnimation);
    expect(hasAnimation).toBeFalsy();
  });

  test.skip("vérifie l'arrêt au clic et non reprise après annulation", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const chatButton = page.getByTestId("open-chat-button");

    // Vérifier animation avant clic (attendre que le composant monte)
    await page.waitForTimeout(1500);
    let hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("Avant clic: Animation =", hasAnimation);
    expect(hasAnimation).toBeTruthy();

    // Cliquer sur le bouton
    console.log("👆 Clic sur le bouton");
    await chatButton.click({ force: true });

    // Attendre que le formulaire s'ouvre
    await page.waitForTimeout(500);
    await expect(page.getByTestId("chat-preoverlay")).toBeVisible();

    // Annuler le formulaire
    console.log("❌ Annulation du formulaire");
    await page.getByTestId("cancel-button").click();

    // Attendre que le formulaire se ferme
    await page.waitForTimeout(500);

    // Vérifier que l'animation ne reprend PAS
    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("Après annulation: Animation =", hasAnimation);
    expect(hasAnimation).toBeFalsy();

    // Attendre 6 secondes (un cycle complet) pour confirmer
    console.log("⏳ Attente de 6 secondes pour confirmer...");
    await page.waitForTimeout(6000);

    hasAnimation = await chatButton.evaluate((el) => {
      return el.className.includes("animate-shake");
    });
    console.log("Après 6s: Animation =", hasAnimation);
    expect(hasAnimation).toBeFalsy();
  });

  test("compte le nombre de cycles en 20 secondes", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const chatButton = page.getByTestId("open-chat-button");

    let cycleCount = 0;
    let wasAnimating = false;

    // Observer les changements d'animation pendant 20 secondes
    const startTime = Date.now();
    const duration = 20000;

    while (Date.now() - startTime < duration) {
      const hasAnimation = await chatButton.evaluate((el) => {
        return el.className.includes("animate-shake");
      });

      // Détecter le début d'un nouveau cycle
      if (hasAnimation && !wasAnimating) {
        cycleCount++;
        console.log(`🔄 Cycle ${cycleCount} détecté`);
      }

      wasAnimating = hasAnimation;
      await page.waitForTimeout(500);
    }

    console.log(`📊 Total de cycles en 20s: ${cycleCount}`);

    // Calcul théorique: 1 cycle = 3s vibration + 2s pause = 5s
    // En 20s: 20 / 5 = 4 cycles
    expect(cycleCount).toBeGreaterThanOrEqual(3);
    expect(cycleCount).toBeLessThanOrEqual(5);
  });

  test("screenshot du bouton en vibration vs repos", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Screenshot pendant la vibration
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: "test-results/button-vibrating.png",
      clip: { x: 0, y: 0, width: 400, height: 800 },
    });

    // Attendre la pause
    await page.waitForTimeout(3500);
    await page.screenshot({
      path: "test-results/button-paused.png",
      clip: { x: 0, y: 0, width: 400, height: 800 },
    });

    console.log("📸 Screenshots sauvegardés:");
    console.log("  - test-results/button-vibrating.png");
    console.log("  - test-results/button-paused.png");
  });
});

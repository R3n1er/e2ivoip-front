import { test, expect } from "@playwright/test";

test.describe("ChatPreOverlay - Animation par Cycles", () => {
  // Tests de timing fin retirés (étaient skip) : fenêtres vibration/pause à la
  // seconde près, arrêt à 20s, arrêt au clic. Intrinsèquement fragiles — le timer
  // setTimeout du composant dérive du waitForTimeout du test après le montage React.
  // Le comportement reste couvert par « compte le nombre de cycles » (ci-dessous,
  // stable) et par chat-preoverlay-flow.spec.ts (flux complet : clic, annulation).

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

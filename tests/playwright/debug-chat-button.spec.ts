import { test, expect } from "@playwright/test";

test.describe("Debug ChatPreOverlay Button", () => {
  test("vérifie que le bouton de chat est visible et réagit au clic", async ({
    page,
  }) => {
    // Aller sur la page d'accueil
    await page.goto("http://localhost:3000");

    // Attendre que la page soit complètement chargée
    await page.waitForLoadState("networkidle");

    // Prendre un screenshot de la page
    await page.screenshot({ path: "debug-homepage.png", fullPage: true });

    // Chercher le bouton de chat
    const chatButton = page.getByTestId("open-chat-button");

    // Vérifier si le bouton existe dans le DOM
    const buttonExists = await chatButton.count();
    console.log("Nombre de boutons trouvés:", buttonExists);

    if (buttonExists === 0) {
      console.log("❌ Le bouton de chat n'existe pas dans le DOM");
      console.log("HTML de la page:");
      const html = await page.content();
      console.log(html.substring(0, 5000));
    } else {
      console.log("✅ Le bouton de chat existe");

      // Vérifier si le bouton est visible
      const isVisible = await chatButton.isVisible();
      console.log("Bouton visible:", isVisible);

      if (!isVisible) {
        console.log("❌ Le bouton existe mais n'est pas visible");

        // Vérifier le CSS
        const styles = await chatButton.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            display: computed.display,
            visibility: computed.visibility,
            opacity: computed.opacity,
            position: computed.position,
            zIndex: computed.zIndex,
          };
        });
        console.log("Styles du bouton:", styles);
      } else {
        console.log("✅ Le bouton est visible");

        // Tester le clic
        await chatButton.click();
        console.log("✅ Clic effectué");

        // Attendre et vérifier si le formulaire apparaît
        await page.waitForTimeout(500);

        const overlay = page.getByTestId("chat-preoverlay");
        const overlayVisible = await overlay.isVisible();
        console.log("Formulaire visible après clic:", overlayVisible);

        if (overlayVisible) {
          console.log("✅ Le formulaire s'est ouvert correctement");
          await page.screenshot({
            path: "debug-form-opened.png",
            fullPage: true,
          });
        } else {
          console.log("❌ Le formulaire ne s'est pas ouvert");
        }
      }
    }

    // Vérifier la console pour des erreurs
    const consoleLogs: string[] = [];
    page.on("console", (msg) => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    });

    await page.reload();
    await page.waitForTimeout(2000);

    console.log("\nLogs de la console:");
    consoleLogs.forEach((log) => console.log(log));
  });
});

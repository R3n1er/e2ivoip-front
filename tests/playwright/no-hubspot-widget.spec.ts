import { test, expect } from "@playwright/test";

test.describe("HubSpot Conversations désactivé", () => {
  test("le widget HubSpot Conversations n'est pas chargé et le pré‑chat est visible", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    // Le script de widget ne doit pas être présent
    const hasWidgetScript = await page.evaluate(
      () =>
        !!document.querySelector(
          'script[src*="hs-scripts.com"]:not(#hs-script-loader)'
        )
    );
    expect(hasWidgetScript).toBeFalsy();

    // Le bouton du pré‑chat doit être visible
    const openBtn = page.getByTestId("open-chat-button");
    await expect(openBtn).toBeVisible();

    // Cliquer et vérifier la présence du formulaire
    await openBtn.click();
    await expect(page.getByTestId("chat-preoverlay")).toBeVisible();

    // Pas d'erreurs console bloquantes
    expect(consoleErrors.join("\n")).not.toMatch(
      /hydration|ReferenceError|TypeError/
    );
  });
});

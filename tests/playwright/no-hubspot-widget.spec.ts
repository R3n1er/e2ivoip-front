import { test, expect } from "@playwright/test";

test.describe("HubSpot Conversations différé", () => {
  test("le tracking est chargé sans afficher automatiquement le widget", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    await expect(page.locator("#hs-script-loader")).toHaveAttribute(
      "src",
      /js-eu1\.hs-scripts\.com\/26878201\.js/
    );

    const settings = await page.evaluate(
      () => (window as any).hsConversationsSettings
    );
    expect(settings?.loadImmediately).toBe(false);

    await expect
      .poll(
        () =>
          page.evaluate(
            () => typeof (window as any).HubSpotConversations?.widget?.load
          ),
        { timeout: 15000 }
      )
      .toBe("function");

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

import { test, expect } from "@playwright/test";

test.describe("ChatPreOverlay - Flux complet", () => {
  test("ouvre le formulaire pré-chat au clic, remplit les informations et lance la conversation", async ({
    page,
  }) => {
    // Intercepter les appels API
    let apiCalled = false;
    let apiPromiseResolver: (() => void) | null = null;
    const apiPromise = new Promise<void>((resolve) => {
      apiPromiseResolver = resolve;
    });

    await page.route("**/api/hubspot/ingest-conversation", async (route) => {
      apiCalled = true;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, contactId: "test-123" }),
      });
      apiPromiseResolver?.();
    });

    // Aller sur la page d'accueil
    await page.goto("/");

    // 1. Vérifier que le bouton de chat est visible
    const openButton = page.getByTestId("open-chat-button");
    await expect(openButton).toBeVisible();
    await expect(openButton).toHaveAttribute(
      "aria-label",
      "Ouvrir le pré‑chat"
    );

    // 2. Cliquer sur le bouton pour ouvrir le formulaire
    await openButton.click();

    // 3. Vérifier que le formulaire apparaît
    const chatOverlay = page.getByTestId("chat-preoverlay");
    await expect(chatOverlay).toBeVisible();

    // 4. Vérifier la présence du titre et du message d'introduction
    await expect(chatOverlay.getByText("Avant de commencer")).toBeVisible();
    await expect(
      chatOverlay.getByText(/On fait connaissance en quelques infos simples/)
    ).toBeVisible();

    // 5. Vérifier que les champs de formulaire sont présents
    const firstNameInput = page.getByTestId("firstname-input");
    const lastNameInput = page.getByTestId("lastname-input");
    const companyInput = page.getByTestId("company-input");
    const emailInput = page.getByTestId("email-input");
    const phoneInput = page.getByTestId("phone-input");

    await expect(firstNameInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(companyInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();

    // 6. Vérifier que le bouton de soumission est désactivé initialement
    const submitButton = page.getByTestId("submit-button");
    await expect(submitButton).toBeDisabled();

    // 7. Remplir le formulaire avec des données valides
    await firstNameInput.fill("Jean");
    await lastNameInput.fill("Dupont");
    await companyInput.fill("Test SARL");
    await emailInput.fill("jean.dupont@test.fr");
    await phoneInput.fill("0612345678");

    // 8. Vérifier que le bouton de soumission est maintenant activé
    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toHaveText("Ouvrir le chat");

    // 9. Soumettre le formulaire
    await submitButton.click();

    // 10. Attendre que l'API soit appelée
    await apiPromise;

    // 11. Attendre la fermeture du formulaire après soumission
    await expect(chatOverlay).not.toBeVisible({ timeout: 5000 });

    // 12. Vérifier que le bouton de chat réapparaît
    await expect(openButton).toBeVisible();

    // 13. Vérifier que l'API a été appelée
    expect(apiCalled).toBeTruthy();

    // 14. Vérifier l'identification HubSpot (optionnel - peut ne pas être disponible dans test)
    const hubspotIdentified = await page.evaluate(() => {
      const hsq = (window as any)._hsq;
      return Array.isArray(hsq) && hsq.length > 0;
    });
    // Note: HubSpot peut ne pas être chargé dans l'environnement de test, ce n'est pas bloquant
    console.log("HubSpot identifié:", hubspotIdentified);
  });

  test("valide les champs obligatoires", async ({ page }) => {
    await page.goto("/");

    // Ouvrir le formulaire
    await page.getByTestId("open-chat-button").click();
    await expect(page.getByTestId("chat-preoverlay")).toBeVisible();

    // Remplir seulement le prénom et vérifier que le bouton reste désactivé
    await page.getByTestId("firstname-input").fill("Jean");

    const submitButton = page.getByTestId("submit-button");
    await expect(submitButton).toBeDisabled();

    // Remplir tous les champs obligatoires
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");

    // Le bouton devrait être activé maintenant
    await expect(submitButton).toBeEnabled();
  });

  test("valide le format d'email", async ({ page }) => {
    await page.goto("/");

    // Ouvrir le formulaire
    await page.getByTestId("open-chat-button").click();

    // Remplir avec un email invalide
    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("email-invalide");

    // Vérifier que le bouton reste désactivé
    const submitButton = page.getByTestId("submit-button");
    await expect(submitButton).toBeDisabled();

    // Corriger l'email
    await page.getByTestId("email-input").clear();
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");

    // Le bouton devrait être activé
    await expect(submitButton).toBeEnabled();
  });

  test("permet d'annuler et ferme le formulaire", async ({ page }) => {
    await page.goto("/");

    // Ouvrir le formulaire
    const openButton = page.getByTestId("open-chat-button");
    await openButton.click();

    const chatOverlay = page.getByTestId("chat-preoverlay");
    await expect(chatOverlay).toBeVisible();

    // Remplir partiellement le formulaire
    await page.getByTestId("firstname-input").fill("Jean");

    // Cliquer sur Annuler
    await page.getByTestId("cancel-button").click();

    // Vérifier que le formulaire est fermé
    await expect(chatOverlay).not.toBeVisible();

    // Vérifier que le bouton de chat réapparaît
    await expect(openButton).toBeVisible();

    // Rouvrir le formulaire pour vérifier que les champs sont réinitialisés
    await openButton.click();
    await expect(chatOverlay).toBeVisible();

    const firstNameInput = page.getByTestId("firstname-input");
    await expect(firstNameInput).toHaveValue("");
  });

  test("gère les erreurs de soumission API", async ({ page }) => {
    // Simuler une erreur API
    await page.route("**/api/hubspot/ingest-conversation", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Erreur serveur" }),
      });
    });

    await page.goto("/");

    // Ouvrir et remplir le formulaire
    await page.getByTestId("open-chat-button").click();
    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");

    // Capturer les erreurs console
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    // Soumettre
    await page.getByTestId("submit-button").click();

    // Attendre un peu pour laisser le temps à l'erreur d'être loggée
    await page.waitForTimeout(1000);

    // Vérifier qu'une erreur a été loggée
    expect(consoleErrors.some((err) => err.includes("Erreur"))).toBeTruthy();
  });

  test("n'affiche pas d'erreur lors de l'interaction HubSpot", async ({
    page,
  }) => {
    // Mock de l'API
    await page.route("**/api/hubspot/ingest-conversation", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, contactId: "test-123" }),
      });
    });

    // Capturer les erreurs console
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    // Ouvrir et soumettre le formulaire
    await page.getByTestId("open-chat-button").click();
    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");
    await page.getByTestId("submit-button").click();

    // Attendre la fermeture
    await expect(page.getByTestId("chat-preoverlay")).not.toBeVisible({
      timeout: 5000,
    });

    // Vérifier que l'identification HubSpot a été tentée (présence de _hsq)
    const hubspotInitialized = await page.evaluate(() => {
      const hsq = (window as any)._hsq;
      return Array.isArray(hsq);
    });
    expect(hubspotInitialized).toBeTruthy();

    // Vérifier qu'aucune erreur HubSpot n'a été générée
    // (le code doit gérer gracieusement l'absence de HubSpot)
    const hasHubspotError = consoleErrors.some((err) =>
      err.toLowerCase().includes("hubspot")
    );
    expect(hasHubspotError).toBeFalsy();
  });
});

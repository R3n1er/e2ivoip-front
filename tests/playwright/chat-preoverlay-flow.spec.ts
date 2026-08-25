import { test, expect } from "@playwright/test";

test.describe("ChatPreOverlay - Flux complet", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("https://js-eu1.hs-scripts.com/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        // Reproduit le comportement réel du SDK Conversations vérifié en prod
        // (ADR 2026-08-25) : avec `loadImmediately: false`, l'API apparaît mais
        // le widget ne s'initialise QUE si un `load()` est émis (kick). Après
        // l'initialisation, `open()` ouvre la fenêtre et crée l'iframe visible
        // (~448×804) ; `widgetOpen` sur un `load()` prématuré est ignoré.
        body: `
          window.__hubspotWidgetCalls = [];
          window.__hubspotInputTexts = [];
          let initialized = false;
          const startInit = () => {
            if (initialized) return;
            initialized = true;
            setTimeout(() => {
              const mountIframe = () => {
                let f = document.getElementById("hubspot-conversations-iframe");
                if (!f) {
                  f = document.createElement("iframe");
                  f.id = "hubspot-conversations-iframe";
                  f.style.width = "448px";
                  f.style.height = "804px";
                  document.body.appendChild(f);
                }
              };
              window.HubSpotConversations.widget = {
                status: () => ({ loaded: true, pending: false }),
                load: (options) => {
                  window.__hubspotWidgetCalls.push(["load", options]);
                  if (options && options.widgetOpen) mountIframe();
                },
                open: () => {
                  window.__hubspotWidgetCalls.push(["open"]);
                  mountIframe();
                },
                setInputText: (text) => {
                  window.__hubspotInputTexts.push(text);
                },
              };
            }, 200);
          };
          window.HubSpotConversations = {
            widget: {
              status: () => ({ loaded: false, pending: false }),
              load: () => {
                window.__hubspotWidgetCalls.push(["load"]);
                startInit();
              },
              open: () => {},
            },
          };
          (window.hsConversationsOnReady || []).forEach((callback) => callback());
        `,
      });
    });
  });

  test("ouvre le formulaire pré-chat au clic, remplit les informations et lance la conversation", async ({
    page,
  }) => {
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

    await page.goto("/");

    const openButton = page.getByTestId("open-chat-button");
    await expect(openButton).toBeVisible();
    await expect(openButton).toHaveAttribute("aria-label", "Ouvrir le pré‑chat");

    await openButton.click();

    const chatOverlay = page.getByTestId("chat-preoverlay");
    await expect(chatOverlay).toBeVisible();
    await expect(chatOverlay).toHaveAttribute("role", "dialog");
    await expect(chatOverlay).toHaveAttribute("aria-modal", "true");

    await expect(chatOverlay.getByText("Avant de commencer")).toBeVisible();
    await expect(
      chatOverlay.getByText(/On fait connaissance en quelques infos simples/)
    ).toBeVisible();

    const firstNameInput = page.getByLabel(/Prénom/);
    const lastNameInput = page.getByLabel(/Nom/);
    const companyInput = page.getByLabel(/Entreprise/);
    const emailInput = page.getByLabel(/Email professionnel/);
    const phoneInput = page.getByLabel(/Téléphone/);

    await expect(firstNameInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(companyInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();

    const submitButton = page.getByTestId("submit-button");
    await expect(submitButton).toBeEnabled();

    await firstNameInput.fill("Jean");
    await lastNameInput.fill("Dupont");
    await companyInput.fill("Test SARL");
    await emailInput.fill("jean.dupont@test.fr");
    await phoneInput.fill("0612345678");

    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toHaveText("Ouvrir le chat");

    await submitButton.click();

    await apiPromise;

    await expect(chatOverlay).not.toBeVisible({ timeout: 5000 });
    await expect(openButton).toBeVisible();
    expect(apiCalled).toBeTruthy();

    const hubspotState = await page.evaluate(() => {
      const commands = (window as any)._hsq ?? [];
      return {
        commands,
        widgetCalls: (window as any).__hubspotWidgetCalls ?? [],
      };
    });
    const identifyIndex = hubspotState.commands.findIndex(
      (command: unknown[]) => command[0] === "identify"
    );
    const pageViewIndex = hubspotState.commands.findIndex(
      (command: unknown[]) => command[0] === "trackPageView"
    );
    expect(identifyIndex).toBeGreaterThanOrEqual(0);
    expect(pageViewIndex).toBeGreaterThan(identifyIndex);
    // Le SDK ignore `widgetOpen` tant que le widget n'est pas initialisé : le
    // flux fiable est d'attendre `status().loaded` puis d'appeler `open()`.
    // Un appel `load({ widgetOpen: true })` sur widget non initialisé laisse
    // le launcher fermé en production (ADR 2026-08-25) — on l'interdit donc.
    const openCall = hubspotState.widgetCalls.find(
      (call: unknown[]) => call[0] === "open"
    );
    expect(openCall).toBeDefined();
    const prematureLoad = hubspotState.widgetCalls.find(
      (call: unknown[]) =>
        call[0] === "load" && (call[1] as any)?.widgetOpen === true
    );
    expect(prematureLoad).toBeUndefined();

    // Le champ de saisie du chat doit être pré-rempli avec les infos du pré-chat.
    await page.waitForTimeout(500);
    const inputTexts = await page.evaluate(
      () => (window as any).__hubspotInputTexts ?? []
    );
    expect(inputTexts).toHaveLength(1);
    expect(inputTexts[0]).toContain("Jean Dupont");
    expect(inputTexts[0]).toContain("Test SARL");
    expect(inputTexts[0]).toContain("jean.dupont@test.fr");
    expect(inputTexts[0]).toContain("0612345678");
  });

  test("annonce les champs obligatoires et place le focus sur la première erreur", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("open-chat-button").click();
    await expect(page.getByTestId("chat-preoverlay")).toBeVisible();

    const submitButton = page.getByTestId("submit-button");
    await submitButton.click();

    const firstNameInput = page.getByLabel(/Prénom/);
    await expect(firstNameInput).toBeFocused();
    await expect(firstNameInput).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByTestId("firstname-error")).toBeVisible();
  });

  test("valide le format d'email", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("open-chat-button").click();

    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("email-invalide");

    const submitButton = page.getByTestId("submit-button");
    await submitButton.click();
    await expect(page.getByTestId("email-error")).toBeVisible();

    await page.getByTestId("email-input").clear();
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");

    await expect(page.getByTestId("email-input")).toHaveAttribute(
      "aria-invalid",
      "false"
    );
  });

  test("ferme avec Échap et restitue le focus au bouton d'ouverture", async ({
    page,
  }) => {
    await page.goto("/");

    const openButton = page.getByTestId("open-chat-button");
    await openButton.click();

    const dialog = page.getByRole("dialog", { name: "Avant de commencer" });
    await expect(dialog).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(dialog).not.toBeVisible();
    await expect(openButton).toBeFocused();
  });

  test("retient le focus clavier dans le dialogue", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("open-chat-button").click();

    const firstNameInput = page.getByLabel(/Prénom/);
    await firstNameInput.focus();
    await page.keyboard.press("Shift+Tab");

    await expect(page.getByTestId("submit-button")).toBeFocused();
  });

  test("permet d'annuler et ferme le formulaire", async ({ page }) => {
    await page.goto("/");

    const openButton = page.getByTestId("open-chat-button");
    await openButton.click();

    const chatOverlay = page.getByTestId("chat-preoverlay");
    await expect(chatOverlay).toBeVisible();

    await page.getByTestId("firstname-input").fill("Jean");

    await page.getByTestId("cancel-button").click();

    await expect(chatOverlay).not.toBeVisible();
    await expect(openButton).toBeVisible();

    await openButton.click();
    await expect(chatOverlay).toBeVisible();

    const firstNameInput = page.getByTestId("firstname-input");
    await expect(firstNameInput).toHaveValue("");
  });

  test("gère les erreurs de soumission API", async ({ page }) => {
    await page.route("**/api/hubspot/ingest-conversation", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Erreur serveur" }),
      });
    });

    await page.goto("/");

    await page.getByTestId("open-chat-button").click();
    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");

    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.getByTestId("submit-button").click();

    const visibleError = page.getByTestId("chat-submit-error");
    await expect(visibleError).toBeVisible();
    await expect(visibleError).toContainText("Vérifiez votre connexion");
    await expect(visibleError).toBeFocused();
    await expect(page.getByTestId("chat-preoverlay")).toBeVisible();
    await expect(page.getByTestId("firstname-input")).toHaveValue("Jean");

    expect(consoleErrors.some((err) => err.includes("Erreur"))).toBeTruthy();
  });

  test("n'affiche pas d'erreur lors de l'interaction HubSpot", async ({
    page,
  }) => {
    await page.route("**/api/hubspot/ingest-conversation", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, contactId: "test-123" }),
      });
    });

    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");

    await page.getByTestId("open-chat-button").click();
    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");
    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("chat-preoverlay")).not.toBeVisible({
      timeout: 5000,
    });

    const hubspotInitialized = await page.evaluate(() => {
      const hsq = (window as any)._hsq;
      return Array.isArray(hsq);
    });
    expect(hubspotInitialized).toBeTruthy();

    const hasHubspotError = consoleErrors.some((err) =>
      err.toLowerCase().includes("hubspot")
    );
    expect(hasHubspotError).toBeFalsy();
  });
});

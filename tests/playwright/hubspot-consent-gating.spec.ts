import { test, expect } from "@playwright/test";

const HS_SCRIPT = "#hs-script-loader";

/**
 * Le script HubSpot dépose des cookies de suivi (__hstc, hubspotutk). Il n'est
 * donc chargé qu'à partir du moment où le visiteur le justifie :
 *  - soit il accepte les cookies ;
 *  - soit il demande explicitement le chat (exemption « service demandé »).
 *
 * Un visiteur qui refuse doit malgré tout pouvoir discuter : le refus ne bloque
 * jamais l'ouverture du chat.
 */
test.describe("HubSpot Conversations — chargement à la demande", () => {
  test("n'est pas chargé tant que le visiteur n'a rien demandé", async ({
    page,
  }) => {
    await page.goto("/");

    // Le bandeau de consentement est visible : aucun choix n'a été fait.
    await expect(
      page.getByRole("region", { name: "Consentement aux cookies" })
    ).toBeVisible();

    await expect(page.locator(HS_SCRIPT)).toHaveCount(0);

    // Le pré-chat reste disponible malgré l'absence de script.
    await expect(page.getByTestId("open-chat-button")).toBeVisible();
  });

  test("est chargé dès que le visiteur accepte les cookies", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator(HS_SCRIPT)).toHaveCount(0);

    await page.getByRole("button", { name: "Accepter" }).click();

    await expect(page.locator(HS_SCRIPT)).toHaveAttribute(
      "src",
      /js-eu1\.hs-scripts\.com\/26878201\.js/
    );
  });

  test("reste absent après un refus, jusqu'à ce que le chat soit demandé", async ({
    page,
  }) => {
    await page.route("**/api/hubspot/ingest-conversation", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, contactId: "test-123" }),
      });
    });

    await page.route("https://js-eu1.hs-scripts.com/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: `
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
                  if (options && options.widgetOpen) mountIframe();
                },
                open: () => mountIframe(),
              };
            }, 200);
          };
          window.HubSpotConversations = {
            widget: {
              status: () => ({ loaded: false, pending: false }),
              load: () => startInit(),
              open: () => {},
            },
          };
          (window.hsConversationsOnReady || []).forEach((cb) => cb());
        `,
      });
    });

    await page.goto("/");

    await page.getByRole("button", { name: "Refuser" }).click();
    await expect(page.locator(HS_SCRIPT)).toHaveCount(0);

    // Le refus ne doit pas empêcher de lancer une conversation.
    await page.getByTestId("open-chat-button").click();
    await page.getByTestId("firstname-input").fill("Jean");
    await page.getByTestId("lastname-input").fill("Dupont");
    await page.getByTestId("company-input").fill("Test SARL");
    await page.getByTestId("email-input").fill("jean.dupont@test.fr");
    await page.getByTestId("submit-button").click();

    // Le script est monté à la demande, et le chat s'ouvre sans erreur.
    await expect(page.locator(HS_SCRIPT)).toHaveAttribute(
      "src",
      /js-eu1\.hs-scripts\.com\/26878201\.js/
    );
    await expect(page.getByTestId("chat-preoverlay")).not.toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByTestId("chat-submit-error")).toHaveCount(0);
  });

  test("garde le widget fermé au chargement même après acceptation", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Accepter" }).click();

    await expect
      .poll(
        () =>
          page.evaluate(
            () => (window as any).hsConversationsSettings?.loadImmediately
          ),
        { timeout: 15000 }
      )
      .toBe(false);
  });
});

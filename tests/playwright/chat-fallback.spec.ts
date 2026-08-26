import { test, expect } from "@playwright/test";

/**
 * Le widget natif HubSpot (`//js-eu1.hs-scripts.com/${portalId}.js`) est
 * catégorisé « trackers » par la majorité des bloqueurs du marché. Quand
 * le script est bloqué, `ERR_BLOCKED_BY_CLIENT` empêche l'API de se
 * créer. Le composant `ChatFallback` doit alors afficher un bandeau de
 * contact direct après ~6 s.
 */

test.describe("ChatFallback - bannière alternative quand le chat est bloqué", () => {
  test("s'affiche quand le script HubSpot est bloqué (nochat=1)", async ({
    page,
  }) => {
    // ?nochat=1 force l'affichage immédiat du fallback, sans attendre 6 s.
    await page.route("https://js-eu1.hs-scripts.com/**", (route) => route.abort());
    await page.goto("/?nochat=1");

    const fallback = page.getByTestId("chat-fallback");
    await expect(fallback).toBeVisible({ timeout: 5000 });

    // Le numéro de téléphone France doit être lisible (pas d'obfuscation agressive)
    await expect(fallback).toContainText("01 89 56 05 00");

    // Lien cliquable vers /contact
    const contactLink = fallback.getByRole("link", { name: /formulaire de contact/i });
    await expect(contactLink).toHaveAttribute("href", "/contact");

    // Lien tel: — doit correspondre à la constante TERRITORY_PHONES (France)
    const telLink = fallback.locator('a[href^="tel:"]');
    await expect(telLink).toHaveAttribute("href", "tel:+33189560500");
  });

  test("peut être masqué via la croix — mémorisation localStorage", async ({
    page,
  }) => {
    await page.route("https://js-eu1.hs-scripts.com/**", (route) => route.abort());
    await page.goto("/?nochat=1");

    const fallback = page.getByTestId("chat-fallback");
    await expect(fallback).toBeVisible();

    await fallback.getByRole("button", { name: /masquer ce bandeau/i }).click();
    await expect(fallback).not.toBeVisible();

    // La persistance empêche la réapparition, même si nochat=1 est dans l'URL.
    await page.goto("/?nochat=1");
    await expect(
      page.getByTestId("chat-fallback"),
      "le bandeau ne doit pas réapparaître après dismissal"
    ).toHaveCount(0, { timeout: 2000 });
  });

  test("ne s'affiche PAS quand le widget HubSpot charge normalement", async ({
    page,
  }) => {
    // Mock fidèle au comportement réel HubSpot : le script appelle chaque
    // callback déjà présent dans `hsConversationsOnReady` puis pousse à son
    // tour dedans pour les abonnements ultérieurs. C'est ce déclenchement
    // que ChatFallback attend désormais (pas la simple existence de
    // `window.HubSpotConversations`, qui peut être vraie même si l'appel
    // réseau nécessaire au widget est bloqué).
    await page.route("https://js-eu1.hs-scripts.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: `
          window.HubSpotConversations = window.HubSpotConversations || { widget: {} };
          (window.hsConversationsOnReady || []).forEach((cb) => cb());
          window.hsConversationsOnReady = { push: (cb) => cb() };
        `,
      })
    );
    await page.goto("/");

    // Ancrer le test : le script mocké est bien monté et expose l'API.
    await expect(page.locator("#hs-script-loader")).toHaveCount(1);

    // Dépasser la fenêtre de détection du composant (6 s) puis vérifier
    // l'absence persistante du fallback — sans dépendre d'un timing interne.
    await page.waitForTimeout(7000);

    await expect(page.getByTestId("chat-fallback")).toHaveCount(0);
  });
});

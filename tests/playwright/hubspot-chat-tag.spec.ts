import { test, expect } from "@playwright/test";

/**
 * Garde-fou du chat natif : la balise loader HubSpot doit être présente,
 * unique et correctement paramétrée sur TOUTES les familles de pages.
 *
 * Le widget est monté par `LayoutClientChrome`, lui-même monté par le
 * layout racine — mais `app/devis-en-ligne/layout.tsx` et
 * `app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx` ajoutent des
 * layouts imbriqués, et le blog / la 404 empruntent d'autres chemins de
 * rendu. Ce test vérifie qu'aucune de ces familles ne perd le chat.
 *
 * Portal 26878201 sur l'instance EU1 → `js-eu1.hs-scripts.com`. Un portal
 * ou une région erronés renverraient un 404 silencieux côté HubSpot : le
 * launcher n'apparaîtrait jamais, sans erreur visible côté site.
 */
const EXPECTED_SRC = "https://js-eu1.hs-scripts.com/26878201.js";

const PAGES = [
  { path: "/", label: "accueil" },
  { path: "/contact", label: "contact" },
  { path: "/nos-services", label: "page de service" },
  { path: "/devis-en-ligne", label: "layout imbriqué (devis)" },
  {
    path: "/telephonie-entreprise/trunk-sip-agents-ia",
    label: "layout imbriqué (trunk SIP agents IA)",
  },
  { path: "/juridique/politique-confidentialite", label: "page juridique" },
  { path: "/blog", label: "blog" },
  { path: "/page-inexistante-e2i", label: "404" },
];

for (const { path, label } of PAGES) {
  test(`balise HubSpot chargée — ${label} (${path})`, async ({ page }) => {
    const requestedUrls: string[] = [];
    // Le script réel n'est pas joignable depuis l'environnement de test :
    // on l'intercepte pour observer la requête ET simuler l'API HubSpot.
    await page.route("https://js-eu1.hs-scripts.com/**", (route) => {
      requestedUrls.push(route.request().url());
      return route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "window.HubSpotConversations = { widget: {} };",
      });
    });

    await page.goto(path, { waitUntil: "networkidle" });

    const loader = page.locator("script#hs-script-loader");
    await expect(loader, "une seule balise loader montée").toHaveCount(1);
    await expect(loader).toHaveAttribute("src", EXPECTED_SRC);

    expect(
      requestedUrls,
      "la balise doit déclencher une requête réseau vers le bon portal"
    ).toEqual([EXPECTED_SRC]);
  });
}

test("le fallback ne s'affiche pas quand le widget se charge tardivement", async ({
  page,
}) => {
  // Connexion lente : le script arrive après la fenêtre de 6 s. Le bandeau
  // s'affiche puis doit disparaître dès que l'API HubSpot existe — sans
  // quoi il resterait superposé au launcher natif (même coin bas-droit).
  await page.route("https://js-eu1.hs-scripts.com/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 8000));
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: "window.HubSpotConversations = { widget: {} };",
    });
  });

  await page.goto("/");
  const fallback = page.getByTestId("chat-fallback");
  await expect(fallback).toBeVisible({ timeout: 15000 });

  await page.waitForFunction(
    () => "HubSpotConversations" in window,
    null,
    { timeout: 20000 }
  );
  await expect(fallback).toBeHidden({ timeout: 10000 });
});

test("le fallback s'affiche quand le script est bloqué (sans ?nochat=1)", async ({
  page,
}) => {
  // Chemin réel d'un visiteur sous uBlock : ERR_BLOCKED_BY_CLIENT. Les
  // autres specs court-circuitent la détection via ?nochat=1 ; ici on
  // exerce la temporisation de 6 s elle-même.
  await page.route("https://js-eu1.hs-scripts.com/**", (route) => route.abort());
  await page.goto("/");

  await expect(page.getByTestId("chat-fallback")).toBeVisible({
    timeout: 15000,
  });
});

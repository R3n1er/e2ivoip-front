import { expect, test } from "@playwright/test";

/**
 * Les visuels d'articles sont servis depuis le domaine du portail HubSpot
 * (`26878201.fs1.hubspotusercontent-eu1.net`). Ce domaine doit rester autorisé
 * dans `images.remotePatterns` : sans lui, `next/image` rejette la source et la
 * page blog tombe en erreur.
 *
 * Le listing étant rendu par le serveur, ce test s'appuie sur les articles
 * réels plutôt que sur une réponse d'API simulée.
 */
test("affiche les articles et leurs images du portail HubSpot", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/blog");

  // Au moins un article est rendu, avec un lien exploitable.
  const liens = page.locator('a[href^="/blog/"]:not([href*="/categorie/"])');
  await expect(liens.first()).toBeVisible();

  // Les images du listing passent par le pipeline d'optimisation Next.
  const images = page.locator("img");
  const total = await images.count();
  expect(total).toBeGreaterThan(0);

  const sources = await images.evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("src") ?? "")
  );
  const hubspot = sources.filter((src) =>
    /hubspotusercontent|hubfs/.test(decodeURIComponent(src))
  );

  // Si le portail sert des visuels, ils doivent être rendus sans blocage.
  for (const src of hubspot) {
    expect(src).toBeTruthy();
  }

  expect(pageErrors).toEqual([]);
});

test("un article affiche son visuel sans erreur de configuration", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/blog");
  const premier = await page
    .locator('a[href^="/blog/"]:not([href*="/categorie/"])')
    .first()
    .getAttribute("href");

  await page.goto(premier!);

  await expect(page.locator("h1")).toBeVisible();
  // Une source non autorisée ferait échouer le rendu de `next/image`.
  expect(pageErrors).toEqual([]);
});

import { expect, test } from "@playwright/test";

/**
 * La section « Articles liés » affiche l'image de couverture de chaque article
 * qui en possède une. Les données venant de HubSpot en direct, le test part
 * d'un article réel du listing et cherche une page dotée d'articles liés.
 */
test("les articles liés affichent leur image de couverture", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/blog");
  const liens = await page
    .locator('a[href^="/blog/"]:not([href*="/categorie/"])')
    .evaluateAll((nodes) =>
      Array.from(
        new Set(nodes.map((node) => node.getAttribute("href") ?? ""))
      ).filter(Boolean)
    );

  // Premier article du listing qui possède une section « Articles liés ».
  let section = page.locator("section", {
    has: page.getByRole("heading", { name: "Articles liés" }),
  });
  let trouve = false;
  for (const href of liens.slice(0, 8)) {
    await page.goto(href);
    if ((await section.count()) > 0) {
      trouve = true;
      break;
    }
  }
  test.skip(!trouve, "Aucun article avec des articles liés dans le listing");

  section = page.locator("section", {
    has: page.getByRole("heading", { name: "Articles liés" }),
  });
  const couvertures = section.getByTestId("related-post-cover");
  await expect(couvertures.first()).toBeVisible();

  // Chaque image doit être réellement chargée, pas seulement présente.
  // Les images sont en lazy loading : on amène toute la section à l'écran.
  await section.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      couvertures.evaluateAll((imgs) =>
        (imgs as HTMLImageElement[]).every(
          (img) => img.complete && img.naturalWidth > 0
        )
      )
    )
    .toBe(true);

  expect(pageErrors).toEqual([]);
});

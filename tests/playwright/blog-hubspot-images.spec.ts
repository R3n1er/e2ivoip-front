import { expect, test } from "@playwright/test";

test("affiche un article avec une image du portail HubSpot", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.route("**/api/blog/list?**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        posts: [
          {
            id: "hubspot-post-1",
            title: "Article HubSpot de test",
            excerpt: "Un article utilisé pour valider le rendu du blog.",
            content: "Contenu de test",
            publishDate: "2026-08-16T12:00:00.000Z",
            author: "E2I VoIP",
            tags: [],
            slug: "article-hubspot-de-test",
            featuredImage:
              "https://26878201.fs1.hubspotusercontent-eu1.net/hubfs/26878201/3cx-new-webclient.png",
          },
        ],
        total: 1,
        metadata: { tags: [], authors: [], years: [2026] },
      }),
    });
  });

  await page.goto("http://localhost:3000/blog");

  await expect(
    page.getByRole("link", { name: "Article HubSpot de test" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Lire l.article/ })).toBeVisible();
  expect(pageErrors).toEqual([]);
});

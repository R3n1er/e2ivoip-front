import { expect, test } from "@playwright/test";
import { HOME_PAGE_TITLE } from "@/lib/site";

// Le titre est importé de sa source unique (lib/site.ts) plutôt que recopié :
// la version en dur avait divergé du code, et ce test vérifiait une chaîne
// que plus aucune page ne servait. Ce qui compte ici est que le titre servi
// dans le HTML soit bien celui déclaré — pas sa valeur littérale, déjà
// verrouillée par tests/site-metadata.test.ts.
const HOME_TITLE = HOME_PAGE_TITLE;

test("la page d'accueil expose ses métadonnées sociales", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(HOME_TITLE);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    HOME_TITLE,
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    HOME_TITLE,
  );

  const openGraphImage = page.locator('meta[property="og:image"]');
  await expect(openGraphImage).toHaveAttribute(
    "content",
    "https://www.e2i-voip.com/images/e2i-voip-partage.png",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content",
    "630",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://www.e2i-voip.com/images/e2i-voip-partage.png",
  );
});

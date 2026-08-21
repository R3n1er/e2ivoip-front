import { expect, test } from "@playwright/test";

const HOME_TITLE = "Opérateur de services télécom DOM | E2I VoIP";

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

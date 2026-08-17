import { expect, test } from "@playwright/test";

test("la page d'accueil expose l'image de partage E2I VoIP", async ({ page }) => {
  await page.goto("/");

  const openGraphImage = page.locator('meta[property="og:image"]');
  await expect(openGraphImage).toHaveAttribute(
    "content",
    "https://www.e2i-voip.com/images/e2i-voip-partage.png",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://www.e2i-voip.com/images/e2i-voip-partage.png",
  );
});

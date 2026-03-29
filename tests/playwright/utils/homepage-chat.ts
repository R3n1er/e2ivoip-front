import type { Page } from "@playwright/test";

/**
 * Le ChatPreOverlay ne déclenche l'animation qu'après scroll (section post-Hero visible).
 * Sans scroll, les tests restent valides pour le bouton / le formulaire.
 */
export async function scrollPastHeroForChat(page: Page): Promise<void> {
  await page.getByRole("heading", { name: /Ils nous font confiance/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
}

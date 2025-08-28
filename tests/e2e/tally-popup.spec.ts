import { test, expect } from "@playwright/test";

test.describe("Tally Embed - Trunk SIP Compteur", () => {
  test("affiche l'embed Tally avec le titre et les éléments UX améliorés", async ({ page }) => {
    await page.goto(
      "http://localhost:3000/telephonie-entreprise/trunk-sip-compteur"
    );

    // Le nouveau titre du bloc embed
    await expect(
      page.getByRole("heading", { level: 2, name: /Obtenez votre devis sur-mesure/i })
    ).toBeVisible();

    // Badge "Devis personnalisé gratuit"
    await expect(
      page.getByText("Devis personnalisé gratuit")
    ).toBeVisible();

    // Vérifier les avantages du formulaire (utiliser un sélecteur plus spécifique pour éviter les doublons)
    const formAdvantagesSection = page.locator('.flex.flex-wrap.justify-center.gap-6.mb-8').first();
    await expect(formAdvantagesSection.getByText("100% Gratuit")).toBeVisible();
    await expect(formAdvantagesSection.getByText("Sans engagement")).toBeVisible();
    await expect(formAdvantagesSection.getByText("Réponse rapide")).toBeVisible();
    await expect(formAdvantagesSection.getByText("Expert dédié")).toBeVisible();

    // L'iframe doit être présente sans délai
    const tallyIframe = page.locator(
      'iframe[data-tally-src*="tally.so/embed/mDY1bl"]'
    );
    await expect(tallyIframe).toBeVisible();
  });
});

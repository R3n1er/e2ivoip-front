import { test, expect } from "@playwright/test";

test.describe("Trunk SIP Illimité Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/telephonie-entreprise/trunk-sip-illimite");
    await page.waitForLoadState("networkidle");
  });

  test("présente le hero et les bénéfices clés", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: /Trunk SIP Illimité/i })
    ).toBeVisible();

    await expect(page.getByText(/Forfait illimité/)).toBeVisible();
    await expect(page.locator("text=/Fixes illimités France/i").first()).toBeVisible();
    await expect(page.locator("text=/Fixes illimités DOM/i").first()).toBeVisible();
    await expect(
      page.locator("text=/4, 8 ou 16 lignes simultanées/i").first()
    ).toBeVisible();
  });

  test("met en avant les forfaits disponibles", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 3, name: /Nos forfaits illimités/i })
    ).toBeVisible();

    const tiers = [
      "4 appels simultanés",
      "8 appels simultanés",
      "16 appels simultanés",
    ];

    for (const tier of tiers) {
      await expect(page.locator(`text=${tier}`).first()).toBeVisible();
    }

    await expect(page.locator("text=Sur devis").first()).toBeVisible();
  });

  test("affiche la section contact et les numéros", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: /Parlons de votre projet/i })
    ).toBeVisible();

    const contacts = [
      "France : 01 89 56 05 00",
      "Guyane : 05 94 96 35 00",
      "Guadeloupe : 05 90 17 35 00",
    ];

    for (const contact of contacts) {
      await expect(page.getByText(contact)).toBeVisible();
    }
  });

  test("propose un appel à l'action final", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: /Passez à l'illimité dès maintenant/i })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Demander un devis/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Appeler un conseiller/i })
    ).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Section Services", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#services").scrollIntoViewIfNeeded();
  });

  test("affiche le titre et l'introduction", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: /Nos solutions de téléphonie IP/i })
    ).toBeVisible();

    await expect(
      page
        .locator("#services")
        .getByText(
          "Des solutions complètes pour transformer votre téléphonie d'entreprise"
        )
    ).toBeVisible();
  });

  test("liste les offres phares", async ({ page }) => {
    // « 3CX SMB PRO » et « 3CX PRO Cloud » sont réunis sous une seule carte
    // « Standard téléphonique 3CX » : le prospect cherche un standard, pas un
    // nom de licence (arbitrage Alban, 2026-09-19). La grille passe de 5 à 4.
    const titles = [
      "Standard téléphonique 3CX",
      "Trunk SIP DOM",
      "Trunk SIP agents IA",
      "Studio d'Enregistrement",
    ];

    for (const title of titles) {
      await expect(
        page
          .locator("#services")
          .getByRole("heading", { level: 3, name: title })
      ).toBeVisible();
    }

    await expect(page.locator("#services .grid > div.rounded-xl")).toHaveCount(4);
  });

  test("met en avant les badges et les CTA", async ({ page }) => {
    // Le badge « Entreprise » disparaît avec la fusion des deux cartes 3CX :
    // il portait la carte « 3CX PRO Cloud », désormais réunie sous
    // « Standard téléphonique 3CX » (badge « Idéal PME »).
    const badges = ["Populaire", "Idéal PME", "Innovation", "Pro"];

    for (const badge of badges) {
      await expect(
        page.locator("#services").getByText(badge, { exact: true })
      ).toBeVisible();
    }

    const ctaButtons = page
      .locator("#services")
      .getByRole("link", { name: "En savoir plus" });
    await expect(ctaButtons).toHaveCount(4);
  });

  test("affiche les icônes et la grille responsive", async ({ page }) => {
    await expect(
      page.locator("#services .grid.md\\:grid-cols-2")
    ).toBeVisible();

    const icons = page.locator("#services svg");
    await expect(icons.first()).toBeVisible();
    expect(await icons.count()).toBeGreaterThan(10);
  });
});

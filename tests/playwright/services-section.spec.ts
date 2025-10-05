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
    const titles = [
      "Trunk SIP DOM",
      "3CX SMB PRO",
      "3CX PRO Cloud",
      "Assistants Vocaux IA",
      "Studio d'Enregistrement",
    ];

    for (const title of titles) {
      await expect(
        page
          .locator("#services")
          .getByRole("heading", { level: 3, name: title })
      ).toBeVisible();
    }

    await expect(page.locator("#services .card")).toHaveCount(5);
  });

  test("met en avant les badges et les CTA", async ({ page }) => {
    const badges = [
      "Populaire",
      "Idéal PME",
      "Entreprise",
      "Innovation",
      "Pro",
    ];

    for (const badge of badges) {
      await expect(
        page.locator("#services").getByText(badge, { exact: true })
      ).toBeVisible();
    }

    const ctaButtons = page
      .locator("#services")
      .getByRole("link", { name: "En savoir plus" });
    await expect(ctaButtons).toHaveCount(5);
  });

  test("affiche les icônes et la grille responsive", async ({ page }) => {
    await expect(
      page.locator("#services .grid.md\\:grid-cols-2.lg\\:grid-cols-3")
    ).toBeVisible();

    const icons = page.locator("#services .lni");
    await expect(icons.first()).toBeVisible();
    expect(await icons.count()).toBeGreaterThan(10);
  });
});

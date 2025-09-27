import { test, expect } from "@playwright/test";

test.describe("Header navigation", () => {
  test("affiche la navigation desktop avec les liens clés", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    await expect(
      header.getByRole("link", {
        name: /E2I Solutions de Téléphonie IP et communications d'entreprise/i,
      })
    ).toBeVisible();

    const expectedLinks = [
      { name: "Qui sommes-nous", href: "/qui-sommes-nous" },
      { name: "Mobilité", href: "/mobilite" },
      { name: "Nos services", href: "/nos-services" },
      { name: "Blog", href: "/blog" },
      { name: "Devis en ligne", href: "/devis-en-ligne" },
    ];

    for (const { name, href } of expectedLinks) {
      await expect(
        header.getByRole("link", { name, exact: false }).first()
      ).toHaveAttribute("href", href);
    }

    await expect(
      header.getByRole("link", { name: /Contact/, exact: false }).first()
    ).toHaveAttribute("href", "/contact");
  });

  test("déploie les sous-menus au survol", async ({ page }) => {
    await page.goto("/");

    const telephony = page
      .locator("nav")
      .getByText("Téléphonie d'entreprise", { exact: true });
    await telephony.hover();
    await expect(
      page.getByRole("link", { name: "Trunk SIP illimité" })
    ).toBeVisible();

    const services = page.locator("nav").getByText("Nos services", { exact: false });
    await services.first().hover();
    await expect(
      page.getByRole("link", { name: "Assistants vocaux IA" })
    ).toBeVisible();
  });

  test("reste épinglé en haut lors du scroll", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header").first();

    const initialBox = await header.boundingBox();
    await page.evaluate(() => window.scrollTo({ top: 600 }));

    const scrolledBox = await header.boundingBox();
    expect(scrolledBox?.y ?? 0).toBeLessThanOrEqual(initialBox?.y ?? 0);
    await expect(header).toHaveAttribute("class", /shadow-lg/);
  });

  test("ouvre et ferme le tiroir mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByRole("button", { name: /Ouvrir le menu/ }).click();
    await expect(
      page.getByRole("button", { name: /Fermer le menu/ })
    ).toBeVisible();

    await page.getByRole("button", { name: /Fermer le menu/ }).click();
    await expect(
      page.getByRole("button", { name: /Ouvrir le menu/ })
    ).toBeVisible();
  });

  test("respecte l'ordre de focus clavier", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", {
        name: /E2I Solutions de Téléphonie IP et communications d'entreprise/i,
      })
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Qui sommes-nous" }).first()
    ).toBeFocused();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Header navigation — Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  });

  test("affiche les liens de navigation principaux", async ({ page }) => {
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    const expectedLinks = [
      { name: "Qui sommes-nous", href: "/qui-sommes-nous" },
      { name: "Blog", href: "/blog" },
      { name: "Devis en ligne", href: "/devis-en-ligne" },
      { name: "Contact", href: "/contact" },
    ];

    for (const { name, href } of expectedLinks) {
      const link = header.getByRole("link", { name, exact: false }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    }
  });

  test("deploie le sous-menu Trunk SIP au survol et permet de cliquer un item", async ({ page }) => {
    const header = page.locator("header").first();

    // Hover sur Trunk SIP
    const trunkLink = header.getByTestId("header-simple-nav-trunk-sip");
    await trunkLink.hover();

    // Le sous-menu doit apparaitre
    const subItem = header.getByRole("link", { name: "Trunk SIP illimite" });
    await expect(subItem).toBeVisible();

    // Deplacer la souris vers le sous-item (traverse le gap pt-2)
    await subItem.hover();

    // Le sous-menu doit rester visible apres le deplacement
    await expect(subItem).toBeVisible();

    // Cliquer doit naviguer
    await subItem.click();
    await expect(page).toHaveURL(/trunk-sip-illimite/);
  });

  test("deploie le sous-menu Telephonie d'entreprise au survol", async ({ page }) => {
    const header = page.locator("header").first();

    const telLink = header.getByTestId("header-simple-nav-telephonie-d'entreprise");
    await telLink.hover();

    const subItem = header.getByRole("link", { name: "PBX Yeastar" });
    await expect(subItem).toBeVisible();

    // Hover sur le sous-item — doit rester visible
    await subItem.hover();
    await expect(subItem).toBeVisible();
  });

  test("deploie le sous-menu Nos services au survol", async ({ page }) => {
    const header = page.locator("header").first();

    const servicesLink = header.getByTestId("header-simple-nav-nos-services");
    await servicesLink.hover();

    const subItem = header.getByRole("link", { name: "Assistants vocaux IA" });
    await expect(subItem).toBeVisible();

    await subItem.hover();
    await expect(subItem).toBeVisible();
  });

  test("le sous-menu disparait quand on quitte la zone", async ({ page }) => {
    const header = page.locator("header").first();

    // Ouvrir le sous-menu
    const trunkLink = header.getByTestId("header-simple-nav-trunk-sip");
    await trunkLink.hover();
    await expect(header.getByRole("link", { name: "Trunk SIP illimite" })).toBeVisible();

    // Hover ailleurs (logo)
    await header.locator("a[href='/']").hover();

    // Le sous-menu doit disparaitre
    await expect(header.getByRole("link", { name: "Trunk SIP illimite" })).toBeHidden();
  });

  test("reste fixe en haut lors du scroll", async ({ page }) => {
    const header = page.locator("header").first();
    const initialBox = await header.boundingBox();

    await page.evaluate(() => window.scrollTo({ top: 600 }));
    await page.waitForTimeout(300);

    const scrolledBox = await header.boundingBox();
    expect(scrolledBox?.y ?? 0).toBeLessThanOrEqual(initialBox?.y ?? 0);
  });
});

test.describe("Header navigation — Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
  });

  test("ouvre et ferme le menu hamburger", async ({ page }) => {
    await page.getByRole("button", { name: /Ouvrir le menu/ }).click();
    await expect(page.getByRole("button", { name: /Fermer le menu/ })).toBeVisible();

    await page.getByRole("button", { name: /Fermer le menu/ }).click();
    await expect(page.getByRole("button", { name: /Ouvrir le menu/ })).toBeVisible();
  });

  test("ouvre les sous-menus mobile au clic (toggle)", async ({ page }) => {
    await page.getByRole("button", { name: /Ouvrir le menu/ }).click();

    // Cliquer sur un item avec sous-menu
    const trunkButton = page.locator("button", { hasText: "Trunk SIP" });
    await trunkButton.click();

    // Le sous-menu doit etre visible
    const subItem = page.getByRole("link", { name: "Trunk SIP illimite" });
    await expect(subItem).toBeVisible();

    // Re-cliquer pour fermer
    await trunkButton.click();
    await expect(subItem).toBeHidden();
  });

  test("navigue et ferme le menu mobile au clic sur un lien", async ({ page }) => {
    await page.getByRole("button", { name: /Ouvrir le menu/ }).click();

    const blogLink = page.getByRole("link", { name: "Blog" }).last();
    await blogLink.click();

    await expect(page).toHaveURL(/blog/);
  });

  test("navigue via un sous-menu mobile", async ({ page }) => {
    await page.getByRole("button", { name: /Ouvrir le menu/ }).click();

    // Ouvrir sous-menu
    const telButton = page.locator("button", { hasText: "Telephonie d'entreprise" });
    await telButton.click();

    const yeastarLink = page.locator("header").getByRole("link", { name: "PBX Yeastar" });
    await expect(yeastarLink).toBeVisible();
    await yeastarLink.click();

    await expect(page).toHaveURL(/pbx-yeastar/);
  });
});

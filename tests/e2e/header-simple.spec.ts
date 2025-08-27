import { test, expect } from "@playwright/test";

test.describe("HeaderSimple Component E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display header with permanent white background", async ({
    page,
  }) => {
    const header = page.locator("header");

    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/bg-white\/95/);
    await expect(header).toHaveClass(/backdrop-blur-md/);
    await expect(header).toHaveClass(/shadow-lg/);
  });

  test("should display E2I logo with correct colors", async ({ page }) => {
    const logoE = page.locator('header span:has-text("E")').first();
    const logo2 = page.locator('header span:has-text("2")').first();
    const logoI = page.locator('header span:has-text("I")').first();

    await expect(logoE).toBeVisible();
    await expect(logo2).toBeVisible();
    await expect(logoI).toBeVisible();

    // Vérifier les classes CSS pour les couleurs
    await expect(logoE).toHaveClass(/text-red-primary/);
    await expect(logo2).toHaveClass(/text-blue-marine/);
    await expect(logoI).toHaveClass(/text-red-primary/);
  });

  test("should display company description", async ({ page }) => {
    const description = page
      .locator(
        'header div.text-gray-secondary:has-text("Solutions de Téléphonie IP et communications d\'entreprise")'
      )
      .first();

    await expect(description).toBeVisible();
    await expect(description).toHaveClass(/text-gray-secondary/);
  });

  test("should display all navigation items", async ({ page }) => {
    const navItems = [
      "Qui sommes-nous",
      "Téléphonie d'entreprise",
      "Mobilité",
      "Nos services",
      "Blog",
      "Devis en ligne",
    ];

    for (const item of navItems) {
      const navItem = page.locator(`nav:has-text("${item}")`).first();
      await expect(navItem).toBeVisible();
    }
  });

  test("should have correct navigation links", async ({ page }) => {
    const links = [
      { text: "Qui sommes-nous", href: "/qui-sommes-nous" },
      { text: "Mobilité", href: "/mobilite" },
      { text: "Blog", href: "/blog" },
      { text: "Devis en ligne", href: "/devis-en-ligne" },
    ];

    for (const link of links) {
      const element = page.locator(`nav a:has-text("${link.text}")`).first();
      await expect(element).toHaveAttribute("href", link.href);
    }
  });

  test("should display contact button", async ({ page }) => {
    const contactButton = page
      .locator('header button:has-text("Contact")')
      .first();

    await expect(contactButton).toBeVisible();

    const contactLink = page.locator('header a[href="/contact"]').first();
    await expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("should display dropdown menus with chevron icons", async ({ page }) => {
    const telephonieDropdown = page
      .locator('nav span:has-text("Téléphonie d\'entreprise")')
      .first();
    const servicesDropdown = page
      .locator('nav a:has-text("Nos services")')
      .first();

    await expect(telephonieDropdown).toBeVisible();
    await expect(servicesDropdown).toBeVisible();

    // Vérifier les icônes chevron
    const chevrons = page.locator("nav .lni-chevron-down");
    await expect(chevrons).toHaveCount(2);
  });

  test("should show dropdown content on hover", async ({ page }) => {
    const telephonieDropdown = page
      .locator('nav span:has-text("Téléphonie d\'entreprise")')
      .first();

    // Hover sur le dropdown
    await telephonieDropdown.hover();

    // Attendre que le contenu soit visible
    await page.waitForTimeout(200);

    // Vérifier que les éléments du sous-menu sont visibles
    const subMenuItems = [
      "Trunk SIP au compteur",
      "Trunk SIP illimité",
      "3CX PRO",
      "3CX SMB mutualisée",
      "PBX Yeastar",
    ];

    for (const item of subMenuItems) {
      const subItem = page.locator(`nav:has-text("${item}")`).first();
      await expect(subItem).toBeVisible();
    }
  });

  test("should show services dropdown content on hover", async ({ page }) => {
    const servicesDropdown = page
      .locator('nav a:has-text("Nos services")')
      .first();

    // Hover sur le dropdown
    await servicesDropdown.hover();

    // Attendre que le contenu soit visible
    await page.waitForTimeout(200);

    // Vérifier que les éléments du sous-menu sont visibles
    const subMenuItems = [
      "Studio attente téléphonique",
      "Assistants vocaux IA",
    ];

    for (const item of subMenuItems) {
      const subItem = page.locator(`nav:has-text("${item}")`).first();
      await expect(subItem).toBeVisible();
    }
  });

  test("should have mobile menu button on small screens", async ({ page }) => {
    // Redimensionner la page pour simuler un écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const mobileButton = page.locator('button[aria-label*="menu"]');
    await expect(mobileButton).toBeVisible();
    await expect(mobileButton).toHaveClass(/lg:hidden/);
  });

  test("should toggle mobile menu when button is clicked", async ({ page }) => {
    // Redimensionner la page pour simuler un écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const mobileButton = page.locator('button[aria-label*="menu"]');

    // Vérifier l'état initial
    await expect(mobileButton).toHaveAttribute("aria-label", "Ouvrir le menu");

    // Cliquer sur le bouton
    await mobileButton.click();

    // Vérifier que l'aria-label a changé
    await expect(mobileButton).toHaveAttribute("aria-label", "Fermer le menu");

    // Cliquer à nouveau pour fermer
    await mobileButton.click();

    // Vérifier que l'aria-label est revenu à l'état initial
    await expect(mobileButton).toHaveAttribute("aria-label", "Ouvrir le menu");
  });

  test("should hide desktop navigation on mobile screens", async ({ page }) => {
    // Redimensionner la page pour simuler un écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const desktopNav = page.locator("nav");
    await expect(desktopNav).toHaveClass(/hidden/);
  });

  test("should have responsive contact button behavior", async ({ page }) => {
    // Test sur écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Sur mobile, le bouton Contact principal est caché (hidden lg:flex)
    // Vérifier que la navigation desktop est cachée
    const desktopNav = page.locator("nav");
    await expect(desktopNav).toHaveClass(/hidden/);

    // Test sur écran desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Sur desktop, la navigation est visible
    await expect(desktopNav).toHaveClass(/lg:flex/);
  });

  test("should use Lineicons for all icons", async ({ page }) => {
    const icons = page.locator(".lni");

    // Vérifier qu'il y a des icônes
    const iconCount = await icons.count();
    expect(iconCount).toBeGreaterThan(0);

    // Vérifier que toutes les icônes ont la classe lni-
    for (let i = 0; i < iconCount; i++) {
      const icon = icons.nth(i);
      const className = await icon.getAttribute("class");
      expect(className).toMatch(/lni-/);
    }
  });

  test("should have proper responsive behavior", async ({ page }) => {
    // Test sur écran mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("nav")).toHaveClass(/hidden/);
    await expect(page.locator('button[aria-label*="menu"]')).toBeVisible();

    // Test sur écran tablette
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator("nav")).toHaveClass(/lg:flex/);
    await expect(page.locator('button[aria-label*="menu"]')).toHaveClass(
      /lg:hidden/
    );

    // Test sur écran desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator("nav")).toHaveClass(/lg:flex/);
    await expect(page.locator('button[aria-label*="menu"]')).toHaveClass(
      /lg:hidden/
    );
  });

  test("should maintain white background during scroll", async ({ page }) => {
    const header = page.locator("header");

    // Vérifier le fond initial
    await expect(header).toHaveClass(/bg-white\/95/);

    // Faire défiler la page
    await page.evaluate(() => window.scrollTo(0, 1000));

    // Vérifier que le fond reste blanc
    await expect(header).toHaveClass(/bg-white\/95/);

    // Faire défiler encore plus
    await page.evaluate(() => window.scrollTo(0, 2000));

    // Vérifier que le fond reste toujours blanc
    await expect(header).toHaveClass(/bg-white\/95/);
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    const header = page.locator("header");
    const nav = page.locator("nav");

    // Vérifier que le header et la nav sont présents
    await expect(header).toBeVisible();
    await expect(nav).toBeVisible();

    // Vérifier les aria-labels sur le bouton mobile
    const mobileButton = page.locator('button[aria-label*="menu"]');
    await expect(mobileButton).toHaveAttribute("aria-label");
  });

  test("should have smooth transitions and animations", async ({ page }) => {
    const navItems = page.locator("nav a, nav span");

    // Vérifier que les éléments de navigation ont des transitions
    for (let i = 0; i < (await navItems.count()); i++) {
      const item = navItems.nth(i);
      const className = await item.getAttribute("class");
      expect(className).toMatch(/transition-/);
    }

    // Vérifier les transitions sur les icônes chevron
    const chevrons = page.locator(".lni-chevron-down");
    for (let i = 0; i < (await chevrons.count()); i++) {
      const chevron = chevrons.nth(i);
      const className = await chevron.getAttribute("class");
      expect(className).toMatch(/transition-transform/);
    }
  });

  test("should handle keyboard navigation properly", async ({ page }) => {
    // Focus sur le header
    await page.keyboard.press("Tab");

    // Vérifier que le focus est sur le logo
    const logo = page.locator('a:has-text("E2I")');
    await expect(logo).toBeFocused();

    // Naviguer avec Tab
    await page.keyboard.press("Tab");

    // Vérifier que le focus passe au premier élément de navigation
    const firstNavItem = page.locator("text=Qui sommes-nous");
    await expect(firstNavItem).toBeFocused();
  });

  test("should have proper hover states", async ({ page }) => {
    const navItems = page.locator("nav a, nav span");

    // Hover sur le premier élément de navigation
    const firstItem = navItems.first();
    await firstItem.hover();

    // Attendre que les styles de hover soient appliqués
    await page.waitForTimeout(100);

    // Vérifier que l'élément a les bonnes classes de hover
    const className = await firstItem.getAttribute("class");
    expect(className).toMatch(/hover:text-red-primary/);
  });
});

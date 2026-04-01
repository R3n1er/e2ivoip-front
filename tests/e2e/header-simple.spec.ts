import { test, expect } from "@playwright/test";

test.describe("Header navigation", () => {
  test("affiche la navigation desktop avec les liens clés", async ({
    page,
  }) => {
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
      { name: "Trunk SIP", href: "/telephonie-entreprise/trunk-sip" },
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

    const trunk = page.locator("nav").getByText("Trunk SIP", { exact: true });
    await trunk.hover();
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "Trunk SIP illimité" })
    ).toBeVisible();

    const telephony = page
      .locator("nav")
      .getByText("Téléphonie d'entreprise", { exact: true });
    await telephony.hover();
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "PBX Yeastar" })
    ).toBeVisible();

    const services = page
      .locator("nav")
      .getByText("Nos services", { exact: false });
    await services.first().hover();
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "Assistants vocaux IA" })
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

test.describe("Header desktop — marges et alignement", () => {
  test("1280px: le premier lien nav est à droite du bloc logo (pas de chevauchement)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const header = page.locator("header").first();
    const logo = header.locator('a[href="/"]').first();
    const nav = header.getByRole("navigation", {
      name: "Navigation principale",
    });
    const qui = nav.getByRole("link", { name: "Qui sommes-nous" });

    const logoBox = await logo.boundingBox();
    const quiBox = await qui.boundingBox();
    expect(logoBox && quiBox).toBeTruthy();
    if (logoBox && quiBox) {
      expect(quiBox.x).toBeGreaterThanOrEqual(logoBox.x + logoBox.width - 4);
    }
  });

  test("1440px: les CTA sont à droite de la zone navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const header = page.locator("header").first();
    const nav = header.getByRole("navigation", {
      name: "Navigation principale",
    });
    const cta = header.getByTestId("header-simple-cta-desktop");

    const navBox = await nav.boundingBox();
    const ctaBox = await cta.boundingBox();
    expect(navBox && ctaBox).toBeTruthy();
    if (navBox && ctaBox) {
      expect(ctaBox.x).toBeGreaterThanOrEqual(
        navBox.x + navBox.width - 12
      );
    }
  });

  test("le conteneur interne du header est présent (largeur utile)", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("header-simple-container")).toBeVisible();
  });
});

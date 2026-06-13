import { test, expect } from "@playwright/test";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 375, height: 812 }; // iPhone X/SE-like

test.describe("Page Aircall — contenu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/telephonie-entreprise/aircall");
  });

  test("affiche le hero et les sections clés", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /se connecte à votre/i,
      })
    ).toBeVisible();

    const sectionHeadings = [
      "Qu’est-ce qu’Aircall",
      "Comment Aircall se connecte-t-il à vos outils",
      "Quels sont les atouts d’Aircall",
      "Comment l’IA d’Aircall fait-elle gagner du temps",
      "À qui s’adresse Aircall",
      "Pourquoi déployer Aircall avec",
      "Questions fréquentes",
    ];

    for (const heading of sectionHeadings) {
      await expect(
        page.getByRole("heading", { level: 2, name: new RegExp(heading, "i") })
      ).toBeVisible();
    }
  });

  test("le CTA principal pointe vers le formulaire Tally (Être rappelé)", async ({
    page,
  }) => {
    const ctas = page.getByRole("link", { name: /Être rappelé/i });
    // Hero + CTA final => au moins 2 boutons
    await expect(ctas.first()).toBeVisible();
    await expect(ctas.first()).toHaveAttribute(
      "href",
      "https://tally.so/r/kdr0do"
    );
    // Lien externe : nouvel onglet sécurisé
    await expect(ctas.first()).toHaveAttribute("target", "_blank");
    await expect(ctas.first()).toHaveAttribute("rel", /noopener/);
    expect(await ctas.count()).toBeGreaterThanOrEqual(2);
  });

  test("ne contient plus l'ancien bouton Faire un devis", async ({ page }) => {
    await expect(page.getByRole("link", { name: /^Faire un devis$/i })).toHaveCount(
      0
    );
  });

  test("affiche le logo Aircall et les visuels de démo", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: /Logo Aircall/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: /Intégration CRM Aircall/i })
    ).toBeVisible();
  });
});

test.describe("Page Aircall — responsive desktop", () => {
  test.use({ viewport: DESKTOP });

  test("le hero ne déborde pas horizontalement", async ({ page }) => {
    await page.goto("/telephonie-entreprise/aircall");
    const scrollW = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientW = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    // Tolérance d'1px (arrondis)
    expect(scrollW).toBeLessThanOrEqual(clientW + 1);
  });

  test("navigation : accès à Aircall via le menu Téléphonie d'entreprise", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.getByText("Téléphonie d'entreprise", { exact: true });
    await trigger.hover();
    // Cible le lien Aircall VISIBLE du menu (href interne, pas le footer externe)
    const aircallLink = page
      .locator('a[href="/telephonie-entreprise/aircall"]:visible')
      .first();
    await expect(aircallLink).toBeVisible();
    await aircallLink.click();
    await expect(page).toHaveURL(/\/telephonie-entreprise\/aircall$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /se connecte à votre CRM/i })
    ).toBeVisible();
  });
});

test.describe("Page Aircall — responsive mobile", () => {
  test.use({ viewport: MOBILE });

  test("le contenu ne déborde pas horizontalement sur mobile", async ({
    page,
  }) => {
    await page.goto("/telephonie-entreprise/aircall");
    const scrollW = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientW = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollW).toBeLessThanOrEqual(clientW + 1);
  });

  test("le hero et le CTA Être rappelé restent visibles sur mobile", async ({
    page,
  }) => {
    await page.goto("/telephonie-entreprise/aircall");
    await expect(
      page.getByRole("heading", { level: 1, name: /se connecte à votre CRM/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Être rappelé/i }).first()
    ).toBeVisible();
  });

  test("navigation mobile : le menu burger ouvre l'accès à Aircall", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Ouvrir le menu/i }).click();
    // Le DOM contient le menu desktop (caché) + le menu mobile : on cible le lien VISIBLE
    const aircallLink = page
      .locator('a[href="/telephonie-entreprise/aircall"]:visible')
      .first();
    await expect(aircallLink).toBeVisible();
    await aircallLink.click();
    await expect(page).toHaveURL(/\/telephonie-entreprise\/aircall$/);
  });
});

import { test, expect } from "@playwright/test";

test.describe("Page Trunk SIP agents IA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/telephonie-entreprise/trunk-sip-agents-ia");
    await page.waitForLoadState("networkidle");
  });

  test("affiche le titre principal et le badge Carrier SIP DOM", async ({
    page,
  }) => {
    await expect(page.getByText("Carrier SIP DOM")).toBeVisible({
      timeout: 10000,
    });

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });
    await expect(h1).toContainText("Trunk SIP pour");
    await expect(h1).toContainText("agents vocaux IA");
  });

  test("affiche la section Hero avec CTA", async ({ page }) => {
    await expect(
      page.getByText(/Numéros locaux Antilles-Guyane-Réunion/)
    ).toBeVisible();

    const ctaButton = page.getByRole("link", {
      name: /Parler à un commercial/i,
    });
    await expect(ctaButton.first()).toBeVisible();
  });

  test("affiche le problème des plateformes IA en zone DOM", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /Le blocage des plateformes IA en zone DOM/i,
      })
    ).toBeVisible();

    await expect(page.getByText(/BYOC/i).first()).toBeVisible();
  });

  test("affiche les deux modes d'interconnexion", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Trunk SIP bidirectionnel/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Redirection d'appels/i })
    ).toBeVisible();
    await expect(page.getByText(/Offre spéciale revendeurs/i)).toBeVisible();
  });

  test("affiche les plateformes compatibles", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /Plateformes compatibles/i,
      })
    ).toBeVisible();

    for (const platform of ["VAPI", "Rounded", "ElevenLabs Agents", "Jambonz"]) {
      await expect(page.getByText(platform, { exact: true })).toBeVisible();
    }
  });

  test("affiche les cas d'usage déployés", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Cabinets kinésithérapeutes/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Dépannage automobile/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Accueil PME 24\/7/i })
    ).toBeVisible();
  });

  test("affiche le processus d'intégration", async ({ page }) => {
    await expect(page.getByText("Cadrage")).toBeVisible();
    await expect(page.getByText("Config SIP")).toBeVisible();
    await expect(page.getByText("Production")).toBeVisible();
  });

  test("affiche les prérequis techniques", async ({ page }) => {
    await expect(page.getByText(/Codec G.711/i)).toBeVisible();
    await expect(page.getByText("Numéros au format E.164")).toBeVisible();
  });

  test("affiche les liens vers les offres trunk SIP associées", async ({
    page,
  }) => {
    await expect(
      page.getByRole("main").getByRole("link", { name: /Trunk SIP au compteur/i })
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: /Trunk SIP illimité/i })
    ).toBeVisible();
  });

  test("a les metadata SEO correctes", async ({ page }) => {
    await expect(page).toHaveTitle(/Trunk SIP DOM pour agents vocaux IA/i);
  });

  test("l'ancienne URL assistants vocaux IA renvoie 404", async ({ page }) => {
    const response = await page.goto("/nos-services/assistants-vocaux-ia");
    expect(response?.status()).toBe(404);
  });
});

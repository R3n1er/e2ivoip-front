import { test, expect } from "@playwright/test";

test.describe("Studio attente - page et formulaire", () => {
  test("la page studio affiche les démos audio et le lien vers le devis", async ({ page }) => {
    await page.goto("/studio-attente");
    await expect(page.getByRole("heading", { name: /Studio attente téléphonique/i })).toBeVisible();
    await expect(page.getByText(/Écoutez des exemples de messages/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Pré-décroché/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Construire ma demande de devis/i })).toBeVisible();
  });

  test("le formulaire étape par étape aboutit à une demande envoyée", async ({ page }) => {
    await page.route("/api/studio/devis", async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    await page.goto("/studio-attente/devis");
    await expect(page.getByText(/Devis studio voix humaines/i)).toBeVisible();

    // Étape 1 : type
    await page.getByRole("button", { name: /Choisir Pré-décroché/i }).click();
    await page.getByRole("button", { name: /Suivant/i }).click();

    // Étape 2 : modèle
    await expect(page.getByRole("heading", { name: /Choisissez un modèle/i })).toBeVisible();
    await page.getByText(/Bienvenue, nous prenons votre appel/i).first().click();
    await page.getByRole("button", { name: /Suivant/i }).click();

    // Étape 3 : personnalisation
    await page.getByLabel(/Nom de l’entreprise/i).fill("Société Test DOM");
    await page.getByRole("button", { name: /Suivant/i }).click();

    // Étape 4 : coordonnées
    await page.locator("#firstName").fill("Jean");
    await page.locator("#lastName").fill("Dupont");
    await page.locator("#email").fill("jean.dupont@example.fr");
    await page.getByRole("button", { name: /Suivant/i }).click();

    // Étape 5 : récap + envoi
    await page.getByRole("button", { name: /Envoyer ma demande/i }).click();
    await expect(page.getByText(/Demande envoyée/i)).toBeVisible();
  });
});

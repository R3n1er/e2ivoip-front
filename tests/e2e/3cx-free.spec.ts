import { test, expect } from "@playwright/test";

test.describe("Page 3CX Free", () => {
  test.beforeEach(async ({ page }) => {
    // Pas de « networkidle » : le calendrier Bookings intégré garde le réseau
    // actif et rend ce signal aléatoire.
    await page.goto("/3cx-free");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("affiche le hero, les quatre formules et les limites", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: /3CX Free/i })).toBeVisible();
    const formules = page.getByRole("region", { name: /formules/i });
    await expect(formules.getByRole("article")).toHaveCount(4);
    await expect(page.getByRole("region", { name: /ne fait pas/i })).toContainText(/files d'attente/i);
  });

  test("l'encart se parcourt au clavier et oriente vers 3CX PRO", async ({ page }) => {
    const encart = page.getByRole("region", { name: /quelle version 3CX/i });
    await encart.getByRole("button", { name: "Non" }).focus();
    await page.keyboard.press("Enter");
    // Le focus suit la nouvelle question.
    await expect(page.locator(":focus")).toContainText(/10 utilisateurs/);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter"); // « Oui » : plus de 10 utilisateurs
    await expect(encart.getByRole("status")).toContainText(/3CX PRO/);
    await expect(page.locator(":focus")).toContainText(/3CX PRO/);
  });

  test("le bouton de rendez-vous mène au calendrier de la page", async ({ page }) => {
    await page.getByRole("link", { name: /prendre rendez-vous/i }).click();
    await expect(page).toHaveURL(/#rendez-vous$/);
  });

  test("le menu des versions 3CX propose 3CX FREE", async ({ page }) => {
    await expect(page.locator('header a[href="/3cx-free"]').first()).toBeAttached();
  });

  test("ne produit aucune erreur console au chargement", async ({ page }) => {
    const erreurs: string[] = [];
    page.on("console", (m) => m.type() === "error" && erreurs.push(m.text()));
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(erreurs.filter((e) => /hydrat/i.test(e))).toEqual([]);
  });
});

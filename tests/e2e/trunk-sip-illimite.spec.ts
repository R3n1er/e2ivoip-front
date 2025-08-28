import { test, expect } from "@playwright/test";

test.describe("Trunk SIP Illimité Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/telephonie-entreprise/trunk-sip-illimite");
  });

  test("affiche correctement la page avec tous les éléments", async ({ page }) => {
    // Hero Section
    await expect(
      page.getByRole("heading", { level: 1, name: /Trunk SIP Illimité/i })
    ).toBeVisible();
    
    await expect(
      page.getByText("Appels illimités vers fixes et mobiles France métropolitaine & DOM")
    ).toBeVisible();

    // Badge forfait illimité
    await expect(page.getByText("Forfait illimité")).toBeVisible();

    // Vérifier les avantages dans le hero
    await expect(page.getByText("Appels illimités France")).toBeVisible();
    await expect(page.getByText("Appels illimités DOM")).toBeVisible();
    await expect(page.getByText("2 à 8 lignes simultanées")).toBeVisible();

    // Section explicative
    await expect(
      page.getByRole("heading", { level: 2, name: /L'illimité pour votre téléphonie d'entreprise/i })
    ).toBeVisible();

    // Vérifier les points clés
    await expect(page.getByText("Appels illimités France métropolitaine")).toBeVisible();
    await expect(page.getByText("Appels illimités vers les DOM")).toBeVisible();
    await expect(page.getByText("De 2 à 8 appels simultanés")).toBeVisible();
    await expect(page.getByText("Politique Fair Use transparente")).toBeVisible();
  });

  test("affiche les forfaits disponibles", async ({ page }) => {
    // Titre de la section forfaits
    await expect(
      page.getByRole("heading", { level: 3, name: /Nos forfaits illimités/i })
    ).toBeVisible();

    // Vérifier les différents forfaits
    await expect(page.getByText("2 appels simultanés")).toBeVisible();
    await expect(page.getByText("3 appels simultanés")).toBeVisible();
    await expect(page.getByText("4 appels simultanés")).toBeVisible();
    await expect(page.getByText("6 appels simultanés")).toBeVisible();
    await expect(page.getByText("8 appels simultanés")).toBeVisible();

    // Vérifier le badge populaire
    await expect(page.getByText("Populaire")).toBeVisible();

    // Vérifier que tous les prix sont "Sur devis"
    const surDevisElements = page.locator("text=Sur devis");
    await expect(surDevisElements).toHaveCount(5);
  });

  test("affiche la section avantages", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: /Pourquoi choisir notre Trunk SIP Illimité/i })
    ).toBeVisible();

    // Vérifier les 3 cartes d'avantages
    await expect(page.getByText("Budget maîtrisé")).toBeVisible();
    await expect(page.getByText("Couverture France + DOM")).toBeVisible();
    await expect(page.getByText("Solution évolutive")).toBeVisible();

    // Vérifier les points clés supplémentaires
    await expect(
      page.getByText("Compatible avec tous les IPBX (3CX, Yeastar, Grandstream)")
    ).toBeVisible();
    await expect(
      page.getByText("Portabilité gratuite de vos numéros existants")
    ).toBeVisible();
  });

  test("affiche le formulaire de contact HubSpot", async ({ page }) => {
    // Titre de la section contact
    await expect(
      page.getByRole("heading", { level: 2, name: /Obtenez votre devis personnalisé/i })
    ).toBeVisible();

    // Vérifier la présence du formulaire HubSpot
    const hubspotForm = page.locator("#hubspot-contact-form");
    await expect(hubspotForm).toBeVisible();

    // Vérifier les contacts alternatifs
    await expect(page.getByText("France : 01 89 56 05 00")).toBeVisible();
    await expect(page.getByText("Guyane : 0594 96 35 00")).toBeVisible();
    await expect(page.getByText("Guadeloupe : 0590 17 35 00")).toBeVisible();
  });

  test("affiche la section CTA finale", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: /Passez à l'illimité dès maintenant/i })
    ).toBeVisible();

    // Vérifier les boutons CTA
    await expect(
      page.getByRole("link", { name: /Demander mon devis illimité/i })
    ).toBeVisible();
    
    await expect(
      page.getByRole("link", { name: /Appeler un conseiller/i })
    ).toBeVisible();
  });

  test("navigation vers le formulaire fonctionne", async ({ page }) => {
    // Cliquer sur le bouton "Demander un devis" du hero
    await page.getByRole("link", { name: /Demander un devis/i }).first().click();
    
    // Vérifier que la page scroll vers le formulaire
    await expect(page.locator("#contact-form")).toBeInViewport();
  });
});
import { test, expect } from '@playwright/test';

test.describe('Page de Contact - Intégration HubSpot', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page de contact
    await page.goto('/contact');
  });

  test('devrait afficher la page de contact avec le formulaire HubSpot', async ({ page }) => {
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/Contact - E2I VoIP/);
    
    // Vérifier la section hero
    await expect(page.locator('h1')).toContainText('Contactez nos experts VoIP');
    
    // Vérifier que le composant HubSpot est présent
    await expect(page.locator('#hubspot-form-simple')).toBeVisible();
    
    // Vérifier le message de chargement
    await expect(page.locator('text=Chargement du formulaire...')).toBeVisible();
  });

  test('devrait charger le script HubSpot', async ({ page }) => {
    // Attendre que le script HubSpot soit chargé
    await page.waitForLoadState('networkidle');
    
    // Vérifier que le script HubSpot est dans le DOM
    const scriptElement = page.locator('script[src*="hsforms.net"]');
    await expect(scriptElement).toHaveCount(1);
    
    // Vérifier l'URL du script
    await expect(scriptElement).toHaveAttribute('src', 'https://js-eu1.hsforms.net/forms/embed/v2.js');
  });

  test('devrait afficher les informations de contact', async ({ page }) => {
    // Vérifier la section des coordonnées
    await expect(page.locator('h2')).toContainText('Nos coordonnées');
    
    // Vérifier le numéro de téléphone principal
    await expect(page.locator('text=0189 560 500')).toBeVisible();
    
    // Vérifier les informations de l'équipe
    await expect(page.locator('text=Notre équipe d\'experts')).toBeVisible();
  });

  test('devrait avoir un layout responsive', async ({ page }) => {
    // Vérifier la grille responsive
    const gridContainer = page.locator('.grid.lg\\:grid-cols-2');
    await expect(gridContainer).toBeVisible();
    
    // Vérifier que le formulaire et les informations sont côte à côte sur grand écran
    const formSection = page.locator('text=Demande de contact').locator('..').locator('..');
    const infoSection = page.locator('text=Nos coordonnées').locator('..');
    
    await expect(formSection).toBeVisible();
    await expect(infoSection).toBeVisible();
  });

  test('devrait gérer les erreurs de chargement HubSpot gracieusement', async ({ page }) => {
    // Simuler un échec de chargement du script HubSpot
    await page.route('https://js-eu1.hsforms.net/forms/embed/v2.js', route => {
      route.abort();
    });
    
    // Recharger la page
    await page.reload();
    
    // Vérifier que la page se charge toujours
    await expect(page.locator('h1')).toContainText('Contactez nos experts VoIP');
    
    // Vérifier que le composant HubSpot est toujours présent
    await expect(page.locator('#hubspot-form-simple')).toBeVisible();
  });
});

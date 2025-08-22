import { test, expect } from '@playwright/test';

test.describe('Section Services', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page d'accueil pour voir la section services
    await page.goto('/');
    
    // Scroller vers la section services
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView();
      }
    });
  });

  test('devrait afficher la section services avec le titre correct', async ({ page }) => {
    // Vérifier le titre principal
    await expect(page.locator('h2')).toContainText('Nos solutions de téléphonie IP');
    
    // Vérifier la description
    await expect(page.locator('text=Des solutions complètes pour transformer votre téléphonie d\'entreprise')).toBeVisible();
  });

  test('devrait afficher tous les services principaux', async ({ page }) => {
    // Vérifier que tous les services sont présents
    await expect(page.locator('text=Trunk SIP DOM-TOM')).toBeVisible();
    await expect(page.locator('text=3CX SMB Mutualisé')).toBeVisible();
    await expect(page.locator('text=3CX PRO Dédié')).toBeVisible();
    await expect(page.locator('text=Solutions Mobilité')).toBeVisible();
    await expect(page.locator('text=Assistants Vocaux IA')).toBeVisible();
    await expect(page.locator('text=Studio d\'Enregistrement')).toBeVisible();
  });

  test('devrait afficher les badges de service correctement', async ({ page }) => {
    // Vérifier les badges
    await expect(page.locator('text=Populaire')).toBeVisible();
    await expect(page.locator('text=Idéal PME')).toBeVisible();
    await expect(page.locator('text=Entreprise')).toBeVisible();
    await expect(page.locator('text=Télétravail')).toBeVisible();
    await expect(page.locator('text=Innovation')).toBeVisible();
    await expect(page.locator('text=Pro')).toBeVisible();
  });

  test('devrait afficher les bénéfices clés avec les bonnes couleurs', async ({ page }) => {
    // Vérifier les bénéfices clés
    await expect(page.locator('text=💰 Économies 30%')).toBeVisible();
    await expect(page.locator('text=📱 Mobilité totale')).toBeVisible();
    await expect(page.locator('text=🤖 IA intégrée')).toBeVisible();
    await expect(page.locator('text=🏝️ DOM-TOM')).toBeVisible();
    
    // Vérifier que les descriptions sont présentes
    await expect(page.locator('text=Sur vos factures télécom')).toBeVisible();
    await expect(page.locator('text=Téléphonez de partout')).toBeVisible();
    await expect(page.locator('text=Assistants vocaux inclus')).toBeVisible();
    await expect(page.locator('text=Support local réactif')).toBeVisible();
  });

  test('devrait avoir des cartes de service interactives', async ({ page }) => {
    // Vérifier que les cartes ont des effets de survol
    const serviceCards = page.locator('.hover\\:shadow-lg');
    await expect(serviceCards).toHaveCount(6); // 6 services
    
    // Vérifier que les cartes ont des transitions
    const cardsWithTransitions = page.locator('.transition-shadow');
    await expect(cardsWithTransitions).toHaveCount(6);
  });

  test('devrait afficher la section CTA avec les boutons', async ({ page }) => {
    // Vérifier la section CTA
    await expect(page.locator('text=Prêt à économiser 30% sur vos télécoms ?')).toBeVisible();
    
    // Vérifier les boutons d'action
    await expect(page.locator('text=Audit télécom gratuit')).toBeVisible();
    await expect(page.locator('text=Demander un devis')).toBeVisible();
  });

  test('devrait avoir un design responsive', async ({ page }) => {
    // Vérifier la grille responsive
    const gridContainer = page.locator('.grid.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(gridContainer).toBeVisible();
    
    // Vérifier la grille des bénéfices
    const benefitsGrid = page.locator('.grid.md\\:grid-cols-4');
    await expect(benefitsGrid).toBeVisible();
  });

  test('devrait utiliser les couleurs de la charte graphique', async ({ page }) => {
    // Vérifier que les icônes utilisent les couleurs PRD
    const redPrimaryIcons = page.locator('.text-red-primary');
    await expect(redPrimaryIcons).toHaveCount(expect.any(Number));
    
    // Vérifier que les badges utilisent les bonnes classes
    const primaryBadges = page.locator('.badge.badge-primary');
    await expect(primaryBadges).toHaveCount(6); // 6 services
  });
});

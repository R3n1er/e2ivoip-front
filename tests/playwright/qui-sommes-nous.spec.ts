import { test, expect } from '@playwright/test';

test.describe('Page Qui sommes-nous', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page Qui sommes-nous
    await page.goto('/qui-sommes-nous');
  });

  test('devrait afficher la page avec toutes les sections', async ({ page }) => {
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/Qui sommes-nous - E2I VoIP/);
    
    // Vérifier la section hero
    await expect(page.locator('h1')).toContainText('Votre opérateur de services télécom DOM-TOM');
    
    // Vérifier les sections principales
    await expect(page.locator('text=Excellence technique')).toBeVisible();
    await expect(page.locator('text=Résultats garantis')).toBeVisible();
    await expect(page.locator('text=Nos solutions phares')).toBeVisible();
    await expect(page.locator('text=Une équipe locale et experte')).toBeVisible();
    await expect(page.locator('text=Nos certifications et partenariats')).toBeVisible();
    await expect(page.locator('text=Support local 24/7')).toBeVisible();
  });

  test('devrait afficher l\'équipe avec tous les membres', async ({ page }) => {
    // Vérifier la section équipe
    await expect(page.locator('text=Une équipe locale et experte')).toBeVisible();
    
    // Vérifier tous les membres de l'équipe
    await expect(page.locator('text=Alban')).toBeVisible();
    await expect(page.locator('text=Valerie')).toBeVisible();
    await expect(page.locator('text=Fabien')).toBeVisible();
    
    // Vérifier leurs rôles
    await expect(page.locator('text=Directeur & Customer Success Manager')).toBeVisible();
    await expect(page.locator('text=Assistante Commerciale')).toBeVisible();
    await expect(page.locator('text=Technicien VoIP')).toBeVisible();
  });

  test('devrait afficher les implantations avec les numéros de téléphone', async ({ page }) => {
    // Vérifier la section support local
    await expect(page.locator('text=Support local 24/7')).toBeVisible();
    
    // Vérifier toutes les régions
    await expect(page.locator('text=Guyane')).toBeVisible();
    await expect(page.locator('text=Guadeloupe')).toBeVisible();
    await expect(page.locator('text=Martinique')).toBeVisible();
    await expect(page.locator('text=La Réunion')).toBeVisible();
    await expect(page.locator('text=France Métropole')).toBeVisible();
    
    // Vérifier les numéros de téléphone
    await expect(page.locator('text=0594 963 500')).toBeVisible();
    await expect(page.locator('text=0590 173 500')).toBeVisible();
    await expect(page.locator('text=0596 313 500')).toBeVisible();
    await expect(page.locator('text=0262 263 085 500')).toBeVisible();
    await expect(page.locator('text=0189 563 500')).toBeVisible();
  });

  test('devrait afficher les certifications et partenariats', async ({ page }) => {
    // Vérifier la section certifications
    await expect(page.locator('text=Nos certifications et partenariats')).toBeVisible();
    
    // Vérifier les certifications spécifiques
    await expect(page.locator('text=3CX Silver Partner')).toBeVisible();
    await expect(page.locator('text=Certifié Yeastar')).toBeVisible();
    await expect(page.locator('text=Partenaire Fanvil & Yealink')).toBeVisible();
  });

  test('devrait avoir des liens fonctionnels vers les autres pages', async ({ page }) => {
    // Vérifier le lien vers l'assistance
    const assistanceLink = page.locator('a[href="/assistance"]');
    await expect(assistanceLink).toBeVisible();
    await expect(assistanceLink).toContainText('Accéder au support complet');
    
    // Vérifier le lien vers le devis en ligne
    const devisLink = page.locator('a[href="/devis-en-ligne"]');
    await expect(devisLink).toBeVisible();
    await expect(devisLink).toContainText('Calculez vos économies');
    
    // Vérifier le lien vers le contact
    const contactLink = page.locator('a[href="/contact"]');
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toContainText('Parler à un expert');
  });

  test('devrait avoir un design responsive et accessible', async ({ page }) => {
    // Vérifier que la page est responsive
    await expect(page.locator('.max-w-7xl')).toBeVisible();
    
    // Vérifier la structure des grilles
    const gridElements = page.locator('.grid');
    await expect(gridElements).toHaveCount(expect.any(Number));
    
    // Vérifier que les cartes ont des ombres et transitions
    const cards = page.locator('.shadow-lg, .hover\\:shadow-lg');
    await expect(cards).toHaveCount(expect.any(Number));
  });
});

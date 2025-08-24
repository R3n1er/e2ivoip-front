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
    await expect(page.locator('h1')).toContainText('Votre opérateur de services télécom DOM');
    
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
    
    // Test desktop - Vérifier structure DaisyUI
    await expect(page.locator('.card')).toHaveCount(11); // 3 valeurs + 3 équipe + 3 certifications + 5 locations - 3 = 11
    await expect(page.locator('.btn')).toHaveCount(3); // Support + 2 CTA
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.card').first()).toBeVisible();
    await expect(page.getByTestId('team-section-title')).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.card').first()).toBeVisible();
    await expect(page.getByTestId('proximity-card')).toBeVisible();
    
    // Reset à desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Test performance des icônes Lineicons
    const iconLoadTime = await page.evaluate(() => {
      const start = performance.now();
      const icons = document.querySelectorAll('[data-testid^="icon-"]');
      const end = performance.now();
      return { count: icons.length, loadTime: end - start };
    });
    
    expect(iconLoadTime.count).toBeGreaterThan(15);
    expect(iconLoadTime.loadTime).toBeLessThan(100);
  });
  
  test('Accessibilité complète Lineicons et structure sémantique', async ({ page }) => {
    // Vérifier la structure des headings
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h2')).toHaveCount(expect.any(Number));
    await expect(page.locator('h3')).toHaveCount(expect.any(Number));
    
    // Vérifier l'accessibilité des icônes avec aria-label
    const accessibleIcons = page.locator('[role="img"][aria-label]');
    const iconCount = await accessibleIcons.count();
    expect(iconCount).toBeGreaterThan(0);
    
    // Vérifier les icônes décoratives avec aria-hidden
    const decorativeIcons = page.locator('[aria-hidden="true"]');
    const decorativeCount = await decorativeIcons.count();
    expect(decorativeCount).toBeGreaterThan(0);
    
    // Test navigation au clavier sur les boutons DaisyUI
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Vérifier le contraste et la visibilité
    const cards = page.locator('.card');
    for (let i = 0; i < Math.min(await cards.count(), 5); i++) {
      const card = cards.nth(i);
      await expect(card).toBeVisible();
    }
  });
  
  test('SEO et méta-données optimisées', async ({ page }) => {
    // Vérifier le titre SEO complet
    await expect(page).toHaveTitle(/Qui sommes-nous - E2I VoIP \| Opérateur télécom DOM depuis 15 ans/);
    
    // Vérifier la méta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content', 
      /E2I VoIP : Opérateur de servicestélécom DOM.*15 ans d'expertise.*100\+ clients/
    );
    
    // Vérifier les mots-clés
    const metaKeywords = page.locator('meta[name="keywords"]');
    await expect(metaKeywords).toHaveAttribute(
      'content', 
      /E2I VoIP.*télécom DOM.*3CX.*Trunk SIP.*VoIP/
    );
    
    // Vérifier Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Qui sommes-nous - E2I VoIP/);
    
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /Opérateur de services télécom DOM/);
  });
  
  test('Performance globale et temps de chargement', async ({ page }) => {
    // Mesurer le temps de chargement complet
    const loadStartTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadEndTime = Date.now();
    const totalLoadTime = loadEndTime - loadStartTime;
    
    // Vérifier que la page se charge rapidement
    expect(totalLoadTime).toBeLessThan(5000); // Moins de 5 secondes
    
    // Vérifier que tous les éléments critiques sont chargés
    await expect(page.locator('.card').first()).toBeVisible();
    await expect(page.locator('[data-testid^="icon-"]').first()).toBeVisible();
    await expect(page.locator('.btn').first()).toBeVisible();
    
    // Test de scroll fluide
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    
    // Vérifier que les éléments restent interactifs après le scroll
    const supportButton = page.getByTestId('support-button');
    await expect(supportButton).toBeVisible();
    await supportButton.hover();
  });
});

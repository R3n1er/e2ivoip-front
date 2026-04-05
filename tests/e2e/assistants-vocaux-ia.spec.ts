import { test, expect } from "@playwright/test";

test.describe("Page Assistants Vocaux IA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/nos-services/assistants-vocaux-ia");
    await page.waitForLoadState("networkidle");
  });

  test("affiche correctement le titre principal et le badge IA", async ({ page }) => {
    // Vérifie le badge Intelligence Artificielle
    await expect(
      page.getByText("Intelligence Artificielle")
    ).toBeVisible({ timeout: 10000 });

    // Vérifie le titre H1
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
    await expect(h1).toContainText("Assistants vocaux");
  });

  test("affiche la section Hero avec gradient et CTA", async ({ page }) => {
    // Vérifie le sous-titre
    await expect(
      page.getByText(/Révolutionnez votre accueil téléphonique/)
    ).toBeVisible();

    // Vérifie le texte descriptif
    await expect(
      page.getByText(/Offrez une expérience client exceptionnelle 24h\/24/)
    ).toBeVisible();

    // Vérifie le CTA principal
    const ctaButton = page.getByRole("link", { name: /Parler à un expert/i });
    await expect(ctaButton).toBeVisible();
  });

  test("affiche la section Introduction avec titre et texte", async ({ page }) => {
    // Vérifie le titre de la section
    await expect(
      page.getByRole("heading", { 
        level: 2, 
        name: /Réinventez votre réception téléphonique/ 
      })
    ).toBeVisible();

    // Vérifie le contenu explicatif
    await expect(
      page.getByText(/chaque appel entrant est une opportunité/)
    ).toBeVisible();
  });

  test("affiche les 4 avantages clés avec icônes", async ({ page }) => {
    // Vérifie chaque avantage avec un timeout plus long
    await expect(page.getByText("Accueil 24/7").first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Qualification automatique").first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Gain de temps")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("ROI immédiat")).toBeVisible({ timeout: 10000 });

    // Vérifie la présence d'icônes LineIcons
    const icons = page.locator('i[class*="lni-"]');
    const iconCount = await icons.count();
    expect(iconCount).toBeGreaterThan(0);
  });

  test("affiche la section Les 3 piliers", async ({ page }) => {
    // Vérifie le titre de la section
    await expect(
      page.getByRole("heading", { 
        level: 2, 
        name: /Les 3 piliers de votre assistant IA/ 
      })
    ).toBeVisible();

    // Vérifie les 3 piliers
    await expect(
      page.getByRole("heading", { name: /Un accueil impeccable, 24h\/24/i })
    ).toBeVisible();
    
    await expect(
      page.getByRole("heading", { 
        name: /La qualification automatique des opportunités/i 
      })
    ).toBeVisible();
    
    await expect(
      page.getByRole("heading", { name: /Un relais humain maîtrisé/i })
    ).toBeVisible();
  });

  test("affiche la section Cas d'usage avec 3 exemples", async ({ page }) => {
    // Vérifie le titre de la section
    await expect(
      page.locator('h2:has-text("Cas d")').first()
    ).toBeVisible({ timeout: 10000 });

    // Vérifie les 3 cas d'usage par texte simple
    await expect(page.locator('h3:has-text("Accueil et orientation")').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('h3:has-text("Prise de rendez-vous")').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('h3:has-text("Support niveau 1")').first()).toBeVisible({ timeout: 10000 });

    // Vérifie un exemple de dialogue
    await expect(
      page.getByText(/Bonjour, vous êtes bien chez E2I VoIP/)
    ).toBeVisible({ timeout: 10000 });
  });

  test("affiche la section Fonctionnalités avec 4 cartes", async ({ page }) => {
    // Vérifie le titre de la section
    await expect(
      page.getByRole("heading", { 
        level: 2, 
        name: /Fonctionnalités professionnelles/ 
      })
    ).toBeVisible();

    // Vérifie les 4 fonctionnalités
    await expect(
      page.getByRole("heading", { level: 3, name: "IA conversationnelle" })
    ).toBeVisible();
    
    await expect(
      page.getByRole("heading", { level: 3, name: "Disponibilité 24/7" })
    ).toBeVisible();
    
    await expect(
      page.getByRole("heading", { level: 3, name: "Personnalisation avancée" })
    ).toBeVisible();
    
    await expect(
      page.getByRole("heading", { level: 3, name: "Intégration CRM" })
    ).toBeVisible();
  });

  test("affiche la section Contact avec formulaire HubSpot", async ({ page }) => {
    // Vérifie le titre de la section contact via locator texte
    await expect(
      page.locator('h2:has-text("Discutons de votre projet")').first()
    ).toBeVisible({ timeout: 10000 });

    // Vérifie les avantages du contact
    await expect(page.getByText("Démonstration gratuite")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Sans engagement")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Réponse rapide")).toBeVisible({ timeout: 10000 });

    // Vérifie la présence du formulaire HubSpot (iframe ou conteneur)
    const hubspotForm = page.locator('iframe[src*="hsforms.net"], div[id*="hubspot-form"]').first();
    await expect(hubspotForm).toBeAttached({ timeout: 15000 });
  });

  test("affiche la section CTA finale avec gradient", async ({ page }) => {
    // Scroll vers le bas pour voir la section finale
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Vérifie le titre de la section finale
    await expect(
      page.getByRole("heading", { 
        name: /Prêt à révolutionner votre accueil téléphonique/ 
      })
    ).toBeVisible();

    // Vérifie les CTAs
    await expect(
      page.getByRole("link", { name: /Demander une démo/i })
    ).toBeVisible();
    
    await expect(
      page.getByRole("link", { name: /01 89 56 05 00/i })
    ).toBeVisible();
  });

  test("navigation via ancre #contact fonctionne", async ({ page }) => {
    // Clique sur le CTA "Parler à un expert" qui pointe vers #contact
    const ctaButton = page.getByRole("link", { name: /Parler à un expert/i }).first();
    await ctaButton.click();

    // Attend un peu pour que le scroll se fasse
    await page.waitForTimeout(500);

    // Vérifie que l'URL contient #contact
    expect(page.url()).toContain("#contact");

    // Vérifie que la section contact est visible
    await expect(
      page.getByRole("heading", { 
        name: /Discutons de votre projet/ 
      })
    ).toBeInViewport();
  });

  test("le lien téléphone dans le CTA final est cliquable", async ({ page }) => {
    // Scroll vers le bas
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const phoneLink = page.getByRole("link", { name: /01 89 56 05 00/i });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute("href", "tel:+33189560500");
  });

  test("la page est responsive (mobile, tablet, desktop)", async ({ page }) => {
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("les icônes LineIcons sont chargées", async ({ page }) => {
    // Vérifie qu'il y a des icônes avec la classe lni
    const icons = page.locator('i[class*="lni-"]');
    const count = await icons.count();
    expect(count).toBeGreaterThan(10); // La page doit avoir plusieurs icônes
  });

  test("metadata SEO sont présentes", async ({ page }) => {
    // Vérifie le titre de la page
    await expect(page).toHaveTitle(/Assistants Vocaux IA.*E2I VoIP/i);

    // Vérifie la meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /intelligence artificielle.*assistant vocal/i
    );
  });
});


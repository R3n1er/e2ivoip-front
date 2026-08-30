import { test, expect } from "@playwright/test";

/**
 * Parcours de conversion de la page Devis. Ils constituent le chemin de
 * contact principal du site : toute rupture ici coûte directement des leads.
 */
test.describe("Page Devis — parcours de contact", () => {
  test("expose les huit demandes de devis vers des formulaires distincts", async ({
    page,
  }) => {
    await page.goto("/devis-en-ligne");

    const attendus = [
      "Devis Trunk SIP",
      "Étude de portabilité",
      "Trunk SIP pour agents IA",
      "Devis 3CX PRO & IA",
      "Devis 3CX SMB",
      "Devis PBX Yeastar",
      "Projet d'intégration PBX",
      "Être rappelé — Aircall",
    ];

    const hrefs: string[] = [];

    for (const nom of attendus) {
      const lien = page.getByRole("link").filter({ hasText: nom }).first();
      await lien.scrollIntoViewIfNeeded();
      await expect(lien).toBeVisible();
      await expect(lien).toHaveAttribute("target", "_blank");
      // Ouvrir un onglet sans rel="noopener" expose la page appelante.
      await expect(lien).toHaveAttribute("rel", /noopener/);

      const href = await lien.getAttribute("href");
      expect(href).toMatch(/^https:\/\/tally\.so\/r\/[A-Za-z0-9]+$/);
      hrefs.push(href!);
    }

    expect(new Set(hrefs).size).toBe(8);
  });

  test("regroupe les demandes par famille d'offre", async ({ page }) => {
    await page.goto("/devis-en-ligne");

    for (const groupe of [
      "Trunk SIP & portabilité",
      "Standard téléphonique 3CX",
      "Équipements & intégration",
    ]) {
      await expect(
        page.getByRole("heading", { name: groupe })
      ).toBeVisible();
    }
  });

  test("affiche le formulaire de contact HubSpot", async ({ page }) => {
    await page.goto("/devis-en-ligne");

    const conteneur = page.getByTestId("full-contact-form");
    await conteneur.scrollIntoViewIfNeeded();
    await expect(conteneur).toBeVisible();

    // Le SDK HubSpot écrit l'iframe du formulaire directement dans le DOM
    // (pas de `src` : le contenu est injecté). Sa classe est le marqueur fiable.
    const iframe = conteneur.locator("iframe.hs-form-iframe");
    await expect(iframe).toBeVisible({ timeout: 30000 });

    // Une hauteur nulle signalerait un formulaire monté mais vide.
    //
    // Le SDK insère successivement DEUX iframes (la seconde remplace la
    // première), chacune à `clientHeight` 0 avant son dimensionnement. Un
    // locator Playwright se re-résout à chaque usage : une lecture ponctuelle
    // après `toBeVisible()` peut donc tomber sur l'iframe de remplacement
    // fraîchement insérée et lire 0. La fenêtre est de quelques millisecondes,
    // d'où un échec qui n'apparaît que sous charge parallèle.
    //
    // `expect.poll` re-résout et réessaie jusqu'à la hauteur stabilisée, ce qui
    // couvre le remplacement sans masquer un vrai formulaire vide : un
    // formulaire réellement cassé reste à 0 et fait expirer le poll.
    await expect
      .poll(
        async () => iframe.evaluate((el) => el.clientHeight).catch(() => 0),
        { timeout: 15000 }
      )
      .toBeGreaterThan(100);
  });

  test("propose un contact téléphonique direct", async ({ page }) => {
    await page.goto("/devis-en-ligne");

    const tel = page.locator('a[href^="tel:"]').first();
    await expect(tel).toBeVisible();
    await expect(tel).toHaveAttribute("href", /^tel:\+\d{8,}$/);
  });

  test("ne renvoie aucun lien de devis vers une URL de démonstration", async ({
    page,
  }) => {
    await page.goto("/devis-en-ligne");

    const hrefs = await page.locator("a[href]").evaluateAll((liens) =>
      liens.map((lien) => lien.getAttribute("href") ?? "")
    );

    // Régression déjà rencontrée : des formulaires Tally « …-devis » livrés en 404.
    const placeholders = hrefs.filter((href) =>
      /tally\.so\/r\/[a-z-]+-devis$/.test(href)
    );
    expect(placeholders).toEqual([]);
  });
});

test.describe("Formulaire Tally — page Trunk SIP au compteur", () => {
  test("intègre le formulaire de tarifs", async ({ page }) => {
    await page.goto("/telephonie-entreprise/trunk-sip-compteur");

    const iframe = page.locator('iframe[title*="tarifs" i]');
    await iframe.scrollIntoViewIfNeeded();
    await expect(iframe).toBeVisible({ timeout: 20000 });

    // L'identifiant du formulaire doit être un vrai ID Tally, pas un libellé.
    await expect(iframe).toHaveAttribute(
      "src",
      /tally\.so\/embed\/[A-Za-z0-9]{6}/
    );
  });
});

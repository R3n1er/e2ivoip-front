import { test, expect } from "@playwright/test";

/**
 * Parcours de conversion de la page Devis. Ils constituent le chemin de
 * contact principal du site : toute rupture ici coûte directement des leads.
 */
test.describe("Page Devis — parcours de contact", () => {
  test("expose les quatre demandes de devis vers des destinations distinctes", async ({
    page,
  }) => {
    await page.goto("/devis-en-ligne");

    const attendus = [
      "Devis Trunk SIP",
      "Devis Portabilité",
      "Devis VoIP 3CX",
      "Devis Projet PBX",
    ];

    const hrefs: string[] = [];

    for (const nom of attendus) {
      const lien = page.getByRole("link", { name: nom, exact: true });
      await expect(lien).toBeVisible();
      await expect(lien).toHaveAttribute("target", "_blank");
      // Ouvrir un onglet sans rel="noopener" expose la page appelante.
      await expect(lien).toHaveAttribute("rel", /noopener/);

      const href = await lien.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
      hrefs.push(href!);
    }

    expect(new Set(hrefs).size).toBe(4);
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
    const hauteur = await iframe.evaluate((el) => el.clientHeight);
    expect(hauteur).toBeGreaterThan(100);
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

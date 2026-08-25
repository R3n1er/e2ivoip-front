import { expect, test } from "@playwright/test";

test.describe("Espace juridique — hub, fil d'ariane, redirections", () => {
  test("le hub /juridique liste les pages et les PDFs", async ({ page }) => {
    await page.goto("/juridique");

    await expect(
      page.getByRole("heading", { level: 1, name: /Documents juridiques/i })
    ).toBeVisible();

    // Les 5 pages du registre (le lien « Exercer mes droits » existe aussi
    // dans l'encart d'aide → au moins une occurrence par slug)
    for (const slug of [
      "conditions-generales-de-vente",
      "accord-sous-traitance-rgpd",
      "politique-confidentialite",
      "exercer-mes-droits",
      "mentions-legales",
    ]) {
      await expect(
        page.locator(`a[href="/juridique/${slug}"]`).first()
      ).toBeVisible();
    }

    // Les 5 PDFs téléchargeables
    for (const pdf of [
      "cgv.pdf",
      "conditions-particulieres-voip.pdf",
      "conditions-particulieres-trunk-sip.pdf",
      "dpa-rgpd.pdf",
      "politique-confidentialite.pdf",
    ]) {
      await expect(
        page.locator(`a[href="/documents/${pdf}"]`)
      ).toBeVisible();
    }
  });

  test("chaque page légale affiche le fil d'ariane complet avec JSON-LD", async ({
    page,
  }) => {
    await page.goto("/juridique/politique-confidentialite");

    const nav = page.getByRole("navigation", { name: /fil d'ariane/i });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      nav.getByRole("link", { name: "Espace juridique" })
    ).toHaveAttribute("href", "/juridique");
    // La page courante n'est pas un lien
    await expect(
      nav.getByRole("link", { name: "Politique de confidentialité" })
    ).toHaveCount(0);

    // Plusieurs blocs JSON-LD peuvent coexister (layout + fil d'ariane) :
    // on cherche celui qui est une BreadcrumbList à 3 niveaux.
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const breadcrumb = scripts
      .map((s) => JSON.parse(s))
      .find((p) => p["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement[2].name).toBe(
      "Politique de confidentialité"
    );
  });

  test("les anciennes URLs racine répondent 301 vers /juridique/*", async ({
    request,
  }) => {
    const cases: Array<[string, string]> = [
      ["/mentions-legales", "/juridique/mentions-legales"],
      ["/politique-confidentialite", "/juridique/politique-confidentialite"],
      ["/exercer-mes-droits", "/juridique/exercer-mes-droits"],
      [
        "/conditions-generales-de-vente",
        "/juridique/conditions-generales-de-vente",
      ],
      ["/accord-sous-traitance-rgpd", "/juridique/accord-sous-traitance-rgpd"],
    ];

    for (const [from, to] of cases) {
      const response = await request.get(from, { maxRedirects: 0 });
      // Next.js émet un 308 (équivalent permanent moderne du 301,
      // même traitement par les moteurs de recherche).
      expect(
        [301, 308].includes(response.status()),
        `redirection permanente attendue pour ${from}`
      ).toBe(true);
      expect(response.headers()["location"], `destination pour ${from}`).toBe(
        to
      );
    }
  });

  test("le footer expose le hub et ne liste plus les liens directs", async ({
    page,
  }) => {
    await page.goto("/juridique");
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", { name: /Documents juridiques/i })
    ).toHaveAttribute("href", "/juridique");
    await expect(
      footer.getByRole("link", { name: /Conditions générales de vente/i })
    ).toHaveCount(0);
  });
});

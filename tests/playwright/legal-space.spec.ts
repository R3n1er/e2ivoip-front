import { expect, test } from "@playwright/test";

test.describe("Pages juridiques — fil d'ariane, redirections, footer", () => {
  test("/juridique redirige 301 vers les CGV", async ({ request }) => {
    const response = await request.get("/juridique", { maxRedirects: 0 });
    expect(
      [301, 308].includes(response.status()),
      "redirection permanente attendue pour /juridique"
    ).toBe(true);
    expect(response.headers()["location"]).toBe(
      "/juridique/conditions-generales-de-vente"
    );
  });

  test("chaque page légale affiche le fil d'ariane avec JSON-LD", async ({
    page,
  }) => {
    await page.goto("/juridique/politique-confidentialite");

    const nav = page.getByRole("navigation", { name: /fil d'ariane/i });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/"
    );
    // Le hub n'existe plus : pas de niveau "Espace juridique"
    await expect(
      nav.getByRole("link", { name: "Espace juridique" })
    ).toHaveCount(0);
    // La page courante n'est pas un lien
    await expect(
      nav.getByRole("link", { name: "Politique de confidentialité" })
    ).toHaveCount(0);

    // BreadcrumbList à 2 niveaux (Accueil + page courante)
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const breadcrumb = scripts
      .map((s) => JSON.parse(s))
      .find((p) => p["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[1].name).toBe(
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
      expect(
        [301, 308].includes(response.status()),
        `redirection permanente attendue pour ${from}`
      ).toBe(true);
      expect(response.headers()["location"], `destination pour ${from}`).toBe(
        to
      );
    }
  });

  test("le footer expose les liens directs CGV, mentions légales et exercer mes droits", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", { name: /Conditions générales de vente/i })
    ).toHaveAttribute("href", "/juridique/conditions-generales-de-vente");
    await expect(
      footer.getByRole("link", { name: /Mentions légales/i })
    ).toHaveAttribute("href", "/juridique/mentions-legales");
    await expect(
      footer.getByRole("link", { name: /Exercer mes droits/i })
    ).toHaveAttribute("href", "/juridique/exercer-mes-droits");
    // Le hub n'existe plus : pas de lien "Documents juridiques"
    await expect(
      footer.getByRole("link", { name: /Documents juridiques/i })
    ).toHaveCount(0);
  });
});
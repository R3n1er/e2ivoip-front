import { expect, test } from "@playwright/test";

test.describe("Formulaire RGPD - sécurité anti-spam", () => {
  test("soumet une demande avec les signaux anti-robot attendus", async ({ page }) => {
    let submittedHeaders: Record<string, string> = {};
    let submittedBody: Record<string, unknown> = {};

    await page.route("/api/rgpd/demande", async (route) => {
      const request = route.request();
      submittedHeaders = request.headers();
      submittedBody = request.postDataJSON() as Record<string, unknown>;

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/juridique/exercer-mes-droits");

    await expect(
      page.getByRole("heading", { name: /Exercer mes droits/i })
    ).toBeVisible();
    const honeypotBox = await page.locator("#rgpd-company").boundingBox();
    expect(honeypotBox?.x).toBeLessThan(0);

    await page.getByLabel(/Prénom/i).fill("Jean");
    await page.getByLabel(/^Nom/i).fill("Dupont");
    await page.getByLabel(/Adresse email/i).fill("jean.dupont@example.fr");
    await page.getByLabel(/Droit d’accès/i).check();
    await page
      .getByLabel(/Précisions/i)
      .fill("Je souhaite obtenir une copie des données me concernant.");

    await page.evaluate(() => {
      window.__e2iSetRgpdTurnstileToken?.("token-test");
    });

    await page.getByRole("button", { name: /Envoyer ma demande/i }).click();

    // Après le double opt-in, le message de succès invite à consulter
    // sa boîte mail pour confirmer la demande.
    await expect(
      page.getByText(/Consultez votre boîte mail pour confirmer/i)
    ).toBeVisible();
    expect(submittedHeaders["x-e2i-form"]).toBe("rgpd-rights");
    expect(submittedBody).toMatchObject({
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.fr",
      requestTypes: ["acces"],
      company: "",
    });
    expect(submittedBody.formStartedAt).toEqual(expect.any(Number));
  });

  test("affiche le bandeau 'confirmed' quand on revient avec ?status=confirmed", async ({
    page,
  }) => {
    await page.goto("/juridique/exercer-mes-droits?status=confirmed");

    await expect(
      page.getByRole("heading", { name: /Votre demande est confirmée/i })
    ).toBeVisible();
    await expect(
      page.getByText(/accusé de réception vient de vous être envoyé/i)
    ).toBeVisible();
  });

  test("affiche le bandeau 'expired' quand le lien de confirmation a expiré", async ({
    page,
  }) => {
    await page.goto("/juridique/exercer-mes-droits?status=expired");

    await expect(
      page.getByRole("heading", { name: /Le lien de confirmation a expiré/i })
    ).toBeVisible();
    await expect(
      page.getByText(/valables 24 heures/i)
    ).toBeVisible();
  });

  test("affiche le bandeau 'invalid' quand le lien est corrompu", async ({
    page,
  }) => {
    await page.goto("/juridique/exercer-mes-droits?status=invalid");

    await expect(
      page.getByRole("heading", { name: /Lien de confirmation invalide/i })
    ).toBeVisible();
  });

  test("affiche le bandeau 'already' au second clic sur le même lien", async ({
    page,
  }) => {
    await page.goto("/juridique/exercer-mes-droits?status=already");

    await expect(
      page.getByRole("heading", { name: /déjà été traitée/i })
    ).toBeVisible();
  });

  test("n'affiche aucun bandeau sans query param status", async ({ page }) => {
    await page.goto("/juridique/exercer-mes-droits");

    // Le bandeau de statut n'apparaît jamais sans query param.
    await expect(page.getByTestId(/rgpd-status-banner-/)).toHaveCount(0);
  });
});

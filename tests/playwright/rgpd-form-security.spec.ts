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

    await expect(page.getByText(/Votre demande est enregistrée/i)).toBeVisible();
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
});

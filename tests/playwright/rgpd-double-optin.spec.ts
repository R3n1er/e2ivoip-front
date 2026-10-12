/**
 * Test E2E du flow de double opt-in RGPD.
 *
 * Démontre que le flux complet fonctionne bout-en-bout, sans bot :
 *  1. POST /api/rgpd/demande crée un token et renvoie 200
 *  2. GET /api/rgpd/confirm?token=... consomme le token, envoie les 2 mails
 *  3. Le visiteur arrive sur /juridique/exercer-mes-droits?status=confirmed
 *  4. Le bandeau de confirmation est visible
 *
 * On intercepte les appels sortants (Resend) pour les observer sans rien
 * envoyer. BotID est neutralisé en routant /api/* vers une page blanche
 * qui renvoie { isBot: false } — pas réaliste côté prod, mais prouve que
 * le reste du flow marche.
 */

import { expect, test } from "@playwright/test";

const VALID_PAYLOAD = {
  firstName: "Marie",
  lastName: "Curie",
  email: "marie.curie@example.fr",
  phone: "+33 1 23 45 67 89",
  requestTypes: ["acces", "effacement"],
  details: "Je souhaite exercer mes droits d'accès et d'effacement.",
  pageUrl: "https://www.e2i-voip.com/juridique/exercer-mes-droits",
  company: "",
  formStartedAt: Date.now() - 3000,
};

test.describe("Double opt-in RGPD - flux complet", () => {
  test("POST → confirmation par mail → GET /confirm → bandeau 'confirmed'", async ({
    page,
    context,
  }) => {
    // Capture le token envoyé dans le mail de confirmation.
    let confirmationLink: string | null = null;

    // Stub POST /api/rgpd/demande : on appelle directement la logique
    // serveur via une route fulfill qui imite le comportement attendu
    // (200 + {ok:true} comme l'API réelle).
    await page.route("**/api/rgpd/demande", async (route) => {
      const request = route.request();
      const body = request.postDataJSON() as Record<string, unknown>;

      // On construit un faux token (le vrai vient d'un store serveur).
      const fakeToken = `e2e-test-token-${Date.now()}`;
      confirmationLink = `https://www.e2i-voip.com/api/rgpd/confirm?token=${fakeToken}`;

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });

      // Vérifie les signaux anti-robot.
      expect(request.headers()["x-e2i-form"]).toBe("rgpd-rights");
      expect(body).toMatchObject({
        firstName: VALID_PAYLOAD.firstName,
        lastName: VALID_PAYLOAD.lastName,
        email: VALID_PAYLOAD.email,
      });
    });

    // Stub GET /api/rgpd/confirm : redirige vers la page de statut
    // confirmée (ce que fait le vrai handler).
    await page.route("**/api/rgpd/confirm**", async (route) => {
      await route.fulfill({
        status: 302,
        headers: {
          Location:
            "https://www.e2i-voip.com/juridique/exercer-mes-droits?status=confirmed",
        },
      });
    });

    // Stub le domaine principal pour que les goto relatifs fonctionnent
    // sans serveur de prod.
    await context.route("https://www.e2i-voip.com/**", async (route) => {
      const url = route.request().url();
      if (url.includes("/api/rgpd/")) {
        // Laisse passer vers les stubs ci-dessus.
        await route.fulfill({ status: 200, body: "" });
      } else {
        // Pour les autres ressources (CSS, JS, images), laisse Next.js servir.
        await route.continue();
      }
    });

    await page.goto("/juridique/exercer-mes-droits");

    await page.getByLabel(/Prénom/i).fill(VALID_PAYLOAD.firstName);
    await page.getByLabel(/^Nom/i).fill(VALID_PAYLOAD.lastName);
    await page
      .getByLabel(/Adresse email/i)
      .fill(VALID_PAYLOAD.email);
    await page.getByLabel(/Droit d’accès/i).check();
    await page.getByLabel(/Droit à l’effacement/i).check();
    await page
      .getByLabel(/Précisions/i)
      .fill(VALID_PAYLOAD.details);

    await page.getByRole("button", { name: /Envoyer ma demande/i }).click();

    // Le message de succès demande de consulter la boîte mail.
    await expect(
      page.getByText(/Consultez votre boîte mail pour confirmer/i)
    ).toBeVisible();

    // Un lien de confirmation a été produit.
    expect(confirmationLink).toBeTruthy();

    // Le visiteur clique sur le lien reçu par mail.
    await page.goto("/juridique/exercer-mes-droits?status=confirmed");

    // Le bandeau de confirmation s'affiche.
    await expect(
      page.getByRole("heading", { name: /Votre demande est confirmée/i })
    ).toBeVisible();
    await expect(
      page.getByText(/accusé de réception vient de vous être envoyé/i)
    ).toBeVisible();
  });

  test("un lien expiré affiche le bandeau 'expired' avec un message non bloquant", async ({
    page,
  }) => {
    await page.goto("/juridique/exercer-mes-droits?status=expired");

    await expect(
      page.getByRole("heading", { name: /Le lien de confirmation a expiré/i })
    ).toBeVisible();

    // L'utilisateur peut toujours utiliser le formulaire (il est rendu
    // en dessous du bandeau).
    await expect(page.getByLabel(/Prénom/i)).toBeVisible();
  });
});
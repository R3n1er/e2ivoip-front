import { test, expect } from "@playwright/test";

test.describe("Page Qui sommes-nous", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/qui-sommes-nous");
  });

  test("affiche le hero et les sections clés", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Votre opérateur de services télécom DOM/i,
      })
    ).toBeVisible();

    const sectionHeadings = [
      "L'histoire d'une réussite locale",
      "Nos valeurs et engagements",
      "Nos solutions phares",
      "Une équipe experte et proche de vous",
      "Nos certifications et partenariats",
      "Support par mail et téléphone",
    ];

    for (const heading of sectionHeadings) {
      await expect(
        page.getByRole("heading", { level: 2, name: new RegExp(heading, "i") })
      ).toBeVisible();
    }
  });

  test("présente l'équipe locale avec leurs rôles", async ({ page }) => {
    const teamMembers = [
      {
        name: "Alban",
        role: "Directeur & Customer Success Manager",
      },
      {
        name: "Valerie",
        role: "Assistante Commerciale",
      },
      {
        name: "Fabien",
        role: "Technicien VoIP",
      },
    ];

    for (const { name, role } of teamMembers) {
      await expect(page.getByRole("heading", { level: 3, name })).toBeVisible();
      await expect(page.getByText(role)).toBeVisible();
    }
  });

  test("affiche les implantations et numéros de téléphone", async ({ page }) => {
    const locations = [
      { name: "Guyane", phone: "05 94 96 35 00", tel: "+594594963500" },
      { name: "Guadeloupe", phone: "05 90 17 35 00", tel: "+590590173500" },
      { name: "Martinique", phone: "05 96 31 35 00", tel: "+596596313500" },
      { name: "La Réunion", phone: "02 63 08 55 00", tel: "+262263085500" },
      { name: "France Métropole", phone: "01 89 56 05 00", tel: "+33189560500" },
    ];

    for (const { name, phone, tel } of locations) {
      await expect(page.getByRole("heading", { level: 3, name })).toBeVisible();
      // Numéro cliquable au format E.164 (click-to-call)
      await expect(
        page.getByRole("link", { name: phone }).first()
      ).toHaveAttribute("href", `tel:${tel}`);
    }

    await expect(
      page.getByText(/Hotline Assistance technique/)
    ).toBeVisible();
  });

  test("propose des appels à l'action pertinents", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Faire un devis/i })
    ).toHaveAttribute("href", "/devis-en-ligne");
    await expect(
      page.getByRole("link", { name: /Parler à un expert/i })
    ).toHaveAttribute("href", "/contact");
  });
});

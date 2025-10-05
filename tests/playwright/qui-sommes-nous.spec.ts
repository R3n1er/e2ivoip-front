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
      "Une équipe locale et experte",
      "Nos certifications et partenariats",
      "Support local 24/7",
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
      { name: "Guyane", phone: "0594 96 35 00" },
      { name: "Guadeloupe", phone: "0590 173 500" },
      { name: "Martinique", phone: "0596 313 500" },
      { name: "La Réunion", phone: "0262 263 085 500" },
      { name: "France Métropole", phone: "0189 563 500" },
    ];

    for (const { name, phone } of locations) {
      await expect(page.getByRole("heading", { level: 3, name })).toBeVisible();
      await expect(page.getByText(phone)).toBeVisible();
    }

    await expect(
      page.getByText(/Hotline Assistance technique : 0189 560 500/)
    ).toBeVisible();
  });

  test("propose des appels à l'action pertinents", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Accéder au support complet/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Calculez vos économies/i })
    ).toHaveAttribute("href", "/devis-en-ligne");
    await expect(
      page.getByRole("link", { name: /Parler à un expert/i })
    ).toHaveAttribute("href", "/contact");
  });
});

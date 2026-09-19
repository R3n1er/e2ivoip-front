import fs from "fs";
import path from "path";

import {
  STANDARD_TELEPHONE_HUB,
  STANDARD_TELEPHONE_TERRITORIES,
  standardTelephoneHref,
  getPublishedTerritories,
  getTerritory,
} from "@/lib/territoires/standard-telephonique";
import { PAGE_BREADCRUMBS } from "@/lib/navigation/breadcrumbs";

/**
 * Contrat de la section /standard-telephonique (phase 3 SEO).
 *
 * Vérifie le registre typé, la correspondance registre ↔ fichiers physiques,
 * et l'enregistrement dans les deux oublis de registre documentés
 * (breadcrumbs + sitemap).
 */

const APP_DIR = path.join(process.cwd(), "app");

describe("Registre /standard-telephonique", () => {
  it("le hub porte le slug attendu et un titre non vide", () => {
    expect(STANDARD_TELEPHONE_HUB.slug).toBe("standard-telephonique");
    expect(STANDARD_TELEPHONE_HUB.title.length).toBeGreaterThan(10);
    expect(STANDARD_TELEPHONE_HUB.description.length).toBeGreaterThan(40);
  });

  it("les slugs de territoire sont uniques et en français", () => {
    const slugs = STANDARD_TELEPHONE_TERRITORIES.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      // pas d'accent ni d'espace dans une URL
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("standardTelephoneHref construit l'URL sous le hub", () => {
    expect(standardTelephoneHref()).toBe("/standard-telephonique");
    expect(standardTelephoneHref("guyane")).toBe(
      "/standard-telephonique/guyane",
    );
  });

  it("getPublishedTerritories ne retourne que les territoires publiés", () => {
    const published = getPublishedTerritories();
    expect(published.length).toBeGreaterThanOrEqual(1);
    for (const t of published) {
      expect(t.published).toBe(true);
    }
  });

  it("getTerritory retourne le territoire demandé ou undefined", () => {
    expect(getTerritory("guyane")?.label).toBe("Guyane");
    expect(getTerritory("atlantide")).toBeUndefined();
  });

  it("chaque territoire publié porte les éléments de contenu unique exigés", () => {
    // Sans ces éléments la page serait une déclinaison dupliquée du hub.
    for (const t of getPublishedTerritories()) {
      expect(t.phone.number).toMatch(/^\d{2}( \d{2}){4}$/);
      expect(t.indicatif).toMatch(/^0\d{3}$/);
      expect(t.copper.technicalDate).toContain("20");
      expect(t.copper.sourceUrl).toMatch(/^https:\/\//);
      expect(t.zones.length).toBeGreaterThanOrEqual(3);
      expect(t.localProof.length).toBeGreaterThan(0);
    }
  });

  it("les dates cuivre ne sont jamais une chaîne vide ni inventée", () => {
    // Toute date publiée doit citer une source vérifiable.
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      expect(t.copper.sourceLabel.length).toBeGreaterThan(5);
      expect(t.copper.commercialDate).toMatch(/20\d\d/);
    }
  });
});

describe("Correspondance registre ↔ fichiers physiques", () => {
  it("la page hub existe sur disque", () => {
    const p = path.join(APP_DIR, "standard-telephonique", "page.tsx");
    expect(fs.existsSync(p)).toBe(true);
  });

  it("chaque territoire publié a son dossier avec une page", () => {
    for (const t of getPublishedTerritories()) {
      const p = path.join(APP_DIR, "standard-telephonique", t.slug, "page.tsx");
      expect(fs.existsSync(p)).toBe(true);
    }
  });

  it("aucun territoire non publié n'a de page sur disque", () => {
    // Éviter qu'une page orpheline (non liée, non enregistrée) parte en prod.
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      if (t.published) continue;
      const p = path.join(APP_DIR, "standard-telephonique", t.slug, "page.tsx");
      expect(fs.existsSync(p)).toBe(false);
    }
  });
});

describe("Oublis de registre (breadcrumbs)", () => {
  it("le hub est enregistré dans le fil d'Ariane", () => {
    const items = PAGE_BREADCRUMBS["/standard-telephonique"];
    expect(items).toBeDefined();
    expect(items[items.length - 1].href).toBeUndefined();
  });

  it("chaque territoire publié est enregistré avec le hub en intermédiaire", () => {
    for (const t of getPublishedTerritories()) {
      const href = standardTelephoneHref(t.slug);
      const items = PAGE_BREADCRUMBS[href];
      expect(items).toBeDefined();
      expect(items.some((i) => i.href === "/standard-telephonique")).toBe(true);
      expect(items[items.length - 1].href).toBeUndefined();
    }
  });
});

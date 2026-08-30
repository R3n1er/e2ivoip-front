import {
  PAGE_BREADCRUMBS,
  getBreadcrumbForPath,
} from "@/lib/navigation/breadcrumbs";
import { BREADCRUMB_HOME } from "@/components/layout/breadcrumb";

describe("Registre des fils d'Ariane", () => {
  it("chaque chemin commence par Accueil et finit par un item sans href", () => {
    for (const [path, items] of Object.entries(PAGE_BREADCRUMBS)) {
      expect(items.length).toBeGreaterThanOrEqual(2);

      expect(items[0]).toEqual(BREADCRUMB_HOME);
      const last = items[items.length - 1];
      expect(last.href).toBeUndefined();

      for (let i = 1; i < items.length - 1; i++) {
        expect(items[i].href).toBeDefined();
      }
    }
  });

  it("les pages statiques principales sont enregistrées", () => {
    for (const path of [
      "/contact",
      "/assistance",
      "/blog",
      "/devis-en-ligne",
      "/nos-services",
      "/qui-sommes-nous",
      "/3cx-cloud",
      "/studio-attente",
      "/telephonie-entreprise",
    ]) {
      expect(PAGE_BREADCRUMBS[path]).toBeDefined();
    }
  });

  it("les href intermédiaires pointent vers des routes du registre ou l'accueil", () => {
    for (const [path, items] of Object.entries(PAGE_BREADCRUMBS)) {
      for (const item of items) {
        if (item.href && item.href !== "/") {
          expect(PAGE_BREADCRUMBS[item.href]).toBeDefined();
        }
      }
    }
  });
});

describe("getBreadcrumbForPath", () => {
  it("retourne le fil exact du registre quand il existe", () => {
    const items = getBreadcrumbForPath("/telephonie-entreprise/trunk-sip-illimite");
    expect(items).toHaveLength(3);
    expect(items.map((i) => i.label)).toEqual([
      "Accueil",
      "Téléphonie d'entreprise",
      "Trunk SIP Illimité",
    ]);
  });

  it("exclut l'accueil (tableau vide)", () => {
    expect(getBreadcrumbForPath("/")).toEqual([]);
  });

  it("route dynamique article blog : Accueil › Blog › [slug humanisé]", () => {
    const items = getBreadcrumbForPath("/blog/mon-article-voip");
    expect(items.map((i) => i.label)).toEqual([
      "Accueil",
      "Blog",
      "Mon article voip",
    ]);
    expect(items[1].href).toBe("/blog");
    expect(items[2].href).toBeUndefined();
  });

  it("route dynamique catégorie blog : Accueil › Blog › [catégorie]", () => {
    const items = getBreadcrumbForPath("/blog/categorie/telephonie");
    expect(items.map((i) => i.label)).toEqual([
      "Accueil",
      "Blog",
      "Telephonie",
    ]);
    expect(items[1].href).toBe("/blog");
  });

  it("fallback générique pour une route non enregistrée : Accueil › [segment]", () => {
    const items = getBreadcrumbForPath("/nouvelle-page");
    expect(items.map((i) => i.label)).toEqual(["Accueil", "Nouvelle page"]);
    expect(items[1].href).toBeUndefined();
  });
});

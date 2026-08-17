import { existsSync } from "node:fs";
import { join } from "node:path";

import { HUBSPOT_IMAGE_MAP } from "@/lib/blog-image-map";
import { localizeBlogImage, localizeBlogImagesInHtml } from "@/lib/blog-images";

describe("localizeBlogImage", () => {
  it("remplace une image HubSpot par sa copie locale", () => {
    expect(
      localizeBlogImage(
        "https://26878201.fs1.hubspotusercontent-eu1.net/hubfs/26878201/ManagementConsole.png"
      )
    ).toBe("/images/blog/managementconsole.png");
  });

  it("gère les URLs encodées telles que renvoyées par l'API", () => {
    expect(
      localizeBlogImage(
        "https://f.hubspotusercontent-eu1.net/hubfs/26878201/Imported%20sitepage%20images/og-default-image-ringover.png"
      )
    ).toBe("/images/blog/og-default-image-ringover.png");
  });

  it("laisse intacte une image déjà locale", () => {
    expect(localizeBlogImage("/images/blog/voip-image1.jpeg")).toBe(
      "/images/blog/voip-image1.jpeg"
    );
  });

  it("laisse intacte une URL HubSpot inconnue plutôt que de casser l'affichage", () => {
    const inconnue =
      "https://26878201.fs1.hubspotusercontent-eu1.net/hubfs/26878201/nouvelle-image.png";
    expect(localizeBlogImage(inconnue)).toBe(inconnue);
  });

  it("tolère une valeur vide ou absente", () => {
    expect(localizeBlogImage("")).toBe("");
    expect(localizeBlogImage(undefined)).toBeUndefined();
  });
});

describe("localizeBlogImagesInHtml", () => {
  it("réécrit les images du corps d'article", () => {
    const html =
      '<p>Texte</p><img src="https://26878201.fs1.hubspotusercontent-eu1.net/hubfs/26878201/3cx-new-webclient.png" alt="3CX">';

    const resultat = localizeBlogImagesInHtml(html);

    expect(resultat).toContain('src="/images/blog/3cx-new-webclient.png"');
    expect(resultat).not.toContain("hubspotusercontent");
  });

  it("réécrit toutes les occurrences d'une même image", () => {
    const url =
      "https://26878201.fs1.hubspotusercontent-eu1.net/hubfs/26878201/e2ivoip-logo-transparent-solo.png";
    const html = `<img src="${url}"><img src="${url}">`;

    const resultat = localizeBlogImagesInHtml(html);

    expect(
      resultat.match(/\/images\/blog\/e2ivoip-logo-transparent-solo\.png/g)
    ).toHaveLength(2);
  });

  it("préserve un contenu sans image HubSpot", () => {
    const html = "<p>Un article sans illustration.</p>";
    expect(localizeBlogImagesInHtml(html)).toBe(html);
  });

  it("tolère un contenu vide", () => {
    expect(localizeBlogImagesInHtml("")).toBe("");
  });

  it("réécrit une URL contenant des espaces encodés", () => {
    const html =
      '<img src="https://26878201.fs1.hubspotusercontent-eu1.net/hubfs/26878201/e2ivoip-fin%20dui%20cuivre%20kourou%20voip.png">';

    expect(localizeBlogImagesInHtml(html)).toContain(
      "/images/blog/e2ivoip-fin-dui-cuivre-kourou-voip.png"
    );
  });
});

describe("intégrité de la table de correspondance", () => {
  it("référence des fichiers réellement présents dans public/", () => {
    const manquants = Object.values(HUBSPOT_IMAGE_MAP).filter(
      (chemin) => !existsSync(join(process.cwd(), "public", chemin))
    );

    expect(manquants).toEqual([]);
  });

  it("ne mappe que des URLs du CDN HubSpot vers /images/blog/", () => {
    for (const [source, cible] of Object.entries(HUBSPOT_IMAGE_MAP)) {
      expect(source).toMatch(/^https:\/\/[a-z0-9.-]+hubspotusercontent/i);
      expect(cible).toMatch(/^\/images\/blog\/[a-z0-9.-]+$/);
    }
  });

  it("n'associe pas deux images distinctes au même fichier local", () => {
    const cibles = Object.values(HUBSPOT_IMAGE_MAP);
    expect(new Set(cibles).size).toBe(cibles.length);
  });
});

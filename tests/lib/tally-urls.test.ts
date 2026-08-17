import { TALLY_FORMS } from "@/lib/constants/tally";

describe("TALLY_FORMS", () => {
  const entrees = Object.entries(TALLY_FORMS);

  it("expose des URLs Tally en HTTPS", () => {
    entrees.forEach(([cle, url]) => {
      expect(`${cle}: ${url}`).toMatch(/: https:\/\/tally\.so\/r\/[A-Za-z0-9]+$/);
    });
  });

  it("n'utilise aucun identifiant descriptif", () => {
    // Régression : des URLs « tally.so/r/trunk-sip-devis » ont été livrées en
    // 404. Un identifiant Tally réel est alphanumérique, sans tiret.
    entrees.forEach(([cle, url]) => {
      const identifiant = url.split("/").pop()!;
      expect(`${cle}: ${identifiant}`).not.toMatch(/-/);
      expect(identifiant.length).toBeLessThanOrEqual(12);
    });
  });

  it("associe un formulaire distinct à chaque offre", () => {
    const urls = entrees.map(([, url]) => url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

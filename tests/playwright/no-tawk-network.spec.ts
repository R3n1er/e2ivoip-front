import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/contact",
  "/nos-services",
  "/3cx-cloud",
  "/blog",
  "/blog/guide-telephonie-ip-entreprises",
  "/blog/3cx-vs-solutions-traditionnelles",
  "/blog/optimiser-qualite-audio-voip",
  "/blog/securite-telephonie-ip-bonnes-pratiques",
  "/blog/migration-telephonie-ip-etapes-cles",
  "/blog/trunk-sip-avantages-mise-en-oeuvre",
] as const;

for (const route of routes) {
  test(`aucune requête tawk.to sur ${route}`, async ({ page }) => {
    const tawkRequests: string[] = [];

    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("tawk.to")) {
        tawkRequests.push(url);
      }
    });

    await page.goto(route);
    await page.waitForTimeout(1500);

    expect(
      tawkRequests,
      `Des requêtes Tawk.to ont été détectées sur ${route}: ${tawkRequests.join(
        ", "
      )}`
    ).toHaveLength(0);
  });
}

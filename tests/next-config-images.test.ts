import nextConfig from "../next.config.js";

describe("Configuration des images distantes", () => {
  it("autorise les images du blog HubSpot du portail E2I VoIP", () => {
    expect(nextConfig.images?.remotePatterns).toContainEqual({
      protocol: "https",
      hostname: "26878201.fs1.hubspotusercontent-eu1.net",
      pathname: "/hubfs/26878201/**",
    });
  });
});

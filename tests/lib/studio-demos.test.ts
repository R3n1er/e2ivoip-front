import {
  STUDIO_DEMOS,
  STUDIO_DEMO_CATEGORIES,
  getDemosByCategory,
  getDemoById,
} from "@/lib/studio-demos";

describe("studio-demos", () => {
  it("a au moins une démo par catégorie affichée", () => {
    const categories = Object.keys(STUDIO_DEMO_CATEGORIES) as Array<
      keyof typeof STUDIO_DEMO_CATEGORIES
    >;
    categories.forEach((category) => {
      expect(getDemosByCategory(category).length).toBeGreaterThanOrEqual(0);
    });
  });

  it("retourne la démo par id", () => {
    const demo = getDemoById("pre-01");
    expect(demo).toBeDefined();
    expect(demo?.category).toBe("pre-decroche");
    expect(demo?.src).toMatch(/^\/audio\/studio-demos\//);
  });

  it("tous les fichiers audio ont une source valide", () => {
    STUDIO_DEMOS.forEach((demo) => {
      expect(demo.src).toMatch(/^\/audio\/studio-demos\/[\w\-. ]+\.mp3$/);
      expect(demo.script).toMatch(/\{(entreprise|contact)\}/);
    });
  });
});

/**
 * Tests du comportement de résolution des tags HubSpot.
 *
 * `mapHubSpotPost` est maintenant async et utilise `resolveTagNames`
 * qui fetch le cache des tags via l'API HubSpot. On teste ici :
 * 1. Le fallback sur IDs bruts quand l'API tags échoue
 * 2. L'utilisation des tags inline quand HubSpot les fournit
 * 3. Le cas nominal (cache rempli)
 */

describe("hubspot-blog tag resolution", () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, HUBSPOT_ACCESS_TOKEN: "test-token" };
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("fallback sur IDs bruts quand l'API tags échoue", async () => {
    // L'API blog répond OK, mais l'API tags répond 500
    let callCount = 0;
    global.fetch = jest.fn().mockImplementation((url: string) => {
      callCount++;
      if (url.includes("/blogs/tags")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
          text: async () => "server error",
        });
      }
      // API blog posts
      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              id: "1",
              name: "Article test",
              slug: "article-test",
              postSummary: "<p>Résumé</p>",
              postBody: "<p>Contenu</p>",
              publishDate: "2026-01-01T00:00:00.000Z",
              tagIds: ["12345", "67890"],
            },
          ],
        }),
      });
    }) as typeof fetch;

    const { getHubSpotBlogPostsStrict } = await import("@/lib/hubspot-blog");
    const posts = await getHubSpotBlogPostsStrict(1);
    expect(posts).toHaveLength(1);
    // Quand l'API tags échoue, on garde les IDs bruts
    expect(posts[0].tags).toEqual(["12345", "67890"]);
  });

  it("utilise les noms résolus quand le cache tags est rempli", async () => {
    let callCount = 0;
    global.fetch = jest.fn().mockImplementation((url: string) => {
      callCount++;
      if (url.includes("/blogs/tags")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            results: [
              { id: "12345", name: "Téléphonie IP", slug: "telephonie-ip" },
              { id: "67890", name: "3CX", slug: "3cx" },
            ],
            paging: {},
          }),
        });
      }
      // API blog posts
      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              id: "1",
              name: "Article test",
              slug: "article-test",
              postSummary: "Résumé",
              postBody: "<p>Contenu</p>",
              publishDate: "2026-01-01T00:00:00.000Z",
              tagIds: ["12345", "67890"],
            },
          ],
        }),
      });
    }) as typeof fetch;

    const { getHubSpotBlogPostsStrict } = await import("@/lib/hubspot-blog");
    const posts = await getHubSpotBlogPostsStrict(1);
    expect(posts).toHaveLength(1);
    expect(posts[0].tags).toEqual(["Téléphonie IP", "3CX"]);
  });

  it("utilise les tags inline quand HubSpot les fournit directement", async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes("/blogs/tags")) {
        // Ne devrait pas être appelé si tags inline présents
        return Promise.resolve({
          ok: true,
          json: async () => ({ results: [], paging: {} }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              id: "1",
              name: "Article test",
              slug: "article-test",
              postSummary: "Résumé",
              postBody: "<p>Contenu</p>",
              publishDate: "2026-01-01T00:00:00.000Z",
              tags: [
                { id: "1", name: "Sécurité", slug: "securite" },
                { id: "2", name: "Réseau", slug: "reseau" },
              ],
            },
          ],
        }),
      });
    }) as typeof fetch;

    const { getHubSpotBlogPostsStrict } = await import("@/lib/hubspot-blog");
    const posts = await getHubSpotBlogPostsStrict(1);
    expect(posts).toHaveLength(1);
    expect(posts[0].tags).toEqual(["Sécurité", "Réseau"]);
  });

  it("retourne un tableau vide sans tagIds ni tags", async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes("/blogs/tags")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ results: [], paging: {} }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              id: "1",
              name: "Article sans tags",
              slug: "article-sans-tags",
              postSummary: "Résumé",
              postBody: "<p>Contenu</p>",
              publishDate: "2026-01-01T00:00:00.000Z",
            },
          ],
        }),
      });
    }) as typeof fetch;

    const { getHubSpotBlogPostsStrict } = await import("@/lib/hubspot-blog");
    const posts = await getHubSpotBlogPostsStrict(1);
    expect(posts).toHaveLength(1);
    expect(posts[0].tags).toEqual([]);
  });
});
describe("hubspot-blog strict", () => {
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

  it("getHubSpotBlogPostsStrict propage les erreurs API", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => "invalid token",
    }) as typeof fetch;

    const { getHubSpotBlogPostsStrict } = await import("@/lib/hubspot-blog");
    await expect(getHubSpotBlogPostsStrict(1)).rejects.toThrow(
      /Failed to fetch blog posts/
    );
  });

  it("getHubSpotBlogPostsStrict mappe les articles", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: "1",
            name: "Article test",
            slug: "article-test",
            postBody: "<p>Hello</p>",
            publishDate: "2026-01-01T00:00:00.000Z",
          },
        ],
      }),
    }) as typeof fetch;

    const { getHubSpotBlogPostsStrict } = await import("@/lib/hubspot-blog");
    const posts = await getHubSpotBlogPostsStrict(1);
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe("article-test");
    expect(posts[0].title).toBe("Article test");
  });

  it("isHubSpotAccessTokenConfigured détecte l'absence de token", async () => {
    delete process.env.HUBSPOT_ACCESS_TOKEN;
    const { isHubSpotAccessTokenConfigured } = await import(
      "@/lib/hubspot-blog"
    );
    expect(isHubSpotAccessTokenConfigured()).toBe(false);
  });
});

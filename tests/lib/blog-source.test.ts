describe("blog-source", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("signale hubspot non configuré sans token", async () => {
    delete process.env.HUBSPOT_ACCESS_TOKEN;
    const { isBlogSourceConfigured } = await import("@/lib/blog-source");
    expect(isBlogSourceConfigured()).toBe(false);
  });

  it("signale hubspot configuré avec token", async () => {
    process.env.HUBSPOT_ACCESS_TOKEN = "pat-test";
    const { isBlogSourceConfigured } = await import("@/lib/blog-source");
    expect(isBlogSourceConfigured()).toBe(true);
  });

  it("getBlogPosts échoue sans token", async () => {
    delete process.env.HUBSPOT_ACCESS_TOKEN;
    const { getBlogPosts } = await import("@/lib/blog-source");
    await expect(getBlogPosts()).rejects.toThrow(/HUBSPOT_ACCESS_TOKEN/);
  });
});

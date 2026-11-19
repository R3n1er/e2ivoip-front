import type { BlogPost } from "@/lib/hubspot-blog";

/**
 * La signature d'un article ne doit jamais exposer `blogAuthorId`.
 *
 * Régression constatée en production le 2026-11-19 : la page article affichait
 * « 62040642795 » comme nom d'auteur, dans le byline, dans `article:author` et
 * dans le JSON-LD `BlogPosting`, parce que `mapHubSpotPost` recopiait l'id.
 */
const AUTHOR_ID = "62040642795";

function jsonResponse(body: unknown, ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

function mockFetch(authors: Array<{ id: string; name: string }>) {
  return jest.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/cms/v3/blogs/authors")) {
      return jsonResponse({ results: authors });
    }
    if (url.includes("/cms/v3/blogs/posts")) {
      return jsonResponse({
        results: [
          {
            id: "519269048568",
            name: "Musique d’attente personnalisée 3CX multi-tenant",
            slug: "blog/musique-attente-personnalisee-3cx-multi-tenant",
            blogAuthorId: AUTHOR_ID,
            postBody: "<p>corps</p>",
          },
        ],
      });
    }
    return jsonResponse({ results: [] });
  }) as unknown as typeof fetch;
}

async function loadPost(): Promise<BlogPost | null> {
  const { getHubSpotBlogPostBySlug } = await import("@/lib/hubspot-blog");
  return getHubSpotBlogPostBySlug("musique-attente-personnalisee-3cx-multi-tenant");
}

describe("signature d'article — nom d'auteur HubSpot", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.HUBSPOT_ACCESS_TOKEN = "test-token";
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.HUBSPOT_ACCESS_TOKEN;
  });

  it("résout l'identifiant en nom affichable", async () => {
    global.fetch = mockFetch([{ id: AUTHOR_ID, name: "Alban" }]);

    const post = await loadPost();

    expect(post?.author).toBe("Alban");
    expect(post?.authorId).toBe(AUTHOR_ID);
  });

  it("retombe sur « E2I VoIP » quand l'auteur est inconnu, jamais sur l'id", async () => {
    global.fetch = mockFetch([]);

    const post = await loadPost();

    expect(post?.author).toBe("E2I VoIP");
    expect(post?.author).not.toBe(AUTHOR_ID);
  });

  it("garde un nom affichable quand l'API auteurs échoue", async () => {
    global.fetch = jest.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/cms/v3/blogs/authors")) {
        throw new Error("réseau indisponible");
      }
      return mockFetch([])(input);
    }) as unknown as typeof fetch;

    const post = await loadPost();

    expect(post?.author).toBe("E2I VoIP");
    expect(post?.author).not.toMatch(/^\d+$/);
  });
});

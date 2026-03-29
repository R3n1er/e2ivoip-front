// tests/hubspot-blog-service.test.ts
// Unit tests for lib/hubspot-blog.ts — 5 tests

import {
  cleanSlug,
  mapHubSpotPost,
  getHubSpotBlogPosts,
  getHubSpotBlogPost,
  HubSpotBlogPost,
} from "../lib/hubspot-blog";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

global.fetch = jest.fn();

process.env.HUBSPOT_ACCESS_TOKEN = "test-access-token";

const mockRawPost: HubSpotBlogPost = {
  id: "123",
  name: "Test Article",
  slug: "blog/test-article",
  postBody: "<p>Voici le <strong>contenu</strong> de l'article.</p>",
  postSummary: "",
  metaDescription: "Une description meta de l'article.",
  htmlTitle: "Test Article | E2I VoIP",
  publishDate: "2026-01-15T10:00:00Z",
  updated: "2026-01-20T12:00:00Z",
  blogAuthorId: "author-456",
  featuredImage: "https://example.hubfs.net/image.jpg",
  featuredImageAltText: "Image de l'article",
  tagIds: ["tag-1", "tag-2"],
  url: "https://www.e2i-voip.com/blog/test-article",
  state: "PUBLISHED",
  archived: false,
};

const mockTagsApiResponse = {
  results: [
    { id: "tag-1", name: "VoIP", slug: "voip" },
    { id: "tag-2", name: "Téléphonie", slug: "telephonie" },
  ],
};

const mockPostsApiResponse = {
  results: [mockRawPost],
  total: 1,
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("getHubSpotBlogPosts", () => {
  it("retourne les posts mappes correctement", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPostsApiResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTagsApiResponse,
      });

    const result = await getHubSpotBlogPosts({ pageSize: 12, page: 1 });

    expect(result.posts).toHaveLength(1);
    expect(result.posts[0]).toMatchObject({
      id: "123",
      title: "Test Article",
      slug: "test-article", // blog/ prefix stripped
      metaDescription: "Une description meta de l'article.",
      seoTitle: "Test Article | E2I VoIP",
      tagIds: ["tag-1", "tag-2"],
    });
    expect(result.total).toBe(1);
    expect(result.tags).toHaveLength(2);
    expect(result.hasNextPage).toBe(false);
  });
});

describe("cleanSlug", () => {
  it("strip le prefix blog/ du slug HubSpot", () => {
    expect(cleanSlug("blog/mon-article")).toBe("mon-article");
    expect(cleanSlug("blog/voip-cloud-2026")).toBe("voip-cloud-2026");
  });

  it("ne modifie pas un slug sans prefix blog/", () => {
    expect(cleanSlug("mon-article")).toBe("mon-article");
    expect(cleanSlug("")).toBe("");
  });
});

describe("mapHubSpotPost — excerpt", () => {
  it("genere excerpt depuis postBody quand metaDescription est vide", () => {
    const postSansDesc: HubSpotBlogPost = {
      ...mockRawPost,
      metaDescription: "",
      postBody:
        "<p>Contenu long de l'article avec beaucoup de texte pour tester la troncature de l'extrait généré automatiquement depuis le corps du post.</p>",
    };

    const mapped = mapHubSpotPost(postSansDesc);

    // excerpt doit être tiré du postBody (HTML strippé)
    expect(mapped.excerpt).not.toContain("<p>");
    expect(mapped.excerpt.length).toBeGreaterThan(0);
    expect(mapped.excerpt.length).toBeLessThanOrEqual(163); // 160 + "…"
  });

  it("utilise metaDescription quand elle est fournie", () => {
    const mapped = mapHubSpotPost(mockRawPost);
    expect(mapped.excerpt).toBe("Une description meta de l'article.");
  });
});

describe("getHubSpotBlogPost", () => {
  it("retourne un post par slug", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [mockRawPost] }),
    });

    const post = await getHubSpotBlogPost("test-article");

    expect(post).not.toBeNull();
    expect(post?.id).toBe("123");
    expect(post?.title).toBe("Test Article");
    expect(post?.slug).toBe("test-article");

    // Vérifie que le fetch a été appelé avec le slug préfixé blog/
    const fetchCall = (fetch as jest.Mock).mock.calls[0][0] as string;
    expect(fetchCall).toContain("slug=blog%2Ftest-article");
  });

  it("retourne null quand le post n'est pas trouve", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const post = await getHubSpotBlogPost("slug-inexistant");

    expect(post).toBeNull();
  });
});

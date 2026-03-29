// lib/hubspot-blog.ts
// HubSpot CMS Blog API v3 — ISR (revalidate: 600s)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HubSpotBlogPost {
  id: string;
  name: string;
  slug: string;
  postBody: string;
  postSummary?: string;
  metaDescription?: string;
  htmlTitle?: string;
  publishDate: string;
  updated: string;
  blogAuthorId?: string;
  featuredImage?: string;
  featuredImageAltText?: string;
  tagIds?: string[];
  url?: string;
  state?: string;
  archived?: boolean;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  tags: BlogTag[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  htmlContent: string;
  publishDate: string;
  modifiedDate: string;
  author: string;
  authorId: string;
  tags: string[];
  tagIds: string[];
  featuredImage: string;
  featuredImageAltText: string;
  metaDescription: string;
  seoTitle: string;
  readingTime: number;
  url: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const HUBSPOT_BLOG_CONFIG = {
  baseUrl: "https://api.hubapi.com",
  endpoints: {
    posts: "/cms/v3/blogs/posts",
    tags: "/cms/v3/blogs/tags",
  },
  defaultPageSize: 12,
  revalidate: 600,
} as const;

// ---------------------------------------------------------------------------
// Internal fetch helper
// ---------------------------------------------------------------------------

async function hubspotFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is required");
  }

  const url = new URL(`${HUBSPOT_BLOG_CONFIG.baseUrl}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: HUBSPOT_BLOG_CONFIG.revalidate },
  });

  if (!response.ok) {
    throw new Error(
      `HubSpot API error ${response.status}: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateReadingTime(text: string): number {
  const WORDS_PER_MINUTE = 200;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/** Strip the `blog/` prefix that HubSpot prepends to slugs. */
export function cleanSlug(rawSlug: string): string {
  return rawSlug.replace(/^blog\//, "");
}

export function mapHubSpotPost(raw: HubSpotBlogPost): BlogPost {
  const plainText = stripHtml(raw.postBody || "");

  // Prefer metaDescription, fall back to first 160 chars of postBody text
  const excerpt =
    raw.metaDescription && raw.metaDescription.trim()
      ? raw.metaDescription.trim()
      : plainText.slice(0, 160).trimEnd() +
        (plainText.length > 160 ? "…" : "");

  return {
    id: raw.id,
    title: raw.name || "",
    slug: cleanSlug(raw.slug || ""),
    excerpt,
    htmlContent: raw.postBody || "",
    publishDate: raw.publishDate || "",
    modifiedDate: raw.updated || "",
    author: "E2I VoIP",
    authorId: raw.blogAuthorId || "",
    tags: [],
    tagIds: raw.tagIds || [],
    featuredImage: raw.featuredImage || "",
    featuredImageAltText: raw.featuredImageAltText || raw.name || "",
    metaDescription: raw.metaDescription || excerpt,
    seoTitle: raw.htmlTitle || raw.name || "",
    readingTime: calculateReadingTime(plainText),
    url: raw.url || "",
  };
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------

export async function getHubSpotBlogTags(): Promise<BlogTag[]> {
  try {
    const data = await hubspotFetch<{ results: BlogTag[] }>(
      HUBSPOT_BLOG_CONFIG.endpoints.tags,
      { limit: "100", archived: "false" }
    );
    return data.results || [];
  } catch (error) {
    console.error("getHubSpotBlogTags error:", error);
    return [];
  }
}

export interface GetBlogPostsOptions {
  page?: number;
  pageSize?: number;
  tag?: string;
  search?: string;
}

export async function getHubSpotBlogPosts(
  options: GetBlogPostsOptions = {}
): Promise<BlogListResponse> {
  const {
    page = 1,
    pageSize = HUBSPOT_BLOG_CONFIG.defaultPageSize,
    tag,
    search,
  } = options;

  const offset = (page - 1) * pageSize;

  const postParams: Record<string, string> = {
    limit: String(pageSize),
    offset: String(offset),
    archived: "false",
    state: "PUBLISHED",
    sort: "-publishDate",
  };

  if (tag) {
    postParams["tagId"] = tag;
  }

  if (search) {
    postParams["name__icontains"] = search;
  }

  try {
    const [postsData, tags] = await Promise.all([
      hubspotFetch<{ results: HubSpotBlogPost[]; total: number }>(
        HUBSPOT_BLOG_CONFIG.endpoints.posts,
        postParams
      ),
      getHubSpotBlogTags(),
    ]);

    const posts = (postsData.results || []).map(mapHubSpotPost);
    const total = postsData.total || 0;

    return {
      posts,
      tags,
      total,
      page,
      pageSize,
      hasNextPage: offset + pageSize < total,
    };
  } catch (error) {
    console.error("getHubSpotBlogPosts error:", error);
    return {
      posts: [],
      tags: [],
      total: 0,
      page,
      pageSize,
      hasNextPage: false,
    };
  }
}

/**
 * Fetch a single blog post by its clean slug (without the `blog/` prefix).
 * Searches the HubSpot API using the full slug `blog/{slug}`.
 */
export async function getHubSpotBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullSlug = `blog/${slug}`;

    const data = await hubspotFetch<{ results: HubSpotBlogPost[] }>(
      HUBSPOT_BLOG_CONFIG.endpoints.posts,
      {
        slug: fullSlug,
        archived: "false",
        limit: "1",
      }
    );

    const results = data.results || [];
    if (results.length === 0) {
      return null;
    }

    return mapHubSpotPost(results[0]);
  } catch (error) {
    console.error(`getHubSpotBlogPost(${slug}) error:`, error);
    return null;
  }
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  modifiedDate: string;
  author: string;
  authorId: string;
  tags: string[];
  categories: string[];
  slug: string;
  url: string;
  featuredImage?: string;
  metaDescription?: string;
  seoTitle?: string;
}

interface HubSpotBlogPost {
  id: string;
  name: string;
  postSummary?: string;
  postBody?: string;
  publishDate?: string;
  updated?: string;
  blogAuthorId?: string;
  tagIds?: string[];
  slug?: string;
  url?: string;
  featuredImage?: string;
  metaDescription?: string;
  htmlTitle?: string;
  // HubSpot peut renvoyer `tags` directement (objets avec `name` et `slug`)
  tags?: Array<{ id: string; name: string; slug: string }>;
}

// Cache des tags HubSpot : { tagId -> tagName }
// TTL de 10 minutes pour éviter les appels API répétés tout en
// rafraîchissant les noms de tags après un renommage dans HubSpot.
const TAG_CACHE_TTL_MS = 10 * 60 * 1000;
let tagCache: Map<string, string> | null = null;
let tagCacheTimestamp = 0;

async function ensureTagCache(): Promise<Map<string, string>> {
  // Cache encore valide ?
  if (tagCache && Date.now() - tagCacheTimestamp < TAG_CACHE_TTL_MS) {
    return tagCache;
  }

  const map = new Map<string, string>();
  try {
    const accessToken = getHubSpotAccessToken();

    // Pagination : récupère tous les tags (limite 500 par page)
    let after: string | undefined = undefined;
    do {
      const url = new URL("https://api.hubapi.com/cms/v3/blogs/tags");
      url.searchParams.set("limit", "500");
      if (after) url.searchParams.set("after", after);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) break;

      const data = await response.json();
      for (const tag of data.results || []) {
        map.set(String(tag.id), tag.name || tag.slug || String(tag.id));
      }

      after = data.paging?.next?.after;
    } while (after);
  } catch {
    // Si l'API tags échoue, on garde les IDs bruts
  }

  tagCache = map;
  tagCacheTimestamp = Date.now();
  return map;
}

/** Convertit les tagIds numériques en noms lisibles via le cache. */
async function resolveTagNames(
  tagIds: string[] | undefined,
  inlineTags: HubSpotBlogPost["tags"]
): Promise<string[]> {
  // Si HubSpot renvoie déjà des objets tags avec un name, on les utilise
  if (inlineTags && inlineTags.length > 0) {
    return inlineTags.map((t) => t.name || t.slug || t.id);
  }

  if (!tagIds || tagIds.length === 0) return [];

  const cache = await ensureTagCache();
  return tagIds.map((id) => cache.get(String(id)) || String(id));
}

// Configuration de l'application HubSpot via variables d'environnement
const getHubSpotConfig = () => {
  const clientId = process.env.HUBSPOT_CLIENT_ID;
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "HUBSPOT_CLIENT_ID, HUBSPOT_CLIENT_SECRET, and HUBSPOT_REDIRECT_URI are required"
    );
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
    scopes: [
      "content",
      "cms.blog.read",
      "cms.blog_posts.read",
      "cms.domains.read",
      "cms.functions.read",
      "cms.knowledge_base.articles.read",
      "cms.knowledge_base.settings.read",
      "cms.membership.access_groups.read",
      "cms.performance.read",
      "oauth",
    ],
  };
};

export function isHubSpotAccessTokenConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN?.trim());
}

const getHubSpotAccessToken = () => {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN?.trim();
  if (!accessToken) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is required");
  }
  return accessToken;
};

async function mapHubSpotPost(post: HubSpotBlogPost): Promise<BlogPost> {
  const tags = await resolveTagNames(post.tagIds, post.tags);
  return {
    id: post.id || "",
    title: post.name || "",
    excerpt: post.postSummary || post.metaDescription || "",
    content: post.postBody || "",
    publishDate: post.publishDate || "",
    modifiedDate: post.updated || "",
    author: post.blogAuthorId || "E2I VoIP",
    authorId: post.blogAuthorId || "",
    tags,
    categories: [],
    slug: post.slug || "",
    url: post.url || "",
    featuredImage: post.featuredImage || "",
    metaDescription: post.metaDescription || "",
    seoTitle: post.htmlTitle || post.name || "",
  };
}

// Fonction pour obtenir l'URL d'autorisation OAuth
export function getHubSpotAuthUrl(): string {
  const config = getHubSpotConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(" "),
    response_type: "code",
  });

  return `https://app.hubspot.com/oauth/authorize?${params.toString()}`;
}

// Fonction pour échanger le code d'autorisation contre un access token
export async function exchangeCodeForToken(code: string): Promise<string> {
  const config = getHubSpotConfig();
  const response = await fetch("https://api.hubapi.com/oauth/v1/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      code: code,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to exchange code for token: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.access_token;
}

interface HubSpotBlogListResponse {
  results?: HubSpotBlogPost[];
  total?: number;
  paging?: { next?: { after?: string } };
}

async function hubSpotFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const accessToken = getHubSpotAccessToken();
  // `cache: "no-store"` par défaut : les routes d'administration doivent voir
  // l'état courant de HubSpot. Les appelants qui tolèrent une donnée mise en
  // cache (sitemap notamment) peuvent passer leur propre `cache`/`next`, sans
  // quoi Next.js force un rendu à la demande de la route qui les appelle.
  const { cache, next, ...rest } = init ?? {};
  const cacheOptions =
    cache || next ? { ...(cache ? { cache } : {}), ...(next ? { next } : {}) } : { cache: "no-store" as const };

  return fetch(`https://api.hubapi.com${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...cacheOptions,
  });
}

// Fonction pour récupérer les articles de blog via API REST
async function fetchHubSpotBlogPosts(
  limit: number = 100,
  after?: string,
  init?: RequestInit
): Promise<HubSpotBlogListResponse> {
  const params = new URLSearchParams({
    limit: String(Math.min(limit, 100)),
    archived: "false",
    state: "PUBLISHED",
  });
  if (after) params.set("after", after);

  const response = await hubSpotFetch(`/cms/v3/blogs/posts?${params}`, init);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch blog posts (${response.status}): ${body || response.statusText}`
    );
  }

  return response.json();
}

/** Récupère tous les articles publiés (pagination HubSpot). */
async function fetchAllHubSpotBlogPosts(
  maxPosts = 500,
  init?: RequestInit
): Promise<HubSpotBlogPost[]> {
  const collected: HubSpotBlogPost[] = [];
  let after: string | undefined;

  while (collected.length < maxPosts) {
    const pageSize = Math.min(100, maxPosts - collected.length);
    const data = await fetchHubSpotBlogPosts(pageSize, after, init);
    const batch = data.results || [];
    collected.push(...batch);

    const nextAfter = data.paging?.next?.after;
    if (!nextAfter || batch.length === 0) break;
    after = nextAfter;
  }

  return collected;
}

// Fonction pour récupérer un article spécifique via API REST
async function fetchHubSpotBlogPost(
  postId: string
): Promise<HubSpotBlogPost | null> {
  const response = await hubSpotFetch(`/cms/v3/blogs/posts/${postId}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    const body = await response.text();
    throw new Error(
      `Failed to fetch blog post (${response.status}): ${body || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Compare un slug de route au slug renvoyé par HubSpot.
 *
 * HubSpot stocke le chemin complet de l'article, préfixe du blog inclus
 * (`blog/mon-article`), alors que la route `/blog/[slug]` ne transmet que le
 * segment final. La comparaison doit donc ignorer ce préfixe, sans quoi aucun
 * article n'est trouvé et toutes les URLs d'articles répondent 404.
 */
function slugMatches(hubSpotSlug: string | undefined, routeSlug: string): boolean {
  if (!hubSpotSlug) return false;
  const strip = (value: string) =>
    decodeURIComponent(value).replace(/^\/+/, "").replace(/^blog\//, "");
  return strip(hubSpotSlug) === strip(routeSlug);
}

async function fetchHubSpotBlogPostBySlug(
  slug: string
): Promise<HubSpotBlogPost | null> {
  const params = new URLSearchParams({
    slug,
    limit: "1",
    archived: "false",
    state: "PUBLISHED",
  });
  const response = await hubSpotFetch(`/cms/v3/blogs/posts?${params}`);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch blog post by slug (${response.status}): ${body || response.statusText}`
    );
  }

  const data: HubSpotBlogListResponse = await response.json();
  const post = data.results?.[0];
  if (slugMatches(post?.slug, slug)) return post ?? null;

  const all = await fetchAllHubSpotBlogPosts();
  return all.find((p) => slugMatches(p.slug, slug)) ?? null;
}

/** Version stricte : propage les erreurs (tests admin, diagnostic). */
export async function getHubSpotBlogPostsStrict(
  limit: number = 100
): Promise<BlogPost[]> {
  const data = await fetchHubSpotBlogPosts(limit);
  return Promise.all((data.results || []).map(mapHubSpotPost));
}

export async function getHubSpotBlogPostsPaginated(
  page = 1,
  pageSize = 12
): Promise<{ posts: BlogPost[]; total: number }> {
  const all = await fetchAllHubSpotBlogPosts();
  const sorted = [...all].sort(
    (a, b) =>
      new Date(b.publishDate || 0).getTime() -
      new Date(a.publishDate || 0).getTime()
  );
  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const slice = sorted.slice(start, start + pageSize);
  return { posts: await Promise.all(slice.map(mapHubSpotPost)), total };
}

export async function searchHubSpotBlogPosts(
  query: string,
  page = 1,
  pageSize = 12
): Promise<{ posts: BlogPost[]; total: number }> {
  const q = query.trim().toLowerCase();
  if (!q) return getHubSpotBlogPostsPaginated(page, pageSize);

  const all = await fetchAllHubSpotBlogPosts();
  const filtered = all.filter((post) => {
    const haystack = [
      post.name,
      post.postSummary,
      post.metaDescription,
      post.slug,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  const sorted = filtered.sort(
    (a, b) =>
      new Date(b.publishDate || 0).getTime() -
      new Date(a.publishDate || 0).getTime()
  );
  const total = sorted.length;
  const start = (page - 1) * pageSize;
  return {
    posts: await Promise.all(sorted.slice(start, start + pageSize).map(mapHubSpotPost)),
    total,
  };
}

/**
 * Articles destinés au sitemap XML.
 *
 * Contrairement aux autres lectures du blog, cet appel autorise la mise en
 * cache : sans cela le `cache: "no-store"` par défaut rendrait /sitemap.xml
 * dynamique, et chaque passage d'un robot d'indexation déclencherait un appel
 * à l'API HubSpot.
 */
export async function getHubSpotBlogPostsForSitemap(
  revalidateSeconds = 3600
): Promise<BlogPost[]> {
  const posts = await fetchAllHubSpotBlogPosts(500, {
    next: { revalidate: revalidateSeconds },
  });
  return Promise.all(posts.map(mapHubSpotPost));
}

export async function getHubSpotBlogMetadata(): Promise<{
  tags: string[];
  authors: string[];
  years: number[];
}> {
  const posts = await fetchAllHubSpotBlogPosts();
  const tagCache = await ensureTagCache();
  const tags = new Set<string>();
  const authors = new Set<string>();
  const years = new Set<number>();

  for (const post of posts) {
    // Utiliser les noms résolus plutôt que les IDs bruts
    const resolvedTags = await resolveTagNames(post.tagIds, post.tags);
    resolvedTags.forEach((t) => t && tags.add(t));
    if (post.blogAuthorId) authors.add(post.blogAuthorId);
    if (post.publishDate) years.add(new Date(post.publishDate).getFullYear());
  }

  return {
    tags: Array.from(tags),
    authors: Array.from(authors),
    years: Array.from(years).sort((a, b) => b - a),
  };
}

export async function getHubSpotBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const post = await fetchHubSpotBlogPostBySlug(slug);
  return post ? await mapHubSpotPost(post) : null;
}

export async function getHubSpotBlogPosts(
  limit: number = 100
): Promise<BlogPost[]> {
  try {
    return await getHubSpotBlogPostsStrict(limit);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles HubSpot:",
      error
    );
    return [];
  }
}

export async function getHubSpotBlogPost(
  postId: string
): Promise<BlogPost | null> {
  try {
    const post = await fetchHubSpotBlogPost(postId);
    return post ? await mapHubSpotPost(post) : null;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'article ${postId} :`,
      error
    );
    return null;
  }
}

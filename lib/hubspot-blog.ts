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

const getHubSpotAccessToken = () => {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "HUBSPOT_ACCESS_TOKEN is required for OAuth authentication"
    );
  }
  return accessToken;
};

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

// Fonction pour récupérer les articles de blog via API REST
async function fetchHubSpotBlogPosts(
  limit: number = 100
): Promise<HubSpotBlogPost[]> {
  const accessToken = getHubSpotAccessToken();

  const response = await fetch(
    `https://api.hubapi.com/cms/v3/blogs/posts?limit=${limit}&archived=false&state=PUBLISHED`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Fonction pour récupérer un article spécifique via API REST
async function fetchHubSpotBlogPost(
  postId: string
): Promise<HubSpotBlogPost | null> {
  const accessToken = getHubSpotAccessToken();

  const response = await fetch(
    `https://api.hubapi.com/cms/v3/blogs/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }

  return await response.json();
}

export async function getHubSpotBlogPosts(
  limit: number = 100
): Promise<BlogPost[]> {
  try {
    const posts = await fetchHubSpotBlogPosts(limit);

    return posts.map((post: HubSpotBlogPost) => ({
      id: post.id || "",
      title: post.name || "",
      excerpt: post.postSummary || post.metaDescription || "",
      content: post.postBody || "",
      publishDate: post.publishDate || "",
      modifiedDate: post.updated || "",
      author: post.blogAuthorId || "E2I VoIP",
      authorId: post.blogAuthorId || "",
      tags: post.tagIds || [],
      categories: [],
      slug: post.slug || "",
      url: post.url || "",
      featuredImage: post.featuredImage || "",
      metaDescription: post.metaDescription || "",
      seoTitle: post.htmlTitle || post.name || "",
    }));
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

    if (!post) {
      return null;
    }

    return {
      id: post.id || "",
      title: post.name || "",
      excerpt: post.postSummary || post.metaDescription || "",
      content: post.postBody || "",
      publishDate: post.publishDate || "",
      modifiedDate: post.updated || "",
      author: post.blogAuthorId || "E2I VoIP",
      authorId: post.blogAuthorId || "",
      tags: post.tagIds || [],
      categories: [],
      slug: post.slug || "",
      url: post.url || "",
      featuredImage: post.featuredImage || "",
      metaDescription: post.metaDescription || "",
      seoTitle: post.htmlTitle || post.name || "",
    };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'article ${postId} :`,
      error
    );
    return null;
  }
}

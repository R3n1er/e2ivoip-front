export interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    publishDate: string;
    author: string;
    tags: string[];
    categories: string[];
    featuredImage?: {
      data: {
        attributes: {
          url: string;
          formats: {
            thumbnail: { url: string };
            medium: { url: string };
            large: { url: string };
          };
        };
      };
    };
    metaDescription?: string;
    seoTitle?: string;
    readingTime?: number;
    originalUrl?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Récupère tous les articles de blog avec pagination
 */
export async function getStrapiBlogPosts(
  page: number = 1,
  pageSize: number = 12
): Promise<StrapiResponse<StrapiBlogPost[]>> {
  const response = await fetch(
    `${STRAPI_URL}/api/blog-posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&sort=publishedAt:desc&filters[status][$eq]=published`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Récupère un article de blog par son slug
 */
export async function getStrapiBlogPost(
  slug: string
): Promise<StrapiBlogPost | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*&filters[status][$eq]=published`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0] || null;
}

/**
 * Recherche dans les articles de blog
 */
export async function searchStrapiBlogPosts(
  query: string,
  filters?: any,
  page: number = 1,
  pageSize: number = 12
): Promise<StrapiResponse<StrapiBlogPost[]>> {
  const params = new URLSearchParams({
    "filters[$or][0][title][$containsi]": query,
    "filters[$or][1][content][$containsi]": query,
    "filters[$or][2][excerpt][$containsi]": query,
    "filters[status][$eq]": "published",
    populate: "*",
    sort: "publishedAt:desc",
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
  });

  // Ajouter les filtres supplémentaires
  if (filters) {
    if (filters.author) {
      params.append("filters[author][$eq]", filters.author);
    }
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach((tag: string) => {
        params.append("filters[tags][$contains]", tag);
      });
    }
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach((category: string) => {
        params.append("filters[categories][$contains]", category);
      });
    }
  }

  const response = await fetch(
    `${STRAPI_URL}/api/blog-posts?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to search blog posts: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Récupère les articles par catégorie
 */
export async function getStrapiBlogPostsByCategory(
  category: string,
  page: number = 1,
  pageSize: number = 12
): Promise<StrapiResponse<StrapiBlogPost[]>> {
  const response = await fetch(
    `${STRAPI_URL}/api/blog-posts?filters[categories][$contains]=${category}&filters[status][$eq]=published&populate=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch blog posts by category: ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Récupère les métadonnées pour les facettes (auteurs, tags, catégories)
 */
export async function getStrapiBlogMetadata(): Promise<{
  authors: string[];
  tags: string[];
  categories: string[];
}> {
  const response = await fetch(
    `${STRAPI_URL}/api/blog-posts?filters[status][$eq]=published&populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blog metadata: ${response.statusText}`);
  }

  const data = await response.json();

  const authors = new Set<string>();
  const tags = new Set<string>();
  const categories = new Set<string>();

  data.data.forEach((post: StrapiBlogPost) => {
    if (post.attributes.author) {
      authors.add(post.attributes.author);
    }
    if (post.attributes.tags) {
      post.attributes.tags.forEach((tag) => tags.add(tag));
    }
    if (post.attributes.categories) {
      post.attributes.categories.forEach((category) =>
        categories.add(category)
      );
    }
  });

  return {
    authors: Array.from(authors),
    tags: Array.from(tags),
    categories: Array.from(categories),
  };
}

/**
 * Transforme un article Strapi en format compatible avec l'interface existante
 */
export function transformStrapiPost(post: StrapiBlogPost) {
  return {
    id: post.id.toString(),
    title: post.attributes.title,
    excerpt: post.attributes.excerpt || "",
    content: post.attributes.content,
    publishDate: post.attributes.publishDate || post.attributes.publishedAt,
    modifiedDate: post.attributes.updatedAt,
    author: post.attributes.author,
    authorId: post.attributes.author,
    tags: post.attributes.tags || [],
    categories: post.attributes.categories || [],
    slug: post.attributes.slug,
    url: `/blog/${post.attributes.slug}`,
    featuredImage: post.attributes.featuredImage?.data?.attributes?.url,
    metaDescription: post.attributes.metaDescription,
    seoTitle: post.attributes.seoTitle,
    readingTime: post.attributes.readingTime,
    originalUrl: post.attributes.originalUrl,
  };
}

import type {
  BlogListResult,
  BlogMetadata,
  PublicBlogPost,
} from "@/lib/blog-types";
import type { BlogPost } from "@/lib/hubspot-blog";
import {
  getHubSpotBlogMetadata,
  getHubSpotBlogPostBySlug,
  getHubSpotBlogPostsForSitemap,
  getHubSpotBlogPostsPaginated,
  isHubSpotAccessTokenConfigured,
  searchHubSpotBlogPosts,
} from "@/lib/hubspot-blog";
import { stripHtml } from "@/lib/blog-utils";

export function isBlogSourceConfigured(): boolean {
  return isHubSpotAccessTokenConfigured();
}

/**
 * Normalise un slug HubSpot en slug de route Next.js.
 *
 * L'API HubSpot renvoie le chemin complet de l'article, préfixe du blog inclus
 * (`blog/mon-article`). La route `/blog/[slug]` n'attend que le segment final :
 * sans ce nettoyage, les URLs générées deviennent `/blog/blog/mon-article`.
 */
function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+/, "").replace(/^blog\//, "");
}

function mapHubSpotToPublic(post: BlogPost): PublicBlogPost {
  const slug = normalizeSlug(post.slug || "");

  return {
    id: post.id,
    title: post.title,
    slug,
    excerpt: stripHtml(post.excerpt || ""),
    content: post.content || "",
    featuredImageUrl: post.featuredImage,
    featuredImage: post.featuredImage,
    author: post.author || "",
    authorId: post.authorId || "",
    publishDate: post.publishDate || "",
    modifiedDate: post.modifiedDate || post.publishDate || "",
    metaDescription: post.metaDescription || "",
    seoTitle: post.seoTitle || post.title,
    tags: post.tags || [],
    categories: post.categories || [],
    // Toujours reconstruire le lien interne : `post.url` contient l'URL absolue
    // servie par HubSpot, qui pointerait vers l'ancien site après la migration.
    url: `/blog/${slug}`,
  };
}

export async function getBlogPosts(
  page = 1,
  pageSize = 12,
  query = ""
): Promise<BlogListResult> {
  if (!isBlogSourceConfigured()) {
    throw new Error("HUBSPOT_ACCESS_TOKEN manquant pour le blog");
  }

  const result = query
    ? await searchHubSpotBlogPosts(query, page, pageSize)
    : await getHubSpotBlogPostsPaginated(page, pageSize);

  return {
    posts: result.posts.map(mapHubSpotToPublic),
    total: result.total,
  };
}

export async function getBlogPostBySlug(
  slug: string
): Promise<PublicBlogPost | null> {
  if (!isBlogSourceConfigured()) {
    return null;
  }

  const post = await getHubSpotBlogPostBySlug(slug);
  return post ? mapHubSpotToPublic(post) : null;
}

export async function getBlogMetadata(): Promise<BlogMetadata> {
  if (!isBlogSourceConfigured()) {
    return { tags: [], authors: [], years: [] };
  }

  return getHubSpotBlogMetadata();
}

/**
 * Articles destinés au sitemap XML, avec mise en cache.
 *
 * Les URLs produites doivent rester identiques à celles de l'ancien site
 * HubSpot : on réutilise donc `post.slug` sans transformation.
 */
export async function getBlogPostsForSitemap(): Promise<PublicBlogPost[]> {
  if (!isBlogSourceConfigured()) {
    return [];
  }

  const posts = await getHubSpotBlogPostsForSitemap();
  return posts.map(mapHubSpotToPublic);
}

/**
 * Récupère les articles d'une catégorie (ex. "3cx", "trunk-sip", "voip").
 *
 * Les tags renvoyés par l'API HubSpot sont des identifiants numériques
 * (`tagIds`), pas les slugs lisibles utilisés dans les URLs. On filtre donc
 * sur le contenu textuel de l'article plutôt que sur `post.tags`.
 *
 * Ces pages existent pour absorber les URLs `/blog/tag/<slug>` de l'ancien
 * site HubSpot via redirection 301 : elles doivent toujours répondre avec du
 * contenu, sinon la redirection pointe vers un 404 et l'autorité est perdue.
 */
export async function getBlogPostsByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 12
): Promise<BlogListResult> {
  if (!isBlogSourceConfigured()) {
    return { posts: [], total: 0 };
  }

  // "trunk-sip" doit aussi matcher "trunk sip" dans le corps du texte.
  const query = decodeURIComponent(categorySlug).replace(/-/g, " ").trim();

  return getBlogPosts(page, pageSize, query);
}

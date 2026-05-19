import type {
  BlogListResult,
  BlogMetadata,
  PublicBlogPost,
} from "@/lib/blog-types";
import type { BlogPost } from "@/lib/hubspot-blog";
import {
  getHubSpotBlogMetadata,
  getHubSpotBlogPostBySlug,
  getHubSpotBlogPostsPaginated,
  isHubSpotAccessTokenConfigured,
  searchHubSpotBlogPosts,
} from "@/lib/hubspot-blog";

export function isBlogSourceConfigured(): boolean {
  return isHubSpotAccessTokenConfigured();
}

function mapHubSpotToPublic(post: BlogPost): PublicBlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
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
    url: post.url || `/blog/${post.slug}`,
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

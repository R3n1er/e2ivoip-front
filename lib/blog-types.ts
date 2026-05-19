/**
 * Type partagé pour le blog public (listing, grille, pages article).
 * Source unique : API CMS HubSpot (voir lib/hubspot-blog.ts).
 */
export interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImageUrl?: string;
  featuredImage?: string;
  author?: string;
  authorId?: string;
  publishDate?: string;
  modifiedDate?: string;
  metaDescription?: string;
  seoTitle?: string;
  tags?: string[];
  categories?: string[];
  url?: string;
}

export interface BlogListResult {
  posts: PublicBlogPost[];
  total: number;
}

export interface BlogMetadata {
  tags: string[];
  authors: string[];
  years: number[];
}

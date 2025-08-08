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

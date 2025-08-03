import { Client } from "@hubspot/api-client";

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

const getHubSpotClient = () => {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    throw new Error("HUBSPOT_API_KEY is required");
  }
  return new Client({ accessToken: apiKey });
};

export async function getHubSpotBlogPosts(
  limit: number = 100
): Promise<BlogPost[]> {
  try {
    const hubspot = getHubSpotClient();
    const response = await hubspot.cms.blogs.blogPostsApi.getPage(
      undefined,
      limit,
      undefined,
      [
        "id",
        "name",
        "postSummary",
        "postBody",
        "publishDate",
        "updated",
        "blogAuthorId",
        "tagIds",
        "slug",
        "url",
        "featuredImage",
        "metaDescription",
        "htmlTitle",
      ],
      undefined,
      undefined,
      false
    );
    return response.results.map((post) => ({
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
    const hubspot = getHubSpotClient();
    const response = await hubspot.cms.blogs.blogPostsApi.getById(postId, [
      "id",
      "name",
      "postSummary",
      "postBody",
      "publishDate",
      "updated",
      "blogAuthorId",
      "tagIds",
      "slug",
      "url",
      "featuredImage",
      "metaDescription",
      "htmlTitle",
    ]);
    return {
      id: response.id || "",
      title: response.name || "",
      excerpt: response.postSummary || response.metaDescription || "",
      content: response.postBody || "",
      publishDate: response.publishDate || "",
      modifiedDate: response.updated || "",
      author: response.blogAuthorId || "E2I VoIP",
      authorId: response.blogAuthorId || "",
      tags: response.tagIds || [],
      categories: [],
      slug: response.slug || "",
      url: response.url || "",
      featuredImage: response.featuredImage || "",
      metaDescription: response.metaDescription || "",
      seoTitle: response.htmlTitle || response.name || "",
    };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'article ${postId} :`,
      error
    );
    return null;
  }
}

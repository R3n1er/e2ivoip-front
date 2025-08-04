import algoliasearch from "algoliasearch";
import type { BlogPost } from "./hubspot-blog";

const getAlgoliaClient = () => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
  if (!appId || !apiKey) {
    throw new Error("Configuration Algolia manquante");
  }
  return algoliasearch(appId, apiKey);
};

const BLOG_INDEX_NAME = "e2i_blog_posts";

export interface AlgoliaBlogPost extends BlogPost {
  objectID: string;
  _tags: string[];
  publishYear: number;
  publishMonth: number;
  wordCount: number;
}

export function transformPostForAlgolia(post: BlogPost): AlgoliaBlogPost {
  const publishDate = new Date(post.publishDate);
  const wordCount = post.content.split(/\s+/).length;
  return {
    ...post,
    objectID: post.id,
    _tags: [...post.tags, ...post.categories, post.author],
    publishYear: publishDate.getFullYear(),
    publishMonth: publishDate.getMonth() + 1,
    wordCount,
  };
}

export async function indexBlogPostsToAlgolia(posts: BlogPost[]) {
  try {
    const client = getAlgoliaClient();
    const index = client.initIndex(BLOG_INDEX_NAME);
    const algoliaObjects = posts.map(transformPostForAlgolia);
    await index.saveObjects(algoliaObjects);
    await index.setSettings({
      searchableAttributes: [
        "title",
        "excerpt",
        "content",
        "author",
        "tags",
        "categories",
      ],
      attributesForFaceting: [
        "filterOnly(publishYear)",
        "filterOnly(publishMonth)",
        "author",
        "tags",
        "categories",
      ],
      customRanking: ["desc(publishDate)", "desc(wordCount)"],
      hitsPerPage: 12,
      maxValuesPerFacet: 50,
    });
    console.log(`${algoliaObjects.length} articles indexés dans Algolia`);
  } catch (error) {
    console.error("Erreur lors de l'indexation Algolia:", error);
  }
}

export async function syncHubSpotToAlgolia() {
  try {
    const { getHubSpotBlogPosts } = await import("./hubspot-blog");
    const posts = await getHubSpotBlogPosts();
    await indexBlogPostsToAlgolia(posts);
    return { success: true, count: posts.length };
  } catch (error) {
    console.error("Erreur lors de la synchronisation:", error);
    return { success: false, error: error.message };
  }
}

export async function searchBlogPosts(
  query: string, 
  filters?: any, 
  page: number = 1
) {
  try {
    const client = getAlgoliaClient();
    const index = client.initIndex(BLOG_INDEX_NAME);
    const hitsPerPage = 12;
    const offset = (page - 1) * hitsPerPage;
    
    const searchOptions: any = {
      hitsPerPage,
      page: page - 1, // Algolia utilise un index basé sur 0
      facets: ["author", "tags", "publishYear"],
    };
    
    if (filters) {
      if (filters.author) searchOptions.filters = `author:"${filters.author}"`;
      if (filters.year) searchOptions.filters = `publishYear:${filters.year}`;
      if (filters.tags && filters.tags.length > 0) {
        const tagFilters = filters.tags
          .map((tag: string) => `tags:"${tag}"`)
          .join(" OR ");
        searchOptions.filters = searchOptions.filters
          ? `${searchOptions.filters} AND (${tagFilters})`
          : `(${tagFilters})`;
      }
    }
    
    const results = await index.search(query, searchOptions);
    return results;
  } catch (error) {
    console.error("Erreur lors de la recherche Algolia:", error);
    return { hits: [], nbHits: 0, facets: {} };
  }
}

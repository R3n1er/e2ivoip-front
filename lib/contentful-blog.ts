/*
  Service Contentful (Content Delivery API)
  - Récupération d'articles publiés pour le front-end
  - Ne dépend pas du SDK; utilise fetch et les tokens Delivery/Preview
*/

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any; // Rich text JSON de Contentful
  featuredImageUrl?: string;
  author?: string;
  publishDate?: string;
  metaDescription?: string;
  seoTitle?: string;
  tags?: string[];
}

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID as string;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
// Autoriser aussi CONTENTFUL_ACCESS_TOKEN comme alias du token Delivery
const DELIVERY_TOKEN = (process.env.CONTENTFUL_DELIVERY_TOKEN ||
  process.env.CONTENTFUL_ACCESS_TOKEN) as string;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN as
  | string
  | undefined;
const CT_ID = process.env.CONTENTFUL_CONTENT_TYPE_ID || "blogPost";

function assertEnv() {
  if (!SPACE_ID || !DELIVERY_TOKEN) {
    throw new Error(
      "CONTENTFUL_SPACE_ID ou CONTENTFUL_DELIVERY_TOKEN (ou CONTENTFUL_ACCESS_TOKEN) manquant"
    );
  }
}

function baseUrl(preview = false): string {
  const host = preview ? "preview.contentful.com" : "cdn.contentful.com";
  return `https://${host}/spaces/${SPACE_ID}/environments/${ENV_ID}`;
}

async function cfFetch(path: string, preview = false): Promise<any> {
  const token = preview && PREVIEW_TOKEN ? PREVIEW_TOKEN : DELIVERY_TOKEN;
  const res = await fetch(`${baseUrl(preview)}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Contentful error ${res.status}: ${body}`);
  }
  return res.json();
}

function resolveAssetUrl(assets: any[], assetId?: string): string | undefined {
  if (!assetId) return undefined;
  const asset = assets.find((a) => a.sys?.id === assetId);
  const fileUrl =
    asset?.fields?.file?.url || asset?.fields?.file?.["en-US"]?.url;
  if (!fileUrl) return undefined;
  return fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl;
}

function mapEntryToPost(entry: any, includes: any): BlogPost {
  const f = entry.fields || {};
  const get = (key: string) => f[key] ?? f[key]?.["en-US"];
  const featuredImageId = get("featuredImage")?.sys?.id;
  return {
    id: entry.sys?.id,
    title: get("title") || "",
    slug: get("slug") || "",
    excerpt: get("excerpt") || "",
    content: get("content"),
    featuredImageUrl: resolveAssetUrl(includes?.Asset || [], featuredImageId),
    author: get("author") || "",
    publishDate: get("publishDate") || "",
    metaDescription: get("metaDescription") || "",
    seoTitle: get("seoTitle") || get("title") || "",
    tags: get("tags") || [],
  };
}

export async function getContentfulBlogPosts(
  page = 1,
  pageSize = 12,
  preview = false
): Promise<{ posts: BlogPost[]; total: number }> {
  assertEnv();
  const skip = (page - 1) * pageSize;
  const params = new URLSearchParams({
    content_type: CT_ID,
    limit: String(pageSize),
    skip: String(skip),
    order: "-fields.publishDate",
    include: "1",
  });
  const data = await cfFetch(`/entries?${params.toString()}`, preview);
  const posts = (data.items || []).map((it: any) =>
    mapEntryToPost(it, data.includes)
  );
  return { posts, total: data.total || posts.length };
}

export async function getContentfulBlogPost(
  slug: string,
  preview = false
): Promise<BlogPost | null> {
  assertEnv();
  const params = new URLSearchParams({
    content_type: CT_ID,
    limit: "1",
    include: "2",
    "fields.slug": slug,
  });
  const data = await cfFetch(`/entries?${params.toString()}`, preview);
  if (!data.items?.length) return null;
  return mapEntryToPost(data.items[0], data.includes);
}

export async function searchContentfulBlogPosts(
  query: string,
  page = 1,
  pageSize = 12,
  preview = false
): Promise<{ posts: BlogPost[]; total: number }> {
  assertEnv();
  const skip = (page - 1) * pageSize;
  const params = new URLSearchParams({
    content_type: CT_ID,
    limit: String(pageSize),
    skip: String(skip),
    query,
    include: "1",
  });
  const data = await cfFetch(`/entries?${params.toString()}`, preview);
  const posts = (data.items || []).map((it: any) =>
    mapEntryToPost(it, data.includes)
  );
  return { posts, total: data.total || posts.length };
}

export async function getContentfulBlogMetadata(preview = false): Promise<{
  tags: string[];
  authors: string[];
  years: number[];
}> {
  assertEnv();
  const params = new URLSearchParams({
    content_type: CT_ID,
    select: "fields.tags,fields.author,fields.publishDate",
    limit: "1000",
  });
  const data = await cfFetch(`/entries?${params.toString()}`, preview);
  const items = data.items || [];
  const tags = new Set<string>();
  const authors = new Set<string>();
  const years = new Set<number>();
  for (const it of items) {
    const f = it.fields || {};
    const get = (k: string) => f[k] ?? f[k]?.["en-US"];
    (get("tags") || []).forEach((t: string) => t && tags.add(t));
    const a = get("author");
    if (a) authors.add(a);
    const d = get("publishDate");
    if (d) years.add(new Date(d).getFullYear());
  }
  return {
    tags: Array.from(tags),
    authors: Array.from(authors),
    years: Array.from(years).sort((a, b) => b - a),
  };
}

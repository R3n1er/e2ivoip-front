import { NextResponse } from "next/server";
import {
  getContentfulBlogPosts,
  searchContentfulBlogPosts,
  getContentfulBlogMetadata,
} from "@/lib/contentful-blog";

export async function GET(request: Request) {
  try {
    // Garde: si Contentful n'est pas configuré, retourner des listes vides
    if (
      !process.env.CONTENTFUL_SPACE_ID ||
      (!process.env.CONTENTFUL_DELIVERY_TOKEN &&
        !process.env.CONTENTFUL_ACCESS_TOKEN)
    ) {
      return NextResponse.json({
        posts: [],
        total: 0,
        metadata: { tags: [], authors: [], years: [] },
      });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "12");
    const q = searchParams.get("q") || "";

    const preview = false;
    const { posts, total } = q
      ? await searchContentfulBlogPosts(q, page, pageSize, preview)
      : await getContentfulBlogPosts(page, pageSize, preview);

    const meta = await getContentfulBlogMetadata(preview);

    // Adapter la forme attendue par le grid (content string pour temps de lecture)
    const mapped = posts.map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt || "",
      content:
        typeof p.content === "string"
          ? p.content
          : JSON.stringify(p.content || {}),
      publishDate: p.publishDate || "",
      modifiedDate: p.publishDate || "",
      author: p.author || "",
      authorId: p.author || "",
      tags: p.tags || [],
      categories: [],
      slug: p.slug,
      url: `/blog/${p.slug}`,
      featuredImage: p.featuredImageUrl,
      featuredImageUrl: p.featuredImageUrl,
      metaDescription: p.metaDescription || "",
      seoTitle: p.seoTitle || p.title,
    }));

    return NextResponse.json({ posts: mapped, total, metadata: meta });
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "Erreur interne du serveur";
    console.error("Erreur API blog/list:", e);
    return NextResponse.json(
      {
        error: errorMessage,
        posts: [],
        total: 0,
        metadata: { tags: [], authors: [], years: [] },
      },
      { status: 500 }
    );
  }
}

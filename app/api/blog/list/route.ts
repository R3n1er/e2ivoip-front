import { NextResponse } from "next/server";
import {
  getBlogMetadata,
  getBlogPosts,
  isBlogSourceConfigured,
} from "@/lib/blog-source";
import { stripHtml } from "@/lib/blog-utils";

export async function GET(request: Request) {
  try {
    if (!isBlogSourceConfigured()) {
      const message = "HUBSPOT_ACCESS_TOKEN manquant";
      return NextResponse.json(
        {
          error: message,
          posts: [],
          total: 0,
          metadata: { tags: [], authors: [], years: [] },
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "12");
    const q = searchParams.get("q") || "";

    const { posts, total } = await getBlogPosts(page, pageSize, q);
    const meta = await getBlogMetadata();

    const mapped = posts.map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: stripHtml(p.excerpt || ""),
      content: p.content || "",
      publishDate: p.publishDate || "",
      modifiedDate: p.modifiedDate || p.publishDate || "",
      author: p.author || "",
      authorId: p.authorId || p.author || "",
      tags: p.tags || [],
      categories: p.categories || [],
      slug: p.slug,
      url: p.url || `/blog/${p.slug}`,
      featuredImage: p.featuredImage || p.featuredImageUrl,
      featuredImageUrl: p.featuredImageUrl || p.featuredImage,
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

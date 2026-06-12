import { NextResponse } from "next/server";
import { getBlogPostBySlug, isBlogSourceConfigured } from "@/lib/blog-source";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!isBlogSourceConfigured()) {
      return NextResponse.json(
        { error: "Source blog non configurée" },
        { status: 503 }
      );
    }

    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...post,
      featuredImageUrl: post.featuredImageUrl || post.featuredImage,
    });
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "Erreur interne du serveur";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

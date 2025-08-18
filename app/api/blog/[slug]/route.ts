import { NextResponse } from "next/server";
import { getContentfulBlogPost } from "@/lib/contentful-blog";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getContentfulBlogPost(slug, false);
    if (!post)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "Erreur interne du serveur";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getHubSpotBlogPosts } from "@/lib/hubspot-blog";

export async function GET() {
  try {
    // Tester la connexion en essayant de récupérer les articles
    const posts = await getHubSpotBlogPosts(1);

    return NextResponse.json({
      connected: true,
      message: "Connexion HubSpot réussie",
      postsCount: posts.length,
    });
  } catch (error) {
    console.error("Erreur de test de connexion HubSpot:", error);

    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

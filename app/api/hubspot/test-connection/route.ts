import { NextResponse } from "next/server";
import {
  getHubSpotBlogPostsStrict,
  isHubSpotAccessTokenConfigured,
} from "@/lib/hubspot-blog";

export async function GET() {
  if (!isHubSpotAccessTokenConfigured()) {
    return NextResponse.json(
      {
        connected: false,
        error: "HUBSPOT_ACCESS_TOKEN manquant",
        postsCount: 0,
      },
      { status: 503 }
    );
  }

  try {
    const posts = await getHubSpotBlogPostsStrict(1);

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
        postsCount: 0,
      },
      { status: 500 }
    );
  }
}

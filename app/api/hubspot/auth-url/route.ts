import { NextResponse } from "next/server";
import { getHubSpotAuthUrl } from "@/lib/hubspot-blog";

export async function GET() {
  try {
    const authUrl = getHubSpotAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de générer l'URL OAuth HubSpot",
      },
      { status: 500 }
    );
  }
}

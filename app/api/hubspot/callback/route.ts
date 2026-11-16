import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/hubspot-blog";
import { SITE_URL } from "@/lib/site";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Erreur OAuth HubSpot:", error);
      return NextResponse.redirect(
        new URL("/?error=hubspot_oauth_error", SITE_URL)
      );
    }

    if (!code) {
      console.error("Code d'autorisation manquant");
      return NextResponse.redirect(
        new URL("/?error=missing_auth_code", SITE_URL)
      );
    }

    // Échanger le code contre un access token
    const accessToken = await exchangeCodeForToken(code);

    console.log("Access token HubSpot obtenu avec succès");

    // Rediriger vers la page d'accueil avec un message de succès
    return NextResponse.redirect(
      new URL("/?success=hubspot_connected", SITE_URL)
    );
  } catch (error) {
    console.error("Erreur lors de l'échange du code OAuth:", error);
    return NextResponse.redirect(
      new URL("/?error=token_exchange_failed", SITE_URL)
    );
  }
}

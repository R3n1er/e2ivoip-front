import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/hubspot-blog";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Erreur OAuth HubSpot:", error);
      return NextResponse.redirect(
        new URL("/?error=hubspot_oauth_error", request.url)
      );
    }

    if (!code) {
      console.error("Code d'autorisation manquant");
      return NextResponse.redirect(
        new URL("/?error=missing_auth_code", request.url)
      );
    }

    // Échanger le code contre un access token
    const accessToken = await exchangeCodeForToken(code);

    console.log("Access token HubSpot obtenu avec succès");

    // Rediriger vers la page d'accueil avec un message de succès
    return NextResponse.redirect(
      new URL("/?success=hubspot_connected", request.url)
    );
  } catch (error) {
    console.error("Erreur lors de l'échange du code OAuth:", error);
    return NextResponse.redirect(
      new URL("/?error=token_exchange_failed", request.url)
    );
  }
}

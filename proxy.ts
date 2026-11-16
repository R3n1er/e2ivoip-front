import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Garde d'accès de l'admin HubSpot (vuln-0003, scan Strix 2026-08-20).
 *
 * `/admin/hubspot` et ses routes API exposaient des informations sur le compte
 * HubSpot et lançaient des appels serveur sans aucune authentification.
 *
 * Authentification HTTP Basic : le navigateur affiche sa propre fenêtre de
 * connexion, puis renvoie les identifiants aux appels `fetch` de la page. Seul
 * le mot de passe compte (`ADMIN_PASSWORD`), le nom d'utilisateur est libre.
 * Sans `ADMIN_PASSWORD`, l'accès reste fermé.
 *
 * Next.js 16 : ce fichier remplace `middleware.ts` et tourne en Node.js.
 */

const REALM = 'Basic realm="E2I VoIP admin", charset="UTF-8"';

function sha256(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

/** Comparaison à temps constant : hacher d'abord égalise les longueurs. */
function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(sha256(a), sha256(b));
}

function passwordFrom(authorization: string | null): string | null {
  if (!authorization?.startsWith("Basic ")) return null;
  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString(
      "utf8"
    );
    const separator = decoded.indexOf(":");
    return separator === -1 ? null : decoded.slice(separator + 1);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = passwordFrom(request.headers.get("authorization"));

  if (expected && provided !== null && safeEqual(provided, expected)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/hubspot/test-connection",
    "/api/hubspot/auth-url",
    "/api/hubspot/callback",
  ],
};

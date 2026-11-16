/**
 * vuln-0004 (scan Strix 2026-08-20) : open redirect dans le callback OAuth.
 *
 * Les redirections étaient construites depuis `request.url`, donc depuis
 * l'en-tête `Host`, que le client contrôle. Elles doivent toujours viser le
 * domaine canonique du site.
 *
 * @jest-environment node
 */

jest.mock("@/lib/hubspot-blog", () => ({
  exchangeCodeForToken: jest.fn().mockResolvedValue("jeton-de-test"),
}));

import { NextRequest } from "next/server";
import { GET } from "@/app/api/hubspot/callback/route";
import { SITE_URL } from "@/lib/site";

function callback(query: string): NextRequest {
  return new NextRequest(`https://attaquant.example/api/hubspot/callback${query}`);
}

describe("GET /api/hubspot/callback", () => {
  it.each([
    ["succès", "?code=abc"],
    ["code manquant", ""],
    ["erreur OAuth", "?error=access_denied"],
  ])("redirige vers le domaine canonique (%s)", async (_cas, query) => {
    const response = await GET(callback(query));

    const location = response.headers.get("location") ?? "";
    expect(location.startsWith(`${SITE_URL}/`)).toBe(true);
    expect(location).not.toContain("attaquant.example");
  });
});

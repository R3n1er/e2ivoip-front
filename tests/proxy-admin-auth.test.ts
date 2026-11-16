/**
 * vuln-0003 (scan Strix 2026-08-20) : l'admin HubSpot et ses routes de
 * diagnostic étaient accessibles sans authentification.
 *
 * `proxy.ts` (ex-`middleware.ts`, renommé en Next.js 16) exige une
 * authentification HTTP Basic dont le mot de passe vient de `ADMIN_PASSWORD`.
 * Sans cette variable, l'accès reste fermé.
 *
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { proxy, config } from "@/proxy";

const PASSWORD = "mot-de-passe-de-test";

function basic(user: string, password: string): string {
  return `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
}

function request(path: string, authorization?: string): NextRequest {
  const headers: Record<string, string> = {};
  if (authorization) headers.authorization = authorization;
  return new NextRequest(`https://www.e2i-voip.com${path}`, { headers });
}

describe("proxy : protection de l'admin HubSpot", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ADMIN_PASSWORD: PASSWORD };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it.each([
    "/admin/hubspot",
    "/api/hubspot/test-connection",
    "/api/hubspot/auth-url",
    "/api/hubspot/callback",
  ])("refuse %s sans identifiants, avec un défi Basic", (path) => {
    const response = proxy(request(path));

    expect(response.status).toBe(401);
    expect(response.headers.get("www-authenticate")).toMatch(/^Basic realm=/);
  });

  it("refuse un mauvais mot de passe", () => {
    const response = proxy(request("/admin/hubspot", basic("admin", "faux")));

    expect(response.status).toBe(401);
  });

  it("refuse un en-tête Authorization malformé", () => {
    const response = proxy(request("/admin/hubspot", "Basic !!!pas-du-base64"));

    expect(response.status).toBe(401);
  });

  it("laisse passer le bon mot de passe", () => {
    const response = proxy(request("/admin/hubspot", basic("admin", PASSWORD)));

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("reste fermé quand ADMIN_PASSWORD n'est pas défini", () => {
    delete process.env.ADMIN_PASSWORD;

    const response = proxy(request("/admin/hubspot", basic("admin", "")));

    expect(response.status).toBe(401);
  });

  it("ne cible que l'admin et les routes HubSpot sensibles", () => {
    expect(config.matcher).toEqual([
      "/admin/:path*",
      "/api/hubspot/test-connection",
      "/api/hubspot/auth-url",
      "/api/hubspot/callback",
    ]);
  });
});

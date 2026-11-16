/**
 * vuln-0001 (scan Strix 2026-08-20) : contournement du rate-limit.
 *
 * `x-forwarded-for` est transmis par le client : s'il passe en premier, un
 * script qui invente une adresse à chaque requête obtient un compteur neuf à
 * chaque fois. `x-real-ip`, posé par Vercel, doit primer, et toute valeur qui
 * n'est pas une adresse IP doit être écartée.
 *
 * @jest-environment node
 */

import { getClientIdentifier } from "@/lib/api/rate-limit";

function withHeaders(headers: Record<string, string>) {
  return new Request("https://www.e2i-voip.com/api/test", { headers });
}

describe("getClientIdentifier", () => {
  it("privilégie x-real-ip, posé par la plateforme, sur x-forwarded-for", () => {
    const request = withHeaders({
      "x-real-ip": "203.0.113.7",
      "x-forwarded-for": "198.51.100.99",
    });

    expect(getClientIdentifier(request)).toBe("203.0.113.7");
  });

  it("garde un x-forwarded-for forgé sans effet quand x-real-ip est présent", () => {
    const first = withHeaders({
      "x-real-ip": "203.0.113.7",
      "x-forwarded-for": "10.0.0.1",
    });
    const second = withHeaders({
      "x-real-ip": "203.0.113.7",
      "x-forwarded-for": "10.0.0.2",
    });

    expect(getClientIdentifier(first)).toBe(getClientIdentifier(second));
  });

  it("se replie sur la première adresse de x-forwarded-for sans x-real-ip", () => {
    const request = withHeaders({
      "x-forwarded-for": "198.51.100.4, 10.0.0.1",
    });

    expect(getClientIdentifier(request)).toBe("198.51.100.4");
  });

  it("accepte une adresse IPv6", () => {
    const request = withHeaders({ "x-real-ip": "2001:db8::1" });

    expect(getClientIdentifier(request)).toBe("2001:db8::1");
  });

  it("écarte une valeur qui n'est pas une adresse IP", () => {
    const request = withHeaders({
      "x-forwarded-for": "pas-une-ip-aleatoire-123",
    });

    expect(getClientIdentifier(request)).toBe("unknown");
  });

  it("renvoie unknown sans aucun en-tête", () => {
    expect(getClientIdentifier(withHeaders({}))).toBe("unknown");
  });
});

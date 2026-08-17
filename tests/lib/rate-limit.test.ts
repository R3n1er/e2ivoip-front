import {
  checkRateLimit,
  getClientIdentifier,
  resetRateLimits,
} from "@/lib/api/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
    jest.useRealTimers();
  });

  it("autorise les requêtes tant que la limite n'est pas atteinte", () => {
    for (let i = 0; i < 5; i += 1) {
      expect(checkRateLimit("1.2.3.4", 5, 60000).allowed).toBe(true);
    }
  });

  it("bloque au-delà de la limite et indique le délai d'attente", () => {
    for (let i = 0; i < 5; i += 1) checkRateLimit("1.2.3.4", 5, 60000);

    const result = checkRateLimit("1.2.3.4", 5, 60000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
    expect(result.retryAfter).toBeLessThanOrEqual(60);
  });

  it("compte chaque appelant séparément", () => {
    for (let i = 0; i < 5; i += 1) checkRateLimit("1.2.3.4", 5, 60000);

    expect(checkRateLimit("1.2.3.4", 5, 60000).allowed).toBe(false);
    expect(checkRateLimit("5.6.7.8", 5, 60000).allowed).toBe(true);
  });

  it("réautorise après expiration de la fenêtre", () => {
    jest.useFakeTimers();
    const start = Date.now();

    for (let i = 0; i < 5; i += 1) checkRateLimit("1.2.3.4", 5, 60000);
    expect(checkRateLimit("1.2.3.4", 5, 60000).allowed).toBe(false);

    jest.setSystemTime(start + 60001);
    expect(checkRateLimit("1.2.3.4", 5, 60000).allowed).toBe(true);
  });
});

describe("getClientIdentifier", () => {
  /** `Request` n'existe pas sous jsdom : seul l'accès aux en-têtes importe. */
  const requeteAvec = (entetes: Record<string, string>) => ({
    headers: { get: (nom: string) => entetes[nom.toLowerCase()] ?? null },
  });

  it("retient la première adresse de x-forwarded-for", () => {
    const request = requeteAvec({
      "x-forwarded-for": "203.0.113.1, 70.41.3.18",
    });
    expect(getClientIdentifier(request)).toBe("203.0.113.1");
  });

  it("bascule sur x-real-ip en l'absence de x-forwarded-for", () => {
    expect(getClientIdentifier(requeteAvec({ "x-real-ip": "203.0.113.9" }))).toBe(
      "203.0.113.9"
    );
  });

  it("retourne 'unknown' sans en-tête exploitable", () => {
    expect(getClientIdentifier(requeteAvec({}))).toBe("unknown");
  });
});

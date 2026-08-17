/**
 * Limitation de débit en mémoire pour les routes API publiques.
 *
 * Portée volontairement modeste : le compteur vit dans l'instance de fonction.
 * Sur Vercel (Fluid Compute), les instances étant réutilisées entre requêtes,
 * cela suffit à bloquer un script naïf qui martèle une route d'écriture CRM.
 * Ce n'est en revanche pas une protection contre une attaque distribuée — il
 * faudrait alors un store partagé (Redis) ou Vercel BotID.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Empêche la Map de croître indéfiniment sur une instance longue durée. */
function purgeExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Secondes avant la réinitialisation du quota, pour l'en-tête Retry-After. */
  retryAfter: number;
}

export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > 1000) purgeExpired(now);

  const bucket = buckets.get(identifier);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * Identifie l'appelant via les en-têtes de proxy. `x-forwarded-for` peut
 * contenir une chaîne d'adresses : la première est celle du client.
 *
 * Ne dépend que de la lecture des en-têtes, ce qui accepte aussi bien un
 * `Request` standard qu'un objet équivalent en test.
 */
export function getClientIdentifier(request: {
  headers: { get(name: string): string | null };
}): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Réinitialise l'état — réservé aux tests. */
export function resetRateLimits(): void {
  buckets.clear();
}

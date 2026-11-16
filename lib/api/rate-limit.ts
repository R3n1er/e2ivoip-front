/**
 * Limitation de débit en mémoire pour les routes API publiques.
 *
 * Portée volontairement modeste : le compteur vit dans l'instance de fonction.
 * Sur Vercel (Fluid Compute), les instances étant réutilisées entre requêtes,
 * cela suffit à bloquer un script naïf qui martèle une route d'écriture CRM.
 * Ce n'est en revanche pas une protection contre une attaque distribuée — il
 * faudrait alors un store partagé (Redis) ou Vercel BotID.
 */

import { isIP } from "node:net";

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
 * Identifie l'appelant via les en-têtes de proxy.
 *
 * `x-real-ip` passe en premier : sur Vercel, la plateforme le pose elle-même
 * et le client ne peut pas le choisir. `x-forwarded-for` n'est qu'un repli
 * (développement local, autre hébergeur) : le client peut le forger, et le
 * lire en premier laissait un script inventer une adresse par requête pour
 * repartir d'un quota neuf (vuln-0001, scan Strix 2026-08-20). Toute valeur
 * qui n'est pas une adresse IP est écartée.
 *
 * Ne dépend que de la lecture des en-têtes, ce qui accepte aussi bien un
 * `Request` standard qu'un objet équivalent en test.
 */
export function getClientIdentifier(request: {
  headers: { get(name: string): string | null };
}): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp && isIP(realIp)) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0].trim();
  if (firstForwarded && isIP(firstForwarded)) return firstForwarded;

  return "unknown";
}

/** Réinitialise l'état — réservé aux tests. */
export function resetRateLimits(): void {
  buckets.clear();
}

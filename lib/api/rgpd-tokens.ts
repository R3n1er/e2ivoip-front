/**
 * Store en mémoire des jetons de confirmation RGPD.
 *
 * Un POST sur /api/rgpd/demande ne suffit plus à déclencher une demande :
 * le demandeur doit cliquer un lien reçu par mail pour confirmer que la
 * boîte est bien à lui. Le délai légal d'un mois part de cette confirmation.
 *
 * Pourquoi un store en mémoire :
 *  - Les demandes sont rares (quelques dizaines par an au maximum).
 *  - Vercel Fluid Compute garde les instances chaudes entre requêtes.
 *  - Ajouter Vercel KV ou Postgres pour si peu de volume serait du YAGNI.
 *
 * Limites assumées :
 *  - Une instance redémarrée perd les jetons en vol : le demandeur devra
 *    resoumettre (lui est envoyé un mail d'erreur clair si son lien expire).
 *  - Une attaque distribuée pourrait saturer la Map : `purgeExpired` plafonne
 *    la taille, et `MAX_TOKENS` est une sécurité supplémentaire.
 *
 * Anti-leak : le token n'est jamais conservé en clair. Seul son hash SHA-256
 * sert de clé dans la Map. `peekRgpdToken` renvoie `payload + expiresAt`,
 * jamais le token.
 */

import type { RgpdDemandePayload } from "@/app/api/rgpd/demande/route";

/** Durée de vie d'un jeton : 24h, conformément au spec. */
export const RGPD_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

/** Plafond de sécurité : au-delà, on refuse la création. */
const MAX_TOKENS = 1000;

interface StoredToken {
  payload: RgpdDemandePayload;
  expiresAt: number;
}

const tokens = new Map<string, StoredToken>();
/**
 * Tokens déjà consommés : on garde leur empreinte pour distinguer un
 * second clic (statut `already`) d'un token inconnu (statut `invalid`).
 * L'entrée est supprimée à la purge périodique.
 */
const consumed = new Set<string>();

function hashToken(token: string): string {
  // Web Crypto API disponible dans Node 18+ (Edge et Vercel Functions).
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  // Sync digest via Node crypto — Vercel Node runtime expose `crypto`.
  // On évite une fonction async pour rester simple.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nodeCrypto = require("node:crypto") as typeof import("node:crypto");
  return nodeCrypto.createHash("sha256").update(data).digest("hex");
}

/** Génère un jeton opaque en hexadécimal (32 octets = 64 chars). */
function generateToken(): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nodeCrypto = require("node:crypto") as typeof import("node:crypto");
  return nodeCrypto.randomBytes(32).toString("hex");
}

export interface CreatedToken {
  /** Jeton opaque, à transmettre uniquement dans le mail de confirmation. */
  token: string;
  /** Timestamp d'expiration (ms epoch). */
  expiresAt: number;
}

export interface PeekedToken {
  payload: RgpdDemandePayload;
  expiresAt: number;
}

export function createRgpdToken(
  payload: RgpdDemandePayload
): CreatedToken {
  if (tokens.size >= MAX_TOKENS) {
    purgeExpiredRgpdTokens(Date.now());
    if (tokens.size >= MAX_TOKENS) {
      throw new Error("Limite interne de jetons RGPD atteinte.");
    }
  }

  const token = generateToken();
  const expiresAt = Date.now() + RGPD_TOKEN_TTL_MS;
  tokens.set(hashToken(token), { payload, expiresAt });

  return { token, expiresAt };
}

/** Lit un jeton sans le consommer. Renvoie `null` si inconnu ou expiré. */
export function peekRgpdToken(token: string): PeekedToken | null {
  const entry = tokens.get(hashToken(token));
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) return null;
  return { payload: entry.payload, expiresAt: entry.expiresAt };
}

/**
 * Consomme un jeton : renvoie le payload associé et supprime le jeton.
 *
 * Trois résultats possibles :
 *  - `null` : token inconnu ou déjà consommé ;
 *  - `{ expired: true }` : token existant mais expiré (déjà purgé du store) ;
 *  - `{ expired: false }` : token valide et nouvellement consommé.
 *
 * Pour distinguer un second clic d'un token inconnu, l'appelant peut
 * consulter `wasAlreadyConsumed(token)` après un retour nul.
 */
export interface ConsumedToken {
  payload: RgpdDemandePayload;
  expiresAt: number;
  expired: boolean;
}

export function consumeRgpdToken(token: string): ConsumedToken | null {
  const key = hashToken(token);
  const entry = tokens.get(key);
  if (!entry) return null;
  tokens.delete(key);
  consumed.add(key);
  const expired = entry.expiresAt <= Date.now();
  return { payload: entry.payload, expiresAt: entry.expiresAt, expired };
}

/**
 * Vrai si le token a déjà été consommé avec succès par le passé. Utilisé
 * par /api/rgpd/confirm pour afficher un statut `already` lors d'un
 * second clic plutôt qu'un `invalid` (qui ferait penser que le lien est
 * corrompu alors qu'il a déjà servi).
 */
export function wasAlreadyConsumed(token: string): boolean {
  return consumed.has(hashToken(token));
}

/** Purge les jetons expirés. Appelé périodiquement par `createRgpdToken`. */
export function purgeExpiredRgpdTokens(now: number = Date.now()): void {
  for (const [key, entry] of tokens) {
    if (entry.expiresAt <= now) tokens.delete(key);
  }
  // Les empreintes consommées n'ont plus d'utilité après l'expiration :
  // au-delà, le token ne peut plus être rejoué (l'entrée valide est supprimée).
  // On garde l'ensemble borné par MAX_TOKENS pour éviter une croissance
  // indéfinie : au-delà, on vide.
  if (consumed.size > MAX_TOKENS) consumed.clear();
}

/** Reset complet — réservé aux tests. */
export function __resetRgpdTokensForTests(): void {
  tokens.clear();
}
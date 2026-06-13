/**
 * Source unique de vérité pour l'identité du site (SEO).
 *
 * Le domaine de production est `https://www.e2i-voip.com` (avec www, avec tiret).
 * On lit `NEXT_PUBLIC_BASE_URL` en priorité (configurable sur Vercel) et on
 * retombe sur le domaine de prod si la variable n'est pas définie.
 *
 * ⚠️ Ne jamais re-coder une URL de base en dur ailleurs : importer SITE_URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.e2i-voip.com"
).replace(/\/$/, "");

/** Nom commercial officiel, réutilisé dans les métadonnées et le JSON-LD. */
export const SITE_NAME = "E2I VoIP";

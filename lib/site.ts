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

/**
 * Titre SEO de la page d'accueil, partagé avec les métadonnées sociales.
 *
 * Arbitrage Alban (2026-09-19) : l'entité « opérateur télécom » seule ne dit pas
 * ce qui est vendu. Google recomposait l'encart de marque à partir des puces
 * de la page. Le titre nomme désormais les deux produits phares (standard
 * téléphonique, Trunk SIP) et la zone commerciale — l'entité reste portée par
 * la meta description, le hero et le JSON-LD Organization.
 */
// Arbitrage Alban (2026-09-19), après revue croisée Codex + Opus.
//
// Le titre précédent (« Opérateur de services télécom DOM ») décrivait une
// entité, pas une offre : personne ne tape cette requête. La première version
// de cette PR basculait vers « Standard téléphonique & Trunk SIP », mais
// évacuait « téléphonie IP » — le champ sur lequel le site est déjà 2e, avec
// de l'antériorité. En SEO local on additionne un champ, on n'échange pas un
// acquis contre une hypothèse.
//
// Le titre retenu conserve les trois actifs, dans cet ordre de poids :
//   1. « Opérateur » — le différenciant : nos concurrents locaux sont
//      intégrateurs et renvoient vers un opérateur tiers ; nous faisons les deux
//   2. « téléphonie IP » — la position acquise
//   3. « standard téléphonique » — le champ ouvert par cette PR
//
// « Trunk SIP » sort du titre de la home : terme d'acheteur technique, qui
// ranke déjà sur sa page dédiée. L'ancrage géographique est porté par la meta
// description et le corps de page (territoires nommés, indicatifs locaux).
//
// 58 caractères — sous la limite de troncature (~60), avec une marge qui
// évite de couper « | E2I VoIP » et de perdre la marque en SERP.
export const HOME_PAGE_TITLE =
  "Opérateur téléphonie IP & standard téléphonique | E2I VoIP";

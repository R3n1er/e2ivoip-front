/**
 * Garde-fous partagés pour les scripts de scraping du blog.
 * Empêche puppeteer de suivre une URL en dehors du domaine attendu
 * (SSRF via un lien injecté dans le DOM scrapé) et empêche un slug
 * scrapé de sortir du dossier de destination (traversée de chemin).
 */

const ALLOWED_HOST = "www.e2i-voip.com";

function assertSafeBlogUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error(`URL invalide: ${rawUrl}`);
  }

  if (parsed.protocol !== "https:" || parsed.hostname !== ALLOWED_HOST) {
    throw new Error(`URL non autorisée (hôte attendu: ${ALLOWED_HOST}): ${rawUrl}`);
  }

  return parsed.href;
}

function isSafeSlug(slug) {
  return typeof slug === "string" && /^[a-zA-Z0-9-]+$/.test(slug);
}

function safeSlugSegment(slug) {
  if (!isSafeSlug(slug)) {
    throw new Error(`Slug invalide (attendu: lettres/chiffres/tirets uniquement): ${slug}`);
  }
  return slug;
}

module.exports = { ALLOWED_HOST, assertSafeBlogUrl, isSafeSlug, safeSlugSegment };

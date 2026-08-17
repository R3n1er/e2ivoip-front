/**
 * Utilitaires partagés pour le rendu du blog.
 */

/**
 * Nettoie le HTML HubSpot pour n'en garder que le texte.
 *
 * HubSpot envoie les extraits (`postSummary`) enrobés de HTML
 * (`<p>…</p>`, `<span>…</span>`). En JSX, `{post.excerpt}` échappe
 * ces balises : elles s'affichent en clair dans le navigateur.
 * Cette fonction les supprime pour obtenir du texte plain.
 */
export function stripHtml(value?: string): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
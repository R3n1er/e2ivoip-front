import sanitizeHtml from "sanitize-html";

/**
 * Utilitaires partagés pour le rendu du blog.
 */

/**
 * Assainit le HTML HubSpot avant rendu via dangerouslySetInnerHTML.
 * HubSpot est une source tierce (éditeurs multiples, compte potentiellement
 * compromis) : sans ce filtrage, du HTML/JS arbitraire s'exécuterait chez
 * chaque visiteur de l'article (XSS stockée).
 *
 * `sanitize-html` (pur JS, sans jsdom) est utilisé plutôt que DOMPurify :
 * la variante isomorphic-dompurify tire jsdom, dont une dépendance
 * transitive (html-encoding-sniffer -> @exodus/bytes) casse au runtime
 * sur Vercel (require() d'un module ESM), ce qui faisait planter /blog.
 */
export function sanitizeBlogHtml(value?: string): string {
  if (!value) return "";
  return sanitizeHtml(value, {
    allowedTags: [
      "p", "br", "hr",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "strong", "em", "b", "i", "u", "s", "span",
      "ul", "ol", "li",
      "a", "img",
      "blockquote", "pre", "code",
      "table", "thead", "tbody", "tr", "th", "td",
      "figure", "figcaption",
    ],
    allowedAttributes: {
      "*": ["class", "title"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
}

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
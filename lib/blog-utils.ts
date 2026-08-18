import { FilterXSS } from "xss";

/**
 * Utilitaires partagés pour le rendu du blog.
 */

const ATTRIBUTS_COMMUNS = ["class", "title"];

/**
 * Filtre XSS configuré pour le HTML éditorial HubSpot.
 *
 * `xss` est préféré à DOMPurify et à sanitize-html pour des raisons de
 * runtime : isomorphic-dompurify tire jsdom, dont une dépendance transitive
 * casse au chargement sur Vercel (require() d'un module ESM) et faisait
 * planter /blog ; sanitize-html à jour tire htmlparser2 v12, ESM pur, que
 * Jest ne peut pas charger. `xss` est du CommonJS sans dépendance native.
 */
const filtreXss = new FilterXSS({
  whiteList: {
    p: ATTRIBUTS_COMMUNS,
    br: [],
    hr: [],
    h1: ATTRIBUTS_COMMUNS,
    h2: ATTRIBUTS_COMMUNS,
    h3: ATTRIBUTS_COMMUNS,
    h4: ATTRIBUTS_COMMUNS,
    h5: ATTRIBUTS_COMMUNS,
    h6: ATTRIBUTS_COMMUNS,
    strong: ATTRIBUTS_COMMUNS,
    em: ATTRIBUTS_COMMUNS,
    b: ATTRIBUTS_COMMUNS,
    i: ATTRIBUTS_COMMUNS,
    u: ATTRIBUTS_COMMUNS,
    s: ATTRIBUTS_COMMUNS,
    span: ATTRIBUTS_COMMUNS,
    ul: ATTRIBUTS_COMMUNS,
    ol: ATTRIBUTS_COMMUNS,
    li: ATTRIBUTS_COMMUNS,
    a: [...ATTRIBUTS_COMMUNS, "href", "target", "rel"],
    img: [...ATTRIBUTS_COMMUNS, "src", "alt", "width", "height"],
    blockquote: ATTRIBUTS_COMMUNS,
    pre: ATTRIBUTS_COMMUNS,
    code: ATTRIBUTS_COMMUNS,
    table: ATTRIBUTS_COMMUNS,
    thead: ATTRIBUTS_COMMUNS,
    tbody: ATTRIBUTS_COMMUNS,
    tr: ATTRIBUTS_COMMUNS,
    th: ATTRIBUTS_COMMUNS,
    td: ATTRIBUTS_COMMUNS,
    figure: ATTRIBUTS_COMMUNS,
    figcaption: ATTRIBUTS_COMMUNS,
  },
  // Supprime les balises non autorisées au lieu de les échapper en texte
  // visible, et vide entièrement le contenu des balises exécutables.
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style", "iframe", "object", "embed"],
});

/**
 * Supprime les balises de template HubL laissées non compilées par HubSpot.
 *
 * L'API CMS renvoie parfois dans `postBody` le source d'un module
 * (`{% module_block %}…{% end_module_block %}`) au lieu de son rendu : sans
 * ce nettoyage, ce code s'affiche en clair au milieu de l'article.
 */
function retirerBalisesHubL(value: string): string {
  return value
    .replace(/{%[\s\S]*?%}/g, "")
    .replace(/{{[\s\S]*?}}/g, "");
}

/**
 * Assainit le HTML HubSpot avant rendu via dangerouslySetInnerHTML.
 * HubSpot est une source tierce (éditeurs multiples, compte potentiellement
 * compromis) : sans ce filtrage, du HTML/JS arbitraire s'exécuterait chez
 * chaque visiteur de l'article (XSS stockée).
 */
export function sanitizeBlogHtml(value?: string): string {
  if (!value) return "";
  return filtreXss.process(retirerBalisesHubL(value));
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
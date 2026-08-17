import { HUBSPOT_IMAGE_MAP } from "@/lib/blog-image-map";

/**
 * Redirige une image d'article vers sa copie locale.
 *
 * Les articles restent rédigés dans HubSpot, mais leurs visuels sont
 * versionnés dans `public/images/blog/`. Sans cette réécriture, le blog
 * continuerait de dépendre du CDN fichiers HubSpot pour s'afficher.
 *
 * Une URL absente de la table est renvoyée telle quelle : une image ajoutée
 * dans HubSpot et pas encore rapatriée s'affiche depuis le CDN plutôt que de
 * disparaître. `next.config.js` conserve donc ses `remotePatterns`.
 */
export function localizeBlogImage(url: string): string;
export function localizeBlogImage(url: undefined): undefined;
export function localizeBlogImage(url?: string): string | undefined;
export function localizeBlogImage(url?: string): string | undefined {
  if (!url) {
    return url;
  }

  return HUBSPOT_IMAGE_MAP[url] ?? url;
}

/**
 * Réécrit les images insérées dans le corps HTML d'un article.
 *
 * Le contenu HubSpot est injecté via `dangerouslySetInnerHTML` : ces balises
 * `<img>` échappent à `next/image`, donc à toute réécriture côté composant.
 * On substitue les URLs sur la chaîne HTML avant le rendu.
 */
export function localizeBlogImagesInHtml(html: string): string {
  if (!html) {
    return html;
  }

  return Object.entries(HUBSPOT_IMAGE_MAP).reduce(
    (contenu, [distante, locale]) => contenu.split(distante).join(locale),
    html
  );
}

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Construction des métadonnées de page.
 *
 * ⚠️ Next.js **remplace** `openGraph` et `twitter` en bloc : il ne fusionne pas
 * champ par champ avec le layout racine. Une page qui déclare
 * `openGraph: { title, description, type }` perd donc `og:image`, `og:url` et
 * `og:site_name` — le lien partagé sur LinkedIn ou WhatsApp s'affiche sans
 * visuel. Le défaut est silencieux : ni erreur ni warning au build.
 *
 * `pageMetadata()` réinjecte systématiquement les champs partagés. Utiliser
 * cette fonction plutôt que d'écrire `openGraph` à la main.
 */

/** Image de partage par défaut, servie depuis /public. */
export const DEFAULT_OG_IMAGE = "/images/e2i-voip-partage.png";

const DEFAULT_OG_IMAGE_ALT =
  "E2I VoIP — Opérateur de services télécom, spécialiste des DOM";

export type PageMetadataInput = {
  /** Title de la page, sans le suffixe marque : `title.template` l'ajoute. */
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, ex. `/contact`. Sert au canonical et à og:url. */
  path: string;
  /**
   * Canonical différent de la route, quand deux URL présentent la même offre
   * et qu'une seule doit concentrer le signal SEO.
   *
   * Exemple : `/3cx-pro` désigne `/telephonie-3cx` comme page de référence.
   * À n'utiliser que sur décision explicite — un canonical erroné désindexe.
   */
  canonicalOverride?: string;
  keywords?: string;
  /** Image de partage spécifique à la page. Défaut : l'image du site. */
  image?: string;
  imageAlt?: string;
  /** Défaut `website`. Les articles de blog utilisent `article`. */
  type?: "website" | "article";
};

/**
 * Produit un objet `Metadata` complet : canonical, Open Graph et Twitter
 * cohérents entre eux et avec la page.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  canonicalOverride,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: canonicalOverride ?? path,
    },
    openGraph: {
      title,
      description,
      type,
      locale: "fr_FR",
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

import { Breadcrumb, BREADCRUMB_HOME, type BreadcrumbItem } from "@/components/layout/breadcrumb";

/**
 * Insère le fil d'Ariane en tête d'une page (juste après l'ouverture du
 * fragment/div racine). Le breadcrumb est un server component : il peut
 * être rendu avant les sections client de la page.
 *
 * Convention E2I VoIP :
 * - Accueil › [Section] › [Page] — la page courante est toujours le
 *   dernier item, sans href.
 * - Les libellés reprennent les H1/titres des pages pour la cohérence
 *   SEO (le JSON-LD doit refléter la hiérarchie visible).
 */
export const PAGE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/contact": [
    BREADCRUMB_HOME,
    { label: "Contact" },
  ],
  "/assistance": [
    BREADCRUMB_HOME,
    { label: "Assistance" },
  ],
  "/blog": [
    BREADCRUMB_HOME,
    { label: "Blog" },
  ],
  "/devis-en-ligne": [
    BREADCRUMB_HOME,
    { label: "Devis en ligne" },
  ],
  "/nos-services": [
    BREADCRUMB_HOME,
    { label: "Nos services" },
  ],
  "/qui-sommes-nous": [
    BREADCRUMB_HOME,
    { label: "Qui sommes-nous" },
  ],
  "/3cx-pro": [
    BREADCRUMB_HOME,
    { label: "3CX PRO" },
  ],
  "/studio-attente": [
    BREADCRUMB_HOME,
    { label: "Studio d'attente téléphonique" },
  ],
  "/studio-attente/devis": [
    BREADCRUMB_HOME,
    { label: "Studio d'attente", href: "/studio-attente" },
    { label: "Devis studio humain" },
  ],
  "/telephonie-entreprise": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise" },
  ],
  "/telephonie-entreprise/trunk-sip-illimite": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise", href: "/telephonie-entreprise" },
    { label: "Trunk SIP Illimité" },
  ],
  "/telephonie-entreprise/trunk-sip-compteur": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise", href: "/telephonie-entreprise" },
    { label: "Trunk SIP au compteur" },
  ],
  "/telephonie-entreprise/3cx-smb-mutualisee": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise", href: "/telephonie-entreprise" },
    { label: "3CX SMB mutualisée" },
  ],
  "/telephonie-entreprise/pbx-yeastar": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise", href: "/telephonie-entreprise" },
    { label: "PBX Yeastar" },
  ],
  "/telephonie-entreprise/aircall": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise", href: "/telephonie-entreprise" },
    { label: "Intégration Aircall" },
  ],
  "/telephonie-entreprise/trunk-sip-agents-ia": [
    BREADCRUMB_HOME,
    { label: "Téléphonie d'entreprise", href: "/telephonie-entreprise" },
    { label: "Trunk SIP Agents IA" },
  ],
  "/trunk-sip-agents-vocaux-ia-revendeurs": [
    BREADCRUMB_HOME,
    { label: "Trunk SIP Agents vocaux IA — Revendeurs" },
  ],
};

/**
 * Humanise un segment d'URL en libellé lisible :
 * "trunk-sip-illimite" → "Trunk sip illimite"
 */
function humanizeSegment(segment: string): string {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

/** Retourne les items du fil d'Ariane pour un chemin donné. */
export function getBreadcrumbForPath(path: string): BreadcrumbItem[] {
  // Routes exactes du registre.
  const exact = PAGE_BREADCRUMBS[path];
  if (exact) return exact;

  // Routes dynamiques du blog.
  if (path === "/" || path.startsWith("/index")) {
    return [];
  }
  const blogArticleMatch = path.match(/^\/blog\/(?!categorie$)[^/]+$/);
  if (blogArticleMatch) {
    return [
      BREADCRUMB_HOME,
      { label: "Blog", href: "/blog" },
      { label: humanizeSegment(path.split("/").pop() ?? "") },
    ];
  }
  const blogCategoryMatch = path.match(/^\/blog\/categorie\/[^/]+$/);
  if (blogCategoryMatch) {
    return [
      BREADCRUMB_HOME,
      { label: "Blog", href: "/blog" },
      { label: humanizeSegment(path.split("/").pop() ?? "") },
    ];
  }

  // Fallback générique : Accueil › [segment humanisé].
  return [
    BREADCRUMB_HOME,
    { label: humanizeSegment(path.split("/").filter(Boolean).pop() ?? path) },
  ];
}

import Link from "next/link";

/**
 * Fil d'Ariane global du site — affiché sur toutes les pages sauf l'accueil.
 *
 * Affiche : Accueil › [Section] › [Sous-section] › [Page courante]
 * Le dernier élément n'est pas un lien (page courante). Un JSON-LD
 * schema.org BreadcrumbList accompagne le rendu pour la recherche Google
 * et les crawlers IA.
 */

export interface BreadcrumbItem {
  label: string;
  /** Chemin interne ; les items sans href ne sont pas des liens. */
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.e2i-voip.com${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <script
        type="application/ld+json"
        // Données statiques construites ci-dessus, jamais d'entrée utilisateur.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href ?? item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-gray-400">
                  ›
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-red-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-gray-700">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Item standard « Accueil » commun à tous les fils d'Ariane.
 */
export const BREADCRUMB_HOME: BreadcrumbItem = {
  label: "Accueil",
  href: "/",
};

/**
 * Composant prêt à l'emploi pour les pages juridiques (rétrocompatibilité).
 * Chaque page rend <LegalBreadcrumb current="…" /> en tête :
 *   Accueil › [page courante]
 */
export function LegalBreadcrumb({
  current,
}: {
  /** Libellé de la page courante. */
  current: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <Breadcrumb items={[BREADCRUMB_HOME, { label: current }]} />
    </div>
  );
}

/**
 * Fil d'Ariane de l'espace juridique — réexporte le composant global
 * `components/layout/breadcrumb.tsx` (source unique).
 *
 * Historique : ce composant vivait ici avant d'être généralisé à tout
 * le site. Le réexport conserve la compatibilité des imports existants.
 */
export { Breadcrumb, LegalBreadcrumb } from "@/components/layout/breadcrumb";
export type { BreadcrumbItem } from "@/components/layout/breadcrumb";

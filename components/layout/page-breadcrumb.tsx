"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/layout/breadcrumb";
import { getBreadcrumbForPath } from "@/lib/navigation/breadcrumbs";

/**
 * Fil d'Ariane global automatique — affiché sur toutes les pages du site
 * sauf l'accueil et l'espace juridique (qui gère déjà son propre fil
 * d'Ariane nativement dans chaque page).
 *
 * Composant client (`usePathname`) rendu en SSR : le HTML et le JSON-LD
 * BreadcrumbList sont présents dans la réponse serveur, donc accessibles
 * aux crawlers classiques comme aux crawlers IA (GPTBot, ClaudeBot,
 * PerplexityBot…).
 *
 * Le registre `lib/navigation/breadcrumbs.ts` définit les libellés ;
 * les routes dynamiques (blog) utilisent des règles par préfixe.
 */
export function PageBreadcrumb() {
  const pathname = usePathname();

  // Pas de fil d'Ariane sur l'accueil.
  if (!pathname || pathname === "/") return null;

  // L'espace juridique rend son propre fil d'Ariane (LegalBreadcrumb)
  // dans chaque page — on évite un doublon.
  if (pathname.startsWith("/juridique")) return null;

  // Pages techniques non indexables : pas de fil d'Ariane.
  if (pathname.startsWith("/admin") || pathname.startsWith("/offline")) {
    return null;
  }

  const items: BreadcrumbItem[] = getBreadcrumbForPath(pathname);
  if (!items || items.length < 2) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <Breadcrumb items={items} />
    </div>
  );
}

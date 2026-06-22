import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap généré à partir des routes RÉELLES de l'application (`app/**`).
 *
 * Exclusions volontaires :
 * - `/admin/*`, `/offline` : non indexables.
 * - `/blog` + articles : les slugs viennent de HubSpot ; le détail sera ajouté
 *   plus tard une fois la liste fiable récupérée. La home du blog reste listée.
 *
 * ⚠️ Toute nouvelle page publique doit être ajoutée ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  type Entry = {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  };

  const routes: Entry[] = [
    // Accueil
    { path: "", changeFrequency: "daily", priority: 1.0 },

    // Pages catégorie / hub
    { path: "/telephonie-entreprise", changeFrequency: "weekly", priority: 0.9 },
    { path: "/nos-services", changeFrequency: "weekly", priority: 0.9 },

    // Offres produit (téléphonie entreprise)
    { path: "/telephonie-entreprise/trunk-sip-agents-ia", changeFrequency: "weekly", priority: 0.9 },
    { path: "/telephonie-entreprise/trunk-sip-compteur", changeFrequency: "monthly", priority: 0.8 },
    { path: "/telephonie-entreprise/trunk-sip-illimite", changeFrequency: "monthly", priority: 0.8 },
    { path: "/telephonie-entreprise/pbx-yeastar", changeFrequency: "monthly", priority: 0.8 },

    // 3CX (page unique : présente les offres SMB mutualisée et PRO dédiée)
    { path: "/telephonie-3cx", changeFrequency: "monthly", priority: 0.9 },

    // Services & conversion
    { path: "/devis-en-ligne", changeFrequency: "monthly", priority: 0.8 },
    { path: "/assistance", changeFrequency: "monthly", priority: 0.7 },
    { path: "/studio-attente", changeFrequency: "monthly", priority: 0.6 },

    // Entreprise & contact
    { path: "/qui-sommes-nous", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },

    // Blog (home uniquement pour l'instant)
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },

    // Légal
    { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
    { path: "/politique-confidentialite", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

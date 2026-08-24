import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getBlogPostsForSitemap } from "@/lib/blog-source";

/**
 * Sitemap généré à partir des routes RÉELLES de l'application (`app/**`),
 * complété par les articles du blog lus depuis l'API HubSpot.
 *
 * Exclusions volontaires :
 * - `/admin/*`, `/offline` : non indexables.
 *
 * Migration SEO : les articles reprennent les slugs HubSpot à l'identique, afin
 * que leurs URLs restent celles indexées par Google sur l'ancien site. Les
 * pages `/blog/categorie/*` reçoivent les redirections 301 des anciennes URLs
 * `/blog/tag/*` (voir `redirects()` dans next.config.js) et doivent donc être
 * déclarées ici.
 *
 * ⚠️ Toute nouvelle page publique doit être ajoutée ici.
 */

/**
 * Régénération horaire.
 *
 * Les articles proviennent d'un `fetch` HubSpot ; sans `revalidate`, Next.js
 * rendrait /sitemap.xml à la demande et chaque passage d'un robot déclencherait
 * un appel à l'API. Une heure suffit pour un blog publiant quelques articles
 * par mois.
 */
export const revalidate = 3600;

/**
 * Catégories du blog reprenant les tags de l'ancien site HubSpot.
 * Cibles des redirections 301 depuis `/blog/tag/<slug>`.
 */
const BLOG_CATEGORIES = ["3cx", "pabx", "trunk-sip", "voip"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

    // Blog
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },

    // Légal
    { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
    { path: "/politique-confidentialite", changeFrequency: "yearly", priority: 0.3 },
    { path: "/exercer-mes-droits", changeFrequency: "yearly", priority: 0.3 },
    { path: "/conditions-generales-de-vente", changeFrequency: "yearly", priority: 0.3 },
    { path: "/accord-sous-traitance-rgpd", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  const categoryEntries: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((slug) => ({
    url: `${SITE_URL}/blog/categorie/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Le sitemap ne doit jamais faire échouer le build : si l'API HubSpot est
  // indisponible, on publie les pages statiques plutôt que rien du tout.
  // Un sitemap sans article reste toutefois anormal : l'erreur est journalisée
  // explicitement pour être repérée en sortie de build.
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPostsForSitemap();
    articleEntries = posts
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${SITE_URL}/blog/${encodeURI(post.slug)}`,
        lastModified: post.modifiedDate
          ? new Date(post.modifiedDate)
          : post.publishDate
            ? new Date(post.publishDate)
            : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch (error) {
    console.error(
      "[sitemap] Articles HubSpot indisponibles, sitemap limité aux pages statiques:",
      error
    );
  }

  return [...staticEntries, ...categoryEntries, ...articleEntries];
}

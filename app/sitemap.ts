import { MetadataRoute } from "next";
import {
  getHubSpotBlogPosts,
  getHubSpotBlogTags,
} from "@/lib/hubspot-blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://e2ivoip.fr";

  // Pages statiques — lastModified = date reelle de derniere mise a jour
  // Mettre a jour cette date a chaque modification significative du contenu de la page
  const staticPages: MetadataRoute.Sitemap = [
    // Accueil
    {
      url: baseUrl,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // Pages de services telephonie (contenu metier principal)
    {
      url: `${baseUrl}/telephonie-entreprise`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/telephonie-entreprise/trunk-sip`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telephonie-entreprise/trunk-sip-compteur`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telephonie-entreprise/trunk-sip-illimite`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telephonie-entreprise/3cx-smb-mutualisee`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telephonie-entreprise/pbx-yeastar`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telephonie-3cx`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Nos services
    {
      url: `${baseUrl}/nos-services`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nos-services/assistants-vocaux-ia`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio-attente`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Conversion
    {
      url: `${baseUrl}/devis-en-ligne`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Institutional
    {
      url: `${baseUrl}/qui-sommes-nous`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/assistance`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Pages legales (faible priorite, rarement mises a jour)
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // URLs blog dynamiques (HubSpot)
  const blogUrls: MetadataRoute.Sitemap = [];

  try {
    const [{ posts }, tags] = await Promise.all([
      getHubSpotBlogPosts({ pageSize: 1000 }),
      getHubSpotBlogTags(),
    ]);

    // Page index blog
    blogUrls.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    // Articles individuels — lastModified issu de HubSpot (date reelle)
    for (const post of posts) {
      blogUrls.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.modifiedDate || post.publishDate),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Pages categories / tags
    for (const tag of tags) {
      blogUrls.push({
        url: `${baseUrl}/blog/categorie/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch (error) {
    console.error("sitemap: erreur lors du fetch HubSpot blog", error);
    // Fallback minimal si HubSpot indisponible
    blogUrls.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return [...staticPages, ...blogUrls];
}

import { MetadataRoute } from "next";
import {
  getHubSpotBlogPosts,
  getHubSpotBlogTags,
} from "@/lib/hubspot-blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://e2ivoip.fr";
  const currentDate = new Date();

  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/qui-sommes-nous`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/devis`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Pages de services détaillées
    {
      url: `${baseUrl}/services/installation-voip`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/maintenance-voip`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/formation-voip`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/support-technique`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Pages de certifications et partenaires
    {
      url: `${baseUrl}/qui-sommes-nous/certifications`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/qui-sommes-nous/partenaires`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Pages légales
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/conditions-utilisation`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Pages de ressources
    {
      url: `${baseUrl}/ressources/guide-voip`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ressources/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ressources/glossaire`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
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
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    });

    // Pages articles individuels
    for (const post of posts) {
      blogUrls.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.modifiedDate || post.publishDate),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Pages catégories / tags
    for (const tag of tags) {
      blogUrls.push({
        url: `${baseUrl}/blog/categorie/${tag.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch (error) {
    console.error("sitemap: erreur lors du fetch HubSpot blog", error);
    // Fallback minimal si HubSpot indisponible
    blogUrls.push({
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return [...staticPages, ...blogUrls];
}

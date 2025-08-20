import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://e2ivoip.fr";
  const currentDate = new Date();

  // Images principales du site
  const mainImages = [
    {
      url: `${baseUrl}/images/logo.svg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/images/photos/pexels-ketut-subiyanto-4559714-min.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/man-oniphone-business-min.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.9,
    },
  ];

  // Images de l'équipe
  const teamImages = [
    {
      url: `${baseUrl}/images/team/alban-renier.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/images/team/valerie-de-jesus.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/images/team/fabien.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
  ];

  // Images des services
  const serviceImages = [
    {
      url: `${baseUrl}/images/services/installation-voip.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/images/services/maintenance-voip.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/images/services/formation-voip.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/images/services/support-technique.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Images des certifications
  const certificationImages = [
    {
      url: `${baseUrl}/images/certifications/cisco-certified.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/images/certifications/avaya-certified.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/images/certifications/microsoft-certified.jpg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ];

  // Images des partenaires
  const partnerImages = [
    {
      url: `${baseUrl}/images/partners/cisco-logo.png`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/images/partners/avaya-logo.png`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/images/partners/microsoft-logo.png`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  // Images du blog
  const blogImages = [
    {
      url: `${baseUrl}/images/blog/voip-entreprise.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/images/blog/systeme-voip.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/images/blog/securite-voip.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Images des ressources
  const resourceImages = [
    {
      url: `${baseUrl}/images/resources/guide-voip.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/images/resources/faq.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/images/resources/glossaire.jpg`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Images des icônes et éléments UI
  const iconImages = [
    {
      url: `${baseUrl}/images/icons/phone.svg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/images/icons/email.svg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/images/icons/location.svg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/images/icons/check.svg`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ];

  // Combiner toutes les images
  const allImages = [
    ...mainImages,
    ...teamImages,
    ...serviceImages,
    ...certificationImages,
    ...partnerImages,
    ...blogImages,
    ...resourceImages,
    ...iconImages,
  ];

  return allImages;
}

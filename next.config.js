const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations des images
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    dangerouslyAllowSVG: true,
    qualities: [60, 70, 75, 80, 85, 90],
    // Images des articles HubSpot CMS
    remotePatterns: [
      { protocol: "https", hostname: "cdn2.hubspot.net" },
      { protocol: "https", hostname: "f.hubspotusercontent00.net" },
      { protocol: "https", hostname: "f.hubspotusercontent10.net" },
      { protocol: "https", hostname: "f.hubspotusercontent20.net" },
      { protocol: "https", hostname: "f.hubspotusercontent30.net" },
      { protocol: "https", hostname: "f.hubspotusercontent40.net" },
      { protocol: "https", hostname: "f.hubspotusercontent-eu1.net" },
      {
        protocol: "https",
        hostname: "26878201.fs1.hubspotusercontent-eu1.net",
        pathname: "/hubfs/26878201/**",
      },
    ],
  },

  // Optimisations des performances
  experimental: {
    optimizeCss: process.env.NODE_ENV === "production",
  },

  // Compression et minification
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Headers de sécurité et performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirections
  async redirects() {
    // --- Migration SEO : ancien site HubSpot -> refonte Next.js ---------------
    //
    // Inventaire de référence : 29 URLs répondant en 200 sur www.e2i-voip.com
    // (sitemap.xml + crawl de la navigation, relevé du 2026-08-15).
    //
    // Toutes ces redirections sont permanentes (301) : c'est le seul statut qui
    // transfère l'autorité SEO accumulée par les backlinks vers la nouvelle URL.
    // Un 302 indiquerait à Google de conserver l'ancienne URL dans son index.
    //
    // ⚠️ Les `source` accentués s'écrivent en clair (é, à), PAS en
    // percent-encoding : Next.js décode l'URL entrante avant le matching.
    //
    // ⚠️ `skipTrailingSlashRedirect: true` est actif plus bas, donc Next.js ne
    // normalise pas `/devis/` en `/devis`. HubSpot servant les deux formes, on
    // ajoute explicitement les variantes avec slash final.
    //
    // Les 15 articles /blog/<slug> ne figurent pas ici : le blog lit l'API
    // HubSpot (lib/blog-source.ts) et réutilise les slugs à l'identique.
    // Leurs URLs sont donc préservées sans redirection.
    const legacyRedirects = [
      // Pages de service renommées
      ["/integration-3cx", "/telephonie-3cx"],
      ["/integration-pbx-voip", "/telephonie-entreprise/pbx-yeastar"],
      ["/passerelles-trunk-sip", "/telephonie-entreprise/trunk-sip-compteur"],

      // Pages transverses renommées
      ["/devis", "/devis-en-ligne"],
      ["/politique-confidentialites", "/politique-confidentialite"],
      ["/fr/presentation-e2i-voip", "/qui-sommes-nous"],

      // Gigaset Fusion : offre retirée du catalogue. Redirection vers la
      // rubrique parente pour conserver l'URL, en assumant la perte de
      // pertinence sur les requêtes de marque « Gigaset ».
      ["/gigaset-fusion", "/telephonie-entreprise"],

      // Pages de tags du blog HubSpot -> pages catégorie de la refonte.
      // app/blog/categorie/[slug] filtre les articles HubSpot par mot-clé et
      // ne renvoie jamais de 404, pour ne pas rediriger vers une page morte.
      ["/blog/tag/3cx", "/blog/categorie/3cx"],
      ["/blog/tag/pabx", "/blog/categorie/pabx"],
      ["/blog/tag/trunk-sip", "/blog/categorie/trunk-sip"],
      ["/blog/tag/voip", "/blog/categorie/voip"],

      // Pagination HubSpot non reprise dans la refonte
      ["/blog/page/2", "/blog"],

      // Alias historiques d'accueil
      ["/home", "/"],
      ["/accueil", "/"],
    ];

    return legacyRedirects.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },

  // Configuration TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuration de build
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

module.exports = withBundleAnalyzer(nextConfig);

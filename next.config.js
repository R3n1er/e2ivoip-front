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
    // Autoriser les images distantes depuis Contentful
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "assets.ctfassets.net",
      },
    ],
  },

  // Optimisations des performances
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@radix-ui/react-icons"],
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
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/accueil",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Configuration TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuration ESLint
  eslint: {
    // Désactive l'exécution du lint pendant le build Next pour éviter l'erreur d'options obsolètes du CLI Next
    ignoreDuringBuilds: true,
  },

  // Configuration de build
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;

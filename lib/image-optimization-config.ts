// Configuration pour l'optimisation des images
export const IMAGE_OPTIMIZATION_CONFIG = {
  // Formats supportés par ordre de priorité
  formats: {
    webp: {
      quality: 80,
      extension: ".webp",
      mimeType: "image/webp",
    },
    avif: {
      quality: 75,
      extension: ".avif",
      mimeType: "image/avif",
    },
    jpeg: {
      quality: 85,
      extension: ".jpg",
      mimeType: "image/jpeg",
    },
    png: {
      quality: 90,
      extension: ".png",
      mimeType: "image/png",
    },
  },

  // Breakpoints pour les images responsives
  breakpoints: {
    xs: { width: 320, suffix: "xs" },
    sm: { width: 640, suffix: "sm" },
    md: { width: 768, suffix: "md" },
    lg: { width: 1024, suffix: "lg" },
    xl: { width: 1280, suffix: "xl" },
    "2xl": { width: 1536, suffix: "2xl" },
  },

  // Qualités par type d'image
  qualities: {
    hero: 90, // Images de héros (priorité haute)
    cover: 85, // Images de couverture
    content: 80, // Images de contenu
    thumbnail: 75, // Miniatures
    background: 70, // Images de fond
    icon: 90, // Icônes et logos
  },

  // Sizes par type d'image
  sizes: {
    hero: "100vw",
    cover: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    content: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw",
    thumbnail: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    background: "100vw",
    icon: "(max-width: 768px) 64px, 128px",
  },

  // Ratios d'aspect prédéfinis
  aspectRatios: {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    "2/1": "aspect-[2/1]",
    "21/9": "aspect-[21/9]",
  },

  // Marges pour l'Intersection Observer
  observerMargins: {
    hero: "200px", // Images de héros chargées plus tôt
    cover: "150px", // Images de couverture
    content: "100px", // Images de contenu
    thumbnail: "50px", // Miniatures
    background: "100px", // Images de fond
  },

  // Délais de transition
  transitions: {
    fadeIn: "duration-500",
    scale: "duration-300",
    blur: "duration-200",
  },

  // Fallback colors par type
  fallbackColors: {
    hero: "bg-gray-800",
    cover: "bg-gray-200",
    content: "bg-gray-100",
    thumbnail: "bg-gray-50",
    background: "bg-gray-300",
  },

  // Placeholder types
  placeholders: {
    blur: "blur",
    empty: "empty",
    color: "color",
  },

  // Compression par format
  compression: {
    webp: {
      method: 6, // Niveau de compression WebP (0-6)
      nearLossless: false,
      smartSubsample: true,
    },
    avif: {
      speed: 6, // Vitesse de compression AVIF (0-10)
      quality: 75,
      chromaSubsampling: "4:2:0",
    },
    jpeg: {
      progressive: true,
      mozjpeg: true,
      quality: 85,
    },
    png: {
      progressive: true,
      compressionLevel: 9,
      adaptiveFiltering: true,
    },
  },
};

// Types pour la configuration
export interface ImageOptimizationConfig {
  format: keyof typeof IMAGE_OPTIMIZATION_CONFIG.formats;
  quality: number;
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "fill" | "scale-down";
  priority?: boolean;
  sizes?: string;
  placeholder?: keyof typeof IMAGE_OPTIMIZATION_CONFIG.placeholders;
  fallbackColor?: string;
  observerMargin?: string;
  aspectRatio?: keyof typeof IMAGE_OPTIMIZATION_CONFIG.aspectRatios;
}

// Configuration par défaut pour différents types d'images
export const DEFAULT_IMAGE_CONFIGS = {
  hero: {
    format: "webp" as const,
    quality: IMAGE_OPTIMIZATION_CONFIG.qualities.hero,
    priority: true,
    sizes: IMAGE_OPTIMIZATION_CONFIG.sizes.hero,
    observerMargin: IMAGE_OPTIMIZATION_CONFIG.observerMargins.hero,
    fallbackColor: IMAGE_OPTIMIZATION_CONFIG.fallbackColors.hero,
  },
  cover: {
    format: "webp" as const,
    quality: IMAGE_OPTIMIZATION_CONFIG.qualities.cover,
    priority: false,
    sizes: IMAGE_OPTIMIZATION_CONFIG.sizes.cover,
    observerMargin: IMAGE_OPTIMIZATION_CONFIG.observerMargins.cover,
    fallbackColor: IMAGE_OPTIMIZATION_CONFIG.fallbackColors.cover,
  },
  content: {
    format: "webp" as const,
    quality: IMAGE_OPTIMIZATION_CONFIG.qualities.content,
    priority: false,
    sizes: IMAGE_OPTIMIZATION_CONFIG.sizes.content,
    observerMargin: IMAGE_OPTIMIZATION_CONFIG.observerMargins.content,
    fallbackColor: IMAGE_OPTIMIZATION_CONFIG.fallbackColors.content,
  },
  thumbnail: {
    format: "webp" as const,
    quality: IMAGE_OPTIMIZATION_CONFIG.qualities.thumbnail,
    priority: false,
    sizes: IMAGE_OPTIMIZATION_CONFIG.sizes.thumbnail,
    observerMargin: IMAGE_OPTIMIZATION_CONFIG.observerMargins.thumbnail,
    fallbackColor: IMAGE_OPTIMIZATION_CONFIG.fallbackColors.thumbnail,
  },
  background: {
    format: "webp" as const,
    quality: IMAGE_OPTIMIZATION_CONFIG.qualities.background,
    priority: false,
    sizes: IMAGE_OPTIMIZATION_CONFIG.sizes.background,
    observerMargin: IMAGE_OPTIMIZATION_CONFIG.observerMargins.background,
    fallbackColor: IMAGE_OPTIMIZATION_CONFIG.fallbackColors.background,
  },
  icon: {
    format: "png" as const,
    quality: IMAGE_OPTIMIZATION_CONFIG.qualities.icon,
    priority: true,
    sizes: IMAGE_OPTIMIZATION_CONFIG.sizes.icon,
    observerMargin: "0px",
    fallbackColor: "bg-transparent",
  },
};

// Fonction utilitaire pour obtenir la configuration par type
export function getImageConfig(
  type: keyof typeof DEFAULT_IMAGE_CONFIGS
): ImageOptimizationConfig {
  return DEFAULT_IMAGE_CONFIGS[type];
}

// Fonction pour générer des URLs optimisées
export function generateOptimizedImageUrl(
  originalSrc: string,
  config: Partial<ImageOptimizationConfig> = {}
): string {
  if (!originalSrc || originalSrc.startsWith("http")) {
    return originalSrc;
  }

  const params = new URLSearchParams();

  if (config.format) {
    params.append("f", config.format);
  }

  if (config.quality) {
    params.append("q", config.quality.toString());
  }

  if (config.width) {
    params.append("w", config.width.toString());
  }

  if (config.height) {
    params.append("h", config.height.toString());
  }

  if (config.fit) {
    params.append("fit", config.fit);
  }

  const queryString = params.toString();
  return queryString ? `${originalSrc}?${queryString}` : originalSrc;
}

import { useState, useEffect, useCallback } from "react";

interface ImageOptimizationConfig {
  format: "webp" | "avif" | "auto";
  quality: number;
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "fill";
}

interface UseImageOptimizationReturn {
  src: string;
  srcSet: string;
  sizes: string;
  loading: "lazy" | "eager";
  onLoad: () => void;
  onError: () => void;
  isLoaded: boolean;
  hasError: boolean;
  format: string;
}

export function useImageOptimization(
  originalSrc: string,
  config: Partial<ImageOptimizationConfig> = {}
): UseImageOptimizationReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [format, setFormat] = useState<string>("webp");

  const {
    format: preferredFormat = "auto",
    quality = 75,
    width,
    height,
    fit = "cover",
  } = config;

  // Détection automatique du format supporté
  useEffect(() => {
    const detectFormat = async () => {
      if (preferredFormat === "auto") {
        // Test WebP
        const webpCanvas = document.createElement("canvas");
        webpCanvas.width = 1;
        webpCanvas.height = 1;

        try {
          const webpDataURL = webpCanvas.toDataURL("image/webp");
          if (webpDataURL.startsWith("data:image/webp")) {
            setFormat("webp");
            return;
          }
        } catch (e) {
          // WebP non supporté
        }

        // Test AVIF
        try {
          const avifCanvas = document.createElement("canvas");
          avifCanvas.width = 1;
          avifCanvas.height = 1;
          const avifDataURL = avifCanvas.toDataURL("image/avif");
          if (avifDataURL.startsWith("data:image/avif")) {
            setFormat("avif");
            return;
          }
        } catch (e) {
          // AVIF non supporté
        }

        // Fallback vers le format original
        setFormat("original");
      } else {
        setFormat(preferredFormat);
      }
    };

    detectFormat();
  }, [preferredFormat]);

  // Génération des URLs optimisées
  const generateOptimizedSrc = useCallback(() => {
    if (!originalSrc) return originalSrc;

    // Si c'est une image externe ou déjà optimisée, retourner l'original
    if (originalSrc.startsWith("http") || originalSrc.includes("_next")) {
      return originalSrc;
    }

    // Pour les images locales, ajouter les paramètres d'optimisation
    const params = new URLSearchParams();

    if (format !== "original") {
      params.append("f", format);
    }

    if (quality !== 75) {
      params.append("q", quality.toString());
    }

    if (width) {
      params.append("w", width.toString());
    }

    if (height) {
      params.append("h", height.toString());
    }

    if (fit !== "cover") {
      params.append("fit", fit);
    }

    const queryString = params.toString();
    return queryString ? `${originalSrc}?${queryString}` : originalSrc;
  }, [originalSrc, format, quality, width, height, fit]);

  // Génération du srcSet pour les images responsives
  const generateSrcSet = useCallback(() => {
    if (!originalSrc || originalSrc.startsWith("http")) return "";

    const breakpoints = [
      { width: 320, suffix: "xs" },
      { width: 640, suffix: "sm" },
      { width: 768, suffix: "md" },
      { width: 1024, suffix: "lg" },
      { width: 1280, suffix: "xl" },
      { width: 1536, suffix: "2xl" },
    ];

    return breakpoints
      .map(({ width: bp, suffix }) => {
        const optimizedSrc = generateOptimizedSrc();
        const separator = optimizedSrc.includes("?") ? "&" : "?";
        return `${optimizedSrc}${separator}w=${bp} ${bp}w`;
      })
      .join(", ");
  }, [originalSrc, generateOptimizedSrc]);

  // Génération des sizes pour le responsive
  const generateSizes = useCallback(() => {
    if (width && height) {
      return `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;
    }

    return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  }, [width, height]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return {
    src: generateOptimizedSrc(),
    srcSet: generateSrcSet(),
    sizes: generateSizes(),
    loading: "lazy" as const,
    onLoad: handleLoad,
    onError: handleError,
    isLoaded,
    hasError,
    format,
  };
}

// Hook spécialisé pour les images de héros
export function useHeroImage(originalSrc: string) {
  return useImageOptimization(originalSrc, {
    format: "webp",
    quality: 85,
    fit: "cover",
  });
}

// Hook pour les images de contenu
export function useContentImage(
  originalSrc: string,
  config?: Partial<ImageOptimizationConfig>
) {
  return useImageOptimization(originalSrc, {
    format: "auto",
    quality: 75,
    ...config,
  });
}

// Hook pour les images de fond
export function useBackgroundImage(originalSrc: string) {
  return useImageOptimization(originalSrc, {
    format: "webp",
    quality: 60,
    fit: "cover",
  });
}

"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlogCoverImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function BlogCoverImage({
  src,
  alt,
  title,
  className,
  priority = false,
  onLoad,
  onError,
}: BlogCoverImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<string>("webp");
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Détection du format supporté
  useEffect(() => {
    const detectFormat = () => {
      // Test WebP
      const webpCanvas = document.createElement("canvas");
      webpCanvas.width = 1;
      webpCanvas.height = 1;

      try {
        const webpDataURL = webpCanvas.toDataURL("image/webp");
        if (webpDataURL.startsWith("data:image/webp")) {
          setCurrentFormat("webp");
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
          setCurrentFormat("avif");
          return;
        }
      } catch (e) {
        // AVIF non supporté
      }

      // Fallback vers le format original
      setCurrentFormat("original");
    };

    detectFormat();
  }, []);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "150px", // Commence à charger 150px avant que l'image soit visible
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Chargement de l'image
  useEffect(() => {
    if (!isInView || !imageRef.current) return;

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      onError?.();
    };

    // Utiliser le format optimal détecté
    if (currentFormat === "webp" && src.includes(".")) {
      const baseSrc = src.replace(/\.[^/.]+$/, "");
      img.src = `${baseSrc}.webp`;
    } else if (currentFormat === "avif" && src.includes(".")) {
      const baseSrc = src.replace(/\.[^/.]+$/, "");
      img.src = `${baseSrc}.avif`;
    } else {
      img.src = src;
    }
  }, [isInView, src, currentFormat, onLoad, onError]);

  // Génération des sources pour différents formats
  const generateSources = () => {
    if (!src.includes(".")) return null;

    const baseSrc = src.replace(/\.[^/.]+$/, "");
    const sources = [];

    // Source WebP
    sources.push(
      <source key="webp" srcSet={`${baseSrc}.webp`} type="image/webp" />
    );

    // Source AVIF
    sources.push(
      <source key="avif" srcSet={`${baseSrc}.avif`} type="image/avif" />
    );

    return sources;
  };

  if (hasError) {
    return (
      <div
        ref={containerRef}
        data-testid="blog-cover-error"
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg",
          className
        )}
      >
        <span className="text-sm">Erreur de chargement de l'image</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-testid="blog-cover-container"
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-200",
        !isLoaded && "animate-pulse",
        className
      )}
    >
      {isInView && (
        <picture data-testid="blog-cover-picture">
          {generateSources()}
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            data-testid="blog-cover-image"
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
            loading={priority ? "eager" : "lazy"}
          />
        </picture>
      )}

      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      )}
    </div>
  );
}

// Composant pour les images de couverture prioritaires (above the fold)
export function PriorityBlogCoverImage(
  props: Omit<BlogCoverImageProps, "priority">
) {
  return <BlogCoverImage {...props} priority={true} />;
}

// Composant pour les images de couverture avec lazy loading
export function LazyBlogCoverImage(props: BlogCoverImageProps) {
  return <BlogCoverImage {...props} priority={false} />;
}

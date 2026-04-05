"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2" | "2/1";
  onLoad?: () => void;
  onError?: () => void;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectRatio = "16/9",
  onLoad,
  onError,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
        rootMargin: "100px",
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

    img.src = src;
  }, [isInView, src, onLoad, onError]);

  // Génération du srcset pour différentes tailles
  const generateSrcSet = () => {
    if (!src.includes(".")) return src;

    const baseSrc = src.replace(/\.[^/.]+$/, "");
    const extension = src.split(".").pop();

    const breakpoints = [
      { width: 320, suffix: "xs" },
      { width: 640, suffix: "sm" },
      { width: 768, suffix: "md" },
      { width: 1024, suffix: "lg" },
      { width: 1280, suffix: "xl" },
      { width: 1536, suffix: "2xl" },
    ];

    return breakpoints
      .map(({ width, suffix }) => {
        // Générer des URLs avec des suffixes pour différentes tailles
        // Exemple: image.jpg -> image-sm.jpg, image-md.jpg, etc.
        return `${baseSrc}-${suffix}.${extension} ${width}w`;
      })
      .join(", ");
  };

  // Classes CSS pour les ratios d'aspect
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "16/9":
        return "aspect-video";
      case "4/3":
        return "aspect-[4/3]";
      case "1/1":
        return "aspect-square";
      case "3/2":
        return "aspect-[3/2]";
      case "2/1":
        return "aspect-[2/1]";
      default:
        return "aspect-video";
    }
  };

  if (hasError) {
    return (
      <div
        ref={containerRef}
        data-testid="responsive-image-error"
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg",
          getAspectRatioClass(),
          className
        )}
      >
        <span className="text-sm">Erreur de chargement</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-testid="responsive-image-container"
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-200",
        getAspectRatioClass(),
        !isLoaded && "animate-pulse",
        className
      )}
    >
      {isInView && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          data-testid="responsive-image"
          srcSet={generateSrcSet()}
          sizes={sizes}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}

// Composant pour les images de héros responsives
export function ResponsiveHeroImage(
  props: Omit<ResponsiveImageProps, "priority" | "sizes">
) {
  return (
    <ResponsiveImage
      {...props}
      priority={true}
      sizes="100vw"
      aspectRatio="16/9"
    />
  );
}

// Composant pour les images de contenu responsives
export function ResponsiveContentImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
    />
  );
}

// Composant pour les images de galerie responsives
export function ResponsiveGalleryImage(
  props: Omit<ResponsiveImageProps, "aspectRatio" | "sizes">
) {
  return (
    <ResponsiveImage
      {...props}
      aspectRatio="1/1"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}

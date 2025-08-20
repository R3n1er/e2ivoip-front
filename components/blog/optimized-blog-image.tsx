"use client";

import { useState, useRef, useEffect } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";

interface OptimizedBlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fill?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedBlogImage({
  src,
  alt,
  caption,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw",
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  onLoad,
  onError,
}: OptimizedBlogImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imageRef = useRef<HTMLDivElement>(null);

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
        rootMargin: "100px", // Commence à charger 100px avant que l'image soit visible
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  return (
    <div
      ref={imageRef}
      className={cn(
        "relative overflow-hidden rounded-lg",
        !isLoaded && "bg-gray-200 animate-pulse",
        className
      )}
    >
      {isInView && (
        <OptimizedImage
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={cn(
            "transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm text-center">
          {caption}
        </div>
      )}
    </div>
  );
}

// Composant pour les images de couverture d'articles
export function BlogCoverImage(
  props: Omit<OptimizedBlogImageProps, "priority" | "sizes">
) {
  return (
    <OptimizedBlogImage
      {...props}
      priority={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn("aspect-video", props.className)}
    />
  );
}

// Composant pour les images de contenu d'articles
export function BlogContentImage(props: OptimizedBlogImageProps) {
  return (
    <OptimizedBlogImage
      {...props}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
    />
  );
}

// Composant pour les images de galerie
export function BlogGalleryImage(
  props: Omit<OptimizedBlogImageProps, "sizes">
) {
  return (
    <OptimizedBlogImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={cn("aspect-square", props.className)}
    />
  );
}

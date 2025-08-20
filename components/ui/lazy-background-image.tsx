"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  fallbackColor?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyBackgroundImage({
  src,
  alt,
  className,
  children,
  priority = false,
  fallbackColor = "bg-gray-200",
  onLoad,
  onError,
}: LazyBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

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

  return (
    <div
      ref={containerRef}
      data-testid="lazy-background-container"
      className={cn(
        "relative overflow-hidden",
        !isLoaded && !hasError && fallbackColor,
        className
      )}
      role="img"
      aria-label={alt}
    >
      {isInView && !hasError && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          data-testid="lazy-background-image"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          loading={priority ? "eager" : "lazy"}
        />
      )}

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

// Composant spécialisé pour les sections de héros
export function HeroBackgroundImage(props: LazyBackgroundImageProps) {
  return <LazyBackgroundImage {...props} priority={true} />;
}

// Composant pour les sections de contenu
export function ContentBackgroundImage(props: LazyBackgroundImageProps) {
  return <LazyBackgroundImage {...props} />;
}

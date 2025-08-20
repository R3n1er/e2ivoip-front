"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
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

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
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
        rootMargin: "50px", // Commence à charger 50px avant que l'image soit visible
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
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        ref={imageRef}
        data-testid="image-error"
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-500",
          className
        )}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      >
        <span className="text-sm">Erreur de chargement</span>
      </div>
    );
  }

  if (!isInView) {
    return (
      <div
        ref={imageRef}
        data-testid="image-placeholder"
        className={cn("bg-gray-200 animate-pulse", className)}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      />
    );
  }

  return (
    <div
      ref={imageRef}
      data-testid="image-container"
      className={cn(
        "relative overflow-hidden",
        !isLoaded && "bg-gray-200 animate-pulse",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

// Composant spécialisé pour les images de héros (priorité haute)
export function HeroImage(props: Omit<OptimizedImageProps, "priority">) {
  return <OptimizedImage {...props} priority={true} />;
}

// Composant pour les images de contenu (priorité normale)
export function ContentImage(props: OptimizedImageProps) {
  return <OptimizedImage {...props} />;
}

// Composant pour les images de fond (optimisé pour les arrière-plans)
export function BackgroundImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={false}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

"use client";

import { Suspense, lazy, ComponentType } from "react";

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: Record<string, any>;
}

export function LazyComponent({
  component,
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />,
  props = {},
}: LazyComponentProps) {
  const LazyLoadedComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
}

// Composants spécialisés pour différents types de contenu
export function LazyHeroSection({ ...props }) {
  return (
    <LazyComponent
      component={() => import("@/components/homepage-hero-section")}
      fallback={
        <div className="animate-pulse bg-gradient-to-r from-blue-900 to-red-600 h-screen" />
      }
      props={props}
    />
  );
}

export function LazyServicesSection({ ...props }) {
  return (
    <LazyComponent
      component={() => import("@/components/services-section")}
      fallback={<div className="animate-pulse bg-gray-100 h-96 rounded-lg" />}
      props={props}
    />
  );
}

export function LazyBlogSection({ ...props }) {
  return (
    <LazyComponent
      component={() => import("@/components/blog-section")}
      fallback={<div className="animate-pulse bg-white h-64 rounded-lg" />}
      props={props}
    />
  );
}

export function LazyContactSection({ ...props }) {
  return (
    <LazyComponent
      component={() => import("@/components/contact-section")}
      fallback={<div className="animate-pulse bg-gray-50 h-80 rounded-lg" />}
      props={props}
    />
  );
}

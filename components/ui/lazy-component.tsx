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

// Composants spécialisés pour différents types de contenu (versions simplifiées)
export function LazyHeroSection({ ...props }) {
  return (
    <LazyComponent
      component={() => import("@/components/homepage-hero-section-simple").then(mod => ({ default: mod.HomepageHeroSectionSimple }))}
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
      component={() => import("@/components/services-section-simple").then(mod => ({ default: mod.ServicesSectionSimple }))}
      fallback={<div className="animate-pulse bg-gray-100 h-96 rounded-lg" />}
      props={props}
    />
  );
}

export function LazyContactSection({ ...props }) {
  return (
    <LazyComponent
      component={() => import("@/components/contact-section-simple").then(mod => ({ default: mod.ContactSectionSimple }))}
      fallback={<div className="animate-pulse bg-gray-50 h-80 rounded-lg" />}
      props={props}
    />
  );
}

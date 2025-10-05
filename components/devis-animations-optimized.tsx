"use client";

/**
 * Composants d'animation optimisés pour les pages devis
 *
 * Version optimisée de devis-animations.tsx utilisant le lazy loading
 * pour réduire la taille du bundle initial.
 *
 * @see docs/REFACTORING.md - Phase 5
 */

import { ReactNode, memo } from "react";
import { LazyMotion, SimpleFadeIn, CardFadeIn, HeroAnimation } from "@/lib/utils/lazy-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Section animée avec lazy loading Framer Motion
 *
 * Remplace l'ancien AnimatedSection avec optimisation bundle
 */
export const AnimatedSection = memo(function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <LazyMotion
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </LazyMotion>
  );
});

/**
 * Carte animée avec lazy loading
 *
 * Optimisée avec memo + lazy loading
 */
export const AnimatedCard = memo(function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <CardFadeIn className={className} delay={delay}>
      {children}
    </CardFadeIn>
  );
});

/**
 * Hero animé avec chargement immédiat
 *
 * Optimisée avec memo mais chargement immédiat pour la hero section
 */
export const AnimatedHero = memo(function AnimatedHero({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <HeroAnimation className={className}>{children}</HeroAnimation>;
});

/**
 * Grille animée avec lazy loading
 */
export const AnimatedGrid = memo(function AnimatedGrid({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <LazyMotion
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </LazyMotion>
  );
});

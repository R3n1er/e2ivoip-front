/**
 * Lazy Loading Wrapper pour Framer Motion
 *
 * Optimise le bundle size en chargeant Framer Motion uniquement
 * quand les animations sont nécessaires (viewport visible).
 *
 * @see docs/REFACTORING.md - Phase 5
 */

"use client";

import { lazy, Suspense, ComponentType, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

/**
 * Lazy import de Framer Motion
 * Code splitting automatique pour réduire le bundle initial
 */
const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({
    default: mod.motion.div as ComponentType<any>
  }))
);

/**
 * Props pour le composant LazyMotion
 */
interface LazyMotionProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
  /**
   * Fallback pendant le chargement de Framer Motion
   * @default <div>{children}</div>
   */
  fallback?: ReactNode;
  /**
   * Charger immédiatement sans Intersection Observer
   * @default false
   */
  immediate?: boolean;
}

/**
 * Composant LazyMotion avec Intersection Observer
 *
 * Charge Framer Motion uniquement quand l'élément entre dans le viewport,
 * réduisant ainsi la taille du bundle initial.
 *
 * @example
 * ```tsx
 * <LazyMotion
 *   initial={{ opacity: 0, y: 30 }}
 *   whileInView={{ opacity: 1, y: 0 }}
 *   transition={{ duration: 0.6 }}
 * >
 *   <p>Contenu animé</p>
 * </LazyMotion>
 * ```
 */
export function LazyMotion({
  children,
  className = "",
  initial,
  animate,
  whileInView,
  transition,
  viewport = { once: true },
  fallback,
  immediate = false,
}: LazyMotionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Si immediate=true, charger directement
  if (immediate) {
    return (
      <Suspense fallback={fallback || <div className={className}>{children}</div>}>
        <MotionDiv
          initial={initial}
          animate={animate}
          whileInView={whileInView}
          transition={transition}
          viewport={viewport}
          className={className}
        >
          {children}
        </MotionDiv>
      </Suspense>
    );
  }

  // Sinon, attendre l'entrée dans le viewport
  return (
    <div ref={ref} className={className}>
      {inView ? (
        <Suspense fallback={fallback || <div className={className}>{children}</div>}>
          <MotionDiv
            initial={initial}
            animate={animate}
            whileInView={whileInView}
            transition={transition}
            viewport={viewport}
            className={className}
          >
            {children}
          </MotionDiv>
        </Suspense>
      ) : (
        <div className={className}>{children}</div>
      )}
    </div>
  );
}

/**
 * Hook pour charger Framer Motion de manière conditionnelle
 *
 * @example
 * ```tsx
 * const { motion, AnimatePresence } = useFramerMotion();
 *
 * if (!motion) return <div>Loading...</div>;
 *
 * return <motion.div animate={{ opacity: 1 }}>Content</motion.div>;
 * ```
 */
export function useFramerMotion() {
  // Cette approche nécessite un dynamic import côté client
  // Pour l'instant, on retourne null pour indiquer le chargement
  return { motion: null, AnimatePresence: null };
}

/**
 * Wrapper simple pour les animations de base
 *
 * Optimisé pour les cas d'usage courants sans configuration complexe.
 */
export function SimpleFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <LazyMotion
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </LazyMotion>
  );
}

/**
 * Wrapper pour les animations de carte
 */
export function CardFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <LazyMotion
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </LazyMotion>
  );
}

/**
 * Wrapper pour les animations hero (immediate)
 */
export function HeroAnimation({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <LazyMotion
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={className}
      immediate={true}
    >
      {children}
    </LazyMotion>
  );
}

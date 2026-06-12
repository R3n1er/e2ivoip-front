"use client";

/**
 * Apparitions au scroll sobres — motion tokens design.md §9.5 :
 * fade + translate 12 px, durée 300 ms, easing cubic-bezier(0.16,1,0.3,1),
 * staggerChildren 80 ms. Leaf components : à importer depuis les Server
 * Components sans les transformer en client components.
 */

import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const DISTANCE = 12;
const DURATION = 0.3;
const STAGGER = 0.08;

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/** Révèle un bloc isolé à son entrée dans le viewport. */
export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: DISTANCE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Conteneur de grille : orchestre le stagger de ses RevealItem. */
export function RevealGroup({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: STAGGER } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Élément d'une RevealGroup — hérite de l'orchestration du parent. */
export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: DISTANCE },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

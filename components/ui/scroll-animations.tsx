"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";

// Hook pour créer un parallax fluide
export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Composant pour les animations au scroll avec whileInView
interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6, 
  className = "",
  once = true 
}: ScrollRevealProps) {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] // ease-out
        }
      }}
      viewport={{ once, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Composant pour l'animation de progression de scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-primary via-blue-marine to-red-primary z-[150] origin-left"
      style={{ scaleX }}
    />
  );
}

// Composant parallax pour les sections
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useParallax(scrollYProgress, speed * 100);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// Composant pour l'animation de compteur
interface CounterAnimationProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CounterAnimation({ 
  value, 
  duration = 2, 
  suffix = "", 
  className = "" 
}: CounterAnimationProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const count = useTransform(scrollYProgress, [0, 1], [0, value]);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  return (
    <motion.span 
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ 
        opacity: 1,
        transition: { duration: 0.5 }
      }}
      viewport={{ once: true }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}

// Composant pour l'animation de révélation progressive de texte
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function TextReveal({ text, className = "", delay = 0, duration = 0.05 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: duration, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              filter: "blur(4px)"
            },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Composant pour l'animation de révélation avec masque
interface MaskRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
}

export function MaskReveal({ 
  children, 
  direction = "left", 
  delay = 0, 
  duration = 0.8, 
  className = "" 
}: MaskRevealProps) {
  const clipPathVariants = {
    left: {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: { clipPath: "inset(0 0% 0 0)" }
    },
    right: {
      hidden: { clipPath: "inset(0 0 0 100%)" },
      visible: { clipPath: "inset(0 0 0 0%)" }
    },
    up: {
      hidden: { clipPath: "inset(100% 0 0 0)" },
      visible: { clipPath: "inset(0% 0 0 0)" }
    },
    down: {
      hidden: { clipPath: "inset(0 0 100% 0)" },
      visible: { clipPath: "inset(0 0 0% 0)" }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={clipPathVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

// Composant pour l'animation de grille
interface GridRevealProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
}

export function GridReveal({ 
  children, 
  className = "", 
  stagger = 0.1, 
  delay = 0 
}: GridRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              scale: 0.95
            },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Composant pour l'animation de rotation 3D au scroll
interface Rotate3DProps {
  children: ReactNode;
  rotateX?: number;
  rotateY?: number;
  className?: string;
}

export function Rotate3D({ 
  children, 
  rotateX = 0, 
  rotateY = 15, 
  className = "" 
}: Rotate3DProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateXValue = useTransform(scrollYProgress, [0, 1], [rotateX, -rotateX]);
  const rotateYValue = useTransform(scrollYProgress, [0, 1], [rotateY, -rotateY]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          rotateX: rotateXValue,
          rotateY: rotateYValue,
          transformStyle: "preserve-3d",
          transformPerspective: 1000
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Composant pour l'animation de morphing de forme
export function MorphingShape({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%",
          "30% 60% 70% 40%",
          "70% 30% 40% 60%",
          "40% 70% 60% 30%",
          "60% 40% 30% 70%"
        ]
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity
      }}
    />
  );
}
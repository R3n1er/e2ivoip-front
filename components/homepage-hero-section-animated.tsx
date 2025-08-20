"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Play, Star, Users, Award } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ScrollReveal,
  TextReveal,
  CounterAnimation,
  MorphingShape,
  ParallaxSection,
} from "@/components/ui/scroll-animations";

export function HomepageHeroSectionAnimated() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Assurer le montage côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax effects avec useTransform
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Animation de floating avec useSpring pour plus de fluidité
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const stats = [
    {
      icon: Users,
      value: 500,
      label: "Entreprises nous font confiance",
      suffix: "+",
    },
    {
      icon: Award,
      value: 15,
      label: "Années d'expertise télécom",
      suffix: "+",
    },
    {
      icon: Phone,
      value: 24,
      label: "Support technique DOM-TOM & France",
      suffix: "/7",
    },
    { icon: Star, value: 30, label: "Économies garanties", suffix: "%" },
  ];

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  // Rendu conditionnel pour éviter l'hydratation
  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
            alt="Personne utilisant la téléphonie d'entreprise moderne"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85" />
        </div>
        {/* Version statique pendant l'hydratation */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-red-400">Économisez 30%</span>
            <br />
            sur vos coûts télécoms
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image avec Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <motion.img
          src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
          alt="Personne utilisant la téléphonie d'entreprise moderne"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: ySpring }}
        />
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-0"
          style={{ opacity }}
        />
      </motion.div>

      {/* Floating Elements Morphing */}
      <MorphingShape className="top-20 left-10 w-20 h-20 bg-red-600/20 blur-xl z-10 pointer-events-none" />
      <MorphingShape className="bottom-20 right-10 w-32 h-32 bg-blue-400/20 blur-xl z-10 pointer-events-none" />

      {/* Additional floating shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg z-10 pointer-events-none"
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-red-400/15 rounded-full blur-lg z-10 pointer-events-none"
      />

      {/* Content avec animations avancées */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge avec animation */}
          <ScrollReveal direction="down" delay={0}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-sm font-medium mb-8 cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-4 h-4 mr-2" />
              </motion.div>
              Opérateur télécom DOM-TOM • Plus de 500 clients
            </motion.div>
          </ScrollReveal>

          {/* Main Heading avec TextReveal */}
          <TextReveal
            text="Économisez 30% sur vos coûts télécoms avec la téléphonie IP"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            delay={0.3}
            duration={0.1}
          />

          {/* Subtitle avec animation de révélation progressive */}
          <ScrollReveal direction="up" delay={0.8} duration={0.8}>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              <motion.span
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Trunk SIP éligible DOM-TOM • Création et portabilité de numéros
                locaux
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-gray-300 font-medium"
              >
                Mobilité et fonctionnalités nouvelle génération
              </motion.span>
            </p>
          </ScrollReveal>

          {/* CTA Buttons avec animations sophistiquées */}
          <ScrollReveal direction="up" delay={1.2} duration={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Phone className="w-5 h-5 mr-3 relative z-10" />
                  <span className="relative z-10">Calculez vos économies</span>
                  <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  />
                  <Play className="w-5 h-5 mr-3 relative z-10" />
                  <span className="relative z-10">
                    Découvrez nos offres Trunk SIP
                  </span>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Stats avec CounterAnimation */}
          <ScrollReveal direction="up" delay={1.5} duration={0.8}>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className="text-center group cursor-default"
                >
                  <div className="flex items-center justify-center mb-2">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <stat.icon className="w-6 h-6 text-red-400 mr-2 group-hover:text-red-300 transition-colors" />
                    </motion.div>
                    <CounterAnimation
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                      className="text-3xl font-bold text-white drop-shadow-lg group-hover:text-gray-100 transition-colors"
                    />
                  </div>
                  <motion.p
                    className="text-gray-300 text-sm drop-shadow-md group-hover:text-gray-200 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </motion.div>
      </div>

      {/* Scroll indicator avec animation avancée */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center text-white/70 cursor-pointer group"
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            className="text-sm mb-2 drop-shadow-md group-hover:text-white transition-colors"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Découvrir
          </motion.span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center relative overflow-hidden group-hover:border-white/70 transition-colors">
            <motion.div
              animate={{
                y: [2, 20, 2],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
            {/* Glow effect */}
            <motion.div
              animate={{
                y: [2, 20, 2],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
              className="absolute w-2 h-4 bg-white blur-sm rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Particules flottantes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </section>
  );
}

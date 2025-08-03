"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Play, Star, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HomepageHeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/images/photos/pexels-ketut-subiyanto-4559714-min.jpg";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { icon: Users, value: "500+", label: "Clients satisfaits" },
    { icon: Award, value: "15+", label: "Années d'expérience" },
    { icon: Star, value: "99.9%", label: "Disponibilité" },
  ];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: "url('/images/photos/pexels-ketut-subiyanto-4559714-min.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#1f2937", // Fallback color
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-red-600/20 rounded-full blur-xl z-5"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl z-5"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 mr-2" />
            Leader en solutions VoIP depuis 2008
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Votre standard téléphonique
            <br />
            <span className="text-red-400 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              représente
            </span>
            <br />
            votre entreprise
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
          >
            Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise
            <br />
            <span className="text-gray-300 font-medium">
              Performance, fiabilité et innovation au service de votre business
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-3" />
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-3" />
              Voir la démo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl font-bold text-white drop-shadow-lg">{stat.value}</span>
                </div>
                <p className="text-gray-300 text-sm drop-shadow-md">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/70"
        >
          <span className="text-sm mb-2 drop-shadow-md">Découvrir</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
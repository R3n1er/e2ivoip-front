"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";

const clients = [
  {
    name: "APAJH Guyane",
    logo: "/images/logos-clients/LogoAPAJHGuyane-black-optimize.png",
    alt: "Logo APAJH Guyane",
  },
  {
    name: "SFR",
    logo: "/images/logos-clients/lofo-SFR-black-optimize.png",
    alt: "Logo SFR",
  },
  {
    name: "Cateco",
    logo: "/images/logos-clients/cateco-logo-black.png",
    alt: "Logo Cateco",
  },
  {
    name: "Groupe Lang",
    logo: "/images/logos-clients/Logo_GroupeLang_black.png",
    alt: "Logo Groupe Lang",
  },
  {
    name: "Zoo Guadeloupe",
    logo: "/images/logos-clients/logo-zoo-guadeloupe-black.png",
    alt: "Logo Zoo Guadeloupe",
  },
  {
    name: "Callas Paris",
    logo: "/images/logos-clients/logo-callas-paris-black.png",
    alt: "Logo Callas Paris",
  },
  {
    name: "Zoo Martinique",
    logo: "/images/logos-clients/logo-Zoo-de-Martinique-black.png",
    alt: "Logo Zoo de Martinique",
  },
  {
    name: "Zoo Guyane",
    logo: "/images/logos-clients/logo-zoo-guyane-black.png",
    alt: "Logo Zoo Guyane",
  },
  {
    name: "Eurogold",
    logo: "/images/logos-clients/logo-eurogold.png",
    alt: "Logo Eurogold",
  },
];

export function ClientsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 15000); // Change toutes les 15 secondes (encore plus lent)

    return () => clearInterval(interval);
  }, []);

  // Dupliquer les clients pour un défilement infini
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font <span className="text-red-primary">confiance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les entreprises qui nous font confiance pour leurs
            solutions de téléphonie IP
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays pour effet de fondu */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Carousel */}
          <motion.div
            animate={{
              x: [0, -1000, -2000, -3000, -4000, -5000, -6000, -7000, -8000],
            }}
            transition={{
              duration: 180, // 6x plus lent que l'original (30 * 6 = 180 secondes)
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center space-x-16 lg:space-x-24"
          >
            {duplicatedClients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-transparent">
                  <div className="relative w-32 h-16 lg:w-40 lg:h-20">
                    <OptimizedImage
                      src={client.logo}
                      alt={client.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 128px, 160px"
                      quality={80}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2 font-medium">
                    {client.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Statistiques de confiance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-red-primary mb-2">
                100+
              </div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-marine mb-2">
                15+
              </div>
              <div className="text-gray-600">Années d'expérience</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

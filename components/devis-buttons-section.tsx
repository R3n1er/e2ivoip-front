"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function DevisButtonsSection() {
  const devisButtons = [
    {
      title: "Devis Trunk SIP",
      href: "https://urlr.me/!E2IVOIP-Devis-TrunkSIP",
      variant: "primary" as const,
    },
    {
      title: "Devis Portabilité",
      href: "https://urlr.me/!E2IVOIP-EtudePortaVoIP",
      variant: "secondary" as const,
    },
    {
      title: "Devis VoIP 3CX",
      href: "https://urlr.me/!mon-projet-Voip-E2I",
      variant: "primary" as const,
    },
    {
      title: "Devis Projet PBX",
      href: "https://urlr.me/!E2I-Devis_IntegrationPBX",
      variant: "secondary" as const,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="uppercase text-sm font-medium text-gray-600 tracking-wider mb-3">
            RECEVEZ UN DEVIS PERSONNALISÉ EN MOINS DE 24H POUR VOTRE PROJET TÉLÉCOM.
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Devis Rapide et Gratuit
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Que vous cherchiez à mettre en place un{" "}
            <strong>Trunk SIP professionnel</strong>, une solution{" "}
            <strong>3CX VoIP dédiée ou mutualisée</strong>, installer une
            solution Yeastar ou à{" "}
            <strong>porter vos numéros existants sur nos Trunk SIP operateur</strong>,
            notre équipe vous accompagne. Choisissez ci-dessous le type de devis
            souhaité.
          </p>
        </motion.div>

        {/* Boutons de devis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-4 max-w-md mx-auto"
        >
          {devisButtons.map((button, index) => (
            <motion.a
              key={button.title}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-4 px-8 text-center text-white font-bold text-lg rounded-lg
                transition-all duration-300 shadow-lg hover:shadow-xl
                ${
                  button.variant === "primary"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#1d3557] hover:bg-[#2a4365]"
                }
              `}
            >
              {button.title}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact urgent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#1d3557] font-medium mb-4">
            Un projet urgent ? Contactez directement notre équipe commerciale.
          </p>
          <a
            href="tel:+594594963500"
            suppressHydrationWarning
            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">📞</span>
            05 94 96 35 00
          </a>
        </motion.div>
      </div>
    </section>
  );
}
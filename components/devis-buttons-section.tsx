"use client";

import { motion } from "framer-motion";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

const PHONE_HREF = "tel:+594594963500";
const PHONE_LABEL = "05 94 96 35 00";

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
          <p className="uppercase text-sm font-medium text-gray-secondary tracking-wider mb-3">
            RECEVEZ UN DEVIS PERSONNALISÉ EN MOINS DE 24H POUR VOTRE PROJET TÉLÉCOM.
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-dark mb-8">
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
          <p className="text-lg text-gray-dark max-w-3xl mx-auto">
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
          className="flex flex-col items-stretch gap-4 max-w-md mx-auto"
        >
          {devisButtons.map((button, index) => (
            <motion.div
              key={button.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="w-full"
            >
              {button.variant === "primary" ? (
                <CTAButton href={button.href} external className="block w-full text-center">
                  {button.title}
                </CTAButton>
              ) : (
                <CTAButtonMarine href={button.href} external className="block w-full text-center">
                  {button.title}
                </CTAButtonMarine>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact urgent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-blue-marine font-medium mb-4">
            Un projet urgent ? Contactez directement notre équipe commerciale.
          </p>
          <CTAButton href={PHONE_HREF} external icon="Phone" className="inline-block">
            {PHONE_LABEL}
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}

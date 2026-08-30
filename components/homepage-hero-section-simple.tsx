"use client";

import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import Image from "next/image";
import { Globe, Certificate, Phone, Star, Play } from "@/lib/icons";

export function HomepageHeroSectionSimple() {
  // Caractéristiques de l'offre uniquement : un volume observé chez un client
  // n'est pas une statistique d'entreprise (voir docs/ligne-editoriale.md).
  const stats = [
    { Icon: Globe, value: "4", label: "Territoires DOM couverts" },
    { Icon: Certificate, value: "15", label: "Années d'expertise télécom" },
    { Icon: Phone, value: "Mail & Tél", label: "Support technique France Métropolitaine et DOM" },
    { Icon: Star, value: "4 à 64", label: "Appels simultanés par instance 3CX PRO" },
  ];

  return (
    <section
      id="accueil"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
          alt="Personne utilisant la téléphonie d'entreprise moderne"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
        {/* Gradient Overlay — obligatoire PRD */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Surtitre — ancrage métier et territorial */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-primary/10 border border-red-primary/20 text-red-300 text-sm font-medium mb-8">
            <Star size={16} className="mr-2" />
            Opérateur de services télécom · Antilles, Guyane, La Réunion
          </div>

          {/*
            Main Heading — l'échéance cuivre porte la tension, à la place du prix.

            La date est territorialisée : fermeture technique au 31 janvier 2027
            pour le lot 3 (Basse-Terre, Deshaies, Kourou), après un arrêt
            commercial au 31 janvier 2026. La Réunion relève du lot 5
            (janvier / mai / octobre 2029) — d'où « Antilles-Guyane » et non
            « DOM » sur la date elle-même.
            Source : Arcep, plan de fermeture de la boucle locale cuivre.
          */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Aux Antilles-Guyane, le cuivre{" "}
            <span className="text-red-300">ferme en 2027</span>.
            <br />
            Votre téléphonie DOM est-elle prête&nbsp;?
          </h1>

          {/* Subtitle — preuve d'exécution : éligibilité, portabilité, continuité */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Trunk SIP éligibles Antilles-Guyane et La Réunion, portabilité de
            vos numéros locaux, migration sans coupure.
            <br />
            <span className="text-gray-300 font-medium">
              La Réunion suit en 2029. Nous accompagnons les entreprises des DOM
              depuis 15 ans.
            </span>
          </p>

          {/* CTA Buttons - Red + Blue pairing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <CTAButton href="/contact" icon={Phone}>
              Parler à un expert DOM
            </CTAButton>

            <CTAButtonMarine href="/telephonie-entreprise/trunk-sip-compteur" icon={Play}>
              Découvrez nos offres Trunk SIP
            </CTAButtonMarine>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.Icon size={24} className="text-red-300 mr-2" />
                  <span className="text-3xl font-bold font-mono tabular-nums text-white drop-shadow-lg">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-300 text-sm drop-shadow-md">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

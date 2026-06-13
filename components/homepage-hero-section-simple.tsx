"use client";

import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { Globe, Certificate, Phone, Star, Play } from "@/lib/icons";

export function HomepageHeroSectionSimple() {
  const stats = [
    { Icon: Globe, value: "4", label: "Territoires DOM couverts" },
    { Icon: Certificate, value: "15", label: "Années d'expertise télécom" },
    { Icon: Phone, value: "Mail & Tél", label: "Support technique France Métropolitaine et DOM" },
    { Icon: Star, value: "20%", label: "D'économies sur le coût des communications DROM" },
  ];

  return (
    <section
      id="accueil"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
          alt="Personne utilisant la téléphonie d'entreprise moderne"
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        />
        {/* Gradient Overlay — obligatoire PRD */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge — social proof uniquement (pas de doublon DOM avec le sous-titre) */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-primary/10 border border-red-primary/20 text-red-300 text-sm font-medium mb-8">
            <Star size={16} className="mr-2" />
            Opérateur télécom DOM depuis 15 ans
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            <span className="text-red-300">Économisez 20%</span>
            <br />
            sur vos coûts télécoms
            <br />
            avec la téléphonie IP
          </h1>

          {/* Subtitle — angle DOM / offre */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Trunk SIP éligible DOM • Création et portabilité de numéros
            locaux
            <br />
            <span className="text-gray-300 font-medium">
              Automatisation et fonctionnalités nouvelle génération
            </span>
          </p>

          {/* CTA Buttons - Red + Blue pairing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <CTAButton href="/devis-en-ligne" icon={Phone}>
              Faire un devis
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

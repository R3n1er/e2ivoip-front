"use client";

import { Badge } from "@/components/ui/badge";
import { AnimatedHero } from "@/components/devis-animations-optimized";
import { ContentBackgroundImage } from "@/components/ui/lazy-background-image";

export function DevisHeroSection() {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden min-h-[600px]">
      {/* Background Image avec Lazy Loading */}
      <ContentBackgroundImage
        src="/man-oniphone-business-min.jpg"
        alt="Homme d'affaires utilisant son téléphone pour les communications professionnelles"
        className="absolute inset-0 z-0"
        fallbackColor="bg-gray-800"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/85 via-red-500/80 to-blue-900/85" />
      </ContentBackgroundImage>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedHero className="text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Devis Rapide et Gratuit
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Recevez un devis personnalisé
            <br />
            <span className="text-white font-bold drop-shadow-lg">
              en moins de 24h
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-8 drop-shadow-md">
            Que vous cherchiez à mettre en place un Trunk SIP professionnel, une
            solution 3CX VoIP dédiée ou mutualisée, installer une solution
            Yeastar ou à porter vos numéros existants sur nos Trunk SIP
            opérateur, notre équipe vous accompagne.
          </p>
          <p className="text-lg text-white/90 mb-8 drop-shadow-md">
            Choisissez ci-dessous le type de devis souhaité.
          </p>
        </AnimatedHero>
      </div>
    </section>
  );
}

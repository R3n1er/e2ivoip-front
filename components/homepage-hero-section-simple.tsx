"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Play, Star, Users, Award } from "lucide-react";

export function HomepageHeroSectionSimple() {
  const stats = [
    { icon: Users, value: "500+", label: "Entreprises nous font confiance" },
    { icon: Award, value: "15+", label: "Années d'expertise télécom" },
    { icon: Phone, value: "24/7", label: "Support technique France Métropolitaine et DOM-TOM" },
    { icon: Star, value: "30%", label: "Économies garanties" },
  ];

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
          alt="Personne utilisant la téléphonie d'entreprise moderne"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Opérateur télécom DOM-TOM • Plus de 500 clients
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            <span className="text-red-400 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Économisez 30%
            </span>
            <br />
            sur vos coûts télécoms
            <br />
            avec la téléphonie IP
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Trunk SIP éligible DOM-TOM • Création et portabilité de numéros
            locaux
            <br />
            <span className="text-gray-300 font-medium">
              Mobilité et fonctionnalités nouvelle génération
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-3" />
              Calculez vos économies
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-3" />
              Découvrez nos offres Trunk SIP
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 drop-shadow-md">Découvrir</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

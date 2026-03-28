"use client";

import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export function HomepageHeroSectionSimple() {
  const stats = [
    { icon: "lni-users", value: "100+", label: "Entreprises nous font confiance" },
    { icon: "lni-certificate", value: "15+", label: "Années d'expertise télécom" },
    { icon: "lni-phone", value: "24/7", label: "Support technique France Métropolitaine et DOM" },
    { icon: "lni-star", value: "30%", label: "Économies garanties" },
  ];

  return (
    <section
      id="accueil"
      className="relative min-h-screen pt-32 pb-20 flex items-center bg-white overflow-hidden"
    >
      {/* Decorative background blocks (Square philosophy) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-marine/5 to-transparent skew-x-[-5deg] transform origin-top-right z-0" />
      <div className="absolute top-20 -right-20 w-96 h-96 border-[40px] border-red-primary/5 rounded-none z-0" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-primary/5 rounded-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 md:mt-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text */}
          <div className="text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-none bg-red-primary/10 border border-red-primary/20 text-red-primary text-sm font-bold mb-8 transition-transform hover:-translate-y-1">
              <i className="lni lni-star w-4 h-4 mr-2"></i>
              Opérateur télécom DOM • Plus de 100 clients
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-dark mb-6 leading-tight tracking-tight">
              Économisez <span className="text-red-primary">30%</span>
              <br />
              sur vos coûts télécoms
              <br />
              avec la téléphonie IP
            </h1>

            <p className="text-lg md:text-xl text-gray-secondary mb-10 max-w-2xl leading-relaxed">
              Trunk SIP éligible DOM • Création et portabilité de numéros locaux.
              <br />
              <span className="text-blue-marine font-semibold mt-2 block">
                Automatisation et fonctionnalités nouvelle génération
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <CTAButton href="/devis-en-ligne" icon="lni-phone">
                Calculez vos économies
              </CTAButton>
              <CTAButtonMarine href="/telephonie-entreprise/trunk-sip-compteur" icon="lni-play">
                Découvrez nos offres Trunk SIP
              </CTAButtonMarine>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="flex items-center mb-1">
                    <i className={`lni ${stat.icon} w-5 h-5 text-red-primary mr-2`}></i>
                    <span className="text-2xl font-black text-blue-marine">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-secondary text-xs uppercase tracking-wider font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative hidden lg:block">
            {/* Main square image */}
            <div className="relative z-10 p-3 bg-white border border-gray-100 shadow-premium rounded-none">
              <div className="relative overflow-hidden rounded-none aspect-[4/5] w-full">
                <img
                  src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
                  alt="Personne utilisant la téléphonie d'entreprise moderne"
                  className="w-full h-full object-cover rounded-none transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Overlay Quality badge */}
              <div className="absolute -bottom-6 -left-6 bg-blue-marine p-6 rounded-none shadow-premium text-white border-l-4 border-red-primary z-20 animate-pulse-soft">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-none">
                    <i className="lni lni-headphone text-2xl text-white"></i>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Support 24/7</p>
                    <p className="text-sm text-gray-300">France & DOM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background offset pattern */}
            <div className="absolute top-10 -right-10 w-full h-full border border-gray-200 bg-gray-50/50 rounded-none z-0 pattern-dots"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

import React from "react";

interface PricingTier {
  calls: number;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

interface PricingTiersProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
}

export function PricingTiers({
  tiers,
  title = "Capacités et Tarification",
  subtitle = "Notre modèle par appels simultanés s'adapte parfaitement aux réalités de votre activité"
}: PricingTiersProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            {subtitle}
          </p>
          
          {/* Avantage du modèle */}
          <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <i className="lni lni-users text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Pourquoi Cette Approche ?</h3>
            </div>
            <p className="text-gray-700">
              Contrairement aux licences par utilisateur, notre modèle par appels simultanés s'adapte 
              parfaitement aux réalités de votre activité. Une équipe de <strong>50 personnes</strong> n'a 
              rarement besoin de <strong>50 lignes simultanées</strong>.
            </p>
          </div>
        </div>

        {/* Grille des paliers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
                tier.highlighted 
                  ? 'border-red-500 bg-gradient-to-b from-red-50 to-blue-50 shadow-lg transform scale-105' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {tier.badge}
                  </div>
                </div>
              )}

              {/* En-tête du palier */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  tier.highlighted 
                    ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <span className="text-2xl font-bold">{tier.calls}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {tier.calls} appels simultanés
                </h3>
                <p className="text-sm text-gray-600">
                  {tier.description}
                </p>
              </div>

              {/* Fonctionnalités */}
              <div className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button 
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="lni lni-phone mr-2"></i>
                  Demander un devis
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message économies */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center p-4 bg-green-100 rounded-xl border border-green-200">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-4">
              <i className="lni lni-dollar text-green-600 text-xl"></i>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-green-800">Économisez jusqu'à 40%</h3>
              <p className="text-green-700 text-sm">
                sur vos coûts téléphoniques actuels avec notre approche transparente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Metadata } from "next";
import Link from "next/link";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "3CX SMB Mutualisée - E2I VoIP | Solution économique TPE/PME",
  description:
    "Solution 3CX hébergée mutualisée pour TPE et PME. De 3 à 50 utilisateurs, activation rapide, coûts optimisés. À partir de 15€/utilisateur.",
  keywords:
    "3CX SMB, 3CX mutualisée, téléphonie TPE, téléphonie PME, VoIP économique, 3CX multi-tenant",
  openGraph: {
    title: "3CX SMB Mutualisée - Solution économique TPE/PME",
    description:
      "Solution 3CX hébergée mutualisée. De 3 à 50 utilisateurs. Activation rapide et coûts optimisés.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/3cx-smb-mutualisee",
    siteName: "E2I VoIP",
  },
};

export default function Smb3CXMutualisee() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="3CX SMB Mutualisée"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <i className="lni lni-users text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">
                  Solution mutualisée
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                3CX SMB <span className="text-white">Mutualisée</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Solution économique</strong> pour TPE et PME
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                De <strong>3 à 50 utilisateurs</strong> • 
                À partir de 15€/utilisateur/mois
              </p>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <CTAButton href="/devis-en-ligne" icon="lni-calculator">
                  Demander un devis
                </CTAButton>
                <CTAButtonMarine href="tel:+33189560500" icon="lni-phone" external>
                  01 89 56 05 00
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Section principale */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                La solution <span className="text-red-primary">3CX économique</span> pour les petites entreprises
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Notre offre <strong>3CX SMB mutualisée</strong> vous permet de bénéficier de toutes les 
                fonctionnalités 3CX sans les coûts d'une infrastructure dédiée. Parfait pour les TPE 
                et PME de 3 à 50 utilisateurs recherchant une solution professionnelle et économique.
              </p>
            </div>

            {/* Avantages clés avec DaisyUI */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className="lni lni-calculator text-red-primary text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark justify-center">Économique</h3>
                  <p className="text-gray-600 text-center">
                    À partir de 15€/utilisateur/mois, sans frais d'infrastructure
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className="lni lni-timer text-gray-800 text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark justify-center">Activation rapide</h3>
                  <p className="text-gray-600 text-center">
                    Mise en service en 24h, configuration pré-établie
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className="lni lni-grow text-red-primary text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark justify-center">Évolutif</h3>
                  <p className="text-gray-600 text-center">
                    De 3 à 50 utilisateurs, ajustable selon vos besoins
                  </p>
                </div>
              </div>
            </div>

            {/* Fonctionnalités incluses */}
            <div className="mt-16 bg-base-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-dark mb-6 text-center">
                Toutes les fonctionnalités 3CX incluses
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Appels VoIP illimités entre utilisateurs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Visioconférence intégrée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Applications mobiles iOS/Android</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Chat d'équipe et collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Standard automatique (SVI)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Support technique local</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Démarrez avec <span className="text-white">3CX SMB</span> dès aujourd'hui
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Activation en 24h • Support expert local • Sans engagement
            </p>
            <CTAButton href="/devis-en-ligne" icon="lni-rocket">
              Commencer maintenant
            </CTAButton>
          </div>
        </section>
      </main>
    </div>
  );
}

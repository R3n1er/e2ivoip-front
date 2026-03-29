import { Metadata } from "next";
import Link from "next/link";

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
        <section className="py-24 relative overflow-hidden bg-[#091421] border-b border-[#1A2E44]">
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="3CX SMB Mutualisée"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay et Grille Monolith */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#091421]/95 via-[#091421]/90 to-[#091421]/80 pointer-events-none z-10" />
            <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none z-10" />
            <div className="absolute inset-0 pointer-events-none z-20" style={{ boxShadow: "inset 0 0 100px rgba(9,20,33,1)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="text-center">
              <div className="inline-flex items-center text-white font-black uppercase text-[10px] tracking-widest px-4 py-2 border border-white/20 bg-white/5 mb-6">
                <i className="lni lni-users text-white mr-2" aria-hidden="true"></i>
                Solution mutualisée
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                3CX SMB <span className="text-red-primary">Mutualisée</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-4 font-bold">
                SOLUTION ÉCONOMIQUE POUR TPE ET PME
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 uppercase tracking-widest text-xs">
                De 3 à 50 utilisateurs • 
                À partir de 15€/utilisateur/mois
              </p>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="/devis-en-ligne" className="monolith-btn bg-red-primary">
                  <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                    <i className="lni lni-calculator" aria-hidden="true" />
                    Demander un devis
                  </span>
                </a>
                <a href="tel:+33189560500" className="monolith-btn bg-white">
                  <span className="block text-[#091421] font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                    <i className="lni lni-phone" aria-hidden="true" />
                    01 89 56 05 00
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section principale */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#091421] mb-6 uppercase tracking-tight">
                La solution <span className="text-red-primary">3CX économique</span> pour les TPE/PME
              </h2>
              <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                Notre offre <strong>3CX SMB mutualisée</strong> vous permet de bénéficier de toutes les 
                fonctionnalités 3CX sans les coûts d'une infrastructure dédiée. Parfait pour les TPE 
                et PME de 3 à 50 utilisateurs recherchant une solution professionnelle et économique.
              </p>
            </div>

            {/* Avantages clés */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 p-8 flex flex-col items-center justify-center text-center hover:border-red-primary/30 transition-colors border-t-4 border-t-red-primary">
                <div className="w-16 h-16 bg-[#f8fafc] border border-gray-100 flex items-center justify-center mb-6">
                  <i className="lni lni-calculator text-red-primary text-2xl"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">Économique</h3>
                <p className="text-gray-500 text-sm">
                  À partir de 15€/utilisateur/mois, sans frais d'infrastructure
                </p>
              </div>

              <div className="bg-white border border-gray-100 p-8 flex flex-col items-center justify-center text-center hover:border-[#091421]/30 transition-colors border-t-4 border-t-[#091421]">
                <div className="w-16 h-16 bg-[#f8fafc] border border-gray-100 flex items-center justify-center mb-6">
                  <i className="lni lni-timer text-[#091421] text-2xl"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">Activation rapide</h3>
                <p className="text-gray-500 text-sm">
                  Mise en service en 24h, configuration pré-établie
                </p>
              </div>

              <div className="bg-white border border-gray-100 p-8 flex flex-col items-center justify-center text-center hover:border-red-primary/30 transition-colors border-t-4 border-t-red-primary">
                <div className="w-16 h-16 bg-[#f8fafc] border border-gray-100 flex items-center justify-center mb-6">
                  <i className="lni lni-grow text-red-primary text-2xl"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">Évolutif</h3>
                <p className="text-gray-500 text-sm">
                  De 3 à 50 utilisateurs, ajustable selon vos besoins
                </p>
              </div>
            </div>

            {/* Fonctionnalités incluses */}
            <div className="mt-16 bg-[#f8fafc] border border-gray-100 p-12 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-primary" />
              <h3 className="text-2xl font-black text-[#091421] mb-8 text-center uppercase tracking-tight">
                Toutes les fonctionnalités <span className="text-red-primary">3CX incluses</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 bg-white border border-gray-100 p-4">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700 font-medium">Appels VoIP illimités entre utilisateurs</span>
                </div>
                <div className="flex items-center space-x-4 bg-white border border-gray-100 p-4">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700 font-medium">Visioconférence intégrée</span>
                </div>
                <div className="flex items-center space-x-4 bg-white border border-gray-100 p-4">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700 font-medium">Applications mobiles iOS/Android</span>
                </div>
                <div className="flex items-center space-x-4 bg-white border border-gray-100 p-4">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700 font-medium">Chat d'équipe et collaboration</span>
                </div>
                <div className="flex items-center space-x-4 bg-white border border-gray-100 p-4">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700 font-medium">Standard automatique (SVI)</span>
                </div>
                <div className="flex items-center space-x-4 bg-white border border-gray-100 p-4">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700 font-medium">Support technique local</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-24 bg-[#091421] relative overflow-hidden">
          <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Démarrez avec <span className="text-red-primary">3CX SMB</span> dès aujourd'hui
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">
              Activation en 24h • Support expert local • Sans engagement
            </p>
            <div className="flex justify-center">
              <a href="/devis-en-ligne" className="monolith-btn bg-red-primary">
                <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                  <i className="lni lni-rocket" aria-hidden="true" />
                  Commencer maintenant
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

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
  alternates: {
    canonical: "/telephonie-entreprise/3cx-smb-mutualisee",
  },
};

export default function Smb3CXMutualisee() {
  return (
    <main>
        {/* Hero Section — Monolithe 2026 */}
        <section className="relative overflow-hidden bg-[#091421] py-32 px-8 lg:px-24 border-l-8 border-red-primary">
          <div className="absolute inset-0 monolith-grid-lines opacity-10 pointer-events-none z-10" />
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "radial-gradient(circle at 20% 50%, rgba(229, 62, 62, 0.15) 0%, transparent 50%)",
          }} />

          <div className="max-w-4xl relative z-30">
            <div className="mb-8">
              <div className="inline-flex items-center text-white font-black uppercase text-[10px] tracking-[0.3em] px-4 py-2 border border-red-primary bg-red-primary/10 mb-8">
                <i className="lni lni-users text-red-primary mr-2" aria-hidden="true"></i>
                Solution mutualisée
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-[-0.05em] leading-tight">
              3CX SMB <span className="text-red-primary">Mutualisée</span>
            </h1>
            <p className="text-2xl text-white font-black uppercase tracking-[-0.03em] mb-4">
              Solution économique pour TPE et PME
            </p>
            <p className="text-white/80 max-w-2xl mb-12 uppercase tracking-[0.1em] text-sm font-bold">
              De 3 à 50 utilisateurs • À partir de 15€/utilisateur/mois
            </p>

            {/* CTA Hero */}
            <Link
              href="/devis-en-ligne"
              className="inline-block monolith-btn bg-red-primary"
            >
              <span className="block text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5 flex items-center justify-center gap-2">
                <i className="lni lni-calculator" aria-hidden="true" />
                Demander un devis
              </span>
            </Link>
          </div>
        </section>

        {/* Section principale */}
        <section className="py-32 px-8 lg:px-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-[#091421] mb-8 uppercase tracking-[-0.05em] leading-tight">
                La solution <span className="text-red-primary">3CX économique</span> pour les TPE/PME
              </h2>
              <p className="text-lg text-[#2D3848] max-w-4xl leading-relaxed font-medium">
                Notre offre <strong>3CX SMB mutualisée</strong> vous permet de bénéficier de toutes les
                fonctionnalités 3CX sans les coûts d'une infrastructure dédiée. Parfait pour les TPE
                et PME de 3 à 50 utilisateurs recherchant une solution professionnelle et économique.
              </p>
            </div>

            {/* Avantages clés */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="bg-white border-4 border-red-primary p-8 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_#1F2937]">
                <div className="w-16 h-16 bg-red-primary flex items-center justify-center mb-6">
                  <i className="lni lni-calculator text-white text-2xl"></i>
                </div>
                <h3 className="text-sm font-black text-[#091421] uppercase tracking-[0.2em] mb-4">Économique</h3>
                <p className="text-[#818096] text-sm">
                  À partir de 15€/utilisateur/mois, sans frais d'infrastructure
                </p>
              </div>

              <div className="bg-white border-4 border-[#2D3848] p-8 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_#1F2937]">
                <div className="w-16 h-16 bg-[#2D3848] flex items-center justify-center mb-6">
                  <i className="lni lni-timer text-white text-2xl"></i>
                </div>
                <h3 className="text-sm font-black text-[#091421] uppercase tracking-[0.2em] mb-4">Activation rapide</h3>
                <p className="text-[#818096] text-sm">
                  Mise en service en 24h, configuration pré-établie
                </p>
              </div>

              <div className="bg-white border-4 border-red-primary p-8 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_#1F2937]">
                <div className="w-16 h-16 bg-red-primary flex items-center justify-center mb-6">
                  <i className="lni lni-grow text-white text-2xl"></i>
                </div>
                <h3 className="text-sm font-black text-[#091421] uppercase tracking-[0.2em] mb-4">Évolutif</h3>
                <p className="text-[#818096] text-sm">
                  De 3 à 50 utilisateurs, ajustable selon vos besoins
                </p>
              </div>
            </div>

            {/* Fonctionnalités incluses */}
            <div className="bg-white border-4 border-[#2D3848] p-12 shadow-[8px_8px_0px_0px_#1F2937]">
              <h3 className="text-3xl font-black text-[#091421] mb-12 uppercase tracking-[-0.04em]">
                Toutes les fonctionnalités <span className="text-red-primary">3CX incluses</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-white border-2 border-[#2D3848]">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl flex-shrink-0 mt-1"></i>
                  <span className="text-[#2D3848] font-bold">Appels VoIP illimités entre utilisateurs</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border-2 border-[#2D3848]">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl flex-shrink-0 mt-1"></i>
                  <span className="text-[#2D3848] font-bold">Visioconférence intégrée</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border-2 border-[#2D3848]">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl flex-shrink-0 mt-1"></i>
                  <span className="text-[#2D3848] font-bold">Applications mobiles iOS/Android</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border-2 border-[#2D3848]">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl flex-shrink-0 mt-1"></i>
                  <span className="text-[#2D3848] font-bold">Chat d'équipe et collaboration</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border-2 border-[#2D3848]">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl flex-shrink-0 mt-1"></i>
                  <span className="text-[#2D3848] font-bold">Standard automatique (SVI)</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border-2 border-[#2D3848]">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl flex-shrink-0 mt-1"></i>
                  <span className="text-[#2D3848] font-bold">Support technique local</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale — Monolithe 2026 */}
        <section className="py-32 px-8 lg:px-24 bg-[#091421] relative overflow-hidden">
          <div className="absolute inset-0 monolith-grid-lines opacity-10 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-[-0.05em] leading-tight">
              Démarrez avec <span className="text-red-primary">3CX SMB</span> dès aujourd'hui
            </h2>
            <p className="text-white/90 mb-12 max-w-2xl mx-auto uppercase tracking-[0.1em] text-sm font-bold">
              Activation en 24h • Support expert local • Sans engagement
            </p>
            <Link
              href="/devis-en-ligne"
              className="inline-block monolith-btn bg-red-primary"
            >
              <span className="block text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5 flex items-center justify-center gap-2">
                <i className="lni lni-rocket" aria-hidden="true" />
                Commencer maintenant
              </span>
            </Link>
          </div>
        </section>
      </main>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { Calculator, Phone, Rocket, Users, Timer, TrendUp, CheckCircle, DeviceMobile, Desktop, Globe } from '@/lib/icons';
import { TALLY_FORMS } from "@/lib/constants/tally";

// Formulaire Tally dédié à l'offre 3CX SMB PRO Mutualisé (tunnel devis).
const TALLY_3CX_SMB_URL = TALLY_FORMS.VOIP_3CX_SMB;

export const metadata: Metadata = {
  title: "3CX SMB PRO Mutualisé - Solution économique TPE/PME",
  description:
    "Solution 3CX hébergée mutualisée pour TPE et PME. De 3 à 10 utilisateurs, activation rapide, coûts optimisés. 29 €/utilisateur/mois.",
  keywords:
    "3CX SMB PRO, 3CX mutualisé, téléphonie TPE, téléphonie PME, VoIP économique, 3CX multi-tenant",
  openGraph: {
    title: "3CX SMB PRO Mutualisé - Solution économique TPE/PME",
    description:
      "Solution 3CX hébergée mutualisée. De 3 à 10 utilisateurs. Activation rapide et coûts optimisés.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.e2i-voip.com/telephonie-entreprise/3cx-smb-mutualisee",
    siteName: "E2I VoIP",
  },
  // Page de détail : canonical vers le hub 3CX pour éviter la cannibalisation
  // (le hub /telephonie-3cx reste la page référencée par les moteurs).
  alternates: {
    canonical: "https://www.e2i-voip.com/telephonie-3cx",
  },
};

export default function Smb3CXMutualisee() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="3CX SMB Mutualisée"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Users size={16} className="text-white mr-2" aria-hidden="true" />
                <span className="text-white/90 text-sm font-medium">
                  Solution mutualisée
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                3CX SMB PRO <span className="text-white">Mutualisé</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Solution économique</strong> pour TPE et PME
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                De <strong>3 à 10 utilisateurs</strong> •
                29 €/utilisateur/mois
              </p>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <CTAButton href={TALLY_3CX_SMB_URL} icon="Calculator" external>
                  Demander un devis
                </CTAButton>
                <CTAButtonMarine href="tel:+33189560500" icon="Phone" external>
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
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                La solution <span className="text-red-primary">3CX économique</span> pour les petites entreprises
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Notre offre <strong>3CX SMB mutualisée</strong> vous permet de bénéficier de toutes les 
                fonctionnalités 3CX sans les coûts d'une infrastructure dédiée. Parfait pour les TPE 
                et PME de 3 à 10 utilisateurs recherchant une solution professionnelle et économique.
              </p>
            </div>

            {/* Avantages clés avec DaisyUI */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Calculator size={32} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Économique</h3>
                  <p className="text-gray-600 text-center">
                    29 €/utilisateur/mois, sans frais d'infrastructure
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Timer size={32} className="text-gray-800" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Activation rapide</h3>
                  <p className="text-gray-600 text-center">
                    Mise en service rapide, configuration pré-établie
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <TrendUp size={32} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Évolutif</h3>
                  <p className="text-gray-600 text-center">
                    De 3 à 10 utilisateurs, ajustable selon vos besoins
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
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">Appels VoIP illimités entre utilisateurs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">Visioconférence intégrée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">Applications mobiles iOS/Android</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">Chat d'équipe et collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">Standard automatique (SVI)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">Support par mail et téléphone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tarification 3CX par utilisateur */}
        <section className="py-16 bg-base-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Une tarification <span className="text-red-primary">simple par utilisateur</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un tarif unique et transparent, tout compris, par utilisateur.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* En-tête prix */}
              <div className="bg-gradient-to-r from-blue-900/95 to-red-600/90 px-8 py-8 text-center text-white">
                <div className="text-5xl font-black">
                  29 €
                  <span className="text-xl font-medium text-white/80"> / utilisateur / mois</span>
                </div>
                <p className="mt-2 text-white/90">3CX Pro pour chaque utilisateur</p>
              </div>

              {/* Détail inclus */}
              <div className="p-8 grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Appels illimités vers les fixes</h3>
                    <p className="text-gray-600 text-sm">
                      Fixes des DOM et de France métropolitaine, inclus pour chaque utilisateur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DeviceMobile size={24} className="text-blue-marine" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Application mobile 3CX incluse</h3>
                    <p className="text-gray-600 text-sm">
                      Utilisable sur smartphone, PC et navigateur web.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe size={24} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Multi-supports</h3>
                    <p className="text-gray-600 text-sm">
                      Smartphone, ordinateur ou directement depuis votre navigateur web.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Desktop size={24} className="text-blue-marine" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Téléphones SIP compatibles</h3>
                    <p className="text-gray-600 text-sm">
                      Connectez vos téléphones SIP compatibles, notamment Fanvil et Yealink.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-6">
              Démarrez avec <span className="text-white">3CX SMB</span> dès aujourd'hui
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Activation rapide • Support par mail et téléphone • Sans engagement
            </p>
            <CTAButton href={TALLY_3CX_SMB_URL} icon="Rocket" external>
              Commencer maintenant
            </CTAButton>
          </div>
        </section>
      </main>
    </div>
  );
}

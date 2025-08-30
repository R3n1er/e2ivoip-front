import { Metadata } from "next";
import Link from "next/link";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Téléphonie Yeastar - E2I VoIP | Solutions PBX Yeastar",
  description:
    "Solutions PBX Yeastar pour entreprises. Systèmes de téléphonie IP économiques et fiables pour TPE et PME.",
  keywords:
    "Yeastar, PBX Yeastar, téléphonie Yeastar, IPBX Yeastar, VoIP Yeastar",
  openGraph: {
    title: "Téléphonie Yeastar - Solutions PBX professionnelles",
    description:
      "Découvrez nos solutions PBX Yeastar adaptées aux TPE et PME.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/pbx-yeastar",
    siteName: "E2I VoIP",
  },
};

export default function PBXYeastar() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Solutions Yeastar E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <i className="lni lni-phone-set text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">
                  PBX Yeastar
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Téléphonie <span className="text-white">Yeastar</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Solutions PBX économiques</strong> pour TPE et PME
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Systèmes de téléphonie IP fiables et abordables
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
                Solutions <span className="text-red-primary">Yeastar</span> pour votre entreprise
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Yeastar propose des solutions PBX IP complètes et économiques, parfaites pour les 
                TPE et PME recherchant un système de téléphonie professionnel sans complexité.
              </p>
            </div>

            {/* Avantages Yeastar avec DaisyUI */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className="lni lni-calculator text-red-primary text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark justify-center">Économique</h3>
                  <p className="text-gray-600 text-center">
                    Solutions abordables avec un excellent rapport qualité-prix
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className="lni lni-cog text-gray-800 text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark justify-center">Simple à gérer</h3>
                  <p className="text-gray-600 text-center">
                    Interface intuitive et administration simplifiée
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className="lni lni-shield text-red-primary text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark justify-center">Fiable</h3>
                  <p className="text-gray-600 text-center">
                    Technologie éprouvée avec support local E2I VoIP
                  </p>
                </div>
              </div>
            </div>

            {/* Modèles disponibles */}
            <div className="mt-16 bg-base-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-dark mb-6 text-center">
                Gamme PBX Yeastar
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card bg-base-100">
                  <div className="card-body">
                    <h4 className="card-title text-gray-dark">S-Series</h4>
                    <p className="text-gray-600">PBX VoIP pour PME</p>
                    <p className="text-sm text-gray-500">20 à 200 utilisateurs</p>
                  </div>
                </div>
                <div className="card bg-base-100">
                  <div className="card-body">
                    <h4 className="card-title text-gray-dark">P-Series</h4>
                    <p className="text-gray-600">PBX Cloud-ready</p>
                    <p className="text-sm text-gray-500">10 à 500 utilisateurs</p>
                  </div>
                </div>
                <div className="card bg-base-100">
                  <div className="card-body">
                    <h4 className="card-title text-gray-dark">Cloud PBX</h4>
                    <p className="text-gray-600">Solution hébergée</p>
                    <p className="text-sm text-gray-500">Illimité</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fonctionnalités */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-dark mb-6 text-center">
                Fonctionnalités incluses
              </h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Standard automatique (IVR)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Files d'attente d'appels</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Conférences téléphoniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Enregistrement d'appels</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Messagerie vocale par email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  <span className="text-gray-700">Applications mobiles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Découvrez les solutions <span className="text-white">Yeastar</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nos experts vous conseillent sur la meilleure solution Yeastar pour votre entreprise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="lni-bubble">
                Demander une démonstration
              </CTAButton>
              <CTAButtonMarine href="tel:+33189560500" icon="lni-phone" external>
                Appeler un expert
              </CTAButtonMarine>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import TrunkSipCompteurFAQ from "@/components/faq-trunk-sip-compteur";
import { CTAButton, CTAButtonSecondary } from "@/components/ui/cta-button";
// Tally embed inséré en iframe (pas de popup)
import { TallyEmbedDevis } from "@/components/tally-embed-devis";

export const metadata: Metadata = {
  title:
    "Trunk SIP au Compteur DOM - E2I VoIP | Passerelle SIP Antilles-Guyane-Réunion",
  description:
    "Trunk SIP au compteur DOM : payez uniquement vos consommations réelles. Connexions SIP locales Antilles-Guyane-Réunion. Numéros locaux gratuits. Économisez jusqu'à 30%.",
  keywords:
    "trunk SIP compteur DOM, passerelle SIP Antilles, VoIP Guadeloupe Martinique Guyane Réunion, connexion SIP locale, numéros géographiques DOM, opérateur télécom local",
  openGraph: {
    title: "Trunk SIP au Compteur DOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM. Payez uniquement vos consommations réelles. Numéros locaux gratuits.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-compteur",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP au Compteur DOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM. Économisez jusqu'à 30%.",
  },
};

export default function TrunkSIPCompteur() {
  const compatibleBrands = [
    { name: "3CX", description: "IPBX cloud leader mondial" },
    { name: "Yeastar", description: "Solutions économiques PME" },
    { name: "Grandstream", description: "Passerelles VoIP robustes" },
    { name: "Avaya", description: "Solutions entreprise" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Formulaire Tally intégré (embed) */}
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Professionnel utilisant la téléphonie IP E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay uniforme */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <i className="lni lni-phone text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">
                  Opérateur SIP DOM
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP au <span className="text-white">compteur</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Payez uniquement vos consommations réelles</strong> avec
                notre passerelle SIP DOM
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Économisez jusqu'à <strong>30%</strong> sur vos coûts télécom •
                Connexions SIP locales Antilles-Guyane-Réunion
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <i className="lni lni-checkmark-circle text-white"></i>
                  <span className="text-sm">Facturation à la seconde</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-phone text-white"></i>
                  <span className="text-sm">Numéros locaux gratuits</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-users text-white"></i>
                  <span className="text-sm">Support technique local</span>
                </div>
              </div>

              {/* CTA Hero */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/devis-en-ligne">
                  <button className="btn btn-lg bg-white text-red-primary border-0 shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold min-w-[240px]">
                    <i className="lni lni-calculator mr-2 text-lg"></i>
                    Calculer mes économies
                  </button>
                </Link>
                <a href="tel:+33189560500">
                  <button className="btn btn-lg bg-white/10 text-white border-2 border-white/60 backdrop-blur-sm shadow-xl hover:bg-white hover:text-red-primary hover:border-white hover:scale-105 transition-all duration-300 font-semibold min-w-[200px]">
                    <i className="lni lni-phone mr-2 text-lg"></i>
                    0594 96 35 00
                  </button>
                </a>
              </div>

              {/* Indicateur de défilement */}
              <div className="mt-16 text-center">
                <div className="inline-flex flex-col items-center animate-bounce">
                  <span className="text-white/60 text-sm mb-2">
                    Découvrez nos tarifs
                  </span>
                  <i className="lni lni-chevron-down text-white/60 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section explicative */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-gray-700 leading-relaxed">
                <strong>E2I Assistance VOIP</strong> est opérateur de service
                télécom et est capable de vous fournir des passerelles Trunk SIP
                de qualité en France et dans les DOM. Le Trunk SIP est un des
                éléments essentiels de votre système de téléphonie IP, avec
                votre IPBX et vos téléphones SIP. C&apos;est une liaison entre
                votre serveur de téléphonie IP et votre opérateur SIP vous
                permettant de passer des appels sur le réseau téléphonique.
                C&apos;est donc tout simplement votre ligne téléphonique via
                Internet.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <i className="lni lni-checkmark-circle mr-2"></i>
                  Solution certifiée DOM
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                  <span className="text-red-primary">
                    Trunk SIP au compteur
                  </span>{" "}
                  : payez seulement ce que vous consommez
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  <strong>Passerelle SIP spécialisée DOM</strong> qui connecte
                  votre IPBX au réseau téléphonique. Facturation{" "}
                  <strong>transparente à la seconde</strong> dès la première
                  seconde.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-money-location text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Facturation au compteur transparente
                      </h3>
                      <p className="text-gray-600">
                        <strong>Payez uniquement vos appels émis</strong>,
                        facturation à la seconde dès le premier décroché. Idéal
                        pour les centres d'appels et TPE/PME.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-phone text-blue-marine text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Numéros locaux DOM (Création et Portabilité)
                      </h3>
                      <p className="text-gray-600">
                        <strong>Création et portabilité</strong> de numéros
                        géographiques Antilles-Guyane-Réunion pour renforcer
                        votre image locale.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-network text-red-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Compatible tous IPBX
                      </h3>
                      <p className="text-gray-600">
                        Compatible avec{" "}
                        <strong>3CX, Yeastar, Grandstream, Avaya</strong>.
                        Connexions flexibles de 2 à plus de 30 appels simultanés
                        sur un Trunk SIP.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-users text-gray-secondary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Support technique local réactif
                      </h3>
                      <p className="text-gray-600">
                        Équipes présentes localement en{" "}
                        <strong>Martinique, Guadeloupe, Guyane</strong>. Réponse
                        en moins de 2h.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Tarifs des appels à la minute
                  </h3>
                  <p className="text-gray-600">
                    Facturation à la seconde dès la première seconde • Pas de
                    frais cachés
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-primary">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">France Fixe</span>
                      <span className="text-red-primary font-bold text-lg">
                        0,0120 €
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-marine">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">France Mobile</span>
                      <span className="text-blue-marine font-bold text-lg">
                        0,0600 €
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-600">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        DOM Fixe (Guadeloupe, Martinique, Guyane, Réunion,
                        Mayotte)
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        0,0160 €
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        DOM Mobile (Guadeloupe, Martinique, Guyane, Réunion,
                        Mayotte)
                      </span>
                      <span className="text-orange-500 font-bold text-lg">
                        0,0800 €
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-secondary">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Création numéro SDA</span>
                      <span className="text-gray-secondary font-semibold">
                        Sur devis
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-secondary">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Portabilité</span>
                      <span className="text-gray-secondary font-semibold">
                        Sur devis
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <i className="lni lni-information text-blue-marine mt-0.5"></i>
                    <div className="text-sm text-blue-800">
                      <p>
                        <strong>Facturation transparente :</strong> Pas de frais
                        de connexion, pas de minimum de consommation,
                        facturation à la seconde dès la première seconde.
                      </p>
                      <p className="mt-1">
                        <strong>Numéros locaux :</strong> Création et
                        portabilité de numéros géographiques DOM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibilité IPBX */}
        <section className="py-16 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Compatible avec{" "}
                <span className="text-red-primary">tous les IPBX</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre Trunk SIP s&apos;intègre parfaitement avec toutes les
                marques d&apos;IPBX du marché
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* 3CX */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/logo-3cx.webp"
                      alt="Logo 3CX"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="card-title text-base text-gray-dark">3CX</h3>
                  <p className="text-gray-600 text-sm">
                    IPBX cloud leader mondial
                  </p>
                </div>
              </div>

              {/* Yeastar */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                      alt="Logo Yeastar"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="card-title text-base text-gray-dark">
                    Yeastar
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Solutions économiques PME
                  </p>
                </div>
              </div>

              {/* Grandstream */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/logo-grandstream.webp"
                      alt="Logo Grandstream"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="card-title text-base text-gray-dark">
                    Grandstream
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Passerelles VoIP robustes
                  </p>
                </div>
              </div>

              {/* Avaya */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/avaya-logo.webp"
                      alt="Logo Avaya"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="card-title text-base text-gray-dark">Avaya</h3>
                  <p className="text-gray-600 text-sm">Solutions entreprise</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                <strong>Pas d&apos;IPBX ?</strong> Nous proposons des solutions
                complètes incluant l&apos;équipement
              </p>
              <Link
                href="/nos-services"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Découvrir nos solutions IPBX
                <i className="lni lni-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrunkSipCompteurFAQ />
          </div>
        </section>

        {/* Formulaire Tally (embed) avec nouvelle UX améliorée */}
        <TallyEmbedDevis />

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Calculez vos <span className="text-white">économies</span>{" "}
              maintenant
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Obtenez votre <strong>devis personnalisé en 2 minutes</strong> et
              découvrez combien vous pouvez économiser avec notre Trunk SIP au
              compteur
            </p>

            {/* Avantages finaux */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-white/90">
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-checkmark-circle text-white"></i>
                <span className="text-sm">Devis gratuit</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-timer text-white"></i>
                <span className="text-sm">Réponse rapide</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-shield text-white"></i>
                <span className="text-sm">Expert VoIP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="lni-calculator">
                Calculer mes économies gratuitement
              </CTAButton>
              <CTAButtonSecondary
                href="tel:+33189560500"
                icon="lni-phone"
                external
              >
                Parler à un expert : 01 89 56 05 00
              </CTAButtonSecondary>
            </div>

            <p className="text-white/70 text-sm mt-6">
              <strong>Expertise DOM depuis 15 ans</strong> • Plus de 100
              entreprises nous font confiance
            </p>
          </div>
        </section>
      </main>

      {/* TawkTo volontairement désactivé sur cette page */}
    </div>
  );
}

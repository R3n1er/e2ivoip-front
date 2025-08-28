import { Metadata } from "next";
import Link from "next/link";
import { CTAButton, CTAButtonSecondary } from "@/components/ui/cta-button";
import { HubSpotContactForm } from "@/components/hubspot-contact-form";

export const metadata: Metadata = {
  title:
    "Trunk SIP Illimité DOM - E2I VoIP | Appels Illimités France & DOM",
  description:
    "Trunk SIP illimité vers fixes et mobiles France métropolitaine et DOM. De 2 à 8 appels simultanés. Forfait tout inclus avec fair use. Solution idéale pour centres d'appels et entreprises.",
  keywords:
    "trunk SIP illimité, appels illimités DOM, forfait téléphonie entreprise, 8 appels simultanés, VoIP illimité Guadeloupe Martinique Guyane Réunion, trunk SIP fair use",
  openGraph: {
    title: "Trunk SIP Illimité - Appels Illimités France & DOM",
    description:
      "Forfait trunk SIP illimité de 2 à 8 appels simultanés. Appels illimités vers fixes et mobiles France et DOM.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-illimite",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP Illimité - E2I VoIP",
    description:
      "Forfait trunk SIP illimité. Appels illimités France & DOM. De 2 à 8 appels simultanés.",
  },
};

export default function TrunkSIPIllimite() {
  const forfaits = [
    {
      appels: 2,
      ideal: "TPE, petites structures",
      popular: false,
    },
    {
      appels: 3,
      ideal: "PME en croissance",
      popular: false,
    },
    {
      appels: 4,
      ideal: "Entreprises actives",
      popular: true,
    },
    {
      appels: 6,
      ideal: "Centres d'appels",
      popular: false,
    },
    {
      appels: 8,
      ideal: "Grandes structures",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
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
                <i className="lni lni-infinite text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">
                  Forfait illimité
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP <span className="text-white">Illimité</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Appels illimités</strong> vers fixes et mobiles
                France métropolitaine & DOM
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                De <strong>2 à 8 appels simultanés</strong> • 
                Forfait tout inclus avec politique fair use
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <i className="lni lni-checkmark-circle text-white"></i>
                  <span className="text-sm">Appels illimités France</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-world text-white"></i>
                  <span className="text-sm">Appels illimités DOM</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-users text-white"></i>
                  <span className="text-sm">2 à 8 lignes simultanées</span>
                </div>
              </div>

              {/* CTA Hero */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="#contact-form">
                  <button className="btn btn-lg bg-white text-red-primary border-0 shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold min-w-[240px]">
                    <i className="lni lni-bubble mr-2 text-lg"></i>
                    Demander un devis
                  </button>
                </Link>
                <a href="tel:+33189560500">
                  <button className="btn btn-lg bg-white/10 text-white border-2 border-white/60 backdrop-blur-sm shadow-xl hover:bg-white hover:text-red-primary hover:border-white hover:scale-105 transition-all duration-300 font-semibold min-w-[200px]">
                    <i className="lni lni-phone mr-2 text-lg"></i>
                    01 89 56 05 00
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section explicative */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <i className="lni lni-infinite mr-2"></i>
                  Solution forfaitaire
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                  <span className="text-red-primary">L'illimité</span> pour
                  votre téléphonie d'entreprise
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Notre <strong>Trunk SIP Illimité</strong> est la solution idéale
                  pour les entreprises avec un volume d'appels important. 
                  Maîtrisez votre budget télécom avec un forfait tout inclus.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-phone text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Appels illimités France métropolitaine
                      </h3>
                      <p className="text-gray-600">
                        <strong>Fixes et mobiles</strong> en illimité vers la France
                        métropolitaine. Appelez sans compter, sans surprise sur
                        votre facture.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-map text-blue-marine text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Appels illimités vers les DOM
                      </h3>
                      <p className="text-gray-600">
                        <strong>Guadeloupe, Martinique, Guyane, Réunion</strong> :
                        communiquez librement avec tous les DOM en illimité.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-users text-red-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        De 2 à 8 appels simultanés
                      </h3>
                      <p className="text-gray-600">
                        Choisissez le nombre de lignes selon vos besoins.
                        <strong> Évolutif à tout moment</strong> pour
                        accompagner votre croissance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-shield text-orange-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Politique Fair Use transparente
                      </h3>
                      <p className="text-gray-600">
                        Usage professionnel normal sans limitation.
                        <strong> Pas de frais cachés</strong>, pas de mauvaise
                        surprise. Transparence garantie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/* Tableau des forfaits */}
                <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Nos forfaits illimités
                    </h3>
                    <p className="text-gray-600">
                      Choisissez selon vos besoins en appels simultanés
                    </p>
                  </div>
                  <div className="space-y-4">
                    {forfaits.map((forfait) => (
                      <div
                        key={forfait.appels}
                        className={`bg-white p-4 rounded-lg shadow ${
                          forfait.popular
                            ? "border-2 border-red-primary relative"
                            : "border border-gray-200"
                        }`}
                      >
                        {forfait.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-red-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                              Populaire
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-lg text-gray-dark">
                              {forfait.appels} appels simultanés
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              {forfait.ideal}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-red-primary font-bold text-xl">
                              Sur devis
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              /mois
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <i className="lni lni-information text-blue-marine mt-0.5"></i>
                      <div className="text-sm text-blue-800">
                        <p>
                          <strong>Tout inclus :</strong> Appels illimités France
                          + DOM, numéros géographiques, support technique local.
                        </p>
                        <p className="mt-1">
                          <strong>Fair Use :</strong> Usage professionnel normal,
                          pas de centre d'appels sortants intensifs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-16 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Pourquoi choisir notre{" "}
                <span className="text-red-primary">Trunk SIP Illimité</span> ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une solution complète pour maîtriser vos coûts télécom
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Budget maîtrisé */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <i className="lni lni-calculator text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark mb-2">
                    Budget maîtrisé
                  </h3>
                  <p className="text-gray-600">
                    Un forfait mensuel fixe, pas de surprise. Idéal pour la
                    gestion budgétaire de votre entreprise.
                  </p>
                </div>
              </div>

              {/* Couverture complète */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <i className="lni lni-world text-blue-600 text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark mb-2">
                    Couverture France + DOM
                  </h3>
                  <p className="text-gray-600">
                    Appelez sans limite vers la métropole et tous les
                    départements d'outre-mer.
                  </p>
                </div>
              </div>

              {/* Évolutif */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="lni lni-grow text-red-primary text-2xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark mb-2">
                    Solution évolutive
                  </h3>
                  <p className="text-gray-600">
                    Ajustez le nombre d'appels simultanés selon l'évolution de
                    votre activité.
                  </p>
                </div>
              </div>
            </div>

            {/* Points clés supplémentaires */}
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-green-600 text-xl"></i>
                  <span className="text-gray-700">
                    Compatible avec tous les IPBX (3CX, Yeastar, Grandstream)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-green-600 text-xl"></i>
                  <span className="text-gray-700">
                    Portabilité gratuite de vos numéros existants
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-green-600 text-xl"></i>
                  <span className="text-gray-700">
                    Support technique local et réactif
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="lni lni-checkmark-circle text-green-600 text-xl"></i>
                  <span className="text-gray-700">
                    Qualité HD garantie sur tous les appels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact / Formulaire HubSpot */}
        <section id="contact-form" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="lni lni-envelope mr-2"></i>
                Contact commercial
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Obtenez votre <span className="text-red-primary">devis personnalisé</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nos experts vous conseillent et établissent un devis adapté à vos besoins
              </p>
            </div>

            {/* Formulaire HubSpot */}
            <HubSpotContactForm />

            {/* Alternative de contact */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Vous préférez nous appeler directement ?
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="tel:+33189560500"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <i className="lni lni-phone-set text-lg"></i>
                  <span>France : 01 89 56 05 00</span>
                </a>
                <a
                  href="tel:+594963500"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <i className="lni lni-phone-set text-lg"></i>
                  <span>Guyane : 0594 96 35 00</span>
                </a>
                <a
                  href="tel:+590173500"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <i className="lni lni-phone-set text-lg"></i>
                  <span>Guadeloupe : 0590 17 35 00</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Passez à <span className="text-white">l'illimité</span> dès maintenant
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont choisi la simplicité et la
              tranquillité avec notre Trunk SIP Illimité
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8 text-white/90">
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-checkmark-circle text-white"></i>
                <span className="text-sm">Activation rapide</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-timer text-white"></i>
                <span className="text-sm">Sans engagement</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-shield text-white"></i>
                <span className="text-sm">Garantie qualité</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="#contact-form" icon="lni-bubble">
                Demander mon devis illimité
              </CTAButton>
              <CTAButtonSecondary
                href="tel:+33189560500"
                icon="lni-phone"
                external
              >
                Appeler un conseiller
              </CTAButtonSecondary>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
import { Metadata } from "next";
import Link from "next/link";
import TrunkSipCompteurFAQ from "@/components/faq-trunk-sip-compteur";
import { ClientsCarousel } from "@/components/clients-carousel";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
// Tally embed inséré en iframe (pas de popup)
import { TallyEmbedTarifs } from "@/components/tally-embed-tarifs";
import { Calculator, Phone, CheckCircle, Users, CaretDown, Wallet, TreeStructure, ArrowRight, Timer, Shield } from '@/lib/icons';
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import { COMPTEUR_FAQ } from "@/lib/faq-data";

export const metadata: Metadata = {
  title:
    "Trunk SIP au Compteur DOM - E2I VoIP | Passerelle SIP Antilles-Guyane-Réunion",
  description:
    "Trunk SIP au compteur DOM : payez uniquement vos consommations réelles. Connexions SIP locales Antilles-Guyane-Réunion. Numéros locaux gratuits. Économisez jusqu'à 20%.",
  keywords:
    "trunk SIP compteur DOM, passerelle SIP Antilles, VoIP Guadeloupe Martinique Guyane Réunion, connexion SIP locale, numéros géographiques DOM, opérateur télécom local",
  openGraph: {
    title: "Trunk SIP au Compteur DOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM. Payez uniquement vos consommations réelles. Numéros locaux gratuits.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.e2i-voip.com/telephonie-entreprise/trunk-sip-compteur",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP au Compteur DOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM. Économisez jusqu'à 20%.",
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
      <JsonLd data={faqPageSchema(COMPTEUR_FAQ)} />
      <JsonLd
        data={serviceSchema({
          name: "Trunk SIP au compteur DOM",
          description:
            "Connexion SIP facturée à la seconde pour entreprises et intégrateurs en France et DOM. Payez uniquement vos consommations réelles, numéros locaux Antilles-Guyane-Réunion.",
          path: "/telephonie-entreprise/trunk-sip-compteur",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Téléphonie d'entreprise", path: "/telephonie-entreprise" },
          {
            name: "Trunk SIP au compteur",
            path: "/telephonie-entreprise/trunk-sip-compteur",
          },
        ])}
      />
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
                <Phone size={16} className="text-white mr-2" aria-hidden="true" />
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
                Économisez jusqu'à <strong>20%</strong> sur vos coûts télécom •
                Connexions SIP locales Antilles-Guyane-Réunion
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Facturation à la seconde</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Numéros locaux gratuits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Support technique local</span>
                </div>
              </div>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <CTAButton href="/devis-en-ligne" icon="Calculator">
                  Devis en ligne
                </CTAButton>
                <CTAButtonMarine
                  href="tel:+33189560500"
                  icon="Phone"
                  external
                >
                  01 89 56 05 00
                </CTAButtonMarine>
              </div>

              {/* Indicateur de défilement */}
              <div className="mt-16 text-center">
                <div className="inline-flex flex-col items-center animate-bounce">
                  <span className="text-white/60 text-sm mb-2">
                    Recevez nos tarifs personnalisés
                  </span>
                  <CaretDown size={24} className="text-white/60" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section explicative */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-gray-700 leading-relaxed">
                <strong>E2I VOIP</strong> est opérateur de service télécom et
                est capable de vous fournir des passerelles Trunk SIP de qualité
                en France et dans les DOM. Le Trunk SIP est un des éléments
                essentiels de votre système de téléphonie IP, avec votre IPBX et
                vos téléphones SIP. C&apos;est une liaison entre votre serveur
                de téléphonie IP et votre opérateur SIP vous permettant de
                passer des appels sur le réseau téléphonique. C&apos;est donc
                tout simplement votre ligne téléphonique via Internet.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div>
                <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <CheckCircle size={16} className="mr-2" aria-hidden="true" />
                  Solution certifiée DOM
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
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
                    <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wallet size={24} className="text-red-primary" aria-hidden="true" />
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
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-gray-800" aria-hidden="true" />
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
                      <TreeStructure size={24} className="text-red-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Compatible tous IPBX
                      </h3>
                      <p className="text-gray-600">
                        Compatible avec{" "}
                        <strong>3CX, Yeastar, Grandstream, Avaya, Asterisk</strong>.
                        Connexions flexibles de 2 à plus de 30 appels simultanés
                        sur un Trunk SIP.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-gray-secondary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Support technique local réactif
                      </h3>
                      <p className="text-gray-600">
                        Présents en{" "}
                        <strong>Martinique, Guadeloupe, Guyane</strong>. Support
                        à distance du lundi au vendredi de 8h à 18h.
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
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
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
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/logo-3cx.webp"
                      alt="Logo 3CX"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="flex items-center gap-2 text-base font-semibold text-gray-dark">3CX</h3>
                  <p className="text-gray-600 text-sm">
                    IPBX cloud leader mondial
                  </p>
                </div>
              </div>

              {/* Yeastar */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                      alt="Logo Yeastar"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="flex items-center gap-2 text-base font-semibold text-gray-dark">
                    Yeastar
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Solutions économiques PME
                  </p>
                </div>
              </div>

              {/* Grandstream */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/logo-grandstream.webp"
                      alt="Logo Grandstream"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="flex items-center gap-2 text-base font-semibold text-gray-dark">
                    Grandstream
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Passerelles VoIP robustes
                  </p>
                </div>
              </div>

              {/* Avaya */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                    <img
                      src="/images/logos-sip-compatibility/avaya-logo.webp"
                      alt="Logo Avaya"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="flex items-center gap-2 text-base font-semibold text-gray-dark">Avaya</h3>
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
                href="/telephonie-3cx"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Découvrir nos solutions IPBX
                <ArrowRight size={16} className="ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Ils nous font confiance */}
        <ClientsCarousel />

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrunkSipCompteurFAQ />
          </div>
        </section>

        {/* Formulaire Tally tarifs (embed) → webhook n8n */}
        <TallyEmbedTarifs />

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-6">
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
                <CheckCircle size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Devis gratuit</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Timer size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Réponse rapide</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Expert VoIP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="Calculator">
                Devis en ligne
              </CTAButton>
              <CTAButtonMarine
                href="tel:+33189560500"
                icon="Phone"
                external
              >
                Parler à un expert : 01 89 56 05 00
              </CTAButtonMarine>
            </div>

            <p className="text-white/70 text-sm mt-6">
              <strong>Expertise DOM depuis 15 ans</strong> • Support par mail
              et téléphone
            </p>
          </div>
        </section>
      </main>

      {/* TawkTo volontairement désactivé sur cette page */}
    </div>
  );
}

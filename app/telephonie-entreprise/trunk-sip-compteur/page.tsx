import { Metadata } from "next";
import Link from "next/link";
import TrunkSipCompteurFAQ from "@/components/faq-trunk-sip-compteur";
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
        <section className="py-20 relative overflow-hidden bg-[#091421]">
          {/* Background Image avec incrustation */}
          <div className="absolute inset-0">
             <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Professionnel utilisant la téléphonie IP E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay et Grille Monolith */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#091421]/90 via-[#091421]/80 to-red-primary/90 pointer-events-none z-10" />
            <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none z-10" />
            <div className="absolute inset-0 pointer-events-none z-20" style={{ boxShadow: "inset 0 0 100px rgba(9,20,33,1)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="text-center">
              <div className="inline-flex items-center bg-red-primary/20 rounded-none px-4 py-2 mb-6 border border-red-primary/30">
                <i className="lni lni-phone text-red-primary mr-2" aria-hidden="true"></i>
                <span className="text-red-primary font-black uppercase text-[10px] tracking-widest">
                  Opérateur SIP DOM
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                Trunk SIP au <span className="text-red-primary">compteur</span>
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

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/devis-en-ligne" className="monolith-btn bg-red-primary">
                  <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center gap-2">
                    <i className="lni lni-calculator" aria-hidden="true" />
                    Calculer mes économies
                  </span>
                </Link>
                <a href="tel:+33189560500" className="monolith-btn bg-white">
                  <span className="block text-[#091421] font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center gap-2">
                    <i className="lni lni-phone" aria-hidden="true" />
                    +33 1 89 56 05 00
                  </span>
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center text-red-primary font-black uppercase text-[10px] tracking-widest px-4 py-2 border border-red-primary/30 bg-red-primary/5 mb-6">
                  <i className="lni lni-checkmark-circle mr-2" aria-hidden="true"></i>
                  Solution certifiée DOM
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#091421] mb-6 uppercase tracking-tight leading-tight">
                  <span className="text-red-primary">
                    Trunk SIP 
                  </span>{" "}
                  au compteur
                </h2>
                <p className="text-xl text-gray-500 mb-8 font-medium">
                  <strong>Passerelle SIP spécialisée DOM</strong> qui connecte
                  votre IPBX au réseau téléphonique. Facturation{" "}
                  <strong>transparente à la seconde</strong> dès la première
                  seconde.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-primary/10 rounded-none flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-money-location text-red-primary text-xl"></i>
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
                    <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-phone text-gray-800 text-xl"></i>
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
                    <div className="w-12 h-12 bg-red-primary/10 rounded-none flex items-center justify-center flex-shrink-0">
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
                    <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center flex-shrink-0">
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

              <div className="bg-[#f8fafc] p-8 border border-gray-100 border-t-4 border-t-red-primary">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-[#091421] mb-2 uppercase tracking-tight">
                    Tarifs à la minute
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Facturation à la seconde dès la première seconde • Pas de
                    frais cachés
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 border border-gray-100 shadow-none border-l-4 border-l-red-primary">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">France Fixe</span>
                      <span className="text-red-primary font-black text-lg">
                        0,0120 € /min
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-100 shadow-none border-l-4 border-l-blue-marine">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">France Mobile</span>
                      <span className="text-blue-marine font-black text-lg">
                        0,0600 € /min
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-100 shadow-none border-l-4 border-l-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-wider text-[#091421] max-w-[200px] leading-tight">
                        DOM Fixe (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)
                      </span>
                      <span className="text-gray-600 font-black text-lg whitespace-nowrap">
                        0,0160 € /min
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-100 shadow-none border-l-4 border-l-gray-400">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-wider text-[#091421] max-w-[200px] leading-tight">
                        DOM Mobile (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)
                      </span>
                      <span className="text-gray-600 font-black text-lg whitespace-nowrap">
                        0,0800 € /min
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-100 shadow-none border-l-4 border-l-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">Création Numéro</span>
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        Sur devis
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 border border-gray-100 shadow-none border-l-4 border-l-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">Portabilité</span>
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        Sur devis
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-none border border-blue-200">
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
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/images/logos-sip-compatibility/logo-3cx.webp"
                    alt="Logo 3CX"
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">3CX</h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  IPBX cloud leader mondial
                </p>
              </div>

              {/* Yeastar */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                    alt="Logo Yeastar"
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">
                  Yeastar
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Solutions économiques PME
                </p>
              </div>

              {/* Grandstream */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/images/logos-sip-compatibility/logo-grandstream.webp"
                    alt="Logo Grandstream"
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">
                  Grandstream
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Passerelles VoIP robustes
                </p>
              </div>

              {/* Avaya */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/images/logos-sip-compatibility/avaya-logo.webp"
                    alt="Logo Avaya"
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">Avaya</h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Solutions entreprise</p>
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
        <section className="py-24 relative overflow-hidden bg-[#091421]">
          {/* Monolith Grid overlay */}
          <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Calculez vos <span className="text-red-primary">économies</span>{" "}
              maintenant
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Obtenez votre <strong>devis personnalisé en 2 minutes</strong> et
              découvrez combien vous pouvez économiser avec notre Trunk SIP au
              compteur.
            </p>

            {/* Avantages finaux */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 text-white/90">
              <div className="flex items-center justify-center gap-2">
                <i className="lni lni-checkmark-circle text-red-primary"></i>
                <span className="text-[10px] uppercase font-bold tracking-widest">Devis gratuit</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <i className="lni lni-timer text-red-primary"></i>
                <span className="text-[10px] uppercase font-bold tracking-widest">Réponse rapide</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <i className="lni lni-shield text-red-primary"></i>
                <span className="text-[10px] uppercase font-bold tracking-widest">Expert VoIP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/devis-en-ligne" className="monolith-btn bg-red-primary">
                <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                  <i className="lni lni-calculator" aria-hidden="true" />
                  Calculer mes économies
                </span>
              </Link>
              <a href="tel:+33189560500" className="monolith-btn bg-white">
                <span className="block text-[#091421] font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                  <i className="lni lni-phone" aria-hidden="true" />
                  01 89 56 05 00
                </span>
              </a>
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

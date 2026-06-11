import { Metadata } from "next";
import Link from "next/link";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { HubSpotForm } from "@/components/hubspot";
import { Chat, Phone, Infinity, CheckCircle, Globe, Users, MapTrifold, Shield, Info, Calculator, MapPin, TrendUp, Rocket, PlugCharging, PhoneCall, Headphones, WifiHigh, Envelope, Timer } from '@/lib/icons';

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
      appels: 4,
      ideal: "PME et entreprises actives",
      popular: true,
    },
    {
      appels: 8,
      ideal: "Grandes structures et centres d'appels",
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
                <Infinity size={20} className="text-white mr-2" aria-hidden="true" />
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
                <strong>2, 4 ou 8 appels simultanés</strong> • 
                Forfait tout inclus avec politique fair use
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Appels illimités France</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Appels illimités DOM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-white" aria-hidden="true" />
                  <span className="text-sm">2, 4 ou 8 lignes simultanées</span>
                </div>
              </div>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <CTAButton href="#contact-form" icon="Chat">
                  Demander un devis
                </CTAButton>
                <CTAButtonMarine href="tel:+33189560500" icon="Phone" external>
                  01 89 56 05 00
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Section explicative */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Infinity size={20} className="mr-2" aria-hidden="true" />
                  Solution forfaitaire
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
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
                    <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-red-primary" aria-hidden="true" />
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
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapTrifold size={24} className="text-blue-marine" aria-hidden="true" />
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
                      <Users size={24} className="text-red-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        3 paliers : 2, 4 ou 8 appels simultanés
                      </h3>
                      <p className="text-gray-600">
                        Choisissez le forfait adapté à votre volume d'appels.
                        <strong> Évolutif à tout moment</strong> pour
                        accompagner votre croissance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={24} className="text-blue-marine" aria-hidden="true" />
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
                        className={`bg-white p-4 rounded-xl shadow-sm ${
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
                      <Info size={20} className="text-blue-marine mt-0.5" aria-hidden="true" />
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
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Pourquoi choisir notre{" "}
                <span className="text-red-primary">Trunk SIP Illimité</span> ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une solution complète pour maîtriser vos coûts télécom
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Budget maîtrisé */}
              <div className="relative overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 group">
                {/* Gradient border top - Palette rouge & bleu marine */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-primary via-blue-marine to-blue-marine"></div>
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div className="absolute inset-0" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
                </div>
                
                <div className="relative p-8">
                  {/* Icon with enhanced styling - Couleurs de la charte */}
                  <div className="relative mb-6">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Calculator size={20} className="text-3xl text-gray-800" aria-hidden="true" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-primary transition-colors">
                    Budget maîtrisé
                  </h3>
                  <p className="text-gray-secondary leading-relaxed mb-4">
                    Un forfait mensuel fixe, pas de surprise. Idéal pour la gestion budgétaire de votre entreprise.
                  </p>
                  
                  {/* Bottom accent - Rouge principal E2I */}
                  <div className="flex items-center text-red-primary font-medium text-sm">
                    <CheckCircle size={20} className="mr-2" aria-hidden="true" />
                    <span>Économies garanties</span>
                  </div>
                </div>
              </div>

              {/* Couverture complète */}
              <div className="relative overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 group">
                {/* Gradient border top - Mélange bleu marine et rouge */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-marine via-red-primary to-blue-marine"></div>
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div className="absolute inset-0" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
                </div>
                
                <div className="relative p-8">
                  {/* Icon with enhanced styling - Couleurs de la charte */}
                  <div className="relative mb-6">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Globe size={20} className="text-3xl text-gray-secondary" aria-hidden="true" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-primary transition-colors">
                    Couverture France + DOM
                  </h3>
                  <p className="text-gray-secondary leading-relaxed mb-4">
                    Appelez sans limite vers la métropole et tous les départements d'outre-mer.
                  </p>
                  
                  {/* Bottom accent - Bleu marine */}
                  <div className="flex items-center text-gray-800 font-medium text-sm">
                    <MapPin size={20} className="mr-2" aria-hidden="true" />
                    <span>National & DOM-TOM</span>
                  </div>
                </div>
              </div>

              {/* Évolutif */}
              <div className="relative overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 group">
                {/* Gradient border top - Rouge principal & bleu marine */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-primary via-red-500 to-blue-marine"></div>
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div className="absolute inset-0" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
                </div>
                
                <div className="relative p-8">
                  {/* Icon with enhanced styling - Couleurs de la charte */}
                  <div className="relative mb-6">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-red-100 via-red-50 to-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <TrendUp size={20} className="text-3xl text-red-primary" aria-hidden="true" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-primary transition-colors">
                    Solution évolutive
                  </h3>
                  <p className="text-gray-secondary leading-relaxed mb-4">
                    Ajustez le nombre d'appels simultanés selon l'évolution de votre activité.
                  </p>
                  
                  {/* Bottom accent - Rouge principal */}
                  <div className="flex items-center text-red-primary font-medium text-sm">
                    <Rocket size={20} className="mr-2" aria-hidden="true" />
                    <span>Croissance flexible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Points clés supplémentaires */}
            <div className="mt-16 relative">
              <div className="relative bg-white rounded-xl p-10 shadow-xl border border-gray-200">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Tout est inclus dans votre forfait
                  </h3>
                  <p className="text-gray-secondary">
                    Une solution complète sans frais cachés
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      text: "Compatible avec tous les IPBX (3CX, Yeastar, Grandstream)",
                      Icon: PlugCharging,
                      color: "gray"
                    },
                    {
                      text: "Portabilité gratuite de vos numéros existants",
                      Icon: PhoneCall,
                      color: "red"
                    },
                    {
                      text: "Support technique local et réactif",
                      Icon: Headphones,
                      color: "gray-secondary"
                    },
                    {
                      text: "Qualité HD garantie sur tous les appels",
                      Icon: WifiHigh,
                      color: "red"
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                        ${item.color === 'gray' ? 'bg-gradient-to-br from-gray-100 to-gray-50' : ''}
                        ${item.color === 'red' ? 'bg-gradient-to-br from-red-100 to-red-50' : ''}
                        ${item.color === 'gray-secondary' ? 'bg-gradient-to-br from-gray-200 to-gray-100' : ''}
                        shadow-md group-hover:shadow-lg transition-shadow
                      `}>
                        <item.Icon size={24} className={
                          item.color === 'gray' ? 'text-gray-800' :
                          item.color === 'red' ? 'text-red-primary' :
                          'text-gray-secondary'
                        } aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium leading-relaxed block">
                          {item.text}
                        </span>
                        <span className={`
                          text-sm mt-1 inline-flex items-center
                          ${item.color === 'gray' ? 'text-gray-800' : ''}
                          ${item.color === 'red' ? 'text-red-primary' : ''}
                          ${item.color === 'gray-secondary' ? 'text-gray-secondary' : ''}
                        `}>
                          <CheckCircle size={20} className="mr-1" aria-hidden="true" />
                          Inclus
                        </span>
                      </div>
                    </div>
                  ))}
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
                <Envelope size={20} className="mr-2" aria-hidden="true" />
                Contact commercial
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Obtenez votre <span className="text-red-primary">devis personnalisé</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nos experts vous conseillent et établissent un devis adapté à vos besoins
              </p>
            </div>

            {/* Formulaire HubSpot */}
            <div id="hubspot-contact-form">
              <HubSpotForm />
            </div>

            {/* Alternative de contact */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Vous préférez nous appeler directement ?
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="tel:+33189560500"
                  suppressHydrationWarning
                  className="inline-flex items-center gap-2 text-red-primary hover:text-red-600 font-medium"
                >
                  <PhoneCall size={20} aria-hidden="true" />
                  <span>France : 01 89 56 05 00</span>
                </a>
                <a
                  href="tel:+594594963500"
                  suppressHydrationWarning
                  className="inline-flex items-center gap-2 text-red-primary hover:text-red-600 font-medium"
                >
                  <PhoneCall size={20} aria-hidden="true" />
                  <span>Guyane : 0594 96 35 00</span>
                </a>
                <a
                  href="tel:+590590173500"
                  suppressHydrationWarning
                  className="inline-flex items-center gap-2 text-red-primary hover:text-red-600 font-medium"
                >
                  <PhoneCall size={20} aria-hidden="true" />
                  <span>Guadeloupe : 0590 17 35 00</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-6">
              Passez à <span className="text-white">l'illimité</span> dès maintenant
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont choisi la simplicité et la
              tranquillité avec notre Trunk SIP Illimité
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8 text-white/90">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle size={20} className="text-white" aria-hidden="true" />
                <span className="text-sm">Activation rapide</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Timer size={20} className="text-white" aria-hidden="true" />
                <span className="text-sm">Sans engagement</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield size={20} className="text-white" aria-hidden="true" />
                <span className="text-sm">Garantie qualité</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="#contact-form" icon="Chat">
                Demander mon devis illimité
              </CTAButton>
              <CTAButtonMarine
                href="tel:+33189560500"
                icon="Phone"
                external
              >
                Appeler un conseiller
              </CTAButtonMarine>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { Chat, Phone, Infinity, CheckCircle, Globe, Users, MapTrifold, Shield, Info, Calculator, MapPin, TrendUp, Rocket, PhoneCall, Timer } from '@/lib/icons';

export const metadata: Metadata = pageMetadata({
  title: "Trunk SIP Illimité DOM - E2I VoIP | Appels Fixes Illimités France & DOM",
  description:
    "Trunk SIP illimité vers les fixes France métropolitaine et DOM. De 4 à 16 appels simultanés. Forfait avec fair use. Appels vers mobiles facturés au compteur. Idéal entreprises et centres d'appels.",
  keywords:
    "trunk SIP illimité, appels fixes illimités DOM, forfait téléphonie entreprise, 16 appels simultanés, VoIP illimité Guadeloupe Martinique Guyane Réunion, trunk SIP fair use",
  path: "/telephonie-entreprise/trunk-sip-illimite",
});

export default function TrunkSIPIllimite() {
  const forfaits = [
    {
      appels: 4,
      ideal: "TPE et petites structures",
      popular: false,
    },
    {
      appels: 8,
      ideal: "PME et entreprises actives",
      popular: true,
    },
    {
      appels: 16,
      ideal: "Grandes structures et centres d'appels",
      popular: false,
    },
  ];

  const tarifsMobiles = [
    { destination: "Mobile France métropolitaine", prix: "0,0700 €" },
    { destination: "Mobile Guadeloupe, Saint-Martin, Saint-Barthélemy", prix: "0,0600 €" },
    { destination: "Mobile Martinique", prix: "0,0180 €" },
    { destination: "Mobile Guyane", prix: "0,0600 €" },
    { destination: "Mobile La Réunion", prix: "0,0180 €" },
    { destination: "Mobile Mayotte", prix: "0,3600 €" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Professionnel utilisant la téléphonie IP E2I VoIP"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
            />
            {/* Gradient Overlay uniforme */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Infinity size={16} className="text-white mr-2" aria-hidden="true" />
                <span className="text-white/90 text-sm font-medium">
                  Forfait illimité
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP <span className="text-white">Illimité</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Appels illimités</strong> vers les fixes
                France métropolitaine & DOM
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                <strong>4, 8 ou 16 appels simultanés</strong> •
                Forfait avec politique fair use • Mobiles facturés au compteur
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Fixes illimités France</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Fixes illimités DOM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">4, 8 ou 16 lignes simultanées</span>
                </div>
              </div>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <CTAButton href="/devis-en-ligne" icon="Chat">
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
                  <Infinity size={16} className="mr-2" aria-hidden="true" />
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
                        Fixes illimités France métropolitaine
                      </h3>
                      <p className="text-gray-600">
                        <strong>Numéros fixes</strong> en illimité vers la France
                        métropolitaine. Appelez sans compter sur les fixes ; les
                        appels vers mobiles sont facturés au compteur.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapTrifold size={24} className="text-blue-marine" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Fixes illimités vers les DOM
                      </h3>
                      <p className="text-gray-600">
                        <strong>Guadeloupe, Martinique, Guyane, Réunion</strong> :
                        appelez les fixes des DOM en illimité.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-red-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        3 paliers : 4, 8 ou 16 appels simultanés
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
                        Usage professionnel normal, sans usage intensif d'appels
                        entrants et sortants (type centre d'appels).
                        <strong> Pas de frais cachés</strong>, pas de mauvaise
                        surprise.
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
                      <Info size={24} className="text-blue-marine mt-0.5" aria-hidden="true" />
                      <div className="text-sm text-blue-800">
                        <p>
                          <strong>Fixes illimités :</strong> France + DOM, numéros
                          géographiques, support technique réactif.
                        </p>
                        <p className="mt-1">
                          <strong>Mobiles au compteur :</strong> les appels vers
                          mobiles sont facturés à la minute (voir grille ci-dessous).
                        </p>
                        <p className="mt-1">
                          <strong>Fair Use :</strong> Usage professionnel normal,
                          sans usage intensif d'appels entrants et sortants
                          (type centre d'appels).
                        </p>
                        <p className="mt-1">
                          <strong>Bon à savoir :</strong> au-delà de
                          ~200 min/mois sur les fixes, l'illimité devient plus
                          avantageux que la facturation à la minute.
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
                      <Calculator size={24} className="text-3xl text-gray-800" aria-hidden="true" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-primary transition-colors">
                    Budget maîtrisé
                  </h3>
                  <p className="text-gray-secondary leading-relaxed mb-4">
                    Un forfait mensuel fixe, pas de surprise. Idéal pour la gestion budgétaire de votre entreprise.
                  </p>
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
                      <Globe size={24} className="text-3xl text-gray-secondary" aria-hidden="true" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-primary transition-colors">
                    Couverture France + DOM
                  </h3>
                  <p className="text-gray-secondary leading-relaxed mb-4">
                    Appelez les fixes sans limite vers la métropole et tous les départements d'outre-mer.
                  </p>
                  
                  {/* Bottom accent - Bleu marine */}
                  <div className="flex items-center text-gray-800 font-medium text-sm">
                    <MapPin size={16} className="mr-2" aria-hidden="true" />
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
                      <TrendUp size={24} className="text-3xl text-red-primary" aria-hidden="true" />
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
                    <Rocket size={16} className="mr-2" aria-hidden="true" />
                    <span>Croissance flexible</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section Contact commercial — numéros par région */}
        <section id="contact-form" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <PhoneCall size={16} className="mr-2" aria-hidden="true" />
                Contact commercial
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Parlons de votre <span className="text-red-primary">projet</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Contactez notre service commercial pour obtenir un devis et plus
                d'informations. Un numéro dédié selon votre région :
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="tel:+33189560500"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 text-red-primary hover:text-red-600 font-medium"
              >
                <PhoneCall size={24} aria-hidden="true" />
                <span>France : 01 89 56 05 00</span>
              </a>
              <a
                href="tel:+594594963500"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 text-red-primary hover:text-red-600 font-medium"
              >
                <PhoneCall size={24} aria-hidden="true" />
                <span>Guyane : 05 94 96 35 00</span>
              </a>
              <a
                href="tel:+590590173500"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 text-red-primary hover:text-red-600 font-medium"
              >
                <PhoneCall size={24} aria-hidden="true" />
                <span>Guadeloupe : 05 90 17 35 00</span>
              </a>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-blue-marine hover:text-blue-800 font-medium"
              >
                <MapPin size={20} aria-hidden="true" />
                <span>Toutes nos coordonnées (Martinique, Réunion…)</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section Tarifs mobiles */}
        <section className="py-16 bg-base-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Phone size={16} className="mr-2" aria-hidden="true" />
                Appels vers mobiles
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Tarifs des <span className="text-red-primary">appels vers mobiles</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Les fixes sont en illimité. Les appels vers les mobiles sont
                facturés au compteur, à la minute.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-dark">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-dark text-right">
                      Tarif HT / min
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tarifsMobiles.map((tarif) => (
                    <tr
                      key={tarif.destination}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-700">
                        {tarif.destination}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-red-primary">
                        {tarif.prix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4">
              Tarifs HT à la minute, hors taxes. Tarification en vigueur, susceptible d'évolution.
            </p>
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
                <CheckCircle size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Activation rapide</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Timer size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Engagement 36 mois</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Garantie qualité</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="Chat">
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

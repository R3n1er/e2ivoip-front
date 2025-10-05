import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Solutions PBX Yeastar - Cloud et On-Premise | E2I VoIP",
  description:
    "Solutions PBX Yeastar cloud et on-premise pour petites entreprises. Parfait pour cabinets médicaux et TPE avec fonctionnalités avancées.",
  keywords:
    "Yeastar, PBX Yeastar cloud, téléphonie on-premise, IPBX TPE, cabinets médicaux, VoIP petites entreprises, P-Series Yeastar",
  openGraph: {
    title: "Solutions PBX Yeastar - Cloud et On-Premise | E2I VoIP",
    description:
      "Déployez Yeastar dans le cloud ou on-premise. Solutions adaptées aux petites entreprises et cabinets médicaux.",
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
              alt="Solutions Yeastar E2I VoIP - Cloud et On-Premise"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* Logo Yeastar */}
              <div className="flex justify-center mb-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <Image
                    src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                    alt="Logo Yeastar"
                    width={200}
                    height={80}
                    className="h-16 w-auto"
                    priority
                  />
                </div>
              </div>
              
              {/* Badge avec certifications */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Image
                  src="/images/logo-partners/yeastar-certified-expert-ysce-icon.png"
                  alt="Yeastar Certified Expert"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <i className="lni lni-cloud text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">
                  Expert Certifié Yeastar - Solutions Cloud & On-Premise
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                PBX <span className="text-white">Yeastar</span>
              </h1>
              <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-4">
                <strong>Solutions cloud et on-premise</strong> pour petites entreprises et cabinets médicaux
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
                Fonctionnalités avancées de téléphonie adaptées aux faibles volumes d'appels simultanés
              </p>

              {/* CTA Hero - Unified homepage style */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <CTAButton href="/devis-en-ligne" icon="lni-calculator">
                  Devis personnalisé
                </CTAButton>
                <CTAButtonMarine href="tel:+33189560500" icon="lni-phone" external>
                  01 89 56 05 00
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Section principale - Cloud vs On-Premise */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Solutions <span className="text-red-primary">Yeastar</span> adaptées à votre activité
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
                E2I VoIP déploie les solutions Yeastar en mode <strong>cloud hébergé</strong> ou <strong>on-premise</strong>, 
                spécialement conçues pour les petites entreprises, cabinets médicaux et structures nécessitant 
                des fonctionnalités avancées avec un faible volume d'appels simultanés.
              </p>
            </div>

            {/* Cloud vs On-Premise */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Solution Cloud */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 h-full">
                <div className="card-body p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <i className="lni lni-cloud text-xl text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                    <div className="badge badge-primary badge-lg font-medium">
                      Cloud
                    </div>
                  </div>
                  
                  <h3 className="card-title text-xl mb-3 text-base-content">
                    Solution Cloud
                  </h3>
                  
                  <p className="text-base-content/70 leading-relaxed mb-6">
                    Hébergée par E2I VoIP, sans infrastructure à gérer. Idéale pour les petites entreprises et cabinets médicaux.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Aucune infrastructure à gérer</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Mises à jour automatiques</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Support E2I VoIP inclus</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Scalabilité instantanée</span>
                    </div>
                  </div>

                  <div className="divider my-4"></div>
                  
                  <div className="card-actions flex-col space-y-4">
                    <div className="w-full">
                      <div className="alert alert-info text-sm">
                        <i className="lni lni-heart-monitor"></i>
                        <span><strong>Idéal pour :</strong> Cabinets médicaux, petites entreprises souhaitant externaliser leur téléphonie</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution On-Premise */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 h-full">
                <div className="card-body p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                      <i className="lni lni-server text-xl text-red-primary group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                    <div className="badge badge-secondary badge-lg font-medium">
                      On-Premise
                    </div>
                  </div>
                  
                  <h3 className="card-title text-xl mb-3 text-base-content">
                    Solution On-Premise
                  </h3>
                  
                  <p className="text-base-content/70 leading-relaxed mb-6">
                    Sur votre infrastructure. Contrôle total et personnalisation avancée pour les entreprises avec besoins spécifiques.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Contrôle total des données</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Personnalisation avancée</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Intégration système existant</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">Investissement unique</span>
                    </div>
                  </div>

                  <div className="divider my-4"></div>
                  
                  <div className="card-actions flex-col space-y-4">
                    <div className="w-full">
                      <div className="alert alert-warning text-sm">
                        <i className="lni lni-cog"></i>
                        <span><strong>Idéal pour :</strong> Entreprises avec infrastructure IT dédiée, besoins de sécurité spécifiques</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pourquoi Yeastar pour les petites entreprises */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-dark mb-6">
                Pourquoi <span className="text-red-primary">Yeastar</span> pour les petites entreprises ?
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Yeastar se distingue par sa capacité à offrir des fonctionnalités professionnelles 
                avancées tout en restant parfaitement adapté aux structures avec un faible volume 
                d'appels simultanés, comme les cabinets médicaux ou les TPE spécialisées.
              </p>
            </div>

            {/* Avantages spécifiques aux petites entreprises */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="lni lni-users text-red-primary text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Adapté aux petites équipes</h3>
                  <p className="text-gray-600 text-sm">
                    De 5 à 50 utilisateurs avec gestion optimisée des appels simultanés
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="lni lni-heart-monitor text-blue-600 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Spécial cabinets médicaux</h3>
                  <p className="text-gray-600 text-sm">
                    Fonctionnalités dédiées : files d'attente, messagerie vocale médicale
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="lni lni-calculator text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">ROI immédiat</h3>
                  <p className="text-gray-600 text-sm">
                    Investissement maîtrisé avec fonctionnalités entreprise
                  </p>
                </div>
              </div>
            </div>

            {/* Gamme Yeastar détaillée */}
            <div className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-dark mb-4">
                  Gamme complète <span className="text-red-primary">Yeastar</span>
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Des solutions modulaires et évolutives, du matériel physique au cloud hébergé
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* P-Series Physical */}
                <div className="card bg-white shadow-lg border border-gray-100">
                  <div className="card-body">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center">
                        <i className="lni lni-server text-red-primary text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-bold text-gray-dark">Série P (Physique)</h4>
                        <p className="text-gray-500 text-sm">P520, P550, P560, P570</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700"><strong>Capacité :</strong> 20 à 500 utilisateurs</p>
                      <p className="text-gray-700"><strong>Interfaces :</strong> Modulaires (FXS, FXO, BRI, 4G)</p>
                      <p className="text-gray-700"><strong>Déploiement :</strong> On-premise</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        <i className="lni lni-heart mr-2"></i>
                        <strong>Recommandé pour :</strong> Cabinets médicaux, PME industrielles
                      </p>
                    </div>
                  </div>
                </div>

                {/* P-Series Software */}
                <div className="card bg-white shadow-lg border border-gray-100">
                  <div className="card-body">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center">
                        <i className="lni lni-cloud text-blue-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-bold text-gray-dark">Série P (Logiciel)</h4>
                        <p className="text-gray-500 text-sm">Cloud ou serveur dédié</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700"><strong>Capacité :</strong> 10 à 10 000 utilisateurs</p>
                      <p className="text-gray-700"><strong>Déploiement :</strong> Cloud AWS, Azure, ou serveur</p>
                      <p className="text-gray-700"><strong>Appels simultanés :</strong> Jusqu'à 1 000</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        <i className="lni lni-users mr-2"></i>
                        <strong>Recommandé pour :</strong> TPE évolutives, télétravail
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tableau comparatif */}
              <div className="mt-8 overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Critère</th>
                      <th className="text-center">P-Series Physique</th>
                      <th className="text-center">P-Series Software</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-medium">Installation</td>
                      <td className="text-center">Plug & Play</td>
                      <td className="text-center">Configuration serveur</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Maintenance</td>
                      <td className="text-center">E2I VoIP</td>
                      <td className="text-center">E2I VoIP (cloud)</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Évolutivité</td>
                      <td className="text-center">Modules additionnels</td>
                      <td className="text-center">Licence logicielle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fonctionnalités avancées */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4">
                  Fonctionnalités <span className="text-red-primary">professionnelles</span>
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Toutes les fonctionnalités essentielles pour optimiser votre communication d'entreprise
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <i className="lni lni-microphone text-red-primary text-xl"></i>
                    </div>
                    <h4 className="font-bold text-gray-800">Standard automatique (IVR)</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Accueil professionnel avec menu vocal personnalisé</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <i className="lni lni-timer text-blue-600 text-xl"></i>
                    </div>
                    <h4 className="font-bold text-gray-800">Files d'attente</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Gestion intelligente des appels entrants</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <i className="lni lni-users text-green-600 text-xl"></i>
                    </div>
                    <h4 className="font-bold text-gray-800">Conférences</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Audioconférence et visioconférence intégrées</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <i className="lni lni-music text-orange-600 text-xl"></i>
                    </div>
                    <h4 className="font-bold text-gray-800">Enregistrement</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Enregistrement automatique des appels (légal)</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <i className="lni lni-envelope text-purple-600 text-xl"></i>
                    </div>
                    <h4 className="font-bold text-gray-800">Messagerie vocale</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Messages vocaux par email avec transcription</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
                      <i className="lni lni-mobile text-cyan-600 text-xl"></i>
                    </div>
                    <h4 className="font-bold text-gray-800">Applications Linkus</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Apps mobiles et desktop pour le télétravail</p>
                </div>
              </div>
              
              {/* Spécial cabinets médicaux */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center bg-white/70 rounded-full px-4 py-2 mb-4">
                    <i className="lni lni-heart-monitor text-blue-600 mr-2"></i>
                    <span className="text-sm font-medium text-blue-800">Spécial santé</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-dark mb-3">
                    Fonctionnalités dédiées aux <span className="text-blue-600">cabinets médicaux</span>
                  </h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="lni lni-calendar text-blue-600 text-lg mr-3"></i>
                      <h5 className="font-semibold text-gray-dark">Gestion des rendez-vous</h5>
                    </div>
                    <p className="text-gray-600 text-sm">Intégration avec les logiciels médicaux pour la prise de rendez-vous automatisée</p>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="lni lni-shield text-green-600 text-lg mr-3"></i>
                      <h5 className="font-semibold text-gray-dark">Confidentialité renforcée</h5>
                    </div>
                    <p className="text-gray-600 text-sm">Conformité RGPD et secret médical avec chiffrement des communications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section cas d'usage */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Cas d'usage <span className="text-red-primary">typiques</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez comment Yeastar s'adapte parfaitement aux besoins spécifiques de votre secteur
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cabinet médical */}
              <div className="relative rounded-xl p-6 border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-white hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="lni lni-heart-monitor text-blue-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Cabinet médical (5-15 praticiens)
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">2-3 appels simultanés max</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Standard automatique médical</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Messagerie vocale sécurisée</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Application mobile pour garde</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <span className="text-xs font-bold text-blue-700">
                    Solution recommandée : P-Series Cloud (10 extensions)
                  </span>
                </div>
              </div>
              
              {/* PME de services */}
              <div className="relative rounded-xl p-6 border-2 border-red-200 bg-gradient-to-b from-red-50 to-white shadow-lg transform scale-105 hover:shadow-xl transition-all duration-300">
                {/* Badge Populaire */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    POPULAIRE
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="lni lni-briefcase text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    PME de services (10-30 collaborateurs)
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">5-8 appels simultanés</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">File d'attente commerciale</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Conférences clients</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Télétravail sécurisé</span>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <span className="text-xs font-bold text-red-700">
                    Solution recommandée : P520 On-premise ou P-Series Cloud
                  </span>
                </div>
              </div>
              
              {/* Entreprise multi-sites */}
              <div className="relative rounded-xl p-6 border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="lni lni-apartment text-gray-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Multi-sites (50+ collaborateurs)
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">10-20 appels simultanés</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Liaison inter-sites gratuite</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Administration centralisée</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="lni lni-checkmark text-green-600 text-xs"></i>
                    </div>
                    <span className="text-gray-700">Reporting avancé</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                  <span className="text-xs font-bold text-gray-700">
                    Solution recommandée : P-Series Software Multi-tenant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section formulaire de contact HubSpot */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="lni lni-calculator mr-2"></i>
                Contact expert Yeastar
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Parlons de votre <span className="text-red-primary">projet Yeastar</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Nos experts certifiés Yeastar analysent vos besoins et vous conseillent sur la meilleure solution 
                <strong> cloud ou on-premise</strong> pour votre entreprise.
              </p>

              {/* Avantages du contact */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="lni lni-checkmark-circle text-green-600 text-xl"></i>
                  <span>Conseil personnalisé</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="lni lni-shield text-blue-600 text-xl"></i>
                  <span>Expert certifié YSCE</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="lni lni-timer text-orange-500 text-xl"></i>
                  <span>Réponse sous 24h</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="lni lni-users text-red-primary text-xl"></i>
                  <span>Accompagnement complet</span>
                </div>
              </div>
            </div>

            {/* Container du formulaire de contact */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-dark mb-4">
                        Contactez nos experts Yeastar
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Remplissez le formulaire ci-dessous ou appelez-nous directement
                      </p>
                    </div>
                    
                    {/* Boutons de contact direct */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                      <CTAButton href="tel:+33189560500" icon="lni-phone" external>
                        01 89 56 05 00
                      </CTAButton>
                      <CTAButtonMarine href="mailto:contact@e2ivoip.com" icon="lni-envelope" external>
                        contact@e2ivoip.com
                      </CTAButtonMarine>
                    </div>
                    
                    {/* Informations de contact */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-dark mb-3">
                        Vous préférez nous contacter directement ?
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <i className="lni lni-phone text-red-primary mr-2"></i>
                          <span>01 89 56 05 00</span>
                        </div>
                        <div className="flex items-center">
                          <i className="lni lni-envelope text-red-primary mr-2"></i>
                          <span>contact@e2ivoip.com</span>
                        </div>
                        <div className="flex items-center">
                          <i className="lni lni-timer text-red-primary mr-2"></i>
                          <span>Lun-Ven 9h-18h</span>
                        </div>
                        <div className="flex items-center">
                          <i className="lni lni-map-marker text-red-primary mr-2"></i>
                          <span>Support France</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Déployez <span className="text-white">Yeastar</span> avec E2I VoIP
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Nos experts analysent vos besoins et déploient la solution Yeastar parfaitement adaptée à votre activité, 
              en cloud hébergé ou on-premise selon vos contraintes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="lni-bubble">
                Analyse personnalisée gratuite
              </CTAButton>
              <CTAButtonMarine href="tel:+33189560500" icon="lni-phone" external>
                Expert Yeastar : 01 89 56 05 00
              </CTAButtonMarine>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Solutions 3CX - E2I VoIP | Téléphonie 3CX Professionnelle",
  description:
    "Découvrez nos solutions de téléphonie 3CX : instance dédiée PRO ou hébergement mutualisé SMB. Solution complète de communications unifiées pour entreprises.",
  keywords:
    "3CX, téléphonie 3CX, IPBX 3CX, 3CX PRO, 3CX SMB, communications unifiées, VoIP entreprise",
  openGraph: {
    title: "Solutions 3CX - Téléphonie Professionnelle",
    description:
      "Solutions 3CX adaptées à votre entreprise : instance dédiée ou mutualisée. Communications unifiées complètes.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-3cx",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions 3CX - E2I VoIP",
    description:
      "Choisissez votre solution 3CX : dédiée PRO ou mutualisée SMB.",
  },
};

export default function Telephonie3CX() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Solutions 3CX E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay uniforme */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <i className="lni lni-phone-set text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">
                  Solutions 3CX
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Téléphonie <span className="text-white">3CX</span> Professionnelle
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Communications unifiées complètes</strong> pour votre entreprise
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Choisissez la solution 3CX adaptée à vos besoins : 
                <strong> instance dédiée</strong> ou <strong>hébergement mutualisé</strong>
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <i className="lni lni-checkmark-circle text-white"></i>
                  <span className="text-sm">Certifié 3CX Silver Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-shield text-white"></i>
                  <span className="text-sm">Support expert local</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-users text-white"></i>
                  <span className="text-sm">+100 entreprises équipées</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Pourquoi choisir <span className="text-red-primary">3CX</span> avec E2I VoIP ?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                <strong>3CX</strong> est le système de communications unifiées leader mondial,
                offrant téléphonie VoIP, visioconférence, chat en équipe et centre de contact
                dans une solution unique. En tant que <strong>partenaire certifié 3CX Silver</strong>,
                E2I VoIP vous garantit une expertise locale et un accompagnement personnalisé
                pour vos projets de téléphonie d'entreprise.
              </p>
            </div>
          </div>
        </section>

        {/* Section Choix des Solutions */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="lni lni-direction-alt mr-2"></i>
                Choisissez votre solution
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Deux options adaptées à <span className="text-red-primary">vos besoins</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sélectionnez la solution 3CX qui correspond le mieux à votre entreprise
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* 3CX PRO - Instance Dédiée */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">3CX PRO</h3>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">Instance Dédiée</span>
                    </div>
                  </div>
                  <p className="text-white/90">
                    Solution premium avec serveur dédié
                  </p>
                </div>
                
                <div className="card-body p-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">Serveur dédié AWS</p>
                        <p className="text-sm text-gray-600">Instance cloud dédiée à votre entreprise</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">De 8 à 1024 utilisateurs</p>
                        <p className="text-sm text-gray-600">Évolutif selon vos besoins</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">Personnalisation complète</p>
                        <p className="text-sm text-gray-600">Configuration sur-mesure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">Support prioritaire</p>
                        <p className="text-sm text-gray-600">Assistance dédiée 24/7</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-center text-gray-600 mb-2">Idéal pour</p>
                    <p className="text-center font-semibold text-gray-dark mb-6">
                      PME et grandes entreprises exigeantes
                    </p>
                    
                    <CTAButtonMarine href="/3cx-cloud" fullWidth>
                      Découvrir 3CX PRO
                    </CTAButtonMarine>
                  </div>
                </div>
              </div>

              {/* 3CX SMB - Mutualisée */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="bg-gradient-to-r from-red-primary to-red-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">3CX SMB</h3>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">Mutualisée</span>
                    </div>
                  </div>
                  <p className="text-white/90">
                    Solution économique multi-tenant
                  </p>
                </div>
                
                <div className="card-body p-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">Hébergement mutualisé</p>
                        <p className="text-sm text-gray-600">Infrastructure partagée sécurisée</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">De 3 à 50 utilisateurs</p>
                        <p className="text-sm text-gray-600">Parfait pour les TPE/PME</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">Mise en service rapide</p>
                        <p className="text-sm text-gray-600">Activation en 24h</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5"></i>
                      <div>
                        <p className="font-semibold text-gray-dark">Coûts optimisés</p>
                        <p className="text-sm text-gray-600">Solution économique tout inclus</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-center text-gray-600 mb-2">Idéal pour</p>
                    <p className="text-center font-semibold text-gray-dark mb-6">
                      TPE et petites PME recherchant l'efficacité
                    </p>
                    
                    <CTAButton href="/telephonie-entreprise/3cx-smb-mutualisee" fullWidth>
                      Découvrir 3CX SMB
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Comparatif */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Tableau <span className="text-red-primary">comparatif</span>
              </h2>
              <p className="text-xl text-gray-600">
                Trouvez la solution 3CX qui correspond à vos besoins
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full bg-base-100 rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-gray-800 to-red-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Caractéristiques</th>
                    <th className="px-6 py-4 text-center">3CX PRO</th>
                    <th className="px-6 py-4 text-center">3CX SMB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Type d'hébergement</td>
                    <td className="px-6 py-4 text-center">Instance dédiée AWS</td>
                    <td className="px-6 py-4 text-center">Mutualisé multi-tenant</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Nombre d'utilisateurs</td>
                    <td className="px-6 py-4 text-center">8 à 1024</td>
                    <td className="px-6 py-4 text-center">3 à 50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Appels simultanés</td>
                    <td className="px-6 py-4 text-center">Illimités</td>
                    <td className="px-6 py-4 text-center">Selon forfait</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Personnalisation</td>
                    <td className="px-6 py-4 text-center">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="lni lni-close text-gray-400 text-xl"></i>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Support prioritaire</td>
                    <td className="px-6 py-4 text-center">
                      <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="lni lni-close text-gray-400 text-xl"></i>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Délai activation</td>
                    <td className="px-6 py-4 text-center">48-72h</td>
                    <td className="px-6 py-4 text-center">24h</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-6 py-4 font-medium">Tarification</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">Sur devis</td>
                    <td className="px-6 py-4 text-center font-bold text-red-primary">À partir de 15€/utilisateur</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Fonctionnalités 3CX */}
        <section className="py-16 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Fonctionnalités <span className="text-red-primary">3CX</span> incluses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Toutes nos solutions incluent l'ensemble des fonctionnalités 3CX
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="lni lni-phone text-gray-800 text-xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark">Téléphonie VoIP</h3>
                  <p className="text-gray-600">
                    Appels HD, transferts, conférences, files d'attente, SVI intelligent
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i className="lni lni-video text-red-primary text-xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark">Visioconférence</h3>
                  <p className="text-gray-600">
                    Réunions vidéo HD, partage d'écran, enregistrement, jusqu'à 250 participants
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="lni lni-comments text-gray-800 text-xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark">Chat & Collaboration</h3>
                  <p className="text-gray-600">
                    Messagerie instantanée, partage de fichiers, statuts de présence
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i className="lni lni-mobile text-red-primary text-xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark">Applications mobiles</h3>
                  <p className="text-gray-600">
                    Apps iOS/Android complètes, softphone intégré, push notifications
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i className="lni lni-link text-red-primary text-xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark">Intégrations CRM</h3>
                  <p className="text-gray-600">
                    Microsoft 365, Google Workspace, Salesforce, HubSpot, et plus
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="lni lni-headphone-alt text-gray-800 text-xl"></i>
                  </div>
                  <h3 className="card-title text-gray-dark">Centre de contact</h3>
                  <p className="text-gray-600">
                    Files d'attente avancées, rapports temps réel, enregistrements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre <span className="text-white">téléphonie d'entreprise</span> ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nos experts 3CX vous accompagnent dans le choix et la mise en œuvre
              de votre solution de communications unifiées
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8 text-white/90">
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-certificate text-white"></i>
                <span className="text-sm">Certifié 3CX Silver</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-users text-white"></i>
                <span className="text-sm">Support expert local</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-shield text-white"></i>
                <span className="text-sm">15 ans d'expertise</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="lni-calculator">
                Demander un devis
              </CTAButton>
              <CTAButtonMarine href="tel:+33189560500" icon="lni-phone" external>
                01 89 56 05 00
              </CTAButtonMarine>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

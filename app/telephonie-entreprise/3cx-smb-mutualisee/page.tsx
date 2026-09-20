import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { FaqSection } from "@/components/faq-section";
import { FAQ_SMB_MUTUALISEE } from "@/lib/faq-data";
import { Calculator, Phone, Rocket, Users, Timer, TrendUp, CheckCircle, DeviceMobile, Desktop, Globe, Info } from '@/lib/icons';
import { TALLY_FORMS } from "@/lib/constants/tally";

// Formulaire Tally dédié à l'offre 3CX SMB PRO Mutualisé (tunnel devis).
const TALLY_3CX_SMB_URL = TALLY_FORMS.VOIP_3CX_SMB;

export const metadata: Metadata = pageMetadata({
  title: "3CX SMB PRO Mutualisé - Solution économique TPE/PME",
  description:
    "Solution 3CX hébergée mutualisée pour TPE et PME. De 3 à 10 utilisateurs : 15 € HT/utilisateur/mois au compteur (Trunk SIP en sus) ou 29 € HT/utilisateur/mois avec les fixes France et DOM illimités, mobiles au compteur.",
  keywords:
    "3CX SMB PRO, 3CX mutualisé, téléphonie TPE, téléphonie PME, VoIP économique, 3CX multi-tenant",
  path: "/telephonie-entreprise/3cx-smb-mutualisee",
});

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
                à partir de <strong>15 € HT/utilisateur/mois</strong>
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
              <p className="text-xl text-ui-muted leading-relaxed max-w-4xl mx-auto">
                Notre offre <strong>3CX SMB mutualisée</strong> vous permet de bénéficier de toutes les 
                fonctionnalités 3CX sans les coûts d'une infrastructure dédiée. Parfait pour les TPE 
                et PME de 3 à 10 utilisateurs recherchant une solution professionnelle et économique.
              </p>
            </div>

            {/* Avantages clés avec DaisyUI */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-ui-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Calculator size={32} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Économique</h3>
                  <p className="text-ui-muted text-center">
                    À partir de 15 € HT/utilisateur/mois au compteur (Trunk SIP en sus), ou 29 € HT/utilisateur/mois avec les fixes France et DOM illimités — mobiles au compteur — sans frais d&apos;infrastructure
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-ui-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Timer size={32} className="text-gray-dark" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Activation rapide</h3>
                  <p className="text-ui-muted text-center">
                    Mise en service rapide, configuration pré-établie
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-ui-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <TrendUp size={32} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Évolutif</h3>
                  <p className="text-ui-muted text-center">
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
                  <span className="text-gray-dark">Appels VoIP illimités entre utilisateurs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-dark">Visioconférence intégrée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-dark">Applications mobiles iOS/Android</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-dark">Chat d'équipe et collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-dark">Standard automatique (SVI)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-dark">Support par mail et téléphone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tarification 3CX par utilisateur — deux formules */}
        <section className="py-16 bg-base-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Une tarification <span className="text-red-primary">simple par utilisateur</span>
              </h2>
              <p className="text-xl text-ui-muted max-w-3xl mx-auto">
                Deux formules selon la façon dont vous consommez vos appels. Dans les deux cas, le tarif est par utilisateur et par mois.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Formule au compteur */}
              <div className="bg-white rounded-2xl shadow-sm border border-ui-border overflow-hidden flex flex-col">
                <div className="bg-gradient-to-r from-blue-900/95 to-blue-800/90 px-8 py-8 text-center text-white">
                  <div className="font-mono tabular-nums text-5xl font-black">
                    15 €
                    <span className="font-sans text-xl font-medium text-white"> HT / utilisateur / mois</span>
                  </div>
                  <p className="mt-2 text-white font-semibold">Formule au compteur</p>
                  <p className="mt-1 text-sm text-white/90">
                    Licence seule — Trunk SIP et appels en sus
                  </p>
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-3 text-ui-muted">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Licence 3CX Pro mutualisée, par utilisateur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Appels facturés au compteur, à la seconde</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info size={20} className="text-blue-marine mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>
                        Un Trunk SIP au compteur est à ajouter : c&apos;est la ligne qui
                        raccorde votre standard au réseau téléphonique. Il se dimensionne
                        au niveau de l&apos;instance, à partir de 2 canaux voix — jamais
                        par utilisateur.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Formule illimitée */}
              <div className="bg-white rounded-2xl shadow-md border-2 border-red-primary overflow-hidden flex flex-col relative">
                <span className="absolute top-4 right-4 bg-blue-marine text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Recommandée
                </span>
                <div className="bg-gradient-to-r from-blue-900/95 to-red-600/90 px-8 py-8 text-center text-white">
                  <div className="font-mono tabular-nums text-5xl font-black">
                    29 €
                    <span className="font-sans text-xl font-medium text-white"> HT / utilisateur / mois</span>
                  </div>
                  <p className="mt-2 text-white font-semibold">Fixes illimités</p>
                  <p className="mt-1 text-sm text-white/90">
                    France métropolitaine et DOM — mobiles au compteur
                  </p>
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-3 text-ui-muted">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Licence 3CX Pro mutualisée, par utilisateur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="text-gray-dark">Appels fixes France métropolitaine et DOM inclus</strong>,
                        sans Trunk SIP à ajouter
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info size={20} className="text-blue-marine mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Les appels vers les mobiles restent facturés au compteur</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-ui-muted">
              Le Trunk SIP se dimensionne <strong>au niveau de l&apos;instance</strong>, jamais par
              utilisateur : c&apos;est le nombre d&apos;appels simultanés qui compte, pas le nombre de postes.
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-ui-border overflow-hidden mt-10">
              <div className="px-8 pt-8 pb-0">
                <h3 className="text-xl font-bold text-gray-dark mb-1">Inclus dans les deux formules</h3>
                <p className="text-sm text-ui-muted">
                  Ce qui ne dépend pas de votre choix entre au compteur et illimité.
                </p>
              </div>
              {/* Détail inclus — commun aux deux formules */}
              <div className="p-8 grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Appels vers les fixes France et DOM</h3>
                    <p className="text-ui-muted text-sm">
                      Inclus dans la formule illimitée ; facturés au compteur dans la formule au compteur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DeviceMobile size={24} className="text-blue-marine" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Application mobile 3CX incluse</h3>
                    <p className="text-ui-muted text-sm">
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
                    <p className="text-ui-muted text-sm">
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
                    <p className="text-ui-muted text-sm">
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

        {/* FAQ */}
        <FaqSection items={FAQ_SMB_MUTUALISEE} title="Questions fréquentes sur 3CX SMB Mutualisée" />
      </main>
    </div>
  );
}

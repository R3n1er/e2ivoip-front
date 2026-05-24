import Link from "next/link";
import { CTAButton, CTAButtonSecondary } from "@/components/ui/cta-button";
import { ContactFormTrunkSipIA } from "@/components/contact-form-trunk-sip-ia";
import { Chat, Phone, Heart, Car, TreeStructure, CheckCircle, ArrowRight } from '@/lib/icons';

export const dynamic = "force-dynamic";

const platforms = [
  {
    name: "VAPI",
    description:
      "BYO SIP Trunk et numéro BYO. Credential byo-sip-trunk, routage entrant vers sip.vapi.ai.",
    docUrl: "https://docs.vapi.ai/advanced/sip/sip-trunk",
  },
  {
    name: "Rounded",
    description:
      "Trunk SIP custom. Origination sip:sip.callrounded.com — numéro E.164 + URI de termination.",
    docUrl: "https://docs.callrounded.com/documentation/telephony/sip-trunk",
  },
  {
    name: "ElevenLabs Agents",
    description:
      "SIP Trunking BYOC. Auth digest ou ACL IP, TLS/SRTP pour agents conversationnels.",
    docUrl:
      "https://elevenlabs.io/docs/eleven-agents/phone-numbers/sip-trunking",
  },
  {
    name: "Jambonz",
    description:
      "CPaaS open-source. Trunks IP, auth ou registration — idéal pour intégrateurs self-hosted.",
    docUrl:
      "https://docs.jambonz.org/guides/using-the-jambonz-portal/basic-concepts/creating-carriers",
  },
];

const useCases = [
  {
    Icon: Heart,
    title: "Cabinets kinésithérapeutes",
    description:
      "Interconnexion d'agents IA pour la prise de rendez-vous automatique avec synchronisation agenda.",
    example:
      "L'appelant compose un numéro local +596 ; l'agent IA qualifie la demande et crée le créneau.",
  },
  {
    Icon: Car,
    title: "Dépannage automobile",
    description:
      "Qualification de l'appel (localisation, panne, urgence) avant transfert vers le chauffeur disponible.",
    example:
      "Filtrage intelligent 24/7 : l'IA collecte les infos critiques puis route vers l'humain.",
  },
  {
    Icon: Phone,
    title: "Accueil PME 24/7",
    description:
      "Orientation des appelants, FAQ métier et transfert contextuel vers les bonnes équipes.",
    example:
      "Numéro local DOM rassurant pour vos clients — stack IA cloud de votre choix.",
  },
];

const integrationSteps = [
  {
    step: "1",
    title: "Cadrage",
    description:
      "Plateforme IA, volumes, territoires DOM, mode trunk ou redirection.",
  },
  {
    step: "2",
    title: "Numéros",
    description:
      "Attribution ou portabilité de numéros locaux +596, +590, +594, +262.",
  },
  {
    step: "3",
    title: "Config SIP",
    description:
      "Credentials, whitelist IPs plateforme, codecs et routage entrant/sortant.",
  },
  {
    step: "4",
    title: "Tests",
    description:
      "Appels entrant/sortant, transferts SIP REFER, charge simultanée.",
  },
  {
    step: "5",
    title: "Production",
    description: "Mise en service accompagnée et support technique local.",
  },
];

export default function TrunkSipAgentsIA() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Trunk SIP pour agents vocaux IA E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <TreeStructure size={20} className="text-white mr-2" aria-hidden="true" />
                <span className="text-white/90 text-sm font-medium">
                  Carrier SIP DOM
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP{" "}
                <span className="text-white">agents vocaux IA</span>{" "}
                DOM
              </h1>
              <p className="text-xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed">
                Numéros locaux +596, +590, +594, +262 et trunk SIP BYOC
                pour VAPI, Rounded, ElevenLabs, Jambonz
              </p>
              <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto">
                E2I VoIP fournit la couche télécom DOM. Vous gardez votre stack
                IA — nous connectons vos agents aux appels locaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton href="#contact" icon="Chat">
                  Parler à un commercial
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                  Le blocage des plateformes IA en{" "}
                  <span className="text-red-primary">zone DOM</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  VAPI, Rounded, ElevenLabs et Jambonz s&apos;appuient sur le
                  modèle BYOC (Bring Your Own Carrier). En pratique, Twilio,
                  Telnyx ou Plivo ne proposent pas de numéros géographiques
                  locaux en Martinique, Guadeloupe, Guyane ou Réunion.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Résultat : vos clients DOM ne peuvent pas déployer d&apos;agents
                  vocaux IA avec un numéro local rassurant — sauf si vous
                  connectez un carrier régional comme E2I VoIP.
                </p>
              </div>
              <div className="bg-blue-marine/5 rounded-2xl p-8 border border-blue-marine/20">
                <h3 className="text-xl font-bold text-gray-dark mb-4">
                  Ce que nous apportons
                </h3>
                <ul className="space-y-4">
                  {[
                    "Numéros locaux +596, +590, +594, +262",
                    "Trunk SIP bidirectionnel ou redirection d'appels",
                    "Accompagnement technique intégrateurs",
                    "Support local Antilles-Guyane-Réunion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Notre rôle : la{" "}
                <span className="text-red-primary">couche télécom</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                E2I VoIP ne développe pas d&apos;agents IA. Nous interconnectons
                votre plateforme (workflows, STT, LLM, TTS) au réseau téléphonique
                local DOM.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-primary/30">
                <div className="inline-flex items-center bg-red-primary/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-red-primary text-sm font-semibold">
                    Recommandé
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-dark mb-4">
                  Trunk SIP bidirectionnel
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Infrastructure SBC dédiée aux agents vocaux IA. Credentials SIP,
                  routage entrant et sortant, contrôle des volumes et des
                  transferts (SIP REFER).
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Offre spéciale revendeurs</strong> pour intégrateurs et
                  agences qui déploient plusieurs clients DOM.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-dark mb-4">
                  Redirection d&apos;appels
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Votre numéro local E2I redirige vers l&apos;URI SIP de la
                  plateforme (ex.{" "}
                  <code className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                    sip:sip.callrounded.com
                  </code>
                  ). Idéal pour POC rapides ou flux entrant uniquement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Plateformes{" "}
                <span className="text-red-primary">compatibles</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Interconnexion testée avec les principales plateformes d&apos;agents
                vocaux IA. Retell AI et Bland AI : même pattern BYOC SIP.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-dark mb-3">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {platform.description}
                  </p>
                  <a
                    href={platform.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Documentation
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Cas d&apos;usage{" "}
                <span className="text-red-primary">déjà déployés</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Retours d&apos;expérience terrain avec des intégrateurs et leurs
                clients en zone DOM.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                >
                  <div className="bg-red-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <useCase.Icon size={24} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-dark mb-4">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{useCase.description}</p>
                  <div className="bg-blue-marine/5 p-4 rounded-lg border-l-4 border-blue-marine">
                    <p className="text-sm text-gray-700 italic">
                      {useCase.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Processus d&apos;
                <span className="text-red-primary">intégration</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {integrationSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-red-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-8 text-center">
              Prérequis techniques
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Codec G.711 (PCMU/PCMA)",
                "Numéros au format E.164",
                "Whitelist IPs de la plateforme IA",
                "SIP REFER pour transferts d'appels",
              ].map((req) => (
                <div
                  key={req}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200"
                >
                  <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-dark mb-8">
              Offres trunk SIP associées
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/telephonie-entreprise/trunk-sip-compteur"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-primary text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Trunk SIP au compteur
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href="/telephonie-entreprise/trunk-sip-illimite"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-marine text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Trunk SIP illimité
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <ContactFormTrunkSipIA />

        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Déployez vos agents IA avec des numéros locaux DOM
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Intégrateurs : connectez VAPI, Rounded, ElevenLabs ou Jambonz au
              réseau téléphonique Antilles-Guyane-Réunion avec E2I VoIP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton href="#contact" icon="Chat">
                Parler à un commercial
              </CTAButton>
              <CTAButtonSecondary
                href="tel:+33189560500"
                external
                icon="Phone"
              >
                01 89 56 05 00
              </CTAButtonSecondary>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

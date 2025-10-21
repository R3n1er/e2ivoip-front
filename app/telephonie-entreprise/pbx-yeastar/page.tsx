import { Metadata } from "next";
import Image from "next/image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Yeastar P-Series | PBX cloud et on-premise | E2I VoIP",
  description:
    "Déployez Yeastar P-Series avec E2I VoIP : PBX cloud ou on-premise, communications unifiées, call center et automatisations pour entreprises DOM et métropole.",
  keywords:
    "Yeastar, Yeastar P-Series, téléphonie Yeastar DOM, PBX software, IPBX cloud, call center Yeastar, VoIP Antilles",
  openGraph: {
    title: "Yeastar P-Series | PBX cloud et on-premise | E2I VoIP",
    description:
      "Modernisez votre standard téléphonique avec Yeastar P-Series : cloud, on-premise, omnicanal et support local DOM.",
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
              alt="Solutions Yeastar E2I VoIP"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 shadow-lg">
                <Image
                  src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                  alt="Logo Yeastar"
                  width={140}
                  height={60}
                  priority
                  className="h-10 w-auto"
                />
              </div>

              <h1 className="mt-6 text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
                Yeastar <span className="text-white">P-Series</span>
              </h1>
              <p className="mt-4 text-xl leading-relaxed text-white/90 md:text-2xl">
                <strong>Standard téléphonique nouvelle génération</strong> : PBX software, cloud ou on-premise
              </p>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
                Communications unifiées, call center et automatisations pour vos équipes en DOM et en métropole.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/85">
                <div className="flex items-center gap-2">
                  <i className="lni lni-checkmark-circle text-white"></i>
                  <span className="text-sm">Expert certifié Yeastar (YSCE)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-shield text-white"></i>
                  <span className="text-sm">Support local Antilles-Guyane & Réunion</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-stats-up text-white"></i>
                  <span className="text-sm">30% d'économies sur vos coûts télécom</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <CTAButton href="/devis-en-ligne" icon="lni-calculator">
                  Calculez vos économies
                </CTAButton>
                <CTAButtonMarine href="tel:+33189560500" icon="lni-phone" external>
                  Expert Yeastar : 01 89 56 05 00
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-dark md:text-4xl">
                  Deux offres <span className="text-red-primary">Yeastar</span> pilotées par E2I VoIP
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  Confiez-nous l&rsquo;exploitation de votre téléphonie Yeastar : <strong>P-Series Cloud Edition</strong> hébergée et sécurisée par E2I VoIP ou <strong>PBX déployés sur site</strong> (P-Series Appliance, S-Series). Nous orchestrons la migration depuis vos anciens PABX, la portabilité de vos numéros DOM et la supervision quotidienne.
                </p>
                <div className="mt-8 space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                    <span>Infrastructure souveraine France/UE, sauvegardes chiffrées et supervision 24/7.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                    <span>Expérience omnicanale Yeastar : voix, vidéo, chat, WhatsApp et analytics temps réel.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                    <span>Accompagnement local Antilles-Guyane, Réunion et métropole avec Customer Success dédié.</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl blur-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(229,62,62,0.15), rgba(45,56,72,0.2), rgba(229,62,62,0))",
                  }}
                />
                <div className="relative rounded-3xl border border-white/70 bg-white/95 p-4 shadow-2xl backdrop-blur">
                  <Image
                    src="/images/images-yeastar/Yeastar-easy-first-unified-communications-more-in-one-img.png"
                    alt="Console Yeastar P-Series"
                    width={830}
                    height={566}
                    className="h-auto w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                  <i className="lni lni-cloud text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Flexibilité Cloud & Software</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Hébergement souverain France/UE ou déploiement logiciel sur votre infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-900/10">
                  <i className="lni lni-comments text-2xl text-blue-marine"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Expérience omnicanale</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Appels, WhatsApp, webchat et emails centralisés pour vos équipes de relation client.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-200/60">
                  <i className="lni lni-customer text-2xl text-gray-700"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Customer Success dédié</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Formation, supervision proactive et pilotage des gains opérationnels.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Modes de déploiement */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                <i className="lni lni-direction-alt mr-2"></i>
                Deux approches complémentaires
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-dark md:text-4xl">
                Choisissez le <span className="text-red-primary">modèle de déploiement</span> adapté à votre structure
              </h2>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div className="card overflow-hidden bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-red-primary to-red-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Yeastar Cloud</h3>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                      SaaS managé E2I
                    </span>
                  </div>
                  <p className="mt-3 text-white/85">
                    Hébergement P-Series Cloud Edition dans nos data centers France/UE avec mises à jour et durcissement opérés par nos équipes.
                  </p>
                </div>
                <div className="card-body space-y-4 p-8">
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Provisioning express</p>
                      <p className="text-sm text-gray-600">Portabilité, trunks SIP DOM et configuration initiale gérés par E2I VoIP.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Sécurité renforcée</p>
                      <p className="text-sm text-gray-600">SRTP/TLS, 2FA, anti-fraude globale et sauvegardes quotidiennes avec rétention.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Évolutivité immédiate</p>
                      <p className="text-sm text-gray-600">Ajout d&rsquo;utilisateurs, files et canaux en temps réel sans interruption de service.</p>
                    </div>
                  </div>
                  <div className="border-t pt-6 text-center">
                    <p className="text-sm text-gray-600">Idéal pour</p>
                    <p className="font-semibold text-gray-dark">PME multi-sites et équipes hybrides</p>
                  </div>
                </div>
              </div>

              <div className="card overflow-hidden bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Yeastar On-Premise</h3>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                      P-Series &amp; S-Series
                    </span>
                  </div>
                  <p className="mt-3 text-white/85">
                    PBX installés dans vos locaux (P-Series Appliance, S-Series) ou sur votre hyperviseur pour un contrôle total des données et du réseau voix.
                  </p>
                </div>
                <div className="card-body space-y-4 p-8">
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Infrastructure maîtrisée</p>
                      <p className="text-sm text-gray-600">Serveurs P-Series ou S-Series configurés par E2I VoIP avec alimentation secourue et monitoring.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Continuité d'activité</p>
                      <p className="text-sm text-gray-600">Hot standby, sauvegardes locales + déportées, redondance PSTN/4G pour sites critiques.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Intégrations SI</p>
                      <p className="text-sm text-gray-600">Annuaire AD/LDAP, CRM, systèmes métiers et compatibilité équipements existants.</p>
                    </div>
                  </div>
                  <div className="border-t pt-6 text-center">
                    <p className="text-sm text-gray-600">Idéal pour</p>
                    <p className="font-semibold text-gray-dark">Collectivités, santé, sites isolés ou sensibles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plateforme visuelle */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-primary">
                  <i className="lni lni-display mr-2"></i>
                  Interface unifiée
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-dark md:text-4xl">
                  Une <span className="text-red-primary">console unique</span> pour piloter vos communications
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  Le portail Yeastar P-Series offre une expérience full web : supervision en temps réel, gestion des files, vidéo conférence et analytics détaillés. Les extensions Linkus (desktop, mobile, web) permettent à vos collaborateurs de rester joignables partout.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <i className="lni lni-stats-up text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Analytics détaillés</p>
                      <p className="text-sm text-gray-600">Tableaux de bord appels reçus, temps d'attente, SLA.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-users text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Collaboration fluide</p>
                      <p className="text-sm text-gray-600">Présence instantanée, chat d'équipe, visioconférence HD.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-protection text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Sécurité renforcée</p>
                      <p className="text-sm text-gray-600">Chiffrement SRTP/TLS, politique antifraude opérateur.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-pulse text-xl text-red-primary"></i>
                    <div>
                      <p className="font-semibold text-gray-dark">Supervision temps réel</p>
                      <p className="text-sm text-gray-600">Wallboard call center et alertes proactives.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl blur-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(229,62,62,0.2), rgba(45,56,72,0.2), rgba(209,213,219,0.3))",
                  }}
                />
                <div className="relative rounded-3xl border border-white/60 bg-white/90 p-4 shadow-2xl backdrop-blur">
                  <Image
                    src="/images/images-yeastar/Yeastar-software-pbx-img-1.png"
                    alt="Interface Yeastar P-Series"
                    width={720}
                    height={480}
                    className="h-auto w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fonctionnalités clés */}
        <section className="bg-base-200 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-dark md:text-4xl">
                Fonctionnalités <span className="text-red-primary">Yeastar</span> incluses
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Toutes les briques nécessaires pour centraliser vos interactions clients et optimiser vos opérations.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                  <i className="lni lni-apartment text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Standard automatique</h3>
                <p className="mt-3 text-sm text-gray-600">Arborescences vocales intelligentes, messages d'accueil personnalisés.</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-900/10">
                  <i className="lni lni-headphone-alt text-2xl text-blue-marine"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Call center Omnicanal</h3>
                <p className="mt-3 text-sm text-gray-600">Files d'attente avancées, campagnes sortantes, WhatsApp Business Connect.</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                  <i className="lni lni-video text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Visioconférence & Webinar</h3>
                <p className="mt-3 text-sm text-gray-600">Réunions HD, partage d'écran, enregistrement et chat intégré.</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                  <i className="lni lni-shield text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Sécurité opérée</h3>
                <p className="mt-3 text-sm text-gray-600">SRTP/TLS, 2FA, listes anti-hacking globales et politiques anti-fraude opérateur pour préserver vos communications.</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-900/10">
                  <i className="lni lni-database text-2xl text-blue-marine"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Haute disponibilité & sauvegardes</h3>
                <p className="mt-3 text-sm text-gray-600">Backups automatisés, restauration granulaire et mode hot-standby pour assurer votre continuité de service.</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-200/70">
                  <i className="lni lni-mobile text-2xl text-gray-700"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Applications Linkus</h3>
                <p className="mt-3 text-sm text-gray-600">Clients web, desktop, mobiles iOS/Android et extension Chrome pour connecter vos équipes partout.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Omnicanal */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative order-2 lg:order-1">
                <div
                  className="absolute -inset-4 rounded-3xl blur-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(229,62,62,0.15), rgba(45,56,72,0.2), rgba(209,213,219,0.25))",
                  }}
                />
                <div className="relative rounded-3xl border border-white/60 bg-white/95 p-4 shadow-2xl backdrop-blur">
                  <Image
                    src="/images/images-yeastar/yeastar-omnichannel-img1-whatsapp.png"
                    alt="Canaux omnicanaux Yeastar"
                    width={640}
                    height={480}
                    className="h-auto w-full rounded-2xl"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                  <i className="lni lni-whatsapp mr-2"></i>
                  Relation client simplifiée
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-dark md:text-4xl">
                  Une expérience <span className="text-red-primary">omnicanale</span> fluide pour vos équipes de service client
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  Centralisez appels voix, WhatsApp, SMS, webchat et emails dans la même interface. Les tickets sont triés automatiquement et assignés au bon agent selon ses compétences et ses horaires.
                </p>
                <ul className="mt-8 space-y-4 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                    <span>Scripts conversationnels et réponses rapides pour réduire le temps de traitement.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                    <span>Enregistrement automatique et transcription pour assurer la conformité réglementaire.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                    <span>Wallboard temps réel pour suivre vos SLA et l'expérience client.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi E2I */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-gray-900 py-20 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pourquoi confier votre <span className="text-red-300">projet Yeastar</span> à E2I VoIP ?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                <h3 className="text-xl font-semibold text-white">Opérateur télécom DOM</h3>
                <p className="mt-3 text-sm text-white/80">
                  Trunks SIP Antilles-Guyane, La Réunion et métropole, numéros locaux en 24h, continuité 4G/5G.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                <h3 className="text-xl font-semibold text-white">Accompagnement de bout en bout</h3>
                <p className="mt-3 text-sm text-white/80">
                  Audit, migration de vos PABX, formation des équipes et pilotage du changement.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                <h3 className="text-xl font-semibold text-white">Pilotage ROI & SLA</h3>
                <p className="mt-3 text-sm text-white/80">
                  Mesure des gains et reporting mensuel pour garantir 30% d'économies télécoms.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                <h3 className="text-xl font-semibold text-white">Support premium</h3>
                <p className="mt-3 text-sm text-white/80">
                  Assistance utilisateur, interventions locales et temps de rétablissement contractuels.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-dark md:text-4xl">
                Cas d'usage <span className="text-red-primary">concrets</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Yeastar P-Series s'adapte à vos métiers et répond aux enjeux de disponibilité, de conformité et de productivité.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              <div className="rounded-2xl border border-blue-900/20 bg-blue-50 p-6 shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <i className="lni lni-heart-monitor text-2xl text-blue-marine"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Santé & médico-social</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Files d'attente dédiées, rappel automatique des patients, journalisation sécurisée et gestion multi-sites.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-200/70">
                  <i className="lni lni-briefcase text-2xl text-gray-700"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">PME multi-agences</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Numérotation unique DOM + métropole, standard virtuel intelligent et statistiques par site.</p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100">
                  <i className="lni lni-cart text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark">Commerce & centres d'appels</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Campagnes outbound, scripts agents, intégrations e-commerce et suivi du panier abandonné par call back.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-gradient-to-r from-red-primary to-blue-marine py-20">
          <div className="mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold md:text-4xl">
              Lancez votre projet <span className="text-white">Yeastar</span> avec E2I VoIP
            </h2>
            <p className="mt-6 text-lg text-white/90">
              Bénéficiez d'un diagnostic personnalisé, de la migration de vos lignes et d'un accompagnement opérationnel par nos équipes locales.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href="/devis-en-ligne" icon="lni-bubble">
                Obtenir un devis Yeastar
              </CTAButton>
              <CTAButtonMarine href="mailto:contact@e2ivoip.com" icon="lni-envelope" external>
                contact@e2ivoip.com
              </CTAButtonMarine>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

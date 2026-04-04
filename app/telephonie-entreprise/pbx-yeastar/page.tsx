import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yeastar P-Series | PBX cloud et on-premise | E2I VoIP",
  description:
    "Déployez Yeastar P-Series avec E2I VoIP : PBX cloud ou on-premise, communications unifiées, call center et automatisations pour entreprises DOM et métropole.",
  keywords:
    "Yeastar, Yeastar P-Series, téléphonie Yeastar DOM, PBX software, IPBX cloud, call center Yeastar, VoIP Antilles",
  alternates: {
    canonical: "/telephonie-entreprise/pbx-yeastar",
  },
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


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Yeastar P-Series — PBX Cloud et On-Premise",
  "description": "Deploiement Yeastar P-Series avec E2I VoIP : PBX cloud ou on-premise, communications unifiees, call center et automatisations pour entreprises DOM et metropole.",
  "url": "https://www.e2i-voip.com/telephonie-entreprise/pbx-yeastar",
  "provider": { "@type": "Organization", "name": "E2I VoIP", "url": "https://www.e2i-voip.com" },
  "serviceType": "IPBX / Standard telephonique",
  "areaServed": [
    { "@type": "Country", "name": "France" },
    { "@type": "AdministrativeArea", "name": "Martinique" },
    { "@type": "AdministrativeArea", "name": "Guadeloupe" },
    { "@type": "AdministrativeArea", "name": "Guyane francaise" },
    { "@type": "AdministrativeArea", "name": "La Reunion" }
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.e2i-voip.com" },
      { "@type": "ListItem", "position": 2, "name": "Telephonie Entreprise", "item": "https://www.e2i-voip.com/telephonie-entreprise" },
      { "@type": "ListItem", "position": 3, "name": "PBX Yeastar", "item": "https://www.e2i-voip.com/telephonie-entreprise/pbx-yeastar" }
    ]
  }
};

function JsonLdScript() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function PBXYeastar() {
  return (
    <>
      <JsonLdScript />
      {/* Hero Section */}
      <section className="bg-[#091421] py-20 relative overflow-hidden monolith-grid-lines">
        <div className="absolute inset-0">
          <img
            src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
            alt="Solutions Yeastar E2I VoIP"
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-20"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl border-l-8 border-red-primary pl-8">
            <div className="inline-flex items-center justify-center bg-white px-6 py-3 shadow-[4px_4px_0_0_#1F2937] mb-6">
              <Image
                src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                alt="Logo Yeastar"
                width={140}
                height={60}
                priority
                className="h-10 w-auto"
              />
            </div>

            <h1 className="text-4xl font-black tracking-[-0.05em] uppercase text-white md:text-6xl">
              Téléphonie IP Yeastar pour les entreprises
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-white/90 md:text-2xl">
              <strong>Standard téléphonique nouvelle génération</strong> : PBX
              software cloud ou IPBX matériel sur site
            </p>
            <p className="mt-4 text-lg text-white/80">
              Standard téléphonique, Communications unifiées, call center et
              automatisations pour vos équipes dans les DOM et en France
              métropolitaine.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-white/85">
              <div className="flex items-center gap-2">
                <i className="lni lni-checkmark-circle text-red-primary"></i>
                <span className="text-sm">Expert certifié Yeastar (YSCE)</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="lni lni-shield text-red-primary"></i>
                <span className="text-sm">
                  Support technique Antilles-Guyane &amp; Réunion
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i className="lni lni-stats-up text-red-primary"></i>
                <span className="text-sm">
                  30% d&apos;économies sur vos coûts télécom
                </span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/devis-en-ligne"
                className="inline-flex items-center gap-2 bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[5px_5px_0px_0px_#050f1c] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#050f1c] transition-all duration-150"
              >
                <i className="lni lni-calculator"></i>
                Calculez vos économies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
              Votre projet <span className="text-red-primary">Yeastar</span>{" "}
              piloté par E2I VoIP
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#818096] max-w-4xl mx-auto">
              Votre standard téléphonique doit aujourd&rsquo;hui faire bien
              plus que transférer des appels. Avec Yeastar, vous déployez une
              téléphonie IP moderne, souple et connectée pour fluidifier les
              échanges internes et offrir une relation client cohérente sur
              tous vos canaux.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#818096] max-w-4xl mx-auto">
              En tant qu&rsquo;intégrateur certifié, E2I VoIP prend en charge
              le déploiement, la migration et l&rsquo;exploitation de votre
              plateforme, qu&rsquo;elle soit hébergée dans le cloud ou
              installée sur site.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center bg-red-primary/10">
                      <i className="lni lni-cloud text-xl text-red-primary"></i>
                    </div>
                    <h3 className="text-base font-semibold text-gray-dark">
                      P-Series Cloud Edition
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-[#818096]">
                    Solution 100&nbsp;% hébergée, sans matériel à maintenir,
                    sécurisée et supervisée par nos équipes basées en France
                    et dans l&rsquo;Union européenne.
                  </p>
                </div>
                <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#2D3848]/10">
                      <i className="lni lni-server text-xl text-blue-marine"></i>
                    </div>
                    <h3 className="text-base font-semibold text-gray-dark">
                      P-Series Appliances
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-[#818096]">
                    PBX installés dans vos locaux ou sur votre hyperviseur
                    pour conserver la maîtrise de votre infrastructure et
                    intégrer vos applications métiers.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-red-primary/10">
                    <i className="lni lni-checkmark-circle text-lg text-red-primary"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Transition orchestrée
                    </p>
                    <p className="text-sm text-[#818096]">
                      Migration depuis vos anciens PABX, portabilité de vos
                      numéros DOM et supervision continue du service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#2D3848]/10">
                    <i className="lni lni-shield text-lg text-blue-marine"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Support expert local
                    </p>
                    <p className="text-sm text-[#818096]">
                      Équipes basées en Guyane, Antilles, Réunion et métropole
                      pour des interventions rapides et un support réactif.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-red-primary/10">
                    <i className="lni lni-rocket text-lg text-red-primary"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Garantie de disponibilité
                    </p>
                    <p className="text-sm text-[#818096]">
                      Infrastructures souveraines France/UE, sauvegardes
                      chiffrées et monitoring 24/7 pour votre sérénité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="border-4 border-blue-marine bg-white p-4 shadow-[8px_8px_0px_0px_#1F2937]">
                <Image
                  src="/images/images-yeastar/Yeastar-easy-first-unified-communications-more-in-one-img.png"
                  alt="Console Yeastar P-Series"
                  width={830}
                  height={566}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes de déploiement */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#091421] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
              <i className="lni lni-direction-alt mr-2"></i>
              Deux approches complémentaires
            </div>
            <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
              Choisissez le{" "}
              <span className="text-red-primary">modèle de déploiement</span>{" "}
              adapté à votre structure
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#818096]">
              Que vous privilégiez la flexibilité du cloud ou la maîtrise
              d&apos;une infrastructure on-premise, E2I VoIP déploie et opère votre
              solution Yeastar selon vos contraintes métier.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden border-4 border-blue-marine bg-white shadow-[8px_8px_0px_0px_#1F2937] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1F2937]">
              <div className="bg-[#091421] p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-[-0.03em]">
                    Yeastar Cloud
                  </h3>
                  <span className="bg-white/20 px-3 py-1 text-sm font-medium">
                    IPBX Cloud managé par E2I
                  </span>
                </div>
                <p className="mt-3 text-white/85">
                  Hébergement Yeastar Cloud Edition dans nos data centers
                  France/UE avec mises à jour et durcissement opérés par nos
                  équipes.
                </p>
              </div>
              <div className="space-y-4 p-8">
                <div className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Provisioning express
                    </p>
                    <p className="text-sm text-[#818096]">
                      Portabilité, trunks SIP DOM et configuration initiale
                      gérés par E2I VoIP.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Sécurité renforcée
                    </p>
                    <p className="text-sm text-[#818096]">
                      SRTP/TLS, 2FA, anti-fraude globale et sauvegardes
                      quotidiennes avec rétention.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Évolutivité immédiate
                    </p>
                    <p className="text-sm text-[#818096]">
                      Ajout d&rsquo;utilisateurs, files et canaux en temps
                      réel sans interruption de service.
                    </p>
                  </div>
                </div>
                <div className="border-t-4 border-blue-marine pt-6 text-center">
                  <p className="text-sm text-[#818096]">Idéal pour</p>
                  <p className="font-semibold text-gray-dark">
                    PME multi-sites et équipes hybrides
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border-4 border-blue-marine bg-white shadow-[8px_8px_0px_0px_#1F2937] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1F2937]">
              <div className="bg-[#091421] p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-[-0.03em]">
                    Yeastar On-Premise
                  </h3>
                  <span className="bg-white/20 px-3 py-1 text-sm font-medium">
                    P-Series
                  </span>
                </div>
                <p className="mt-3 text-white/85">
                  PBX installés dans vos locaux (P-Series Appliances) ou sur
                  votre hyperviseur pour un contrôle total des données et du
                  réseau voix.
                </p>
              </div>
              <div className="space-y-4 p-8">
                <div className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Infrastructure maîtrisée
                    </p>
                    <p className="text-sm text-[#818096]">
                      Serveurs P-Series configurés par E2I VoIP avec
                      alimentation secourue et monitoring.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Continuité d&apos;activité
                    </p>
                    <p className="text-sm text-[#818096]">
                      Hot standby, sauvegardes locales + déportées, redondance
                      PSTN/4G pour sites critiques.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Intégrations SI
                    </p>
                    <p className="text-sm text-[#818096]">
                      Annuaire AD/LDAP, CRM, systèmes métiers et compatibilité
                      équipements existants.
                    </p>
                  </div>
                </div>
                <div className="border-t-4 border-blue-marine pt-6 text-center">
                  <p className="text-sm text-[#818096]">Idéal pour</p>
                  <p className="font-semibold text-gray-dark">
                    Collectivités, santé, sites isolés ou sensibles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plateforme visuelle */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center bg-red-primary/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-red-primary">
                <i className="lni lni-display mr-2"></i>
                Interface unifiée
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
                Une <span className="text-red-primary">console unique</span>{" "}
                pour piloter vos communications
              </h2>
              <p className="mt-6 text-lg text-[#818096]">
                Le portail Yeastar P-Series offre une expérience full web :
                supervision en temps réel, gestion des files, vidéo conférence
                et analytics détaillés. Les extensions Linkus (desktop,
                mobile, web) permettent à vos collaborateurs de rester
                joignables partout.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <i className="lni lni-stats-up text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Analytics détaillés
                    </p>
                    <p className="text-sm text-[#818096]">
                      Tableaux de bord appels reçus, temps d&apos;attente, SLA.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-users text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Collaboration fluide
                    </p>
                    <p className="text-sm text-[#818096]">
                      Présence instantanée, chat d&apos;équipe, visioconférence HD.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-protection text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Sécurité renforcée
                    </p>
                    <p className="text-sm text-[#818096]">
                      Chiffrement SRTP/TLS, politique antifraude opérateur.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="lni lni-pulse text-xl text-red-primary"></i>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Supervision temps réel
                    </p>
                    <p className="text-sm text-[#818096]">
                      Wallboard call center et alertes proactives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-4 border-blue-marine bg-white p-4 shadow-[8px_8px_0px_0px_#1F2937]">
              <Image
                src="/images/images-yeastar/Yeastar-software-pbx-img-1.png"
                alt="Interface Yeastar P-Series"
                width={720}
                height={480}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités clés */}
      <section className="bg-[#091421] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-[-0.05em] uppercase text-white md:text-4xl">
              Fonctionnalités{" "}
              <span className="text-red-primary">Yeastar</span> incluses
            </h2>
            <p className="mt-6 text-lg text-white/80">
              Toutes les briques nécessaires pour centraliser vos interactions
              clients et optimiser vos opérations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-red-primary/10">
                <i className="lni lni-apartment text-2xl text-red-primary"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Standard automatique
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Arborescences vocales intelligentes, messages d&apos;accueil
                personnalisés.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#2D3848]/10">
                <i className="lni lni-headphone-alt text-2xl text-blue-marine"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Call center Omnicanal
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Files d&apos;attente avancées, campagnes sortantes, WhatsApp
                Business Connect.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-red-primary/10">
                <i className="lni lni-video text-2xl text-red-primary"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Visioconférence &amp; Webinar
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Réunions HD, partage d&apos;écran, enregistrement et chat intégré.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-red-primary/10">
                <i className="lni lni-shield text-2xl text-red-primary"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Sécurité opérée
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                SRTP/TLS, 2FA, listes anti-hacking globales et politiques
                anti-fraude opérateur pour préserver vos communications.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#2D3848]/10">
                <i className="lni lni-database text-2xl text-blue-marine"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Haute disponibilité &amp; sauvegardes
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Backups automatisés, restauration granulaire et mode
                hot-standby pour assurer votre continuité de service.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#2D3848]/10">
                <i className="lni lni-mobile text-2xl text-blue-marine"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Applications Linkus
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Clients web, desktop, mobiles iOS/Android et extension Chrome
                pour connecter vos équipes partout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Omnicanal */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div className="border-4 border-blue-marine bg-white p-4 shadow-[8px_8px_0px_0px_#1F2937]">
                <Image
                  src="/images/images-yeastar/yeastar-omnichannel-img1-whatsapp.png"
                  alt="Canaux omnicanaux Yeastar"
                  width={640}
                  height={480}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center bg-[#091421] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                <i className="lni lni-whatsapp mr-2"></i>
                Relation client simplifiée
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
                Une expérience{" "}
                <span className="text-red-primary">omnicanale</span> fluide
                pour vos équipes de service client
              </h2>
              <p className="mt-6 text-lg text-[#818096]">
                Centralisez appels voix, WhatsApp, SMS, webchat et emails dans
                la même interface. Les tickets sont triés automatiquement et
                assignés au bon agent selon ses compétences et ses horaires.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-[#818096]">
                <li className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                  <span>
                    Scripts conversationnels et réponses rapides pour réduire
                    le temps de traitement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                  <span>
                    Enregistrement automatique et transcription pour assurer
                    la conformité réglementaire.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="lni lni-checkmark-circle mt-0.5 text-lg text-red-primary"></i>
                  <span>
                    Wallboard temps réel pour suivre vos SLA et l&apos;expérience
                    client.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Call Center */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="border-4 border-blue-marine bg-white p-4 shadow-[8px_8px_0px_0px_#1F2937]">
              <Image
                src="/images/images-yeastar/Yeastar-Call-center.png"
                alt="Solution Call Center Yeastar"
                width={720}
                height={480}
                className="h-auto w-full"
              />
            </div>
            <div>
              <div className="inline-flex items-center bg-[#091421] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                <i className="lni lni-headphone-alt mr-2"></i>
                Performance opérationnelle
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
                Call center{" "}
                <span className="text-red-primary">professionnel</span>{" "}
                intégré
              </h2>
              <p className="mt-6 text-lg text-[#818096]">
                Pilotez vos équipes de support et de vente avec des outils
                avancés : files d&apos;attente intelligentes, campagnes sortantes
                automatisées, supervision temps réel et statistiques
                détaillées par agent.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-red-primary/10">
                    <i className="lni lni-users text-lg text-red-primary"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Routage intelligent
                    </p>
                    <p className="text-sm text-[#818096]">
                      Distribution des appels selon les compétences, la
                      disponibilité et la charge des agents.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#2D3848]/10">
                    <i className="lni lni-stats-up text-lg text-blue-marine"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Wallboard &amp; Analytics
                    </p>
                    <p className="text-sm text-[#818096]">
                      Tableaux de bord en direct avec temps d&apos;attente, SLA et
                      taux de décrochage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-red-primary/10">
                    <i className="lni lni-microphone text-lg text-red-primary"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-dark">
                      Enregistrements &amp; Conformité
                    </p>
                    <p className="text-sm text-[#818096]">
                      Enregistrement automatique, transcription et archivage
                      sécurisé pour la conformité RGPD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Intégrations */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center bg-red-primary/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-red-primary">
                <i className="lni lni-plug mr-2"></i>
                Connectivité étendue
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
                Intégrations <span className="text-red-primary">métier</span>{" "}
                et CRM
              </h2>
              <p className="mt-6 text-lg text-[#818096]">
                Yeastar P-Series se connecte nativement à vos outils
                quotidiens : CRM, ERP, messageries et plateformes
                collaboratives. Automatisez vos workflows et enrichissez votre
                relation client sans développement.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 border-4 border-blue-marine bg-white p-4 shadow-[4px_4px_0_0_#1F2937]">
                  <i className="lni lni-whatsapp text-2xl text-blue-marine"></i>
                  <span className="font-semibold text-gray-dark">
                    WhatsApp Business
                  </span>
                </div>
                <div className="flex items-center gap-3 border-4 border-blue-marine bg-white p-4 shadow-[4px_4px_0_0_#1F2937]">
                  <i className="lni lni-microsoft text-2xl text-blue-marine"></i>
                  <span className="font-semibold text-gray-dark">
                    Microsoft 365
                  </span>
                </div>
                <div className="flex items-center gap-3 border-4 border-blue-marine bg-white p-4 shadow-[4px_4px_0_0_#1F2937]">
                  <i className="lni lni-comments text-2xl text-blue-marine"></i>
                  <span className="font-semibold text-gray-dark">
                    Slack / Teams
                  </span>
                </div>
                <div className="flex items-center gap-3 border-4 border-blue-marine bg-white p-4 shadow-[4px_4px_0_0_#1F2937]">
                  <i className="lni lni-cog text-2xl text-red-primary"></i>
                  <span className="font-semibold text-gray-dark">
                    Zoho CRM / Salesforce
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm text-[#818096]">
                <strong>API REST complète</strong> pour créer vos propres
                intégrations et automatisations personnalisées avec vos
                systèmes métier.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="border-4 border-blue-marine bg-white p-4 shadow-[8px_8px_0px_0px_#1F2937]">
                <Image
                  src="/images/images-yeastar/yeastar-integration-img1.png"
                  alt="Intégrations Yeastar avec CRM et outils métier"
                  width={640}
                  height={480}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi E2I */}
      <section className="bg-[#091421] py-20 text-white monolith-grid-lines">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-[-0.05em] uppercase text-white md:text-4xl">
            Pourquoi confier votre{" "}
            <span className="text-red-primary">projet Yeastar</span> à E2I
            VoIP ?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="border-4 border-blue-marine bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">
                Opérateur télécom DOM
              </h3>
              <p className="mt-3 text-sm text-white/80">
                Trunks SIP Antilles-Guyane, La Réunion et métropole, numéros
                locaux en 24h, continuité 4G/5G.
              </p>
            </div>
            <div className="border-4 border-blue-marine bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">
                Accompagnement de bout en bout
              </h3>
              <p className="mt-3 text-sm text-white/80">
                Audit, migration de vos PABX, formation des équipes et
                pilotage du changement.
              </p>
            </div>
            <div className="border-4 border-blue-marine bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">
                Pilotage ROI &amp; SLA
              </h3>
              <p className="mt-3 text-sm text-white/80">
                Mesure des gains et reporting mensuel pour garantir 30%
                d&apos;économies télécoms.
              </p>
            </div>
            <div className="border-4 border-blue-marine bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">
                Support premium
              </h3>
              <p className="mt-3 text-sm text-white/80">
                Assistance utilisateur, interventions locales et temps de
                rétablissement contractuels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-[-0.05em] uppercase text-gray-dark md:text-4xl">
              Cas d&apos;usage <span className="text-red-primary">concrets</span>
            </h2>
            <p className="mt-6 text-lg text-[#818096]">
              Yeastar P-Series s&apos;adapte à vos métiers et répond aux enjeux de
              disponibilité, de conformité et de productivité.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#2D3848]/10">
                <i className="lni lni-heart-monitor text-2xl text-blue-marine"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Santé &amp; médico-social
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Files d&apos;attente dédiées, rappel automatique des patients,
                journalisation sécurisée et gestion multi-sites.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#2D3848]/10">
                <i className="lni lni-briefcase text-2xl text-blue-marine"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                PME multi-agences
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Numérotation unique DOM + métropole, standard virtuel
                intelligent et statistiques par site.
              </p>
            </div>

            <div className="border-4 border-blue-marine bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center bg-red-primary/10">
                <i className="lni lni-cart text-2xl text-red-primary"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-dark">
                Commerce &amp; centres d&apos;appels
              </h3>
              <p className="mt-3 text-sm text-[#818096]">
                Campagnes outbound, scripts agents, intégrations e-commerce et
                suivi du panier abandonné par call back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-red-primary py-20 border-y-8 border-blue-marine relative overflow-hidden">
        <div className="absolute inset-0 monolith-grid-lines pointer-events-none opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-[-0.05em] uppercase text-white md:text-4xl">
            Lancez votre projet Yeastar avec E2I VoIP
          </h2>
          <p className="mt-6 text-lg text-white/90">
            Bénéficiez d&apos;un diagnostic personnalisé, de la migration de vos
            lignes et d&apos;un accompagnement opérationnel par nos équipes
            locales.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/devis-en-ligne"
              className="inline-flex items-center gap-2 bg-white text-[#091421] font-black uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[5px_5px_0px_0px_#050f1c] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#050f1c] transition-all duration-150"
            >
              <i className="lni lni-bubble"></i>
              Obtenir un devis Yeastar
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#091421] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[5px_5px_0px_0px_#050f1c] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#050f1c] transition-all duration-150"
            >
              <i className="lni lni-envelope"></i>
              Contacter notre équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

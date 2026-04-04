import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions 3CX - E2I VoIP | Téléphonie 3CX Professionnelle",
  description:
    "Découvrez nos solutions de téléphonie 3CX : instance dédiée PRO ou hébergement mutualisé SMB. Solution complète de communications unifiées pour entreprises.",
  keywords:
    "3CX, téléphonie 3CX, IPBX 3CX, 3CX PRO, 3CX SMB, communications unifiées, VoIP entreprise",
  alternates: {
    canonical: "/telephonie-3cx",
  },
  openGraph: {
    title: "Solutions 3CX - Téléphonie Professionnelle",
    description:
      "Solutions 3CX adaptées à votre entreprise : instance dédiée ou mutualisée. Communications unifiées complètes.",
    type: "website",
    locale: "fr_FR",
    url: "/telephonie-3cx",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions 3CX - E2I VoIP",
    description:
      "Choisissez votre solution 3CX : dédiée PRO ou mutualisée SMB.",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Solutions 3CX — Telephonie Professionnelle",
  "description": "Deploiement 3CX en instance dediee PRO ou hebergement mutualise SMB. Communications unifiees completes pour entreprises.",
  "url": "https://www.e2i-voip.com/telephonie-3cx",
  "provider": { "@type": "Organization", "name": "E2I VoIP", "url": "https://www.e2i-voip.com" },
  "serviceType": "Telephonie IP / Communications unifiees",
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
      { "@type": "ListItem", "position": 2, "name": "Telephonie 3CX", "item": "https://www.e2i-voip.com/telephonie-3cx" }
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

export default function Telephonie3CX() {
  return (
    <>
      <JsonLdScript />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#091421] py-32 px-8 lg:px-24">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
            alt="Solutions 3CX E2I VoIP"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#091421]/80"></div>
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, #E53E3E 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="border-l-8 border-red-primary pl-8 max-w-3xl">
            {/* Logo container — square, no rounded */}
            <div className="inline-flex items-center justify-center bg-white px-6 py-3 mb-8 shadow-[6px_6px_0px_0px_#1F2937]">
              <Image
                src="/images/logos-sip-compatibility/logo-3cx.webp"
                alt="Logo 3CX"
                width={120}
                height={80}
                priority
                className="h-10 w-auto"
              />
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-tight mb-6">
              Téléphonie{" "}
              <span className="text-red-primary">3CX</span>{" "}
              Professionnelle
            </h1>

            <p className="text-xl text-white/80 mb-4">
              <strong>Communications unifiées complètes</strong> pour votre entreprise
            </p>
            <p className="text-lg text-white/70 mb-10">
              Choisissez la solution 3CX adaptée à vos besoins :{" "}
              <strong>instance dédiée</strong> ou{" "}
              <strong>hébergement mutualisé</strong>
            </p>

            {/* Badges — micro-label style */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 border border-white/30 px-4 py-2">
                <i className="lni lni-checkmark-circle text-red-primary"></i>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  Certifié 3CX Silver Partner
                </span>
              </div>
              <div className="flex items-center gap-2 border border-white/30 px-4 py-2">
                <i className="lni lni-shield text-red-primary"></i>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  Support expert local
                </span>
              </div>
              <div className="flex items-center gap-2 border border-white/30 px-4 py-2">
                <i className="lni lni-users text-red-primary"></i>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  +50 entreprises équipées
                </span>
              </div>
            </div>

            <Link
              href="/devis-en-ligne"
              className="inline-block bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[6px_6px_0px_0px_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Section Introduction */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-red-primary mb-6"></div>
          <h2 className="text-4xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-8">
            Pourquoi choisir{" "}
            <span className="text-red-primary">3CX</span>{" "}
            avec E2I VOIP ?
          </h2>
          <p className="text-xl text-gray-secondary leading-relaxed">
            <strong className="text-blue-marine">3CX</strong> est le système de communications unifiées
            leader mondial, offrant téléphonie VoIP, visioconférence, chat
            en équipe et centre de contact dans une solution unique. En tant
            que <strong className="text-blue-marine">partenaire certifié 3CX Silver</strong>, E2I VoIP
            vous garantit une expertise locale et un accompagnement
            personnalisé pour vos projets de téléphonie d'entreprise.
          </p>
        </div>
      </section>

      {/* Section Choix des Solutions */}
      <section className="py-32 px-8 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-red-primary mb-6"></div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-secondary mb-4">
              <i className="lni lni-direction-alt mr-2"></i>
              Choisissez votre solution
            </div>
            <h2 className="text-4xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-4">
              Deux options adaptées à{" "}
              <span className="text-red-primary">vos besoins</span>
            </h2>
            <p className="text-xl text-gray-secondary max-w-3xl">
              Sélectionnez la solution 3CX qui correspond le mieux à votre entreprise
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 3CX PRO - Instance Dédiée */}
            <div className="border-4 border-blue-marine shadow-[12px_12px_0px_0px_#1F2937] overflow-hidden">
              <div className="bg-[#091421] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight">3CX PRO</h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] border border-white/40 px-3 py-1">
                    Instance Dédiée
                  </span>
                </div>
                <p className="text-white/80">
                  Solution premium avec serveur dédié
                </p>
              </div>

              <div className="p-8 bg-white">
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        Serveur dédié cloud AWS
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Instance cloud dédiée à votre entreprise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        De 8 à 1024 utilisateurs
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Évolutif selon vos besoins
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        Personnalisation complète
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Configuration et intégrations sur-mesure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        Support et Assistance utilisateur
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Sauvegardes sécurisées externalisées
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-blue-marine pt-6">
                  <p className="text-gray-secondary text-sm mb-1">Idéal pour</p>
                  <p className="font-black uppercase tracking-tight text-blue-marine mb-6 text-sm">
                    PME et entreprises exigeantes avec besoin d'intégrations
                  </p>
                  <Link
                    href="/3cx-cloud"
                    className="inline-block bg-[#091421] text-white font-black uppercase tracking-[0.2em] text-xs px-8 py-4 shadow-[6px_6px_0px_0px_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
                  >
                    Découvrir 3CX PRO
                  </Link>
                </div>
              </div>
            </div>

            {/* 3CX SMB - Mutualisée */}
            <div className="border-4 border-blue-marine shadow-[12px_12px_0px_0px_#1F2937] overflow-hidden">
              <div className="bg-red-primary p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight">3CX SMB PRO</h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] border border-white/40 px-3 py-1">
                    Mutualisée
                  </span>
                </div>
                <p className="text-white/80">
                  Solution économique multi-tenant (multi-sociétés)
                </p>
              </div>

              <div className="p-8 bg-white">
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        Hébergement mutualisé
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Infrastructure partagée sécurisée
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        De 3 à 15 utilisateurs
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Parfait pour les TPE/PME
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        Mise en service rapide
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Activation en 24h
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-black uppercase tracking-tight text-blue-marine text-sm">
                        Coûts optimisés
                      </p>
                      <p className="text-sm text-gray-secondary">
                        Solution économique tout inclus
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-red-primary pt-6">
                  <p className="text-gray-secondary text-sm mb-1">Idéal pour</p>
                  <p className="font-black uppercase tracking-tight text-blue-marine mb-6 text-sm">
                    TPE et petites PME recherchant l'efficacité
                  </p>
                  <Link
                    href="/telephonie-entreprise/3cx-smb-mutualisee"
                    className="inline-block bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-8 py-4 shadow-[6px_6px_0px_0px_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
                  >
                    Découvrir 3CX SMB PRO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comparatif */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-red-primary mb-6"></div>
            <h2 className="text-4xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-4">
              Tableau <span className="text-red-primary">comparatif</span>
            </h2>
            <p className="text-xl text-gray-secondary">
              Trouvez la solution 3CX qui correspond à vos besoins
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-4 border-blue-marine">
              <thead>
                <tr className="bg-[#091421] text-white">
                  <th className="px-6 py-4 text-left font-black uppercase tracking-tight text-sm">Caractéristiques</th>
                  <th className="px-6 py-4 text-center font-black uppercase tracking-tight text-sm border-l-2 border-white/20">3CX PRO</th>
                  <th className="px-6 py-4 text-center font-black uppercase tracking-tight text-sm border-l-2 border-white/20">3CX SMB</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-blue-marine/20">
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">
                    Type d'hébergement
                  </td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">
                    Instance dédiée AWS
                  </td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">
                    Mutualisé multi-tenant
                  </td>
                </tr>
                <tr className="border-b-2 border-blue-marine/20 bg-gray-50">
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">
                    Nombre d'utilisateurs
                  </td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">8 à 1024</td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">3 à 15</td>
                </tr>
                <tr className="border-b-2 border-blue-marine/20">
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">Appels simultanés</td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">Illimités</td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">Selon forfait</td>
                </tr>
                <tr className="border-b-2 border-blue-marine/20 bg-gray-50">
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">Personnalisation</td>
                  <td className="px-6 py-4 text-center border-l-2 border-blue-marine/20">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  </td>
                  <td className="px-6 py-4 text-center border-l-2 border-blue-marine/20">
                    <i className="lni lni-close text-gray-400 text-xl"></i>
                  </td>
                </tr>
                <tr className="border-b-2 border-blue-marine/20">
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">
                    Support prioritaire
                  </td>
                  <td className="px-6 py-4 text-center border-l-2 border-blue-marine/20">
                    <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
                  </td>
                  <td className="px-6 py-4 text-center border-l-2 border-blue-marine/20">
                    <i className="lni lni-close text-gray-400 text-xl"></i>
                  </td>
                </tr>
                <tr className="border-b-2 border-blue-marine/20 bg-gray-50">
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">Délai activation</td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">48-72h</td>
                  <td className="px-6 py-4 text-center text-blue-marine border-l-2 border-blue-marine/20">24h</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-black uppercase tracking-tight text-blue-marine text-sm">Tarification</td>
                  <td className="px-6 py-4 text-center font-black text-blue-marine border-l-2 border-blue-marine/20">
                    Sur devis
                  </td>
                  <td className="px-6 py-4 text-center font-black text-red-primary border-l-2 border-blue-marine/20">
                    À partir de 15€/utilisateur
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités 3CX */}
      <section className="py-32 px-8 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-red-primary mb-6"></div>
            <h2 className="text-4xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-4">
              Fonctionnalités <span className="text-red-primary">3CX</span>{" "}
              incluses
            </h2>
            <p className="text-xl text-gray-secondary max-w-3xl">
              Toutes nos solutions incluent l'ensemble des fonctionnalités 3CX
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Téléphonie VoIP */}
            <div className="bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border-2 border-blue-marine">
                  <i className="lni lni-phone text-3xl text-blue-marine"></i>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-blue-marine mb-3">
                Téléphonie VoIP
              </h3>
              <p className="text-gray-secondary mb-4 text-sm leading-relaxed">
                Appels HD, transferts, conférences, files d'attente, SVI intelligent
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-red-primary text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <i className="lni lni-checkmark-circle mr-1"></i>
                Haute qualité
              </span>
            </div>

            {/* Visioconférence */}
            <div className="bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border-2 border-blue-marine">
                  <i className="lni lni-video text-3xl text-red-primary"></i>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-blue-marine mb-3">
                Visioconférence
              </h3>
              <p className="text-gray-secondary mb-4 text-sm leading-relaxed">
                Réunions vidéo HD, partage d'écran, enregistrement, jusqu'à 250 participants
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-red-primary text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <i className="lni lni-users mr-1"></i>
                Jusqu'à 250 participants
              </span>
            </div>

            {/* Chat & Collaboration */}
            <div className="bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border-2 border-blue-marine">
                  <i className="lni lni-comments text-3xl text-blue-marine"></i>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-blue-marine mb-3">
                Chat & Collaboration
              </h3>
              <p className="text-gray-secondary mb-4 text-sm leading-relaxed">
                Messagerie instantanée, partage de fichiers, statuts de présence
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-[#091421] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <i className="lni lni-bolt-alt mr-1"></i>
                Temps réel
              </span>
            </div>

            {/* Applications mobiles */}
            <div className="bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border-2 border-blue-marine">
                  <i className="lni lni-mobile text-3xl text-red-primary"></i>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-blue-marine mb-3">
                Applications mobiles
              </h3>
              <p className="text-gray-secondary mb-4 text-sm leading-relaxed">
                Apps iOS/Android complètes, softphone intégré, push notifications
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-red-primary text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <i className="lni lni-mobile mr-1"></i>
                iOS & Android
              </span>
            </div>

            {/* Intégrations CRM */}
            <div className="bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border-2 border-blue-marine">
                  <i className="lni lni-link text-3xl text-red-primary"></i>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-blue-marine mb-3">
                Intégrations CRM
              </h3>
              <p className="text-gray-secondary mb-4 text-sm leading-relaxed">
                Microsoft 365, Google Workspace, Salesforce, HubSpot, et plus
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-red-primary text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <i className="lni lni-link mr-1"></i>
                Multi-CRM
              </span>
            </div>

            {/* Centre de contact */}
            <div className="bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border-2 border-blue-marine">
                  <i className="lni lni-headphone-alt text-3xl text-blue-marine"></i>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-blue-marine mb-3">
                Centre de contact
              </h3>
              <p className="text-gray-secondary mb-4 text-sm leading-relaxed">
                Files d'attente avancées, rapports temps réel, enregistrements
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-[#091421] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <i className="lni lni-stats-up mr-1"></i>
                Rapports en temps réel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section finale */}
      <section className="py-24 px-8 lg:px-24 bg-red-primary border-y-8 border-blue-marine">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.05em] text-white mb-6">
            Prêt à transformer votre téléphonie d'entreprise ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nos experts 3CX vous accompagnent dans le choix et la mise en
            œuvre de votre solution de communications unifiées
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/90">
            <div className="flex items-center gap-2">
              <i className="lni lni-certificate text-white"></i>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Certifié 3CX Silver</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="lni lni-users text-white"></i>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Support expert local</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="lni lni-shield text-white"></i>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">15 ans d'expertise</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis-en-ligne"
              className="inline-flex items-center gap-2 bg-white text-[#091421] font-black uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[6px_6px_0px_0px_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
            >
              <i className="lni lni-calculator"></i>
              Demander un devis
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#091421] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[6px_6px_0px_0px_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
            >
              <i className="lni lni-phone"></i>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

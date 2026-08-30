import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import NextLink from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { PhoneLink } from "@/components/ui/phone-link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";
import { Calculator, Phone, CheckCircle, Shield, Users, Compass, X, VideoCamera, Chat, Lightning, DeviceMobile, Link, Headphones, TrendUp, Seal } from '@/lib/icons';
import { TALLY_FORMS } from "@/lib/constants/tally";

// Formulaires Tally dédiés aux 2 offres 3CX (tunnels devis, flow n8n).
const TALLY_3CX_SMB_URL = TALLY_FORMS.VOIP_3CX_SMB;
const TALLY_3CX_PRO_URL = TALLY_FORMS.VOIP_3CX_PRO;

export const metadata: Metadata = pageMetadata({
  title: "Solutions 3CX | Téléphonie 3CX Professionnelle",
  description:
    "Découvrez nos solutions de téléphonie 3CX : instance dédiée PRO ou hébergement mutualisé SMB. Solution complète de communications unifiées pour entreprises.",
  keywords:
    "3CX, téléphonie 3CX, IPBX 3CX, 3CX PRO, 3CX SMB, communications unifiées, VoIP entreprise",
  path: "/telephonie-3cx",
});

export default function Telephonie3CX() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Solutions 3CX E2I VoIP"
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
              <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-3 mb-6 shadow-lg">
                <Image
                  src="/images/logos-sip-compatibility/logo-3cx.webp"
                  alt="Logo 3CX"
                  width={120}
                  height={80}
                  priority
                  className="h-10 w-auto"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Téléphonie <span className="text-white">3CX</span>{" "}
                Professionnelle
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Communications unifiées complètes</strong> pour votre
                entreprise
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Choisissez la solution 3CX adaptée à vos besoins :
                <strong> instance dédiée</strong> ou{" "}
                <strong>hébergement mutualisé</strong>
              </p>
              <div className="mt-8 mb-8">
                <CTAButton href="/devis-en-ligne?service=3cx" icon="Calculator">
                  PASSER A 3CX
                </CTAButton>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Certifié 3CX Silver Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Support par mail et téléphone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">15 ans d'expérience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                Pourquoi choisir <span className="text-red-primary">3CX</span>{" "}
                avec E2I VOIP ?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                <strong>3CX</strong> est le système de communications unifiées
                leader mondial, offrant téléphonie VoIP, visioconférence, chat
                en équipe et centre de contact dans une solution unique. En tant
                que <strong>partenaire certifié 3CX Silver</strong>, E2I VoIP
                vous garantit une expertise locale et un accompagnement
                personnalisé pour vos projets de téléphonie d'entreprise.
              </p>
            </div>
          </div>
        </section>

        {/* Section Choix des Solutions */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Compass size={16} className="mr-2" aria-hidden="true" />
                Choisissez votre solution
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Deux options adaptées à{" "}
                <span className="text-red-primary">vos besoins</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sélectionnez la solution 3CX qui correspond le mieux à votre
                entreprise
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* 3CX PRO - Instance Dédiée */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">3CX PRO</h3>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">
                        Instance Dédiée
                      </span>
                    </div>
                  </div>
                  <p className="text-white/90">
                    Solution premium avec serveur dédié
                  </p>
                </div>

                <div className="flex flex-col p-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          Serveur dédié cloud AWS
                        </p>
                        <p className="text-sm text-gray-600">
                          Instance cloud dédiée à votre entreprise
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          De 4 à 64 appels simultanés
                        </p>
                        <p className="text-sm text-gray-600">
                          Évolutif selon vos besoins
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          Personnalisation complète
                        </p>
                        <p className="text-sm text-gray-600">
                          Configuration et intégrations sur-mesure
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          Support et Assistance utilisateur
                        </p>
                        <p className="text-sm text-gray-600">
                          Sauvegardes sécurisées externalisées
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-center text-gray-600 mb-1">Idéal pour</p>
                    <p className="text-center font-semibold text-gray-dark mb-4">
                      PME et entreprises exigeantes avec besoin d'intégrations
                    </p>
                    <p className="text-center mb-6">
                      <span className="text-2xl font-black text-gray-dark">Sur devis</span>
                      <span className="block text-xs text-gray-500">
                        Instance dédiée cloud configurée sur-mesure
                      </span>
                    </p>
                    <div className="flex justify-center">
                      <CTAButtonMarine href={TALLY_3CX_PRO_URL} external className="block">
                        Demander un devis 3CX PRO
                      </CTAButtonMarine>
                    </div>
                    <p className="text-center mt-4">
                      <NextLink href="/3cx-pro" className="text-sm font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                        En savoir plus sur notre offre 3CX PRO
                      </NextLink>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3CX SMB - Mutualisée */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                <div className="bg-gradient-to-r from-red-primary to-red-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">3CX SMB PRO</h3>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">Mutualisée</span>
                    </div>
                  </div>
                  <p className="text-white/90">
                    Solution économique multi-tenant (multi-sociétés)
                  </p>
                </div>

                <div className="flex flex-col p-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          Hébergement mutualisé
                        </p>
                        <p className="text-sm text-gray-600">
                          Infrastructure partagée sécurisée
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          De 3 à 10 utilisateurs
                        </p>
                        <p className="text-sm text-gray-600">
                          Parfait pour les TPE/PME
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          Mise en service rapide
                        </p>
                        <p className="text-sm text-gray-600">
                          Activation rapide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          Coûts optimisés
                        </p>
                        <p className="text-sm text-gray-600">
                          Solution économique tout inclus
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-center text-gray-600 mb-1">Idéal pour</p>
                    <p className="text-center font-semibold text-gray-dark mb-4">
                      TPE et petites PME recherchant l'efficacité
                    </p>
                    <p className="text-center mb-6">
                      <span className="text-2xl font-black text-red-primary">29 €</span>
                      <span className="text-sm font-medium text-gray-600"> / utilisateur / mois</span>
                      <span className="block text-xs text-gray-500">
                        3CX Pro, appels fixes France &amp; DOM illimités inclus
                      </span>
                    </p>
                    <div className="flex justify-center">
                      <CTAButton href={TALLY_3CX_SMB_URL} external className="block">
                        Demander un devis 3CX SMB PRO
                      </CTAButton>
                    </div>
                    <p className="text-center mt-4">
                      <NextLink href="/telephonie-entreprise/3cx-smb-mutualisee" className="text-sm font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                        En savoir plus sur notre offre 3CX SMB PRO
                      </NextLink>
                    </p>
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
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Tableau <span className="text-red-primary">comparatif</span>
              </h2>
              <p className="text-xl text-gray-600">
                Trouvez la solution 3CX qui correspond à vos besoins
              </p>
            </div>

            {(() => {
              // Source unique de données — alimente la vue cartes (mobile) ET le tableau (desktop)
              const rows = [
                { feature: "Type d'hébergement", pro: "Instance dédiée AWS", smb: "Mutualisé multi-tenant" },
                { feature: "Nombre d'utilisateurs", pro: "8 à 1024", smb: "3 à 10" },
                { feature: "Appels simultanés", pro: "Illimités", smb: "Selon forfait" },
                { feature: "Personnalisation", pro: true, smb: false },
                { feature: "Support prioritaire", pro: true, smb: false },
                { feature: "Délai activation", pro: "Rapide", smb: "Rapide" },
                { feature: "Tarification", pro: "Sur devis", smb: "29 €/utilisateur/mois", highlight: true },
              ];
              const renderValue = (v: string | boolean) =>
                typeof v === "boolean"
                  ? v
                    ? <CheckCircle size={24} className="text-red-primary mx-auto" aria-label="Inclus" />
                    : <X size={24} className="text-gray-400 mx-auto" aria-label="Non inclus" />
                  : v;

              return (
                <>
                  {/* Vue cartes empilées — mobile uniquement (pas de scroll horizontal) */}
                  <div className="md:hidden space-y-4">
                    {rows.map((row) => (
                      <div
                        key={row.feature}
                        className={`rounded-lg shadow-md border border-gray-200 overflow-hidden ${row.highlight ? "ring-2 ring-red-primary" : ""}`}
                      >
                        <div className="bg-gradient-to-r from-gray-800 to-red-primary text-white px-4 py-3 font-bold text-sm">
                          {row.feature}
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-200">
                          <div className="px-4 py-3 text-center">
                            <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-1">3CX PRO</div>
                            <div className="text-sm font-medium text-gray-800 flex items-center justify-center min-h-[1.5rem]">
                              {renderValue(row.pro)}
                            </div>
                          </div>
                          <div className="px-4 py-3 text-center">
                            <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-1">3CX SMB</div>
                            <div className={`text-sm flex items-center justify-center min-h-[1.5rem] ${row.highlight ? "font-bold text-red-primary" : "font-medium text-gray-800"}`}>
                              {renderValue(row.smb)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Liens vers les pages détail de chaque offre */}
                    <div className="grid grid-cols-2 divide-x divide-gray-200 pt-2 text-center">
                      <NextLink href="/3cx-pro" className="px-4 py-2 text-sm font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                        En savoir plus
                      </NextLink>
                      <NextLink href="/telephonie-entreprise/3cx-smb-mutualisee" className="px-4 py-2 text-sm font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                        En savoir plus
                      </NextLink>
                    </div>
                  </div>

                  {/* Vue tableau classique — desktop uniquement */}
                  <div className="hidden md:block">
                    <table className="table table-zebra w-full bg-base-100 rounded-lg shadow-lg">
                      <thead className="bg-gradient-to-r from-gray-800 to-red-primary text-white">
                        <tr>
                          <th className="px-6 py-4 text-left">Caractéristiques</th>
                          <th className="px-6 py-4 text-center">3CX PRO</th>
                          <th className="px-6 py-4 text-center">3CX SMB</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={row.feature} className={`hover:bg-gray-50 ${row.highlight ? "bg-gray-50" : ""}`}>
                            <td className="px-6 py-4 font-medium">{row.feature}</td>
                            <td className="px-6 py-4 text-center">{renderValue(row.pro)}</td>
                            <td className={`px-6 py-4 text-center ${row.highlight ? "font-bold text-red-primary" : ""}`}>
                              {renderValue(row.smb)}
                            </td>
                          </tr>
                        ))}
                        {/* Ligne de liens vers les pages détail de chaque offre */}
                        <tr>
                          <td className="px-6 py-4"></td>
                          <td className="px-6 py-4 text-center">
                            <NextLink href="/3cx-pro" className="text-sm font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                              En savoir plus sur notre offre
                            </NextLink>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <NextLink href="/telephonie-entreprise/3cx-smb-mutualisee" className="text-sm font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                              En savoir plus sur notre offre
                            </NextLink>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        {/* Section Fonctionnalités 3CX */}
        <section className="py-16 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Fonctionnalités <span className="text-red-primary">3CX</span>{" "}
                incluses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Toutes nos solutions incluent l'ensemble des fonctionnalités 3CX
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Téléphonie VoIP */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group border border-gray-200">
                <div className="h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100">
                      <Phone size={24} className="text-3xl text-gray-800" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                    Téléphonie VoIP
                  </h3>
                  <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                    Appels HD, transferts, conférences, files d'attente, SVI
                    intelligent
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                      <CheckCircle size={16} className="mr-1" aria-hidden="true" />
                      Haute qualité
                    </span>
                  </div>
                </div>
              </div>

              {/* Visioconférence */}
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-primary via-red-500 to-blue-marine"></div>
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E53E3E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  ></div>
                </div>
                <div className="relative p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 via-red-50 to-white rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100">
                      <VideoCamera size={24} className="text-3xl text-red-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                    Visioconférence
                  </h3>
                  <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                    Réunions vidéo HD, partage d'écran, enregistrement, jusqu'à
                    250 participants
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-primary text-xs font-semibold rounded-full">
                      <Users size={16} className="mr-1" aria-hidden="true" />
                      Jusqu'à 250 participants
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat & Collaboration */}
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500"></div>
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3848' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  ></div>
                </div>
                <div className="relative p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100">
                      <Chat size={24} className="text-3xl text-gray-800" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                    Chat & Collaboration
                  </h3>
                  <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                    Messagerie instantanée, partage de fichiers, statuts de
                    présence
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                      <Lightning size={16} className="mr-1" aria-hidden="true" />
                      Temps réel
                    </span>
                  </div>
                </div>
              </div>

              {/* Applications mobiles */}
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-primary via-red-500 to-blue-marine"></div>
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E53E3E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  ></div>
                </div>
                <div className="relative p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 via-red-50 to-white rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100">
                      <DeviceMobile size={24} className="text-3xl text-red-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                    Applications mobiles
                  </h3>
                  <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                    Apps iOS/Android complètes, softphone intégré, push
                    notifications
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-primary text-xs font-semibold rounded-full">
                      <DeviceMobile size={16} className="mr-1" aria-hidden="true" />
                      iOS & Android
                    </span>
                  </div>
                </div>
              </div>

              {/* Intégrations CRM */}
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gray-800 via-red-primary to-gray-500"></div>
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3848' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  ></div>
                </div>
                <div className="relative p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-50 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100">
                      <Link size={24} className="text-3xl text-red-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                    Intégrations CRM
                  </h3>
                  <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                    Microsoft 365, Google Workspace, Salesforce, HubSpot, et
                    plus
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-primary text-xs font-semibold rounded-full">
                      <Link size={16} className="mr-1" aria-hidden="true" />
                      Multi-CRM
                    </span>
                  </div>
                </div>
              </div>

              {/* Centre de contact */}
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500"></div>
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3848' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  ></div>
                </div>
                <div className="relative p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100">
                      <Headphones size={24} className="text-3xl text-gray-800" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                    Centre de contact
                  </h3>
                  <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                    Files d'attente avancées, rapports temps réel,
                    enregistrements
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                      <TrendUp size={16} className="mr-1" aria-hidden="true" />
                      Rapports en temps réel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-6">
              Prêt à transformer votre{" "}
              <span className="text-white">téléphonie d'entreprise</span> ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nos experts 3CX vous accompagnent dans le choix et la mise en
              œuvre de votre solution de communications unifiées
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8 text-white/90">
              <div className="flex items-center justify-center space-x-2">
                <Seal size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Certifié 3CX Silver</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">Support par mail et téléphone</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield size={24} className="text-white" aria-hidden="true" />
                <span className="text-sm">15 ans d'expertise</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/devis-en-ligne" icon="Calculator">
                Demander un devis
              </CTAButton>
              <CTAButtonMarine
                href="tel:+33189560500"
                icon="Phone"
                external
              >
                01 89 56 05 00
              </CTAButtonMarine>
            </div>
          </div>
        </section>

        {/* Territory phone links -- D-09 */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-secondary mb-4 text-center">
              APPELEZ-NOUS DIRECTEMENT
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {TERRITORY_PHONES.filter(p => p.territory !== 'France').map((phone) => (
                <PhoneLink
                  key={phone.territory}
                  phone={phone}
                  showTerritory={true}
                  className="text-gray-dark font-black hover:text-red-primary transition-colors"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSectionSimple />
      </main>
    </div>
  );
}

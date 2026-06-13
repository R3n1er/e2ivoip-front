export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { PhoneLink } from "@/components/ui/phone-link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";
import { Chat, Phone, Users, Headphones, CheckCircle } from "@/lib/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Téléphonie d'entreprise — Trunk SIP, 3CX & PBX",
  description:
    "Solutions de téléphonie IP pour entreprises et intégrateurs en France et DOM : Trunk SIP, 3CX cloud, PBX Yeastar et interconnexion d'agents vocaux IA. Numéros locaux Antilles, Guyane, Réunion.",
  keywords:
    "téléphonie d'entreprise, trunk SIP, 3CX, PBX Yeastar, VoIP DOM, téléphonie IP entreprise",
  alternates: { canonical: "/telephonie-entreprise" },
  openGraph: {
    title: "Téléphonie d'entreprise — Trunk SIP, 3CX & PBX | E2I VoIP",
    description:
      "Solutions de téléphonie IP complètes et évolutives pour entreprises et intégrateurs : Trunk SIP, 3CX, PBX Yeastar, agents vocaux IA. France & DOM.",
    type: "website",
    locale: "fr_FR",
    url: "/telephonie-entreprise",
    siteName: "E2I VoIP",
  },
};

export default function TelephonieDentreprise() {
  const solutions = [
    {
      Icon: Phone,
      title: "Standards téléphoniques IP",
      description:
        "Solutions complètes de téléphonie d'entreprise avec toutes les fonctionnalités avancées",
      features: [
        "Auto-commutateur",
        "Messagerie vocale",
        "Transfert d'appels",
        "Conférence téléphonique",
      ],
    },
    {
      Icon: Users,
      title: "Solutions multi-sites",
      description:
        "Interconnectez tous vos sites avec une solution de téléphonie unifiée",
      features: [
        "Numérotation abrégée",
        "Transfert inter-sites",
        "Annuaire centralisé",
        "Gestion centralisée",
      ],
    },
    {
      Icon: Headphones,
      title: "Centre d'appels",
      description:
        "Optimisez votre relation client avec nos solutions de centre d'appels professionnelles",
      features: [
        "Distribution automatique",
        "Supervision temps réel",
        "Enregistrement",
        "Statistiques détaillées",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-red-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Téléphonie <span className="text-red-primary">d'entreprise</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Des solutions de téléphonie IP complètes et évolutives pour
                répondre aux besoins de votre entreprise
              </p>
              <CTAButton href="/devis-en-ligne?service=telephonie" icon="Chat">
                MODERNISER MA TELEPHONIE
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Solutions — zig-zag 2 colonnes alterné (design.md P3.11) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <solution.Icon size={24} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-dark mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-[65ch]">
                    {solution.description}
                  </p>
                </div>
                <div
                  className={`bg-blue-marine/5 border border-blue-marine/20 rounded-2xl p-8 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <ul className="space-y-4">
                    {solution.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <CheckCircle
                          size={24}
                          className="text-red-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-navigation */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-center text-gray-dark mb-12">
              Nos solutions <span className="text-red-primary">spécialisées</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Trunk SIP",
                  href: "/trunk-sip",
                  description: "Connexions SIP professionnelles",
                },
                {
                  title: "3CX PRO dédiée",
                  href: "/3cx-pro-dediee",
                  description: "Solution 3CX dédiée",
                },
                {
                  title: "3CX SMB mutualisée",
                  href: "/3cx-smb-mutualisee",
                  description: "Solution 3CX partagée",
                },
                {
                  title: "Yeastar",
                  href: "/yeastar",
                  description: "IPBX Yeastar",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
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
      </div>
    </div>
  );
}

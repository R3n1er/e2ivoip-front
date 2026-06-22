import Link from "next/link";
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
      title: "Trunk SIP opérateur DOM",
      description:
        "En tant qu'opérateur, nous fournissons des Trunk SIP dédiés aux Antilles, à la Guyane et à La Réunion, avec création et portabilité de numéros locaux.",
      features: [
        "Au compteur ou illimité",
        "Numéros locaux DOM (0590, 0596, 0594, 0262)",
        "Portabilité de vos numéros",
        "Dès 2 utilisateurs",
      ],
    },
    {
      Icon: Users,
      title: "Standards 3CX & Yeastar",
      description:
        "Installation et accompagnement sur les standards téléphoniques 3CX et Yeastar, en cloud ou sur site, adaptés à la taille de votre entreprise.",
      features: [
        "3CX SMB mutualisée ou PRO dédiée",
        "IPBX Yeastar cloud ou on-premise",
        "Communications unifiées",
        "Intégrations WhatsApp, Teams, M365",
      ],
    },
    {
      Icon: Headphones,
      title: "Innovation IA & CRM",
      description:
        "Connectez votre téléphonie à vos outils métiers : interconnexion d'agents vocaux IA et téléphonie cloud Aircall reliée à votre CRM.",
      features: [
        "Trunk SIP pour agents vocaux IA",
        "Aircall connecté à votre CRM",
        "Click-to-dial et synchronisation",
        "Studio d'attente téléphonique",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                Téléphonie <span className="text-white">d'entreprise</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Des solutions de téléphonie IP complètes et évolutives pour
                répondre aux besoins de votre entreprise, dans les DOM et en
                France métropolitaine
              </p>
              <CTAButton href="/devis-en-ligne?service=telephonie" icon="Chat">
                Moderniser ma téléphonie
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
                  href: "/telephonie-entreprise/trunk-sip-compteur",
                  description: "Connexions SIP professionnelles, au compteur ou illimité",
                },
                {
                  title: "Téléphonie 3CX",
                  href: "/telephonie-3cx",
                  description: "3CX SMB mutualisée ou PRO en instance dédiée cloud",
                },
                {
                  title: "PBX Yeastar",
                  href: "/telephonie-entreprise/pbx-yeastar",
                  description: "IPBX Yeastar cloud ou sur site",
                },
                {
                  title: "Trunk SIP agents IA",
                  href: "/telephonie-entreprise/trunk-sip-agents-ia",
                  description: "Interconnexion SIP pour agents vocaux IA",
                },
                {
                  title: "Aircall",
                  href: "/telephonie-entreprise/aircall",
                  description: "Téléphonie cloud connectée à votre CRM",
                },
              ].map((item, index) => (
                <Link key={index} href={item.href} className="block">
                  <Card className="h-full border-gray-200 hover:shadow-md hover:border-red-primary/30 transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
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

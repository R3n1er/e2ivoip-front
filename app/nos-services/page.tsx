export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import Link from "next/link";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { JsonLd } from "@/components/seo/json-ld";
import { PhoneLink } from "@/components/ui/phone-link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";
import { Calculator, Phone, ArrowRight, Chat, Cloud, Users, TreeStructure, ChartBar, Lightning, MapPin, Timer, Shield, CheckCircle } from '@/lib/icons';

export const metadata: Metadata = pageMetadata({
  title: "Nos Services Téléphonie IP | Solutions DOM",
  description:
    "Découvrez nos solutions de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX PRO, interconnexion agents vocaux IA. Éligibilité Antilles-Guyane-Réunion et portabilité de vos numéros locaux ☎",
  keywords:
    "téléphonie IP entreprise, trunk SIP DOM, 3CX PRO, trunk SIP agents IA, studio enregistrement, VoIP Antilles",
  path: "/nos-services",
});

export default function NosServices() {
  const services = [
    {
      Icon: Cloud,
      title: "Trunk SIP DOM",
      description:
        "Au compteur ou illimité, éligible Antilles-Guyane-Réunion avec création de numéros locaux",
      features: [
        "Éligibilité Trunk SIP DOM",
        "Numéros locaux DOM",
        "Portabilité gratuite",
        "Support technique local",
        "2 appels simultanés inclus",
      ],
      badge: "Populaire",
      price: "À partir de 2 canaux voix",
      href: "/telephonie-entreprise/trunk-sip-compteur",
      category: "Téléphonie IP",
    },
    {
      Icon: Users,
      title: "3CX SMB PRO",
      description:
        "IPBX cloud mutualisé de 3 à 10 utilisateurs avec Customer Success Manager dédié",
      features: [
        "Instance sécurisée pro",
        "Formation incluse",
        "Support utilisateur dédié",
        "Interface intuitive",
      ],
      badge: "Idéal PME",
      price: "29 €/utilisateur/mois",
      href: "/telephonie-entreprise/3cx-smb-mutualisee",
      category: "Téléphonie IP",
    },
    {
      Icon: Phone,
      title: "3CX PRO Dédié",
      description:
        "Votre IPBX dédié haute performance pour entreprises multisites avec communications unifiées",
      features: [
        "Serveur dédié",
        "4 à 64 appels simultanés",
        "Multi-sites",
        "Tableau de bord avancé",
      ],
      badge: "Entreprise",
      price: "Sur devis",
      href: "/3cx-pro",
      category: "Téléphonie IP",
    },
    {
      Icon: TreeStructure,
      title: "Trunk SIP agents IA",
      description:
        "Numéros locaux DOM et interconnexion SIP pour VAPI, Rounded, ElevenLabs, Jambonz",
      features: [
        "Numéros +596, +590, +594, +262",
        "BYOC compatible",
        "Trunk ou redirection",
        "Offre revendeurs",
      ],
      badge: "Innovation",
      price: "Sur devis",
      href: "/telephonie-entreprise/trunk-sip-agents-ia",
      category: "Innovation",
    },
    {
      Icon: ChartBar,
      title: "Studio d'Enregistrement",
      description:
        "Messages vocaux professionnels et musiques personnalisées pour votre standard",
      features: [
        "Voix professionnelles",
        "Musiques libres de droits",
        "Messages sur mesure",
        "Qualité studio",
      ],
      badge: "Pro",
      price: "À partir de 50€",
      href: "/studio-attente",
      category: "Communication",
    },
  ];

  const categories = [
    { name: "Téléphonie IP", count: 3, color: "bg-red-primary" },
    { name: "Innovation", count: 1, color: "bg-blue-marine" },
    { name: "Communication", count: 1, color: "bg-gray-secondary" },
  ];

  const benefits = [
    {
      Icon: Lightning,
      title: "Continuité de service",
      description:
        "Migration sans coupure et portabilité de vos numéros locaux",
      color: "text-red-primary",
    },
    {
      Icon: MapPin,
      title: "Présents dans les DOM",
      description: "Support par mail et téléphone dans toutes les zones",
      color: "text-blue-marine",
    },
    {
      Icon: Timer,
      title: "Infrastructure fiable",
      description: "Une téléphonie IP supervisée pour rester opérationnelle",
      color: "text-blue-marine",
    },
    {
      Icon: Shield,
      title: "Hébergement souverain",
      description: "Infrastructure cloud France/UE conforme RGPD",
      color: "text-gray-secondary",
    },
  ];

  // Structured Data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "E2I VoIP",
    description:
      "Solutions de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX PRO et interconnexion agents vocaux IA.",
    url: "https://www.e2i-voip.com",
    logo: "https://www.e2i-voip.com/images/logo-e2i-voip.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+590-96-35-00",
      contactType: "customer service",
      areaServed: ["GP", "MQ", "GY", "RE", "FR"],
      availableLanguage: "French",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 16.265,
        longitude: -61.551,
      },
      geoRadius: "5000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Téléphonie IP",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        price: service.price,
        category: service.category,
      })),
    },
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="min-h-screen bg-white-primary">
        <main className="pt-6">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-red-50 to-white-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-marine mb-6">
                  Nos solutions de{" "}
                  <span className="text-red-primary">téléphonie IP</span>
                </h1>
                <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
                  Transformez votre téléphonie d&apos;entreprise avec des
                  solutions complètes : Trunk SIP éligibles dans les DOM,
                  portabilité de vos numéros locaux et fonctionnalités
                  nouvelle génération.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CTAButton href="/devis-en-ligne" icon="Calculator">
                    DECOUVRIR NOS OFFRES
                  </CTAButton>
                  <CTAButtonMarine href="/contact" icon="Phone">
                    Audit telecom gratuit
                  </CTAButtonMarine>
                </div>
              </div>
            </div>
          </section>

          {/* Bénéfices clés */}
          <section className="py-16 bg-white-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-blue-marine mb-4">
                  Pourquoi choisir{" "}
                  <span className="text-red-primary">E2I VoIP</span> ?
                </h2>
                <p className="text-lg text-gray-secondary max-w-2xl mx-auto">
                  15 ans d&apos;expérience de la téléphonie d&apos;entreprise
                  dans les DOM et en France métropolitaine
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="text-center border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <benefit.Icon size={32} className={benefit.color} aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg text-blue-marine">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-secondary text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Catégories de services */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-blue-marine mb-4">
                  Nos <span className="text-red-primary">catégories</span> de
                  services
                </h2>
                <p className="text-lg text-gray-secondary max-w-2xl mx-auto">
                  Des solutions adaptées à tous les besoins et toutes les
                  tailles d&apos;entreprise
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {categories.map((category, index) => (
                  <Card
                    key={index}
                    className="text-center border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardHeader>
                      <div
                        className={`w-16 h-16 mx-auto ${category.color} rounded-full flex items-center justify-center mb-4`}
                      >
                        <span className="text-white-primary text-2xl font-bold">
                          {category.count}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-blue-marine">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20 bg-white-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-blue-marine mb-6">
                  Découvrez nos{" "}
                  <span className="text-red-primary">solutions</span>
                </h2>
                <p className="text-xl text-gray-secondary max-w-3xl mx-auto">
                  Des services complets pour moderniser votre téléphonie
                  d&apos;entreprise
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer border-gray-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <service.Icon size={24} className="text-red-primary" aria-hidden="true" />
                        </div>
                        <Badge className="bg-red-primary text-white-primary">
                          {service.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2 text-blue-marine">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-secondary leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-sm"
                          >
                            <CheckCircle size={16} className="text-red-primary mr-2 flex-shrink-0" aria-hidden="true" />
                            <span className="text-gray-secondary">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold text-blue-marine">
                            {service.price}
                          </span>
                        </div>

                        <CTAButton
                          href={service.href}
                          icon="ArrowRight"
                          className="w-full"
                        >
                          En savoir plus
                        </CTAButton>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-blue-marine">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white-primary mb-6">
                Prêt à préparer la fin du{" "}
                <span className="text-red-primary">cuivre</span> ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Nos experts analysent gratuitement votre infrastructure actuelle
                et vous proposent la solution la plus adaptée à vos besoins et
                votre budget.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton href="/contact" icon="Phone">
                  Audit télécom gratuit
                </CTAButton>
                <CTAButtonMarine href="/devis-en-ligne" icon="Chat">
                  Demander un devis
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
    </>
  );
}

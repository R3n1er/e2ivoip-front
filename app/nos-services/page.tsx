import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services Téléphonie IP - E2I VoIP | Solutions DOM",
  description:
    "Découvrez nos solutions de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX PRO, mobilité, assistants vocaux IA. Économies 30% garanties. Devis gratuit ☎",
  keywords:
    "téléphonie IP entreprise, trunk SIP DOM, 3CX PRO, solutions mobilité, assistants vocaux IA, studio enregistrement, VoIP Antilles",
  openGraph: {
    title: "Nos Services Téléphonie IP - E2I VoIP",
    description:
      "Solutions complètes de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX, mobilité, IA. Économies 30% garanties.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services Téléphonie IP - E2I VoIP",
    description:
      "Solutions complètes de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX, mobilité, IA.",
  },
};

export default function NosServices() {
  const services = [
    {
      icon: "lni-cloud",
      title: "Trunk SIP DOM",
      description:
        "Au compteur ou illimité, éligible Antilles-Guyane-Réunion avec création de numéros locaux",
      features: [
        "Économies jusqu'à 30%",
        "Numéros locaux garantis",
        "Portabilité gratuite",
        "Support technique local",
      ],
      badge: "Populaire",
      price: "À partir de 15€/mois",
      href: "/telephonie-entreprise/trunk-sip-compteur",
      category: "Téléphonie IP",
    },
    {
      icon: "lni-users",
      title: "3CX SMB Mutualisé",
      description:
        "IPBX cloud nouvelle génération jusqu'à 10 utilisateurs avec Customer Success Manager dédié",
      features: [
        "Instance sécurisée mutualisée",
        "Formation incluse",
        "Mobilité intégrée",
        "Interface intuitive",
      ],
      badge: "Idéal PME",
      price: "15€/mois/utilisateur",
      href: "/telephonie-entreprise/3cx-smb-mutualisee",
      category: "Téléphonie IP",
    },
    {
      icon: "lni-phone",
      title: "3CX PRO Dédié",
      description:
        "Votre IPBX dédié haute performance pour entreprises multisites avec communications unifiées",
      features: [
        "Serveur dédié",
        "8 appels simultanés minimum",
        "Multi-sites",
        "Tableau de bord avancé",
      ],
      badge: "Entreprise",
      price: "Sur devis",
      href: "/telephonie-entreprise/3cx-pro-dediee",
      category: "Téléphonie IP",
    },
    {
      icon: "lni-mobile",
      title: "Solutions Mobilité",
      description:
        "Travaillez de n'importe où avec softphone mobile et fonctionnalités nomades",
      features: [
        "Softphone iOS/Android",
        "Numéro fixe sur mobile",
        "Renvoi intelligent",
        "Continuité de service",
      ],
      badge: "Télétravail",
      price: "Inclus",
      href: "/mobilite",
      category: "Mobilité",
    },
    {
      icon: "lni-comments",
      title: "Assistants Vocaux IA",
      description:
        "Accueil client 24/7 avec intelligence artificielle et transcription des appels",
      features: [
        "Accueil 24/7",
        "Compréhension naturelle",
        "Transcription automatique",
        "Intégration CRM",
      ],
      badge: "Innovation",
      price: "Sur devis",
      href: "/nos-services/assistants-vocaux-ia",
      category: "Innovation",
    },
    {
      icon: "lni-bar-chart",
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
      href: "/nos-services/studio-attente",
      category: "Communication",
    },
  ];

  const categories = [
    { name: "Téléphonie IP", count: 3, color: "bg-red-primary" },
    { name: "Mobilité", count: 1, color: "bg-blue-marine" },
    { name: "Innovation", count: 1, color: "bg-green-600" },
    { name: "Communication", count: 1, color: "bg-purple-600" },
  ];

  const benefits = [
    {
      icon: "lni-bolt",
      title: "Économies garanties",
      description: "Jusqu'à 30% de réduction sur vos factures télécom",
      color: "text-red-primary",
    },
    {
      icon: "lni-map-marker",
      title: "Présence locale DOM",
      description: "Support technique réactif dans toutes les zones",
      color: "text-blue-marine",
    },
    {
      icon: "lni-timer",
      title: "Disponibilité 24/7",
      description: "Services et support disponibles en permanence",
      color: "text-green-600",
    },
    {
      icon: "lni-shield",
      title: "Sécurité maximale",
      description: "Infrastructure cloud France/UE conforme RGPD",
      color: "text-purple-600",
    },
  ];

  // Structured Data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "E2I VoIP",
    description:
      "Solutions de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX PRO, mobilité, assistants vocaux IA.",
    url: "https://e2ivoip.fr",
    logo: "https://e2ivoip.fr/images/logo-e2i-voip.png",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-white-primary">
        <Header />

        <main className="pt-20">
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
                  solutions complètes : économies garanties, mobilité totale et
                  fonctionnalités nouvelle génération.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-red-primary hover:bg-red-600 text-white-primary"
                  >
                    <i className="lni lni-phone w-5 h-5 mr-2"></i>
                    Audit télécom gratuit
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-primary text-red-primary hover:bg-red-primary hover:text-white-primary"
                  >
                    Demander un devis
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Bénéfices clés */}
          <section className="py-16 bg-white-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-marine mb-4">
                  Pourquoi choisir{" "}
                  <span className="text-red-primary">E2I VoIP</span> ?
                </h2>
                <p className="text-lg text-gray-secondary max-w-2xl mx-auto">
                  Plus de 500 entreprises nous font confiance pour leur
                  transformation numérique
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
                        <i className={`lni ${benefit.icon} text-2xl ${benefit.color}`}></i>
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
                <h2 className="text-3xl font-bold text-blue-marine mb-4">
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
                <h2 className="text-3xl md:text-4xl font-bold text-blue-marine mb-6">
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
                          <i className={`lni ${service.icon} h-6 w-6 text-red-primary`}></i>
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
                            <i className="lni lni-checkmark-circle h-4 w-4 text-red-primary mr-2 flex-shrink-0"></i>
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

                        <Link href={service.href}>
                          <Button
                            variant="outline"
                            className="w-full border-red-primary text-red-primary hover:bg-red-primary hover:text-white-primary"
                          >
                            En savoir plus
                            <i className="lni lni-arrow-right w-4 h-4 ml-2"></i>
                          </Button>
                        </Link>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white-primary mb-6">
                Prêt à économiser <span className="text-red-primary">30%</span>{" "}
                sur vos télécoms ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Nos experts analysent gratuitement votre infrastructure actuelle
                et vous proposent la solution la plus adaptée à vos besoins et
                votre budget.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-red-primary hover:bg-red-600 text-white-primary"
                >
                  <i className="lni lni-phone w-5 h-5 mr-2"></i>
                  Audit télécom gratuit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white-primary text-white-primary hover:bg-white-primary hover:text-blue-marine"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

"use client";

import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Users, Certificate, Timer, Bolt, Shield, CheckCircle, Phone, Rocket, Globe } from "@/lib/icons";

export function AboutSectionSimple() {
  const features = [
    {
      Icon: Users,
      title: "Expertise reconnue",
      description:
        "Plus de 15 ans d'expérience dans les télécommunications d'entreprise DOM",
    },
    {
      Icon: Certificate,
      title: "Solutions certifiées",
      description:
        "Partenaire Silver 3CX, certifié Yeastar, partenaire Fanvil et Yealink",
    },
    {
      Icon: Timer,
      title: "Support par mail et téléphone",
      description:
        "Présents en Martinique, Guadeloupe, Guyane • Support à distance",
    },
  ];

  const benefits = [
    "Installation et configuration complète de votre IPBX",
    "Formation de vos équipes et Customer Success Manager dédié",
    "Maintenance préventive et corrective incluse",
    "Migration depuis vos anciens PABX vers IP",
    "Portabilité et création de numéros locaux DOM",
    "Hébergement souverain France/UE conforme RGPD",
  ];

  const stats = [
    { value: "4", label: "Territoires DOM couverts", Icon: Globe },
    { value: "15", label: "Années d'expertise", Icon: Certificate },
    { value: "20%", label: "D'économies sur les communications DROM", Icon: Bolt },
    { value: "Mail & Tél", label: "Support France Métropolitaine et DOM", Icon: Shield },
  ];

  return (
    <section id="problematique-solution" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Solution */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
              Notre solution de téléphonie IP
              <span className="text-red-primary"> nouvelle génération</span>
            </h2>

            <p className="text-lg text-gray-secondary mb-8">
              E2I VoIP, <strong>opérateur de services télécom</strong>, expert
              dans les DOM et la France Métropolitaine accompagne les
              entreprises dans leur transformation digitale avec des solutions
              de téléphonie IP innovantes comme 3CX ou Yeastar, spécialement
              adaptées aux nouveaux usages professionnels.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle size={16} weight="fill" className="text-red-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-secondary">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="/devis-en-ligne" icon={Phone}>
                Faire un devis
              </CTAButton>
              <CTAButtonMarine href="/telephonie-3cx" icon={Rocket}>
                Découvrez nos offres 3CX
              </CTAButtonMarine>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <feature.Icon size={24} className="text-red-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-secondary">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques de réassurance */}
        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi les entreprises des DROM nous font confiance ?
            </h3>
            <p className="text-gray-secondary">
              Seul opérateur de services télécom avec Trunk SIP dédiés
              Antilles-Guyane et La Réunion
            </p>
          </div>

          <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <RevealItem key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.Icon size={24} className="text-red-primary mr-2" />
                  <span className="text-3xl font-bold font-mono tabular-nums text-gray-dark">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-secondary text-sm">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

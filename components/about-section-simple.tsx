"use client";

import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export function AboutSectionSimple() {
  const features = [
    {
      icon: "lni-users",
      title: "Expertise reconnue",
      description:
        "Plus de 15 ans d'expérience dans les télécommunications d'entreprise DOM",
    },
    {
      icon: "lni-certificate",
      title: "Solutions certifiées",
      description:
        "Partenaire Silver 3CX, certifié Yeastar, partenaire Fanvil et Yealink",
    },
    {
      icon: "lni-timer",
      title: "Support local 24/7",
      description:
        "Équipes techniques présentes localement en Martinique, Guadeloupe, Guyane",
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
    { value: "100+", label: "Entreprises clientes", icon: "lni-users" },
    { value: "15+", label: "Années d'expertise", icon: "lni-certificate" },
    { value: "30%", label: "Économies garanties", icon: "lni-bolt" },
    {
      value: "24/7",
      label: "Support France Métropolitaine et DOM",
      icon: "lni-shield",
    },
  ];

  return (
    <section id="problematique-solution" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Solution */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre solution de téléphonie IP
              <span className="text-red-primary"> nouvelle génération</span>
            </h2>

            <p className="text-lg text-gray-secondary mb-8">
              E2I VoIP, <strong>opérateur de services télécom </strong>, Expert
              dans les DOM et la France Métropolitaine et accompagne les
              entreprises dans leur transformation digitale avec des solutions
              de téléphonie IP innovantes comme 3CX ou Yeastar, spécialement
              adaptées aux nouveaux usages et à la mobilité.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <i className="lni lni-checkmark-circle h-5 w-5 text-red-primary mr-3 mt-0.5 flex-shrink-0"></i>
                  <span className="text-gray-secondary">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="/devis-en-ligne" icon="lni-phone">
                Calculez vos économies
              </CTAButton>
              <CTAButtonMarine href="/nos-services" icon="lni-rocket">
                Découvrez nos offres 3CX
              </CTAButtonMarine>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <i
                        className={`lni ${feature.icon} h-6 w-6 text-red-primary`}
                      ></i>
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
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi plus de 100 entreprises nous font confiance ?
            </h3>
            <p className="text-gray-secondary">
              Seul opérateur de services télécom avec Trunk SIP dédiés
              Antilles-Guyane et La Réunion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <i
                    className={`lni ${stat.icon} w-6 h-6 text-red-primary mr-2`}
                  ></i>
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

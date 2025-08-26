"use client";

import { CTAButton, CTAButtonMarine, CTAButtonSecondary } from "@/components/ui/cta-button";
import Link from "next/link";

export function ServicesSectionSimple() {
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
    },
    {
      icon: "lni-phone",
      title: "3CX PRO Cloud",
      description:
        "Votre IPBX dédié haute performance pour entreprises multisites avec communications unifiées",
      features: [
        "Serveur dédié dans le cloud",
        "4 appels simultanés minimum",
        "Multi-sites",
        "Tableau de bord avancé",
      ],
      badge: "Entreprise",
      price: "Sur devis",
      href: "/3cx-cloud",
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
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nos solutions de
            <span className="text-red-primary"> téléphonie IP</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
            Des solutions complètes pour transformer votre téléphonie
            d'entreprise : économies garanties, mobilité et fonctionnalités
            nouvelle génération.
          </p>

        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 h-full"
            >
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <i className={`lni ${service.icon} text-xl text-red-primary group-hover:scale-110 transition-transform duration-200`}></i>
                  </div>
                  <div className="badge badge-primary badge-lg font-medium">
                    {service.badge}
                  </div>
                </div>
                
                <h3 className="card-title text-xl mb-3 text-base-content">
                  {service.title}
                </h3>
                
                <p className="text-base-content/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle text-success mr-3 flex-shrink-0 text-lg"></i>
                      <span className="text-base-content/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="divider my-4"></div>
                
                <div className="card-actions flex-col space-y-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg font-bold text-primary">
                      {service.price}
                    </span>
                  </div>
                  
                  <CTAButtonSecondary href={service.href} icon="lni-arrow-right" fullWidth>
                    En savoir plus
                  </CTAButtonSecondary>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

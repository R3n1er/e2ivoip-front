"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cloud, Users, Phone, Network, BarChart, CheckCircle, ArrowRight } from "@/lib/icons";

export function ServicesSectionSimple() {
  const services = [
    {
      Icon: Cloud,
      title: "Trunk SIP DOM",
      description:
        "Au compteur ou illimité, éligible Antilles-Guyane-Réunion avec création de numéros locaux",
      features: [
        "Économies jusqu'à 20%",
        "Numéros locaux DOM",
        "Portabilité gratuite",
        "Support technique local",
        "2 appels simultanés inclus",
      ],
      badge: "Populaire",
      price: "À partir de 2 canaux voix",
      href: "/telephonie-entreprise/trunk-sip-compteur",
    },
    {
      Icon: Users,
      title: "3CX SMB PRO",
      description:
        "IPBX 3CX sur serveur mutualisé multitenant, facturé à l'utilisateur (jusqu'à 10 utilisateurs). Compatible Trunk SIP : un Trunk SIP complémentaire est à souscrire pour téléphoner.",
      features: [
        "Instance sécurisée pro",
        "Formation incluse",
        "Support utilisateur dédié",
        "Interface intuitive",
      ],
      badge: "Idéal PME",
      price: "Sur devis",
      href: "/telephonie-3cx",
    },
    {
      Icon: Phone,
      title: "3CX PRO Cloud",
      description:
        "Votre IPBX dédié haute performance pour entreprises multisites avec communications unifiées",
      features: [
        "Serveur dédié dans le cloud",
        "4 à 64 appels simultanés",
        "Multi-sites",
        "Tableau de bord avancé",
      ],
      badge: "Entreprise",
      price: "Sur devis",
      href: "/telephonie-3cx",
    },
    {
      Icon: Network,
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
    },
    {
      Icon: BarChart,
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
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
            Nos solutions de
            <span className="text-red-primary"> téléphonie IP</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
            Des solutions complètes pour transformer votre téléphonie
            d'entreprise : économies réelles et fonctionnalités
            nouvelle génération.
          </p>

        </div>

        {/* Services Grid — 2 colonnes ; 5e carte centrée */}
        <RevealGroup className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <RevealItem
              key={service.title}
              className={`rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col h-full ${
                index === services.length - 1
                  ? "md:col-span-2 md:max-w-xl md:mx-auto md:w-full"
                  : ""
              }`}
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <service.Icon size={24} className="text-red-primary group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <div className="badge badge-primary badge-lg font-medium">
                    {service.badge}
                  </div>
                </div>

                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-base-content">
                  {service.title}
                </h3>

                <p className="text-base-content/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-success mr-3 flex-shrink-0" />
                      <span className="text-base-content/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="divider my-4"></div>

                <div className="card-actions flex-col space-y-4 mt-auto">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg font-bold text-primary">
                      {service.price}
                    </span>
                  </div>

                  <CTAButton href={service.href} icon={ArrowRight} className="w-full">
                    En savoir plus
                  </CTAButton>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}

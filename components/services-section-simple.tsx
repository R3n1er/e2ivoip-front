"use client";

import { CTAButton } from "@/components/ui/cta-button";
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
        "2 appels simultanés inclus",
      ],
      badge: "Populaire",
      price: "À partir de 2 canaux voix",
      href: "/telephonie-entreprise/trunk-sip-compteur",
    },
    {
      icon: "lni-users",
      title: "3CX SMB PRO",
      description:
        "IPBX cloud nouvelle génération jusqu'à 10 utilisateurs avec Customer Success Manager dédié",
      features: [
        "Instance sécurisée pro",
        "Formation incluse",
        "Support utilisateur dédié",
        "Interface intuitive",
      ],
      badge: "Idéal PME",
      price: "15€/mois/utilisateur",
      href: "/telephonie-entreprise/3cx-smb-pro",
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
            d'entreprise : économies garanties et fonctionnalités
            nouvelle génération.
          </p>

        </div>

        {/* Services Bento Box */}
        <div className="bento-grid mb-12">
          {services.map((service, index) => {
            let layoutClass = "bento-item";
            if (index === 0) layoutClass += " bento-item-large bg-gray-50";
            else if (index === 1) layoutClass += " bento-item-wide bg-blue-marine text-white";
            else if (index === 2) layoutClass += " bento-item";
            else if (index === 3) layoutClass += " bento-item bg-red-primary text-white";
            else if (index === 4) layoutClass += " lg:col-span-4 bg-gray-dark text-white";

            const isDark = index === 1 || index === 3 || index === 4;

            return (
              <div
                key={index}
                className={`${layoutClass} group cursor-pointer p-8 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-none flex items-center justify-center transition-colors duration-200 ${isDark ? 'bg-white/10' : 'bg-red-primary/10 group-hover:bg-red-primary/20'}`}>
                      <i className={`lni ${service.icon} text-2xl ${isDark ? 'text-white' : 'text-red-primary'} group-hover:scale-110 transition-transform duration-200`}></i>
                    </div>
                    <div className={`px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-white/20 text-white' : 'bg-blue-marine text-white'}`}>
                      {service.badge}
                    </div>
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-dark'}`}>
                    {service.title}
                  </h3>

                  <p className={`text-sm md:text-base leading-relaxed mb-6 block ${isDark ? 'text-white/80' : 'text-gray-secondary'}`}>
                    {service.description}
                  </p>
                  
                  {(index === 0 || index === 4) && ( /* Show features on large items */
                    <div className={`grid ${index === 4 ? 'md:grid-cols-2 md:gap-x-8' : ''} space-y-3 md:space-y-0 md:gap-y-3 mb-8`}>
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <i className={`lni lni-checkmark-circle mr-3 flex-shrink-0 text-lg ${isDark ? 'text-white' : 'text-red-primary'}`}></i>
                          <span className={`font-medium ${isDark ? 'text-white/90' : 'text-gray-dark'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-current/10 flex items-center justify-between">
                  <span className={`text-lg font-black ${isDark ? 'text-white' : 'text-red-primary'}`}>
                    {service.price}
                  </span>
                  <Link href={service.href} className={`inline-flex items-center justify-center w-12 h-12 rounded-none transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-white text-gray-dark hover:bg-gray-100' : 'bg-gray-dark text-white hover:bg-red-primary'}`}>
                    <i className="lni lni-arrow-right"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cloud, Users, Network, BarChart, CheckCircle, ArrowRight } from "@/lib/icons";

export function ServicesSectionSimple() {
  // Ordre volontaire : le standard téléphonique (ce que le prospect cherche) en
  // premier, le Trunk SIP qui l'alimente en second. Inversé, la home vendait le
  // raccordement avant le produit — c'est ce qu'a repris l'encart Google.
  const services = [
    {
      Icon: Users,
      title: "Standard téléphonique 3CX",
      description:
        "Votre IPBX 3CX installé, configuré et supporté : serveur mutualisé jusqu'à 10 utilisateurs, ou instance dédiée pour les structures multisites. Compatible Trunk SIP — le raccordement au réseau téléphonique est à souscrire.",
      features: [
        "Cloud mutualisé ou instance dédiée",
        "4 à 64 appels simultanés",
        "Installation et configuration incluses",
        "Formation de vos équipes",
        "Intégrations CRM et Microsoft 365",
      ],
      badge: "Idéal PME",
      price: "Sur devis",
      href: "/telephonie-3cx",
    },
    {
      Icon: Cloud,
      title: "Trunk SIP DOM",
      description:
        "Le raccordement téléphonique de votre standard : au compteur ou illimité, éligible Antilles-Guyane-Réunion avec création de numéros locaux.",
      // L'allégation « Économies jusqu'à 20% » est descendue en dernière
      // position : la ligne éditoriale l'autorise en argument secondaire de
      // page produit, mais l'interdit en accroche — et c'est précisément la
      // première puce que Google reprend pour composer l'encart de marque.
      features: [
        "Numéros locaux Guadeloupe, Martinique, Guyane et La Réunion",
        "Portabilité gratuite de vos numéros existants",
        "Autant d'appels simultanés que nécessaire",
        "Support technique local",
        "Économies jusqu'à 20%",
      ],
      badge: "Populaire",
      price: "Sur devis",
      href: "/telephonie-entreprise/trunk-sip-compteur",
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
      price: "Sur devis",
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
                // Carte orpheline en fin de grille (nombre impair) : pleine
                // largeur centrée. Nombre pair : la grille se ferme seule.
                services.length % 2 === 1 && index === services.length - 1
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

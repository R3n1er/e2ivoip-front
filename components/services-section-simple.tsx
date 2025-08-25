"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

          {/* Bénéfices clés */}
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-red-primary font-semibold text-sm">
                💰 Économies 30%
              </div>
              <p className="text-gray-secondary text-xs mt-1">
                Sur vos factures télécom
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-blue-marine font-semibold text-sm">
                📱 Mobilité totale
              </div>
              <p className="text-gray-secondary text-xs mt-1">
                Téléphonez de partout
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-red-primary font-semibold text-sm">
                🤖 IA intégrée
              </div>
              <p className="text-gray-secondary text-xs mt-1">
                Assistants vocaux inclus
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-gray-secondary font-semibold text-sm">
                🏝️ DOM
              </div>
              <p className="text-gray-secondary text-xs mt-1">
                Support local réactif
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className={`lni ${service.icon} h-6 w-6 text-red-primary`}></i>
                  </div>
                  <Badge className="badge badge-primary">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-secondary leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <i className="lni lni-checkmark-circle h-4 w-4 text-red-primary mr-2 flex-shrink-0"></i>
                      <span className="text-gray-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">
                      {service.price}
                    </span>
                  </div>
                  
                  <CTAButtonSecondary href={service.href} icon="lni-arrow-right" fullWidth>
                    En savoir plus
                  </CTAButtonSecondary>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à économiser 30% sur vos télécoms ?
          </h3>
          <p className="text-gray-secondary mb-6 max-w-2xl mx-auto">
            Nos experts analysent gratuitement votre infrastructure actuelle et
            vous proposent la solution la plus adaptée à vos besoins et votre
            budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/contact" icon="lni-phone">
              Audit télécom gratuit
            </CTAButton>
            <CTAButtonMarine href="/devis-en-ligne" icon="lni-calculator">
              Demander un devis
            </CTAButtonMarine>
          </div>
        </div>
      </div>
    </section>
  );
}

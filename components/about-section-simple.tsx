"use client";

import { CheckCircle, Users, Award, Clock, Phone, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSectionSimple() {
  const features = [
    {
      icon: Users,
      title: "Expertise reconnue",
      description: "Plus de 15 ans d'expérience dans les télécommunications d'entreprise DOM-TOM",
    },
    {
      icon: Award,
      title: "Solutions certifiées",
      description: "Partenaire Silver 3CX, certifié Yeastar, partenaire Fanvil et Yealink",
    },
    {
      icon: Clock,
      title: "Support local 24/7",
      description: "Équipes techniques présentes localement en Martinique, Guadeloupe, Guyane",
    },
  ];

  const benefits = [
    "Installation et configuration complète de votre IPBX",
    "Formation de vos équipes et Customer Success Manager dédié",
    "Maintenance préventive et corrective incluse",
    "Migration depuis vos anciens PABX vers IP",
    "Portabilité et création de numéros locaux DOM-TOM",
    "Hébergement souverain France/UE conforme RGPD"
  ];

  const stats = [
    { value: "500+", label: "Entreprises clientes", icon: Users },
    { value: "15+", label: "Années d'expertise", icon: Award },
    { value: "30%", label: "Économies garanties", icon: Zap },
    { value: "24/7", label: "Support France Métropolitaine et DOM-TOM", icon: Shield },
  ];

  return (
    <section id="problematique-solution" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problématique */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Votre système téléphonique actuel 
            <span className="text-red-primary"> vous coûte trop cher ?</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-4xl mx-auto mb-8">
            Face à l'arrêt du réseau cuivre et au déploiement de la fibre optique, 
            de nombreuses entreprises DOM-TOM se retrouvent avec des factures télécom élevées 
            et des systèmes PABX obsolètes qui limitent leur productivité.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="text-red-600 font-semibold mb-2">📈 Coûts élevés</div>
              <p className="text-gray-secondary text-sm">Factures télécom qui explosent avec les anciens systèmes</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="text-red-600 font-semibold mb-2">🔧 PABX obsolète</div>
              <p className="text-gray-secondary text-sm">Équipements vieillissants incompatibles avec la fibre</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="text-red-600 font-semibold mb-2">📱 Mobilité limitée</div>
              <p className="text-gray-secondary text-sm">Pas de télétravail ni de flexibilité pour vos équipes</p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre solution de téléphonie IP
              <span className="text-red-primary"> nouvelle génération</span>
            </h2>

            <p className="text-lg text-gray-secondary mb-8">
              E2I VoIP, <strong>opérateur télécom DOM-TOM</strong>, accompagne les entreprises 
              dans leur transformation digitale avec des solutions de téléphonie IP innovantes, 
              spécialement conçues pour les Antilles-Guyane et La Réunion.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-secondary">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn btn-primary"
              >
                <Phone className="w-5 h-5 mr-2" />
                Calculez vos économies
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn btn-outline btn-primary"
              >
                Découvrez nos offres 3CX
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-red-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-secondary">
                      {feature.description}
                    </p>
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
              Pourquoi plus de 500 entreprises nous font confiance ?
            </h3>
            <p className="text-gray-secondary">
              Seul opérateur de services télécom avec Trunk SIP dédiés Antilles-Guyane et La Réunion
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-red-primary mr-2" />
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-secondary text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
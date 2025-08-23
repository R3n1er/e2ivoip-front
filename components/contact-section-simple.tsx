"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function ContactSectionSimple() {
  const contacts = [
    {
      region: "Martinique",
      phone: "0596 XXX XXX",
      icon: "lni-map-marker",
    },
    {
      region: "Guadeloupe",
      phone: "0590 XXX XXX",
      icon: "lni-map-marker",
    },
    {
      region: "Guyane",
      phone: "0594 XXX XXX",
      icon: "lni-map-marker",
    },
    {
      region: "Métropole",
      phone: "01 XX XX XX XX",
      icon: "lni-map-marker",
    },
  ];

  const benefits = [
    "Audit gratuit de votre infrastructure télécom actuelle",
    "Devis personnalisé sous 48h avec ROI démontré",
    "Accompagnement dédié avec Customer Success Manager",
    "Formation de vos équipes et support local inclus",
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à économiser 30% sur vos
            <span className="text-red-primary"> coûts télécoms ?</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
            Nos experts analysent gratuitement votre infrastructure actuelle et
            vous accompagnent dans votre transformation vers la téléphonie IP
            nouvelle génération.
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact">
              <Button size="lg" className="btn btn-primary">
                <i className="lni lni-calendar w-5 h-5 mr-2"></i>
                Audit télécom gratuit
                <i className="lni lni-arrow-right w-5 h-5 ml-2"></i>
              </Button>
            </Link>
            <Button size="lg" className="btn btn-outline btn-primary">
              <i className="lni lni-phone w-5 h-5 mr-2"></i>
              Calculez vos économies
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contacts par région */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Support France Métropolitaine et DOM-TOM
            </h3>
            <p className="text-gray-secondary mb-8">
              Équipes techniques présentes localement pour un support réactif et
              personnalisé.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {contacts.map((contact, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className={`lni ${contact.icon} text-blue-600`}></i>
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        {contact.region}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <i className="lni lni-phone h-4 w-4 text-red-primary mr-2"></i>
                        <span className="text-gray-secondary">
                          {contact.phone}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                📞 Support technique 24/7
              </h4>
              <p className="text-gray-secondary text-sm">
                Assistance technique disponible 24h/24 et 7j/7 avec escalade
                vers nos équipes locales DOM-TOM et France métropolitaine.
              </p>
            </div>
          </div>

          {/* Avantages et processus */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Votre transformation en 4 étapes
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-red-primary font-semibold text-sm">
                    1
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Audit gratuit
                  </h4>
                  <p className="text-gray-secondary text-sm">
                    Analyse complète de votre infrastructure télécom actuelle et
                    identification des axes d&apos;optimisation.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-red-primary font-semibold text-sm">
                    2
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Proposition personnalisée
                  </h4>
                  <p className="text-gray-secondary text-sm">
                    Devis détaillé avec ROI démontré et plan de migration adapté
                    à vos contraintes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-red-primary font-semibold text-sm">
                    3
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Migration accompagnée
                  </h4>
                  <p className="text-gray-secondary text-sm">
                    Installation, configuration et formation de vos équipes par
                    nos experts.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <i className="lni lni-checkmark-circle h-4 w-4 text-red-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Support continu
                  </h4>
                  <p className="text-gray-secondary text-sm">
                    Customer Success Manager dédié et support technique local
                    24/7.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-red-primary mb-3">
                ✨ Ce qui est inclus dans votre audit gratuit :
              </h4>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <i className="lni lni-checkmark-circle h-4 w-4 text-red-primary mr-2 flex-shrink-0"></i>
                    <span className="text-gray-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

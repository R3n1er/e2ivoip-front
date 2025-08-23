"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MobilityServicesSection() {
  const services = [
    {
      icon: "lni-mobile",
      title: "Téléphonie Mobile 4G/5G",
      description: "Forfaits professionnels avec voix illimitée et data adaptée aux besoins entreprise",
      features: [
        "Voix HD illimitée",
        "Data de 50Go à illimitée", 
        "Roaming international",
        "Gestion centralisée"
      ],
      badge: "Populaire",
      color: "red"
    },
    {
      icon: "lni-phone",
      title: "Solutions Voix & Data",
      description: "Packages complets combinant téléphonie fixe IP et mobile pour une communication unifiée",
      features: [
        "Numéros fixes et mobiles",
        "Transferts automatiques",
        "Messagerie unifiée",
        "Applications mobiles"
      ],
      badge: "Intégré",
      color: "blue"
    },
    {
      icon: "lni-world",
      title: "Connectivité Internationale",
      description: "Solutions pour entreprises avec besoins de communication internationale",
      features: [
        "Roaming mondial",
        "Tarifs préférentiels",
        "Support multi-pays",
        "Facturation centralisée"
      ],
      badge: "International",
      color: "green"
    },
    {
      icon: "lni-users",
      title: "Gestion de Flotte",
      description: "Outils de gestion et supervision pour parcs mobiles d'entreprise",
      features: [
        "Dashboard de gestion",
        "Contrôle des coûts",
        "Rapports détaillés",
        "Alertes automatiques"
      ],
      badge: "Gestion",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" }
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-red-100 text-red-600 border-red-200">
            <i className="lni lni-signal w-4 h-4 mr-2"></i>
            Nos Solutions Mobilité
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Solutions de <span className="text-red-600">téléphonie mobile</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de solutions de mobilité 4G/5G 
            adaptées aux besoins spécifiques des entreprises modernes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                        <service.icon className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {service.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <i className="lni lni-checkmark-circle w-4 h-4 text-green-500 mr-3 flex-shrink-0"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white"
        >
          <i className="lni lni-shield w-16 h-16 mx-auto mb-6 opacity-90"></i>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à moderniser votre mobilité d'entreprise ?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Nos experts vous accompagnent dans le choix et la mise en place 
            de vos solutions de téléphonie mobile professionnelle.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              <i className="lni lni-phone w-5 h-5 mr-2"></i>
              Demander un devis gratuit
              <i className="lni lni-arrow-right w-5 h-5 ml-2"></i>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
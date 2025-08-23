"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MobilityBackupSection() {
  const backupSolutions = [
    {
      icon: "lni-question-circle",
      title: "Modems Routeurs 4G/5G",
      description: "Équipements professionnels haute performance pour backup internet et connectivité mobile",
      features: [
        "Débit jusqu'à 2 Gbps en 5G",
        "Failover automatique",
        "Wi-Fi 6 intégré",
        "Gestion à distance"
      ],
      specs: [
        "Dual SIM pour redondance",
        "Ports Ethernet Gigabit",
        "VPN intégré",
        "Monitoring 24/7"
      ]
    },
    {
      icon: "lni-shield",
      title: "Solutions de Backup Internet",
      description: "Continuité de service garantie avec basculement automatique en cas de panne",
      features: [
        "Basculement < 30 secondes",
        "Monitoring en temps réel",
        "Alertes automatiques",
        "Reporting détaillé"
      ],
      specs: [
        "Redondance multi-opérateurs",
        "Load balancing",
        "QoS avancée",
        "Support technique 24/7"
      ]
    }
  ];

  const useCases = [
    {
      icon: "lni-question-circle",
      title: "Continuité d'activité",
      description: "Évitez les interruptions coûteuses avec nos solutions de backup automatique"
    },
    {
      icon: "lni-bolt",
      title: "Sites temporaires",
      description: "Connectivité immédiate pour chantiers, événements et installations temporaires"
    },
    {
      icon: "lni-cog",
      title: "Sites isolés",
      description: "Solutions pour zones non couvertes par la fibre ou l'ADSL"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-600 border-blue-200">
            <i className="lni lni-question-circle w-4 h-4 mr-2"></i>
            Backup Internet & Modems 4G/5G
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Solutions de <span className="text-blue-600">backup internet</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Garantissez la continuité de votre activité avec nos solutions de backup 4G/5G 
            et nos modems routeurs professionnels haute performance.
          </p>
        </motion.div>

        {/* Main Solutions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {backupSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <i className={`lni ${solution.icon} w-6 h-6 text-blue-600`}></i>
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {solution.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600">
                    {solution.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <i className="lni lni-checkmark-circle w-4 h-4 text-green-500 mr-2 flex-shrink-0"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Spécifications</h4>
                      <ul className="space-y-2">
                        {solution.specs.map((spec, specIndex) => (
                          <li key={specIndex} className="flex items-center text-sm text-gray-600">
                            <i className="lni lni-checkmark-circle w-4 h-4 text-blue-500 mr-2 flex-shrink-0"></i>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Cas d'usage typiques
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-red-100 p-3 rounded-lg w-fit mx-auto mb-4">
                    <i className={`lni ${useCase.icon} w-6 h-6 text-red-600`}></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {useCase.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Configurez votre solution sur mesure
            </h3>
            <p className="text-gray-600">
              Nos experts vous accompagnent dans le choix de la solution adaptée à vos besoins
            </p>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <i className="lni lni-signal w-5 h-5 mr-2"></i>
                Configurer votre solution
                <i className="lni lni-arrow-right w-5 h-5 ml-2"></i>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
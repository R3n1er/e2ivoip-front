"use client"

import { motion } from "framer-motion"
import { Phone, Headphones, Settings, Shield, Cloud, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ServicesSection() {
  const services = [
    {
      icon: Phone,
      title: "Standards téléphoniques IP",
      description: "Solutions complètes de téléphonie d'entreprise avec fonctionnalités avancées",
      features: ["Auto-commutateur", "Messagerie vocale", "Transfert d'appels", "Conférence"],
    },
    {
      icon: Headphones,
      title: "Centre d'appels",
      description: "Optimisez votre relation client avec nos solutions de centre d'appels",
      features: ["Distribution automatique", "Supervision temps réel", "Enregistrement", "Reporting"],
    },
    {
      icon: Cloud,
      title: "Trunk SIP",
      description: "Connexions SIP haute qualité pour vos communications sortantes",
      features: ["Numéros géographiques", "Portabilité", "Qualité garantie", "Tarifs préférentiels"],
    },
    {
      icon: Smartphone,
      title: "Softphones mobiles",
      description: "Applications mobiles pour rester connecté partout",
      features: ["iOS et Android", "Synchronisation", "Notifications push", "Interface intuitive"],
    },
    {
      icon: Settings,
      title: "Installation & maintenance",
      description: "Service complet d'installation et de maintenance de vos équipements",
      features: ["Installation sur site", "Configuration", "Formation", "Support technique"],
    },
    {
      icon: Shield,
      title: "Sécurité & monitoring",
      description: "Protection et surveillance de votre infrastructure télécom",
      features: ["Chiffrement", "Firewall SIP", "Monitoring 24/7", "Alertes automatiques"],
    },
  ]

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos <span className="text-red-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de solutions de téléphonie IP adaptées à tous les besoins d'entreprise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <CardHeader>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

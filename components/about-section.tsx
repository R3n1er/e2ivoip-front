"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Award, Clock } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Users,
      title: "Expertise reconnue",
      description: "Plus de 15 ans d'expérience dans les télécommunications d'entreprise",
    },
    {
      icon: Award,
      title: "Solutions certifiées",
      description: "Partenaire officiel des plus grandes marques de téléphonie IP",
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Assistance technique disponible 24h/24 et 7j/7",
    },
  ]

  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Téléphonie IP d'entreprise
              <span className="text-red-600"> sur mesure</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              E2I VoIP accompagne les entreprises dans leur transformation digitale en proposant des solutions de
              téléphonie IP innovantes et adaptées à leurs besoins spécifiques.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Installation et configuration complète",
                "Formation de vos équipes",
                "Maintenance préventive et corrective",
                "Migration depuis votre système existant",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

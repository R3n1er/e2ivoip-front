"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Headphones,
  Settings,
  Shield,
  Cloud,
  Smartphone,
  Zap,
  Users,
  Globe,
  MessageSquare,
  BarChart3,
  Cpu,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ServicesSection() {
  const services = [
    {
      icon: Phone,
      title: "Standards téléphoniques IP",
      description:
        "Solutions complètes de téléphonie d'entreprise avec fonctionnalités avancées et haute disponibilité",
      features: [
        "Auto-commutateur intelligent",
        "Messagerie vocale unifiée",
        "Transfert d'appels avancé",
        "Conférence multipartite",
      ],
      badge: "Populaire",
    },
    {
      icon: Headphones,
      title: "Centre d'appels",
      description:
        "Optimisez votre relation client avec nos solutions de centre d'appels performantes",
      features: [
        "Distribution automatique",
        "Supervision temps réel",
        "Enregistrement sécurisé",
        "Reporting détaillé",
      ],
      badge: "Nouveau",
    },
    {
      icon: Cloud,
      title: "Trunk SIP",
      description:
        "Connexions SIP haute qualité pour vos communications sortantes avec tarifs optimisés",
      features: [
        "Numéros géographiques",
        "Portabilité simplifiée",
        "Qualité garantie",
        "Tarifs préférentiels",
      ],
      badge: "Économique",
    },
    {
      icon: Smartphone,
      title: "Softphones mobiles",
      description:
        "Applications mobiles pour rester connecté partout avec une interface intuitive",
      features: [
        "iOS et Android",
        "Synchronisation cloud",
        "Notifications push",
        "Interface intuitive",
      ],
      badge: "Mobile",
    },
    {
      icon: Settings,
      title: "Installation & maintenance",
      description:
        "Service complet d'installation et de maintenance de vos équipements avec formation",
      features: [
        "Installation sur site",
        "Configuration optimisée",
        "Formation équipe",
        "Support technique 24/7",
      ],
      badge: "Premium",
    },
    {
      icon: Shield,
      title: "Sécurité & monitoring",
      description:
        "Protection et surveillance de votre infrastructure télécom avec alertes automatiques",
      features: [
        "Chiffrement end-to-end",
        "Firewall SIP avancé",
        "Monitoring 24/7",
        "Alertes automatiques",
      ],
      badge: "Sécurisé",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getIconStyle = (index: number) => {
    // Utiliser uniquement les couleurs PRD en alternance
    const prdColors = [
      { bg: "#fef2f2", text: "#E53E3E" }, // Rouge principal PRD
      { bg: "#f8fafc", text: "#2D3848" }, // Bleu marine PRD
      { bg: "#f9fafb", text: "#818096" }, // Gris secondaire PRD
    ];
    return prdColors[index % 3];
  };

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="mb-4 bg-red-600/10 text-red-600 border-red-600/20">
            Nos Solutions
          </Badge>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{ color: "#2D3848" }}
          >
            Services de{" "}
            <span className="text-red-600" style={{ color: "#E53E3E" }}>
              Téléphonie IP
            </span>
          </h2>
          <p
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: "#818096" }}
          >
            Découvrez notre gamme complète de solutions de téléphonie IP
            adaptées à tous les besoins d'entreprise.
            <br />
            <span className="font-medium" style={{ color: "#2D3848" }}>
              Performance, fiabilité et innovation au service de votre business.
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-gray-200 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: getIconStyle(index).bg,
                        color: getIconStyle(index).text,
                      }}
                    >
                      <service.icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle
                    className="text-xl transition-colors"
                    style={{ color: "#2D3848" }}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription
                    className="leading-relaxed"
                    style={{ color: "#818096" }}
                  >
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center text-sm"
                        style={{ color: "#818096" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                          style={{ backgroundColor: "#E53E3E" }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 pt-4 border-t border-gray-100"
                  >
                    <div
                      className="flex items-center justify-between text-xs"
                      style={{ color: "#818096" }}
                    >
                      <span>Disponibilité</span>
                      <span className="font-medium text-green-600">99.9%</span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div
            className="rounded-2xl p-8 md:p-12 text-white"
            style={{
              background: "linear-gradient(to right, #2D3848, #1e293b)",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à moderniser votre téléphonie ?
            </h3>
            <p
              className="text-lg mb-6 max-w-2xl mx-auto"
              style={{ color: "#e2e8f0" }}
            >
              Nos experts vous accompagnent dans la mise en place de votre
              solution sur mesure
            </p>
            <div className="flex justify-center">
              <Link href="/devis-en-ligne">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  style={{ backgroundColor: "#E53E3E" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#dc2626")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#E53E3E")
                  }
                >
                  Demander un devis gratuit
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HubSpotContactForm } from "@/components/hubspot-contact-form";

export function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "01 23 45 67 89",
      description: "Lun-Ven 9h-18h",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@e2i-voip.com",
      description: "Réponse sous 24h",
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "123 Avenue des Télécoms",
      description: "75001 Paris, France",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven 9h-18h",
      description: "Support 24/7",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contactez-<span className="text-red-600">nous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prêt à moderniser votre système téléphonique ? Contactez nos experts
            pour un devis personnalisé
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - HubSpot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Demande de devis
                </CardTitle>
                <p className="text-gray-600">
                  Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais
                </p>
              </CardHeader>
              <CardContent>
                <HubSpotContactForm
                  portalId="26878201"
                  formId="312a9f67-e613-4651-9690-4586646554a0"
                  region="eu1"
                  onFormSubmitted={(data) => {
                    console.log("Formulaire soumis:", data);
                  }}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <info.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* CTA Card */}
            <Card className="bg-red-600 text-white border-red-600">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Besoin d'une réponse rapide ?
                </h3>
                <p className="mb-4 opacity-90">
                  Appelez-nous directement pour un conseil personnalisé
                </p>
                <Button
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  01 23 45 67 89
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

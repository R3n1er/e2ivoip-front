"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SecureEmail } from "@/components/secure-email";

export function ContactSection() {
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Colonne gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Téléphone */}
            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Téléphone
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      0594 96 35 00
                    </p>
                    <p className="text-sm text-gray-600">Lun-Ven 9h-18h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      <SecureEmail email="commerciaux@e2i-voip.com" />
                    </p>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Colonne droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Adresse */}
            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Adresse
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      123 Avenue des Télécoms
                    </p>
                    <p className="text-sm text-gray-600">75001 Paris, France</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horaires */}
            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Horaires
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      Lun-Ven 9h-18h
                    </p>
                    <p className="text-sm text-gray-600">Support 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>

        {/* CTA Card - Centrée sur toute la largeur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Card className="bg-red-600 text-white border-red-600 max-w-md">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">
                Besoin d&apos;une réponse rapide ?
              </h3>
                              <p className="mb-4 opacity-90">
                  Appelez-nous directement pour un conseil personnalisé
                </p>
              <Button
                variant="secondary"
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                <Phone className="w-4 h-4 mr-2" />
                0594 96 35 00
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

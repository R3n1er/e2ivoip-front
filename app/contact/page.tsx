import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { HubSpotContactFormGlobal } from "@/components/hubspot-contact-form-global";

export const metadata: Metadata = {
  title: "Contact - E2I VoIP",
  description: "Contactez notre équipe d'experts en téléphonie IP pour un accompagnement personnalisé. Devis gratuit et conseils techniques.",
  keywords: "contact, téléphonie IP, devis, support, E2I VoIP",
  openGraph: {
    title: "Contact - E2I VoIP",
    description: "Contactez notre équipe d'experts en téléphonie IP pour un accompagnement personnalisé.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Contactez-<span className="text-white">nous</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Prêt à moderniser votre système téléphonique ? Contactez nos experts pour un accompagnement personnalisé
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Expertise téléphonie IP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Devis gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Support technique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire et Informations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire HubSpot */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Demande de contact
                  </CardTitle>
                  <p className="text-white/90">
                    Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <HubSpotContactFormGlobal
                    portalId="26878201"
                    formId="312a9f67-e613-4651-9690-4586646554a0"
                    region="eu1"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nos coordonnées
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre équipe d'experts est là pour vous accompagner dans vos projets de téléphonie IP
                </p>
              </div>

              <div className="space-y-6">
                {/* Téléphone */}
                <Card className="hover:shadow-lg transition-shadow">
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
                          01 23 45 67 89
                        </p>
                        <p className="text-sm text-gray-600">
                          Lun-Ven 9h-18h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="hover:shadow-lg transition-shadow">
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
                          contact@e2i-voip.com
                        </p>
                        <p className="text-sm text-gray-600">
                          Réponse sous 24h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Adresse */}
                <Card className="hover:shadow-lg transition-shadow">
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
                        <p className="text-sm text-gray-600">
                          75001 Paris, France
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Horaires */}
                <Card className="hover:shadow-lg transition-shadow">
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
                        <p className="text-sm text-gray-600">
                          Support 24/7
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Urgent */}
              <Card className="shadow-lg bg-red-600 text-white border-red-600">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Besoin d'une réponse rapide ?
                  </h3>
                  <p className="mb-4 opacity-90">
                    Appelez-nous directement pour un conseil personnalisé
                  </p>
                  <a
                    href="tel:0123456789"
                    className="inline-flex items-center px-6 py-3 bg-white text-red-600 hover:bg-gray-100 font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    01 23 45 67 89
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quel est le délai de réponse ?
                </h3>
                <p className="text-gray-600">
                  Nous répondons à toutes les demandes sous 24h maximum, souvent dans la journée.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Proposez-vous des devis gratuits ?
                </h3>
                <p className="text-gray-600">
                  Oui, tous nos devis sont gratuits et sans engagement. Nous analysons vos besoins avant de vous proposer une solution.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quels sont vos horaires de support ?
                </h3>
                <p className="text-gray-600">
                  Notre équipe technique est disponible du lundi au vendredi de 9h à 18h, avec un support d'urgence 24/7.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Intervenez-vous sur site ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous proposons des interventions sur site pour l'installation et la maintenance de vos équipements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
} 
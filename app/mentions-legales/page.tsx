import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Cookie, Copyright, MapPin, Phone, Mail, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales - E2I VoIP",
  description: "Mentions légales et informations juridiques d'E2I Assistance (E2I VOIP). Découvrez nos informations légales, politique de confidentialité et droits d'auteur.",
  keywords: "mentions légales, E2I VoIP, politique confidentialité, droits auteur, RGPD, cookies",
  openGraph: {
    title: "Mentions légales - E2I VoIP",
    description: "Mentions légales et informations juridiques d'E2I Assistance (E2I VOIP).",
    type: "website",
  },
};

export default function MentionsLegales() {
  const contactInfo = [
    { region: "Guyane", phone: "+594 594 963 500" },
    { region: "Guadeloupe", phone: "+590 590 173 500" },
    { region: "Martinique", phone: "+596 596 313 500" },
    { region: "La Réunion", phone: "+262 263 085 500" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-primary to-blue-marine overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-primary/90 to-blue-marine/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Mentions <span className="text-white">légales</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Informations juridiques et légales d'E2I Assistance (E2I VOIP)
            </p>
          </div>
        </div>
      </section>

      {/* Section Éditeur */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="text-red-600">Éditeur</span> du site
              </h2>
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                    <CardTitle className="text-xl font-bold">
                      E2I ASSISTANCE
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Propriétaire du site</h3>
                          <p className="text-gray-600">Alban RENIER / E2I ASSISTANCE</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">SIRET</h3>
                          <p className="text-gray-600">51743457700014</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Code APE</h3>
                          <p className="text-gray-600">6203Z</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Siège social</h3>
                          <p className="text-gray-600">23 Chemin Troubiran<br />97300 CAYENNE</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="text-red-600">Hébergement</span>
              </h2>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Plateforme HubSpot</h3>
                      <p className="text-gray-600">
                        Le site internet www.e2i-voip.com est hébergé par la plateforme HubSpot.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section Cookies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gestion des <span className="text-red-600">cookies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre politique de gestion des cookies et protection des données
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Cookie className="w-6 h-6 mr-2" />
                  Cookies et traces
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Le présent site internet dépose des cookies notamment de mesures d'audience avec votre consentement.
                  </p>
                  <p className="text-gray-600">
                    Ce dernier vous est proposé à l'aide d'un gestionnaire de site (bandeau) qui vous permet de refuser, d'accepter ou de choisir les traces que vous autorisez.
                  </p>
                  <p className="text-gray-600">
                    Ces traces ne sont pas conservées plus de 13 mois.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Protection des données
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Vous pouvez vous adresser à notre société pour exercer vos droits informatiques et libertés via notre <strong>Politique de confidentialité</strong> ou notre formulaire de contact.
                  </p>
                  <p className="text-gray-600">
                    Notre politique de confidentialité se réfère au Règlement Général sur la Protection des Données (RGPD) qui est entré en vigueur le 25 mai 2018.
                  </p>
                  <p className="text-gray-600">
                    Nous continuerons à vous informer et, le cas échéant, à solliciter votre consentement pour tous nouveaux traitements, dans le respect de cette réglementation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Droits d'auteur */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">Droits d'auteur</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protection de la propriété intellectuelle et droits de reproduction
            </p>
          </div>

          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold flex items-center">
                <Copyright className="w-6 h-6 mr-2" />
                Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-600">
                  L'ensemble de ce site relève de la législation française et internationale sur les droits d'auteur et la propriété intellectuelle.
                </p>
                <p className="text-gray-600">
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et visuelles.
                </p>
                <p className="text-gray-600">
                  La reproduction de tout ou partie de ce site sur un support quel qu'il soit est formellement interdite sauf autorisation expresse.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section Certification */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nous sommes <span className="text-red-600">certifiés</span> !
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              E2I Assistance est partenaire 3CX Bronze et certifié ! Visitez le site internet de notre partenaire et souscrivez à une version d'évaluation du standard téléphonique.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg inline-block">
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <Badge variant="secondary" className="text-sm">3CX Bronze Partner</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact par région */}
      <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos <span className="text-white">implantations</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Contactez-nous dans votre région
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{contact.region}</h3>
                  <p className="text-white/90 text-sm">{contact.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 
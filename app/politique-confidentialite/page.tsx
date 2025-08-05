import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, FileText, Cookie, Copyright, MapPin, Phone, Mail, Globe, Lock, Users, Eye, Trash2, Download, Ban, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | E2I VoIP',
  description: 'Notre politique de confidentialité - E2I ASSISTANCE. Découvrez comment nous protégeons vos données personnelles conformément au RGPD.',
  keywords: 'politique confidentialité, RGPD, protection données, E2I VoIP, cookies, droits utilisateurs',
  openGraph: {
    title: 'Politique de confidentialité | E2I VoIP',
    description: 'Notre politique de confidentialité - E2I ASSISTANCE. Découvrez comment nous protégeons vos données personnelles.',
  },
}

export default function PolitiqueConfidentialitePage() {
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
              Politique de <span className="text-white">confidentialité</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment E2I ASSISTANCE protège vos données personnelles conformément au RGPD
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Conformité RGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Protection des données</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Droits utilisateurs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <Card className="shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Protection de vos données personnelles
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      La société E2I ASSISTANCE est responsable du traitement des données que vous confiez à l'occasion de nos relations en ligne à travers ce site internet.
                    </p>
                    <p className="text-gray-600">
                      Conformément au Règlement Général sur la Protection des Données (RGPD) en vigueur en Europe et à la Loi Informatique et Libertés, la société E2I ASSISTANCE vous informe des conditions d'utilisation et de protection de vos données et des moyens vous permettant d'exercer vos droits et recours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Responsable du traitement */}
            <Card className="shadow-lg mb-8">
              <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                  1. Identité du responsable du traitement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Users className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      E2I ASSISTANCE
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Responsable du traitement des données personnelles
                    </p>
                    <p className="text-gray-600">
                      Contact : via notre <a href="/contact" className="text-red-600 hover:text-red-700 font-medium">formulaire de contact</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collecte des données */}
            <Card className="shadow-lg mb-8">
              <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                  2. Collecte et utilisation des données
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Notre société, selon les finalités des besoins, collecte et utilise vos données personnelles. Cela concerne plusieurs traitements.
                </p>

                <div className="space-y-6">
                  {/* Cookies */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Cookie className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          2.1 Cookies et navigation
                        </h3>
                        <p className="text-gray-600">
                          Le site peut collecter, lorsque vous l'y autorisez, des traces de votre navigation, appelées cookies. Ces traces, par défaut, ne sont pas collectées, sauf si vous l'acceptez par l'intermédiaire de notre bandeau concernant les cookies qui apparaît en page d'accueil. Elles sont utilisées par notre service informatique aux fins de statistiques et sont conservées 13 mois.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          2.2 Gestion des demandes de contact
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Le site peut collecter vos données à travers un formulaire de gestion de demande de contact. La base juridique de ce traitement est l'intérêt légitime de l'association. Les données concernent des données d'identification telles que le nom, prénom, e-mail, téléphone et des données d'information sur votre demande telles que l'objet, le détail de votre message et la date de votre demande.
                        </p>
                        <p className="text-sm font-medium text-red-600">
                          Les données sont conservées 2 ans.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Candidatures */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          2.3 Gestion des candidatures
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Le site peut collecter vos données à travers une demande de candidature afin de postuler à une offre d'emploi. La base juridique de ce traitement est l'intérêt légitime de la société et des relations pré-contractuelles. Les données concernent des données d'identification telles que le nom, prénom, e-mail téléphone, adresse, et des données d'information professionnelle sur votre candidature.
                        </p>
                        <p className="text-sm font-medium text-red-600">
                          Les données sont conservées 2 ans.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Paiements */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Lock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          2.4 Gestion des paiements
                        </h3>
                        <p className="text-gray-600">
                          Les données de paiement sont traitées de manière sécurisée par nos prestataires de paiement certifiés, conformément aux standards de sécurité PCI DSS.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="border-l-4 border-orange-500 pl-6">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Eye className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          2.5 Gestion de vos images
                        </h3>
                        <p className="text-gray-600">
                          Le site lorsque vous avez donné votre accord par écrit peut utiliser votre image. La base légale du traitement est votre consentement. La finalité est la diffusion de votre image dans le but de promouvoir les activités de la société. La durée de conservation des données correspond au temps de la durée de notre actualité et ne peut dépasser 10 ans.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hébergement et sécurité */}
            <Card className="shadow-lg mb-8">
              <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                  3. Hébergement et sécurité des données
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Hébergement */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        3.1 Lieux d'hébergement
                      </h3>
                      <p className="text-gray-600">
                        Vos données sont stockées, en premier lieu, sur notre site, chez le prestataire hébergeur dûment conforme, puis sur nos serveurs en local. Dans le cas de certains traitements, vos données peuvent être stockées auprès de nos prestataires de services cloud comme Microsoft, Google, HubSpot.
                      </p>
                    </div>
                  </div>

                  {/* Protection */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Lock className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        3.2 Protection des données
                      </h3>
                      <p className="text-gray-600">
                        Afin de préserver la confidentialité et la sécurité de vos données personnelles et notamment de les protéger contre la destruction illicite ou accidentelle, la perte ou l'altération accidentelle ou encore la divulgation ou l'accès non autorisé, notre société a pris les mesures techniques et organisationnelles appropriées, conformément aux dispositions légales applicables, comme, par exemple, le chiffrement des données pendant les transmissions.
                      </p>
                    </div>
                  </div>

                  {/* Contenu embarqué */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Eye className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        3.3 Contenu embarqué
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, articles...). Le contenu intégré depuis d'autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site.
                      </p>
                      <p className="text-gray-600">
                        Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d'un compte connecté sur leur site web.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Droits utilisateurs */}
            <Card className="shadow-lg mb-8">
              <CardHeader className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                  4. Vos droits utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Vous disposez de droits dit informatique et libertés. Pour les exercer, vous pouvez nous écrire à notre adresse postale ou en nous écrivant par le <a href="/contact" className="text-red-600 hover:text-red-700 font-medium">formulaire de contact</a>.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Droit d'accès */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Droit d'accès
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Vous pouvez exercer votre droit d'accès pour connaître les données personnelles vous concernant. Dans ce cas, nous pourrons vous demander une preuve de votre identité pour en vérifier l'exactitude.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Droit de rectification */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Droit de rectification
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Si les données personnelles détenues par l'association sont inexactes, vous pouvez demander la mise à jour de vos informations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Droit d'effacement */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Droit d'effacement
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Vous pouvez demander la suppression de vos données à caractère personnel dans les conditions prévues par l'article 18 du RGPD.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Droit à la portabilité */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Download className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Droit à la portabilité
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Vous pouvez demander à l'association de vous remettre vos données pour les transmettre à un tiers dans les conditions prévues par l'article 20 du RGPD.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Droit d'opposition */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <Ban className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Droit d'opposition
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Vous pouvez vous opposer à ce que vos données soient traitées conformément aux hypothèses prévues par l'article 21 du RGPD.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Limitation du traitement */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                          <Lock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Limitation du traitement
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Vous avez le droit de demander à l'association de limiter le traitement de vos données personnelles conformément aux hypothèses prévues par l'article 18 du RGPD.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Délai de réponse */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Délai de réponse
                        </h4>
                        <p className="text-gray-600">
                          Toute demande d'exercice de vos droits fera l'objet d'un contrôle d'identité proportionné à la demande. Une réponse vous sera adressée dans le délai d'un mois suivant la réception de la demande.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Réclamation CNIL */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Réclamation auprès de la CNIL
                  </h4>
                  <p className="text-gray-600">
                    Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Certification */}
            <Card className="shadow-lg bg-gradient-to-r from-red-primary to-blue-marine text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Nous sommes certifiés !
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  E2I Assistance est partenaire <strong>3CX Bronze</strong> et certifié ! 
                  Visitez le site internet de notre partenaire et souscrivez à une version d'évaluation du standard téléphonique.
                </p>
                <a 
                  href="https://www.3cx.fr/pabx/download-pabx-ip/?resellerId=208715" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-red-600 hover:bg-gray-100 font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Découvrir 3CX
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
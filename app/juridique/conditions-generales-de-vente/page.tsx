import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DownloadSimple, FileText, Shield, Clock, Scales } from "@/lib/icons";
import { COMPANY, LEGAL_LAST_UPDATE } from "@/lib/legal/company";
import { LegalBreadcrumb } from "@/components/legal/breadcrumb";
import { LegalHelpCard } from "@/components/legal/help-card";
import { CgvContent } from "@/components/legal/cgv-content";

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales de vente | E2I VoIP",
  description:
    "Conditions générales de vente d’E2I ASSISTANCE (E2I VoIP) : contrat, commande, tarifs, support, responsabilité et réversibilité.",
  keywords:
    "CGV, conditions générales de vente, E2I VoIP, contrat téléphonie, VoIP DOM",
  path: "/juridique/conditions-generales-de-vente",
});

export default function ConditionsGeneralesVentePage() {
  return (
    <>
      <LegalBreadcrumb current="Conditions générales de vente" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 relative overflow-hidden">
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
              Conditions générales de vente
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Le document contractuel qui encadre nos relations commerciales
              avec les clients professionnels.
            </p>
            <p className="mt-4 text-sm text-white/80">
              Version 1.2 · entrée en vigueur le 30 août 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Téléchargement PDF */}
            <Card className="shadow-lg border-l-4 border-red-600">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FileText size={32} className="text-red-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Document contractuel complet
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Pour toute souscription de Services E2I VoIP, les présentes CGV
                        s’appliquent conjointement avec les conditions particulières
                        du Service commandé.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/documents/cgv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <DownloadSimple size={20} className="mr-2" aria-hidden="true" />
                    Télécharger le PDF
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Infos clés */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock size={24} className="text-red-600" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-900">Entrée en vigueur</h3>
                  </div>
                  <p className="text-gray-600">30 août 2026</p>
                </CardContent>
              </Card>
              <Card className="shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield size={24} className="text-red-600" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-900">Prestataire</h3>
                  </div>
                  <p className="text-gray-600">
                    {COMPANY.legalName} · SIRET {COMPANY.siret}
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Scales size={24} className="text-red-600" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-900">Droit applicable</h3>
                  </div>
                  <p className="text-gray-600">
                    Droit français · Tribunaux compétents de Cayenne
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Documents connexes */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <h2 className="text-xl font-bold">Documents contractuels connexes</h2>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <Link
                      href="/documents/conditions-particulieres-voip.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-red-600 mr-3 flex-shrink-0" aria-hidden="true"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>
                      <div>
                        <p className="font-medium text-gray-900">Conditions particulières — VoIP / IPBX</p>
                        <p className="text-sm text-gray-500">PDF · v1.1</p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href="/documents/conditions-particulieres-trunk-sip.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-red-600 mr-3 flex-shrink-0" aria-hidden="true"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>
                      <div>
                        <p className="font-medium text-gray-900">Conditions particulières — Trunk SIP</p>
                        <p className="text-sm text-gray-500">PDF · v1.1</p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href="/juridique/accord-sous-traitance-rgpd"
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-red-600 mr-3 flex-shrink-0" aria-hidden="true"><path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.27,47,25.53a8,8,0,0,0,4.2,0c1-.26,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0Z"></path></svg>
                      <div>
                        <p className="font-medium text-gray-900">Accord de sous-traitance RGPD (DPA)</p>
                        <p className="text-sm text-gray-500">Lire en ligne · v1.2</p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href="/juridique/politique-confidentialite"
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-red-600 mr-3 flex-shrink-0" aria-hidden="true"><path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.27,47,25.53a8,8,0,0,0,4.2,0c1-.26,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0Z"></path></svg>
                      <div>
                        <p className="font-medium text-gray-900">Politique de confidentialité</p>
                        <p className="text-sm text-gray-500">Lire en ligne · v1.1</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sommaire par thèmes */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <h2 className="text-xl font-bold">Sommaire</h2>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">

                  {/* Groupe 1 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Préambule et définitions
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 1 — Identité du Prestataire</li>
                      <li>Art. 2 — Définitions</li>
                      <li>Art. 3 — Objet et champ d’application</li>
                      <li>Art. 4 — Information précontractuelle et acceptation</li>
                    </ul>
                  </div>

                  {/* Groupe 2 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Commande et exécution
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 5 — Commande, acompte et annulation</li>
                      <li>Art. 6 — Conditions préalables et coopération</li>
                      <li>Art. 7 — Déploiement et délais</li>
                      <li>Art. 8 — Mise en service et recette</li>
                    </ul>
                  </div>

                  {/* Groupe 3 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Durée, prix et facturation
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 9 — Durée et prise d’effet</li>
                      <li>Art. 10 — Non-renouvellement et résiliation</li>
                      <li>Art. 12 — Prix</li>
                      <li>Art. 13 — Révision des prix</li>
                      <li>Art. 14 — Facturation</li>
                      <li>Art. 15 — Paiement, retard et frais</li>
                      <li>Art. 16 — Impayés, suspension et remise en service</li>
                    </ul>
                  </div>

                  {/* Groupe 4 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Support et prestations
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 17 — Support et niveaux de service</li>
                      <li>Art. 18 — Interventions hors périmètre</li>
                      <li>Art. 19 — Conditions techniques et QoS</li>
                      <li>Art. 20 — Administration et sécurité</li>
                      <li>Art. 21 — Sauvegardes</li>
                      <li>Art. 26 — Maintenance</li>
                    </ul>
                  </div>

                  {/* Groupe 5 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Équipements et numérotation
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 22 — Équipements vendus</li>
                      <li>Art. 23 — Équipements loués</li>
                      <li>Art. 24 — Équipements et solutions de tiers</li>
                      <li>Art. 31 — Numérotation et portabilité</li>
                      <li>Art. 32 — Appels d’urgence et usages nomades</li>
                      <li>Art. 33 — Enregistrement des appels</li>
                    </ul>
                  </div>

                  {/* Groupe 6 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Réglementation et responsabilité
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 27 — Utilisation licite et loyale</li>
                      <li>Art. 28 — Démarchage, appels automatisés et agents IA</li>
                      <li>Art. 29 — Forfaits, usage raisonnable</li>
                      <li>Art. 30 — Prévention de la fraude et plafonds</li>
                      <li>Art. 34 — Données personnelles</li>
                      <li>Art. 35 — Confidentialité</li>
                      <li>Art. 38 — Obligations et responsabilité du Client</li>
                      <li>Art. 39 — Responsabilité d’E2I</li>
                    </ul>
                  </div>

                  {/* Groupe 7 */}
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Fin de contrat et dispositions diverses
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm md:columns-2">
                      <li>Art. 36 — Propriété intellectuelle</li>
                      <li>Art. 37 — Réversibilité et fin des Services</li>
                      <li>Art. 40 — Assurance</li>
                      <li>Art. 41 — Force majeure</li>
                      <li>Art. 42 — Imprévision et continuité contractuelle</li>
                      <li>Art. 43 — Cession et sous-traitance</li>
                      <li>Art. 44 — Preuve et communications électroniques</li>
                      <li>Art. 45 — Réclamations et contestation de facture</li>
                      <li>Art. 46 — Modification des documents contractuels</li>
                      <li>Art. 47 — Nullité partielle et non-renonciation</li>
                      <li>Art. 48 — Droit applicable et règlement amiable</li>
                      <li>Art. 49 — Juridiction compétente</li>
                      <li>Art. 50 — Entrée en vigueur</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Ordre de priorité :</strong> en cas de contradiction entre
                    plusieurs documents, la Commande et ses dérogations acceptées
                    expressément prévalent, puis les Conditions particulières, puis les
                    présentes CGV, puis la documentation technique et commerciale.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contenu intégral des CGV en ligne */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <h2 className="text-xl font-bold">
                  Lire en ligne — Conditions générales de vente
                </h2>
              </CardHeader>
              <CardContent className="p-8">
                <CgvContent />
              </CardContent>
            </Card>

            <LegalHelpCard />
          </div>
        </div>
      </section>
    </>
  );
}

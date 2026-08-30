import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DownloadSimple,
  FileText,
  Shield,
  Lock,
  Globe,
  Users,
  Clock,
  Database,
  Seal,
} from "@/lib/icons";
import { COMPANY, LEGAL_LAST_UPDATE } from "@/lib/legal/company";
import { LegalBreadcrumb } from "@/components/legal/breadcrumb";

export const metadata: Metadata = pageMetadata({
  title: "Accord de sous-traitance RGPD | E2I VoIP",
  description:
    "Accord de sous-traitance RGPD (DPA) d’E2I ASSISTANCE : encadrement des traitements de données personnelles au sens de l’article 28 du RGPD.",
  keywords:
    "DPA, sous-traitance RGPD, article 28, E2I VoIP, données personnelles, RGPD",
  path: "/juridique/accord-sous-traitance-rgpd",
});

export default function AccordSousTraitanceRgpdPage() {
  return (
    <>
      <LegalBreadcrumb current="Accord de sous-traitance RGPD" />

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
              Accord de sous-traitance RGPD
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Annexe de conformité RGPD au sens de l’article 28 du Règlement (UE)
              2016/679 — conclu entre E2I (sous-traitant) et le Client (responsable
              de traitement).
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
                        Ce DPA fait partie du Contrat. Il s’applique pendant toute la
                        durée où E2I traite des Données personnelles pour le compte
                        du Client.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/documents/dpa-rgpd.pdf"
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
                    <h3 className="font-semibold text-gray-900">Sous-traitant</h3>
                  </div>
                  <p className="text-gray-600">
                    {COMPANY.legalName} · SIRET {COMPANY.siret}
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Lock size={24} className="text-red-600" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-900">Cadre juridique</h3>
                  </div>
                  <p className="text-gray-600">
                    Règlement (UE) 2016/679 · art. 28
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sommaire */}
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
                      Cadre et définitions
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 1 — Parties et objet</li>
                      <li>Art. 2 — Cadre contractuel et ordre de priorité</li>
                      <li>Art. 3 — Définitions</li>
                    </ul>
                  </div>

                  {/* Groupe 2 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Rôles et qualification
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 4 — Rôles respectifs des parties</li>
                      <li>Art. 5 — Traitements où E2I agit comme responsable</li>
                      <li>Art. 6 — Qualification des CDR et données de trafic</li>
                    </ul>
                  </div>

                  {/* Groupe 3 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Traitement et instructions
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 7 — Caractéristiques du Traitement</li>
                      <li>Art. 8 — Obligations générales du Client</li>
                      <li>Art. 9 — Instructions documentées</li>
                      <li>Art. 10 — Instruction contraire au droit</li>
                    </ul>
                  </div>

                  {/* Groupe 4 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Sécurité et habilitations
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 11 — Confidentialité des personnes autorisées</li>
                      <li>Art. 12 — Sécurité du Traitement</li>
                      <li>Art. 13 — Sécurité relevant du Client</li>
                      <li>Art. 14 — Gestion des habilitations</li>
                      <li>Art. 15 — Journalisation et traçabilité</li>
                      <li>Art. 16 — Sauvegardes</li>
                    </ul>
                  </div>

                  {/* Groupe 5 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Sous-traitants et transferts
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 17 — Sous-traitants ultérieurs : autorisation</li>
                      <li>Art. 18 — Information sur les sous-traitants ultérieurs</li>
                      <li>Art. 19 — Objection à un sous-traitant ultérieur</li>
                      <li>Art. 20 — Lieux de Traitement</li>
                      <li>Art. 21 — Transferts hors EEE</li>
                      <li>Art. 22 — Demandes d’autorités étrangères</li>
                    </ul>
                  </div>

                  {/* Groupe 6 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Droits des personnes et violations
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 23 — Droits des Personnes concernées</li>
                      <li>Art. 24 — Modalités d’assistance aux droits</li>
                      <li>Art. 25 — Analyses d’impact et consultation</li>
                      <li>Art. 26 — Violation de Données Client</li>
                      <li>Art. 27 — Gestion et notification réglementaire</li>
                    </ul>
                  </div>

                  {/* Groupe 7 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Contrôle et fin
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 28 — Assistance réglementaire et coopération</li>
                      <li>Art. 29 — Registre des activités de Traitement</li>
                      <li>Art. 30 — Audits</li>
                      <li>Art. 31 — Coûts et conclusions d’audit</li>
                      <li>Art. 32 — Sort des Données à la fin du Service</li>
                      <li>Art. 33 — Données conservées par E2I</li>
                      <li>Art. 34 — Réversibilité et moyens d’export</li>
                    </ul>
                  </div>

                  {/* Groupe 8 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Dispositions finales
                    </h3>
                    <ul className="text-gray-600 space-y-1 pl-4 text-sm">
                      <li>Art. 35 — Données sensibles et secteurs réglementés</li>
                      <li>Art. 36 — Modifications du DPA</li>
                      <li>Art. 37 — Responsabilité</li>
                      <li>Art. 38 — Contact relatif à la protection des Données</li>
                      <li>Art. 39 — Entrée en vigueur</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Ordre de priorité :</strong> en cas de contradiction sur la
                    protection des Données personnelles, le DPA prévaut sur les
                    Conditions particulières, puis sur les CGV. La Commande prévaut
                    si elle renforce expressément les garanties du DPA.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documents connexes */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <h2 className="text-xl font-bold">Documents connexes</h2>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Link
                    href="/juridique/conditions-generales-de-vente"
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    <FileText size={24} className="text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Conditions générales de vente</p>
                      <p className="text-sm text-gray-500">Page dédiée · v1.2</p>
                    </div>
                  </Link>
                  <Link
                    href="/juridique/politique-confidentialite"
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    <Shield size={24} className="text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Politique de confidentialité</p>
                      <p className="text-sm text-gray-500">Page dédiée · v1.1</p>
                    </div>
                  </Link>
                  <Link
                    href="/documents/conditions-particulieres-voip.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    <FileText size={24} className="text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Conditions particulières — VoIP</p>
                      <p className="text-sm text-gray-500">PDF · v1.1</p>
                    </div>
                  </Link>
                  <Link
                    href="/documents/conditions-particulieres-trunk-sip.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    <FileText size={24} className="text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Conditions particulières — Trunk SIP</p>
                      <p className="text-sm text-gray-500">PDF · v1.1</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

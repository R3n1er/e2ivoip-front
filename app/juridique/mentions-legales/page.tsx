import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TextT, MapPin, Globe, Question, Phone } from "@/lib/icons";
import { COMPANY, HOSTING, LEGAL_LAST_UPDATE } from "@/lib/legal/company";
import { LegalBreadcrumb } from "@/components/legal/breadcrumb";
import { LegalHelpCard } from "@/components/legal/help-card";

export const metadata: Metadata = {
  title: "Mentions légales - E2I VoIP",
  description:
    "Mentions légales d’E2I ASSISTANCE (E2I VoIP) : éditeur du site, directeur de la publication, hébergeur, propriété intellectuelle et droit applicable.",
  keywords:
    "mentions légales, E2I VoIP, E2I ASSISTANCE, éditeur, hébergeur, propriété intellectuelle",
  alternates: { canonical: "https://www.e2i-voip.com/juridique/mentions-legales" },
  openGraph: {
    title: "Mentions légales - E2I VoIP",
    description:
      "Mentions légales et informations juridiques d’E2I ASSISTANCE (E2I VoIP).",
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
      <LegalBreadcrumb current="Mentions légales" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 overflow-hidden">
        <div className="absolute inset-0">
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
              Mentions légales
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Informations juridiques relatives au site {COMPANY.siteUrl},
              publiées en application de la loi pour la confiance dans
              l&rsquo;économie numérique.
            </p>
          </div>
        </div>
      </section>

      {/* Éditeur et hébergement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                <span className="text-red-600">Éditeur</span> du site
              </h2>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold">
                    {COMPANY.legalName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Shield
                        size={24}
                        className="text-red-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Directeur de la publication
                        </h3>
                        <p className="text-gray-600">
                          {COMPANY.publicationDirector}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TextT
                        size={24}
                        className="text-red-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Immatriculation
                        </h3>
                        <p className="text-gray-600">
                          SIRET {COMPANY.siret}
                          <br />
                          RCS {COMPANY.rcs}
                          <br />
                          Code APE {COMPANY.ape} — {COMPANY.apeLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin
                        size={24}
                        className="text-red-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Siège social
                        </h3>
                        <p className="text-gray-600">
                          {COMPANY.address.street}
                          <br />
                          {COMPANY.address.postalCode} {COMPANY.address.city}
                          <br />
                          {COMPANY.address.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone
                        size={24}
                        className="text-red-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">Contact</h3>
                        <p className="text-gray-600">
                          Par téléphone dans votre région (voir ci-dessous) ou
                          via notre{" "}
                          <Link
                            href="/contact"
                            className="text-red-600 underline"
                          >
                            formulaire de contact
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                <span className="text-red-600">Hébergement</span>
              </h2>
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Globe
                        size={32}
                        className="text-blue-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Hébergeur du site
                        </h3>
                        <p className="text-gray-600">
                          {HOSTING.provider}
                          <br />
                          {HOSTING.address}
                          <br />
                          {HOSTING.site}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Globe
                        size={32}
                        className="text-green-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Gestion du nom de domaine
                        </h3>
                        <p className="text-gray-600">
                          {HOSTING.registrar}
                          <br />
                          {HOSTING.registrarAddress}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Données personnelles — renvoi vers la politique */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Données personnelles et{" "}
              <span className="text-red-600">cookies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Le détail figure dans notre politique de confidentialité, qui
              fait foi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Question size={24} className="mr-2" aria-hidden="true" />
                  Cookies et traceurs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    Notre outil de mesure d&rsquo;audience ne dépose aucun
                    traceur avant votre acceptation : le bandeau affiché à
                    votre première visite vous permet d&rsquo;accepter ou de
                    refuser, et le refus est le comportement par défaut tant
                    que vous n&rsquo;avez pas choisi. Le chat en ligne fait
                    exception : son script est chargé dès l&rsquo;ouverture de
                    la page et dépose ses propres cookies avant tout choix.
                  </p>
                  <p>
                    Vous pouvez revenir sur votre choix à tout moment via le
                    lien <strong>« Gérer mes cookies »</strong> en pied de page.
                    La liste des traceurs figure dans la{" "}
                    <Link
                      href="/juridique/politique-confidentialite"
                      className="text-red-600 underline"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Shield size={24} className="mr-2" aria-hidden="true" />
                  Vos droits
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    {COMPANY.legalName} est responsable du traitement des
                    données collectées sur ce site. Vous disposez d&rsquo;un
                    droit d&rsquo;accès, de rectification, d&rsquo;effacement,
                    de limitation, de portabilité et d&rsquo;opposition.
                  </p>
                  <p>
                    Pour les exercer, utilisez notre{" "}
                    <Link
                      href="/juridique/exercer-mes-droits"
                      className="text-red-600 underline"
                    >
                      formulaire dédié
                    </Link>
                    . Une réponse vous est adressée dans un délai d&rsquo;un
                    mois.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Propriété intellectuelle et responsabilité */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              <span className="text-red-600">Propriété intellectuelle</span> et
              responsabilité
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold">
                  Propriété intellectuelle
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    L&rsquo;ensemble de ce site relève de la législation
                    française et internationale sur le droit d&rsquo;auteur et
                    la propriété intellectuelle. Tous les droits de reproduction
                    sont réservés, y compris pour les documents téléchargeables
                    et les représentations iconographiques et visuelles.
                  </p>
                  <p>
                    La reproduction de tout ou partie de ce site sur quelque
                    support que ce soit est interdite sans autorisation
                    expresse. Les marques et logos cités, notamment 3CX et
                    Yeastar, appartiennent à leurs titulaires respectifs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold">
                  Responsabilité et liens externes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    Les informations publiées sur ce site sont fournies à titre
                    indicatif. Les descriptions de services, tarifs et
                    disponibilités ne constituent pas une offre contractuelle :
                    seul un devis signé engage {COMPANY.legalName}.
                  </p>
                  <p>
                    Ce site peut renvoyer vers des sites tiers dont nous ne
                    maîtrisons ni le contenu ni les pratiques en matière de
                    données. Leur consultation relève de votre seule
                    responsabilité.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold">
                  Droit applicable et litiges
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    Les présentes mentions légales sont régies par le droit
                    français. En cas de litige, une solution amiable sera
                    recherchée avant toute action contentieuse.
                  </p>
                  <p>
                    Conformément au règlement (UE) n° 524/2013, la Commission
                    européenne met à disposition une plateforme de règlement en
                    ligne des litiges, accessible à l&rsquo;adresse{" "}
                    <a
                      href="https://ec.europa.eu/consumers/odr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline"
                    >
                      ec.europa.eu/consumers/odr
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-gray-secondary text-center">
              Dernière mise à jour : {LEGAL_LAST_UPDATE}
            </p>

            <LegalHelpCard />
          </div>
        </div>
      </section>

      {/* Section Certification */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
              Nous sommes <span className="text-red-600">certifiés</span> !
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              E2I Assistance est partenaire 3CX Silver et certifié ! Visitez le
              site internet de notre partenaire et souscrivez à une version
              d&rsquo;évaluation du standard téléphonique.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg inline-block">
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <Badge variant="secondary" className="text-sm">
                  3CX Silver Partner
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact par région */}
      <section className="py-16 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-4">
              Nos implantations
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Contactez-nous dans votre région
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact) => (
              <Card
                key={contact.region}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone size={24} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {contact.region}
                  </h3>
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

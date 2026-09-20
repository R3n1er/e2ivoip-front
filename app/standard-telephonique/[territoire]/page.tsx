import { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { FaqSection } from "@/components/faq-section";
import { PhoneLink } from "@/components/ui/phone-link";
import { buildTerritoryFaq } from "@/lib/faq-data";
import {
  getPublishedTerritories,
  getTerritory,
  copperSentence,
  standardTelephoneHref,
} from "@/lib/territoires/standard-telephonique";
import { serviceSchema } from "@/lib/structured-data";
import { COMPANY } from "@/lib/legal/company";
import {
  CheckCircle,
  Phone,
  MapPin,
  Shield,
  ArrowRight,
  Warning,
  Buildings,
  Certificate,
} from "@/lib/icons";

type PageProps = { params: Promise<{ territoire: string }> };

/**
 * Page territoriale — une route dynamique, N pages statiques.
 *
 * Un fichier par territoire aurait multiplié par quatre le coût de chaque
 * correction factuelle, et la revue croisée de septembre a montré que ce
 * sont précisément les corrections répétées qui se perdent en route.
 *
 * ⚠️ Le slug est validé contre le registre avant tout rendu : un territoire
 * non déclaré ou `published: false` renvoie un 404 réel, jamais une page
 * générique — celle-ci serait indexable, et c'est exactement la page
 * satellite que le registre refuse de produire.
 */
function loadTerritory(slug: string) {
  const territory = getTerritory(slug);
  if (!territory || !territory.published) {
    notFound();
  }
  return territory;
}

/** Les pages réellement générées au build : les territoires publiés. */
export function generateStaticParams() {
  return getPublishedTerritories().map((t) => ({ territoire: t.slug }));
}

/**
 * Tout slug hors de `generateStaticParams` renvoie 404 sans rendu : c'est la
 * garantie qu'aucune URL /standard-telephonique/<inventé> ne répond 200.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { territoire } = await params;
  const t = loadTerritory(territoire);
  return pageMetadata({
    title: t.title,
    description: t.description,
    keywords: `standard téléphonique ${t.label}, standard téléphonique entreprise ${t.label}, installateur téléphonie ${t.label}, remplacer standard téléphonique ${t.label}, PABX ${t.label}, téléphonie IP ${t.indicatif}`,
    path: standardTelephoneHref(t.slug),
  });
}

export default async function StandardTelephoniqueTerritoirePage({
  params,
}: PageProps) {
  const { territoire } = await params;
  const t = loadTerritory(territoire);
  const faq = buildTerritoryFaq(t);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero — preuve locale above the fold : ce qu'un concurrent hors-sol
            ne peut pas revendiquer. */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-primary/10 border border-red-primary/20 text-red-primary text-sm font-medium mb-6">
                <MapPin size={16} className="mr-2" aria-hidden="true" />
                {t.label} ·{" "}
                <span className="font-mono tabular-nums ml-1">
                  {t.phone.number}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Standard téléphonique d&apos;entreprise{" "}
                <span className="text-red-primary">
                  {t.preposition} {t.label}
                </span>
              </h1>
              <p className="text-xl text-gray-secondary leading-relaxed mb-8">
                Migration de votre PABX, portabilité de vos numéros{" "}
                {t.indicatif} et accompagnement par un opérateur{" "}
                {t.presence === "established"
                  ? "établi à Cayenne"
                  : "des DOM, établi à Cayenne"}
                . {t.copper.alreadyClosed.length > 0 ? (
                  <>
                    {t.preposition === "à" ? "À" : "En"} {t.label}, la
                    fermeture du cuivre a déjà commencé :{" "}
                    <strong>{copperSentence(t.copper)}</strong>.
                  </>
                ) : (
                  <>
                    {t.preposition === "à" ? "À" : "En"} {t.label}, le
                    calendrier du cuivre est publié :{" "}
                    <strong>{copperSentence(t.copper)}</strong>.
                  </>
                )}{" "}
                La date de votre commune se vérifie au cas par cas.
              </p>

              {/* Preuve locale vérifiable */}
              <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: Buildings,
                    text: `Siège social à ${COMPANY.address.city} — ${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.city}`,
                  },
                  {
                    icon: Certificate,
                    // « immatriculée en Guyane » n'est PAS interpolé : E2I VoIP
                    // n'a qu'une immatriculation, en Guyane. L'écrire avec
                    // {t.label} produirait « immatriculée en Martinique », une
                    // mention d'établissement fausse — L121-2 du code de la
                    // consommation. Le SIRET reste en IBM Plex Mono +
                    // tabular-nums, comme toute donnée chiffrée du site.
                    text: (
                      <>
                        Entreprise immatriculée en Guyane · SIRET{" "}
                        <span className="font-mono tabular-nums">
                          {COMPANY.siret}
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: Phone,
                    text: `Ligne fixe locale ${t.indicatif}, support sur ${t.supportTimezone}`,
                  },
                  {
                    icon: Shield,
                    text: "Hébergement France / UE, conforme RGPD",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon
                      size={20}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA principal en conseil, pas en devis : la ligne éditoriale
                  réserve « Demander un devis » au CTA secondaire. */}
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton href="/contact">Parler à un expert DOM</CTAButton>
                <CTAButtonMarine
                  href={`/devis-en-ligne?service=standard-telephonique-${t.slug}`}
                  icon="ArrowRight"
                >
                  Demander un devis
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Urgence cuivre — donnée locale datée et sourcée */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
              {t.preposition === "à" ? "À" : "En"} {t.label}, le cuivre ferme
              commune par commune
              {t.copper.alreadyClosed[0] ? (
                <>
                  {" — "}
                  <span className="text-red-primary">
                    {t.copper.alreadyClosed[0].commune} est déjà coupée
                  </span>
                </>
              ) : (
                "."
              )}
            </h2>
            <div className="max-w-4xl space-y-4 text-lg text-gray-600 leading-relaxed">
              {/* L'énumération passe par `copperSentence` : la version
                  précédente concaténait les communes sans séparateur, ce qui
                  ne se voyait pas en Guyane (une commune par liste) mais
                  aurait collé « Basse-Terre…Deshaies… » en Guadeloupe. */}
              <p>
                {t.subjectLabel} relève du <strong>{t.copper.lot}</strong>{" "}
                du plan de fermeture piloté
                par Orange sous contrôle de l&apos;Arcep. Ce plan avance{" "}
                <strong>commune par commune</strong>, pas par département :{" "}
                {copperSentence(t.copper)}. Les autres communes n&apos;ont pas
                encore de date publiée.
              </p>
              <p>
                À cette date, les installations raccordées au cuivre cessent de
                fonctionner. Cela concerne le téléphone et l&apos;ADSL, mais
                aussi les équipements branchés sur la même paire : fax, alarmes,
                terminaux de paiement, télésurveillance. Un standard analogique
                devient alors inutilisable.
              </p>
            </div>

            <div className="mt-8 max-w-4xl rounded-lg border border-red-primary/20 bg-red-primary/5 p-6">
              <div className="flex items-start gap-3">
                <Warning
                  size={24}
                  className="text-red-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-gray-700">
                  <p className="font-semibold mb-2">
                    La date exacte dépend de votre commune
                  </p>
                  <p>
                    Le plan procède par lots de communes : deux communes
                    d&apos;un même territoire peuvent basculer à des dates
                    différentes. La date
                    qui vous concerne se vérifie commune par commune sur le
                    calendrier officiel — c&apos;est ce que nous faisons lors de
                    l&apos;audit.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-secondary">
              Source :{" "}
              <a
                href={t.copper.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-primary hover:underline"
              >
                {t.copper.sourceLabel}
              </a>
            </p>
          </div>
        </section>

        {/* Zones d'intervention */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Nos zones d&apos;intervention{" "}
              {t.preposition}{" "}
              <span className="text-red-primary">{t.label}</span>
            </h2>
            <p className="text-lg text-gray-secondary mb-8 max-w-3xl">
              Selon la nature du chantier, l&apos;installation se fait à distance
              ou sur site. Les besoins qui exigent un déplacement sont qualifiés
              lors de l&apos;audit préalable.
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.zones.map((zone) => (
                <li
                  key={zone}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-100"
                >
                  <MapPin
                    size={18}
                    className="text-red-primary shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-gray-700 font-medium">{zone}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contexte local — ce qui rend la page non duplicable */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
              Un standard adapté à la réalité{" "}
              <span className="text-red-primary">{t.adjective}</span>
            </h2>
            <div className="max-w-4xl space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>{t.context}</p>
              {/* Les villes citées sont celles du territoire courant : la
                  version précédente nommait Cayenne, Kourou et
                  Saint-Laurent-du-Maroni, ce qui aurait été faux partout
                  ailleurs. */}
              <p>
                Le climat et l&apos;éloignement des sites comptent aussi : entre{" "}
                {t.zones.slice(0, 3).join(", ")}, envoyer un technicien prend du
                temps. Un standard hébergé se maintient et se reconfigure à
                distance, ce qui réduit les interventions sur site au strict
                nécessaire.
              </p>
            </div>

            {t.localProof.length > 0 && (
              <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-8">
                <h3 className="text-xl font-bold text-gray-dark mb-4">
                  Ils nous font confiance{" "}
                  {t.preposition} {t.label}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {t.localProof.map((p) => (
                    <li key={p.client} className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        className="text-red-primary shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-semibold text-gray-dark">
                          {p.client}
                        </p>
                        <p className="text-sm text-gray-secondary">
                          {p.sector}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Offres disponibles sur le territoire */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Ce que nous installons{" "}
              {t.preposition}{" "}
              <span className="text-red-primary">{t.label}</span>
            </h2>
            <p className="text-lg text-gray-secondary mb-10 max-w-3xl">
              Toutes les briques d&apos;un standard moderne, avec des numéros
              locaux {t.indicatif} et la portabilité de vos numéros existants.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Standard hébergé",
                  text: "Aucun matériel chez vous, facturé par utilisateur et par mois. Accueil, transfert, messagerie et poste sur ordinateur ou mobile.",
                  href: "/telephonie-entreprise/3cx-smb-mutualisee",
                  linkLabel: "Voir l'offre hébergée",
                },
                {
                  title: "Instance dédiée",
                  text: "Votre serveur de téléphonie isolé, avec vos règles de routage, vos files d'attente et votre supervision qualité d'appel.",
                  href: "/telephonie-3cx",
                  linkLabel: "Voir les solutions dédiées",
                },
                {
                  title: "Raccordement au réseau",
                  text: `Le lien vers le réseau public, facturé au canal d'appel simultané. Numéros ${t.indicatif} locaux et portabilité gratuite.`,
                  href: "/telephonie-entreprise/trunk-sip-compteur",
                  linkLabel: "Voir les raccordements",
                },
                {
                  title: "Postes et matériel",
                  text: "Postes IP, DECT et téléphones sans fil, choisis selon vos locaux. Les postes physiques restent utiles à l'accueil.",
                  href: "/telephonie-entreprise/pbx-yeastar",
                  linkLabel: "Voir le matériel",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item.text}
                  </p>
                  <NextLink
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm text-red-primary hover:gap-2 transition-all"
                  >
                    {item.linkLabel} <ArrowRight size={14} aria-hidden="true" />
                  </NextLink>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-700">
                <strong>Une question technique avant de décider ?</strong>{" "}
                Appelez notre ligne {t.adjective} :{" "}
                <PhoneLink phone={t.phone} className="text-red-primary font-mono" />
              </p>
            </div>
          </div>
        </section>

        <FaqSection
          items={faq}
          title={`Questions fréquentes — ${t.label}`}
          subtitle={`Ce que les entreprises ${t.adjective}s nous demandent avant de basculer`}
        />

        <ContactSectionSimple />
      </main>

      <JsonLd
        data={{
          ...serviceSchema({
            name: `Standard téléphonique d'entreprise en ${t.label}`,
            description: t.description,
            path: standardTelephoneHref(t.slug),
          }),
          areaServed: t.zones.map((zone) => ({
            "@type": "City",
            name: zone,
          })),
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: {
              "@type": "ContactPoint",
              telephone: t.phone.tel,
              contactType: "customer service",
              areaServed: t.label,
              availableLanguage: "French",
            },
          },
        }}
      />
    </div>
  );
}

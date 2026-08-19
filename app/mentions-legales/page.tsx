import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { ThreeCXBadge } from "@/components/ui/3cx-badge";
import { Buildings, Globe, Phone, Shield } from "@/lib/icons";
import {
  COMPANY,
  COOKIES,
  HOSTING,
  LEGAL_LAST_UPDATE,
  NON_TRACKING_TOOLS,
} from "@/lib/legal/company";

export const metadata: Metadata = {
  title: "Mentions légales - E2I VoIP",
  description:
    "Mentions légales d’E2I ASSISTANCE (E2I VoIP) : éditeur du site, directeur de la publication, hébergeur, nom de domaine, traceurs, propriété intellectuelle et droit applicable.",
  keywords:
    "mentions légales, E2I VoIP, E2I ASSISTANCE, éditeur, hébergeur, cookies, propriété intellectuelle",
  alternates: { canonical: "https://www.e2i-voip.com/mentions-legales" },
  openGraph: {
    title: "Mentions légales - E2I VoIP",
    description:
      "Mentions légales et informations juridiques d’E2I ASSISTANCE (E2I VoIP).",
    type: "website",
  },
};

/**
 * Sommaire de la page. Une page légale se consulte pour vérifier un point
 * précis, pas pour être lue en entier : l'ancre est la fonction principale.
 */
const SECTIONS = [
  { id: "editeur", number: "01", title: "Éditeur du site" },
  { id: "hebergement", number: "02", title: "Hébergement et nom de domaine" },
  { id: "cookies", number: "03", title: "Cookies et traceurs" },
  { id: "donnees", number: "04", title: "Données personnelles et droits" },
  { id: "propriete", number: "05", title: "Propriété intellectuelle" },
  { id: "responsabilite", number: "06", title: "Responsabilité et litiges" },
] as const;

const IMPLANTATIONS = [
  { region: "Guyane", phone: "+594 594 963 500" },
  { region: "Guadeloupe", phone: "+590 590 173 500" },
  { region: "Martinique", phone: "+596 596 313 500" },
  { region: "La Réunion", phone: "+262 263 085 500" },
] as const;

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-gray-secondary/25 pt-10"
    >
      <div className="flex items-baseline gap-4">
        <span
          className="font-mono text-sm tabular-nums text-red-primary"
          aria-hidden="true"
        >
          {number}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-dark">
          {title}
        </h2>
      </div>
      <div className="mt-6 space-y-5 text-gray-dark leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/** Champ d'identité : libellé discret, valeur en évidence. */
function Field({
  label,
  children,
  mono = false,
}: {
  label: string;
  children: ReactNode;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-secondary">
        {label}
      </dt>
      <dd
        className={`mt-1.5 text-gray-dark ${
          mono ? "font-mono text-sm tabular-nums" : ""
        }`}
      >
        {children}
      </dd>
    </div>
  );
}

export default function MentionsLegales() {
  return (
    <>
      {/* Hero — dégradé de marque, réservé à cette seule section de la page */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Informations juridiques
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Mentions légales
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
              Qui édite {COMPANY.siteUrl}, qui l&rsquo;héberge, et ce que le
              site dépose sur votre terminal. Publié en application de la loi
              pour la confiance dans l&rsquo;économie numérique.
            </p>
            <p className="mt-6 font-mono text-xs tabular-nums uppercase tracking-[0.14em] text-white/70">
              Dernière mise à jour : {LEGAL_LAST_UPDATE}
            </p>
          </div>
        </div>
      </section>

      {/* Document légal : sommaire ancré + corps de texte */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
            <nav
              aria-label="Sommaire"
              className="min-w-0 lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-secondary">
                Sommaire
              </p>
              <ol className="mt-5 space-y-3">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex gap-3 text-sm text-gray-dark transition-colors hover:text-red-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-primary"
                    >
                      <span
                        className="font-mono text-xs tabular-nums text-gray-secondary transition-colors group-hover:text-red-primary"
                        aria-hidden="true"
                      >
                        {section.number}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* min-w-0 : sans cela, le tableau des traceurs impose sa largeur
                à toute la colonne et fait déborder la page sur mobile. */}
            <div className="min-w-0 space-y-12">
              {/* 01 — Éditeur */}
              <LegalSection
                id="editeur"
                number="01"
                title="Éditeur du site"
              >
                <div className="flex items-center gap-3">
                  <Buildings
                    size={24}
                    className="text-red-primary flex-shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-xl font-bold text-gray-dark">
                    {COMPANY.legalName}
                    <span className="ml-2 font-normal text-gray-secondary">
                      ({COMPANY.brand})
                    </span>
                  </p>
                </div>

                <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  <Field label="SIRET" mono>
                    {COMPANY.siret}
                  </Field>
                  <Field label="Immatriculation">
                    {COMPANY.registry}
                    <br />
                    <span className="font-mono text-sm tabular-nums text-gray-secondary">
                      SIREN {COMPANY.siren}
                    </span>
                  </Field>
                  <Field label="Code APE" mono>
                    {COMPANY.ape}{" "}
                    <span className="font-sans text-base text-gray-secondary">
                      {COMPANY.apeLabel}
                    </span>
                  </Field>
                  <Field label="Directeur de la publication">
                    {COMPANY.publicationDirector}
                  </Field>
                  <Field label="Siège social">
                    {COMPANY.address.street}
                    <br />
                    {COMPANY.address.postalCode} {COMPANY.address.city}
                    <br />
                    {COMPANY.address.country}
                  </Field>
                  <Field label="Contact">
                    Par téléphone dans votre région (
                    <a href="#implantations" className="text-red-primary underline">
                      voir nos implantations
                    </a>
                    ) ou via le{" "}
                    <Link href="/contact" className="text-red-primary underline">
                      formulaire de contact
                    </Link>
                    .
                  </Field>
                </dl>
              </LegalSection>

              {/* 02 — Hébergement */}
              <LegalSection
                id="hebergement"
                number="02"
                title="Hébergement et nom de domaine"
              >
                <p className="max-w-[68ch]">
                  L&rsquo;hébergement des pages et la gestion du nom de domaine
                  relèvent de deux prestataires distincts.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border border-gray-secondary/25 p-6">
                    <div className="flex items-center gap-2.5">
                      <Globe
                        size={20}
                        className="text-red-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                      <h3 className="font-semibold text-gray-dark">
                        Hébergeur du site
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-dark">
                      {HOSTING.provider}
                      <br />
                      {HOSTING.address}
                      <br />
                      <span className="text-gray-secondary">{HOSTING.site}</span>
                    </p>
                  </div>
                  <div className="border border-gray-secondary/25 p-6">
                    <div className="flex items-center gap-2.5">
                      <Globe
                        size={20}
                        className="text-blue-marine flex-shrink-0"
                        aria-hidden="true"
                      />
                      <h3 className="font-semibold text-gray-dark">
                        Gestion du nom de domaine
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-dark">
                      {HOSTING.registrar}
                      <br />
                      {HOSTING.registrarAddress}
                      <br />
                      <span className="text-gray-secondary">
                        {HOSTING.registrarSite}
                      </span>
                    </p>
                  </div>
                </div>
              </LegalSection>

              {/* 03 — Cookies */}
              <LegalSection
                id="cookies"
                number="03"
                title="Cookies et traceurs"
              >
                <p className="max-w-[68ch]">
                  Aucun traceur de mesure d&rsquo;audience n&rsquo;est déposé
                  avant votre acceptation : le refus est le comportement par
                  défaut tant que vous n&rsquo;avez pas choisi. Vous pouvez
                  revenir sur votre décision à tout moment via le lien{" "}
                  <strong className="font-semibold">« Gérer mes cookies »</strong>{" "}
                  en pied de page.
                </p>

                <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Traceurs déposés par le site, leur origine, leur finalité
                      et leur durée de conservation
                    </caption>
                    <thead>
                      <tr className="border-b border-gray-dark/25 text-xs uppercase tracking-[0.12em] text-gray-secondary">
                        <th scope="col" className="py-3 pr-6 font-semibold">
                          Traceur
                        </th>
                        <th scope="col" className="py-3 pr-6 font-semibold">
                          Origine
                        </th>
                        <th scope="col" className="py-3 pr-6 font-semibold">
                          Finalité
                        </th>
                        <th scope="col" className="py-3 pr-6 font-semibold">
                          Durée
                        </th>
                        <th scope="col" className="py-3 font-semibold">
                          Consentement
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COOKIES.map((cookie) => (
                        <tr
                          key={cookie.name}
                          className="border-b border-gray-secondary/20 align-top"
                        >
                          <th
                            scope="row"
                            className="py-4 pr-6 font-mono text-xs font-normal text-gray-dark"
                          >
                            {cookie.name}
                          </th>
                          <td className="py-4 pr-6 text-gray-dark">
                            {cookie.origin}
                          </td>
                          <td className="py-4 pr-6 text-gray-secondary">
                            {cookie.purpose}
                          </td>
                          <td className="py-4 pr-6 text-gray-secondary">
                            {cookie.retention}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                cookie.requiresConsent
                                  ? "border-red-primary/40 text-red-primary"
                                  : "border-gray-secondary/40 text-gray-secondary"
                              }`}
                            >
                              {cookie.requiresConsent ? "Requis" : "Non requis"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border border-gray-secondary/25 bg-gray-50 p-6">
                  <h3 className="font-semibold text-gray-dark">
                    Outils qui ne déposent rien sur votre terminal
                  </h3>
                  <dl className="mt-4 space-y-4">
                    {NON_TRACKING_TOOLS.map((tool) => (
                      <div key={tool.name}>
                        <dt className="text-sm font-semibold text-gray-dark">
                          {tool.name}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-gray-secondary">
                          {tool.purpose} {tool.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </LegalSection>

              {/* 04 — Données personnelles */}
              <LegalSection
                id="donnees"
                number="04"
                title="Données personnelles et droits"
              >
                <p className="max-w-[68ch]">
                  {COMPANY.legalName} est responsable du traitement des données
                  collectées sur ce site. Vous disposez d&rsquo;un droit
                  d&rsquo;accès, de rectification, d&rsquo;effacement, de
                  limitation, de portabilité et d&rsquo;opposition.
                </p>
                <p className="max-w-[68ch]">
                  Le détail des traitements, des durées de conservation et des
                  sous-traitants figure dans notre{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-red-primary underline"
                  >
                    politique de confidentialité
                  </Link>
                  , qui fait foi. Pour exercer vos droits, utilisez le{" "}
                  <Link
                    href="/exercer-mes-droits"
                    className="text-red-primary underline"
                  >
                    formulaire dédié
                  </Link>{" "}
                  : une réponse vous est adressée dans un délai d&rsquo;un mois.
                </p>
              </LegalSection>

              {/* 05 — Propriété intellectuelle */}
              <LegalSection
                id="propriete"
                number="05"
                title="Propriété intellectuelle"
              >
                <p className="max-w-[68ch]">
                  L&rsquo;ensemble de ce site relève de la législation française
                  et internationale sur le droit d&rsquo;auteur et la propriété
                  intellectuelle. Tous les droits de reproduction sont réservés,
                  y compris pour les documents téléchargeables et les
                  représentations iconographiques et visuelles.
                </p>
                <p className="max-w-[68ch]">
                  La reproduction de tout ou partie de ce site sur quelque
                  support que ce soit est interdite sans autorisation expresse.
                  Les marques et logos cités, notamment 3CX et Yeastar,
                  appartiennent à leurs titulaires respectifs.
                </p>
              </LegalSection>

              {/* 06 — Responsabilité */}
              <LegalSection
                id="responsabilite"
                number="06"
                title="Responsabilité et litiges"
              >
                <p className="max-w-[68ch]">
                  Les informations publiées sur ce site sont fournies à titre
                  indicatif. Les descriptions de services, tarifs et
                  disponibilités ne constituent pas une offre contractuelle :
                  seul un devis signé engage {COMPANY.legalName}. Ce site peut
                  renvoyer vers des sites tiers dont nous ne maîtrisons ni le
                  contenu ni les pratiques en matière de données.
                </p>
                <p className="max-w-[68ch]">
                  Les présentes mentions légales sont régies par le droit
                  français. En cas de litige, une solution amiable sera
                  recherchée avant toute action contentieuse. Conformément au
                  règlement (UE) n° 524/2013, la Commission européenne met à
                  disposition une plateforme de règlement en ligne des litiges,
                  accessible à l&rsquo;adresse{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-primary underline"
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                  .
                </p>
              </LegalSection>
            </div>
          </div>
        </div>
      </section>

      {/* Certification 3CX */}
      <section className="py-16 bg-gray-50 border-t border-gray-secondary/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[52ch]">
              <div className="flex items-center gap-2.5">
                <Shield
                  size={20}
                  className="text-red-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-secondary">
                  Partenaire certifié
                </p>
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-dark">
                {COMPANY.legalName} est partenaire 3CX Silver
              </h2>
              <p className="mt-4 leading-relaxed text-gray-secondary">
                Nos équipes sont certifiées sur le standard téléphonique 3CX.
                Consultez le site de notre partenaire pour souscrire à une
                version d&rsquo;évaluation.
              </p>
            </div>
            <ThreeCXBadge />
          </div>
        </div>
      </section>

      {/* Implantations */}
      <section id="implantations" className="scroll-mt-28 py-16 bg-blue-marine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white">
            Nos implantations
          </h2>
          <p className="mt-3 text-white/70">
            Un interlocuteur dans votre région, aux horaires de votre région.
          </p>

          <ul className="mt-10 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {IMPLANTATIONS.map((implantation) => (
              <li key={implantation.region} className="bg-blue-marine p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                  {implantation.region}
                </p>
                <a
                  href={`tel:${implantation.phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 font-mono text-base tabular-nums text-white transition-colors hover:text-red-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Phone size={18} aria-hidden="true" />
                  {implantation.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

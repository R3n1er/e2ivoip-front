import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Lock, Globe, Timer } from "@/lib/icons";
import {
  COMPANY,
  HOSTING,
  LEGAL_LAST_UPDATE,
  PROCESSINGS,
  SUB_PROCESSORS,
  COOKIES,
  COOKIE_CONSENT_LABELS,
} from "@/lib/legal/company";
import { RGPD_RIGHTS } from "@/lib/rgpd/rights";
import { LegalBreadcrumb } from "@/components/legal/breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité | E2I VoIP",
  description:
    "Politique de confidentialité d’E2I ASSISTANCE : traitements mis en œuvre, bases légales, durées de conservation, sous-traitants et exercice de vos droits RGPD.",
  keywords:
    "politique de confidentialité, RGPD, protection des données, sous-traitants, cookies, E2I VoIP",
  alternates: {
    canonical: "https://www.e2i-voip.com/juridique/politique-confidentialite",
  },
  openGraph: {
    title: "Politique de confidentialité | E2I VoIP",
    description:
      "Comment E2I ASSISTANCE traite et protège vos données personnelles.",
    type: "website",
  },
};

/**
 * Titre de section homogène sur toute la page.
 *
 * Le titre est un `h2` et non un `CardTitle` : ce dernier rend un `h3`, ce
 * qui casserait la hiérarchie h1 → h2 → h3 dont dépendent les lecteurs
 * d'écran et l'indexation d'une page aussi longue.
 */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 text-white rounded-t-lg">
        <h2 className="text-xl font-bold leading-none tracking-tight">
          {title}
        </h2>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <LegalBreadcrumb current="Politique de confidentialité" />

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
              Politique de confidentialité
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Quelles données {COMPANY.legalName} collecte sur{" "}
              <strong className="text-white">{COMPANY.siteUrl}</strong>, pourquoi,
              pour combien de temps, et comment reprendre la main dessus.
            </p>
            <p className="mt-4 text-sm text-white/80 max-w-2xl mx-auto">
              Cette politique s’applique uniquement au site internet{" "}
              {COMPANY.siteUrl}. Pour les traitements réalisés dans le cadre de
              nos Services contractuels (VoIP, IPBX, Trunk SIP), se référer à
              l’
              <Link
                href="/juridique/accord-sous-traitance-rgpd"
                className="text-white underline"
              >
                accord de sous-traitance RGPD
              </Link>
              .
            </p>
            <p className="mt-6 text-sm text-white/80">
              Dernière mise à jour : {LEGAL_LAST_UPDATE}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Responsable du traitement */}
            <SectionCard title="1. Qui est responsable de vos données">
              <div className="space-y-4 text-gray-600">
                <p>
                  Le responsable de traitement est :{" "}
                  <strong className="text-gray-900">
                    EI Alban RENIER — E2I ASSISTANCE exploitant la marque{" "}
                    {COMPANY.brand}
                  </strong>
                  . L’entreprise individuelle est domiciliée au{" "}
                  {COMPANY.address.street}, {COMPANY.address.postalCode}{" "}
                  {COMPANY.address.city}, {COMPANY.address.country}, et est
                  immatriculée sous le SIRET {COMPANY.siret}. Elle est
                  responsable des traitements décrits dans cette politique,
                  qui ne concernent que le site internet {COMPANY.siteUrl}.
                </p>
                <p>
                  Nous n&rsquo;avons pas désigné de délégué à la protection des
                  données : notre activité ne relève d&rsquo;aucun des cas où
                  cette désignation est obligatoire (article 37 du RGPD). Vos
                  demandes sont traitées par la direction, via le{" "}
                  <Link
                    href="/juridique/exercer-mes-droits"
                    className="text-red-600 underline"
                  >
                    formulaire d&rsquo;exercice des droits
                  </Link>
                  .
                </p>
              </div>
            </SectionCard>

            {/* Traitements */}
            <SectionCard title="2. Ce que nous traitons, et sur quelle base">
              <p className="mb-6 text-gray-600">
                Chaque traitement répond à une finalité précise. Nous ne
                collectons jamais de données « au cas où ».
              </p>
              <div className="space-y-6">
                {PROCESSINGS.map((processing) => (
                  <div
                    key={processing.purpose}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <h3 className="mb-3 font-semibold text-gray-900">
                      {processing.purpose}
                    </h3>
                    <dl className="space-y-2 text-sm text-gray-600">
                      <div>
                        <dt className="inline font-medium text-gray-900">
                          Base légale :{" "}
                        </dt>
                        <dd className="inline">{processing.legalBasis}</dd>
                      </div>
                      <div>
                        <dt className="inline font-medium text-gray-900">
                          Données :{" "}
                        </dt>
                        <dd className="inline">{processing.data}</dd>
                      </div>
                      <div>
                        <dt className="inline font-medium text-gray-900">
                          Conservation :{" "}
                        </dt>
                        <dd className="inline">{processing.retention}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-600">
                Aucun de ces traitements ne donne lieu à une décision
                automatisée produisant des effets juridiques à votre égard, ni
                à la revente de vos données à des tiers.
              </p>
            </SectionCard>

            {/* Cookies */}
            <SectionCard title="3. Cookies et traceurs">
              <div className="space-y-4 text-gray-600">
                <p>
                  Le bandeau affiché à votre première visite commande notre
                  outil de mesure d&rsquo;audience : tant que vous
                  n&rsquo;avez pas accepté, il fonctionne sans cookie et rien
                  n&rsquo;est déposé sur votre terminal. Vous pouvez revenir
                  sur votre choix à tout moment via le lien{" "}
                  <strong>« Gérer mes cookies »</strong> en pied de page — le
                  bandeau réapparaît immédiatement.
                </p>
                <p>
                  Le chat en ligne fait exception, et nous préférons
                  l&rsquo;écrire clairement : son script est chargé dès
                  l&rsquo;ouverture de la page pour rester joignable à tout
                  moment, de sorte que les cookies HubSpot du tableau
                  ci-dessous sont déposés avant votre choix, et que
                  «&nbsp;Refuser&nbsp;» ne les supprime pas.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left">
                      <th className="py-2 pr-4 font-semibold text-gray-900">
                        Traceur
                      </th>
                      <th className="py-2 pr-4 font-semibold text-gray-900">
                        Émetteur
                      </th>
                      <th className="py-2 pr-4 font-semibold text-gray-900">
                        Finalité
                      </th>
                      <th className="py-2 pr-4 font-semibold text-gray-900">
                        Durée
                      </th>
                      <th className="py-2 font-semibold text-gray-900">
                        Consentement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((cookie) => (
                      <tr
                        key={cookie.name}
                        className="border-b border-gray-100 align-top text-gray-600"
                      >
                        <td className="py-3 pr-4 font-mono text-xs">
                          {cookie.name}
                        </td>
                        <td className="py-3 pr-4">{cookie.origin}</td>
                        <td className="py-3 pr-4">{cookie.purpose}</td>
                        <td className="py-3 pr-4">{cookie.retention}</td>
                        <td className="py-3">
                          {COOKIE_CONSENT_LABELS[cookie.consent]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-gray-600">
                Pour vous opposer aux cookies marqués{" "}
                <em>« déposé dès l&rsquo;arrivée »</em>, vous pouvez les
                bloquer depuis les paramètres de votre navigateur ou une
                extension de blocage, et les supprimer à tout moment ; le reste
                du site continue de fonctionner, seul le chat en ligne devient
                indisponible. Vous pouvez également nous écrire via{" "}
                <Link
                  href="/juridique/exercer-mes-droits"
                  className="text-red-600 underline"
                >
                  Exercer mes droits
                </Link>
                .
              </p>

              <p className="mt-6 text-gray-600">
                Certaines pages intègrent des contenus tiers (formulaires Tally,
                vidéos). Ces contenus peuvent déposer leurs propres traceurs
                lorsque vous interagissez avec eux ; leurs éditeurs en sont
                responsables.
              </p>
            </SectionCard>

            {/* Sous-traitants */}
            <SectionCard title="4. À qui vos données sont transmises">
              <p className="mb-6 text-gray-600">
                Nous ne vendons ni ne louons vos données. Elles sont accessibles
                à nos équipes internes et aux prestataires techniques
                ci-dessous, qui agissent sur nos instructions et sont liés par
                un contrat de sous-traitance au sens de l&rsquo;article 28 du
                RGPD.
              </p>
              <div className="space-y-4">
                {SUB_PROCESSORS.map((processor) => (
                  <div
                    key={processor.name}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {processor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{processor.purpose}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">
                        Données :{" "}
                      </span>
                      {processor.data}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">
                        Hébergement :{" "}
                      </span>
                      {processor.location}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-600">
                Vos données peuvent enfin être communiquées aux autorités
                administratives ou judiciaires lorsque la loi nous y oblige.
              </p>
            </SectionCard>

            {/* Sécurité */}
            <SectionCard title="5. Comment vos données sont protégées">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Lock
                    size={24}
                    className="mt-1 flex-shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Chiffrement en transit
                    </h3>
                    <p className="text-sm text-gray-600">
                      L&rsquo;intégralité du site est servie en HTTPS. Les
                      échanges avec nos prestataires sont chiffrés.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe
                    size={24}
                    className="mt-1 flex-shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">Hébergement</h3>
                    <p className="text-sm text-gray-600">
                      Le site est hébergé par {HOSTING.provider}. Les données de
                      relation client sont hébergées dans l&rsquo;Union
                      européenne (instance HubSpot eu1).
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield
                    size={24}
                    className="mt-1 flex-shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Accès restreint
                    </h3>
                    <p className="text-sm text-gray-600">
                      Les accès aux outils contenant des données personnelles
                      sont nominatifs et limités aux personnes qui en ont besoin.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Timer
                    size={24}
                    className="mt-1 flex-shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Effacement programmé
                    </h3>
                    <p className="text-sm text-gray-600">
                      Les durées annoncées au point 2 sont des maximums : au
                      terme, les données sont supprimées ou anonymisées.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Droits */}
            <SectionCard title="6. Vos droits">
              <p className="mb-6 text-gray-600">
                Le RGPD vous ouvre les droits suivants sur les données vous
                concernant.
              </p>
              <dl className="space-y-3">
                {RGPD_RIGHTS.map((right) => (
                  <div key={right.id}>
                    <dt className="font-semibold text-gray-900">
                      {right.label}{" "}
                      <span className="font-normal text-gray-secondary">
                        ({right.article})
                      </span>
                    </dt>
                    <dd className="text-gray-600">{right.description}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 text-gray-600">
                <p>
                  Pour exercer l&rsquo;un de ces droits, utilisez notre{" "}
                  <Link
                    href="/juridique/exercer-mes-droits"
                    className="text-red-600 underline"
                  >
                    formulaire dédié
                  </Link>
                  . Un accusé de réception vous est envoyé immédiatement et
                  notre réponse vous parvient dans un délai d&rsquo;un mois,
                  prolongeable de deux mois pour une demande complexe. Un
                  contrôle d&rsquo;identité proportionné à la demande peut être
                  effectué.
                </p>
              </div>
            </SectionCard>

            {/* Réclamation */}
            <SectionCard title="7. Réclamation auprès de la CNIL">
              <p className="text-gray-600">
                Si vous estimez, après nous avoir contactés, que vos droits ne
                sont pas respectés, vous pouvez introduire une réclamation
                auprès de la Commission nationale de l&rsquo;informatique et
                des libertés — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex
                07, ou en ligne sur{" "}
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 underline"
                >
                  cnil.fr
                </a>
                .
              </p>
            </SectionCard>

            {/* Évolution */}
            <SectionCard title="8. Évolution de cette politique">
              <p className="text-gray-600">
                Cette politique peut être modifiée pour refléter un nouveau
                traitement ou une évolution réglementaire. La date de dernière
                mise à jour figure en tête de page. En cas de changement
                substantiel affectant un traitement fondé sur votre
                consentement, celui-ci vous sera à nouveau demandé.
              </p>
            </SectionCard>

            <p className="text-center text-sm text-gray-secondary">
              Voir aussi nos{" "}
              <Link href="/juridique/mentions-legales" className="text-red-600 underline">
                mentions légales
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

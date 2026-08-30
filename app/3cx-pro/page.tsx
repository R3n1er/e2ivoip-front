import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import { CTACalendarSection } from "@/components/cta-calendar-section";
import { GeographicAdvantage } from "@/components/geographic-advantage";
import { PricingTiers } from "@/components/pricing-tiers";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { CTAButton } from "@/components/ui/cta-button";
import {
  ArrowsClockwise,
  Database,
  MicrosoftTeamsLogo,
  WhatsappLogo,
} from "@/lib/icons";
import { TALLY_FORMS } from "@/lib/constants/tally";

const TALLY_3CX_PRO_URL = TALLY_FORMS.VOIP_3CX_PRO;

export const metadata: Metadata = pageMetadata({
  title: "3CX PRO Cloud - Standard téléphonique dédié",
  description:
    "Déployez 3CX PRO sur une instance cloud dédiée, dimensionnée par appels simultanés. Intégrations CRM, Microsoft 365 et accompagnement en France et dans les DOM.",
  keywords:
    "3CX PRO, téléphonie cloud entreprise, standard téléphonique cloud, IPBX dédié, appels simultanés, intégration CRM, téléphonie DOM",
  path: "/3cx-pro",
  // Décision SEO délibérée : /telephonie-3cx est le hub de référence pour
  // l'offre 3CX. Les deux pages présentent la même offre ; concentrer le
  // signal sur une seule URL évite qu'elles se concurrencent.
  canonicalOverride: `${SITE_URL}/telephonie-3cx`,
});

const problems = [
  {
    title: "Capacité d'appels limitée",
    description:
      "Votre installation atteint ses limites lorsque plusieurs collaborateurs appellent en même temps.",
  },
  {
    title: "Coûts difficiles à anticiper",
    description:
      "Les licences, les lignes et la maintenance sont réparties entre plusieurs contrats.",
  },
  {
    title: "Installation vieillissante",
    description:
      "Votre standard dépend d'un équipement sur site devenu difficile à maintenir.",
  },
  {
    title: "Sites dispersés",
    description:
      "Vos agences et collaborateurs mobiles ne partagent pas le même environnement téléphonique.",
  },
  {
    title: "Outils métier séparés",
    description:
      "Votre téléphonie ne communique pas avec votre CRM ou Microsoft 365.",
  },
];

const solutions = [
  {
    title: "Votre propre instance",
    description:
      "Votre entreprise dispose d'un environnement 3CX administré par E2I VoIP.",
  },
  {
    title: "Une capacité mesurée",
    description:
      "Le palier repose sur le nombre d'appels réellement passés en même temps.",
  },
  {
    title: "Une administration centralisée",
    description: "Mises à jour, sauvegarde et supervision sont regroupées.",
  },
  {
    title: "Des intégrations métier",
    description:
      "CRM, Microsoft 365, WhatsApp Business et scénarios CFD selon le projet.",
  },
  {
    title: "Une expertise certifiée",
    description:
      "E2I VoIP est partenaire Silver 3CX et maîtrise les configurations avancées.",
  },
];

const integrations = [
  {
    icon: WhatsappLogo,
    title: "WhatsApp Business",
    description: "Conversations centralisées dans le client 3CX.",
  },
  {
    icon: Database,
    title: "CRM",
    description:
      "Connexion à HubSpot, Zoho, Salesforce ou Organilog selon compatibilité.",
  },
  {
    icon: MicrosoftTeamsLogo,
    title: "Microsoft 365",
    description:
      "Synchronisation des contacts et intégration aux outils Microsoft.",
  },
  {
    icon: ArrowsClockwise,
    title: "Call Flow Designer",
    description:
      "Scénarios d'appels conçus selon les règles de votre organisation.",
  },
];

const pricingTiers = [
  {
    calls: 4,
    description: "Premier palier pour une instance dédiée",
    features: [
      "Applications web et mobile",
      "Files d'attente",
      "Support par mail et téléphone",
    ],
  },
  {
    calls: 8,
    description: "Pour une équipe avec un flux d'appels régulier",
    features: [
      "Applications web et mobile",
      "Files d'attente",
      "Support par mail et téléphone",
    ],
  },
  {
    calls: 16,
    description: "Pour plusieurs équipes ou files d'attente",
    features: ["Intégrations CRM", "Files d'attente", "Rapports d'activité"],
  },
  {
    calls: 24,
    description: "Pour une activité répartie sur plusieurs sites",
    features: ["Multi-sites", "Microsoft 365", "Accompagnement au déploiement"],
  },
  {
    calls: 32,
    description: "Pour les flux d'appels plus soutenus",
    features: ["Configuration avancée", "Call Flow Designer", "Formation équipes"],
  },
  {
    calls: 64,
    description: "Pour les organisations à forte capacité",
    features: [
      "Architectures complexes",
      "Supervision centralisée",
      "Accompagnement sur mesure",
    ],
  },
];

const locations = [
  { region: "Guyane", phone: "05 94 96 35 00", tel: "+594594963500" },
  {
    region: "Guadeloupe",
    phone: "05 90 17 35 00",
    tel: "+590590173500",
  },
  {
    region: "Martinique",
    phone: "05 96 31 35 00",
    tel: "+596596313500",
  },
  {
    region: "La Réunion",
    phone: "02 63 08 55 00",
    tel: "+262263085500",
  },
  {
    region: "France métropolitaine",
    phone: "01 89 56 05 00",
    tel: "+33189560500",
  },
];

export default function ThreeCXProPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/photos/3CX-On-Premise-Solution.webp"
            alt="3CX PRO, standard téléphonique d'entreprise dans le cloud"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              3CX <span className="text-red-400">PRO</span>
            </h1>
            <p className="mb-4 text-2xl font-bold md:text-3xl">
              Votre standard téléphonique sur une instance cloud dédiée
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-xl font-medium opacity-90 md:text-2xl">
              Dimensionné par appels simultanés, avec vos outils métier et vos sites réunis dans le même environnement.
            </p>
            <CTAButton href={TALLY_3CX_PRO_URL} icon="Calculator" external>
              Demander un devis 3CX PRO
            </CTAButton>
          </div>
        </div>
      </section>

      <ProblemSolutionSection problems={problems} solutions={solutions} />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Intégrations disponibles
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Nous validons chaque connexion selon votre version 3CX, vos licences et vos outils existants.
            </p>
          </div>

          <div className="mt-10 grid border-t border-gray-200 md:grid-cols-2">
            {integrations.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="grid grid-cols-[2rem_1fr] gap-4 border-b border-gray-200 py-6 md:px-6 md:[&:nth-child(odd)]:border-r"
              >
                <Icon size={24} className="text-blue-marine" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-gray-dark">{title}</h3>
                  <p className="mt-1 leading-relaxed text-gray-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingTiers tiers={pricingTiers} quoteUrl={TALLY_3CX_PRO_URL} />
      <GeographicAdvantage locations={locations} />

      <div id="calendrier">
        <CTACalendarSection />
      </div>
    </div>
  );
}

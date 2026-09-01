import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { FaqSection } from "@/components/faq-section";
import {
  CheckCircle,
  Shield,
  Database,
  Phone,
  Chat,
  Brain,
  ChartBar,
  Briefcase,
  Headphones,
  Globe,
  PlugCharging,
  Medal,
} from "@/lib/icons";
import { TALLY_FORMS } from "@/lib/constants/tally";
import { AIRCALL_FAQ } from "@/lib/faq-data";

// ⚠️ ATTRIBUTION COMMERCIALE — voir docs/CHARTE_EDITORIALE_AIRCALL.md §8
// Remplacer par le lien PartnerStack d'E2I (https://aircall.partnerstack.com/?fpr=ID-E2I)
// pour que tout essai/démo Aircall soit attribué à E2I. Tant qu'il est vide,
// les CTA pointent vers le parcours devis/contact E2I.
const PARTNERSTACK_URL = "";

export const metadata: Metadata = pageMetadata({
  title: "Aircall pour entreprises | Plateforme de communication client connectée à votre CRM | E2I VoIP",
  description:
    "Déployez Aircall avec E2I VoIP, partenaire Aircall : la plateforme de communication client propulsée par l'IA, connectée à votre CRM (HubSpot, Salesforce, Zendesk). Pour vos équipes commerciales et support, dans les DOM et en France.",
  keywords:
    "Aircall, plateforme de communication client, intégration Aircall HubSpot, Aircall Salesforce, système téléphonique moderne CRM, Agent vocal IA, partenaire Aircall DOM",
  path: "/telephonie-entreprise/aircall",
});

export default function AircallPage() {
  // Intégrations CRM / outils phares (logos déposés dans public/images/integrations/ si dispo)
  const integrations = [
    "HubSpot",
    "Salesforce",
    "Zendesk",
    "Pipedrive",
    "Zoho",
    "Microsoft Teams",
    "Shopify",
    "Intercom",
  ];

  const features = [
    {
      Icon: Database,
      title: "Connecté à votre CRM",
      description:
        "La fiche client s'ouvre automatiquement à chaque appel. Historique, notes et tâches synchronisés dans votre CRM, sans saisie manuelle.",
    },
    {
      Icon: Phone,
      title: "Appels en un clic",
      description:
        "Click-to-dial directement depuis votre CRM ou votre navigateur. Vos équipes appellent plus, plus vite, sans changer d'outil.",
    },
    {
      Icon: Chat,
      title: "Voix, SMS et WhatsApp",
      description:
        "Centralisez tous vos canaux de conversation client dans une seule interface partagée par vos équipes.",
    },
    {
      Icon: Brain,
      title: "Assistance par IA",
      description:
        "Transcription des appels, résumés automatiques et analyse des échanges pour faire monter en compétence toute l'équipe.",
    },
    {
      Icon: ChartBar,
      title: "Statistiques en temps réel",
      description:
        "Suivez l'activité, les files d'attente et la performance de vos équipes commerciales et support depuis un tableau de bord clair.",
    },
    {
      Icon: Globe,
      title: "Numéros internationaux",
      description:
        "Créez des numéros locaux dans les DOM et à l'international pour rassurer vos clients et professionnaliser votre accueil.",
    },
  ];

  const audiences = [
    {
      Icon: Briefcase,
      title: "Équipes commerciales",
      description:
        "Prospection, relances et suivi des opportunités directement reliés à votre CRM. Chaque appel devient une donnée exploitable pour conclure plus vite.",
    },
    {
      Icon: Headphones,
      title: "Équipes support & relation client",
      description:
        "Files d'attente, routing intelligent et historique complet pour offrir un service fluide et personnalisé à chaque client.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Solution Aircall E2I VoIP"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 shadow-lg">
                <Image
                  src="/images/logo-partners/dark-logo-aircall.png"
                  alt="Logo Aircall"
                  width={150}
                  height={60}
                  priority
                  className="h-10 w-auto"
                />
              </div>

              <h1 className="mt-6 text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
                La communication client qui se connecte à votre{" "}
                <span className="text-white">CRM</span>
              </h1>
              <p className="mt-4 text-xl leading-relaxed text-white/90 md:text-2xl">
                <strong>Aircall</strong> : la plateforme de communication client
                propulsée par l&rsquo;IA, pour vos équipes commerciales et
                support
              </p>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
                Reliez vos appels à votre CRM, fluidifiez votre relation client
                et faites gagner du temps à vos équipes, dans les DOM et en
                France métropolitaine.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/85">
                <div className="flex items-center gap-2">
                  <Medal size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Partenaire Aircall</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlugCharging size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">200+ intégrations CRM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={24} className="text-white" aria-hidden="true" />
                  <span className="text-sm">Accompagnement DOM &amp; France</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <CTAButton href={TALLY_FORMS.AIRCALL} icon="Phone" external>
                  Être rappelé
                </CTAButton>
                <CTAButtonMarine href="/contact" icon="Phone">
                  Parler à un expert
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Annonce partenariat */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-red-primary">
              Nouveau partenariat
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <Image
                src="/images/img-aircall/aircall-starter-partner-annoucement.png"
                alt="E2I VoIP, partenaire Aircall Starter Partner"
                width={1000}
                height={560}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Introduction — c'est quoi Aircall */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                  Qu&rsquo;est-ce qu&rsquo;<span className="text-red-primary">Aircall</span> ?
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  <a
                    href="https://aircall.io/"
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-blue-marine underline decoration-blue-marine/30 underline-offset-2 hover:text-red-primary"
                  >
                    Aircall
                  </a>{" "}
                  est la plateforme de communication client propulsée par
                  l&rsquo;IA, pensée pour les équipes commerciales et support
                  modernes. Fondée à Paris en 2014, elle équipe plus de{" "}
                  <strong>22 000 entreprises dans 110+ pays</strong> et
                  s&rsquo;intègre nativement à <strong>200+ CRM</strong> et
                  outils métiers — pour gérer appels, SMS et messages WhatsApp
                  depuis un espace de travail unifié.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Pas d&rsquo;installation complexe : vos collaborateurs passent
                  et reçoivent leurs appels depuis leur navigateur ou leur
                  mobile, partout. En complément de nos solutions 3CX et
                  Yeastar, Aircall élargit votre téléphonie vers la productivité
                  commerciale et la qualité de service. E2I VoIP vous accompagne
                  du choix de la solution jusqu&rsquo;à l&rsquo;intégration dans
                  votre CRM.
                </p>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
                  <Image
                    src="/images/img-aircall/aircall-conversation-demo-FR-product-team02.png"
                    alt="Interface de conversation Aircall pour les équipes"
                    width={720}
                    height={520}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intégrations CRM */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Comment Aircall se connecte-t-il à vos{" "}
                <span className="text-red-primary">outils du quotidien</span> ?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
                Plus de 200 intégrations natives. La fiche client s&rsquo;ouvre
                à chaque appel, les données se synchronisent automatiquement.
              </p>
            </div>

            <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <Image
                src="/images/img-aircall/aircall-crm-integradion-FR-hero-04.png"
                alt="Intégration CRM Aircall : la fiche client s'ouvre à chaque appel"
                width={1200}
                height={680}
                className="h-auto w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {integrations.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-base font-semibold text-gray-dark">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fonctionnalités clés */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Quels sont les atouts d&rsquo;<span className="text-red-primary">Aircall</span> ?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <Icon size={24} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-dark">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Focus IA */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
                  <Image
                    src="/images/img-aircall/aircall-FR-product-AI-assisted-01.png"
                    alt="Assistance par IA Aircall : transcription et résumés d'appels"
                    width={720}
                    height={520}
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                  Comment l&rsquo;<span className="text-red-primary">IA</span>{" "}
                  d&rsquo;Aircall fait-elle gagner du temps à vos équipes ?
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  Avec AI Assist Pro et les Agents vocaux IA, Aircall automatise
                  le travail avant, pendant et après chaque conversation :
                  transcription, résumés d&rsquo;appels, coaching en temps réel
                  et mise à jour automatique du CRM. Chaque échange devient une
                  donnée exploitable.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Les entreprises qui adoptent l&rsquo;IA d&rsquo;Aircall
                  génèrent en moyenne <strong>+162 % de valeur de deal</strong>{" "}
                  <span className="text-sm text-gray-500">(source&nbsp;: Aircall)</span>.
                  Un atout précieux pour suivre la qualité de service et
                  accompagner les équipes commerciales comme support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pour qui ? */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                À qui s&rsquo;adresse Aircall ?
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {audiences.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900/10">
                    <Icon size={28} className="text-blue-marine" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-dark">
                    {title}
                  </h3>
                  <p className="mt-3 text-base text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preuves chiffrées (stats approuvées Aircall) */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Quels résultats Aircall apporte-t-il aux{" "}
                <span className="text-red-primary">équipes</span> ?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
                Des résultats mesurés chez les clients Aircall et par la
                recherche indépendante.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { value: "+285 %", label: "Appels sortants en plus", source: "CrowdProperty" },
                { value: "+162 %", label: "Valeur de deal avec l'IA", source: "Aircall" },
                { value: "373 %", label: "ROI sur 3 ans", source: "Forrester TEI" },
                { value: "−3 min", label: "Temps de traitement moyen", source: "Forrester TEI" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"
                >
                  <div className="text-3xl font-black font-mono tabular-nums text-red-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-gray-dark">{stat.label}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-gray-400">
                    {stat.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi E2I VoIP */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Pourquoi déployer Aircall avec{" "}
              <span className="text-red-primary">E2I VoIP</span> ?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Partenaire Aircall, nous ne nous contentons pas de revendre une
              licence. Nous étudions votre projet, paramétrons l&rsquo;intégration
              avec votre CRM et accompagnons vos équipes, avec un support en
              français et une parfaite connaissance du contexte des DOM.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 text-left">
              {[
                "Conseil sur la solution adaptée à votre usage",
                "Intégration et paramétrage de votre CRM",
                "Numéros locaux DOM et internationaux",
                "Accompagnement et support en français",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="mt-0.5 flex-shrink-0 text-red-primary"
                    aria-hidden="true"
                  />
                  <span className="text-base text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <FaqSection items={AIRCALL_FAQ} title="Questions fréquentes" />
        </section>

        {/* CTA finale */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
              Prêt à connecter votre communication client à votre CRM ?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Étude de votre projet • Devis personnalisé • Accompagnement DOM
              &amp; France
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <CTAButton href={TALLY_FORMS.AIRCALL} icon="Phone" external>
                Être rappelé
              </CTAButton>
              <CTAButtonMarine href="/contact" icon="Phone">
                Parler à un expert
              </CTAButtonMarine>
              {/* CTA d'essai Aircall — actif uniquement quand le lien PartnerStack
                  d'attribution est renseigné (voir docs/CHARTE_EDITORIALE_AIRCALL.md §8) */}
              {PARTNERSTACK_URL ? (
                <a
                  href={PARTNERSTACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-marine shadow-lg transition-colors hover:bg-white/90"
                >
                  Démarrer l&rsquo;essai Aircall
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

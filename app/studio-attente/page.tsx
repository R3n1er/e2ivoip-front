export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { PhoneLink } from "@/components/ui/phone-link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";
import {
  MusicNote,
  SpeakerHigh,
  DownloadSimple,
  Check,
  Brain,
  Users,
  ShieldCheck,
  Timer,
  Info,
  Play,
  Microphone,
  ArrowRight,
} from "@/lib/icons";
import type { Metadata } from "next";
import {
  STUDIO_DEMOS,
  STUDIO_DEMO_CATEGORIES,
  type StudioDemoCategory,
} from "@/lib/studio-demos";
import { StudioDemoSection } from "./components/studio-demo-section";


export const metadata: Metadata = {
  title: "Studio attente téléphonique — Messages & musiques sur mesure",
  description:
    "Studio d'enregistrement E2I VoIP : messages d'accueil et d'attente téléphonique avec voix off professionnelles ou IA, musiques libres de droits. Valorisez votre image de marque dès le premier appel.",
  keywords:
    "studio attente téléphonique, message accueil téléphonique, voix off professionnelle, voix off IA, musique attente téléphonique, musique libre de droits, pré-décroché, studio digital",
  alternates: { canonical: "/studio-attente" },
  openGraph: {
    title:
      "Studio attente téléphonique — Messages & musiques sur mesure | E2I VoIP",
    description:
      "Messages d'accueil et d'attente avec voix off professionnelles ou IA et musiques libres de droits. Créez une expérience d'attente à votre image.",
    type: "website",
    locale: "fr_FR",
    url: "/studio-attente",
    siteName: "E2I VoIP",
  },
};

export default function StudioAttente() {
  const studioOptions = [
    {
      Icon: Users,
      title: "Studio Voix Humaines",
      tagline: "Voix off professionnelles",
      features: [
        "Voix off professionnelles en français et langues étrangères",
        "Enregistrement en studio acoustique traité",
        "Direction artistique et conseils sur le ton",
        "Validation humaine systématique",
        "Idéal pour une image premium et personnalisée",
      ],
      delay: "3 à 5 jours ouvrés",
      cta: "Demander un devis",
      ctaHref: "/devis-en-ligne?service=studio-voix-humaines",
      highlight: false,
    },
    {
      Icon: Brain,
      title: "Studio Digital assisté par IA",
      tagline: "Création autonome et rapide",
      features: [
        "Voix de synthèse ultra-réalistes en français et 30+ langues",
        "Création en autonomie depuis notre studio en ligne",
        "Modification illimitée des scripts",
        "Validation humaine incluse sur chaque message",
        "Idéal pour itérer rapidement à moindre coût",
      ],
      delay: "Quelques heures",
      cta: "Demander un devis",
      ctaHref: "/devis-en-ligne?service=studio-digital",
      highlight: true,
    },
    {
      Icon: Microphone,
      title: "Studio Voix Humaines + Devis guidé",
      tagline: "Modèles audio + formulaire interactif",
      features: [
        "Écoutez les démos par type de message",
        "Choisissez un modèle ou rédigez votre texte",
        "Formulaire étape par étape pensé TDA",
        "Envoi direct à l’équipe commerciale",
        "Réponse sous 24 h ouvrées",
      ],
      delay: "24 h",
      cta: "Construire ma demande",
      ctaHref: "/studio-attente/devis",
      highlight: false,
    },
  ];

  const steps = [
    {
      Icon: Users,
      title: "1. Choisissez votre studio",
      description:
        "Voix humaines professionnelles ou studio digital assisté par IA — adaptez le mode de production à votre budget et vos délais.",
    },
    {
      Icon: SpeakerHigh,
      title: "2. Sélectionnez vos messages",
      description:
        "Message d'accueil, attente, fermeture, vœux saisonniers… Définissez les points de contact à habiller.",
    },
    {
      Icon: MusicNote,
      title: "3. Musique ou bibliothèque",
      description:
        "Importez votre musique libre de droits ou choisissez dans notre bibliothèque. Aucune redevance SACEM ou SCPA à payer.",
    },
    {
      Icon: ShieldCheck,
      title: "4. Validation humaine",
      description:
        "Chaque message est validé par un humain : ton, qualité audio, conformité. Rien ne part sans contrôle.",
    },
    {
      Icon: DownloadSimple,
      title: "5. Livraison",
      description:
        "Livraison dans tous les formats compatibles : 3CX, Yeastar, Grandstream, Asterisk, et plus.",
    },
  ];

  const comparisonRows = [
    { label: "Voix", human: "Voix off professionnelles", digital: "Voix de synthèse IA" },
    { label: "Langues", human: "Français + langues étrangères", digital: "30+ langues" },
    { label: "Délai", human: "3 à 5 jours ouvrés", digital: "Quelques heures" },
    { label: "Personnalisation", human: "Sur mesure totale", digital: "Templates personnalisables" },
    { label: "Validation humaine", human: "Incluse", digital: "Incluse" },
    { label: "Modification", human: "Sur devis", digital: "Illimitée en autonomie" },
    { label: "Musique", human: "Bibliothèque ou import", digital: "Bibliothèque ou import" },
    { label: "Idéal pour", human: "Image premium", digital: "Itération rapide" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Studio attente téléphonique
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Messages d'accueil et d'attente professionnels, avec voix
                humaines ou assistées par IA. Musiques libres de droits, zéro
                redevance SACEM. Valorisez votre image dès le premier appel.
              </p>
              <CTAButton href="/studio-attente/devis" icon="Microphone">
                CONSTRUIRE MA DEMANDE
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Comparatif des deux options */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-center text-gray-dark mb-4">
              Deux studios, à vous de{" "}
              <span className="text-red-primary">choisir</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Que vous privilégiiez l'authenticité d'une voix humaine ou la
              rapidité de l'IA, tous nos messages sont validés par un humain
              avant livraison.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {studioOptions.map((option, index) => (
                <Card
                  key={index}
                  className={
                    option.highlight
                      ? "border-red-primary shadow-lg ring-2 ring-red-primary/20"
                      : "border-gray-200 hover:shadow-lg transition-shadow"
                  }
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-red-primary/10 w-14 h-14 rounded-full flex items-center justify-center">
                        <option.Icon
                          size={28}
                          className="text-red-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {option.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {option.tagline}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <Check
                            size={18}
                            className="text-red-primary shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Timer size={16} aria-hidden="true" />
                      <span>Délai : {option.delay}</span>
                    </div>
                    <Button
                      className={
                        option.highlight
                          ? "w-full bg-red-primary text-white hover:bg-red-700"
                          : "w-full border border-blue-marine bg-transparent text-blue-marine hover:bg-blue-marine hover:text-white"
                      }
                      asChild
                    >
                      <a href={option.ctaHref}>
                        {option.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tableau comparatif */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-dark">
                      Critère
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-dark">
                      Studio Voix Humaines
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-dark">
                      Studio Digital IA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 font-medium text-gray-dark">
                        {row.label}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {row.human}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {row.digital}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Étapes du parcours */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-center text-gray-dark mb-12">
              Comment ça{" "}
              <span className="text-red-primary">marche</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.Icon
                      size={28}
                      className="text-red-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bibliothèque musicale & infos légales SACEM */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-center text-gray-dark mb-4">
              Musiques{" "}
              <span className="text-red-primary">libres de droits</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Importez vos propres musiques libres de droits ou choisissez dans
              notre bibliothèque. Zéro redevance, zéro souci.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <MusicNote
                        size={24}
                        className="text-red-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle>Notre bibliothèque audio</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Large catalogue de musiques libres de droits
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Jingles et habillages sonores inclus
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Formats optimisés pour téléphonie (WAV, MP3, G.711)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Aucune redevance à payer
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <DownloadSimple
                        size={24}
                        className="text-red-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle>Importer vos musiques</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Import depuis votre ordinateur ou URL
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Vérification automatique du format
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Conversion et optimisation incluses
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-red-primary shrink-0 mt-0.5" aria-hidden="true" />
                      Doit être libre de droits (licence documentée)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Bloc info légale SACEM */}
            <Card className="border-blue-marine/20 bg-blue-marine/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-marine w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <Info
                      size={24}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-3">
                      Pourquoi utiliser des musiques libres de droits ?
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      En France, diffuser une musique commerciale en attente
                      téléphonique déclenche{" "}
                      <strong>deux obligations cumulatives</strong> : la
                      SACEM (droits d'auteur, 150 à 800€/an selon l'effectif) et
                      la SCPA (droits des producteurs). Ces redevances sont dues
                      même pour un extrait court et sont rétroactives en cas de
                      contrôle (jusqu'à 3 ans, majoration de 50% à 100%).
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      En utilisant des <strong>musiques libres de droits</strong>,
                      vous n'avez <strong>aucune redevance SACEM ni SCPA</strong>{" "}
                      à payer. Les auteurs ou compositeurs sont décédés depuis
                      plus de 70 ans, ou les musiques proviennent de catalogues
                      hors gestion collective.
                    </p>
                    <p className="text-xs text-gray-500">
                      Source :{" "}
                      <a
                        href="https://entreprendre.service-public.gouv.fr/vosdroits/F3094"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-red-primary"
                      >
                        service-public.gouv.fr
                      </a>
                      {" — "}La licence libre de droits dispense de tout contrat
                      avec la SACEM.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Exemples audio */}
        <StudioDemoSection />

        {/* Validation humaine */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-red-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck
                size={40}
                className="text-red-primary"
                aria-hidden="true"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
              Validation humaine sur{" "}
              <span className="text-red-primary">chaque message</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Que votre message soit produit par une voix humaine ou par notre
              IA, rien ne part sans une validation par notre équipe. Ton,
              qualité audio, conformité, prononciation — chaque détail est
              contrôlé pour représenter votre entreprise au mieux.
            </p>
          </div>
        </section>

        {/* Territory phone links */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-secondary mb-4 text-center">
              APPELEZ-NOUS DIRECTEMENT
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {TERRITORY_PHONES.filter(
                (p) => p.territory !== "France"
              ).map((phone) => (
                <PhoneLink
                  key={phone.territory}
                  phone={phone}
                  showTerritory={true}
                  className="text-gray-dark font-black hover:text-red-primary transition-colors"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSectionSimple />
      </div>
    </div>
  );
}
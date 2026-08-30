import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { CTAButton, CTAButtonSecondary } from "@/components/ui/cta-button";
import { ContactFormTrunkSipIA, TALLY_AGENTS_IA_URL } from "@/components/contact-form-trunk-sip-ia";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import {
  TreeStructure,
  CheckCircle,
  Wallet,
  Headphones,
  Rocket,
  Users,
} from "@/lib/icons";

export const metadata: Metadata = pageMetadata({
  title: "Programme revendeur Trunk SIP agents vocaux IA — Early Access",
  description:
    "Intégrateurs et agences IA : revendez nos Trunk SIP DOM pour agents vocaux. Numéros locaux Antilles-Guyane-Réunion, guichet unique, conditions revendeur avantageuses et accompagnement technique.",
  keywords:
    "revendeur trunk SIP, programme revendeur agents IA, intégrateur VAPI DOM, carrier SIP revendeur, white label SIP agents vocaux IA",
  path: "/trunk-sip-agents-vocaux-ia-revendeurs",
});

const benefits = [
  {
    Icon: Wallet,
    title: "Conditions revendeur avantageuses",
    description:
      "Des tarifs préférentiels et une grille adaptée aux intégrateurs qui déploient plusieurs clients DOM.",
  },
  {
    Icon: TreeStructure,
    title: "Guichet unique",
    description:
      "Un seul interlocuteur pour le contrat, la facturation et le support de tous vos comptes clients.",
  },
  {
    Icon: Headphones,
    title: "Accompagnement technique",
    description:
      "Nous vous épaulons sur l'intégration SIP (credentials, routage, transferts) avec vos plateformes IA.",
  },
  {
    Icon: Users,
    title: "Numéros locaux DOM",
    description:
      "Attribution et portabilité de numéros +596, +590, +594 et +262 pour rassurer vos clients finaux.",
  },
];

export default function TrunkSipAgentsIARevendeurs() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Téléphonie d'entreprise", path: "/telephonie-entreprise" },
          {
            name: "Trunk SIP Agents IA",
            path: "/telephonie-entreprise/trunk-sip-agents-ia",
          },
          {
            name: "Programme revendeur",
            path: "/trunk-sip-agents-vocaux-ia-revendeurs",
          },
        ])}
      />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Programme revendeur Trunk SIP agents vocaux IA E2I VoIP"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Rocket size={16} className="text-white mr-2" aria-hidden="true" />
                <span className="text-white/90 text-sm font-medium">
                  Programme Early Access
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Devenez revendeur{" "}
                <span className="text-white">Trunk SIP agents IA</span> DOM
              </h1>
              <p className="text-xl text-white/95 mb-4 max-w-3xl mx-auto leading-relaxed">
                Intégrateurs et agences IA : revendez nos Trunk SIP DOM à vos
                clients avec des numéros locaux Antilles-Guyane-Réunion.
              </p>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                Vous gardez la relation client et votre stack IA. E2I VoIP
                fournit la couche télécom locale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton href={TALLY_AGENTS_IA_URL} icon="Chat" external>
                  Rejoindre le programme
                </CTAButton>
                <CTAButtonSecondary
                  href="/telephonie-entreprise/trunk-sip-agents-ia"
                  icon="ArrowRight"
                >
                  Voir l'offre Trunk SIP agents IA
                </CTAButtonSecondary>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                Pourquoi revendre avec{" "}
                <span className="text-red-primary">E2I VoIP</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous sommes l'opérateur télécom des DOM. Vous apportez l'IA et la
                relation client, nous fournissons l'infrastructure locale.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map(({ Icon, title, description }) => (
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

            <div className="mt-12 rounded-2xl border border-blue-marine/20 bg-blue-marine/5 p-8">
              <h3 className="text-xl font-bold text-gray-dark mb-4">
                Pour qui ?
              </h3>
              <ul className="space-y-3">
                {[
                  "Intégrateurs et agences déployant des agents vocaux IA (VAPI, Rounded, ElevenLabs, Jambonz…)",
                  "Prestataires souhaitant proposer des numéros locaux DOM à leurs clients",
                  "Revendeurs cherchant un guichet unique télécom pour les Antilles, la Guyane et La Réunion",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={24}
                      className="mt-0.5 flex-shrink-0 text-red-primary"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Formulaire de contact (réutilise la section #contact) */}
        <ContactFormTrunkSipIA />

        {/* CTA finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-6">
              Prêt à devenir revendeur ?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Parlons de votre projet et des conditions du programme Early
              Access.
            </p>
            <div className="flex justify-center">
              <CTAButton href={TALLY_AGENTS_IA_URL} icon="Chat" external>
                Rejoindre le programme
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

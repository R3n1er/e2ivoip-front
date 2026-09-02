import { Button } from "@/components/ui/button";
import { SafeImage as Image } from "@/components/ui/safe-image";
import Link from "next/link";
import { FullContactForm } from "@/components/hubspot";
import { TALLY_FORMS } from "@/lib/constants/tally";
import { Timer, CheckCircle, Gear, Phone } from "@/lib/icons";
import { FaqSection } from "@/components/faq-section";
import { DEVIS_FAQ } from "@/lib/faq-data";

/**
 * Les demandes de devis sont regroupées par famille d'offre : le visiteur
 * arrive en sachant quel type de projet il porte, pas quel formulaire remplir.
 */
const devisGroups = [
  {
    title: "Trunk SIP & portabilité",
    description:
      "Vous cherchez un opérateur pour vos lignes, ou vous souhaitez conserver vos numéros actuels.",
    items: [
      {
        title: "Devis Trunk SIP",
        description: "Lignes opérateur dimensionnées pour votre consommation",
        href: TALLY_FORMS.TRUNK_SIP,
        variant: "primary" as const,
      },
      {
        title: "Étude de portabilité",
        description: "Conservez vos numéros existants",
        href: TALLY_FORMS.PORTABILITE,
        variant: "secondary" as const,
      },
      {
        title: "Trunk SIP pour agents IA",
        description: "Intégrateurs VAPI, ElevenLabs, Rounded, Jambonz",
        href: TALLY_FORMS.AGENTS_IA,
        variant: "secondary" as const,
      },
    ],
  },
  {
    title: "Standard téléphonique 3CX",
    description:
      "Choisissez selon la taille de votre équipe et le niveau d'isolation souhaité.",
    items: [
      {
        title: "Devis 3CX PRO & IA",
        description: "Instance dédiée, fonctions IA incluses",
        href: TALLY_FORMS.VOIP_3CX_PRO,
        variant: "primary" as const,
      },
      {
        title: "Devis 3CX SMB",
        description: "Offre mutualisée, de 3 à 10 utilisateurs",
        href: TALLY_FORMS.VOIP_3CX_SMB,
        variant: "secondary" as const,
      },
    ],
  },
  {
    title: "Équipements & intégration",
    description:
      "Vous disposez déjà d'une installation, ou vous visez une solution clé en main.",
    items: [
      {
        title: "Devis PBX Yeastar",
        description: "Standard Yeastar cloud ou sur site",
        href: TALLY_FORMS.YEASTAR,
        variant: "primary" as const,
      },
      {
        title: "Projet d'intégration PBX",
        description: "Raccordement de votre PBX existant",
        href: TALLY_FORMS.PROJET_PBX,
        variant: "secondary" as const,
      },
      {
        title: "Être rappelé — Aircall",
        description: "Solution Aircall pour équipes commerciales",
        href: TALLY_FORMS.AIRCALL,
        variant: "secondary" as const,
      },
    ],
  },
];

export default function DevisEnLignePage() {

  const avantages = [
    {
      Icon: Timer,
      title: "Réponse rapide",
      description: "Par un expert en téléphonie IP",
    },
    {
      Icon: CheckCircle,
      title: "Accompagnement gratuit",
      description: "Sans engagement",
    },
    {
      Icon: Gear,
      title: "Offres sur mesure",
      description: "Selon votre activité",
    },
    {
      Icon: Phone,
      title: "Support technique",
      description: "Par mail et téléphone, dans les DOM et en France",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/man-oniphone-business-min.jpg"
            alt="Communications professionnelles"
            fill
            priority
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="uppercase text-sm font-medium tracking-wider mb-4 opacity-90">
            RECEVEZ UN DEVIS PERSONNALISÉ EN MOINS DE 24H POUR VOTRE PROJET TÉLÉCOM
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Devis Rapide et Gratuit
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 opacity-95">
            Solutions de téléphonie professionnelle adaptées à vos besoins
          </p>
        </div>
      </section>

      {/* Section Boutons de Devis */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Que vous cherchiez à mettre en place un{" "}
              <strong>Trunk SIP professionnel</strong>, une solution{" "}
              <strong>3CX VoIP dédiée ou mutualisée</strong>, installer une
              solution Yeastar ou à{" "}
              <strong>porter vos numéros existants sur nos Trunk SIP operateur</strong>,
              notre équipe vous accompagne. Choisissez ci-dessous le formulaire
              correspondant à votre projet.
            </p>
          </div>

          {/* Demandes de devis, groupées par famille d'offre */}
          <div className="space-y-12">
            {devisGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xl font-black tracking-[-0.03em] text-gray-dark">
                  {group.title}
                </h2>
                <p className="mt-2 mb-6 text-gray-600">{group.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex flex-col rounded-lg p-5 text-white shadow-lg
                        transition-[background-color,box-shadow,transform] duration-300
                        hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                        motion-reduce:transform-none motion-reduce:transition-none
                        ${
                          item.variant === "primary"
                            ? "bg-red-primary hover:bg-red-600 focus-visible:ring-red-primary"
                            : "bg-blue-marine hover:bg-blue-marine/90 focus-visible:ring-blue-marine"
                        }
                      `}
                    >
                      <span className="text-lg font-bold">{item.title}</span>
                      <span className="mt-1 text-sm leading-relaxed text-white/85">
                        {item.description}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact urgent */}
          <div className="text-center mt-16">
            <p className="text-lg text-[#1d3557] font-medium mb-4">
              Un projet urgent ? Contactez directement notre équipe commerciale.
            </p>
            <a
              href="tel:+594594963500"
              className="inline-flex items-center justify-center gap-2 bg-red-primary hover:bg-red-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Phone size={20} aria-hidden="true" />
              05 94 96 35 00
            </a>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark text-center mb-12">
            Pourquoi demander un devis auprès de E2I VOIP ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((avantage) => (
              <div key={avantage.title} className="text-center">
                <avantage.Icon
                  size={32}
                  className="mx-auto mb-4 text-red-primary"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {avantage.title}
                </h3>
                <p className="text-gray-600">{avantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <FaqSection items={DEVIS_FAQ} title="Questions fréquentes" />
      </section>

      {/* Formulaire de Contact HubSpot */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FullContactForm />
        </div>
      </section>

      {/* Certification */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
            Nous sommes certifiés !
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            E2I Assistance est partenaire 3CX Silver et certifié ! Visitez le site internet 
            de notre partenaire et souscrivez à une version d'évaluation du standard téléphonique.
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp"
                alt="3CX Silver Partner Badge"
                width={128}
                height={128}
                className="h-32 w-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
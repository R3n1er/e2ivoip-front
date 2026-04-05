import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trunk SIP — Passerelles Opérateur | E2I VoIP DOM",
  description:
    "Trunk SIP pour entreprises en Outre-mer : connectez votre IPBX à notre réseau. Comparez l'offre au compteur et l'offre illimitée.",
  alternates: {
    canonical: "/telephonie-entreprise/trunk-sip",
  },
  openGraph: {
    title: "Trunk SIP — E2I VoIP",
    description:
      "Passerelles SIP professionnelles pour Antilles, Guyane et Réunion.",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip",
    siteName: "E2I VoIP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP — E2I VoIP",
    description:
      "Passerelles SIP professionnelles pour Antilles, Guyane et Réunion.",
  },
};

const offers = [
  {
    icon: "lni-bar-chart",
    title: "Trunk SIP au compteur",
    description:
      "Facturation à la consommation réelle, idéal pour les volumes variables ou les sites à piloter au plus près du budget.",
    features: [
      "Facturation à la minute",
      "Pas d'engagement de volume",
      "Adapté aux pics d'activité",
      "Numéros locaux garantis",
    ],
    href: "/telephonie-entreprise/trunk-sip-compteur",
    cta: "Découvrir l'offre au compteur",
  },
  {
    icon: "lni-infinite",
    title: "Trunk SIP illimité",
    description:
      "Prévisibilité maximale avec un forfait adapté aux équipes qui passent beaucoup d'appels nationaux et internationaux.",
    features: [
      "Forfait mensuel fixe",
      "Appels nationaux illimités",
      "Budget prévisible",
      "Multi-canaux disponible",
    ],
    href: "/telephonie-entreprise/trunk-sip-illimite",
    cta: "Découvrir l'offre illimitée",
  },
];

export default function TrunkSipPresentationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#091421] py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 monolith-grid-lines opacity-30"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
            Certifié opérateur — Guadeloupe, Martinique, Guyane et La Réunion
          </p>
          <div className="border-l-8 border-red-primary pl-6">
            <h1 className="mb-6 font-black tracking-[-0.05em] uppercase leading-none text-white">
              <span className="block text-5xl md:text-7xl lg:text-8xl">TRUNK</span>
              <span className="block text-5xl md:text-7xl lg:text-8xl text-red-primary">SIP</span>
            </h1>
          </div>
          <p className="mt-8 mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
            Le réseau RTC ferme : migrez votre IPBX vers une infrastructure SIP
            opérateur, sans rupture de service. En Guadeloupe, Martinique, Guyane
            et à La Réunion, un interlocuteur unique gère votre raccordement de
            bout en bout. Choisissez le modèle tarifaire adapté à votre volume
            d&apos;appels.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/devis-en-ligne"
              className="monolith-btn bg-red-primary px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-white"
            >
              Devis en ligne
            </Link>
            <Link
              href="/contact"
              className="monolith-btn bg-white px-8 py-4 font-black uppercase tracking-[0.2em] text-xs text-[#091421]"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Nos offres */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
            Deux formules
          </p>
          <h2 className="mb-4 font-black tracking-[-0.05em] uppercase text-3xl text-[#2D3848] md:text-4xl">
            NOS OFFRES TRUNK SIP
          </h2>
          <p className="mb-12 max-w-2xl text-[#818096] leading-relaxed">
            Le RTC disparaît : deux formules pour basculer vers le SIP, que vous
            soyez PME ou réseau multi-sites en Guadeloupe, Martinique, Guyane et
            à La Réunion. Un seul interlocuteur, un seul contrat opérateur.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.href}
                className="flex flex-col border-4 border-[#2D3848] bg-white p-8 shadow-[8px_8px_0px_0px_#1F2937]"
              >
                <div className="mb-4 w-12 h-12 bg-red-primary flex items-center justify-center">
                  <i className={`lni ${offer.icon} text-white text-xl`} aria-hidden="true" />
                </div>
                <div className="border-l-4 border-red-primary pl-4 mb-6">
                  <h3 className="mb-3 font-black tracking-[-0.03em] text-xl uppercase text-[#2D3848]">
                    {offer.title}
                  </h3>
                  <p className="text-[#818096] text-sm leading-relaxed">
                    {offer.description}
                  </p>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {offer.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-[#2D3848]">
                      <span className="w-1.5 h-1.5 bg-red-primary flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={offer.href}
                  className="monolith-btn bg-red-primary inline-flex w-fit items-center px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] text-white"
                >
                  {offer.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="bg-red-primary border-y-8 border-[#2D3848] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 font-black uppercase tracking-[0.3em] text-[10px] text-white/70">
            Votre réseau RTC s&apos;arrête — ne subissez pas la transition.
          </p>
          <h2 className="mb-8 font-black tracking-[-0.05em] uppercase text-3xl text-white md:text-4xl">
            DÉCOUVREZ TOUTE<br />NOTRE TÉLÉPHONIE
          </h2>
          <Link
            href="/telephonie-entreprise"
            className="monolith-btn bg-[#091421] inline-block px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-white"
          >
            Voir la téléphonie d&apos;entreprise
          </Link>
        </div>
      </section>
    </main>
  );
}

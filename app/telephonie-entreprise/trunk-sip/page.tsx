import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trunk SIP — Présentation | E2I VoIP DOM",
  description:
    "Trunk SIP pour entreprises en Outre-mer : connectez votre IPBX à notre réseau. Comparez l'offre au compteur et l'offre illimitée.",
  openGraph: {
    title: "Trunk SIP — E2I VoIP",
    description:
      "Passerelles SIP professionnelles pour Antilles, Guyane et Réunion.",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip",
    siteName: "E2I VoIP",
    type: "website",
  },
};

const offers = [
  {
    title: "Trunk SIP au compteur",
    description:
      "Facturation à la consommation réelle, idéal pour les volumes variables ou les sites à piloter au plus près du budget.",
    href: "/telephonie-entreprise/trunk-sip-compteur",
    cta: "Découvrir l'offre au compteur",
  },
  {
    title: "Trunk SIP illimité",
    description:
      "Prévisibilité maximale avec un forfait adapté aux équipes qui passent beaucoup d'appels nationaux et internationaux.",
    href: "/telephonie-entreprise/trunk-sip-illimite",
    cta: "Découvrir l'offre illimitée",
  },
];

export default function TrunkSipPresentationPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <section className="relative overflow-hidden bg-[#091421] py-20 md:py-28">
          <div
            className="pointer-events-none absolute inset-0 monolith-grid-lines opacity-30"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
              Téléphonie d&apos;entreprise
            </p>
            <h1 className="mb-6 max-w-3xl font-black tracking-[-0.04em] text-4xl text-white md:text-5xl lg:text-6xl">
              Trunk SIP : connectez votre IPBX à notre réseau
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
              Une passerelle SIP fiable pour relier votre standard 3CX, Yeastar ou
              autre IPBX à notre infrastructure opérateur en Outre-mer. Choisissez
              le modèle tarifaire qui correspond à votre activité.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/devis-en-ligne"
                className="monolith-btn bg-red-primary px-8 py-4 font-black uppercase tracking-[0.2em] text-xs text-white"
              >
                Devis en ligne
              </Link>
              <Link
                href="/contact"
                className="monolith-btn border border-white bg-white px-8 py-4 font-black uppercase tracking-[0.2em] text-xs text-[#091421]"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 font-black tracking-[-0.04em] text-3xl text-blue-marine md:text-4xl">
              Nos offres Trunk SIP
            </h2>
            <p className="mb-12 max-w-2xl text-gray-secondary">
              Deux formules pour couvrir les besoins des PME et des réseaux multi-sites
              aux Antilles, en Guyane et à La Réunion.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {offers.map((offer) => (
                <article
                  key={offer.href}
                  className="flex flex-col border border-gray-secondary/10 bg-white p-8 shadow-[4px_4px_0_0_#1F2937]"
                >
                  <h3 className="mb-4 font-black tracking-[-0.03em] text-xl text-blue-marine">
                    {offer.title}
                  </h3>
                  <p className="mb-8 flex-1 text-gray-secondary leading-relaxed">
                    {offer.description}
                  </p>
                  <Link
                    href={offer.href}
                    className="monolith-btn bg-red-primary inline-flex w-fit items-center px-6 py-3 font-black uppercase tracking-[0.2em] text-[10px] text-white"
                  >
                    {offer.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-secondary/10 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-secondary">
              Besoin d&apos;un PBX ou d&apos;une téléphonie complète ?
            </p>
            <Link
              href="/telephonie-entreprise"
              className="mt-4 inline-block font-bold text-red-primary underline-offset-4 hover:underline"
            >
              Voir la téléphonie d&apos;entreprise
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

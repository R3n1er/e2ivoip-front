export const dynamic = "force-dynamic";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Téléphonie d'Entreprise - E2I VoIP | Solutions IP DOM",
  description:
    "Solutions de téléphonie IP complètes pour entreprises en Outre-mer. Trunk SIP, 3CX PRO, Yeastar. Déploiement rapide, support local, économies garanties.",
  keywords:
    "téléphonie entreprise, trunk SIP, 3CX PRO, Yeastar IPBX, VoIP Antilles, téléphonie IP DOM",
  alternates: {
    canonical: "/telephonie-entreprise",
  },
  openGraph: {
    title: "Téléphonie d'Entreprise - E2I VoIP",
    description:
      "Solutions IP complètes pour PME et grandes entreprises en DOM. Trunk SIP, 3CX, Yeastar.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Téléphonie d'Entreprise - E2I VoIP",
    description:
      "Solutions IP complètes pour PME et grandes entreprises en DOM. Trunk SIP, 3CX, Yeastar.",
  },
};

const features = [
  {
    icon: "lni-phone",
    title: "Standards IP complets",
    description:
      "Auto-commutateur, messagerie vocale, transfert d'appels, conférence téléphonique.",
  },
  {
    icon: "lni-users",
    title: "Multi-sites unifiés",
    description:
      "Interconnectez tous vos sites avec numérotation abrégée et annuaire centralisé.",
  },
  {
    icon: "lni-headphone",
    title: "Centre d'appels",
    description:
      "Distribution automatique, supervision temps réel, enregistrement et statistiques.",
  },
];

const solutions = [
  {
    icon: "lni-cloud",
    title: "Trunk SIP",
    description:
      "Passerelles SIP professionnelles pour relier votre IPBX à notre réseau opérateur DOM.",
    href: "/telephonie-entreprise/trunk-sip",
  },
  {
    icon: "lni-phone",
    title: "3CX PRO Dédiée",
    description:
      "IPBX dédié haute performance pour entreprises multisites et communications unifiées.",
    href: "/telephonie-entreprise/3cx-pro-dediee",
  },
  {
    icon: "lni-users",
    title: "3CX SMB Mutualisée",
    description:
      "Solution 3CX partagée idéale pour les PME jusqu'à 10 utilisateurs.",
    href: "/telephonie-entreprise/3cx-smb-mutualisee",
  },
  {
    icon: "lni-laptop",
    title: "Yeastar IPBX",
    description:
      "Autocommutateurs Yeastar P-Series pour une téléphonie fiable et évolutive.",
    href: "/telephonie-entreprise/pbx-yeastar",
  },
];

export default function TelephonieDentreprise() {
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
            E2I VoIP
          </p>
          <div className="border-l-8 border-red-primary pl-6">
            <h1 className="mb-6 font-black tracking-[-0.05em] uppercase leading-none text-white">
              <span className="block text-5xl md:text-7xl lg:text-8xl">TÉLÉPHONIE</span>
              <span className="block text-5xl md:text-7xl lg:text-8xl text-red-primary">D'ENTREPRISE</span>
            </h1>
          </div>
          <p className="mt-8 mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
            Des solutions de téléphonie IP complètes et évolutives pour répondre
            aux besoins de votre entreprise en Outre-mer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/devis-en-ligne"
              className="monolith-btn bg-red-primary px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-white"
            >
              Demander un devis gratuit
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

      {/* Fonctionnalités clés */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
            Ce que vous obtenez
          </p>
          <h2 className="mb-12 font-black tracking-[-0.05em] uppercase text-3xl text-[#2D3848] md:text-4xl">
            UNE TÉLÉPHONIE<br />PROFESSIONNELLE COMPLÈTE
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-4 border-[#2D3848] bg-white p-8 shadow-[8px_8px_0px_0px_#1F2937]"
              >
                <div className="mb-4 w-12 h-12 bg-red-primary flex items-center justify-center">
                  <i className={`lni ${feature.icon} text-white text-xl`} aria-hidden="true" />
                </div>
                <h3 className="mb-3 font-black tracking-[-0.03em] text-lg uppercase text-[#2D3848]">
                  {feature.title}
                </h3>
                <p className="text-[#818096] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions spécialisées */}
      <section className="py-20 bg-[#091421]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
            Nos solutions
          </p>
          <h2 className="mb-12 font-black tracking-[-0.05em] uppercase text-3xl text-white md:text-4xl">
            CHOISISSEZ<br />VOTRE SOLUTION
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                href={solution.href}
                className="group flex gap-6 border-4 border-[#2D3848] bg-white p-8 shadow-[8px_8px_0px_0px_#1F2937] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
              >
                <div className="w-12 h-12 bg-red-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <i className={`lni ${solution.icon} text-white text-xl`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="border-l-4 border-red-primary pl-4">
                    <h3 className="mb-2 font-black tracking-[-0.03em] text-xl text-[#2D3848] group-hover:text-red-primary transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-[#818096] text-sm leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <span className="font-black uppercase tracking-[0.2em] text-[10px] text-red-primary group-hover:translate-x-1 transition-transform inline-block">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-primary border-y-8 border-[#2D3848] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 font-black uppercase tracking-[0.3em] text-[10px] text-white/70">
            Passez à la téléphonie IP
          </p>
          <h2 className="mb-6 font-black tracking-[-0.05em] uppercase text-4xl text-white md:text-5xl">
            DEVIS GRATUIT<br />SOUS 24H
          </h2>
          <p className="mb-10 max-w-xl mx-auto text-white/85 text-lg leading-relaxed">
            Nos experts analysent votre infrastructure actuelle et vous proposent
            la solution la plus adaptée à vos besoins.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/devis-en-ligne"
              className="monolith-btn bg-[#091421] px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-white"
            >
              Devis en ligne
            </Link>
            <Link
              href="/nos-services"
              className="monolith-btn bg-white px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-[#091421]"
            >
              Tous nos services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

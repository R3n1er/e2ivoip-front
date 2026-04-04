export const dynamic = "force-dynamic";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services Téléphonie IP - E2I VoIP | Solutions DOM",
  description:
    "Découvrez nos solutions de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX PRO, assistants vocaux IA. Économies 30% garanties. Devis gratuit.",
  keywords:
    "téléphonie IP entreprise, trunk SIP DOM, 3CX PRO, assistants vocaux IA, studio enregistrement, VoIP Antilles",
  alternates: {
    canonical: "/nos-services",
  },
  openGraph: {
    title: "Nos Services Téléphonie IP - E2I VoIP",
    description:
      "Solutions complètes de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX et IA. Économies 30% garanties.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/nos-services",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services Téléphonie IP - E2I VoIP",
    description:
      "Solutions complètes de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX et IA.",
  },
};

const services = [
  {
    icon: "lni-cloud",
    label: "Téléphonie IP",
    title: "Trunk SIP DOM",
    description:
      "Au compteur ou illimité, éligible Antilles-Guyane-Réunion avec création de numéros locaux.",
    features: [
      "Économies jusqu'à 30%",
      "Numéros locaux garantis",
      "Portabilité gratuite",
      "Support technique local",
      "2 canaux voix inclus",
    ],
    price: "À partir de 2 canaux voix",
    href: "/telephonie-entreprise/trunk-sip",
  },
  {
    icon: "lni-users",
    label: "Téléphonie IP",
    title: "3CX SMB PRO",
    description:
      "IPBX cloud nouvelle génération jusqu'à 10 utilisateurs avec Customer Success Manager dédié.",
    features: [
      "Instance sécurisée pro",
      "Formation incluse",
      "Support utilisateur dédié",
      "Interface intuitive",
    ],
    price: "15 €/mois/utilisateur",
    href: "/telephonie-entreprise/3cx-smb-pro",
  },
  {
    icon: "lni-phone",
    label: "Téléphonie IP",
    title: "3CX PRO Dédié",
    description:
      "Votre IPBX dédié haute performance pour entreprises multisites avec communications unifiées.",
    features: [
      "Serveur dédié",
      "8 appels simultanés minimum",
      "Multi-sites",
      "Tableau de bord avancé",
    ],
    price: "Sur devis",
    href: "/telephonie-entreprise/3cx-pro-dediee",
  },
  {
    icon: "lni-comments",
    label: "Innovation",
    title: "Assistants Vocaux IA",
    description:
      "Accueil client 24/7 avec intelligence artificielle et transcription des appels.",
    features: [
      "Accueil 24/7",
      "Compréhension naturelle",
      "Transcription automatique",
      "Intégration CRM",
    ],
    price: "Sur devis",
    href: "/nos-services/assistants-vocaux-ia",
  },
  {
    icon: "lni-bar-chart",
    label: "Communication",
    title: "Studio d'Enregistrement",
    description:
      "Messages vocaux professionnels et musiques personnalisées pour votre standard.",
    features: [
      "Voix professionnelles",
      "Musiques libres de droits",
      "Messages sur mesure",
      "Qualité studio",
    ],
    price: "À partir de 50 €",
    href: "/nos-services/studio-attente",
  },
];

const benefits = [
  {
    icon: "lni-bolt",
    title: "Économies garanties",
    description: "Jusqu'à 30% de réduction sur vos factures télécom",
  },
  {
    icon: "lni-map-marker",
    title: "Présence locale DOM",
    description: "Support technique réactif dans toutes les zones",
  },
  {
    icon: "lni-timer",
    title: "Disponibilité 24/7",
    description: "Services et support disponibles en permanence",
  },
  {
    icon: "lni-shield",
    title: "Sécurité maximale",
    description: "Infrastructure cloud France/UE conforme RGPD",
  },
];

export default function NosServices() {
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
            <h1 className="mb-6 font-black tracking-[-0.05em] uppercase text-5xl text-white md:text-7xl lg:text-8xl leading-none">
              NOS
              <br />
              SERVICES
            </h1>
          </div>
          <p className="mt-8 mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
            Solutions complètes de téléphonie IP pour entreprises en Outre-mer.
            Économies garanties, déploiement rapide, support local.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="monolith-btn bg-red-primary px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-white"
            >
              Audit télécom gratuit
            </Link>
            <Link
              href="/devis-en-ligne"
              className="monolith-btn bg-white px-8 py-4 font-black uppercase tracking-[0.2em] text-xs text-[#091421]"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
            Pourquoi E2I VoIP
          </p>
          <h2 className="mb-12 font-black tracking-[-0.05em] uppercase text-3xl text-[#2D3848] md:text-4xl">
            500+ ENTREPRISES<br />NOUS FONT CONFIANCE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="border-4 border-[#2D3848] bg-white p-6 shadow-[8px_8px_0px_0px_#1F2937]"
              >
                <div className="mb-4 w-12 h-12 bg-red-primary flex items-center justify-center">
                  <i className={`lni ${benefit.icon} text-white text-xl`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-black tracking-[-0.03em] text-sm uppercase text-[#2D3848]">
                  {benefit.title}
                </h3>
                <p className="text-[#818096] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#091421]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 font-black uppercase tracking-[0.3em] text-[10px] text-red-primary">
            Catalogue
          </p>
          <h2 className="mb-12 font-black tracking-[-0.05em] uppercase text-3xl text-white md:text-4xl">
            NOS SOLUTIONS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group block border-4 border-[#2D3848] bg-white p-8 shadow-[8px_8px_0px_0px_#1F2937] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all"
              >
                <div className="mb-2">
                  <span className="font-black uppercase tracking-[0.3em] text-[10px] text-[#818096]">
                    {service.label}
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-primary flex items-center justify-center flex-shrink-0">
                    <i className={`lni ${service.icon} text-white text-lg`} aria-hidden="true" />
                  </div>
                  <h3 className="font-black tracking-[-0.03em] text-xl text-[#2D3848] group-hover:text-red-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="border-l-4 border-red-primary pl-4 mb-6">
                  <p className="text-[#818096] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-[#2D3848]">
                      <span className="w-1.5 h-1.5 bg-red-primary flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t-2 border-[#2D3848] pt-4">
                  <span className="font-black text-sm text-[#2D3848]">{service.price}</span>
                  <span className="font-black uppercase tracking-[0.2em] text-[10px] text-red-primary group-hover:translate-x-1 transition-transform inline-block">
                    En savoir plus →
                  </span>
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
            Prêt à passer à l'action ?
          </p>
          <h2 className="mb-6 font-black tracking-[-0.05em] uppercase text-4xl text-white md:text-5xl">
            ÉCONOMISEZ 30%<br />SUR VOS TÉLÉCOMS
          </h2>
          <p className="mb-10 max-w-xl mx-auto text-white/85 text-lg leading-relaxed">
            Nos experts analysent gratuitement votre infrastructure actuelle et
            vous proposent la solution la plus adaptée.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="monolith-btn bg-[#091421] px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-white"
            >
              Audit télécom gratuit
            </Link>
            <Link
              href="/devis-en-ligne"
              className="monolith-btn bg-white px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-[#091421]"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

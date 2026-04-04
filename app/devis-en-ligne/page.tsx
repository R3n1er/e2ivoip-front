import type { Metadata } from "next";
import Link from "next/link";
import { FullContactForm } from "@/components/hubspot";
import { ClientsCarousel } from "@/components/clients-carousel";

export const metadata: Metadata = {
  title: "Devis Rapide et Gratuit — Téléphonie IP Professionnelle | E2I VoIP",
  description:
    "Recevez un devis personnalisé en moins de 24h pour votre projet télécom. Trunk SIP, 3CX VoIP, portabilité, PBX — experts en téléphonie IP dans les DOM et en France.",
  alternates: {
    canonical: "/devis-en-ligne",
  },
};

const devisButtons = [
  {
    title: "Devis Trunk SIP",
    href: "https://urlr.me/!E2IVOIP-Devis-TrunkSIP",
    primary: true,
  },
  {
    title: "Devis Portabilité",
    href: "https://urlr.me/!E2IVOIP-EtudePortaVoIP",
    primary: false,
  },
  {
    title: "Devis VoIP 3CX",
    href: "https://urlr.me/!mon-projet-Voip-E2I",
    primary: true,
  },
  {
    title: "Devis Projet PBX",
    href: "https://urlr.me/!E2I-Devis_IntegrationPBX",
    primary: false,
  },
];

const avantages = [
  {
    icon: "01",
    title: "Réponse sous 24h",
    description: "Par un expert en téléphonie IP dédié à votre projet",
  },
  {
    icon: "02",
    title: "Accompagnement gratuit",
    description: "Sans engagement, sans frais cachés",
  },
  {
    icon: "03",
    title: "Offres sur mesure",
    description: "Dimensionnées selon votre activité réelle",
  },
  {
    icon: "04",
    title: "Support technique réactif",
    description: "Local dans les DOM et en France métropolitaine",
  },
];

const faqItems = [
  {
    question: "Quel est le délai moyen pour obtenir un devis personnalisé ?",
    answer:
      "Nous traitons votre demande de devis du lundi au vendredi. Si votre formulaire est complet, vous recevrez une proposition sous 24 heures ouvrées. Si des informations complémentaires sont nécessaires, notre équipe vous contactera rapidement pour affiner votre demande.",
  },
  {
    question:
      "Quelles différences entre un Trunk SIP 'au compteur' et 'illimité' ?",
    answer:
      "Nous recommandons systématiquement à nos clients des Trunk SIP au compteur, soigneusement dimensionnés pour correspondre à leur consommation réelle. Cette solution offre l'avantage de ne payer que les appels effectués, ce qui est particulièrement adapté aux PME ayant un volume d'appels variable.",
  },
  {
    question: "Puis-je conserver mes numéros actuels avec votre solution ?",
    answer:
      "Oui, nous prenons en charge la portabilité de vos numéros fixes en France métropolitaine et dans les DOM TOM. Vous devez nous communiquer votre numéro RIO pour cela. Par ailleurs, nous proposons des solutions flexibles adaptées à votre infrastructure existante.",
  },
  {
    question:
      "Quel débit internet est nécessaire pour une qualité d'appel optimale ?",
    answer:
      "Pour bénéficier d'une qualité d'appel optimale avec nos solutions de téléphonie IP, votre accès Internet doit être conforme à nos spécifications techniques. Nous acceptons les connexions Fibre, 4G, 5G et Starlink. Le débit nécessaire est de 100 Kbps par appel simultané.",
  },
];

export default function DevisEnLignePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative bg-[#091421] py-32 px-8 lg:px-24 overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E53E3E 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Grid lines overlay */}
        <div className="monolith-grid-lines absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          {/* Micro-label */}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-6">
            Devis personnalisé — réponse sous 24h
          </p>

          {/* Accent bar + title */}
          <div className="border-l-8 border-[#E53E3E] pl-8 mb-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase leading-none text-white">
              Devis Rapide
              <br />
              <span className="text-[#E53E3E]">et Gratuit</span>
            </h1>
          </div>

          <p className="text-lg text-[#818096] max-w-2xl mb-10 leading-relaxed">
            Solutions de téléphonie professionnelle adaptées à vos besoins.
            Trunk SIP, 3CX VoIP, portabilité, intégration PBX — nos experts
            vous accompagnent sans engagement.
          </p>

          {/* CTA call */}
          <a
            href="tel:+594594963500"
            className="monolith-btn inline-flex items-center gap-3 bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5"
          >
            <span aria-hidden="true">↗</span>
            Appeler maintenant
          </a>
        </div>
      </section>

      {/* ── DEVIS BUTTONS ───────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
            Choisissez votre type de devis
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#2D3848] mb-6">
            Quel projet souhaitez-vous
            <br />
            développer ?
          </h2>
          <p className="text-[#818096] max-w-3xl mb-16 leading-relaxed">
            Que vous cherchiez à mettre en place un{" "}
            <strong className="text-[#2D3848]">Trunk SIP professionnel</strong>,
            une solution{" "}
            <strong className="text-[#2D3848]">3CX VoIP dédiée ou mutualisée</strong>,
            installer une solution Yeastar ou à{" "}
            <strong className="text-[#2D3848]">
              porter vos numéros existants
            </strong>{" "}
            sur nos Trunk SIP opérateur, notre équipe vous accompagne.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {devisButtons.map((btn) => (
              <a
                key={btn.title}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`monolith-btn w-full py-5 px-8 text-center font-black uppercase tracking-[0.2em] text-xs transition-transform ${
                  btn.primary
                    ? "bg-[#E53E3E] text-white"
                    : "bg-[#2D3848] text-white"
                }`}
              >
                {btn.title}
              </a>
            ))}
          </div>

          {/* Urgency note */}
          <div className="mt-16 border-l-4 border-[#E53E3E] pl-6">
            <p className="text-[#2D3848] font-black uppercase tracking-[0.1em] text-sm mb-1">
              Projet urgent ?
            </p>
            <p className="text-[#818096] text-sm">
              Contactez directement notre équipe commerciale au{" "}
              <a
                href="tel:+594594963500"
                className="text-[#E53E3E] font-black hover:underline"
              >
                05 94 96 35 00
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── AVANTAGES ───────────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
            Pourquoi E2I VoIP
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white mb-16">
            Ce que vous gagnez
            <br />
            avec nous
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((item) => (
              <div
                key={item.title}
                className="border-4 border-[#2D3848] bg-[#0d1b2a] p-8 shadow-[8px_8px_0px_0px_#1F2937]"
              >
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
                  {item.icon}
                </span>
                <h3 className="text-lg font-black uppercase tracking-[-0.03em] text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[#818096] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS CAROUSEL ────────────────────────────────────────── */}
      <ClientsCarousel />

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
            Questions fréquentes
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#2D3848] mb-16">
            F.A.Q
          </h2>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="border-4 border-[#2D3848] bg-white p-8 shadow-[8px_8px_0px_0px_#1F2937]"
              >
                <h3 className="text-base font-black uppercase tracking-[-0.02em] text-[#2D3848] mb-4">
                  {item.question}
                </h3>
                <p className="text-[#818096] leading-relaxed text-sm">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ────────────────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
            Formulaire de contact
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white mb-4">
            Décrivez votre projet
          </h2>
          <p className="text-[#818096] mb-12 leading-relaxed">
            Remplissez le formulaire ci-dessous. Un expert vous répond sous 24h
            ouvrées.
          </p>

          <div className="border-4 border-[#2D3848] bg-white shadow-[12px_12px_0px_0px_#1F2937] p-8 md:p-12">
            <FullContactForm />
          </div>
        </div>
      </section>

      {/* ── CERTIFICATION ───────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-[#2D3848] bg-white shadow-[8px_8px_0px_0px_#1F2937] p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
                Partenaire certifié
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.05em] uppercase text-[#2D3848] mb-4">
                Nous sommes certifiés !
              </h2>
              <p className="text-[#818096] leading-relaxed">
                E2I Assistance est partenaire 3CX Silver et certifié. Visitez le
                site de notre partenaire et souscrivez à une version
                d&apos;évaluation du standard téléphonique.
              </p>
            </div>
            <div className="shrink-0 border-4 border-[#2D3848] bg-[#f9f9f9] p-6">
              <img
                src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp"
                alt="3CX Silver Partner Badge"
                className="h-28 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-8 lg:px-24 bg-[#2D3848]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-3">
              Prêt à démarrer ?
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.05em] uppercase text-white">
              Lancez votre projet VoIP
              <br />
              dès aujourd&apos;hui
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="monolith-btn bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5"
            >
              Nous contacter
            </Link>
            <Link
              href="/solutions"
              className="monolith-btn bg-white text-[#091421] font-black uppercase tracking-[0.2em] text-xs px-8 py-4"
            >
              Voir nos solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

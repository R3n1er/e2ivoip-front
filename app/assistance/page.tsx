import { Metadata } from "next";
import WorkingFAQ from "@/components/faq-working";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assistance & Support - E2I VoIP | Support technique 24/7 DOM",
  description:
    "Support technique E2I VoIP 24/7. Assistance locale DOM, hotline 0189 560 500, chat en ligne. Guides, tutoriels 3CX, dépannage téléphonie IP.",
  keywords:
    "assistance E2I VoIP, support technique DOM, hotline téléphonie IP, dépannage 3CX, support local Martinique Guadeloupe Guyane, chat assistance",
  alternates: {
    canonical: "/assistance",
  },
  openGraph: {
    title: "Assistance & Support - E2I VoIP | Support technique 24/7",
    description:
      "Support technique E2I VoIP 24/7. Équipes locales DOM, chat en ligne, guides et tutoriels.",
    type: "website",
  },
};

export default function AssistancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ── */}
      <section className="relative bg-[#091421] py-24 overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Micro-label */}
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-6">
              Support &amp; Assistance
            </p>

            {/* Left accent bar + title */}
            <div className="border-l-8 border-[#E53E3E] pl-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
                Assistance
                <br />
                <span className="text-[#E53E3E]">&amp; Support</span>
                <br />
                VoIP
              </h1>
            </div>

            <p className="text-lg text-[#818096] mt-8 max-w-2xl leading-relaxed">
              Support technique 3CX et Yeastar • Équipes locales France et
              Outre-mer (Antilles-Guyane, Réunion) • Réponse rapide
            </p>
            <p className="text-base text-[#818096] mt-4 max-w-2xl">
              Notre équipe d&apos;experts est là pour vous accompagner dans
              l&apos;utilisation de vos solutions téléphoniques.
            </p>
          </div>
        </div>
      </section>

      {/* ── Hotline Support ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
            Contact direct
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#2D3848] mb-12">
            Hotline{" "}
            <span className="text-[#E53E3E]">Support</span>
          </h2>

          {/* Hotline card */}
          <div className="border-4 border-[#2D3848] shadow-[8px_8px_0px_0px_#1F2937] p-12 bg-white">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#E53E3E] flex items-center justify-center mb-2">
                <i className="lni lni-phone text-white text-3xl" aria-hidden="true" />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096]">
                Assistance téléphonique directe
              </p>

              <p className="text-5xl font-black tracking-[-0.04em] text-[#E53E3E]">
                0189 560 500
              </p>

              <p className="text-lg font-bold text-[#2D3848] uppercase tracking-[0.1em]">
                Lundi – Vendredi : 8h – 18h
              </p>

              <div className="mt-4 border-4 border-[#E53E3E] px-6 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E]">
                  Support prioritaire selon contrat client
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chat assistance instantanée ── */}
      <section className="py-20 bg-[#091421]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
            Temps réel
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white mb-4">
            Chat{" "}
            <span className="text-[#E53E3E]">assistance instantanée</span>
          </h2>
          <p className="text-lg text-[#818096] mb-12">
            Discutez directement avec nos experts techniques en temps réel
          </p>

          {/* Chat card */}
          <div className="border-4 border-[#2D3848] shadow-[8px_8px_0px_0px_#1F2937] p-8 bg-[#091421]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-[#2D3848] border-4 border-[#E53E3E] flex items-center justify-center mb-2">
                <i className="lni lni-comments text-[#E53E3E] text-2xl" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-black tracking-[-0.04em] uppercase text-white">
                Support chat en direct
              </h3>
              <p className="text-[#818096] max-w-md">
                Notre équipe est disponible pour répondre à toutes vos questions
              </p>

              {/* Chat Tawk.to désactivé temporairement */}
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096] mt-4">
                Service disponible via notre widget de chat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkingFAQ />
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-[#E53E3E] border-y-8 border-[#2D3848]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D3848] mb-4">
            Besoin d&apos;un accompagnement complet ?
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white mb-8 leading-tight">
            Contactez-nous
            <br />
            maintenant
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="relative inline-block bg-white text-[#091421] font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{
                boxShadow: "5px 5px 0px 0px #1F2937",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "3px 3px 0px 0px #1F2937";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "5px 5px 0px 0px #1F2937";
              }}
            >
              Demander un devis
            </Link>
            <Link
              href="/"
              className="relative inline-block bg-[#091421] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{
                boxShadow: "5px 5px 0px 0px #1F2937",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "3px 3px 0px 0px #1F2937";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "5px 5px 0px 0px #1F2937";
              }}
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

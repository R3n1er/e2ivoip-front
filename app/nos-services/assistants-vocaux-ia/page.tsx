import Link from "next/link";
import { ContactFormAssistantIA } from "@/components/contact-form-assistant-ia";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistants Vocaux IA Telephoniques — Accueil 24/7 | E2I VoIP",
  description:
    "Révolutionnez votre accueil téléphonique avec l'intelligence artificielle. Accueil 24/7, qualification automatique, relais humain maîtrisé.",
  alternates: {
    canonical: "/nos-services/assistants-vocaux-ia",
  },
  openGraph: {
    title: "Assistants Vocaux IA Telephoniques — Accueil 24/7 | E2I VoIP",
    description:
      "Révolutionnez votre accueil téléphonique avec l'intelligence artificielle. Accueil 24/7, qualification automatique, relais humain maîtrisé.",
    url: "/nos-services/assistants-vocaux-ia",
    siteName: "E2I VoIP",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function AssistantsVocauxIA() {
  return (
    <main className="pt-20">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421] relative overflow-hidden">
        {/* Dot pattern radial red */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E53E3E 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 monolith-grid-lines opacity-10 pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Micro-label */}
          <div className="inline-flex items-center gap-2 mb-8 border border-[#E53E3E]/40 px-4 py-2 bg-[#E53E3E]/5">
            <i className="lni lni-cog text-[#E53E3E] text-sm" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E]">
              Intelligence Artificielle
            </span>
          </div>

          <div className="border-l-8 border-[#E53E3E] pl-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
              Assistants vocaux{" "}
              <span className="text-[#E53E3E]">IA</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold mb-4 leading-snug">
              Révolutionnez votre accueil téléphonique avec
              l&rsquo;intelligence artificielle
            </p>
            <p className="text-base text-white/70 mb-10 max-w-2xl leading-relaxed">
              Offrez une expérience client exceptionnelle 24h/24. Vos
              appelants sont accueillis, qualifiés et orientés
              automatiquement, même en dehors de vos horaires
              d&rsquo;ouverture.
            </p>

            <a href="#contact" className="monolith-btn bg-[#E53E3E] inline-block">
              <span className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5">
                <i className="lni lni-comments" aria-hidden="true" />
                Parler à un expert
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRODUCTION ────────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — text */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] block mb-4">
                Pourquoi l&rsquo;IA vocale ?
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#091421] mb-8 leading-tight">
                Réinventez votre réception téléphonique grâce à
                l&rsquo;assistant vocal{" "}
                <span className="text-[#E53E3E]">IA sur mesure</span>
              </h2>
              <p className="text-base text-[#818096] mb-6 leading-relaxed">
                Vous savez mieux que personne que chaque appel entrant est une
                opportunité : un client potentiel, un partenaire stratégique
                ou une demande urgente. Pourtant, manquer un appel, faire
                patienter vos prospects ou perdre du temps avec des demandes
                non qualifiées peut impacter votre croissance.
              </p>
              <p className="text-base text-[#818096] mb-6 leading-relaxed">
                Et si vous pouviez offrir une réponse professionnelle 24h/24,
                tout en recentrant vos équipes sur l&rsquo;essentiel ?
              </p>
              <p className="text-base text-[#818096] leading-relaxed">
                C&rsquo;est précisément ce que nous vous proposons avec notre{" "}
                <strong className="text-[#2D3848]">
                  service d&rsquo;assistant vocal intelligent
                </strong>
                , conçu pour les entrepreneurs comme vous, qui veulent gagner
                en efficacité sans sacrifier la qualité de l&rsquo;accueil.
              </p>
            </div>

            {/* Right — advantage cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "lni-phone",
                  title: "Accueil 24/7",
                  text: "Plus jamais un appel en absence. Votre assistant répond à toute heure avec professionnalisme.",
                  accent: "#E53E3E",
                },
                {
                  icon: "lni-users",
                  title: "Qualification",
                  text: "Identifiez les leads chauds, triez les demandes et fixez des rendez-vous directement.",
                  accent: "#2D3848",
                },
                {
                  icon: "lni-timer",
                  title: "Gain de temps",
                  text: "Libérez 30% du temps de vos équipes en automatisant le filtrage des appels.",
                  accent: "#E53E3E",
                },
                {
                  icon: "lni-rocket",
                  title: "ROI immédiat",
                  text: "Convertissez plus d\u2019opportunités sans augmenter vos effectifs.",
                  accent: "#2D3848",
                },
              ].map(({ icon, title, text, accent }) => (
                <div
                  key={title}
                  className="bg-white border-4 border-[#2D3848] shadow-[8px_8px_0px_0px_#1F2937] p-6 flex flex-col items-start"
                  style={{ borderTopColor: accent }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-4 border-2"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <i className={`lni ${icon} text-2xl`} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#091421] mb-2">
                    {title}
                  </h3>
                  <p className="text-[#818096] text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LES 3 PILIERS ───────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E53E3E 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.06,
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] block mb-4">
              Architecture
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white leading-tight max-w-3xl">
              Les 3 piliers de votre{" "}
              <span className="text-[#E53E3E]">assistant IA</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-4">
              Une solution complète pour transformer votre accueil téléphonique
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: "lni-microphone",
                title: "Un accueil impeccable, 24h/24",
                text: "Plus jamais un appel en absence ou une première impression bâclée. Votre assistant gère les appels hors horaires ou en surcharge avec une courtoisie irréprochable.",
                accent: "#E53E3E",
              },
              {
                num: "02",
                icon: "lni-bolt-alt",
                title: "La qualification automatique",
                text: "Pose les bonnes questions pour identifier les leads chauds, trier les demandes et même fixer des rendez-vous directement dans votre agenda. Vous ne perdez plus de temps.",
                accent: "#FFFFFF",
              },
              {
                num: "03",
                icon: "lni-phone",
                title: "Un relais humain maîtrisé",
                text: "Si la conversation nécessite une intervention humaine (pour un devis complexe, une réclamation…), l\u2019assistant transfère intelligemment vers la bonne personne dans votre équipe.",
                accent: "#E53E3E",
              },
            ].map(({ num, icon, title, text, accent }) => (
              <div
                key={num}
                className="bg-white/5 border-4 border-white/10 p-8 flex flex-col"
                style={{ borderTopColor: accent }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center border-2"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <i className={`lni ${icon} text-2xl`} aria-hidden="true" />
                  </div>
                  <span
                    className="text-5xl font-black opacity-20"
                    style={{ color: accent }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-[-0.02em] text-white mb-4">
                  {title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAS D'USAGE ─────────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] block mb-4">
              Exemples concrets
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-[#091421] leading-tight">
              Cas d&rsquo;
              <span className="text-[#E53E3E]">usage concrets</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: "lni-phone",
                accent: "#2D3848",
                title: "Accueil et orientation",
                text: "L\u2019assistant accueille vos appelants et les oriente vers le bon service automatiquement.",
                quote:
                  "« Bonjour, vous êtes bien chez E2I VoIP. Pour le service commercial, dites 'commercial', pour le support technique, dites 'support'... »",
              },
              {
                icon: "lni-comments",
                accent: "#E53E3E",
                title: "Prise de rendez-vous",
                text: "Gestion automatique des plannings et confirmation des créneaux disponibles.",
                quote:
                  "« Je peux vous proposer un rendez-vous mardi 15 à 14h ou mercredi 16 à 10h. Quelle option vous convient ? »",
              },
              {
                icon: "lni-cog",
                accent: "#2D3848",
                title: "Support niveau 1",
                text: "Réponses aux questions fréquentes et résolution des problèmes simples.",
                quote:
                  "« Pour redémarrer votre téléphone IP, maintenez le bouton power enfoncé 5 secondes... »",
              },
            ].map(({ icon, accent, title, text, quote }) => (
              <div
                key={title}
                className="border-4 border-[#2D3848] shadow-[8px_8px_0px_0px_#1F2937] p-8 flex flex-col bg-white"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center border-2 mb-6"
                  style={{ borderColor: accent, color: accent }}
                >
                  <i className={`lni ${icon} text-2xl`} aria-hidden="true" />
                </div>
                <h3 className="text-base font-black uppercase tracking-[0.1em] text-[#091421] mb-4">
                  {title}
                </h3>
                <p className="text-[#818096] text-sm mb-6 flex-grow leading-relaxed">
                  {text}
                </p>
                <div
                  className="p-4 border-l-4 bg-[#091421]/3"
                  style={{ borderLeftColor: accent }}
                >
                  <p className="text-xs text-[#818096] italic font-medium leading-relaxed">
                    {quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ─────────────────────────────────────────── */}
      <section className="py-32 px-8 lg:px-24 bg-[#2D3848]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] block mb-4">
              Capacités
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white leading-tight">
              Fonctionnalités{" "}
              <span className="text-[#E53E3E]">professionnelles</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "lni-cog",
                title: "IA conversationnelle",
                text: "Assistants vocaux intelligents capables de comprendre et répondre naturellement",
                accent: "#E53E3E",
              },
              {
                icon: "lni-timer",
                title: "Disponibilité 24/7",
                text: "Vos clients sont accueillis et orientés à toute heure, même en dehors des horaires",
                accent: "#FFFFFF",
              },
              {
                icon: "lni-users",
                title: "Personnalisation avancée",
                text: "Adaptez le comportement et les réponses selon votre secteur d\u2019activité",
                accent: "#E53E3E",
              },
              {
                icon: "lni-bolt-alt",
                title: "Intégration CRM",
                text: "Connexion directe avec vos outils métier pour un service client optimisé",
                accent: "#FFFFFF",
              },
            ].map(({ icon, title, text, accent }) => (
              <div
                key={title}
                className="bg-white/5 border-2 border-white/10 p-8 flex flex-col items-center text-center"
                style={{ borderTopColor: accent, borderTopWidth: 4 }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center border-2 mb-6"
                  style={{ borderColor: accent, color: accent }}
                >
                  <i className={`lni ${icon} text-2xl`} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white mb-3">
                  {title}
                </h3>
                <p className="text-white/50 text-xs uppercase tracking-wider leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ────────────────────────────────────────────── */}
      <ContactFormAssistantIA />

      {/* ── CTA FINAL ───────────────────────────────────────────────── */}
      <section
        id="contact-cta"
        className="py-32 px-8 lg:px-24 bg-[#E53E3E] border-y-8 border-[#2D3848] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #2D3848 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.12,
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 block mb-6">
            Passez à l&rsquo;action
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6 max-w-3xl">
            Prêt à{" "}
            <span className="text-[#091421]">révolutionner</span>{" "}
            votre accueil téléphonique ?
          </h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl leading-relaxed">
            Rejoignez les entreprises qui ont déjà transformé leur relation
            client avec l&rsquo;intelligence artificielle.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <a href="#contact" className="monolith-btn bg-[#091421] inline-block">
              <span className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5">
                <i className="lni lni-comments" aria-hidden="true" />
                Demander une démo
              </span>
            </a>
            <a href="tel:+33189560500" className="monolith-btn bg-white inline-block">
              <span className="flex items-center gap-2 text-[#091421] font-black uppercase text-xs tracking-[0.2em] px-10 py-5">
                <i className="lni lni-phone" aria-hidden="true" />
                01 89 56 05 00
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

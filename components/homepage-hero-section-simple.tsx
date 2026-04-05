"use client";

import Link from "next/link";

export function HomepageHeroSectionSimple() {
  return (
    <section
      id="accueil"
      className="relative min-h-[700px] lg:min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--surface-dim, #091421)" }}
    >
      {/* Grille de fond monolithique */}
      <div className="absolute inset-0 monolith-grid-lines" aria-hidden="true" />

      {/* Content — suppressHydrationWarning: extensions navigateur peuvent modifier le padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full pt-28 pb-20" suppressHydrationWarning>
        <div className="grid lg:grid-cols-10 gap-8 lg:gap-12 items-center">

          {/* ── Colonne gauche (60%) ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 border border-red-primary/30 bg-red-primary/10 text-red-primary text-xs font-bold uppercase tracking-[0.3em] self-start">
              Opérateur de service télécom — Guadeloupe, Martinique, Guyane et La Réunion
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] text-white mb-6">
              La téléphonie<br />
              d&apos;entreprise,{" "}
              <span className="text-red-primary">
                simple et&nbsp;évolutive
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed font-normal">
              La fin du réseau RTC approche. Basculez vers la VoIP avec un
              interlocuteur unique qui connaît les contraintes télécoms de
              Guadeloupe, Martinique, Guyane et La Réunion. Cloud PBX, SIP Trunk
              et support local inclus.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link href="/devis-en-ligne" className="monolith-btn">
                <span className="block bg-red-primary text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em]">
                  Découvrir nos offres
                </span>
              </Link>
              <Link href="/contact" className="monolith-btn">
                <span className="block bg-white text-gray-900 px-10 py-4 text-sm font-black uppercase tracking-[0.2em]">
                  Nous contacter
                </span>
              </Link>
            </div>

            {/* DOM Tags */}
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-primary/70">
              Guyane · Martinique · Guadeloupe · Réunion · Métropole
            </p>
          </div>

          {/* ── Colonne droite (40%) ── */}
          <div className="lg:col-span-4 relative hidden lg:flex items-center justify-center">
            {/* Bloc décoratif incliné derrière l'image */}
            <div
              className="absolute inset-0 -skew-x-3 translate-x-4"
              style={{ backgroundColor: "var(--red-primary, #e53e3e)", opacity: 0.08 }}
              aria-hidden="true"
            />

            {/* Carte image + overlay */}
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <img
                src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
                alt="Professionnels utilisant la téléphonie d'entreprise E2I VoIP"
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
              />
              {/* Overlay foncé sur l'image */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #091421 30%, rgba(9,20,33,0.4) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Blocs KPI sur l'image */}
              <div className="absolute bottom-8 left-8 right-8 z-10 space-y-4">
                <div className="bg-[#091421]/90 p-5 border-l-4 border-red-primary">
                  <span className="block text-3xl font-black text-red-primary leading-none tracking-tighter">
                    Plus de 100
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    Clients actifs
                  </span>
                </div>
                <div className="bg-[#091421]/90 p-5 border-l-4 border-gray-500">
                  <span className="block text-3xl font-black text-white leading-none tracking-tighter">
                    4
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    Territoires ultramarins
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

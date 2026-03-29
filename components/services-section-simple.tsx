"use client";

import Link from "next/link";

export function ServicesSectionSimple() {
  return (
    <section id="services" className="py-24 px-4 sm:px-8 lg:px-16 bg-white text-[#091421]">
      <div className="max-w-7xl mx-auto">

        {/* Titre de section — aligné gauche + barre rouge */}
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl font-black tracking-tighter uppercase text-[#091421]">Nos Solutions Phares</h2>
          <div className="h-2 w-32 bg-red-primary"></div>
        </div>

        {/* Grille 3 colonnes Stitch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Module 1 : 3CX PRO (2 colonnes, fond clair) ── */}
          <div className="md:col-span-2 bg-[#f4f7fa] p-10 lg:p-12 flex flex-col justify-between min-h-[450px]">
            <div>
              <div className="w-12 h-12 bg-red-primary/10 flex items-center justify-center mb-8">
                <i className="lni lni-cloud text-2xl text-red-primary" aria-hidden="true" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black mb-5 uppercase text-[#091421]">
                3CX PRO &amp; ENTREPRISE
              </h3>
              <p className="text-gray-600 text-base max-w-lg leading-relaxed">
                Le standard téléphonique IP nouvelle génération. Un PBX cloud dédié
                pour una flexibilité totale et une réduction massive de vos coûts.
                Idéal pour les PME multisites.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/telephonie-3cx" className="monolith-btn">
                <span className="block bg-[#091421] text-white font-black uppercase text-xs tracking-[0.2em] px-8 py-4">
                  En savoir plus
                </span>
              </Link>
            </div>
          </div>

          {/* ── Module 2 : Trunk SIP (1 colonne, fond sombre) ── */}
          <div className="bg-[#091421] p-10 lg:p-12 flex flex-col justify-between min-h-[450px] text-white">
            <div>
              <div className="w-12 h-12 bg-red-primary/20 flex items-center justify-center mb-8">
                <i className="lni lni-phone-set text-2xl text-red-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-black mb-4 uppercase">
                Trunk SIP
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Conservez vos numéros actuels et profitez de la portabilité gratuite.
                Éligible DOM — Guyane, Martinique, Guadeloupe, Réunion.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/telephonie-entreprise/trunk-sip-compteur" className="monolith-btn">
                <span className="block bg-white text-[#091421] font-black uppercase text-[10px] tracking-[0.2em] px-8 py-4">
                  Voir les offres
                </span>
              </Link>
            </div>
          </div>

          {/* ── Module 3 : Assistants IA (2 colonnes, image + overlay) ── */}
          <div className="md:col-span-2 relative p-10 lg:p-12 flex flex-col justify-end min-h-[450px] overflow-hidden">
            <img
              src="/images/photos/pexels-ola-dapo-1754561-3345882-min.jpg"
              alt="Assistants Vocaux IA E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, #091421 40%, rgba(9,20,33,0.5) 100%)" }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="w-10 h-10 bg-red-primary/20 flex items-center justify-center mb-6">
                <i className="lni lni-comments-alt text-xl text-red-primary" aria-hidden="true" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black mb-4 uppercase text-white">
                Assistants Vocaux IA
              </h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-lg">
                Automatisez votre accueil téléphonique 24h/24 et 7j/7 grâce à
                notre intelligence artificielle conversationnelle.
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-white/10 border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                  Réception Illimitée
                </span>
                <span className="bg-white/10 border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                  Analyse Sémantique
                </span>
                <span className="bg-white/10 border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                  Intégration CRM
                </span>
              </div>
            </div>
          </div>

          {/* ── Module 4 : Studio (1 colonne, fond rouge) ── */}
          <div className="bg-red-primary p-10 lg:p-12 flex flex-col justify-between min-h-[450px] text-white">
            <div>
              <div className="w-12 h-12 bg-white/20 flex items-center justify-center mb-8">
                <i className="lni lni-microphone text-2xl text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-black mb-4 uppercase">
                Studio d&apos;Enregistrement
              </h3>
              <p className="text-red-100 text-sm leading-relaxed">
                Voix-off professionnelles et musiques libres de droits pour une
                image de marque irréprochable.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/studio-attente" className="monolith-btn">
                <span className="block bg-white text-red-primary font-black uppercase text-[10px] tracking-[0.2em] px-8 py-4">
                  Écouter les démos
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

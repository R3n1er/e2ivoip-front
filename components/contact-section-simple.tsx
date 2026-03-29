"use client";

import Link from "next/link";

export function ContactSectionSimple() {
  return (
    <section
      id="contact"
      className="py-24 px-8 relative overflow-hidden"
      style={{ backgroundColor: "var(--surface-dim, #091421)" }}
    >
      {/* Grille de fond monolithique */}
      <div className="absolute inset-0 monolith-grid-lines" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] text-white mb-12 leading-[0.95]">
          Prêt à moderniser vos <br />
          <span className="text-red-primary">communications ?</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/devis-en-ligne" className="monolith-btn">
            <span className="block bg-red-primary text-white px-12 py-5 text-sm font-black uppercase tracking-[0.2em]">
              Demander une étude gratuite
            </span>
          </Link>
          <Link href="/contact" className="monolith-btn">
            <span className="block bg-white text-[#091421] px-12 py-5 text-sm font-black uppercase tracking-[0.2em]">
              Nous contacter
            </span>
          </Link>
        </div>

        {/* Mentions DOM */}
        <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-gray-600">
          Guyane · Martinique · Guadeloupe · Réunion · France Métropolitaine
        </p>
      </div>
    </section>
  );
}

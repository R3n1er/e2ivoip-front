import Link from "next/link";

/**
 * Bloc d'appel à l'action qui remplace l'iframe Microsoft Bookings sur les
 * pages produit (décision Alban, 2026-11-07 : plus de calendrier Bookings).
 *
 * Les pages enveloppent ce composant dans `<div id="rendez-vous">` (ou
 * `#calendrier` sur /3cx-pro) : les ancres restent valides, aucun lien
 * existant ne casse.
 *
 * Un calendrier de prise de rendez-vous auto-hébergé (cal.diy) prendra la
 * place de ce bloc quand il sera en service : c'est ce composant qu'il
 * faudra faire évoluer, pas les trois pages.
 */
export function CTAContactSection() {
  return (
    <section className="bg-ui-surface-2 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            Parlons de votre projet
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ui-muted">
            Présentez-nous votre installation, vos sites et vos usages. Nous
            revenons vers vous avec une proposition adaptée, sous un jour ouvré.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="monolith-btn inline-block transition-transform duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
          >
            <span className="block bg-blue-marine px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white">
              Nous contacter
            </span>
          </Link>

          <Link
            href="/devis-en-ligne"
            className="inline-block transition-transform duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
          >
            <span className="block border border-ui-border bg-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-blue-marine">
              Demander un devis
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

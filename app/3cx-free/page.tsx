import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/structured-data";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { CTACalendarSection } from "@/components/cta-calendar-section";
import { FaqSection } from "@/components/faq-section";
import { ChoixVersion3cx } from "@/components/3cx/choix-version-3cx";
import { FAQ_3CX_FREE } from "@/lib/faq-data";
import {
  CONDITIONS_3CX_FREE,
  FAIR_USE_3CX_FREE,
  FONCTIONS_3CX_FREE,
  FORMULES_3CX_FREE,
  HEBERGEMENT_INCLUS,
  HORS_FORFAIT,
  LIMITES_3CX_FREE,
  type Formule3cxFree,
} from "@/lib/offres/3cx-free";
import { ArrowRight, CheckCircle, Warning } from "@/lib/icons";

const PATH = "/3cx-free";

export const metadata: Metadata = pageMetadata({
  title: "3CX Free : licence gratuite, hébergement et trunk SIP",
  description:
    "3CX Free hébergé et géré par E2I VoIP, avec trunk SIP et numéro local : dès 76 € HT/mois pour toute l'entreprise, jusqu'à 10 utilisateurs et 4 appels simultanés.",
  keywords:
    "3CX Free, 3CX gratuit, licence 3CX gratuite, standard téléphonique TPE, 3CX hébergé, trunk SIP 3CX, téléphonie DOM",
  path: PATH,
});

const nf = (n: number) => n.toLocaleString("fr-FR");

function LignesFormule({ f }: { f: Formule3cxFree }) {
  if (!f.plafond) {
    return (
      <ul className="space-y-2 text-sm text-ui-muted">
        <li>Appels facturés à la minute, selon la grille au compteur</li>
        <li>Appels entrants au compteur</li>
      </ul>
    );
  }
  return (
    <ul className="space-y-2 text-sm text-ui-muted">
      <li>Fixes et mobiles France métropolitaine et DOM, appels entrants compris</li>
      <li>
        Jusqu&apos;à <span className="font-mono tabular-nums">{nf(f.plafond.fixes)}</span> min
        vers les fixes,{" "}
        <span className="font-mono tabular-nums">{nf(f.plafond.mobiles)}</span> min vers les
        mobiles et <span className="font-mono tabular-nums">{nf(f.plafond.entrants)}</span> min
        entrantes par mois
      </li>
    </ul>
  );
}

export default function ThreeCXFreePage() {
  const c = CONDITIONS_3CX_FREE;

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <Image
              src="/images/photos/3CX-On-Premise-Solution.webp"
              alt="Standard 3CX utilisé sur smartphone et ordinateur"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85" />
          </div>
          <div className="relative z-20 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                3CX <span className="text-red-400">Free</span>
              </h1>
              <p className="mb-4 text-2xl font-bold md:text-3xl">
                La licence gratuite, hébergée et gérée pour vous
              </p>
              <p className="mx-auto mb-8 max-w-3xl text-xl font-medium opacity-90">
                Standard 3CX, trunk SIP et numéro local : un prix pour toute l&apos;entreprise,
                jusqu&apos;à {c.utilisateursMax} utilisateurs et {c.appelsSimultanesMax} appels
                simultanés.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <CTAButton href="/contact">Parler à un expert</CTAButton>
                <CTAButtonMarine href="/devis-en-ligne?service=3cx-free" icon="ArrowRight">
                  Demander un devis
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Ce que fait / ne fait pas la licence */}
        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <section aria-labelledby="free-fait" className="rounded-xl border border-ui-border p-8">
              <h2 id="free-fait" className="mb-6 text-2xl font-black tracking-[-0.04em] text-gray-dark md:text-3xl">
                Ce que fait 3CX Free
              </h2>
              <ul className="space-y-3">
                {FONCTIONS_3CX_FREE.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-gray-dark">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
            <section
              aria-labelledby="free-ne-fait-pas"
              className="rounded-xl border border-red-primary/20 bg-red-primary/5 p-8"
            >
              <h2 id="free-ne-fait-pas" className="mb-6 text-2xl font-black tracking-[-0.04em] text-gray-dark md:text-3xl">
                Ce que la licence gratuite ne fait pas
              </h2>
              <ul className="space-y-3">
                {LIMITES_3CX_FREE.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-gray-dark">
                    <Warning size={20} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ui-muted">
                Besoin de postes de bureau ou de files d&apos;attente ? Voyez{" "}
                <NextLink href="/telephonie-entreprise/3cx-smb-mutualisee" className="font-medium text-red-600 hover:text-red-700">
                  3CX SMB
                </NextLink>{" "}
                ou{" "}
                <NextLink href="/3cx-pro" className="font-medium text-red-600 hover:text-red-700">
                  3CX PRO
                </NextLink>
                .
              </p>
            </section>
          </div>
        </section>

        {/* Formules */}
        <section aria-labelledby="formules" className="bg-gradient-to-br from-ui-surface to-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="formules" className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Quatre formules, <span className="text-red-primary">un prix par entreprise</span>
            </h2>
            <p className="mb-10 max-w-3xl text-lg text-ui-muted">
              Chaque formule comprend l&apos;hébergement géré, le trunk SIP et un numéro local. Le
              prix ne dépend pas du nombre d&apos;utilisateurs, jusqu&apos;à {c.utilisateursMax}.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {FORMULES_3CX_FREE.map((f) => (
                <article key={f.id} className="flex flex-col rounded-xl border border-ui-border bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-dark">{f.nom}</h3>
                  <p className="mt-1 text-sm text-ui-muted">
                    <span className="font-mono tabular-nums">{f.appels}</span> appels simultanés vers
                    l&apos;extérieur
                  </p>
                  <p className="my-4 text-gray-dark">
                    <span className="font-mono text-4xl font-bold tabular-nums">{f.prixMensuelHT}&nbsp;€</span>{" "}
                    <span className="text-sm">HT/mois</span>
                  </p>
                  <LignesFormule f={f} />
                </article>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 text-gray-dark sm:grid-cols-2 lg:grid-cols-4">
              <li>
                Mise en service <span className="font-mono tabular-nums">{c.miseEnServiceHT} €</span> HT
              </li>
              <li>
                Engagement <span className="font-mono tabular-nums">{c.engagementMois}</span> mois
              </li>
              <li>
                Hébergement géré inclus (<span className="font-mono tabular-nums">{c.hebergementMensuelHT} €</span> HT/mois)
              </li>
              <li>
                <NextLink href="/telephonie-entreprise/trunk-sip-compteur" className="font-medium text-red-600 hover:text-red-700">
                  Voir la grille au compteur
                </NextLink>
              </li>
            </ul>
          </div>
        </section>

        {/* Hébergement */}
        <section aria-labelledby="hebergement" className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <div className="lg:col-span-2">
              <h2 id="hebergement" className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Ce que couvre l&apos;hébergement géré
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {HEBERGEMENT_INCLUS.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-gray-dark">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-ui-border bg-ui-surface p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-dark">En option</h3>
              <ul className="space-y-3 text-sm">
                {HORS_FORFAIT.map((o) => (
                  <li key={o.libelle} className="flex justify-between gap-4 text-gray-dark">
                    <span>{o.libelle}</span>
                    <span className="shrink-0 font-mono tabular-nums">{o.prix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Deux modes */}
        <section aria-labelledby="deux-modes" className="bg-gradient-to-br from-ui-surface to-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="deux-modes" className="mb-10 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Géré par nous, ou par vous
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-ui-border bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-gray-dark">E2I VoIP gère votre 3CX</h3>
                <p className="text-sm leading-relaxed text-ui-muted">
                  Nous installons votre serveur, configurons l&apos;accueil et les horaires, raccordons
                  le trunk SIP et suivons les mises à jour et la licence. C&apos;est l&apos;une des
                  quatre formules ci-dessus.
                </p>
              </article>
              <article className="rounded-xl border border-ui-border bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-gray-dark">Vous gérez votre 3CX</h3>
                <p className="mb-4 text-sm leading-relaxed text-ui-muted">
                  Vous installez 3CX Free sur votre serveur ou votre cloud. Nous fournissons le trunk
                  SIP au compteur et vos numéros ; notre support couvre le trunk.
                </p>
                <NextLink
                  href="/telephonie-entreprise/trunk-sip-compteur"
                  className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Voir le trunk SIP au compteur <ArrowRight size={14} aria-hidden="true" />
                </NextLink>
              </article>
            </div>
          </div>
        </section>

        {/* Encart de choix */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <ChoixVersion3cx />
          </div>
        </section>

        {/* Fair use */}
        <section aria-labelledby="fair-use" className="bg-gradient-to-br from-ui-surface to-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 id="fair-use" className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              L&apos;illimité, avec un usage raisonnable
            </h2>
            <ul className="space-y-3">
              {FAIR_USE_3CX_FREE.map((r) => (
                <li key={r} className="flex items-start gap-3 text-gray-dark">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-16">
          <FaqSection items={FAQ_3CX_FREE} title="Questions fréquentes sur 3CX Free" />
        </section>

        <CTACalendarSection />
      </main>

      <JsonLd
        data={serviceSchema({
          name: "3CX Free hébergé avec trunk SIP",
          description:
            "Licence 3CX Free hébergée et gérée par E2I VoIP, avec trunk SIP et numéro local, jusqu'à 10 utilisateurs et 4 appels simultanés.",
          path: PATH,
        })}
      />
    </div>
  );
}

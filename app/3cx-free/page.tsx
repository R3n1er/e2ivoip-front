import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/structured-data";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { CTAContactSection } from "@/components/cta-contact-section";
import { FaqSection } from "@/components/faq-section";
import { ChoixVersion3cx } from "@/components/3cx/choix-version-3cx";
import { Devis3cxFreeForm } from "@/components/forms/devis-3cx-free-form";
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
  title: "3CX Free : licence gratuite, standard hébergé",
  description:
    "3CX Free hébergé et géré, avec trunk SIP et numéro local : dès 76 € HT/mois par entreprise pour 2 appels simultanés, jusqu'à 10 utilisateurs.",
  keywords:
    "3CX Free, 3CX gratuit, licence 3CX gratuite, standard téléphonique TPE, 3CX hébergé, trunk SIP 3CX, téléphonie DOM",
  path: PATH,
});

const nf = (n: number) => n.toLocaleString("fr-FR");

function LignesFormule({ f }: { f: Formule3cxFree }) {
  if (!f.plafond) {
    return (
      <ul className="space-y-2 text-sm text-ui-muted">
        <li>Appels sortants facturés à la minute, selon la grille au compteur</li>
      </ul>
    );
  }
  return (
    <ul className="space-y-2 text-sm text-ui-muted">
      <li>Appels vers les fixes et mobiles de France métropolitaine et des DOM (hors Mayotte)</li>
      <li>
        Jusqu&apos;à <span className="font-mono tabular-nums">{nf(f.plafond.fixes)}</span> min vers
        les fixes et <span className="font-mono tabular-nums">{nf(f.plafond.mobiles)}</span> min
        vers les mobiles par mois
      </li>
    </ul>
  );
}

export default function ThreeCXFreePage() {
  const c = CONDITIONS_3CX_FREE;

  return (
    <div className="min-h-screen bg-white">
      <div>
        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <Image
              src="/images/photos/3CX-On-Premise-Solution.webp"
              alt="Standard 3CX Free utilisé avec l’application mobile et le client web"
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
                3CX Free
                <span className="mt-2 block text-2xl font-bold md:text-3xl">
                  le standard téléphonique des TPE
                </span>
              </h1>
              <p className="mb-4 text-2xl font-bold md:text-3xl">
                Votre standard téléphonique TPE, avec une licence gratuite
              </p>
              <p className="mx-auto mb-8 max-w-3xl text-xl font-medium opacity-90">
                En Guyane, Martinique, Guadeloupe et à La Réunion, E2I VoIP héberge et gère votre
                3CX Free. Vous payez l&apos;hébergement, le trunk SIP — la liaison pour passer
                et recevoir vos appels — et le numéro local. Un prix pour toute l&apos;entreprise,
                jusqu&apos;à {c.utilisateursMax} utilisateurs et {c.appelsSimultanesMax} appels
                simultanés, c&apos;est-à-dire en même temps.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <CTAButton href="#devis">Parler de votre téléphonie</CTAButton>
                <CTAButtonMarine href="#rendez-vous" icon="ArrowRight">
                  Prendre rendez-vous
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
                Les fonctions incluses dans 3CX Free
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
                    <Warning size={20} className="mt-0.5 shrink-0 text-red-text" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ui-muted">
                Pour des postes de bureau, consultez{" "}
                <NextLink href="/telephonie-entreprise/3cx-smb-mutualisee" className="font-medium text-red-text hover:text-red-text-hover">
                  3CX SMB
                </NextLink>{" "}
                ; pour des files d&apos;attente, consultez{" "}
                <NextLink href="/3cx-pro" className="font-medium text-red-text hover:text-red-text-hover">
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
              Chaque formule inclut l&apos;hébergement géré, le trunk SIP et un numéro local.
              Choisissez selon le nombre d&apos;appels à passer ou recevoir en même temps,
              puis entre le compteur et l&apos;illimité avec plafonds mensuels. Le prix reste
              le même jusqu&apos;à {c.utilisateursMax} utilisateurs.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {FORMULES_3CX_FREE.map((f) => (
                <article key={f.id} className="flex flex-col rounded-xl border border-ui-border bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-dark">{f.nom}</h3>
                  <p className="mt-1 text-sm text-ui-muted">
                    <span className="font-mono tabular-nums">{f.appels}</span> appels avec l&apos;extérieur
                    en même temps
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
                <NextLink href="/telephonie-entreprise/trunk-sip-compteur" className="font-medium text-red-text hover:text-red-text-hover">
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
              <h3 className="mb-4 text-xl font-bold text-gray-dark">Prestations facturées en plus</h3>
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
                  Avec les quatre formules ci-dessus, nous installons votre serveur, configurons
                  l&apos;accueil et les horaires, puis raccordons le trunk SIP. Nous gérons
                  les mises à jour et le renouvellement de la licence.
                </p>
              </article>
              <article className="rounded-xl border border-ui-border bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-gray-dark">Vous gérez votre 3CX</h3>
                <p className="mb-4 text-sm leading-relaxed text-ui-muted">
                  Vous installez et administrez 3CX Free sur votre serveur ou votre cloud.
                  E2I VoIP fournit le trunk SIP au compteur et vos numéros. Notre support
                  couvre le trunk, pas l&apos;administration de votre 3CX.
                </p>
                <NextLink
                  href="/telephonie-entreprise/trunk-sip-compteur"
                  className="inline-flex items-center gap-1 text-sm font-medium text-red-text hover:text-red-text-hover"
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
              Illimité : les plafonds et les exclusions à connaître
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

        {/* Formulaire de devis */}
        <section id="devis" aria-labelledby="devis-titre" className="scroll-mt-24 bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="devis-titre" className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Parlons de votre projet 3CX Free
            </h2>
            <p className="mb-8 text-lg text-gray-dark">
              Après l&apos;envoi, un conseiller étudie votre demande et revient vers vous avec un
              devis adapté à vos besoins. Votre SIRET, facultatif, nous aide à préparer ce devis.
            </p>
            <Devis3cxFreeForm />
          </div>
        </section>

        <section className="bg-gradient-to-br from-ui-surface to-white py-16">
          <FaqSection items={FAQ_3CX_FREE} title="Questions fréquentes sur 3CX Free" />
        </section>

        <div id="rendez-vous" className="scroll-mt-24">
          <CTAContactSection />
        </div>
      </div>

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

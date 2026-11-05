import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/structured-data";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { CTACalendarSection } from "@/components/cta-calendar-section";
import { FaqSection } from "@/components/faq-section";
import { FAQ_SMB_SOLO } from "@/lib/faq-data";
import { DevisSmbSoloForm } from "@/components/forms/devis-smb-solo-form";
import {
  FORMULES_SMB_SOLO,
  CONDITIONS_SMB_SOLO,
  INCLUS_SMB_SOLO,
  HORS_FORFAIT_SMB_SOLO,
  repereAppels,
  type FormuleSmbSolo,
} from "@/lib/offres/3cx-smb-solo";
import { TARIFS_PORTABILITE, TARIFS_CREATION_NUMERO } from "@/lib/offres/portabilite";
import { CheckCircle, Clock, DeviceMobile, Info, Phone } from "@/lib/icons";

const PATH = "/telephonie-entreprise/3cx-smb-solo";

export const metadata: Metadata = pageMetadata({
  title: "3CX SMB SOLO — standard téléphonique de l'indépendant",
  description:
    "Standard téléphonique hébergé pour une personne : numéro géographique, 2 appels simultanés, application 3CX et web client. 39,99 € HT par mois, 3 h d'entrants et 3 h de sortants incluses, engagement 12 mois.",
  keywords:
    "3CX SMB SOLO, standard téléphonique indépendant, téléphonie auto-entrepreneur, numéro fixe professionnel, application 3CX mobile, web client 3CX, téléphonie artisan",
  path: PATH,
});

const nf = (n: number) => n.toLocaleString("fr-FR");
const euros = (n: number) => nf(n);

/** Les trois situations qui poussent un indépendant à changer de ligne. */
const SITUATIONS: readonly string[] = [
  "Vous donnez votre numéro personnel à vos clients. Ils vous appellent le dimanche, et vous ne pouvez plus décrocher.",
  "Vous voulez un numéro fixe crédible et local, mais un standard d'entreprise coûte plus cher que ce que vous facturez, et suppose plusieurs utilisateurs.",
  "Vous comptez vos minutes au compteur. Chaque appel devient une décision.",
  "Vous voulez tester la ligne un samedi matin, sans rendez-vous, avant de vous engager.",
];

/** Tableau « Aujourd'hui → Avec 3CX SMB SOLO ». */
const AVANT_APRES: readonly { avant: string; apres: string }[] = [
  { avant: "Votre mobile sert de ligne pro", apres: "Un numéro géographique dédié, qui sonne sur votre mobile" },
  { avant: "Numéro personnel exposé", apres: "Vos clients ne voient que le numéro fixe professionnel" },
  { avant: "Un appel à la fois, sinon occupé", apres: "2 canaux simultanés : le second appelant n'est plus perdu" },
  { avant: "Des minutes à surveiller", apres: "Des heures incluses : vous ne comptez plus" },
  { avant: "Ni serveur, ni licence, ni technicien", apres: "Hébergé cloud, supervisé et sauvegardé par E2I VoIP" },
];

/** Les trois façons de décrocher, avec leur visuel produit. */
const CANAUX: readonly {
  titre: string;
  image: string;
  alt: string;
  largeur: number;
  hauteur: number;
  texte: string;
  detail: string;
  badge: string;
  optionnel: boolean;
}[] = [
  {
    titre: "Application 3CX — iOS et Android",
    image: "/images/3cx-smb-solo/3cx-app-mobile.jpg",
    alt: "Appel entrant sur l'application 3CX pour iPhone",
    largeur: 910,
    hauteur: 1670,
    texte:
      "Votre bureau dans la poche : appels, chat, visioconférence, transferts et messagerie vocale. Une seule application : vous appelez et décrochez avec votre numéro professionnel.",
    detail: "Fonctionne en wifi comme en 4G/5G.",
    badge: "Inclus",
    optionnel: false,
  },
  {
    titre: "Web client — dans le navigateur",
    image: "/images/3cx-smb-solo/3cx-web-client.png",
    alt: "Client web 3CX dans un navigateur, appel en cours",
    largeur: 450,
    hauteur: 245,
    texte:
      "Sur PC ou Mac, sans rien installer : composez, recevez et gérez vos appels depuis un onglet. Pratique quand vous êtes devant l'ordinateur.",
    detail: "Aucune licence supplémentaire, aucun poste à câbler.",
    badge: "Inclus",
    optionnel: false,
  },
  {
    titre: "Téléphone IP — poste SIP de bureau",
    image: "/images/3cx-smb-solo/fanvil-v64.png",
    alt: "Téléphone IP Fanvil V64 avec quatre comptes SIP",
    largeur: 913,
    hauteur: 919,
    texte:
      "Si vous préférez le combiné, un poste Fanvil, Yealink ou Snom se connecte au même standard : à l'atelier, au comptoir ou à l'accueil.",
    detail: "Matériel fourni et configuré par E2I VoIP.",
    badge: "Option",
    optionnel: true,
  },
];

function CarteFormule({ formule }: { formule: FormuleSmbSolo }) {
  const reperes = repereAppels(formule);
  return (
    <article
      className={`relative flex flex-col rounded-xl border bg-white p-6 shadow-sm ${
        formule.vedette ? "border-2 border-red-primary shadow-md" : "border-ui-border"
      }`}
    >
      {formule.vedette && (
        <span className="absolute right-4 top-4 rounded-full bg-blue-marine px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          10 h incluses
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-dark">{formule.nom}</h3>
      <p className="mt-1 text-sm text-ui-muted">{formule.usage}</p>
      <p className="my-4 text-gray-dark">
        <span className="font-mono text-4xl font-bold tabular-nums">{euros(formule.prixMensuelHT)}&nbsp;€</span>{" "}
        <span className="text-sm">HT/mois</span>
      </p>
      <ul className="space-y-2 text-sm text-ui-muted">
        <li className="flex items-start gap-2">
          <CheckCircle size={18} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
          <span>
            <strong className="text-gray-dark">{formule.heuresEntrantes} h</strong> d&apos;appels entrants
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle size={18} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
          <span>
            <strong className="text-gray-dark">{formule.heuresSortantes} h</strong> d&apos;appels sortants
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle size={18} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
          <span>1 numéro géographique et 2 appels simultanés</span>
        </li>
      </ul>
      <p className="mt-4 border-t border-ui-border pt-3 text-sm text-ui-muted">
        Environ <strong className="text-gray-dark">{reperes.entrants} appels entrants</strong> et{" "}
        <strong className="text-gray-dark">{reperes.sortants} appels sortants</strong> de 3 minutes par mois.
      </p>
    </article>
  );
}

export default function SmbSoloPage() {
  const c = CONDITIONS_SMB_SOLO;

  return (
    <div className="min-h-screen bg-white">
      <div>
        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <Image
              src="/images/photos/woman-onphoneandcomputer-e2i-min.jpg"
              alt="Entrepreneur indépendant au téléphone, application 3CX ouverte sur son ordinateur"
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
                3CX SMB SOLO
                <span className="mt-2 block text-2xl font-bold md:text-3xl">
                  le standard téléphonique de l&apos;indépendant
                </span>
              </h1>
              <p className="mb-4 text-2xl font-bold md:text-3xl">
                Votre ligne professionnelle tient dans votre poche
              </p>
              <p className="mx-auto mb-8 max-w-3xl text-xl font-medium opacity-90">
                Un numéro géographique dédié, {c.appelsSimultanes} appels à la fois et
                l&apos;application 3CX sur votre mobile — pour{" "}
                <strong>{euros(FORMULES_SMB_SOLO[0].prixMensuelHT)} € HT</strong> par mois,
                communications incluses. Aucun matériel n&apos;est obligatoire.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <CTAButton href="#devis" icon="Calculator">
                  Demander un devis
                </CTAButton>
                <CTAButtonMarine href="#rendez-vous" icon="ArrowRight">
                  Prendre rendez-vous
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Le problème */}
        <section aria-labelledby="situation" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 id="situation" className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Vous travaillez seul. <span className="text-red-primary">Votre téléphone doit suivre.</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-ui-muted">
                La ligne professionnelle est le premier outil de travail de l&apos;entrepreneur solo,
                et le dernier à être traité comme tel. Quatre situations que nous rencontrons tous
                les jours.
              </p>
              <ul className="space-y-4">
                {SITUATIONS.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-gray-dark">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-red-primary" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Avant / après */}
        <section aria-labelledby="avant-apres" className="bg-ui-surface py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="avant-apres" className="mb-8 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Ce que 3CX SMB SOLO change, concrètement
            </h2>
            <div className="overflow-hidden rounded-xl border border-ui-border bg-white">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-blue-marine text-white">
                    <th scope="col" className="px-4 py-3 text-sm font-semibold uppercase tracking-wide sm:px-6">
                      Aujourd&apos;hui
                    </th>
                    <th scope="col" className="px-4 py-3 text-sm font-semibold uppercase tracking-wide sm:px-6">
                      Avec 3CX SMB SOLO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AVANT_APRES.map((l) => (
                    <tr key={l.avant} className="border-t border-ui-border">
                      <td className="px-4 py-3 text-sm text-ui-muted sm:px-6">{l.avant}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-dark sm:px-6">{l.apres}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Heures incluses */}
        <section aria-labelledby="heures" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="heures" className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Ce que vos heures incluses couvrent vraiment
            </h2>
            <p className="mb-8 max-w-3xl text-lg text-ui-muted">
              Les volumes sont exprimés en heures, parce que c&apos;est ainsi qu&apos;on raisonne sur
              une journée de travail. Voici l&apos;équivalent en appels.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border-l-4 border-red-primary bg-ui-surface px-6 py-5">
                <p className="flex items-center gap-2 text-2xl font-bold text-gray-dark">
                  <Clock size={22} className="text-red-primary" aria-hidden="true" />3 h d&apos;entrants
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ui-muted">
                  Environ 60 appels de 3 minutes par mois, soit 3 par jour ouvré.
                </p>
              </div>
              <div className="border-l-4 border-red-primary bg-ui-surface px-6 py-5">
                <p className="flex items-center gap-2 text-2xl font-bold text-gray-dark">
                  <Phone size={22} className="text-red-primary" aria-hidden="true" />3 h de sortants
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ui-muted">
                  De quoi rappeler tous vos clients et assurer vos relances.
                </p>
              </div>
              <div className="border-l-4 border-red-primary bg-ui-surface px-6 py-5">
                <p className="flex items-center gap-2 text-2xl font-bold text-gray-dark">
                  <DeviceMobile size={22} className="text-red-primary" aria-hidden="true" />2 appels simultanés
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ui-muted">
                  Le deuxième appelant est mis en attente, pas renvoyé sur occupé.
                </p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-xl border border-ui-border">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-blue-marine text-white">
                    <th scope="col" className="px-4 py-3 text-sm font-semibold sm:px-6">
                      Inclus chaque mois
                    </th>
                    {FORMULES_SMB_SOLO.map((f) => (
                      <th key={f.id} scope="col" className="px-4 py-3 text-sm font-semibold sm:px-6">
                        {f.nom} — {euros(f.prixMensuelHT)} €
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Appels sortants de 2 min", cle: "sortants2" as const },
                    { label: "Appels sortants de 5 min", cle: "sortants5" as const },
                    { label: "Appels entrants de 3 min", cle: "entrants3" as const },
                  ].map((ligne) => (
                    <tr key={ligne.cle} className="border-t border-ui-border">
                      <td className="px-4 py-3 text-sm text-ui-muted sm:px-6">{ligne.label}</td>
                      {FORMULES_SMB_SOLO.map((f) => {
                        const minutes = f.heuresSortantes * 60;
                        const minutesEntrantes = f.heuresEntrantes * 60;
                        const valeur =
                          ligne.cle === "sortants2"
                            ? Math.floor(minutes / 2)
                            : ligne.cle === "sortants5"
                              ? Math.floor(minutes / 5)
                              : Math.floor(minutesEntrantes / 3);
                        return (
                          <td key={f.id} className="px-4 py-3 text-sm font-medium text-gray-dark sm:px-6">
                            <span className="font-mono tabular-nums">{valeur}</span> appels
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t border-ui-border bg-ui-surface">
                    <td className="px-4 py-3 text-sm text-ui-muted sm:px-6">Soit par jour ouvré (appels de 3 min)</td>
                    {FORMULES_SMB_SOLO.map((f) => {
                      const r = repereAppels(f);
                      return (
                        <td key={f.id} className="px-4 py-3 text-sm font-medium text-gray-dark sm:px-6">
                          ~{r.sortantsParJour} sortants · ~{r.entrantsParJour} entrants
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Trois façons de décrocher */}
        <section aria-labelledby="canaux" className="bg-ui-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="canaux" className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Un seul numéro, <span className="text-red-primary">trois façons de répondre</span>
            </h2>
            <p className="mb-10 max-w-3xl text-lg text-ui-muted">
              Le standard est le même partout. Vous choisissez l&apos;appareil selon l&apos;endroit et
              le moment. Un appel pris sur le mobile peut être transféré au bureau, et inversement.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {CANAUX.map((canal) => (
                <article
                  key={canal.titre}
                  className="flex flex-col overflow-hidden rounded-xl border border-ui-border bg-white shadow-sm"
                >
                  <div className="relative h-72 bg-ui-surface-2 p-4">
                    <Image
                      src={canal.image}
                      alt={canal.alt}
                      width={canal.largeur}
                      height={canal.hauteur}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-dark">{canal.titre}</h3>
                    <p className="mb-3 text-sm leading-relaxed text-ui-muted">{canal.texte}</p>
                    <p className="mb-4 text-sm text-ui-muted">{canal.detail}</p>
                    <span
                      className={`mt-auto inline-block self-start rounded px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white ${
                        canal.optionnel ? "bg-ui-muted" : "bg-blue-marine"
                      }`}
                    >
                      {canal.badge}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-lg text-gray-dark">
              <strong>Un numéro, un standard.</strong> Les trois se connectent au même compte : vous
              décrochez où vous êtes, et vous transférez d&apos;un appareil à l&apos;autre sans que
              votre correspondant s&apos;en aperçoive.
            </p>
          </div>
        </section>

        {/* Formules */}
        <section aria-labelledby="formules" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="formules" className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Deux formules. <span className="text-red-primary">Un seul standard.</span>
            </h2>
            <p className="mb-10 max-w-3xl text-lg text-ui-muted">
              La seule différence entre les deux formules est le volume d&apos;appels inclus. Tout le
              reste est identique : {c.utilisateurs} utilisateur, {c.appelsSimultanes} canaux, un
              numéro géographique, application mobile et exploitation gérée par E2I VoIP.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {FORMULES_SMB_SOLO.map((f) => (
                <CarteFormule key={f.id} formule={f} />
              ))}
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-gray-dark sm:grid-cols-3">
              <li>
                Engagement <span className="font-mono tabular-nums">{c.engagementMois}</span> mois
              </li>
              <li>
                Création de numéro <span className="font-mono tabular-nums">{TARIFS_CREATION_NUMERO.creationSdaHT} €</span> HT, une fois
              </li>
              <li>
                Portabilité <span className="font-mono tabular-nums">{TARIFS_PORTABILITE.numeroUniqueHT} €</span> HT par numéro
              </li>
            </ul>
          </div>
        </section>

        {/* Inclus / en sus */}
        <section aria-labelledby="inclus" className="bg-gradient-to-br from-ui-surface to-white py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 id="inclus" className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Inclus dans l&apos;abonnement
              </h2>
              <ul className="space-y-3">
                {INCLUS_SMB_SOLO.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-dark">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
                Facturé en plus
              </h2>
              <ul className="divide-y divide-ui-border rounded-xl border border-ui-border bg-white">
                {HORS_FORFAIT_SMB_SOLO.map((o) => (
                  <li key={o.libelle} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                    <span className="text-gray-dark">{o.libelle}</span>
                    <span className="shrink-0 font-medium text-ui-muted">{o.prix}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-sm text-ui-muted">
                <Info size={18} className="mt-0.5 shrink-0 text-blue-marine" aria-hidden="true" />
                Aucun matériel n&apos;est obligatoire : l&apos;application mobile suffit pour
                démarrer. La mise en service est chiffrée dans le devis, avant signature.
              </p>
            </div>
          </div>
        </section>

        {/* Devis et rendez-vous */}
        <section id="devis" aria-labelledby="devis-titre" className="scroll-mt-24 bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 id="devis-titre" className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Parlons de votre ligne
            </h2>
            <p className="mb-6 text-lg text-gray-dark">
              Décrivez votre activité et le numéro que vous voulez garder. Nous revenons vers vous
              avec un devis chiffré sous deux à trois jours ouvrés, sans engagement de votre part à
              ce stade.
            </p>
            <DevisSmbSoloForm />
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <CTAButtonMarine href="tel:+33594963500" icon="Phone" external>
                05 94 96 35 00
              </CTAButtonMarine>
            </div>
            <p className="mt-4 text-sm text-ui-muted">
              Guyane 05 94 96 35 00 · Martinique 05 96 31 35 00 · Guadeloupe 05 90 17 35 00 ·
              La Réunion +262 263 08 55 00 · Métropole 01 89 56 35 00
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-ui-surface to-white py-16">
          <FaqSection items={FAQ_SMB_SOLO} title="Questions fréquentes sur 3CX SMB SOLO" />
        </section>

        {/* Renvois */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-ui-muted">
              Vous serez plusieurs sur la ligne ?{" "}
              <NextLink
                href="/telephonie-entreprise/3cx-smb-mutualisee"
                className="font-medium text-red-text hover:text-red-text-hover"
              >
                3CX SMB mutualisée pour 3 à 8 utilisateurs
              </NextLink>{" "}
              — ou{" "}
              <NextLink href="/3cx-pro" className="font-medium text-red-text hover:text-red-text-hover">
                3CX PRO dédié
              </NextLink>{" "}
              au-delà. Vous voulez d&apos;abord tester sans licence ?{" "}
              <NextLink href="/3cx-free" className="font-medium text-red-text hover:text-red-text-hover">
                3CX Free hébergé
              </NextLink>
              .
            </p>
          </div>
        </section>

        <div id="rendez-vous">
          <CTACalendarSection />
        </div>
      </div>

      <JsonLd
        data={serviceSchema({
          name: "3CX SMB SOLO — standard téléphonique hébergé pour indépendant",
          description:
            "Standard téléphonique hébergé pour un utilisateur : numéro géographique local, 2 appels simultanés, application 3CX et web client, 3 h d'entrants et 3 h de sortants incluses pour 39,99 € HT par mois.",
          path: PATH,
        })}
      />
    </div>
  );
}


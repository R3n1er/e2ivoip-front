import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { RgpdRequestForm } from "@/components/forms/rgpd-request-form";
import { RGPD_RIGHTS } from "@/lib/rgpd/rights";
import { LegalBreadcrumb } from "@/components/legal/breadcrumb";

export const metadata: Metadata = pageMetadata({
  title: "Exercer mes droits RGPD | E2I VoIP",
  description:
    "Formulaire d’exercice des droits RGPD d’E2I ASSISTANCE : accès, rectification, effacement, limitation, portabilité, opposition. Réponse sous un mois.",
  keywords:
    "exercer mes droits, RGPD, droit d’accès, droit à l’effacement, portabilité, E2I VoIP",
  path: "/juridique/exercer-mes-droits",
});

export default function ExercerMesDroitsPage() {
  return (
    <>
      <LegalBreadcrumb current="Exercer mes droits" />

      <section className="py-20 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
              Exercer mes droits
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90">
              Vous disposez de droits sur les données personnelles qu&rsquo;E2I
              ASSISTANCE détient à votre sujet. Ce formulaire les déclenche
              directement, sans passer par un service commercial.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            Comment <span className="text-red-primary">ça se passe</span>
          </h2>

          <ol className="mb-12 space-y-4 text-gray-600">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-primary font-bold text-white">
                1
              </span>
              <span>
                Vous déposez votre demande via le formulaire ci-dessous. Un
                accusé de réception vous est envoyé immédiatement par email.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-primary font-bold text-white">
                2
              </span>
              <span>
                Nous vérifions votre identité de façon proportionnée à la
                demande. Un justificatif peut vous être demandé avant toute
                communication de données personnelles.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-primary font-bold text-white">
                3
              </span>
              <span>
                Vous recevez notre réponse dans un délai d&rsquo;un mois à
                compter de la réception. Ce délai peut être prolongé de deux
                mois pour une demande complexe : nous vous en informons alors
                dans le premier mois.
              </span>
            </li>
          </ol>

          <h2 className="mb-6 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            Vos <span className="text-red-primary">droits</span>
          </h2>

          <dl className="mb-12 space-y-4">
            {RGPD_RIGHTS.map((right) => (
              <div
                key={right.id}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4"
              >
                <dt className="font-semibold text-gray-dark">
                  {right.label}{" "}
                  <span className="font-normal text-gray-secondary">
                    ({right.article} du RGPD)
                  </span>
                </dt>
                <dd className="mt-1 text-gray-600">{right.description}</dd>
              </div>
            ))}
          </dl>

          <RgpdRequestForm />

          <div className="mt-12 rounded-lg border border-gray-100 bg-gray-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-gray-dark">
              Si notre réponse ne vous satisfait pas
            </h2>
            <p className="text-gray-600">
              Vous pouvez introduire une réclamation auprès de la Commission
              nationale de l&rsquo;informatique et des libertés (CNIL), 3 place
              de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou en ligne sur{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-primary underline"
              >
                cnil.fr
              </a>
              .
            </p>
            <p className="mt-4 text-gray-600">
              Pour comprendre quelles données nous traitons et pourquoi,
              consultez notre{" "}
              <Link
                href="/juridique/politique-confidentialite"
                className="text-red-primary underline"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

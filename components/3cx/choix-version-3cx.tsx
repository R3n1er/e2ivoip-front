"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ArrowRight } from "@/lib/icons";
import {
  recommanderVersion3cx,
  type ReponsesChoix3cx,
} from "@/lib/offres/3cx-free";

type Cle = keyof ReponsesChoix3cx;

/**
 * Trois questions au plus. L'ordre est délibéré : la question « avancée »
 * vient d'abord parce qu'un « oui » mène à PRO sans autre question — le
 * visiteur qui a besoin de files d'attente ne répond qu'une fois. Même
 * logique pour les postes de bureau, qui mènent à SMB.
 */
const QUESTIONS: { cle: Cle; texte: string; aide: string }[] = [
  {
    cle: "avance",
    texte:
      "Avez-vous besoin de files d'attente, d'enregistrer les appels ou de connecter votre outil de suivi client (CRM) ?",
    aide: "Dans une file d'attente, l'appelant patiente jusqu'à ce qu'un collaborateur soit disponible.",
  },
  {
    cle: "postesBureau",
    texte: "Voulez-vous des téléphones de bureau (postes IP) ou des téléphones sans fil DECT ?",
    aide: "Avec 3CX Free, chacun utilise uniquement l'application 3CX sur smartphone ou ordinateur.",
  },
  {
    cle: "auDela4Appels",
    texte: "Avez-vous besoin de plus de 4 appels en même temps, ou de plus de 10 utilisateurs ?",
    aide: "Comptez les appels passés et reçus au même moment, aux heures les plus chargées.",
  },
];

export function ChoixVersion3cx() {
  const [reponses, setReponses] = useState<Partial<ReponsesChoix3cx>>({});

  const etape = QUESTIONS.findIndex((q) => reponses[q.cle] === undefined);
  // Un « oui » qui fixe déjà la réponse arrête le questionnaire : PRO dès la
  // question 1, SMB dès la question 2 (la 3e ne changerait rien).
  const termine =
    reponses.avance === true || reponses.postesBureau === true || etape === -1;
  const resultat = termine
    ? recommanderVersion3cx({
        avance: reponses.avance ?? false,
        postesBureau: reponses.postesBureau ?? false,
        auDela4Appels: reponses.auDela4Appels ?? false,
      })
    : null;
  const question = termine ? null : QUESTIONS[etape];

  return (
    <section
      aria-labelledby="choix-version-3cx"
      className="rounded-2xl border border-ui-border bg-white p-6 shadow-sm md:p-8"
    >
      <h2
        id="choix-version-3cx"
        className="text-2xl font-black tracking-[-0.04em] text-gray-dark md:text-3xl"
      >
        Quelle version 3CX pour votre entreprise ?
      </h2>
      <p className="mt-2 text-ui-muted">Répondez à trois questions au plus pour trouver la version adaptée à vos besoins.</p>

      {question && (
        <div role="group" aria-labelledby={`q-${question.cle}`} className="mt-6">
          <p className="text-sm font-medium text-ui-muted">
            Question <span className="font-mono tabular-nums">{etape + 1}</span> sur{" "}
            <span className="font-mono tabular-nums">{QUESTIONS.length}</span>
          </p>
          <p id={`q-${question.cle}`} className="mt-2 text-lg font-semibold text-gray-dark">
            {question.texte}
          </p>
          <p className="mt-1 text-sm text-ui-muted">{question.aide}</p>
          <div className="mt-4 flex gap-3">
            {([true, false] as const).map((valeur) => (
              <button
                key={String(valeur)}
                type="button"
                onClick={() => setReponses((r) => ({ ...r, [question.cle]: valeur }))}
                className="rounded-lg border border-blue-marine px-6 py-2 font-semibold text-blue-marine transition-colors hover:bg-blue-marine hover:text-white focus:outline-none focus:ring-2 focus:ring-red-primary focus:ring-offset-2"
              >
                {valeur ? "Oui" : "Non"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div role="status" aria-live="polite">
        {resultat && (
          <div className="mt-6 rounded-xl bg-ui-surface p-6">
            <p className="text-sm font-medium text-ui-muted">Notre recommandation</p>
            <p className="mt-1 text-2xl font-bold text-gray-dark">{resultat.titre}</p>
            <p className="mt-2 text-ui-muted">{resultat.raison}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <NextLink
                href={resultat.href}
                className="inline-flex items-center gap-1 font-medium text-red-600 hover:text-red-700"
              >
                {resultat.lien} <ArrowRight size={14} aria-hidden="true" />
              </NextLink>
              <button
                type="button"
                onClick={() => setReponses({})}
                className="text-sm text-ui-muted underline hover:text-gray-dark"
              >
                Recommencer
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

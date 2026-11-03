"use client";

import { useEffect, useRef, useState } from "react";
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
 * logique pour « plus de 8 utilisateurs », qui mène aussi à PRO (seuil de
 * recommandation E2I).
 */
const QUESTIONS: { cle: Cle; texte: string; aide: string }[] = [
  {
    cle: "avance",
    texte:
      "Avez-vous besoin de files d'attente, d'enregistrer les appels ou de connecter votre outil de suivi client (CRM) ?",
    aide: "Dans une file d'attente, l'appelant patiente jusqu'à ce qu'un collaborateur soit disponible.",
  },
  {
    cle: "plusDe8Utilisateurs",
    texte: "Serez-vous plus de 8 utilisateurs ?",
    aide: "Comptez toutes les personnes qui doivent recevoir ou passer des appels.",
  },
  {
    cle: "postesOuPlusDe4Appels",
    texte:
      "Voulez-vous des téléphones de bureau (postes IP ou DECT), ou plus de 4 appels en même temps ?",
    aide: "Avec 3CX Free, chacun utilise l'application 3CX sur smartphone ou ordinateur, et 4 appels au plus sont possibles en même temps.",
  },
];

export function ChoixVersion3cx() {
  const [reponses, setReponses] = useState<Partial<ReponsesChoix3cx>>({});
  // Le focus ne bouge qu'après une action du visiteur, jamais au chargement.
  const aInteragi = useRef(false);
  const cibleFocus = useRef<HTMLParagraphElement>(null);

  const etape = QUESTIONS.findIndex((q) => reponses[q.cle] === undefined);
  // Un « oui » qui fixe déjà la réponse arrête le questionnaire : PRO dès la
  // question 1, SMB dès la question 2 (la 3e ne changerait rien).
  const termine =
    reponses.avance === true || reponses.plusDe8Utilisateurs === true || etape === -1;
  const resultat = termine
    ? recommanderVersion3cx({
        avance: reponses.avance ?? false,
        plusDe8Utilisateurs: reponses.plusDe8Utilisateurs ?? false,
        postesOuPlusDe4Appels: reponses.postesOuPlusDe4Appels ?? false,
      })
    : null;
  const question = termine ? null : QUESTIONS[etape];

  // Les boutons Oui/Non sont réutilisés d'une question à l'autre : sans ce
  // déplacement, un lecteur d'écran n'entend pas la nouvelle question, et le
  // focus se perd quand les boutons disparaissent au résultat.
  useEffect(() => {
    if (aInteragi.current) cibleFocus.current?.focus();
  }, [etape, termine]);

  const repondre = (cle: Cle, valeur: boolean) => {
    aInteragi.current = true;
    setReponses((r) => ({ ...r, [cle]: valeur }));
  };

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
          <p
            id={`q-${question.cle}`}
            ref={cibleFocus}
            tabIndex={-1}
            className="mt-2 text-lg font-semibold text-gray-dark focus:outline-none"
          >
            {question.texte}
          </p>
          <p className="mt-1 text-sm text-ui-muted">{question.aide}</p>
          <div className="mt-4 flex gap-3">
            {([true, false] as const).map((valeur) => (
              <button
                key={String(valeur)}
                type="button"
                onClick={() => repondre(question.cle, valeur)}
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
            <p
              ref={cibleFocus}
              tabIndex={-1}
              className="mt-1 text-2xl font-bold text-gray-dark focus:outline-none"
            >
              {resultat.titre}
            </p>
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
                onClick={() => {
                  aInteragi.current = true;
                  setReponses({});
                }}
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

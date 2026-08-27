"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";

const FRANCE_PHONE =
  TERRITORY_PHONES.find((p) => p.territory === "France") ?? null;

/**
 * Fallback statique pour le widget HubSpot Conversations.
 *
 * Contexte : le widget natif `//js-eu1.hs-scripts.com/26878201.js` est
 * catégorisé « trackers / marketing » par la majorité des bloqueurs du
 * marché (uBlock Origin, uBlocker, AdGuard, Brave Shields amélioré,
 * Pi-hole, NextDNS). Sur un navigateur protégé, `ERR_BLOCKED_BY_CLIENT`
 * empêche le script de s'exécuter et le launcher n'apparaît pas. Sans
 * alternative visible, le visiteur ne trouve plus aucun moyen rapide de
 * nous contacter.
 *
 * Détection : on s'abonne à `window.hsConversationsOnReady`, le callback
 * officiel HubSpot déclenché seulement quand l'API Conversations a fini
 * son initialisation réelle (pas juste quand le script loader a défini
 * un objet global — un blocage partiel, ex. `api-eu1.hubspot.com`
 * bloqué alors que le script loader passe, laisserait sinon passer un
 * faux positif). Si ce callback n'a pas été appelé après 6 s, on affiche
 * un bandeau persistant en bas de viewport avec 2 canaux de contact
 * directs (téléphone, formulaire). Le bandeau est dismissable par bouton
 * croix (localStorage, sans expiration : choix UX assumé — voir ADR
 * 2026-08-26).
 *
 * Désactivation : si `?nochat=1` est dans l'URL (utile pour les tests
 * E2E et la maintenance), on force l'affichage immédiat sans attendre.
 */
export function ChatFallback() {
  const [showFallback, setShowFallback] = useState(false);
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    // Lire l'état dismissé une seule fois côté client
    try {
      setDismissed(window.localStorage.getItem("e2i-chat-fallback-dismissed") === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed === null) return;
    if (dismissed) return;

    const forceViaUrl =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("nochat") === "1";

    // Test forcé (debug/tests) : on affiche tout de suite.
    if (forceViaUrl) {
      setShowFallback(true);
      return;
    }

    let ready = false;
    const onReady = () => {
      ready = true;
      setShowFallback(false);
    };

    // `hsConversationsOnReady` est le callback officiel HubSpot : il n'est
    // déclenché que lorsque l'API Conversations a réellement fini son
    // initialisation, contrairement à un simple test d'existence de
    // `window.HubSpotConversations` (qui peut être vrai même si l'appel
    // réseau vers api-eu1.hubspot.com nécessaire au widget est bloqué).
    window.hsConversationsOnReady = window.hsConversationsOnReady ?? [];
    window.hsConversationsOnReady.push(onReady);

    const timeout = window.setTimeout(() => {
      if (!ready) setShowFallback(true);
    }, 6000);

    return () => window.clearTimeout(timeout);
  }, [dismissed]);

  const handleDismiss = () => {
    try {
      window.localStorage.setItem("e2i-chat-fallback-dismissed", "1");
    } catch {
      /* localStorage indisponible (mode privé Safari) : ignorer */
    }
    setDismissed(true);
    setShowFallback(false);
  };

  if (!showFallback || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Contact direct"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9998] rounded-2xl border border-gray-200 bg-white shadow-2xl p-4 flex flex-col gap-3"
      data-testid="chat-fallback"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-gray-900">
            Le chat en ligne n&rsquo;a pas pu se charger
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Un bloqueur peut empêcher l&rsquo;affichage. Contactez-nous directement&nbsp;:
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Masquer ce bandeau"
          className="text-gray-400 hover:text-gray-700 text-lg leading-none px-2 -mt-1 -mr-1"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        {FRANCE_PHONE && (
          <a
            href={`tel:${FRANCE_PHONE.tel}`}
            className="flex items-center gap-2 rounded-lg bg-red-primary text-white px-4 py-3 font-bold hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary"
          >
            <span aria-hidden="true">📞</span>
            <span>
              <span className="block text-[10px] font-normal opacity-90">
                France
              </span>
              {FRANCE_PHONE.number}
            </span>
          </a>
        )}
        <Link
          href="/contact"
          className="rounded-lg border border-gray-300 px-4 py-3 font-semibold hover:border-red-primary hover:text-red-primary transition-colors"
        >
          📬 Formulaire de contact
        </Link>
      </div>
    </div>
  );
}

export default ChatFallback;

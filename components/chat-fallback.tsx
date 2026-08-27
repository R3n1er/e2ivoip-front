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
 * Détection : pendant 6 s, on vérifie toutes les 500 ms que
 * `window.HubSpotConversations` OU `#hubspot-conversations-iframe`
 * existe. Si rien n'est détecté au bout de 6 s, on affiche un bandeau
 * persistant en bas de viewport avec 2 canaux de contact directs
 * (téléphone, formulaire). Le bandeau est dismissable par bouton croix
 * (localStorage, sans expiration : choix UX assumé — voir ADR 2026-08-26).
 *
 * La surveillance ne s'arrête PAS à l'affichage du bandeau : sur une
 * connexion lente (3G, DNS lent), le script HubSpot peut arriver après
 * les 6 s. On continue donc à sonder jusqu'à 30 s au total et on retire
 * le bandeau dès que le widget apparaît — sinon le visiteur se
 * retrouverait avec le bandeau superposé au launcher natif (même coin
 * bas-droit), soit deux points de contact concurrents.
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

    const checkChatLoaded = () => {
      const w = window as unknown as {
        HubSpotConversations?: { widget?: unknown };
      };
      const iframe = document.getElementById("hubspot-conversations-iframe");
      // L'API globale existe-t-elle ? Un objet vide suffit à considérer HS chargé
      // — un blocage laisse `HubSpotConversations` undefined.
      const apiLoaded = !!w.HubSpotConversations;
      const iframeLoaded = !!iframe;
      return apiLoaded || iframeLoaded;
    };

    // Test forcé (debug/tests) : on affiche tout de suite.
    if (forceViaUrl) {
      setShowFallback(true);
      return;
    }

    // Sinon, polling 500 ms : affichage du bandeau après 6 s sans widget,
    // puis surveillance prolongée jusqu'à 30 s pour le retirer si le widget
    // finit par se charger (connexion lente).
    const showAfter = Date.now() + 6000;
    const stopWatchingAt = Date.now() + 30000;
    const interval = window.setInterval(() => {
      if (checkChatLoaded()) {
        setShowFallback(false);
        window.clearInterval(interval);
        return;
      }
      if (Date.now() > showAfter) {
        setShowFallback(true);
      }
      if (Date.now() > stopWatchingAt) {
        window.clearInterval(interval);
      }
    }, 500);

    return () => window.clearInterval(interval);
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

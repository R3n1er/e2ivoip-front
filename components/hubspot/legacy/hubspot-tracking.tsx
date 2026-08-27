"use client";

import { useEffect } from "react";
import Script from "next/script";
import { HUBSPOT_CONFIG } from "@/lib/constants/hubspot";

/**
 * Charge le widget natif HubSpot Conversations (snippet loader HubSpot).
 *
 * Choix produit (ADR 2026-08-26) : on utilise le script de tracking officiel
 * `//js-eu1.hs-scripts.com/${portalId}.js` sans réglages préalables — le
 * widget natif apparaît alors automatiquement comme un launcher flottant en
 * bas à droite, sans aucun pré-chat. C'est l'expérience recommandée par
 * HubSpot (voir leur documentation du chat) : pas de formulaire
 * intermédiaire, pas de bannière cookies européenne HS, pas de logique
 * d'initiation conditionnelle. La conversation est ouverte par le visiteur
 * sur l'icône chat.
 *
 * Tous les cookies HS (hubspotutk, __hstc, etc.) sont déposés dès
 * l'arrivée sur le site, sans passer par le bandeau cookies du site. Si
 * tu veux rebrancher un consentement RGPD préalable : voir l'ADR
 * 2026-08-16 archivé — c'était l'ancien comportement avec pré-chat.
 *
 * `enableWidgetCookieBanner: false` reste nécessaire : sans ce réglage,
 * la modale UE `#hs-eu-cookie-confirmation` de HubSpot bloque l'ouverture
 * du widget tant qu'elle n'est pas acceptée (cause du hotfix 82e3c42 du
 * 2026-08-25). `hsConversationsSettings` doit être posé avant le chargement
 * du script pour être pris en compte : on le fait dans un `useEffect`, qui
 * s'exécute avant le montage du script `afterInteractive`.
 *
 * Note dev-only : en mode développement (Turbopack), la console affiche un
 * hydration mismatch bénin causé par l'injection dynamique de `<script>`
 * du SDK HubSpot dans le DOM. Absent en build de production (`npm run
 * build && npm run start`, vérifié) — le widget fonctionne normalement
 * dans les deux cas.
 */
export function HubSpotTracking({
  portalId = HUBSPOT_CONFIG.PORTAL_ID,
}: {
  portalId?: string;
}) {
  useEffect(() => {
    window.hsConversationsSettings = { enableWidgetCookieBanner: false };
  }, []);

  return (
    <Script
      id="hs-script-loader"
      src={`https://js-eu1.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
    />
  );
}

/**
 * Hook pour utiliser les fonctionnalités HubSpot
 */
export function useHubSpot() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined") {
      return;
    }

    window._hsq ??= [];
    window._hsq.push(["trackEvent", eventName, properties]);
  };

  const identifyUser = (email: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined") {
      return;
    }

    window._hsq ??= [];
    window._hsq.push([
      "identify",
      {
        email,
        ...Object.fromEntries(
          Object.entries(properties ?? {}).map(([key, value]) => [
            key,
            String(value),
          ])
        ),
      },
    ]);
  };

  const trackPageView = (url?: string) => {
    if (typeof window === "undefined") {
      return;
    }

    window._hsq ??= [];
    window._hsq.push(["trackPageView", url]);
  };

  return {
    trackEvent,
    identifyUser,
    trackPageView,
  };
}

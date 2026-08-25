"use client";

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
 */
export function HubSpotTracking({
  portalId = HUBSPOT_CONFIG.PORTAL_ID,
}: {
  portalId?: string;
}) {
  return (
    <Script
      id="hs-script-loader"
      src={`https://js-eu1.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
      async
      defer
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

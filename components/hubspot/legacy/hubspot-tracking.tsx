"use client";

import Script from "next/script";
import { HUBSPOT_CONFIG } from "@/lib/constants/hubspot";

interface HubSpotTrackingProps {
  portalId?: string;
  /**
   * Charge le script de tracking (et donc les cookies HubSpot). Voir ADR
   * 2026-08-16 : le script n'est monté qu'une fois le consentement donné, ou
   * lorsque le visiteur demande explicitement le chat.
   */
  enabled?: boolean;
}

export function HubSpotTracking({
  portalId = HUBSPOT_CONFIG.PORTAL_ID,
  enabled = false,
}: HubSpotTrackingProps) {
  return (
    <>
      {/* Les réglages ne déposent aucun cookie : ils sont posés en amont pour
          garantir que `loadImmediately: false` est lu dès l'exécution du
          script, quel que soit le moment où celui-ci est monté. */}
      <Script id="hubspot-conversations-settings" strategy="afterInteractive">
        {`window.hsConversationsSettings = {...window.hsConversationsSettings, loadImmediately: false};
window.hsConversationsOnReady = window.hsConversationsOnReady || [];
window._hsq = window._hsq || [];`}
      </Script>
      {enabled && (
        <Script
          id="hs-script-loader"
          src={`https://js-eu1.hs-scripts.com/${portalId}.js`}
          strategy="afterInteractive"
        />
      )}
    </>
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

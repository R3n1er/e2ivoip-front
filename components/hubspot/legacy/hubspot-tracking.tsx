"use client";

import Script from "next/script";
import { HUBSPOT_CONFIG } from "@/lib/constants/hubspot";

interface HubSpotTrackingProps {
  portalId?: string;
}

export function HubSpotTracking({
  portalId = HUBSPOT_CONFIG.PORTAL_ID,
}: HubSpotTrackingProps) {
  return (
    <>
      <Script id="hubspot-conversations-settings" strategy="afterInteractive">
        {`window.hsConversationsSettings = {...window.hsConversationsSettings, loadImmediately: false};
window.hsConversationsOnReady = window.hsConversationsOnReady || [];
window._hsq = window._hsq || [];`}
      </Script>
      <Script
        id="hs-script-loader"
        src={`https://js-eu1.hs-scripts.com/${portalId}.js`}
        strategy="afterInteractive"
      />
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

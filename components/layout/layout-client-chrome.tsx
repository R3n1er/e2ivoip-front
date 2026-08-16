"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { IconContext } from "@phosphor-icons/react";
import { HeaderSimple } from "@/components/layout/header-simple";
import { ChatPreOverlay } from "@/components/chat-preoverlay";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { HubSpotTracking } from "@/components/hubspot/legacy/hubspot-tracking";
import { getConsent, CONSENT_CHANGE_EVENT } from "@/lib/analytics/consent";

export function LayoutClientChrome({ children }: { children: ReactNode }) {
  // Le script HubSpot dépose des cookies de suivi : il n'est monté qu'une fois
  // le consentement accordé, ou lorsque le visiteur demande le chat (service
  // expressément demandé). Un refus ne bloque donc jamais la conversation.
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      if (getConsent() === "accepted") setTrackingEnabled(true);
    };
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  const enableTracking = useCallback(() => setTrackingEnabled(true), []);

  return (
    // weight « bold » par défaut sur toutes les icônes Phosphor (design.md P3.10).
    // Surchargeable au cas par cas (ex. weight="fill" sur les étoiles/checks pleins).
    <IconContext.Provider value={{ weight: "bold" }}>
      {/* Évitement de blocs — WCAG 2.2 A (2.4.1). Invisible jusqu'à réception
          du focus clavier, puis affiché au-dessus du header fixe. */}
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-red-primary focus:px-6 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:tracking-[0.2em] focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      >
        Aller au contenu
      </a>
      <HeaderSimple />
      <main id="contenu-principal" tabIndex={-1} className="flex-1 pt-16">
        {children}
      </main>
      <HubSpotTracking enabled={trackingEnabled} />
      <ChatPreOverlay onRequestChat={enableTracking} />
      <CookieConsentBanner />
    </IconContext.Provider>
  );
}

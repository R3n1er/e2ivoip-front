"use client";

import { type ReactNode } from "react";
import { IconContext } from "@phosphor-icons/react";
import { HeaderSimple } from "@/components/layout/header-simple";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { HubSpotTracking } from "@/components/hubspot/legacy/hubspot-tracking";
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb";
import { ChatFallback } from "@/components/chat-fallback";

export function LayoutClientChrome({ children }: { children: ReactNode }) {
  // Le chat HubSpot est désormais géré par le widget natif (snippet loader
  // HubSpot, ADR 2026-08-26). Aucune interaction préalable n'est nécessaire :
  // le launcher s'affiche directement en bas à droite dès que le script est
  // chargé. Le script est monté inconditionnellement, comme dans la doc
  // officielle HubSpot (`//js-eu1.hs-scripts.com/26878201.js`).
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
        <PageBreadcrumb />
        {children}
      </main>
      <HubSpotTracking />
      <ChatFallback />
      <CookieConsentBanner />
    </IconContext.Provider>
  );
}

"use client";

import type { ReactNode } from "react";
import { IconContext } from "@phosphor-icons/react";
import { HeaderSimple } from "@/components/layout/header-simple";
import { ChatPreOverlay } from "@/components/chat-preoverlay";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";

export function LayoutClientChrome({ children }: { children: ReactNode }) {
  return (
    // weight « bold » par défaut sur toutes les icônes Phosphor (design.md P3.10).
    // Surchargeable au cas par cas (ex. weight="fill" sur les étoiles/checks pleins).
    <IconContext.Provider value={{ weight: "bold" }}>
      <HeaderSimple />
      <main className="flex-1 pt-16">{children}</main>
      <ChatPreOverlay />
      <CookieConsentBanner />
    </IconContext.Provider>
  );
}

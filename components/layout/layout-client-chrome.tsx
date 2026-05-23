"use client";

import type { ReactNode } from "react";
import { HotjarTracking } from "@/components/hotjar-tracking";
import { HeaderSimple } from "@/components/layout/header-simple";
import { ChatPreOverlay } from "@/components/chat-preoverlay";

export function LayoutClientChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <HotjarTracking />
      <HeaderSimple />
      <main className="flex-1 pt-16">{children}</main>
      <ChatPreOverlay />
    </>
  );
}

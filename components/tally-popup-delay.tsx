"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface TallyPopupDelayProps {
  formId: string;
  delayMs?: number;
  showOnce?: boolean;
}

export function TallyPopupDelay({
  formId,
  delayMs = 15000,
  showOnce = true,
}: TallyPopupDelayProps) {
  const pathname = usePathname();

  useEffect(() => {
    const isTrunkSipPage = pathname.includes(
      "/telephonie-entreprise/trunk-sip-compteur"
    );
    if (!isTrunkSipPage) return;

    // Respecter un affichage unique par session si demandé
    const storageKey = `tally_${formId}_shown`;
    if (showOnce && sessionStorage.getItem(storageKey) === "true") return;

    // Attendre que le script Tally soit chargé (polling léger)
    const waitForTally = (cb: () => void, retries = 30) => {
      if (typeof window !== "undefined" && (window as any).Tally?.openPopup) {
        cb();
      } else if (retries > 0) {
        setTimeout(() => waitForTally(cb, retries - 1), 250);
      }
    };

    const timer = setTimeout(() => {
      try {
        waitForTally(() => {
          (window as any).Tally.openPopup(formId, {
            layout: "modal",
            width: 700,
            overlay: true,
            emoji: { text: "👋", animation: "wave" },
            showOnce,
          });

          if (showOnce) sessionStorage.setItem(storageKey, "true");
        });
      } catch (_) {
        // Pas d'erreur bloquante si Tally n'est pas prêt
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [pathname, formId, delayMs, showOnce]);

  return null;
}

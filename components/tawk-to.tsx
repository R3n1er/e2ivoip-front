"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface TawkToProps {
  widgetId?: string;
}

export function TawkTo({
  widgetId = "688d3cc109ef001928d4773f/1j1jrald3",
}: TawkToProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Lecture du flag d'activation via env publique
    const isEnabled = process.env.NEXT_PUBLIC_TAWK_TO_ENABLED === "true";

    if (!isEnabled) {
      return;
    }

    // Pages à exclure du chat
    const excludedPages = [
      "/contact",
      "/devis-en-ligne",
      "/telephonie-entreprise/trunk-sip-compteur",
    ];

    // Vérifier si la page actuelle est exclue
    const isExcluded = excludedPages.some((page) => pathname.includes(page));

    if (isExcluded) {
      // Désactiver le chat sur les pages exclues
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
      return;
    }

    // Charger le script Tawk.to seulement si pas déjà chargé
    if (!window.Tawk_API) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://embed.tawk.to/${widgetId}`;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.head.appendChild(script);
    } else {
      // Réactiver le widget si déjà chargé
      window.Tawk_API.showWidget();
    }

    // Cleanup function
    return () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };
  }, [pathname, widgetId]);

  return null; // Ce composant ne rend rien visuellement
}

// Déclarations TypeScript pour Tawk.to
declare global {
  interface Window {
    Tawk_API?: {
      hideWidget: () => void;
      showWidget: () => void;
      onLoad?: () => void;
      onStatusChange?: (status: string) => void;
    };
    Tawk_LoadStart?: Date;
  }
}

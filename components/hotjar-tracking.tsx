"use client";

import { useEffect } from "react";

interface HotjarTrackingProps {
  hjid?: number; // Hotjar ID
}

export function HotjarTracking({ hjid = 6502550 }: HotjarTrackingProps) {
  useEffect(() => {
    // Vérifier si le script Hotjar n'est pas déjà chargé
    if (document.getElementById("hotjar-script")) {
      return;
    }

    // Initialiser Hotjar selon le script fourni dans le PRD
    if (typeof window !== "undefined") {
      // Définir la fonction hj et les settings
      (window as any).hj = (window as any).hj || function(...args: any[]) {
        ((window as any).hj.q = (window as any).hj.q || []).push(args);
      };
      (window as any)._hjSettings = { hjid: hjid, hjsv: 6 };

      // Créer et injecter le script Hotjar
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.id = "hotjar-script";
      script.async = true;
      script.src = `https://static.hotjar.com/c/hotjar-${hjid}.js?sv=6`;
      head.appendChild(script);
    }
  }, [hjid]);

  return null; // Ce composant n'affiche rien
}
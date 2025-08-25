"use client";

import { useEffect } from "react";

interface TawkToChatProps {
  delay?: number; // Délai en millisecondes
}

export function TawkToChat({ delay = 10000 }: TawkToChatProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Vérifier si le script Tawk.to n'est pas déjà chargé
      if (document.getElementById("tawk-to-script")) {
        return;
      }

      // Créer et injecter le script Tawk.to
      const script = document.createElement("script");
      script.id = "tawk-to-script";
      script.async = true;
      script.src = "https://embed.tawk.to/688d3cc109ef001928d4773f/1j1jrald3";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      // Initialiser Tawk_API si pas déjà fait
      if (typeof window !== "undefined") {
        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_LoadStart = new Date();
      }

      // Ajouter le script au document
      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return null; // Ce composant n'affiche rien
}
"use client";

import { useEffect } from "react";

export function TallyPopupClean() {
  useEffect(() => {
    // Charger le script Tally après un délai
    const loadTally = setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      
      script.onload = () => {
        // Configurer le popup après le chargement du script
        setTimeout(() => {
          (window as any).TallyConfig = {
            formId: "mDY1bl",
            popup: {
              emoji: {
                text: "👋",
                animation: "wave"
              },
              open: {
                trigger: "time",
                ms: 5000
              },
              autoClose: 0,
              doNotShowAfterSubmit: true
            }
          };
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error("Failed to load Tally script:", error);
      };
      
      document.head.appendChild(script);
    }, 2000);

    return () => {
      clearTimeout(loadTally);
    };
  }, []);

  // Ce composant ne rend rien de visible
  return null;
}
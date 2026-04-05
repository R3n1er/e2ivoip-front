"use client";

import { useEffect } from "react";

export function TallyPopupClean() {
  useEffect(() => {
    console.log("🚀 Initializing Tally popup with emoji");
    
    // ÉTAPE 1: Définir la configuration AVANT de charger le script (crucial pour l'emoji)
    (window as any).TallyConfig = {
      "formId": "mDY1bl",
      "popup": {
        "emoji": {
          "text": "👋",
          "animation": "wave"
        },
        "open": {
          "trigger": "time",
          "ms": 5000
        },
        "autoClose": 0,
        "doNotShowAfterSubmit": true
      }
    };
    
    console.log("✅ TallyConfig defined BEFORE script load:", (window as any).TallyConfig);

    // ÉTAPE 2: Vérifier si le script Tally est déjà présent
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    
    if (existingScript) {
      console.log("📜 Tally script already exists, forcing reload");
      // Forcer le rechargement si Tally existe déjà
      if ((window as any).Tally && (window as any).Tally.loadEmbeds) {
        (window as any).Tally.loadEmbeds();
      }
      return;
    }

    // ÉTAPE 3: Charger le script Tally
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    
    script.onload = () => {
      console.log("📥 Tally script loaded successfully");
      
      // Attendre un peu que Tally s'initialise complètement
      setTimeout(() => {
        if ((window as any).Tally) {
          console.log("🎯 Tally object is available, emoji should work!");
          console.log("📋 Final TallyConfig:", (window as any).TallyConfig);
        } else {
          console.warn("⚠️ Tally object not found after script load");
        }
      }, 1000);
    };
    
    script.onerror = (error) => {
      console.error("❌ Failed to load Tally script:", error);
    };
    
    console.log("📤 Adding Tally script to document head");
    document.head.appendChild(script);

    // ÉTAPE 4: Déclenchement de secours après 8 secondes
    setTimeout(() => {
      console.log("🔥 Backup trigger after 8 seconds");
      if ((window as any).Tally && (window as any).Tally.openPopup) {
        console.log("🚀 Manually opening popup with emoji");
        (window as any).Tally.openPopup("mDY1bl");
      } else {
        console.warn("⚠️ Backup trigger failed - Tally not available");
      }
    }, 8000);

  }, []);

  // Ce composant ne rend rien de visible
  return null;
}
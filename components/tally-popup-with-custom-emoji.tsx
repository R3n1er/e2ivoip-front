"use client";

import { useEffect, useState } from "react";

export function TallyPopupWithCustomEmoji() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    console.log("🚀 Initializing Tally with custom emoji animation");

    // Configuration Tally avec emoji intégré dans le formulaire
    (window as any).TallyConfig = {
      "formId": "mDY1bl",
      "popup": {
        "emoji": {
          "text": "👋",
          "animation": "wave"
        },
        "open": {
          "trigger": "time",
          "ms": 15000
        },
        "autoClose": 0,
        "doNotShowAfterSubmit": true
      }
    };

    // Charger le script Tally
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      
      script.onload = () => {
        console.log("📥 Tally script loaded");
      };
      
      document.head.appendChild(script);
    }

    // Afficher notre emoji personnalisé après 1 seconde
    const showEmojiTimer = setTimeout(() => {
      setShowEmoji(true);
      console.log("👋 Custom emoji appeared");
      
      // Démarrer l'animation wave après un petit délai
      setTimeout(() => {
        startWaveAnimation();
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(showEmojiTimer);
    };
  }, []);

  const startWaveAnimation = () => {
    console.log("🌊 Starting wave animation");
    
    // Première animation immédiate
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 800);
    
    // Animation wave toutes les 3 secondes
    const waveInterval = setInterval(() => {
      console.log("🌊 Wave animation triggered");
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 800); // Animation dure 800ms
    }, 3000);

    // Arrêter l'animation après 20 secondes
    setTimeout(() => {
      console.log("🛑 Stopping wave animation");
      clearInterval(waveInterval);
      setIsWaving(false);
    }, 20000);
  };

  const handleEmojiClick = () => {
    console.log("🖱️ Custom emoji clicked - opening Tally");
    if ((window as any).Tally && (window as any).Tally.openPopup) {
      (window as any).Tally.openPopup("mDY1bl");
      setShowEmoji(false); // Cacher après ouverture
    }
  };

  if (!showEmoji) return null;

  return (
    <>
      {/* Styles CSS pour l'animation wave personnalisée */}
      <style jsx global>{`
        @keyframes customWave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .wave-animation {
          animation: customWave 0.8s ease-in-out !important;
          transform-origin: 70% 70% !important;
        }
        
        .pulse-glow {
          animation: pulseGlow 2s infinite !important;
        }
      `}</style>

      {/* Emoji flottant personnalisé */}
      <div
        onClick={handleEmojiClick}
        className={`fixed bottom-6 right-6 z-50 cursor-pointer select-none transition-all duration-300 hover:scale-110 ${
          isWaving ? '' : 'pulse-glow'
        }`}
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
        }}
      >
        {/* Bulle de dialogue */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Besoin d'aide ? Cliquez-moi ! 👋
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>

        {/* Conteneur du bouton emoji */}
        <div className="relative group">
          {/* Bouton principal avec dégradé E2I VoIP */}
          <div className="w-16 h-16 bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative">
            {/* Emoji avec animation wave */}
            <span 
              className={`text-3xl transition-transform duration-300 ${isWaving ? 'wave-animation' : ''}`}
              style={{ 
                lineHeight: 1,
                display: 'inline-block'
              }}
            >
              👋
            </span>
            
            {/* Indicateur d'animation avec cercle pulsant */}
            {isWaving && (
              <div className="absolute inset-0 rounded-full border-2 border-white opacity-60 animate-ping"></div>
            )}
          </div>

          {/* Texte au survol */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Formulaire de devis
          </div>
        </div>
      </div>
    </>
  );
}
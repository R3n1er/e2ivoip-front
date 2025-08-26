"use client";

import { useEffect, useState } from "react";

export function TallyPopupWithEmoji() {
  const [showButton, setShowButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Charger le script Tally
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    
    script.onload = () => {
      console.log("Tally script loaded");
      
      // Attendre que Tally soit prêt
      const waitForTally = setInterval(() => {
        if ((window as any).Tally) {
          clearInterval(waitForTally);
          console.log("Tally is ready");
          
          // Afficher le bouton emoji après 1.5 secondes
          setTimeout(() => {
            setShowButton(true);
            // Démarrer l'animation wave
            setIsAnimating(true);
            
            // Animation périodique toutes les 3 secondes
            const animationInterval = setInterval(() => {
              setIsAnimating(false);
              setTimeout(() => setIsAnimating(true), 100);
            }, 3000);
            
            // Nettoyer l'animation après 30 secondes
            setTimeout(() => {
              clearInterval(animationInterval);
              setIsAnimating(false);
            }, 30000);
          }, 1500);
        }
      }, 200);
    };
    
    document.head.appendChild(script);
  }, []);

  const handleClick = () => {
    if ((window as any).Tally && (window as any).Tally.openPopup) {
      console.log("Opening Tally popup");
      (window as any).Tally.openPopup("mDY1bl");
      // Cacher le bouton après ouverture
      setShowButton(false);
    }
  };

  if (!showButton) return null;

  return (
    <div
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 cursor-pointer group transition-all duration-300 hover:scale-110 ${
        isAnimating ? 'animate-bounce' : ''
      }`}
      style={{
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
      }}
    >
      {/* Bulle de texte */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Une question sur nos solutions ?
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
      
      {/* Bouton emoji */}
      <div className="w-14 h-14 bg-gradient-to-r from-red-primary to-blue-marine rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <span className={`${isAnimating ? 'animate-pulse' : ''}`}>👋</span>
      </div>
      
      {/* Ring d'attention */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full border-2 border-red-primary opacity-75 animate-ping"></div>
      )}
    </div>
  );
}
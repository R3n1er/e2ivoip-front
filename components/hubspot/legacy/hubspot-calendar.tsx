"use client";

import { useEffect, useRef } from "react";

interface HubSpotCalendarProps {
  /**
   * URL du calendrier HubSpot (sans le paramètre embed=true)
   */
  meetingUrl?: string;
  /**
   * Titre affiché au-dessus du calendrier
   */
  title?: string;
  /**
   * Description affichée sous le titre
   */
  description?: string;
  /**
   * Hauteur du calendrier (en pixels)
   */
  height?: number;
  /**
   * Classes CSS personnalisées pour le conteneur
   */
  className?: string;
  /**
   * Afficher les informations de contact alternatives
   */
  showContactInfo?: boolean;
}

declare global {
  interface Window {
    hsMeetingsSettings?: any;
  }
}

export function HubSpotCalendar({
  meetingUrl = "https://www.e2i-voip.com/meetings/alban-renier",
  title = "Planifiez votre démonstration gratuite",
  description = "Choisissez le créneau qui vous convient le mieux",
  height = 600,
  className = "",
  showContactInfo = true,
}: HubSpotCalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Ne charger le script qu'une seule fois
    if (scriptLoadedRef.current) return;

    const loadHubSpotScript = () => {
      // Vérifier si le script est déjà chargé
      if (document.querySelector('script[src*="MeetingsEmbedCode.js"]')) {
        scriptLoadedRef.current = true;
        return;
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
      script.async = true;
      
      script.onload = () => {
        scriptLoadedRef.current = true;
        // Le script se charge automatiquement et détecte les conteneurs
      };
      
      script.onerror = () => {
        console.error("Erreur lors du chargement du script HubSpot Calendar");
      };

      document.body.appendChild(script);
    };

    loadHubSpotScript();
  }, []);

  useEffect(() => {
    // Configurer le conteneur après le montage du composant
    if (containerRef.current && meetingUrl) {
      const embedUrl = `${meetingUrl}${meetingUrl.includes('?') ? '&' : '?'}embed=true`;
      containerRef.current.setAttribute('data-src', embedUrl);
    }
  }, [meetingUrl]);

  return (
    <div className={`hubspot-calendar-wrapper ${className}`}>
      {/* En-tête du calendrier */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Conteneur du calendrier HubSpot */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div 
          ref={containerRef}
          className="meetings-iframe-container"
          style={{ minHeight: `${height}px` }}
        >
          {/* Placeholder pendant le chargement */}
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement du calendrier...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informations de contact alternatives */}
      {showContactInfo && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-3">
              Vous préférez nous appeler directement ?
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <i className="lni lni-phone text-red-600"></i>
                <span className="font-medium">Guyane :</span>
                <a href="tel:0594963500" className="text-blue-600 hover:text-blue-800">
                  0594 963 500
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="lni lni-phone text-red-600"></i>
                <span className="font-medium">Guadeloupe :</span>
                <a href="tel:0590173500" className="text-blue-600 hover:text-blue-800">
                  0590 173 500
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="lni lni-phone text-red-600"></i>
                <span className="font-medium">Martinique :</span>
                <a href="tel:0596313500" className="text-blue-600 hover:text-blue-800">
                  0596 313 500
                </a>
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <i className="lni lni-phone text-red-600"></i>
                <span className="font-medium">La Réunion :</span>
                <a href="tel:+262263085500" className="text-blue-600 hover:text-blue-800">
                  +262 263 085 500
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="lni lni-phone text-red-600"></i>
                <span className="font-medium">France :</span>
                <a href="tel:0189563500" className="text-blue-600 hover:text-blue-800">
                  0189 563 500
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
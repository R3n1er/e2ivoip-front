"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from '@/lib/icons';

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
  // Domaine HubSpot canonique (portail EU1). NE PAS pointer vers
  // www.e2i-voip.com/meetings/* : ce chemin n'existe que tant que le site est
  // servi par HubSpot CMS et disparaît à la bascule sur Next.js.
  meetingUrl = "https://meetings-eu1.hubspot.com/alban-renier",
  title = "Planifiez votre démonstration gratuite",
  description = "Choisissez le créneau qui vous convient le mieux",
  height = 600,
  className = "",
  showContactInfo = true,
}: HubSpotCalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [failed, setFailed] = useState(false);

  // `data-src` doit être posé AVANT l'exécution du script : celui-ci scanne les
  // conteneurs `.meetings-iframe-container` au chargement et lit cet attribut.
  useEffect(() => {
    if (containerRef.current && meetingUrl) {
      const embedUrl = `${meetingUrl}${meetingUrl.includes('?') ? '&' : '?'}embed=true`;
      containerRef.current.setAttribute('data-src', embedUrl);
    }
  }, [meetingUrl]);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

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
    };

    // Sans ce repli, l'échec du script (bloqueur, coupure) laissait le visiteur
    // sur un spinner infini, sans autre moyen de prendre rendez-vous.
    script.onerror = () => setFailed(true);

    document.body.appendChild(script);
  }, []);

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
          data-testid="hubspot-calendar-container"
        >
          {failed ? (
            <div
              className="flex h-full items-center justify-center bg-gray-50 p-6"
              data-testid="hubspot-calendar-fallback"
            >
              <div className="text-center">
                <p className="mb-4 text-gray-700">
                  Le calendrier de réservation n&apos;a pas pu se charger.
                </p>
                <a
                  href={meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-red-primary px-6 py-3 font-bold text-white transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
                >
                  Ouvrir le calendrier dans un nouvel onglet
                </a>
              </div>
            </div>
          ) : (
            <div
              className="flex h-full items-center justify-center bg-gray-50"
              data-testid="hubspot-calendar-loading"
            >
              <div className="text-center">
                <div
                  className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-red-primary motion-reduce:animate-none"
                  aria-hidden="true"
                ></div>
                <p className="text-gray-600" role="status">
                  Chargement du calendrier…
                </p>
              </div>
            </div>
          )}
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
                <Phone size={24} className="text-red-600" aria-hidden="true" />
                <span className="font-medium">Guyane :</span>
                <a href="tel:+594594963500" className="text-blue-600 hover:text-blue-800">
                  05 94 96 35 00
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={24} className="text-red-600" aria-hidden="true" />
                <span className="font-medium">Guadeloupe :</span>
                <a href="tel:+590590173500" className="text-blue-600 hover:text-blue-800">
                  05 90 17 35 00
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={24} className="text-red-600" aria-hidden="true" />
                <span className="font-medium">Martinique :</span>
                <a href="tel:+596596313500" className="text-blue-600 hover:text-blue-800">
                  05 96 31 35 00
                </a>
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Phone size={24} className="text-red-600" aria-hidden="true" />
                <span className="font-medium">La Réunion :</span>
                <a href="tel:+262263085500" className="text-blue-600 hover:text-blue-800">
                  02 63 08 55 00
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={24} className="text-red-600" aria-hidden="true" />
                <span className="font-medium">France :</span>
                <a href="tel:+33189560500" className="text-blue-600 hover:text-blue-800">
                  01 89 56 05 00
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
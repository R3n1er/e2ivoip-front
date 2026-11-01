"use client";

import { useEffect, useState } from "react";
import {
  BOOKINGS_COMMERCIAL_EMBED_URL,
  BOOKINGS_COMMERCIAL_URL,
} from "@/lib/constants/bookings";

interface BookingsCalendarProps {
  /**
   * Source de l'iframe (code d'intégration Bookings)
   */
  embedUrl?: string;
  /**
   * URL du lien de secours (forme courte, celle qui fait foi)
   */
  bookingUrl?: string;
  /**
   * Hauteur fixe de l'iframe (en pixels). Bookings, cross-origin, ne transmet
   * pas sa hauteur : la valeur doit couvrir toute la page Bookings (≈ 2 350 px
   * mesurés le 2026-11-01, bouton « Réserver » à ≈ 2 055 px) plus une marge
   * pour une journée chargée en créneaux.
   */
  height?: number;
  /**
   * Classes CSS personnalisées pour le conteneur
   */
  className?: string;
}

export function BookingsCalendar({
  embedUrl = BOOKINGS_COMMERCIAL_EMBED_URL,
  bookingUrl = BOOKINGS_COMMERCIAL_URL,
  height = 2450,
  className = "",
}: BookingsCalendarProps) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // L'iframe n'est rendue qu'après hydratation : rendue côté serveur, elle
  // peut finir de charger avant que React ne branche `onLoad`, et le message
  // de chargement resterait alors indéfiniment par-dessus le calendrier.
  useEffect(() => setMounted(true), []);

  return (
    <div className={className} data-testid="bookings-calendar">
      {/* Lien de secours toujours visible, placé avant le cadre : un échec
          d'iframe cross-origin (bloqueur, pare-feu d'entreprise) n'est pas
          détectable côté page. */}
      <p className="mb-4 text-center text-sm text-ui-muted">
        Le calendrier ne s&apos;affiche pas ?{" "}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-red-700 underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
          data-testid="bookings-calendar-fallback"
        >
          Ouvrir la prise de rendez-vous dans un nouvel onglet
        </a>
      </p>

      {/* Ni cadre ni ombre : posé sur un fond `ui-surface-2`, quasi identique
          au fond de Bookings (#F4F4F4), le calendrier se fond dans la page. */}
      <div className="relative overflow-hidden" style={{ height }}>
        {!loaded && (
          <div
            className="absolute inset-0 flex items-start justify-center bg-ui-surface-2 pt-24"
            data-testid="bookings-calendar-loading"
          >
            <div className="text-center">
              <div
                className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-red-primary motion-reduce:animate-none"
                aria-hidden="true"
              ></div>
              <p className="text-ui-muted" role="status">
                Chargement du calendrier…
              </p>
            </div>
          </div>
        )}
        {mounted && (
          <iframe
            src={embedUrl}
            title="Prendre rendez-vous avec un commercial E2I VOIP"
            scrolling="no"
            loading="lazy"
            className="block h-full w-full border-0"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}

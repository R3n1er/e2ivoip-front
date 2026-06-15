// Initialisation PostHog côté navigateur (Next.js 15.3+ : ce fichier s'exécute
// avant l'hydratation, sur TOUTES les pages de l'app). C'est le point unique
// d'amorçage de l'analytics — voir lib/analytics/track-event.ts pour l'envoi
// d'événements custom (cta_click, phone_click, form_submit).
import posthog from 'posthog-js'
import { hasAcceptedCookies } from '@/lib/analytics/consent'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

// Sans token (ex. preview, CI), on n'initialise pas : capture() restera silencieux.
if (token) {
  // L'init peut échouer si le SDK est bloqué très tôt ; on protège l'amorçage.
  try {
    posthog.init(token, {
      api_host: host,
      // 'history_change' = capture les navigations App Router (SPA), pas seulement
      // le chargement initial → toutes les pages sont suivies. autocapture couvre
      // clics/soumissions sans instrumentation manuelle.
      capture_pageview: 'history_change',
      capture_pageleave: 'if_capture_pageview',
      autocapture: true,
      // Cookieless par défaut (RGPD) : aucun cookie tant que le visiteur n'a pas
      // consenti. La bascule en mode cookies se fait via acceptCookies() (consent.ts).
      persistence: 'memory',
      // Jeu de défauts daté recommandé par PostHog (comportements à jour du SDK).
      defaults: '2025-05-24',
      loaded: (ph) => {
        // Visiteur déjà consentant lors d'une visite précédente → cookies directs.
        if (hasAcceptedCookies()) {
          ph.set_config({ persistence: 'localStorage+cookie' })
        }
      },
    })
  } catch {
    // Init impossible (SDK bloqué) : on ignore, l'app continue normalement.
  }
}

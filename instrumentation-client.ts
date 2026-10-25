// Initialisation PostHog côté navigateur (Next.js 15.3+ : ce fichier s'exécute
// avant l'hydratation, sur TOUTES les pages de l'app). C'est le point unique
// d'amorçage de l'analytics — voir lib/analytics/track-event.ts pour l'envoi
// d'événements custom (cta_click, phone_click, form_submit).
import posthog from 'posthog-js'
import { initBotId } from 'botid/client/core'
import { hasAcceptedCookies } from '@/lib/analytics/consent'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

// Vercel BotID : protection invisible du formulaire d'exercice des droits
// RGPD. Le widget côté client charge les challenges et transmet le verdict
// au serveur via checkBotId(). Sans protection, le formulaire était
// spammé par des bots qui ne contrôlaient pas la boîte mail du
// destinataire — le double opt-in bloque les confirmations.
try {
  initBotId({
    protect: [
      { path: '/api/rgpd/demande', method: 'POST' },
      { path: '/api/rgpd/confirm', method: 'GET' },
    ],
  })
} catch {
  // BotID peut ne pas être disponible en dehors de Vercel ; l'app continue.
}

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

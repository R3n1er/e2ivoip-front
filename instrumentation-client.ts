import posthog from 'posthog-js'

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: isLocalhost ? 'https://eu.i.posthog.com' : '/ingest',
  ui_host: 'https://eu.posthog.com',
  // Include the defaults option as required by PostHog
  defaults: '2026-01-30',
  // Enables capturing unhandled exceptions via Error Tracking
  capture_exceptions: true,
  // Turn on debug in development mode
  debug: process.env.NODE_ENV === 'development',
  // GDPR: cookieless mode
  persistence: 'memory',
  capture_pageview: true,
  capture_pageleave: true,
})

// IMPORTANT: Never combine this approach with other client-side PostHog initialization approaches,
// especially components like a PostHogProvider. instrumentation-client.ts is the correct solution
// for initializing client-side PostHog in Next.js 15.3+ apps.

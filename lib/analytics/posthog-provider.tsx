'use client'

import { useEffect, type ReactNode } from 'react'
import posthog from 'posthog-js'

const POSTHOG_HOST = 'https://eu.i.posthog.com'

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
    if (!key || typeof window === 'undefined') return
    try {
      posthog.init(key, {
        api_host: POSTHOG_HOST,
        persistence: 'memory',
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            ph.debug()
          }
        },
      })
    } catch (error) {
      console.error('[Analytics] PostHog init failed:', error)
    }
  }, [])

  return <>{children}</>
}

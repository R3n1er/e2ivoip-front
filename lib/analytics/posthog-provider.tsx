'use client'

import type { ReactNode } from 'react'

// PostHog is initialized in instrumentation-client.ts (Next.js 15.3+ approach)
// This provider is a pass-through wrapper kept for layout structure
export function PostHogProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

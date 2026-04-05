---
phase: 01-posthog-analytics-baseline
plan: 01
subsystem: analytics
tags: [posthog, analytics, gdpr, tracking]
dependency_graph:
  requires: []
  provides: [posthog-provider, track-event, analytics-types]
  affects: [app/layout.tsx]
tech_stack:
  added: [posthog-js]
  patterns: [client-provider-pattern, try-catch-graceful-degradation]
key_files:
  created:
    - lib/analytics/types.ts
    - lib/analytics/track-event.ts
    - lib/analytics/posthog-provider.tsx
    - tests/analytics/track-event.test.ts
    - tests/analytics/posthog-provider.test.tsx
  modified:
    - app/layout.tsx
    - package.json
    - package-lock.json
decisions:
  - "Read NEXT_PUBLIC_POSTHOG_KEY inside useEffect (not module-level const) for testability and SSR safety"
  - "Use getter pattern in jest.mock factories to avoid TDZ reference errors with hoisted mocks"
metrics:
  duration: 4m
  completed: 2026-04-05T01:59:01Z
  tasks_completed: 2
  tasks_total: 2
  tests_added: 8
  tests_passing: 8
---

# Phase 01 Plan 01: PostHog SDK Integration Summary

PostHog JS SDK installed with EU Cloud endpoint, cookieless persistence (memory), and session recordings enabled. Safe trackEvent utility wraps all posthog.capture calls in try/catch for graceful degradation.

## What Was Built

### Analytics Type System (`lib/analytics/types.ts`)
- `AnalyticsEventName` union type: `'cta_click' | 'phone_click' | 'form_submit'`
- `EventPayload` interface with `page`, `element_id`, `element_text` fields

### Safe Event Tracking (`lib/analytics/track-event.ts`)
- `trackEvent(event, payload)` function that calls `posthog.capture`
- Guards against undefined posthog (adblockers, SSR)
- try/catch wrapping with `console.error` logging on failure
- Never throws -- site continues functioning if analytics fails

### PostHog Provider (`lib/analytics/posthog-provider.tsx`)
- `'use client'` component wrapping PostHog initialization
- EU Cloud: `api_host: 'https://eu.i.posthog.com'` (GDPR data residency)
- Cookieless: `persistence: 'memory'` (no cookies, no banner needed)
- Session recordings enabled (default, not disabled)
- Auto pageview and pageleave capture enabled
- Debug mode in development environment
- try/catch on init for graceful degradation

### Layout Integration (`app/layout.tsx`)
- PostHogProvider wraps all body content (HotjarTracking, HeaderSimple, main, Footer, ChatPreOverlay)
- Import added alongside existing component imports

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | RED: failing tests | 6b96d1f | lib/analytics/types.ts, tests/analytics/*.test.{ts,tsx} |
| 2 | GREEN: implement + wire | 2d69495 | lib/analytics/track-event.ts, posthog-provider.tsx, app/layout.tsx, package.json |

## Decisions Made

1. **Env var read inside useEffect**: Reading `NEXT_PUBLIC_POSTHOG_KEY` inside the useEffect callback rather than as a module-level constant. This ensures testability (env var can be set before render) and avoids SSR issues where the value might not be available at module load time.

2. **Getter pattern for jest.mock**: Used `get default() { return mockPosthog }` in mock factories to avoid temporal dead zone (TDZ) reference errors caused by Jest hoisting `jest.mock` above `const` declarations.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TDZ reference error in test mocks**
- **Found during:** Task 2 (GREEN phase)
- **Issue:** `jest.mock` factory functions are hoisted above `const` declarations, causing `ReferenceError: Cannot access 'mockCapture' before initialization`
- **Fix:** Changed mock factories to use getter pattern (`get default() { return mockObj }`) which defers access until runtime
- **Files modified:** tests/analytics/track-event.test.ts, tests/analytics/posthog-provider.test.tsx

**2. [Rule 1 - Bug] Fixed module-level env var not available in tests**
- **Found during:** Task 2 (GREEN phase)
- **Issue:** `POSTHOG_KEY` was read at module level as a `const`, but `process.env.NEXT_PUBLIC_POSTHOG_KEY` was not yet set when module was imported in tests, causing init to skip (empty key guard)
- **Fix:** Moved env var read inside `useEffect` callback where it is evaluated at render time
- **Files modified:** lib/analytics/posthog-provider.tsx

## Verification Results

- All 8 tests pass (3 trackEvent + 5 PostHogProvider)
- posthog-js in package.json dependencies: confirmed
- PostHogProvider in layout.tsx: confirmed
- EU Cloud (eu.i.posthog.com): confirmed
- Cookieless (persistence: memory): confirmed
- Session recordings not disabled: confirmed
- Pre-existing TS error in tests/services-section-prd.test.tsx (unrelated regex flag) -- not in scope

## Threat Surface

No new threat flags. All surfaces match the plan's threat model:
- PostHog SDK bundled via npm (not CDN) with try/catch on all calls
- EU Cloud endpoint for GDPR data residency
- Cookieless mode (no persistent identifiers)
- Public write-only API key (by design)

## Self-Check: PASSED

All 7 files verified present. Both commit hashes (6b96d1f, 2d69495) confirmed in git log.

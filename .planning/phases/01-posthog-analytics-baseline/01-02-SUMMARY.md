---
phase: 01-posthog-analytics-baseline
plan: 02
subsystem: analytics
tags: [posthog, analytics, event-tracking, cta, hubspot, tally]
dependency_graph:
  requires: [posthog-provider, track-event, analytics-types]
  provides: [cta-click-tracking, phone-click-tracking, form-submit-tracking]
  affects: [components/ui/cta-button.tsx, components/hubspot/hubspot-form.tsx, components/tally-popup-clean.tsx]
tech_stack:
  added: []
  patterns: [usePathname-for-page-tracking, postMessage-listener-for-tally]
key_files:
  created:
    - tests/analytics/event-integration.test.tsx
  modified:
    - components/ui/cta-button.tsx
    - components/hubspot/hubspot-form.tsx
    - components/tally-popup-clean.tsx
decisions:
  - "Use usePathname() in CTA components for page tracking instead of window.location.pathname for SSR safety"
  - "Extract children text with typeof check -- only string children get element_text, ReactNode children get empty string"
  - "Tally tracking via postMessage listener since Tally SDK has no native submission callback"
  - "trackEvent fires before onFormSubmitted callback in HubSpot to ensure analytics capture even if callback throws"
metrics:
  duration: 3m
  completed: 2026-04-05T02:10:57Z
  tasks_completed: 2
  tasks_total: 2
  tests_added: 6
  tests_passing: 6
---

# Phase 01 Plan 02: Event Tracking Integration Summary

trackEvent wired into all conversion components: CTA buttons fire cta_click, tel: links fire phone_click, HubSpot forms and Tally popup fire form_submit via postMessage listener.

## What Was Built

### CTA Button Tracking (`components/ui/cta-button.tsx`)
- All three variants (CTAButton, CTAButtonMarine, CTAButtonSecondary) now call trackEvent on click
- Uses `usePathname()` from next/navigation for SSR-safe page tracking
- Detects `external && href.startsWith('tel:')` to fire `phone_click` instead of `cta_click`
- Extracts button text from string children for `element_text` payload
- Uses `href` as `element_id` for event correlation

### HubSpot Form Tracking (`components/hubspot/hubspot-form.tsx`)
- `trackEvent('form_submit', ...)` added to `onFormSubmitted` callback inside `formsApi.create()`
- Fires with `element_id: hubspot-{resolvedFormId}` for form identification
- Uses `window.location.pathname` for page (runs only in browser context)
- Fires before user callback to ensure analytics capture

### Tally Popup Tracking (`components/tally-popup-clean.tsx`)
- Added `message` event listener for `Tally.FormSubmitted` postMessage events
- Fires `trackEvent('form_submit', ...)` with `element_id: tally-{formId}`
- Wrapped in try/catch for graceful degradation
- Cleanup removes event listener on component unmount

### Integration Tests (`tests/analytics/event-integration.test.tsx`)
- 6 tests covering all 3 event types across all component variants
- Mocks: trackEvent module, posthog-js, next/link, next/navigation
- CTA tests: CTAButton cta_click, CTAButton phone_click (tel:), CTAButtonMarine, CTAButtonSecondary
- HubSpot test: captures onFormSubmitted callback from hbspt.forms.create mock
- Tally test: dispatches MessageEvent to simulate Tally.FormSubmitted

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | RED: failing integration tests | 1ace248 | tests/analytics/event-integration.test.tsx |
| 2 | GREEN: wire trackEvent into components | 38a88de | components/ui/cta-button.tsx, components/hubspot/hubspot-form.tsx, components/tally-popup-clean.tsx |

## Decisions Made

1. **usePathname() for CTA page tracking**: Used Next.js `usePathname()` hook rather than `window.location.pathname` in CTA components. This is SSR-safe and consistent with React patterns. HubSpot form uses `window.location.pathname` since it only runs in a browser useEffect context.

2. **String children extraction**: Only extract `element_text` when children is a string. ReactNode children (JSX) get empty string to avoid serialization issues. Button text is the primary user-visible label.

3. **Tally postMessage listener pattern**: Since Tally SDK provides no native submission callback, we listen for `Tally.FormSubmitted` events via the `message` event on window. This is the documented Tally integration approach.

4. **trackEvent before user callback**: In HubSpot form, trackEvent fires before the user-provided `onFormSubmitted` callback. This ensures analytics capture even if the callback throws.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript narrowing error in test**
- **Found during:** Task 2 (GREEN phase)
- **Issue:** TypeScript narrowed `capturedOnFormSubmitted` to `never` type because it was assigned inside a callback closure, making it appear never-assigned from TS perspective
- **Fix:** Added explicit type cast `as ((data: any) => void) | null` before the null check
- **Files modified:** tests/analytics/event-integration.test.tsx

## Verification Results

- All 6 integration tests pass (4 CTA + 1 HubSpot + 1 Tally)
- All 14 analytics tests pass (6 integration + 3 trackEvent + 5 PostHogProvider)
- No new TypeScript errors (pre-existing regex flag error in tests/services-section-prd.test.tsx unrelated)
- trackEvent imported in cta-button.tsx: confirmed
- trackEvent('cta_click') in cta-button.tsx: confirmed
- phone_click in cta-button.tsx: confirmed
- trackEvent('form_submit') in hubspot-form.tsx: confirmed
- trackEvent('form_submit') in tally-popup-clean.tsx: confirmed
- Tally.FormSubmitted listener in tally-popup-clean.tsx: confirmed

## Threat Surface

No new threat flags beyond plan's threat model. All tracking payloads contain only page path, element_id (href or form identifier), and element_text (button label). No PII, no form content, no user input sent to PostHog.

## Self-Check: PASSED

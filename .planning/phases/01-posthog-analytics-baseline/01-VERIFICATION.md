---
phase: 01-posthog-analytics-baseline
verified: 2026-04-04T22:45:00Z
status: passed
score: 12/12 must-haves verified (gaps resolved 2026-04-05)
gaps:
  - truth: "PostHog is initialized with the configured API key in production"
    status: failed
    reason: "posthog-provider.tsx reads NEXT_PUBLIC_POSTHOG_KEY but .env.local only defines NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN. The if (!key) guard silently skips PostHog init entirely — no sessions, no events in production."
    artifacts:
      - path: "lib/analytics/posthog-provider.tsx"
        issue: "Reads process.env.NEXT_PUBLIC_POSTHOG_KEY which is undefined at runtime (env var mismatch)"
      - path: ".env.local"
        issue: "Defines NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN but not NEXT_PUBLIC_POSTHOG_KEY"
    missing:
      - "Rename env var in posthog-provider.tsx to NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, OR add NEXT_PUBLIC_POSTHOG_KEY alias in .env.local and Vercel dashboard"
  - truth: "Tally popup submission fires a form_submit event reliably"
    status: partial
    reason: "The message event listener is only registered when the Tally script is NOT already present (early return at line 38 skips listener registration). On SPA navigation or component remounts where Tally script is cached, the listener is never added and Tally form submissions are silently untracked."
    artifacts:
      - path: "components/tally-popup-clean.tsx"
        issue: "Early return at line 38 (existingScript branch) exits useEffect before registering the handleTallyMessage listener at line 92. Listener is only registered in the new-script code path."
    missing:
      - "Move window.addEventListener('message', handleTallyMessage) and its cleanup to before the existingScript early return, so the listener is always registered regardless of script load state"
  - truth: "PR1 branch is created and ready for merge to main"
    status: failed
    reason: "No feature/posthog-analytics branch exists in local or remote. Analytics code is committed directly to dev branch. No PR targeting main has been created."
    artifacts: []
    missing:
      - "Create feature/posthog-analytics branch from the analytics commits on dev"
      - "Push to remote and open a PR targeting main"
---

# Phase 1: PostHog Analytics Baseline Verification Report

**Phase Goal:** Install PostHog analytics with EU Cloud + cookieless mode, track 3 event types (CTA clicks, phone clicks, form submissions), enable session recordings. GDPR-compliant baseline before redesign.
**Verified:** 2026-04-04T22:45:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | PostHog SDK installed as dependency | ✓ VERIFIED | `"posthog-js": "^1.364.7"` in package.json line 47 |
| 2 | PostHogProvider wraps the app in layout.tsx | ✓ VERIFIED | `<PostHogProvider>` wraps body content in app/layout.tsx line 126 |
| 3 | EU Cloud configured (eu.i.posthog.com) | ✓ VERIFIED | `api_host: 'https://eu.i.posthog.com'` in posthog-provider.tsx line 6 |
| 4 | Cookieless mode configured (persistence: memory) | ✓ VERIFIED | `persistence: 'memory'` in posthog-provider.tsx |
| 5 | Session recordings are enabled | ✓ VERIFIED | `disable_session_recording` is absent from config (defaults enabled) |
| 6 | PostHog is initialized with the configured API key in production | ✗ FAILED | Provider reads `NEXT_PUBLIC_POSTHOG_KEY` but `.env.local` only defines `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` — init is silently skipped |
| 7 | trackEvent catches errors silently (graceful degradation) | ✓ VERIFIED | try/catch with `console.error` in track-event.ts lines 5-11 |
| 8 | Clicking any CTA button fires cta_click with correct payload | ✓ VERIFIED | trackEvent wired in all 3 CTAButton variants; 4 passing tests |
| 9 | Clicking a tel: phone link fires phone_click | ✓ VERIFIED | `external && href.startsWith('tel:')` check fires phone_click; test passes |
| 10 | Submitting a HubSpot form fires form_submit | ✓ VERIFIED | `trackEvent('form_submit', ...)` in onFormSubmitted callback; test passes |
| 11 | Tally popup submission fires form_submit reliably | ✗ PARTIAL | Listener only registered in new-script code path; early return skips listener when script already loaded |
| 12 | PR1 branch created and ready for merge to main | ✗ FAILED | No feature/posthog-analytics branch exists; analytics code is on dev, not in a PR targeting main |

**Score:** 9/12 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/analytics/types.ts` | Type definitions (AnalyticsEventName, EventPayload) | ✓ VERIFIED | Both types exported, correct shape |
| `lib/analytics/track-event.ts` | Safe trackEvent with try/catch | ✓ VERIFIED | try/catch present, console.error on failure |
| `lib/analytics/posthog-provider.tsx` | Client component, EU Cloud, cookieless, sessions | ✓ VERIFIED | All config correct, 'use client' directive present |
| `app/layout.tsx` | Root layout with PostHogProvider | ✓ VERIFIED | Provider imported and wraps body content |
| `components/ui/cta-button.tsx` | CTA buttons with trackEvent on click | ✓ VERIFIED | All 3 variants wired, phone_click detection present |
| `components/hubspot/hubspot-form.tsx` | HubSpot form with form_submit tracking | ✓ VERIFIED | trackEvent('form_submit') in onFormSubmitted callback |
| `components/tally-popup-clean.tsx` | Tally popup with form_submit tracking | ✗ PARTIAL | Listener exists but not always registered (early return bug) |
| `tests/analytics/track-event.test.ts` | Tests for trackEvent | ✓ VERIFIED | 3 tests, all passing |
| `tests/analytics/posthog-provider.test.tsx` | Tests for PostHogProvider | ✓ VERIFIED | 5 tests, all passing |
| `tests/analytics/event-integration.test.tsx` | Integration tests for all event types | ✓ VERIFIED | 6 tests, all passing |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `app/layout.tsx` | `lib/analytics/posthog-provider.tsx` | `import { PostHogProvider }` | ✓ WIRED | Import on line 8, used on line 126 |
| `lib/analytics/track-event.ts` | `posthog-js` | `posthog.capture` in try/catch | ✓ WIRED | try { posthog.capture(event, payload) } catch {...} |
| `components/ui/cta-button.tsx` | `lib/analytics/track-event.ts` | `import { trackEvent }` | ✓ WIRED | Imported and called in onClick for all 3 variants |
| `components/hubspot/hubspot-form.tsx` | `lib/analytics/track-event.ts` | `trackEvent('form_submit', ...)` | ✓ WIRED | Called in onFormSubmitted, imported at line 25 |
| `components/tally-popup-clean.tsx` | `lib/analytics/track-event.ts` | `trackEvent('form_submit', ...)` | ⚠️ PARTIAL | Wired but only in new-script code path — early return bypasses listener registration |

### Data-Flow Trace (Level 4)

Analytics write events to PostHog (not a data-rendering concern). Level 4 data-flow verification is not applicable — there is no component rendering data fetched from PostHog in this phase.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| All analytics tests pass | `npx jest tests/analytics/ --no-coverage` | 14 passed, 3 suites | ✓ PASS |
| TypeScript compiles | `npx tsc --noEmit` | 1 pre-existing error in unrelated file (tests/services-section-prd.test.tsx — regex flag) | ✓ PASS (pre-existing, out of scope) |
| PostHogProvider import in layout | grep in app/layout.tsx | Found on line 8 | ✓ PASS |
| EU Cloud in provider | grep in posthog-provider.tsx | `eu.i.posthog.com` found | ✓ PASS |
| Env var name matches .env.local | compare provider vs .env.local | MISMATCH: provider uses NEXT_PUBLIC_POSTHOG_KEY, .env.local has NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN | ✗ FAIL |
| feature/posthog-analytics branch | git branch -a | Branch not found | ✗ FAIL |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| ANAL-01 | 01-01 | PostHog JS SDK with PostHogProvider (EU Cloud, persistence: memory) | ⚠️ PARTIAL | SDK installed, provider wired, EU Cloud + cookieless configured — but env var mismatch means init skipped at runtime |
| ANAL-02 | 01-02 | Event cta_click on every CTA | ✓ SATISFIED | trackEvent('cta_click') in all 3 CTAButton variants; verified by 4 tests |
| ANAL-03 | 01-02 | Event phone_click on tel: links | ✓ SATISFIED | phone_click fires when external && href.startsWith('tel:'); verified by test |
| ANAL-04 | 01-02 | Event form_submit on HubSpot and Tally submissions | ⚠️ PARTIAL | HubSpot verified; Tally has early-return bug that skips listener |
| ANAL-05 | 01-01 | Session recordings enabled | ✓ SATISFIED | disable_session_recording absent from config (default = enabled) |
| ANAL-06 | 01-01 | Try/catch on all PostHog calls (graceful degradation) | ✓ SATISFIED | try/catch in trackEvent; try/catch on posthog.init; Tally handler in try/catch |
| DPLY-01 | 01-02 | PR1 (PostHog) merged to main first for baseline collection | ✗ BLOCKED | No feature/posthog-analytics branch exists; no PR created; analytics code only on dev branch |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `components/tally-popup-clean.tsx` | 8, 27, 33, 47, 52-53, 64, 69, 71 | Multiple `console.log` debug statements with emoji in production component | ⚠️ Warning | Pollutes browser console in production; not a blocker but should be removed or gated behind NODE_ENV check |
| `components/ui/cta-button.tsx` | 46, 116, 186 | `hover:shadow-xl` — violates Monolithe 2026 design system (CLAUDE.md: shadow-lg/xl forbidden) | ⚠️ Warning | Design system violation, pre-existing and out of scope for this analytics phase |
| `components/ui/cta-button.tsx` | 60, 130 | `bg-gradient-to-t` — gradient not in strict palette (CLAUDE.md: "gradients generiques INTERDIT") | ⚠️ Warning | Design system violation, pre-existing and out of scope for this analytics phase |

### Human Verification Required

None required for automated checks. However, the env var gap (Gap 1) means the following cannot be verified without a production deploy:

### 1. PostHog Dashboard Shows Live Sessions

**Test:** Deploy to Vercel with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (not `NEXT_PUBLIC_POSTHOG_KEY`) set as the env var name in posthog-provider.tsx, then visit the site
**Expected:** PostHog EU Cloud dashboard shows active sessions within 30 seconds
**Why human:** Requires a production deploy and PostHog dashboard access

### 2. Adblocker Graceful Degradation

**Test:** Enable an adblocker that blocks PostHog, visit the homepage, click CTAs and submit a form
**Expected:** Site works normally, no console errors thrown
**Why human:** Requires browser interaction with adblocker extension

## Gaps Summary

Three gaps block full goal achievement:

**Gap 1 — Critical: Env var name mismatch (ANAL-01, ANAL-06 runtime)**
The PostHog provider reads `process.env.NEXT_PUBLIC_POSTHOG_KEY` but the project only defines `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` in `.env.local`. The guard `if (!key) return` causes PostHog to silently skip initialization. Zero sessions will be captured in production. This is the most critical gap — it voids the entire purpose of Phase 1.

**Gap 2 — Partial: Tally listener early-return bug (ANAL-04)**
The `window.addEventListener('message', handleTallyMessage)` at line 92 of `tally-popup-clean.tsx` is placed after an early return at line 38. When the Tally script is already in the DOM (which happens on every page navigation in a SPA after the first load), the component returns early and the listener is never registered. Tally form submissions will be missed in all cases except the very first component mount on a fresh page load.

**Gap 3 — Process: No PR created (DPLY-01)**
The analytics implementation is committed on the `dev` branch but never branched into `feature/posthog-analytics` and no PR targeting `main` was created. DPLY-01 requires PR1 to be merged to `main` before PR2 (the redesign) to establish a baseline. The branch and PR creation task (Plan 02, Task 3) appears to have been skipped.

---

_Verified: 2026-04-04T22:45:00Z_
_Verifier: Claude (gsd-verifier)_

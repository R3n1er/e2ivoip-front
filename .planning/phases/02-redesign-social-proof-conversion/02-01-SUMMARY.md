---
phase: 02-redesign-social-proof-conversion
plan: 01
subsystem: design-system-audit
tags: [monolithe, design-system, compliance, analytics]
dependency_graph:
  requires: []
  provides: [clean-testimonials, normalized-analytics, clean-css]
  affects: [components/testimonials-section-simple.tsx, components/contact-section-simple.tsx, app/globals.css]
tech_stack:
  added: []
  patterns: [trackEvent-normalization, micro-label-monolithe, hard-shadow-pattern]
key_files:
  created:
    - tests/components/testimonials-section-simple.test.tsx
  modified:
    - components/testimonials-section-simple.tsx
    - components/contact-section-simple.tsx
    - app/globals.css
decisions:
  - Scoped audit to Phase 2 touched files only (not site-wide) per Research Pitfall 2
  - ContactSectionSimple had no direct posthog.capture (delegated to CTAButton) -- added trackEvent onClick handlers at component level for normalized event names
  - Fixed font-bold in ContactSectionSimple h2 as in-scope Monolithe violation (Rule 2)
metrics:
  duration: 158s
  completed: "2026-04-05T17:20:24Z"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 4
---

# Phase 2 Plan 01: Design System Audit Summary

Monolithe Design System violations fixed in 3 files touching Phase 2 scope: shadcn Card/Badge removed from testimonials, font weights normalized to font-black only, analytics standardized via trackEvent, globals.css gradient-hover hard shadow replacing shadow-lg.

## Tasks Completed

### Task 1: Fix Monolithe violations in testimonials-section-simple.tsx (TDD)

**Commits:** `8660768` (RED), `3a1cdd9` (GREEN)

- Removed shadcn `Card`, `CardContent`, `Badge` imports -- replaced with plain HTML `<div>` elements
- Fixed all font weights: `font-semibold` -> `font-black`, `font-bold` -> `font-black`, `font-medium` -> `font-black`
- Fixed h2 typography: added `tracking-[-0.04em] leading-[0.95]` per Monolithe spec
- Removed `hover:shadow-lg` from testimonial cards (static cards per UI-SPEC C-01)
- Replaced `Badge` with micro-label `<span>` using `text-xs font-black uppercase tracking-[0.3em]`
- Removed redundant h3 "Temoignages clients" subheading and wrapping `<div className="mb-16">`
- 7 TDD tests all passing

### Task 2: Normalize ContactSectionSimple analytics + fix globals.css

**Commit:** `bac793b`

- Added `trackEvent('cta_click', ...)` onClick handlers to both CTA buttons in ContactSectionSimple
- Added `import { trackEvent } from '@/lib/analytics/track-event'` and `usePathname` for page context
- Fixed h2 typography: `font-bold` -> `font-black tracking-[-0.04em] leading-[0.95]`
- Fixed globals.css `.gradient-hover:hover`: removed `scale-105 shadow-lg`, replaced with `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` (Monolithe hard shadow)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing functionality] ContactSectionSimple had no direct posthog.capture to replace**
- **Found during:** Task 2
- **Issue:** Plan expected `posthog.capture('contact_section_cta_clicked', ...)` calls in the component, but the current code delegates entirely to CTAButton which has no analytics. Research was based on an older version.
- **Fix:** Added trackEvent onClick handlers at the ContactSectionSimple level, passing through CTAButton's onClick prop
- **Files modified:** components/contact-section-simple.tsx
- **Commit:** bac793b

**2. [Rule 1 - Bug] font-bold in ContactSectionSimple h2**
- **Found during:** Task 2
- **Issue:** h2 used `font-bold` which violates Monolithe (only font-normal/font-black allowed)
- **Fix:** Changed to `font-black tracking-[-0.04em] leading-[0.95]`
- **Files modified:** components/contact-section-simple.tsx
- **Commit:** bac793b

**3. [Rule 1 - Bug] gradient-hover used scale-105 in addition to shadow-lg**
- **Found during:** Task 2
- **Issue:** Plan only mentioned shadow-xl but actual CSS had `scale-105 shadow-lg` -- both are Monolithe violations
- **Fix:** Removed both, replaced with hard shadow pattern
- **Files modified:** app/globals.css
- **Commit:** bac793b

## Verification Results

| Check | Result |
|-------|--------|
| No hover:shadow-lg in testimonials | PASS |
| No shadcn Card/Badge imports | PASS |
| No font-semibold/bold/medium in testimonials | PASS |
| No posthog.capture in contact-section-simple | PASS |
| trackEvent count >= 2 in contact-section-simple | PASS (3 matches) |
| No shadow-xl in gradient-hover | PASS |
| All TDD tests passing (7/7) | PASS |

## Self-Check: PASSED

All 4 files verified on disk. All 3 commits verified in git log.

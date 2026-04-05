---
phase: 02-redesign-social-proof-conversion
plan: 02
subsystem: cta-refactor-phone-links
tags: [monolithe, cta, phone-links, analytics, conversion]
dependency_graph:
  requires: [clean-testimonials, normalized-analytics]
  provides: [link-only-cta, phone-link-component, territory-phones]
  affects: [components/ui/cta-button.tsx, components/ui/phone-link.tsx, components/layout/footer.tsx, lib/constants/phone-numbers.ts]
tech_stack:
  added: []
  patterns: [link-only-cta-pattern, phone-link-with-tracking, centralized-phone-data]
key_files:
  created:
    - components/ui/phone-link.tsx
    - lib/constants/phone-numbers.ts
    - tests/components/ui/phone-link.test.tsx
    - tests/components/footer.test.tsx
    - tests/lib/phone-numbers.test.ts
  modified:
    - components/ui/cta-button.tsx
    - components/layout/footer.tsx
    - tests/components/ui/cta-button.test.tsx
decisions:
  - CTAButton uses shared useCTAClick hook to reduce duplication across 3 variants
  - Footer filters out France territory from phone display (DOM-focused), France available via TERRITORY_PHONES for other pages
  - PhoneLink uses min-h-[44px] for WCAG touch target compliance
metrics:
  duration: 1538s
  completed: "2026-04-05T17:49:40Z"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 7
---

# Phase 2 Plan 02: CTA Refactor + Phone Links Summary

CTAButton fully rewritten to Link-only pattern with .monolith-btn hard shadow, PhoneLink component with PostHog phone_click tracking, footer wired with 4 territory phone numbers via centralized TERRITORY_PHONES constant.

## Tasks Completed

### Task 1: Refactor CTAButton to Link-only pattern + create phone constants (TDD)

**Commits:** `201e12c` (RED), `40c134a` (GREEN)

- Complete rewrite of components/ui/cta-button.tsx: removed nested `<button>`, gradient overlays, arrow icons, shadow-md/xl violations
- 3 exported variants (CTAButton, CTAButtonMarine, CTAButtonSecondary) all use Link-only pattern with `monolith-btn` class
- Typography normalized: `font-black uppercase tracking-[0.2em]` (was `font-semibold text-lg`)
- PostHog tracking via trackEvent: `phone_click` for tel: links, `cta_click` for all others
- Shared `useCTAClick` hook extracts click handling logic for all 3 variants
- Created lib/constants/phone-numbers.ts with 5 territory entries (Guyane, Guadeloupe, Martinique, La Reunion, France)
- Removed `fullWidth` prop (not used in Monolithe pattern)
- 12 TDD tests all passing (10 CTA + 2 phone numbers)

### Task 2: Create PhoneLink component + wire clickable phone numbers in footer (TDD)

**Commits:** `8307d19` (RED), `38dde48` (GREEN)

- Created components/ui/phone-link.tsx: reusable client component with tel: href, PostHog phone_click tracking
- 44px min-height touch target for mobile accessibility
- Optional showTerritory prop for territory label display
- Footer refactored: 4 territory phone numbers rendered via PhoneLink (was plain `<span>` text)
- Footer font weights: all `font-semibold` and `font-bold` replaced with `font-black` (Monolithe compliant)
- Footer `font-medium` on territory labels replaced with `font-black`
- Bottom partners section: `font-bold` replaced with `font-black`
- 7 TDD tests all passing (5 PhoneLink + 2 footer)

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

| Check | Result |
|-------|--------|
| No `<button` in cta-button.tsx | PASS (0 matches) |
| monolith-btn count >= 3 in cta-button.tsx | PASS (6 matches) |
| No shadow-md/xl/gradient/arrow-right in cta-button.tsx | PASS (0 matches) |
| No font-semibold/bold/medium in cta-button.tsx + footer.tsx | PASS (0 matches) |
| font-black count >= 3 in cta-button.tsx | PASS (3 matches) |
| trackEvent in phone-link.tsx | PASS (2 matches) |
| min-h-[44px] in phone-link.tsx | PASS (1 match) |
| PhoneLink in footer.tsx | PASS (2 matches) |
| TERRITORY_PHONES in footer.tsx | PASS (2 matches) |
| All 19 TDD tests passing | PASS |

## Self-Check: PASSED

All 8 files verified on disk. All 4 commits verified in git log.

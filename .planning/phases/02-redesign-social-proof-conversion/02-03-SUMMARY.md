---
phase: 02-redesign-social-proof-conversion
plan: 03
subsystem: social-proof-page-wiring
tags: [social-proof, testimonials, 3cx-badge, dead-ends, phone-links, cta]
dependency_graph:
  requires: [clean-testimonials, normalized-analytics, link-only-cta, phone-link-component, territory-phones]
  provides: [social-proof-on-pages, zero-dead-ends, per-page-cta, product-page-phones]
  affects: [app/page.tsx, app/telephonie-3cx/page.tsx, app/3cx-cloud/page.tsx, app/nos-services/page.tsx, app/assistance/page.tsx, app/mobilite/page.tsx, app/telephonie-entreprise/page.tsx, app/studio-attente/page.tsx, components/testimonials-section-simple.tsx]
tech_stack:
  added: []
  patterns: [props-based-testimonials, 3cx-badge-strip, territory-phone-strip, no-dead-end-pages]
key_files:
  created: []
  modified:
    - components/testimonials-section-simple.tsx
    - app/page.tsx
    - app/telephonie-3cx/page.tsx
    - app/3cx-cloud/page.tsx
    - app/nos-services/page.tsx
    - app/assistance/page.tsx
    - app/mobilite/page.tsx
    - app/telephonie-entreprise/page.tsx
    - app/studio-attente/page.tsx
    - components/services-section-simple.tsx
    - components/layout/header-simple.tsx
decisions:
  - Mobilite page rebuilt from notFound() to full product page with hero, features grid, CTA, phone links, and ContactSectionSimple
  - 3cx-cloud hero CTAs replaced with single Monolithe-compliant CTAButton (removed shadow-2xl, hover:scale-105 violations)
  - Studio-attente hero shadcn Buttons replaced with CTAButton Link-only pattern
  - Homepage has no StatsSection so testimonials placed between Services and Contact (plan referenced Stats but component does not exist)
metrics:
  duration: 491s
  completed: "2026-04-05T18:35:27Z"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 11
---

# Phase 2 Plan 03: Social Proof + Page Wiring Summary

Props-based TestimonialsSectionSimple with 3CX Silver Partner badge strip deployed on homepage and 3 key product pages, ContactSectionSimple on all 7 product pages eliminating dead-ends, clickable territory phone links on all 7 product pages via PhoneLink with PostHog tracking.

## Tasks Completed

### Task 1: Add 3CX badge strip + props interface to TestimonialsSectionSimple (TDD)

**Commits:** `c1d0b33` (RED), `2171ecf` (GREEN)

- Added Testimonial interface and TestimonialsSectionProps for type-safe props
- Extracted hardcoded data to DEFAULT_TESTIMONIALS constant
- Component now accepts optional testimonials prop with default fallback
- Empty state: returns null when testimonials=[] (PROOF-04, T-02-09 mitigation)
- Added 3CX Silver Partner badge strip with Image from next/image above testimonial grid
- Badge text "PARTENAIRE 3CX CERTIFIE" with micro-label typography
- Removed 'use client' directive (no longer needed - pure render component)
- 16 TDD tests all passing (8 existing + 8 new)

### Task 2: Wire social proof + ContactSectionSimple + CTA + phone links on all pages

**Commit:** `7ec775a`

- **Homepage (app/page.tsx):** TestimonialsSectionSimple inserted between ServicesSectionSimple and ContactSectionSimple
- **telephonie-3cx:** Added hero CTA "PASSER A 3CX" -> /devis-en-ligne?service=3cx, TestimonialsSectionSimple, phone strip, ContactSectionSimple
- **3cx-cloud:** Replaced Monolithe-violating hero CTAs (shadow-2xl, scale-105) with CTAButton "MIGRER VERS LE CLOUD", added TestimonialsSectionSimple, phone strip, ContactSectionSimple
- **nos-services:** Updated hero CTA to "DECOUVRIR NOS OFFRES", added TestimonialsSectionSimple, phone strip, ContactSectionSimple
- **assistance:** Added hero CTA "DEMANDER UN SUPPORT" -> /contact?objet=support, phone strip, ContactSectionSimple
- **mobilite:** Rebuilt from notFound() to full product page with Monolithe hero, 4-feature grid, CTA "PASSER AU MOBILE", phone strip, ContactSectionSimple
- **telephonie-entreprise:** Updated hero CTA to "MODERNISER MA TELEPHONIE" -> /devis-en-ligne?service=telephonie, phone strip, ContactSectionSimple
- **studio-attente:** Replaced shadcn Button CTAs with CTAButton "CREER MON STUDIO" -> /devis-en-ligne?service=studio, phone strip, ContactSectionSimple

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed fullWidth prop removed in Plan 02**
- **Found during:** Task 2
- **Issue:** CTAButton.fullWidth prop was removed in Plan 02 refactor but still referenced in services-section-simple.tsx, nos-services/page.tsx, and header-simple.tsx causing TypeScript errors
- **Fix:** Replaced fullWidth prop with className="w-full" in all 3 files
- **Files modified:** components/services-section-simple.tsx, app/nos-services/page.tsx, components/layout/header-simple.tsx
- **Commit:** 7ec775a

**2. [Rule 2 - Missing functionality] Mobilite page was notFound()**
- **Found during:** Task 2
- **Issue:** /mobilite returned notFound() - no content, no CTA, no contact path. Plan required CTA + ContactSectionSimple + PhoneLink on this page.
- **Fix:** Built full product page with Monolithe-compliant hero (bg-[#091421], monolith-grid-lines), 4-feature grid, CTAButton, phone links, ContactSectionSimple
- **Files modified:** app/mobilite/page.tsx
- **Commit:** 7ec775a

**3. [Rule 1 - Bug] 3cx-cloud hero CTAs had Monolithe violations**
- **Found during:** Task 2
- **Issue:** Hero CTAs used inline `<a>` tags with shadow-2xl, hover:scale-105, shadow-xl -- all forbidden by Monolithe Design System
- **Fix:** Replaced with CTAButton component which uses .monolith-btn pattern
- **Files modified:** app/3cx-cloud/page.tsx
- **Commit:** 7ec775a

## Verification Results

| Check | Result |
|-------|--------|
| TestimonialsSectionSimple on homepage (count >= 2) | PASS (2) |
| ContactSectionSimple on all 7 product pages | PASS |
| TestimonialsSectionSimple on telephonie-3cx, 3cx-cloud, nos-services | PASS |
| PhoneLink on all 7 product pages (D-09) | PASS |
| /mobilite has devis-en-ligne or /contact links | PASS (2) |
| Homepage section order: Services > Testimonials > Contact | PASS |
| npx tsc --noEmit | PASS (0 errors) |
| npm run build | PASS |
| 16 TDD tests passing | PASS |

## Known Stubs

None - all components are wired with real data sources or intentional placeholder testimonials (DEFAULT_TESTIMONIALS documented as placeholder per D-03 until real client testimonials are provided).

## Self-Check: PASSED

All 11 files verified on disk. All 3 commits verified in git log.

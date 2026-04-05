# Phase 2: Redesign + Social Proof + Conversion - Research

**Researched:** 2026-04-05
**Domain:** Next.js 15 component refactoring, Design System compliance, conversion optimization
**Confidence:** HIGH

## Summary

Phase 2 is a frontend-only phase targeting an existing Next.js 15 App Router codebase. The work breaks into four distinct areas: (1) Design System audit and fix of Monolithe violations, (2) social proof section refactoring with 3CX badge strip, (3) CTA refactoring to Link-only pattern with per-page customization, and (4) phone number clickability across all pages. All patterns, components, and analytics utilities already exist in the codebase -- this phase is assembly and compliance, not greenfield.

The primary risk is the scope of the Design System audit: `font-bold`/`font-semibold` violations are widespread (40+ occurrences across components and pages). The CONTEXT.md decision D-11 mandates fixing these BEFORE building new components. The planner must scope the audit carefully -- fixing ALL violations site-wide would be a separate phase. The audit should focus on files directly touched by Phase 2 requirements.

**Primary recommendation:** Structure work as: Wave 1 (audit + fix violations in touched files) -> Wave 2 (refactor CTAButton + add phone links) -> Wave 3 (social proof section + 3CX badge) -> Wave 4 (deploy ContactSectionSimple on all product pages + integration testing).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Section social proof placee apres Services, avant Stats sur la homepage (ordre : Hero > Transformation > ClientsCarousel > Partners > Services > **Social Proof** > Stats > Contact)
- **D-02:** Badge 3CX Certified affiche dans un strip separe au-dessus des temoignages (bande horizontale dediee, visuellement distincte des cartes temoignages)
- **D-03:** L'utilisateur fournira de vrais temoignages clients pendant l'implementation -- le composant doit etre pret a les recevoir (structure de donnees flexible, pas de contenu hardcode)
- **D-04:** Social proof affichee sur la homepage ET les pages produit cles (/telephonie-3cx, /3cx-cloud, /nos-services) -- pas uniquement la homepage
- **D-05:** CTA primaire above-the-fold avec wording ET destination personnalises par page
- **D-06:** ContactSectionSimple reutilise en bas de chaque page produit pour eliminer les pages cul-de-sac
- **D-07:** CTAButton refactore en Link-only -- supprimer le `<button>` imbrique, appliquer `.monolith-btn` directement sur `<Link>` avec tracking PostHog via onClick
- **D-08:** Numeros de telephone par territoire (Guadeloupe, Martinique, Guyane, Reunion) -- pas un seul numero unique
- **D-09:** Numeros affiches dans : footer, pages contact/devis, et chaque page produit
- **D-10:** Chaque lien tel: declenche un event PostHog `phone_click`
- **D-11:** Audit complet des violations Design System Monolithe + fix dedie AVANT de commencer la social proof et les CTAs
- **D-12:** Hover des CTAs refactores en "hard shadow shift" (translate + shadow offset change)

### Claude's Discretion
- Structure de donnees exacte pour les temoignages (tant que flexible pour recevoir de vrais contenus)
- Choix du wording CTA exact par page (sera review au PR)
- Implementation technique du strip badge 3CX (micro-label Monolithe)
- Format d'affichage des numeros de telephone par territoire

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PROOF-01 | Social proof strip visible sur la homepage entre Hero et Services sections | Note: CONTEXT.md D-01 overrides this -- placement is after Services, before Stats. The `app/page.tsx` currently has: Hero > Transformation > ClientsCarousel > Partners > Services > Stats > Contact. Social proof section inserts between Services and Stats. |
| PROOF-02 | Au minimum 3 temoignages clients avec nom, role, entreprise et resultat concret | Existing `TestimonialsSectionSimple` already has 3 hardcoded testimonials. D-03 says user will provide real ones -- component must accept data as props. UI-SPEC C-01 defines the `Testimonial` interface. |
| PROOF-03 | Badges partenaire (3CX Certified) visibles dans la section social proof | 3CX Silver Partner badge asset exists at `public/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp`. UI-SPEC C-02 defines the badge strip layout. |
| PROOF-04 | Composant ne rend rien si les donnees sont vides (empty state handling) | Return `null` when testimonials array is empty. Standard React pattern, no library needed. |
| CONV-01 | Chaque page produit a exactement 1 CTA primaire above-the-fold avec classe .monolith-btn | Requires refactored CTAButton (UI-SPEC C-03). Per-page CTA strategy defined in UI-SPEC CTA Strategy table. |
| CONV-02 | Tous les CTA declenchent un event PostHog cta_click | `trackEvent('cta_click', ...)` utility exists in `lib/analytics/track-event.ts`. CTAButton already uses it. |
| CONV-03 | Tous les numeros de telephone sont des liens tel: cliquables avec event phone_click | Footer currently shows phone numbers as plain `<span>` (NOT clickable). Contact page has `tel:` links. Product pages have no phone numbers. |
| CONV-04 | Aucune page produit sans lien vers /contact ou /devis-en-ligne (zero dead-ends) | `/mobilite` is a dead-end (zero /contact or /devis-en-ligne links). Other pages have some links but no consistent bottom CTA section. `ContactSectionSimple` deployment solves this. |
| DSGN-01 | Fix hover:shadow-lg dans testimonials-section-simple.tsx | Line 63: `hover:shadow-lg transition-shadow` on Card. Also uses shadcn Card/Badge imports which should be replaced per UI-SPEC. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15 (App Router) | Framework | Already in project [VERIFIED: package.json] |
| DaisyUI | (in project) | Component library | CLAUDE.md: DaisyUI priority [VERIFIED: codebase] |
| Tailwind CSS | (in project) | Utility CSS | Already in project [VERIFIED: codebase] |
| posthog-js | (in project) | Analytics | Already integrated from Phase 1 [VERIFIED: codebase] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/link | built-in | Internal navigation | All CTA links to internal pages [VERIFIED: codebase] |
| next/image | built-in | Optimized images | 3CX badge image [VERIFIED: codebase] |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plain HTML testimonial cards | shadcn Card | UI-SPEC explicitly removes shadcn Card/Badge from testimonials -- use plain `<div>` + Monolithe classes |

**No new packages required.** This phase uses only what already exists in the project.

## Architecture Patterns

### Component Structure (Phase 2 specific)

```
components/
  testimonials-section-simple.tsx  # REFACTOR: props-based, remove shadcn, fix violations
  ui/cta-button.tsx                # REFACTOR: Link-only pattern, remove <button>
  contact-section-simple.tsx       # REUSE: deploy on all product pages (no changes)
  layout/footer.tsx                # MODIFY: add clickable tel: links
lib/
  constants/phone-numbers.ts       # NEW: centralized territory phone data
  analytics/track-event.ts         # EXISTING: no changes needed
app/
  page.tsx                          # MODIFY: add TestimonialsSectionSimple
  telephonie-3cx/page.tsx           # MODIFY: add CTA + ContactSection + social proof
  3cx-cloud/page.tsx                # MODIFY: add CTA + ContactSection + social proof
  nos-services/page.tsx             # MODIFY: add CTA + ContactSection + social proof
  assistance/page.tsx               # MODIFY: add CTA + ContactSection
  mobilite/page.tsx                 # MODIFY: add CTA + ContactSection (currently dead-end)
  telephonie-entreprise/page.tsx    # MODIFY: add CTA + ContactSection
  studio-attente/page.tsx           # MODIFY: add CTA + ContactSection
```

### Pattern 1: Centralized Phone Numbers

**What:** Single source of truth for territory phone numbers used across footer, product pages, and contact page.
**When to use:** Anywhere phone numbers are displayed.

```typescript
// lib/constants/phone-numbers.ts
export interface TerritoryPhone {
  territory: string
  number: string   // Display: "05 94 96 35 00"
  tel: string      // href: "+594594963500"
}

export const TERRITORY_PHONES: TerritoryPhone[] = [
  { territory: 'Guyane', number: '05 94 96 35 00', tel: '+594594963500' },
  { territory: 'Guadeloupe', number: '05 90 17 35 00', tel: '+590590173500' },
  { territory: 'Martinique', number: '05 96 31 35 00', tel: '+596596313500' },
  { territory: 'La Reunion', number: '02 63 08 55 00', tel: '+262263085500' },
  { territory: 'France', number: '01 89 56 05 00', tel: '+33189560500' },
]
```
[VERIFIED: phone numbers extracted from `app/contact/page.tsx` lines 63-67]

### Pattern 2: Props-based Testimonials with Empty State

**What:** TestimonialsSectionSimple accepts testimonials as props (default to existing data), returns null if empty.
**When to use:** Homepage and product pages.

```typescript
// Source: UI-SPEC C-01
interface Testimonial {
  content: string
  author: string
  role: string
  company: string
  location: 'Guadeloupe' | 'Martinique' | 'Guyane' | 'Reunion'
  users?: string
  rating: 1 | 2 | 3 | 4 | 5
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

export function TestimonialsSectionSimple({ testimonials = DEFAULT_TESTIMONIALS }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null
  // render...
}
```

### Pattern 3: CTAButton Link-Only Refactor

**What:** Remove nested `<button>` from `<Link>`, apply `.monolith-btn` directly on `<Link>`.
**When to use:** All CTAs site-wide.

```typescript
// Source: UI-SPEC C-03, matches existing pattern in homepage-hero-section-simple.tsx
<Link
  href={href}
  className="monolith-btn"
  onClick={() => trackEvent('cta_click', { page: pathname, element_id: href, element_text: label })}
>
  <span className="block bg-red-primary text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em]">
    {children}
  </span>
</Link>
```
[VERIFIED: pattern matches `components/homepage-hero-section-simple.tsx` lines 48-54 and `components/contact-section-simple.tsx` lines 23-31]

### Pattern 4: Phone Link with PostHog Tracking

**What:** Clickable `<a href="tel:">` with PostHog phone_click event.
**When to use:** All phone number displays.

```typescript
<a
  href={`tel:${phone.tel}`}
  onClick={() => trackEvent('phone_click', {
    page: pathname || '/',
    element_id: `tel:${phone.tel}`,
    element_text: phone.territory,
  })}
  className="hover:text-red-primary transition-colors"
>
  {phone.number}
</a>
```
[VERIFIED: trackEvent signature matches `lib/analytics/track-event.ts`]

### Anti-Patterns to Avoid
- **Nested `<button>` in `<Link>`:** FORBIDDEN by CLAUDE.md and Next.js. Current CTAButton does this -- must be fixed. [VERIFIED: `components/ui/cta-button.tsx` line 29]
- **`shadow-lg`/`shadow-xl` on hover:** FORBIDDEN by Monolithe Design System. Use `.monolith-btn` CSS hard shadow instead. [VERIFIED: CLAUDE.md rules]
- **`font-semibold`/`font-bold`:** Only `font-normal` (400) and `font-black` (900) are allowed in Monolithe. [VERIFIED: UI-SPEC Typography section]
- **Hardcoded testimonials without props:** D-03 requires the component to accept data from outside for when real testimonials arrive.
- **Direct `posthog.capture()` calls:** Use `trackEvent()` wrapper for consistency and error handling. [VERIFIED: `lib/analytics/track-event.ts` wraps with try/catch]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CTA hover animation | Custom CSS animations | `.monolith-btn` class from `globals.css` | Already implements hard shadow shift with proper translate/shadow offsets |
| Analytics tracking | Direct posthog.capture | `trackEvent()` from `lib/analytics/track-event.ts` | Handles window check, try/catch, typed events |
| Bottom-of-page CTA section | New contact section per page | `ContactSectionSimple` component | Already Monolithe-compliant, already on homepage |
| Phone number data | Inline numbers per component | Centralized `TERRITORY_PHONES` constant | DRY -- same numbers in footer, product pages, contact page |

## Common Pitfalls

### Pitfall 1: ContactSectionSimple uses direct posthog.capture instead of trackEvent
**What goes wrong:** The existing `ContactSectionSimple` calls `posthog.capture()` directly (line 26, 35) with a non-standard event name `contact_section_cta_clicked` instead of using `trackEvent('cta_click', ...)`.
**Why it happens:** Component was written before the Phase 1 `trackEvent` utility was created.
**How to avoid:** When deploying ContactSectionSimple on product pages, also normalize its event calls to use `trackEvent` with standard event names.
**Warning signs:** PostHog dashboard showing `contact_section_cta_clicked` instead of `cta_click`.

### Pitfall 2: Design System audit scope creep
**What goes wrong:** D-11 says "audit complet" but there are 40+ font-bold/font-semibold violations across the codebase, many in pages not touched by Phase 2.
**Why it happens:** Monolithe rules were established after many components were written.
**How to avoid:** Scope the audit to files directly modified in Phase 2 (testimonials, cta-button, footer, product pages, globals.css). Document remaining violations for a future cleanup phase.
**Warning signs:** Plan becoming 50+ tasks for typography fixes alone.

### Pitfall 3: PROOF-01 placement conflict with CONTEXT.md D-01
**What goes wrong:** REQUIREMENTS.md says "entre Hero et Services" but CONTEXT.md D-01 says "apres Services, avant Stats."
**Why it happens:** User refined the placement during the discuss phase.
**How to avoid:** CONTEXT.md D-01 takes precedence. Place social proof between ServicesSectionSimple and StatsSection.
**Warning signs:** Social proof appearing in wrong position on homepage.

### Pitfall 4: CTAButton refactor breaking all pages that import it
**What goes wrong:** The CTAButton is imported in multiple places. Changing its API (removing button, changing class structure) breaks all consumers.
**Why it happens:** Shared component with wide usage.
**How to avoid:** Refactor CTAButton in-place, keeping the same external interface (props). Internal implementation changes to Link-only. All existing consumers continue to work because the props interface stays the same.
**Warning signs:** TypeScript errors after refactor.

### Pitfall 5: Phone numbers in footer need 'use client' for trackEvent
**What goes wrong:** Footer is currently a Server Component (no 'use client' directive). Adding PostHog onClick handlers requires client-side JavaScript.
**Why it happens:** Server Components cannot have event handlers.
**How to avoid:** Extract a `PhoneLink` client component that wraps phone `<a>` tags with tracking. Keep the footer itself as server component if possible, or add 'use client' to footer.
**Warning signs:** Build errors about onClick in Server Components.

### Pitfall 6: Product pages missing above-the-fold CTA assessment
**What goes wrong:** Some product pages already have a CTA in their hero (e.g., `/telephonie-3cx` has "Demander un devis" link at line 144), but it may not use `.monolith-btn` or fire `cta_click` event.
**Why it happens:** Pages were built at different times with different patterns.
**How to avoid:** Audit each product page's hero section individually. Some need a new CTA, others need the existing one normalized to use `.monolith-btn` + `trackEvent`.
**Warning signs:** Duplicate CTAs in hero sections.

## Code Examples

### Refactored CTAButton (Link-only pattern)
```typescript
// Source: UI-SPEC C-03, verified against homepage-hero-section-simple.tsx pattern
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics/track-event'

interface CTAButtonProps {
  href: string
  children: ReactNode
  icon?: string
  className?: string
  onClick?: () => void
  external?: boolean
  variant?: 'primary' | 'secondary' | 'marine'
}

export function CTAButton({
  href,
  children,
  icon,
  className = '',
  onClick,
  external = false,
  variant = 'primary',
}: CTAButtonProps) {
  const pathname = usePathname()
  
  const handleClick = () => {
    const eventName = external && href.startsWith('tel:') ? 'phone_click' : 'cta_click' as const
    const childText = typeof children === 'string' ? children : ''
    trackEvent(eventName, {
      page: pathname || '/',
      element_id: href,
      element_text: childText,
    })
    onClick?.()
  }

  const variantClasses = {
    primary: 'bg-red-primary text-white',
    secondary: 'bg-white text-[#091421]',
    marine: 'bg-blue-marine text-white',
  }

  const inner = (
    <span className={`block ${variantClasses[variant]} px-10 py-4 text-sm font-black uppercase tracking-[0.2em]`}>
      {icon && <i className={`lni ${icon} mr-3`} />}
      {children}
    </span>
  )

  if (external) {
    const isTelOrMailto = href.startsWith('tel:') || href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={`monolith-btn ${className}`}
        onClick={handleClick}
        {...(isTelOrMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={`monolith-btn ${className}`} onClick={handleClick}>
      {inner}
    </Link>
  )
}
```

### Clickable Phone Link Component
```typescript
// New: components/ui/phone-link.tsx
'use client'

import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics/track-event'
import type { TerritoryPhone } from '@/lib/constants/phone-numbers'

interface PhoneLinkProps {
  phone: TerritoryPhone
  className?: string
  showTerritory?: boolean
}

export function PhoneLink({ phone, className = '', showTerritory = false }: PhoneLinkProps) {
  const pathname = usePathname()
  
  return (
    <a
      href={`tel:${phone.tel}`}
      className={`min-h-[44px] inline-flex items-center ${className}`}
      onClick={() => trackEvent('phone_click', {
        page: pathname || '/',
        element_id: `tel:${phone.tel}`,
        element_text: phone.territory,
      })}
    >
      {showTerritory && (
        <span className="text-xs font-black uppercase tracking-[0.3em] mr-2">
          {phone.territory}
        </span>
      )}
      {phone.number}
    </a>
  )
}
```

## Codebase Audit Results

### Design System Violations in Phase 2 Scope

| File | Violation | Count | Severity |
|------|-----------|-------|----------|
| `components/testimonials-section-simple.tsx` | `hover:shadow-lg` | 1 | HIGH (DSGN-01) |
| `components/testimonials-section-simple.tsx` | shadcn Card/Badge imports | 2 | MEDIUM |
| `components/testimonials-section-simple.tsx` | `font-semibold` (should be `font-black`) | 1 | MEDIUM |
| `components/ui/cta-button.tsx` | `<button>` nested in `<Link>` | 3 variants | HIGH |
| `components/ui/cta-button.tsx` | `shadow-md hover:shadow-xl` | 3 variants | HIGH |
| `components/ui/cta-button.tsx` | gradient overlay div | 2 variants | HIGH |
| `components/ui/cta-button.tsx` | `font-semibold text-lg` (should be `font-black text-xs uppercase`) | 3 variants | HIGH |
| `components/ui/cta-button.tsx` | `hover:-translate-y-0.5` (not Monolithe) | 3 variants | MEDIUM |
| `components/layout/footer.tsx` | `font-semibold` on phone numbers | 4 | LOW (in scope) |
| `app/globals.css` | `.gradient-hover` uses `shadow-xl` | 1 | LOW (not in direct scope) |

### Dead-End Analysis (CONV-04)

| Page | Has /contact link | Has /devis link | Has ContactSectionSimple | Status |
|------|-------------------|-----------------|--------------------------|--------|
| `/telephonie-3cx` | YES (CTA section) | YES (hero + CTA) | NO | Needs ContactSectionSimple |
| `/3cx-cloud` | NO | YES (hero) | NO | Dead-end for contact, needs ContactSectionSimple |
| `/nos-services` | YES | YES | NO | Needs ContactSectionSimple |
| `/assistance` | YES | NO | NO | Needs ContactSectionSimple |
| `/mobilite` | NO | NO | NO | DEAD-END -- needs CTA + ContactSectionSimple |
| `/telephonie-entreprise` | YES | YES | NO | Needs ContactSectionSimple |
| `/studio-attente` | YES | YES | NO | Needs ContactSectionSimple |

### Phone Link Status (CONV-03)

| Location | Has tel: links | Status |
|----------|---------------|--------|
| Footer | NO -- plain text `<span>` | Must add `<a href="tel:">` |
| Contact page | YES | Already clickable |
| Devis page | YES (partial) | Already has some |
| Product pages | NO (except trunk-sip sub-pages) | Must add |

### Existing Assets Available

| Asset | Path | Usage |
|-------|------|-------|
| 3CX Silver Partner badge | `public/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp` | C-02 badge strip |
| 3CX logo | `public/images/logos-sip-compatibility/logo-3cx.webp` | Already used in telephonie-3cx hero |
| `.monolith-btn` CSS | `app/globals.css` lines 123-152 | CTA hover behavior |
| `trackEvent` utility | `lib/analytics/track-event.ts` | All analytics events |
| `ContactSectionSimple` | `components/contact-section-simple.tsx` | Bottom-of-page CTA |

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| shadcn Card/Badge in testimonials | Plain `<div>` + Monolithe classes | UI-SPEC decision (this phase) | Remove shadcn dependency from testimonials |
| `<button>` nested in `<Link>` | `.monolith-btn` on `<Link>` directly | CLAUDE.md rule + UI-SPEC C-03 | Eliminates hydration warnings, HTML validity |
| Direct `posthog.capture()` | `trackEvent()` wrapper | Phase 1 | Consistent error handling, typed events |
| `font-semibold`/`font-bold` | `font-black` (900) or `font-normal` (400) only | Monolithe 2026 Design System | Only 2 weights allowed |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phone numbers extracted from contact page are current and correct | Pattern 1 | Wrong numbers displayed on footer and product pages -- verify with user |
| A2 | La Reunion territory phone is missing from footer but exists on contact page | Codebase Audit | Incomplete phone coverage in footer |
| A3 | `ContactSectionSimple` event naming should be normalized to `cta_click` | Pitfall 1 | PostHog dashboard inconsistency is minor, not blocking |

## Open Questions (RESOLVED)

1. **Real testimonials timing** (RESOLVED)
   - What we know: D-03 says user will provide real testimonials during implementation
   - What's unclear: When exactly? Should component ship with existing placeholder data or empty?
   - Recommendation: Ship with existing 3 placeholder testimonials (already in component), swap when user provides real ones. Flag in PR.
   - Resolution: Plan 02-03 Task 1 uses placeholder data per D-03. Component accepts props for real data when available.

2. **Scope of font-weight audit** (RESOLVED)
   - What we know: D-11 says "audit complet" before building social proof
   - What's unclear: Does "complet" mean entire site or just Phase 2 touched files?
   - Recommendation: Fix violations in files directly modified by Phase 2. Log remaining violations for future cleanup.
   - Resolution: Plan 02-01 scopes audit to Phase 2 touched files only. Remaining violations logged for future cleanup.

3. **ContactSectionSimple event normalization** (RESOLVED)
   - What we know: It uses `posthog.capture('contact_section_cta_clicked', ...)` instead of `trackEvent('cta_click', ...)`
   - What's unclear: Is this a Phase 2 fix or separate concern?
   - Recommendation: Fix it since we're touching the component's consumers (deploying it on product pages). Small scope addition.
   - Resolution: Plan 02-01 Task 2 normalizes ContactSectionSimple to use trackEvent.

## Project Constraints (from CLAUDE.md)

- **TDD obligatoire:** RED > GREEN > REFACTOR for all changes
- **TypeScript strict, single quotes, no semicolons**
- **Server Components par defaut**, `'use client'` only if needed
- **DaisyUI priority** > Tailwind > shadcn/ui
- **Lineicons priority** > React Icons
- **`.monolith-btn` class** for all CTA buttons
- **FORBIDDEN patterns:** `rounded-lg/xl/2xl`, `shadow-lg/xl/2xl`, `hover:scale-105`, gradients hors charte, `<button>` inside `<Link>`
- **Palette STRICTE:** #E53E3E, #2D3848, #1F2937, #818096, #091421, #FFFFFF only
- **Typography:** Only `font-normal` (400) and `font-black` (900) weights
- **Pre-commit agents:** `test-matcher` + `stitch-compliance` + `pre-commit-validator` + `security-guardian`
- **Framer Motion** via lazy-motion only if animations needed (not expected in this phase)
- **PostHog:** EU Cloud, persistence: 'memory' (cookieless), GDPR compliant
- **Validation pre-push:** `npm run validate` (lint + type-check + tests + audit + build)

## Sources

### Primary (HIGH confidence)
- Codebase files read directly: `components/testimonials-section-simple.tsx`, `components/ui/cta-button.tsx`, `components/contact-section-simple.tsx`, `components/layout/footer.tsx`, `components/homepage-hero-section-simple.tsx`, `app/page.tsx`, `app/telephonie-3cx/page.tsx`, `app/globals.css`, `lib/analytics/track-event.ts`, `lib/analytics/types.ts`
- `02-UI-SPEC.md` -- approved design contract for this phase
- `02-CONTEXT.md` -- user decisions from discuss phase
- `CLAUDE.md` -- project guidelines and forbidden patterns
- Grep audit of `hover:shadow-lg`, `font-semibold`, `font-bold`, `tel:` links across entire codebase

### Secondary (MEDIUM confidence)
- Dead-end analysis via grep for `/contact` and `/devis-en-ligne` links per product page

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new packages, all verified in codebase
- Architecture: HIGH -- patterns extracted from existing working code (hero, contact section)
- Pitfalls: HIGH -- all identified from direct codebase audit
- Design System violations: HIGH -- grep-verified, line numbers confirmed

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (stable codebase, no fast-moving dependencies)

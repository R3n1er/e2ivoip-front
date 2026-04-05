# Phase 2: Redesign + Social Proof + Conversion - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Les visiteurs voient un site professionnel avec social proof credible et un chemin de conversion clair sur chaque page produit. Inclut : section social proof (temoignages + badge 3CX), CTA primaire above-the-fold sur chaque page produit, liens telephone cliquables, et fix des violations Design System Monolithe.

</domain>

<decisions>
## Implementation Decisions

### Placement & contenu social proof
- **D-01:** Section social proof placee apres Services, avant Stats sur la homepage (ordre : Hero > Transformation > ClientsCarousel > Partners > Services > **Social Proof** > Stats > Contact)
- **D-02:** Badge 3CX Certified affiche dans un strip separe au-dessus des temoignages (bande horizontale dediee, visuellement distincte des cartes temoignages)
- **D-03:** L'utilisateur fournira de vrais temoignages clients pendant l'implementation — le composant doit etre pret a les recevoir (structure de donnees flexible, pas de contenu hardcode)
- **D-04:** Social proof affichee sur la homepage ET les pages produit cles (/telephonie-3cx, /3cx-cloud, /nos-services) — pas uniquement la homepage

### Strategie CTA & conversion
- **D-05:** CTA primaire above-the-fold avec wording ET destination personnalises par page (ex: /telephonie-3cx > "Passer a 3CX" > /devis-en-ligne?service=3cx, /assistance > "Demander un support" > /contact?objet=support)
- **D-06:** ContactSectionSimple reutilise en bas de chaque page produit pour eliminer les pages cul-de-sac (composant existant sur la homepage)
- **D-07:** CTAButton refactore en Link-only — supprimer le `<button>` imbrique, appliquer `.monolith-btn` directement sur `<Link>` avec tracking PostHog via onClick

### Liens telephone cliquables
- **D-08:** Numeros de telephone par territoire (Guadeloupe, Martinique, Guyane, Reunion) — pas un seul numero unique
- **D-09:** Numeros affiches dans : footer, pages contact/devis, et chaque page produit
- **D-10:** Chaque lien tel: declenche un event PostHog `phone_click` (deja wire via trackEvent de Phase 1)

### Fix Design System
- **D-11:** Audit complet des violations Design System Monolithe + fix dedie AVANT de commencer la social proof et les CTAs — pas au fil de l'eau
- **D-12:** Hover des CTAs refactores en "hard shadow shift" (translate + shadow offset change) — coherent avec la philosophie Monolithe mecanique. Pas de gradient overlay ni shadow-lg/xl.

### Claude's Discretion
- Structure de donnees exacte pour les temoignages (tant que flexible pour recevoir de vrais contenus)
- Choix du wording CTA exact par page (sera review au PR)
- Implementation technique du strip badge 3CX (micro-label Monolithe)
- Format d'affichage des numeros de telephone par territoire

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `docs/Design.md` — Regles completes du Design System Monolithe 2026
- `docs/CHARTE_GRAPHIQUE.md` — Charte graphique, palette, typographie
- `.stitch/designs/landing-page-desktop.html` — Template Stitch de reference
- `app/globals.css` — Definition de `.monolith-btn`, `.monolith-grid-lines`, `.glass-card`

### Composants existants
- `components/testimonials-section-simple.tsx` — Composant temoignages existant (a corriger : hover:shadow-lg)
- `components/ui/cta-button.tsx` — CTAButton actuel (a refactorer : button imbrique, gradient, shadow violations)
- `components/contact-section-simple.tsx` — Section contact a reutiliser en bas de chaque page produit
- `components/homepage-hero-section-simple.tsx` — Reference pour l'utilisation correcte de .monolith-btn sur Link

### Analytics
- `lib/analytics/track-event.ts` — Utilitaire trackEvent PostHog (cta_click, phone_click, form_submit)
- `lib/analytics/types.ts` — Types des events analytics

### Pages produit (a auditer pour CTA + tel + dead-ends)
- `app/telephonie-3cx/page.tsx`
- `app/3cx-cloud/page.tsx`
- `app/nos-services/page.tsx`
- `app/assistance/page.tsx`
- `app/mobilite/page.tsx`
- `app/telephonie-entreprise/page.tsx`
- `app/studio-attente/page.tsx`

### Requirements
- `.planning/REQUIREMENTS.md` — PROOF-01 a PROOF-04, CONV-01 a CONV-04, DSGN-01

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `TestimonialsSectionSimple` : composant temoignages avec 3 cartes, a corriger (hover:shadow-lg) et adapter pour recevoir des donnees dynamiques
- `ContactSectionSimple` : section contact reutilisable, deja sur la homepage — a deployer sur toutes les pages produit
- `CTAButton` : composant CTA avec tracking PostHog integre — a refactorer (Link-only, supprimer button imbrique)
- `trackEvent()` : utilitaire analytics pret a l'emploi pour cta_click, phone_click
- `PartnersSection` : section partenaires existante (logos)
- `ClientsCarousel` : carousel clients existant

### Established Patterns
- `.monolith-btn` sur `<Link>` (pas de `<button>` imbrique) — pattern valide dans le Hero
- PostHog tracking via `onClick` sur les elements interactifs
- Server Components par defaut, `'use client'` uniquement si interactivite requise
- Composants *-section-simple.tsx pour les sections de page

### Integration Points
- `app/page.tsx` : ajouter TestimonialsSectionSimple entre ServicesSectionSimple et StatsSection
- Pages produit : ajouter ContactSectionSimple + CTA above-the-fold + liens tel:
- Header/Footer : ajouter numeros de telephone cliquables (footer uniquement, pas header)

</code_context>

<specifics>
## Specific Ideas

- L'utilisateur a de vrais temoignages clients a fournir — ne pas hardcoder de faux temoignages, preparer la structure pour les recevoir
- CTAs personnalises par page avec query params pour le tracking (ex: ?service=3cx, ?objet=support)
- Numeros differents par territoire DOM (Guadeloupe, Martinique, Guyane, Reunion)
- Audit Design System complet en premier pour partir sur une base propre

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-redesign-social-proof-conversion*
*Context gathered: 2026-04-05*

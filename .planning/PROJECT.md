# E2I VoIP — Ship & Measure

## What This Is

Site web Next.js 15 pour E2I VoIP, integrateur 3CX local vendant des solutions de telephonie VoIP aux PME francaises. Le site est le canal d'acquisition principal mais genere <20 leads/mois. L'objectif est de deployer le redesign Monolithe 2026, ajouter du tracking comportemental (PostHog), et de la social proof pour ameliorer la conversion.

## Core Value

Chaque visiteur du site doit comprendre en 10 secondes qu'E2I VoIP est un expert local de confiance en telephonie d'entreprise, et avoir un chemin clair pour prendre contact.

## Requirements

### Validated

- ✓ Site Next.js 15 App Router deploye sur Vercel — existing
- ✓ Design System Monolithe 2026 (rounded-none, hard shadows, palette stricte) — existing
- ✓ HubSpot forms pour capture de leads — existing
- ✓ Tally popup pour conversion (ID: mDY1bl, 3s auto) — existing
- ✓ Livechat widget (chat-preoverlay.tsx) — existing
- ✓ JSON-LD Service schema sur 7 pages produits — existing
- ✓ Sitemap corrige (14 pages reelles) — existing
- ✓ Contenu SEO enrichi sur toutes les pages — existing

### Active

- [ ] PostHog GDPR-compliant installe avec 3 events (cta_click, phone_click, form_submit)
- [ ] PostHog session recordings actives (cookieless mode)
- [ ] Social proof strip sur la homepage (temoignages, badges partenaires)
- [ ] Conversion audit : 1 CTA primaire above-the-fold par page produit
- [ ] Tous les numeros de telephone en liens tel: cliquables avec tracking
- [ ] Redesign Monolithe 2026 deploye en prod (178 fichiers sur branche dev)
- [ ] Baseline de donnees avant/apres deploy du redesign
- [ ] Fix violations Design System (hover:shadow-lg dans testimonials-section-simple.tsx)

### Out of Scope

- A/B testing PostHog — Defere apres 1 mois de baseline data
- Google Business Profile integration — Pas applicable actuellement
- Google Ads campaign — Optionnel, hors scope v1
- Outbound acquisition strategy (LinkedIn, prospection) — Hors perimetre site web
- Blog content creation — Phase ulterieure
- Landing pages dediees par campagne — Phase ulterieure

## Context

- Entreprise existante avec clients payants (telephonie VoIP/3CX)
- Marche : fin du cuivre en France accelere la migration VoIP
- These competitive : "proximite et expertise locale" bat Teams/Zoom pour les PME
- Le SEO est un outil de credibilite et de closing, pas le moteur d'acquisition principal (revise apres cross-model challenge)
- Solo dev (chef de projet / dev JS NextJS debutant avec TDAH)
- Design doc approuve : ~/.gstack/projects/R3n1er-e2ivoip-front/alban-dev-design-20260404-220416.md
- CEO plan actif : ~/.gstack/projects/R3n1er-e2ivoip-front/ceo-plans/2026-04-04-ship-and-measure.md

## Constraints

- **Stack**: Next.js 15 App Router, DaisyUI, Tailwind, Vercel
- **Design**: Monolithe 2026 (rounded-none, hard shadows, palette stricte #E53E3E/#2D3848/#1F2937)
- **GDPR**: PostHog EU Cloud, persistence: 'memory' (cookieless)
- **Budget**: Minimal (PostHog free tier, €5-10/jour max pour Ads optionnels)
- **Solo dev**: Decomposition en petites etapes, 1 PR = 1 concern
- **TDD**: RED > GREEN > REFACTOR (obligatoire par CLAUDE.md)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Approach B: Ship & Measure | Redesign a 80%+, l'abandonner serait du gaspillage. On ajoute tracking + social proof en parallele | — Pending |
| PostHog over GA4 | GDPR-friendly, session recordings, feature flags inclus, self-hostable | — Pending |
| Cookieless mode PostHog | Pas besoin de cookie banner, persistence: 'memory' | — Pending |
| Split en 3 PRs | 178 fichiers impossible a review en un merge. PR1: PostHog, PR2: Redesign + Social Proof, PR3: SEO Content | — Pending |
| SEO = credibilite, pas acquisition | Volume de recherche local B2B trop faible pour etre le moteur principal | — Pending |
| Social proof via TestimonialsSectionSimple existant | Composant deja en place, extension plutot que nouveau composant (DRY) | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-04 after initialization*

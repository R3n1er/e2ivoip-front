# Roadmap: E2I VoIP — Ship & Measure

## Overview

Deployer le tracking comportemental PostHog pour etablir une baseline de donnees, puis merger le redesign Monolithe 2026 avec social proof et optimisations conversion, et enfin deployer le contenu SEO. Chaque phase correspond a un PR distinct (1 PR = 1 concern) pour faciliter le review et le rollback.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: PostHog Analytics Baseline** - Installer PostHog GDPR-compliant et capturer les events de conversion pour etablir une baseline avant le redesign
- [ ] **Phase 2: Redesign + Social Proof + Conversion** - Merger le redesign Monolithe, ajouter la social proof, et optimiser les chemins de conversion
- [ ] **Phase 3: Deploy Redesign + SEO Content** - Deployer le redesign en prod et merger le contenu SEO existant

## Phase Details

### Phase 1: PostHog Analytics Baseline
**Goal**: Les visiteurs sont traces anonymement et chaque interaction de conversion (CTA, telephone, formulaire) genere un event mesurable
**Depends on**: Nothing (first phase)
**Requirements**: ANAL-01, ANAL-02, ANAL-03, ANAL-04, ANAL-05, ANAL-06, DPLY-01
**Success Criteria** (what must be TRUE):
  1. PostHog dashboard affiche des sessions en temps reel provenant du site en production
  2. Cliquer sur un CTA genere un event cta_click visible dans PostHog avec page, element_id, element_text
  3. Cliquer sur un numero de telephone genere un event phone_click dans PostHog
  4. Soumettre un formulaire HubSpot ou Tally genere un event form_submit dans PostHog
  5. Si PostHog est bloque (adblocker), le site fonctionne normalement sans erreur console
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — PostHog SDK + Provider + trackEvent utility (TDD)
- [ ] 01-02-PLAN.md — Wire events into CTAs, forms, phone links + create PR1

### Phase 2: Redesign + Social Proof + Conversion
**Goal**: Les visiteurs voient un site professionnel avec social proof credible et un chemin de conversion clair sur chaque page produit
**Depends on**: Phase 1
**Requirements**: PROOF-01, PROOF-02, PROOF-03, PROOF-04, CONV-01, CONV-02, CONV-03, CONV-04, DSGN-01
**Success Criteria** (what must be TRUE):
  1. La homepage affiche une section social proof entre Hero et Services avec au moins 3 temoignages clients et le badge 3CX Certified
  2. Chaque page produit a exactement 1 CTA primaire .monolith-btn visible sans scroller, et aucune page produit n'est un cul-de-sac (lien vers /contact ou /devis-en-ligne)
  3. Tous les numeros de telephone du site sont des liens tel: cliquables
  4. Tous les CTA et liens tel: declenchent leurs events PostHog respectifs (cta_click, phone_click)
  5. Le composant social proof ne rend rien si les donnees sont vides (pas de section vide visible)
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Deploy Redesign + SEO Content
**Goal**: Le redesign Monolithe 2026 complet et le contenu SEO enrichi sont en production, avec les donnees avant/apres disponibles dans PostHog
**Depends on**: Phase 2
**Requirements**: DSGN-02, DPLY-02, DPLY-03
**Success Criteria** (what must be TRUE):
  1. Toutes les pages de la branche dev sont accessibles en production avec le design Monolithe 2026
  2. PostHog montre des donnees de sessions avant et apres le deploy du redesign (baseline vs nouveau)
  3. Le contenu SEO enrichi (deja committe sur dev) est live en production
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. PostHog Analytics Baseline | 0/2 | Not started | - |
| 2. Redesign + Social Proof + Conversion | 0/3 | Not started | - |
| 3. Deploy Redesign + SEO Content | 0/1 | Not started | - |

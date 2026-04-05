# Requirements: E2I VoIP — Ship & Measure

**Defined:** 2026-04-04
**Core Value:** Chaque visiteur comprend en 10s qu'E2I est un expert local de confiance et a un chemin clair pour prendre contact

## v1 Requirements

### Analytics

- [ ] **ANAL-01**: PostHog JS SDK installe dans app/layout.tsx avec PostHogProvider (EU Cloud, persistence: 'memory')
- [ ] **ANAL-02**: Event cta_click capture sur chaque CTA du site avec payload {page, element_id, element_text}
- [ ] **ANAL-03**: Event phone_click capture sur chaque lien tel: cliquable
- [ ] **ANAL-04**: Event form_submit capture sur les soumissions HubSpot et Tally
- [ ] **ANAL-05**: Session recordings actives dans la configuration PostHog
- [ ] **ANAL-06**: Try/catch wrapper sur tous les appels PostHog (graceful degradation si SDK bloque)

### Social Proof

- [ ] **PROOF-01**: Social proof strip visible sur la homepage entre Hero et Services sections
- [ ] **PROOF-02**: Au minimum 3 temoignages clients avec nom, role, entreprise et resultat concret
- [ ] **PROOF-03**: Badges partenaire (3CX Certified) visibles dans la section social proof
- [ ] **PROOF-04**: Composant ne rend rien si les donnees sont vides (empty state handling)

### Conversion

- [ ] **CONV-01**: Chaque page produit a exactement 1 CTA primaire above-the-fold avec classe .monolith-btn
- [ ] **CONV-02**: Tous les CTA declenchent un event PostHog cta_click
- [ ] **CONV-03**: Tous les numeros de telephone sont des liens tel: cliquables avec event phone_click
- [ ] **CONV-04**: Aucune page produit sans lien vers /contact ou /devis-en-ligne (zero dead-ends)

### Design System

- [ ] **DSGN-01**: Fix hover:shadow-lg dans testimonials-section-simple.tsx (violation regles Monolithe)
- [ ] **DSGN-02**: Redesign Monolithe 2026 complet deploye en prod (toutes les pages de la branche dev)

### Deploy

- [ ] **DPLY-01**: PR1 (PostHog) merge en premier sur main pour collecte de baseline
- [ ] **DPLY-02**: PR2 (Redesign + Social Proof + Conversion) merge apres periode de baseline (1-3 semaines)
- [ ] **DPLY-03**: PR3 (SEO Content deja committe sur dev) merge independamment

## v2 Requirements

### Optimization

- **OPT-01**: A/B testing via PostHog feature flags (apres 1 mois de baseline data)
- **OPT-02**: Landing pages dediees par campagne marketing
- **OPT-03**: Google Business Profile integration et avis Google sur le site

### Content

- **CONT-01**: Blog avec articles techniques telephonie VoIP
- **CONT-02**: Cas clients detailles avec metriques (avant/apres)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Google Ads campaign | Optionnel, budget minimal, tester manuellement hors scope dev |
| Outbound strategy (LinkedIn, prospection) | Hors perimetre site web |
| Mobile app | Web-first, responsive suffit |
| Backend/API custom | Site statique sur Vercel, pas de backend custom |
| Refonte complete du contenu editorial | Deja fait dans la branche dev actuelle |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANAL-01 | Phase 1 | Pending |
| ANAL-02 | Phase 1 | Pending |
| ANAL-03 | Phase 1 | Pending |
| ANAL-04 | Phase 1 | Pending |
| ANAL-05 | Phase 1 | Pending |
| ANAL-06 | Phase 1 | Pending |
| PROOF-01 | Phase 2 | Pending |
| PROOF-02 | Phase 2 | Pending |
| PROOF-03 | Phase 2 | Pending |
| PROOF-04 | Phase 2 | Pending |
| CONV-01 | Phase 2 | Pending |
| CONV-02 | Phase 2 | Pending |
| CONV-03 | Phase 2 | Pending |
| CONV-04 | Phase 2 | Pending |
| DSGN-01 | Phase 2 | Pending |
| DSGN-02 | Phase 3 | Pending |
| DPLY-01 | Phase 1 | Pending |
| DPLY-02 | Phase 3 | Pending |
| DPLY-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0

---
*Requirements defined: 2026-04-04*
*Last updated: 2026-04-04 after initialization*

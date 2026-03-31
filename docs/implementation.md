# Plan d'Implémentation — Alignement Template Stitch 2026

> **Ref Stitch** : Template `5386927507224192183` (`landing-page-desktop.html`)
> **Date** : 2026-03-29
> **Statut** : ✅ TERMINE (toutes les phases executees le 2026-03-29)

---

## Contexte

Le redesign "Philosophie Carrée & Bento Box" (commit `b9dbd2e`) a posé les fondations du Design System 2026 : couleurs, boutons monolithe, grilles asymetriques, grid-lines. Cependant, un audit comparatif entre le template Stitch valide et le code actuel revele des **ecarts de detail** a corriger pour atteindre une fidelite complete.

### Bilan Actuel

| Domaine | Conformite | Commentaire |
|---------|-----------|-------------|
| Palette de couleurs | 100% | ✅ Tokens conformes, couleurs generiques supprimees |
| Philosophie Carree | 100% | ✅ `rounded-none` + override CSS dropdowns |
| Boutons Monolithe | 100% | ✅ Hard shadows + hover mecaniques |
| Bento Grid | 95% | ✅ Services OK, min-h-[450px] |
| Structure Hero | 100% | ✅ Asymetrique, KPI blocks, grid-lines ; **suivi 2026-03-29** : badge + sous-titre hero (positionnement DOM sans repetition) — ADR |
| Typographie | 100% | ✅ 10 corrections tracking appliquees |
| Stats Section | 100% | ✅ py-32, Sans-Ligne rule, KPIs metier |
| Footer | 100% | ✅ Style Stitch, badge 3CX retire |
| Navigation | 100% | ✅ Devis/Contact separes, monolith-btn ; **suivi 2026-03-29** : `HeaderSimple` desktop dès `lg`, hamburger &lt; `lg` (voir ADR du meme jour) |
| Chat PreOverlay | 100% | ✅ Monolithe, 3 champs, scroll trigger |
| Pages interieures | 100% | ✅ 8 pages migrees, 33 corrections appliquees |

---

## Phase 0 — Corrections Urgentes Soft Shadows (Priorite Immediate)

> Detectees par l'agent `pre-commit-validator` le 2026-03-29 sur les fichiers actuellement modifies.

### 0.1 Header — Suppression soft shadows

**Fichier** : `components/layout/header.tsx`

**Violations detectees** :
- **Ligne 87** : `shadow-lg` sur le header scrolle (`bg-white/95 backdrop-blur-md shadow-lg`)
- **Ligne 207** : `shadow-2xl` sur le dropdown menu (`dropdown-content ... shadow-2xl`)

**Corrections** :
- [x] **L87** : `shadow-lg` supprime (backdrop-blur + border-b suffit) — commit `844cc0a`
- [x] **L207** : `shadow-2xl` → `shadow-[4px_4px_0_0_#1F2937]` + `rounded-box` → `rounded-none` — commit `844cc0a`
- [x] Tests adaptes : `header-visibility.test.tsx`, `header-daisyui.test.tsx` — commit `844cc0a`

**Risque** : Faible — corrections CSS ponctuelles sur 2 lignes

---

### 0.2 Page Assistants Vocaux IA — Suppression drop-shadow

**Fichier** : `app/nos-services/assistants-vocaux-ia/page.tsx`

**Violation detectee** :
- **Ligne 32** : `drop-shadow-2xl` sur le titre H1 Hero (`font-black text-white mb-6 drop-shadow-2xl`)

**Correction** :
- [x] `drop-shadow-2xl` supprime du H1 — commit `844cc0a`
- [x] Titre lisible (contraste text-white sur fond sombre suffit)

**Risque** : Faible — suppression CSS ponctuelle sur 1 ligne

---

### 0.3 Scan global — Autres soft shadows residuelles

**Action** : Scanner l'ensemble du projet pour d'autres soft shadows residuelles hors Design System.

- [x] Scan complet : `trunk-sip-compteur/page.tsx` L66 `drop-shadow-2xl` supprime — commit `844cc0a`
- [x] Composants homepage (hero, services, stats, contact, clients, partners) : CLEAN
- [x] Pages non migrees (telephonie-3cx, 3cx-cloud, trunk-sip-illimite, devis-en-ligne) : soft shadows residuelles, reportees en Phase 5.1

**Risque** : Faible a Moyen — nombre d'occurrences a determiner lors du scan

---

## Phase 1 — Alignement Homepage (Priorite Haute)

### 1.1 Stats Section — Style Stitch avec KPIs Metier

**Fichier** : `components/stats-section.tsx`

**Decision** : Conserver les KPIs actuels (30% / 15 Ans / <2h / 0) car les donnees Stitch (99.9%, 0EUR, 24/7, +12k) ne correspondent pas au business reel d'E2I VoIP. Seul le **style visuel** du template Stitch est applique.

**Actions** :
- [x] Donnees KPI conservees (30% / 15 Ans / <2h / 0) — commit `844cc0a`
- [x] `py-24` → `py-32` — commit `844cc0a`
- [x] Alternance couleurs OK (`text-[#091421]` / `text-red-primary`)
- [x] `tracking-[0.3em]` labels + `tracking-[-0.04em]` chiffres — deja conforme
- [x] `border-gray-100` → `border-[#091421]/5` (Sans-Ligne rule) — commit `844cc0a`

**Statut** : ✅ TERMINE

---

### 1.2 Section Clients — Titre & Espacement

**Fichier** : `components/clients-carousel.tsx`

**Ecarts** :
- Le template Stitch utilise `tracking-[0.2em]` sur le titre "ILS NOUS FONT CONFIANCE" et une disposition en grille 6 colonnes
- Le carousel anime est une **amelioration UX** conservee, mais le titre et l'espacement doivent s'aligner

**Actions** :
- [x] `tracking-[0.3em]` → `tracking-[0.2em]` sur le titre — commit `844cc0a`
- [x] `py-16` → `py-24` — commit `844cc0a`
- [x] Fond `bg-white` confirme

**Statut** : ✅ TERMINE

---

### 1.3 Section Solutions Phares — Lignes Rouges Decoratives & Espacement (VALIDE)

**Fichier** : `components/services-section-simple.tsx`

**Decision validee** : Ajouter les lignes rouges decoratives du template Stitch partout ou elles manquent dans le projet. Ce sont des marqueurs visuels forts de l'identite E2I.

**Reference Stitch** : `<div class="h-2 w-32 bg-primary-container"></div>` — ligne rouge epaisse (8px de haut, 128px de large) positionnee a droite du titre de section via `flex justify-between items-end`.

**Actions** :
- [x] Ligne rouge `h-2 w-32 bg-red-primary` toujours visible (supprime `hidden sm:block`) — commit `844cc0a`
- [x] Titre simplifie en `text-5xl font-black tracking-tighter uppercase text-[#091421]`
- [x] `min-h-[380px]` → `min-h-[450px]` sur toutes les tiles — commit `844cc0a`
- [x] Boutons : `tracking-widest` → `tracking-[0.2em]` — commit `844cc0a`
- [ ] Auditer pages interieures pour lignes rouges (reporte Phase 5.1)

**Statut** : ✅ TERMINE (audit pages reporte)

---

### 1.4 Navigation — Separation "Devis en ligne" / "Contact" (VALIDE)

**Fichier** : `components/layout/header.tsx`

**Decision validee** : Adopter la separation du template Stitch avec deux elements distincts. Le bouton "Contact" recoit le style **shadow box monolithe** (`monolith-btn`) pour un impact visuel fort.

**Actions** :
- [x] CTA separe : lien "Devis en ligne" (`header-devis-link`) + bouton "Contact" (`monolith-btn`) — commit `844cc0a`
- [x] Desktop : `space-x-6`, lien texte + bouton rouge hard shadow
- [x] Mobile : 2 actions distinctes dans le drawer
- [x] Tests adaptes : `header-daisyui.test.tsx` (icon-lni-phone → devis-link), `header-submenu.test.tsx` — commit `844cc0a`
- [x] 46/46 tests header passent

**Statut** : ✅ TERMINE

---

### 1.5 Chat PreOverlay — Redesign Monolithe + UX Simplifiee (VALIDE)

**Fichiers** :
- `components/chat-preoverlay.tsx` (composant principal)
- `lib/validation/chat-intake.ts` (schema Zod)
- `app/globals.css` (animations CSS)

**Decisions validees** :
- **Restyling Monolithe** : Bouton rouge plein + hard shadow (plus de gradient), formulaire carte blanche + hard shadow, inputs style Monolithe adapte, typographie industrielle
- **Simplification UX** : Reduction de 5 a 3 champs (Prenom + Email + Entreprise). Suppression Nom et Telephone du prechat.
- **Declenchement contextuel** : Animation declenchee par Intersection Observer apres le Hero (plus au chargement). Meme pattern de cycles (3s vibration + 2s pause, 20s total).
- **Boutons** : CTA "Ouvrir le chat" en Monolithe Primaire pleine largeur + "Annuler" en simple lien texte discret
- **Documentation** : Specs integrees dans `Design.md` (section 7.5bis) et `CHARTE_GRAPHIQUE.md` (section 5)

**Actions** :
- [x] **Bouton** : `bg-red-primary` + `.monolith-btn` (gradient supprime) — commit `844cc0a`
- [x] **Texte** : `shadow-[3px_3px_0_0_#1F2937]` + `text-xs font-black uppercase tracking-[0.2em]`
- [x] **Formulaire** : `shadow-[6px_6px_0_0_#1F2937] bg-white border border-gray-200 p-6`
- [x] **Titre** : `font-black uppercase tracking-[0.2em] text-sm text-[#091421]`
- [x] **Inputs** : `rounded-none bg-gray-50 border border-gray-200`, focus `border-b-2 border-red-primary`
- [x] **DaisyUI supprime** : `input input-bordered`, `btn btn-ghost`, `btn btn-primary` retires
- [x] **3 champs** : `lastName` et `phone` supprimes du formulaire et du schema Zod
- [x] **Schema Zod** : `lib/validation/chat-intake.ts` mis a jour (3 champs) — commit `844cc0a`
- [x] **CTA** : Monolithe Primaire pleine largeur
- [x] **Annuler** : Lien texte discret `text-sm text-gray-secondary`
- [x] **Intersection Observer** : Declenchement post-Hero (plus immediat) — commit `844cc0a`
- [x] **Tests** : `use-chat-intake.test.tsx` adapte (3 champs) — commit `844cc0a`
- [x] **API route** : `ingest-conversation/route.ts` nettoye — proprietes custom supprimees (causaient 400 HubSpot), note non-bloquante — commit `be7ddf9`

**Statut** : ✅ TERMINE

---

## Phase 2 — Alignement Footer (Priorite Moyenne)

### 2.1 Restyling Footer — Contenu Actuel + Style Stitch (VALIDE)

**Fichier** : `components/layout/footer.tsx`

**Decision validee** :
- **Conserver le contenu actuel** du footer (liens, textes, informations)
- **Appliquer le style Stitch** : fond blanc, typographie Stitch (titres `text-[10px] font-black uppercase tracking-[0.3em] text-red-primary`), liens `text-sm`, sub-footer avec `border-t border-secondary/10`
- **Retirer le logo partenaire 3CX** du footer (les logos partenaires restent dans la section dediee `PartnersSection`)
- **Conserver la section "Partenaires Technologiques"** (`partners-section.tsx`) avec les logos fixes en grille — cette section reste un enrichissement independant du footer

**Actions** :
- [x] `bg-white` strict + `py-20 px-8` — commit `844cc0a`
- [x] Titres colonnes : `text-[10px] font-black uppercase tracking-[0.3em] text-red-primary`
- [x] Liens : `text-gray-500 hover:text-[#091421]`
- [x] Newsletter : input `rounded-none bg-gray-50` + bouton carre rouge
- [x] Sub-footer : `text-[10px] font-black uppercase tracking-widest` + `border-[#091421]/10`
- [x] Badge/logo 3CX Silver Partner retire du footer — commit `844cc0a`
- [x] `footer.test.tsx` adapte (assertion 3CX retiree) — commit `844cc0a`

**Statut** : ✅ TERMINE

---

## Phase 3 — Typographie Fine (Priorite Moyenne)

### 3.1 Normalisation du Tracking Typographique

**Fichiers** : Tous les composants

**Regles du template Stitch a verifier/appliquer** :

| Element | Tracking Stitch | Classe Tailwind |
|---------|----------------|-----------------|
| Titres H1/H2 | `-0.04em` | `tracking-[-0.04em]` |
| Liens navigation | `-0.03em` | `tracking-[-0.03em]` |
| Boutons CTA | `0.2em` | `tracking-[0.2em]` |
| Micro-labels (stats, footer) | `0.3em` | `tracking-[0.3em]` |
| Labels "UPPERCASE" generaux | `0.2em` | `tracking-widest` ou custom |

**Actions** :
- [x] `homepage-hero-section-simple.tsx` : 6 corrections (badges, CTA, DOM labels) — commit `844cc0a`
- [x] `contact-section-simple.tsx` : 2 corrections (boutons CTA `tracking-widest` → `tracking-[0.2em]`)
- [x] `partners-section.tsx` : 2 corrections (titre H2 → `tracking-[-0.04em]`, sous-texte → `tracking-[0.3em]`)
- [x] 10 corrections totales, 4 elements deja conformes

**Statut** : ✅ TERMINE

---

## Phase 4 — Dropdowns DaisyUI (Priorite Basse)

### 4.1 Override Rounded sur Dropdowns

**Fichier** : `components/layout/header.tsx` + `app/globals.css`

**Ecart** : Les dropdowns DaisyUI utilisent `rounded-box` au lieu de `rounded-none`

**Actions** :
- [x] Override CSS ajoute dans `globals.css` : `.dropdown-content, .dropdown-content.rounded-box { border-radius: 0 !important; }` — commit `844cc0a`
- [x] `header.tsx` L207 : `rounded-box` → `rounded-none` (double securite)

**Statut** : ✅ TERMINE

---

## Phase 5 — Pages Interieures ✅ TERMINE

### 5.1 Migration Pages Non-Migrees vers Monolithe

**Pages migrees** — commit `487c708` :
- [x] `app/telephonie-3cx/page.tsx` — 11 corrections (soft shadows, drop-shadow, hover scale)
- [x] `app/3cx-cloud/page.tsx` — 10 corrections (boutons CTA monolith-btn, shadows, icones)
- [x] `app/telephonie-entreprise/trunk-sip-illimite/page.tsx` — 9 corrections (shadows, gradients icones → bg-gray-50)
- [x] `app/devis-en-ligne/page.tsx` — 3 corrections (shadows, boutons monolith-btn)

**Pages conformes depuis Phase 0** :
- [x] `app/nos-services/assistants-vocaux-ia/page.tsx`
- [x] `app/studio-attente/page.tsx`
- [x] `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx`
- [x] `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`

### 5.2 Correction Tests Casses (9 tests)

- [x] `tests/assistants-vocaux-ia.test.tsx` — 4 tests adaptes (textes, CTA monolith-btn, couleurs #091421) — commit `487c708`
- [x] `tests/trunk-sip-compteur.test.tsx` — 5 tests adaptes (textes tarifs, couleurs, CTA) — commit `487c708`
- [x] **327/327 tests Jest passent (100%)**

**Statut** : ✅ TERMINE

---

## Phase 6 — Blog HubSpot ISR (2026-03-29)

### 6.1 Migration Contentful -> HubSpot CMS Blog API

**Decision** : Remplacer l'integration Contentful (jamais deployee) par l'API Blog HubSpot CMS du portail 26878201. ISR 10 minutes pour SEO/GEO optimal.

**Actions** :
- [x] Service `lib/hubspot-blog.ts` (types, fetch ISR 600s, mapping, slug cleanup) + 7 tests
- [x] Blog list page ISR (`app/blog/page.tsx` — Server Component, recherche, filtres, pagination)
- [x] Blog article page ISR (`app/blog/[slug]/page.tsx` + sanitize-html + prose-monolithe + JSON-LD)
- [x] Blog category page ISR (`app/blog/categorie/[slug]/page.tsx`)
- [x] 6 composants UI Monolithe (BlogPostCard, Breadcrumb, SocialShare, RelatedPosts, TagFilter, JsonLd)
- [x] Styles prose-monolithe dans globals.css
- [x] Sitemap dynamique avec URLs blog (11 articles + 11 tags)
- [x] Suppression Contentful (lib, API routes, dependance npm)
- [x] Suppression OAuth HubSpot (admin page, callback, test routes)
- [x] Remplacement isomorphic-dompurify par sanitize-html (SSR-compatible)
- [x] 334/334 tests Jest, build OK

**Statut** : ✅ TERMINE

---

## Phase 8 — Securite + Hook Pre-Commit (2026-03-31) ✅ TERMINE

- [x] Hook `.husky/pre-commit` : scan fichiers sensibles + patterns secrets — commit `949277e`
- [x] Agent `security-guardian.md` renforce (phases 2b/5/6, dotenvx, lecons incidents)
- [x] Husky v9 initialise (`prepare: "husky"` dans package.json)

## Phase 9 — Restructuration Menu + Alignement Stitch Header (2026-03-31) ✅ TERMINE

- [x] Menu "Trunk SIP" dedie (separe de Telephonie d'entreprise) — commit `be809bc`
- [x] Bouton "Espace Client" monolith-btn avec bordure + icone user — commit `be809bc`
- [x] "Devis en ligne" en rouge #b91c1c, retire du menu nav — commit `bd2672b`
- [x] Liens nav : font-medium text-sm (plus uppercase bold) — commit `bd2672b`
- [x] Hauteur header : h-20 → h-24 (96px Stitch) — commit `bd2672b`
- [x] Fix API ingest-conversation : proprietes custom supprimees (400 HubSpot) — commit `be7ddf9`
- [x] Fix hydratation : suppressHydrationWarning sur Hero + Partners — commit `c8ba774`
- [x] Tests adaptes : 335/335 Jest, 67/67 Playwright

---

## Phase 10 — Tests & Validation (Obligatoire apres chaque phase)

### 6.1 Workflow de Validation

Apres chaque phase, executer imperativement :

```bash
npm run test:ci         # Tests Jest (doit rester a 330/330)
npx playwright test     # Tests E2E (doit rester a 74/74)
npm run lint            # Linting
npm run type-check      # TypeScript
npm run build           # Build production
```

### 6.2 Matrice Tests par Phase — Fichiers a Adapter

#### Phase 0 — Corrections Urgentes Soft Shadows

**Impact faible** — Corrections CSS ponctuelles (3 lignes sur 2 fichiers).

| Fichier Test | Type | Action |
|---|---|---|
| `tests/header-daisyui.test.tsx` | Jest | Verifier si `shadow-lg` est dans les assertions |
| `tests/header-submenu.test.tsx` | Jest | Verifier si `shadow-2xl` est teste sur les dropdowns |
| `tests/e2e/assistants-vocaux-ia.spec.ts` | E2E | Verifier que le Hero titre est toujours lisible sans drop-shadow |

#### Phase 1.1 — Stats Section (style CSS)

**Impact faible** — Modifications CSS uniquement, les donnees sont inchangees.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/services-section-prd.test.tsx` | Jest | Verifier si des classes CSS sont testees (`py-24` -> `py-32`) |
| `tests/homepage-hydration.test.tsx` | Jest | Verifier absence d'erreur hydratation apres changement padding |
| `tests/homepage-hero-image.test.tsx` | Jest | Verifier pas d'impact (section differente) |
| `tests/playwright/services-section.spec.ts` | E2E | Verifier visuellement que la section stats s'affiche correctement |

#### Phase 1.2 — Section Clients (titre/espacement)

**Impact faible** — Ajustements CSS titre et padding.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/clients-carousel.test.tsx` | Jest | Adapter si le test verifie des classes de titre (`tracking-[0.2em]`) |
| `tests/homepage-hydration.test.tsx` | Jest | Relancer pour verifier hydratation |

#### Phase 1.3 — Section Solutions (lignes rouges decoratives)

**Impact moyen** — Ajout d'elements DOM (div ligne rouge) qui peuvent affecter les selecteurs de test.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/services-section-prd.test.tsx` | Jest | **ADAPTER** — Ajouter test pour la presence de la ligne rouge decorative (`h-2 w-32 bg-red-primary`) |
| `tests/playwright/services-section.spec.ts` | E2E | **ADAPTER** — Verifier que la ligne rouge est visible et correctement positionnee |
| `tests/playwright/services-cards-alignment.spec.ts` | E2E | Verifier que l'alignement des cartes n'est pas casse par le nouveau header de section |
| `tests/nos-services-page.test.tsx` | Jest | Verifier pas d'impact indirect |

#### Phase 1.4 — Navigation (separation Devis/Contact + shadow box)

**Impact eleve** — Restructuration du header avec 2 CTA distincts. Nombreux tests references.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/header-daisyui.test.tsx` | Jest | **ADAPTER** — Tester les 2 boutons separes (lien "Devis en ligne" + bouton "Contact" avec `.monolith-btn`) |
| `tests/header-submenu.test.tsx` | Jest | **ADAPTER** — Verifier que les sous-menus ne sont pas casses par le nouveau layout CTA |
| `tests/header-simple.test.tsx` | Jest | **ADAPTER** — Si ce composant est aussi modifie |
| `tests/header-simple-submenu.test.tsx` | Jest | Verifier coherence |
| `tests/header-integration.test.tsx` | Jest | **ADAPTER** — Verifier integration avec les 2 nouveaux CTA |
| `tests/header-menu.test.tsx` | Jest | Verifier menu mobile avec 2 actions |
| `tests/header-hydration.test.tsx` | Jest | Relancer pour verifier hydratation |
| `tests/header-visibility.test.tsx` | Jest | Verifier visibilite des 2 CTA |
| `tests/e2e/header-simple.spec.ts` | E2E | **ADAPTER** — Tester clic "Devis en ligne" et clic "Contact" separement |
| `tests/devis-en-ligne.test.tsx` | Jest | Verifier lien "Devis en ligne" pointe correctement |
| `tests/devis-page-hydration.test.tsx` | Jest | Verifier pas de regression |

#### Phase 1.5 — Chat PreOverlay (redesign Monolithe + UX)

**Impact eleve** — Restyling complet + reduction champs + changement declenchement animation.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/use-chat-intake.test.tsx` | Jest | **ADAPTER** — Schema Zod reduit a 3 champs (supprimer assertions `lastName`, `phone`) |
| `tests/playwright/chat-preoverlay-flow.spec.ts` | E2E | **ADAPTER** — Flux reduit a 3 champs, nouveau declenchement scroll, nouveau style bouton/formulaire |
| `tests/playwright/chat-animation-cycles.spec.ts` | E2E | **ADAPTER** — Declenchement par Intersection Observer (scroll post-Hero au lieu de chargement page) |
| `tests/playwright/chat-button-animation.spec.ts` | E2E | **ADAPTER** — Nouveau style bouton (rouge plein + hard shadow, plus de gradient), nouveau style texte |
| `tests/playwright/debug-chat-button.spec.ts` | E2E | **ADAPTER** — Verifier nouveau style et positionnement |
| `tests/homepage-hydration.test.tsx` | Jest | Relancer pour verifier hydratation avec Intersection Observer |

#### Phase 2.1 — Footer (restyle + retrait logo 3CX)

**Impact moyen** — Changements de style + suppression element DOM (logo 3CX).

| Fichier Test | Type | Action |
|---|---|---|
| `tests/footer.test.tsx` | Jest | **ADAPTER** — Retirer assertions sur logo/badge 3CX Silver Partner, verifier nouveaux styles (titres `text-[10px]`, tracking, etc.) |
| `tests/3cx-badge.test.tsx` | Jest | **ADAPTER** — Supprimer ou modifier les tests lies au badge 3CX dans le footer (conserver si le badge existe ailleurs) |
| `tests/header-footer-fix.test.tsx` | Jest | Relancer pour verifier pas de regression |
| `tests/homepage-hydration.test.tsx` | Jest | Relancer |

#### Phase 3.1 — Typographie (tracking transversal)

**Impact faible** — Modifications CSS uniquement, pas d'impact DOM.

| Fichier Test | Type | Action |
|---|---|---|
| Tous les tests | Jest + E2E | Relancer `npm run test:ci` + `npx playwright test` en bloc — aucune adaptation specifique attendue sauf si des tests verifient des classes CSS exactes |

#### Phase 4.1 — Dropdowns DaisyUI

**Impact faible** — Override CSS ou remplacement composant.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/header-daisyui.test.tsx` | Jest | Verifier que les dropdowns s'ouvrent toujours correctement |
| `tests/header-submenu.test.tsx` | Jest | Verifier comportement sous-menus |
| `tests/e2e/header-simple.spec.ts` | E2E | Verifier visuellement les dropdowns carres |

#### Phase 5.1 — Pages Interieures

**Impact moyen** — Modifications sur 4 pages avec tests E2E existants.

| Fichier Test | Type | Action |
|---|---|---|
| `tests/e2e/assistants-vocaux-ia.spec.ts` | E2E | **ADAPTER** — Si Hero ou CTA modifies (fond, grid-lines, monolith-btn) |
| `tests/assistants-vocaux-ia.test.tsx` | Jest | Verifier pas de regression |
| `tests/trunk-sip-compteur.test.tsx` | Jest | Verifier si des classes sont testees |
| `tests/e2e/tally-popup.spec.ts` | E2E | Verifier pas d'impact sur l'embed Tally |
| `tests/playwright/services-section.spec.ts` | E2E | Relancer apres modifications |

### 6.3 Strategie de Mise a Jour des Tests

**Principe** : Chaque phase de modification code est immediatement suivie de la mise a jour des tests correspondants **avant** de passer a la phase suivante.

**Workflow par phase** :
1. Modifier le composant (ex: `header.tsx`)
2. Lancer `npm run test:ci` — identifier les tests en echec
3. Adapter les tests unitaires Jest concernes
4. Lancer `npx playwright test` — identifier les specs E2E en echec
5. Adapter les specs Playwright concernees
6. Relancer `npm run validate` — tout doit etre au vert
7. Commit de la phase (composant + tests adaptes ensemble)

**Regle** : Ne jamais committer un composant modifie sans ses tests adaptes dans le meme commit.

---

## Estimation des Efforts

| Phase | Composants | Complexite | Priorite | Decision |
|-------|-----------|-----------|----------|----------|
| 0.1-0.3 Soft shadows | 2 fichiers + scan | Faible | Immediate | Corrections detectees par pre-commit-validator |
| 1.1 Stats | 1 fichier | Faible | Haute | Style Stitch, KPIs metier conserves |
| 1.2 Clients | 1 fichier | Faible | Haute | Titre/espacement Stitch |
| 1.3 Solutions | 1 fichier | Moyenne | Haute | Lignes rouges decoratives + espacement |
| 1.4 Navigation | 1 fichier + tests | Moyenne | Haute | Separation Devis/Contact + shadow box |
| 1.5 Chat | 3 fichiers + tests | Elevee | Haute | Monolithe + 3 champs + scroll trigger |
| 2.1 Footer | 1 fichier + tests | Moyenne | Moyenne | Style Stitch, contenu actuel, retrait logo 3CX |
| 3.1 Typographie | ~6 fichiers | Faible | Moyenne | Tracking systematique |
| 4.1 Dropdowns | 2 fichiers | Faible | Basse | Override rounded |
| 5.1 Pages interieures | 4 fichiers | Moyenne | Basse | Harmonisation Design.md |

---

## Ordre d'Execution Recommande

0. **Phase 0** (Soft shadows urgentes) -> 3 lignes a corriger, prerequis avant tout commit
1. **Phase 1.3** (Solutions — lignes rouges) -> marqueur identitaire fort, valide
2. **Phase 1.4** (Navigation — Devis/Contact) -> UX critique, valide
3. **Phase 1.5** (Chat — redesign Monolithe + UX) -> composant global, haute visibilite
4. **Phase 1.1** (Stats — style) -> rapide, CSS only
5. **Phase 1.2** (Clients — titre) -> rapide, polish
6. **Phase 2.1** (Footer — restyle + retrait 3CX) -> restructuration moyenne
7. **Phase 3.1** (Typographie) -> passe transversale
8. **Phase 4.1** (Dropdowns) -> cosmetique
9. **Phase 5.1** (Pages interieures) -> audit et retouches

---

## Historique

### 2026-03-29 — Evolutions post-plan Stitch (header + hero + tests)

- **Header** : `components/layout/header-simple.tsx` — menu desktop visible dès `lg` ; hamburger / tiroir uniquement en dessous de `lg` ; typo et espacements compacts sur `lg`.
- **Tests** : `tests/header-simple.test.tsx`, `tests/e2e/header-simple.spec.ts` (role `menuitem` pour sous-menus, viewport 1024).
- **Hero** : `components/homepage-hero-section-simple.tsx` + `tests/homepage-hero-image.test.tsx` — badge operateur / DOM / clients ; sous-titre sans doublon « Spécialiste des DOM ».
- **Reference** : `docs/ADR.md` (entree du meme jour).

### 2025-10-21 — Plan initial (obsolete)

- Hero 3CX : logo officiel centre + CTA centres
- Embed Tally : ajout `src` direct pour Playwright
- Actions futures : warnings React, props `sizes` images, contenu services

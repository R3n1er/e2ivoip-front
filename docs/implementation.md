# Plan d'Implémentation — Alignement Template Stitch 2026

> **Ref Stitch** : Template `5386927507224192183` (`landing-page-desktop.html`)
> **Date** : 2026-03-29
> **Statut** : Valide (decisions utilisateur du 2026-03-29)

---

## Contexte

Le redesign "Philosophie Carrée & Bento Box" (commit `b9dbd2e`) a posé les fondations du Design System 2026 : couleurs, boutons monolithe, grilles asymetriques, grid-lines. Cependant, un audit comparatif entre le template Stitch valide et le code actuel revele des **ecarts de detail** a corriger pour atteindre une fidelite complete.

### Bilan Actuel

| Domaine | Conformite | Commentaire |
|---------|-----------|-------------|
| Palette de couleurs | 98% | Tokens OK, pas de couleurs generiques |
| Philosophie Carree | 95% | `rounded-none` applique partout sauf dropdowns DaisyUI |
| Boutons Monolithe | 100% | Hard shadows + hover mecaniques OK |
| Bento Grid | 90% | Services OK, a etendre |
| Structure Hero | 95% | Asymetrique, KPI blocks, grid-lines OK |
| Typographie | 85% | Tracking a resserrer sur labels/titres |
| Stats Section | 85% | KPIs metier conserves, style Stitch a appliquer |
| Footer | 75% | Contenu actuel conserve, style Stitch sur fond blanc, retrait logo 3CX |
| Navigation | 85% | Separation Devis/Contact validee, shadow box sur Contact |
| Chat PreOverlay | 40% | Gradient a remplacer, DaisyUI a supprimer, 5 champs a reduire, declenchement a changer |
| Pages interieures | 80% | Coherence Design.md OK, pas de ref Stitch |

---

## Phase 0 — Corrections Urgentes Soft Shadows (Priorite Immediate)

> Detectees par l'agent `pre-commit-validator` le 2026-03-29 sur les fichiers actuellement modifies.

### 0.1 Header — Suppression soft shadows

**Fichier** : `components/layout/header.tsx`

**Violations detectees** :
- **Ligne 87** : `shadow-lg` sur le header scrolle (`bg-white/95 backdrop-blur-md shadow-lg`)
- **Ligne 207** : `shadow-2xl` sur le dropdown menu (`dropdown-content ... shadow-2xl`)

**Corrections** :
- [ ] **L87** : Remplacer `shadow-lg` par `shadow-[0_2px_0_0_#1F2937/10]` (ombre fine Monolithe) ou supprimer (le `backdrop-blur-md` + `border-b` suffit pour la separation visuelle)
- [ ] **L207** : Remplacer `shadow-2xl` par `shadow-[4px_4px_0_0_#1F2937]` (hard shadow Monolithe coherente avec les boutons)
- [ ] Mettre a jour les tests si des assertions CSS sont impactees

**Risque** : Faible — corrections CSS ponctuelles sur 2 lignes

---

### 0.2 Page Assistants Vocaux IA — Suppression drop-shadow

**Fichier** : `app/nos-services/assistants-vocaux-ia/page.tsx`

**Violation detectee** :
- **Ligne 32** : `drop-shadow-2xl` sur le titre H1 Hero (`font-black text-white mb-6 drop-shadow-2xl`)

**Correction** :
- [ ] Supprimer `drop-shadow-2xl` du H1 — le Design System Monolithe n'utilise pas de text shadows. Le contraste `text-white` sur fond sombre suffit.
- [ ] Verifier visuellement que le titre reste lisible sans le drop-shadow

**Risque** : Faible — suppression CSS ponctuelle sur 1 ligne

---

### 0.3 Scan global — Autres soft shadows residuelles

**Action** : Scanner l'ensemble du projet pour d'autres soft shadows residuelles hors Design System.

- [ ] `grep -r "shadow-lg\|shadow-xl\|shadow-2xl\|drop-shadow-2xl" components/ app/ --include="*.tsx"` — corriger chaque occurrence
- [ ] Exclure `globals.css` (les definitions `.monolith-btn` et `.shadow-premium` sont autorisees)
- [ ] Exclure les fichiers dans `components/hubspot/legacy/` (dette technique identifiee, pas dans le scope)

**Risque** : Faible a Moyen — nombre d'occurrences a determiner lors du scan

---

## Phase 1 — Alignement Homepage (Priorite Haute)

### 1.1 Stats Section — Style Stitch avec KPIs Metier

**Fichier** : `components/stats-section.tsx`

**Decision** : Conserver les KPIs actuels (30% / 15 Ans / <2h / 0) car les donnees Stitch (99.9%, 0EUR, 24/7, +12k) ne correspondent pas au business reel d'E2I VoIP. Seul le **style visuel** du template Stitch est applique.

**Actions** :
- [ ] Conserver les donnees KPI actuelles (inchangees)
- [ ] Ajouter `py-32` au lieu de `py-24` (espacement vertical Stitch)
- [ ] Verifier l'alternance de couleurs `text-[#091421]` / `text-red-primary`
- [ ] Appliquer `tracking-[0.3em]` sur les micro-labels et `tracking-tighter` sur les chiffres

**Risque** : Faible — ajustements CSS uniquement, donnees inchangees

---

### 1.2 Section Clients — Titre & Espacement

**Fichier** : `components/clients-carousel.tsx`

**Ecarts** :
- Le template Stitch utilise `tracking-[0.2em]` sur le titre "ILS NOUS FONT CONFIANCE" et une disposition en grille 6 colonnes
- Le carousel anime est une **amelioration UX** conservee, mais le titre et l'espacement doivent s'aligner

**Actions** :
- [ ] Ajouter `tracking-[0.2em]` au titre de section
- [ ] Augmenter `py` a `py-24` pour correspondre au template
- [ ] Verifier que le fond est `bg-white` strict (pas de gris)

**Risque** : Faible

---

### 1.3 Section Solutions Phares — Lignes Rouges Decoratives & Espacement (VALIDE)

**Fichier** : `components/services-section-simple.tsx`

**Decision validee** : Ajouter les lignes rouges decoratives du template Stitch partout ou elles manquent dans le projet. Ce sont des marqueurs visuels forts de l'identite E2I.

**Reference Stitch** : `<div class="h-2 w-32 bg-primary-container"></div>` — ligne rouge epaisse (8px de haut, 128px de large) positionnee a droite du titre de section via `flex justify-between items-end`.

**Actions** :
- [ ] Ajouter la ligne rouge decorative (`h-2 w-32 bg-red-primary`) a droite du titre "NOS SOLUTIONS PHARES" (flex justify-between items-end)
- [ ] Auditer les autres sections du projet pour ajouter des lignes rouges decoratives si manquantes (Hero, pages interieures)
- [ ] Verifier `min-h-[450px]` sur les tiles `col-span-2`
- [ ] Ajuster le tracking des boutons internes a `tracking-[0.2em]`
- [ ] Verifier `p-12` sur toutes les tiles

**Risque** : Moyen — impacts visuels importants, tests Playwright a verifier

---

### 1.4 Navigation — Separation "Devis en ligne" / "Contact" (VALIDE)

**Fichier** : `components/layout/header.tsx`

**Decision validee** : Adopter la separation du template Stitch avec deux elements distincts. Le bouton "Contact" recoit le style **shadow box monolithe** (`monolith-btn`) pour un impact visuel fort.

**Actions** :
- [ ] Separer le CTA actuel en deux elements distincts
- [ ] "Devis en ligne" -> lien texte avec `font-bold tracking-[-0.03em] uppercase text-sm`
- [ ] "Contact" -> bouton `monolith-btn` rouge avec hard shadow (`shadow-[4px_4px_0_0_#1F2937]`) + hover mecanique (`translate(2px,2px)` + shadow reduite)
- [ ] Adapter le menu mobile en consequence (2 actions distinctes)
- [ ] Mettre a jour les tests header (`tests/header-daisyui.test.tsx`, `tests/header-submenu.test.tsx`)

**Risque** : Moyen — Header critique, tests unitaires et E2E nombreux

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
- [ ] **Bouton** : Remplacer `bg-gradient-to-br from-red-primary to-blue-marine` par `bg-red-primary` + `shadow-[4px_4px_0_0_#1F2937]` + hover mecanique
- [ ] **Texte "Une question ?"** : Appliquer `rounded-none shadow-[3px_3px_0_0_#1F2937]` + `text-xs font-black uppercase tracking-[0.2em]`
- [ ] **Formulaire carte** : `bg-white rounded-none shadow-[6px_6px_0_0_#1F2937] border border-gray-200`
- [ ] **Titre formulaire** : `font-black uppercase tracking-[0.2em] text-sm text-[#091421]`
- [ ] **Inputs** : `rounded-none bg-gray-50 border border-gray-200`, focus `border-b-2 border-red-primary`
- [ ] **Supprimer** les classes DaisyUI (`input input-bordered`, `btn btn-ghost`, `btn btn-primary`)
- [ ] **Reduire a 3 champs** : Supprimer `lastName` et `phone` du formulaire
- [ ] **Schema Zod** : Mettre a jour `lib/validation/chat-intake.ts` (retirer `lastName` et `phone`)
- [ ] **API route** : Adapter `app/api/hubspot/ingest-conversation/route.ts` si necessaire (champs optionnels)
- [ ] **Bouton CTA** : Monolithe Primaire pleine largeur + hard shadow
- [ ] **Lien Annuler** : Remplacer `btn btn-ghost` par `text-sm text-gray-secondary hover:text-[#091421]`
- [ ] **Intersection Observer** : Remplacer le declenchement immediat par un observer sur le sentinel post-Hero
- [ ] **Mettre a jour les tests** (voir Phase 6.2)

**Risque** : Moyen-Eleve — Composant global (layout.tsx), schema Zod modifie, API route potentiellement impactee, 4 specs Playwright + 1 test Jest a adapter

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
- [ ] Appliquer `bg-white` strict sur le footer (verifier pas de gris/sombre)
- [ ] Titres de colonnes : `text-[10px] font-black uppercase tracking-[0.3em] text-red-primary`
- [ ] Liens : `text-sm text-gray-secondary hover:text-[#091421]`
- [ ] Newsletter : input `rounded-none` + bouton carre rouge avec icone send
- [ ] Sub-footer : `text-[10px] font-black uppercase tracking-widest` + `border-t border-secondary/10`
- [ ] **Retirer** le badge/logo 3CX Silver Partner du footer
- [ ] Verifier `py-20 px-8` sur le footer (comme template Stitch)
- [ ] Mettre a jour les tests footer (`tests/footer.test.tsx`)

**Risque** : Moyen — Footer teste, retrait logo 3CX impacte les tests

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
- [ ] Auditer chaque composant pour verifier le tracking
- [ ] Corriger les ecarts (principalement boutons et labels)
- [ ] Verifier `font-black` (900) vs `font-bold` (700) sur les titres

**Risque** : Faible — ajustements CSS uniquement

---

## Phase 4 — Dropdowns DaisyUI (Priorite Basse)

### 4.1 Override Rounded sur Dropdowns

**Fichier** : `components/layout/header.tsx` + `app/globals.css`

**Ecart** : Les dropdowns DaisyUI utilisent `rounded-box` au lieu de `rounded-none`

**Actions** :
- [ ] Creer un override CSS cible : `.dropdown-content { border-radius: 0 !important; }`
- [ ] OU remplacer les composants dropdown DaisyUI par des composants custom
- [ ] Verifier visuellement (Playwright screenshot)

**Risque** : Faible

---

## Phase 5 — Pages Interieures (Priorite Basse)

### 5.1 Harmonisation des Pages Service

**Fichiers** :
- `app/nos-services/assistants-vocaux-ia/page.tsx`
- `app/studio-attente/page.tsx`
- `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx`
- `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`

**Aucun template Stitch dedie** — ces pages doivent suivre les principes du `Design.md`.

**Actions de verification** :
- [ ] S'assurer que toutes les sections sombres utilisent `.monolith-grid-lines`
- [ ] Verifier que les Hero de chaque page utilisent le fond `#091421` (surface-dim)
- [ ] Confirmer `rounded-none` sur toutes les cartes et boutons
- [ ] Verifier les spacings verticaux (minimum `py-16` entre sections)
- [ ] S'assurer que les CTA utilisent `.monolith-btn` avec hard shadows
- [ ] Ajouter des elements decoratifs (skew blocks, dot patterns) si absents

**Risque** : Moyen — plusieurs fichiers, tests E2E existants

---

## Phase 6 — Tests & Validation (Obligatoire apres chaque phase)

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

### 2025-10-21 — Plan initial (obsolete)

- Hero 3CX : logo officiel centre + CTA centres
- Embed Tally : ajout `src` direct pour Playwright
- Actions futures : warnings React, props `sizes` images, contenu services

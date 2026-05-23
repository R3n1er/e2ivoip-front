# Audit design — Phase 1

**Date :** 2026-05-23  
**Périmètre :** Home (`app/page.tsx`), hero, header, section services, tokens Tailwind, charte `docs/CHARTE_GRAPHIQUE.md`  
**Méthode :** Revue code + critères `design-taste-frontend` (adaptés à la charte E2I) + Playwright (services) + capture navigateur locale  

**Légende charte :** Les règles **PRD / CLAUDE.md** (dégradé hero bleu→rouge) priment sur l’exemple simplifié de `CHARTE_GRAPHIQUE.md` (`from-red-primary to-blue-marine`).

---

## Synthèse exécutive

| Pilier | Score | Commentaire |
|--------|-------|-------------|
| Alignement charte (couleurs / logo) | **5/10** | Tokens officiels présents mais peu respectés dans les composants actifs |
| Typographie & hiérarchie | **7/10** | Geist (bon choix) ; titres parfois en `gray-900` au lieu de `gray-dark` |
| Layout & grilles | **6/10** | Grille 3 colonnes × 5 cartes services ; hero centré (acceptable marque) |
| Composants (CTA, cartes) | **8/10** | Boutons Monolithe (`CTAButton`) cohérents ; DaisyUI bien thémé |
| Motion & décoration | **5/10** | Blobs animés + indicateur scroll = motifs « AI slop » |
| Cohérence inter-pages | **5/10** | Mélange `red-primary` / `red-600` / `text-red-400` |
| Accessibilité | **7/10** | Contrastes globalement OK ; accents `gray-secondary` à surveiller |
| Fiabilité UI (runtime) | **6/10** | Build prod OK ; erreur dev observée sur `HeaderSimple` (voir P0) |

**Score global design system : 6,1 / 10** — base solide (Stitch / Monolithe), dette de tokens et quelques bugs UX.

---

## Ce qui fonctionne bien

1. **Thème DaisyUI `e2ivoip`** aligné sur les hex charte (`tailwind.config.js`).
2. **CTA Monolithe** (`components/ui/cta-button.tsx`) : rouge + bleu marine, tracking uppercase, tracking PostHog.
3. **Hero gradient obligatoire** présent : `from-blue-900/85 via-blue-800/80 to-red-600/85` (`homepage-hero-section-simple.tsx`).
4. **Header desktop à `lg`** conforme à `AGENTS.md`.
5. **Tests Playwright services** : alignement boutons cartes OK (`services-cards-alignment.spec.ts`).
6. **Police Geist** dans `app/layout.tsx` — conforme aux bonnes pratiques anti-Inter.

---

## Écarts charte vs implémentation

### P0 — Bloquants ou trompeurs

| # | Constat | Fichier(s) | Attendu charte / produit |
|---|---------|------------|-------------------------|
| 1 | **Logo header E2I inversé** : `E` et `I` en rouge, `2` en bleu marine | `components/layout/header-simple.tsx` L73–75 | `E`/`I` = `#2D3848`, `2` = `#E53E3E` |
| 2 | **Lien 404** carte « 3CX SMB PRO » → `/telephonie-entreprise/3cx-smb-pro` | `services-section-simple.tsx` L37 | Route réelle : `/telephonie-entreprise/3cx-smb-mutualisee` |
| 3 | **Lien studio incorrect** → `/nos-services/studio-attente` | `services-section-simple.tsx` L82 | Canonique : `/studio-attente` |
| 4 | **Runtime dev** : `TypeError` au rendu de `<HeaderSimple />` | `app/layout.tsx` L70 | Page blanche + overlay Next en dev (build `npm run validate` OK) |

### P1 — Dette design system (haute priorité)

| # | Constat | Impact |
|---|---------|--------|
| 5 | **Palette Tailwind générique** : `red-600`, `blue-900`, `gray-900`, `text-red-400` au lieu de `red-primary`, `blue-marine`, `gray-dark` | Incohérence visuelle, maintenance difficile |
| 6 | **Doublon sémantique hero** : badge « Opérateur télécom DOM • 100+ clients » + sous-titre Trunk SIP DOM | Règle `AGENTS.md` : éviter répétition badge / intro |
| 7 | **Grille services** : `lg:grid-cols-3` avec **5 cartes** → dernière ligne incomplète | Hiérarchie visuelle faible ; préférer 2+2+1 ou carrousel |
| 8 | **Accents manquants** contact : « Pret a economiser », « couts telecoms » | Qualité perçue / SEO local FR |
| 9 | **`min-h-screen`** sur hero au lieu de `min-h-[100dvh]` | Saut de layout possible iOS Safari |
| 10 | **Header toujours blanc** (`bg-white/95`) | Charte : header gris foncé non scrollé → blanc au scroll ; comportement actuel simplifié mais non documenté |

### P2 — Polish (design-taste, non bloquant charte)

| # | Constat | Recommandation |
|---|---------|----------------|
| 11 | Blobs décoratifs jaune/bleu/rouge animés (`app/page.tsx`) | Remplacer par fond sobre charte ou motif `pattern-dots` existant |
| 12 | Indicateur scroll « Découvrir » + chevron | Supprimer ou réduire (anti-pattern taste) |
| 13 | Titre hero avec `bg-clip-text` dégradé sur « Économisez 20% » | Préférer `text-red-primary` plein (charte) |
| 14 | `globals.css` : classes `.gradient-*` avec `green-600`, `orange-500` | Hors charte — déprécier ou aligner |
| 15 | Composants legacy (`contact-section.tsx`, `header.tsx`) avec `red-600` | Auditer usage ; retirer ou harmoniser |

---

## Inventaire tokens (référence Phase 2 → `DESIGN.md`)

| Token charte | Hex | Usage code observé |
|--------------|-----|-------------------|
| `red-primary` | `#E53E3E` | CTAs, accents — **OK** |
| `blue-marine` | `#2D3848` | CTAButtonMarine, logo partiel — **OK** |
| `gray-secondary` | `#818096` | Sous-titres — **OK** |
| `gray-dark` | `#1F2937` | `body`, parfois remplacé par `gray-900` |
| Hero overlay | PRD gradient bleu/rouge | **OK** (≠ exemple charte red→blue) |

---

## Scoring design-taste (calibré E2I)

Baseline taste : Variance **8**, Motion **6**, Density **4** — **sous réserve charte**.

| Règle taste | Verdict | Note E2I |
|-------------|---------|----------|
| Pas d’Inter | ✅ | Geist |
| Max 1 accent | ⚠️ | Rouge + bleu marine = identité légitime (2 accents marque) |
| Hero non centré si variance > 4 | ⚠️ | Hero centré accepté si charte/Stitch le impose |
| Pas de grille 3 cartes générique | ❌ | Section services |
| `min-h-[100dvh]` | ❌ | Hero en `min-h-screen` |
| Pas de filler scroll | ❌ | « Découvrir » présent |
| Tokens cohérents | ❌ | Voir P1 #5 |

---

## Preuves navigateur (2026-05-23)

- Capture : `tests/screenshots/design-audit-home-hero.png`
- En **dev** (`localhost:3000`) : overlay `Runtime TypeError` sur `HeaderSimple` — **à investiguer** (hydratation / import client).
- Playwright services : **8/8 PASS** sur alignement cartes.

---

## Plan d’amélioration (Phase 3 — aperçu)

### P0 — Semaine 1 (correctifs ciblés)

1. Corriger couleurs logo `header-simple.tsx`.
2. Corriger hrefs services (`3cx-smb-mutualisee`, `/studio-attente`).
3. Diagnostiquer erreur dev `HeaderSimple` (repro + fix).
4. Accents FR section contact.

**Tests :** `npm test`, `npx playwright test tests/playwright/services-*.spec.ts`, smoke home.

### P1 — Semaine 2 (design system)

1. Remplacer `red-600` / `gray-900` par tokens charte sur composants **actifs** (home, header, services, contact-simple).
2. Réorganiser grille services (4+1 ou 2 colonnes desktop).
3. Alléger hero : badge OU intro DOM (pas les deux).
4. `min-h-[100dvh]` sur hero.

**Livrable :** `docs/DESIGN.md` (Phase 2).

### P2 — Semaine 3+ (polish)

1. Retirer blobs / scroll indicator home.
2. Nettoyer `globals.css` (gradients hors charte).
3. Audit pages services (`telephonie-entreprise/*`) pour tokens + héros.
4. Option : motion légère Framer sur cartes (si `framer-motion` déjà installé).

---

## Prochaine étape

**Phase 2 :** ✅ `docs/DESIGN.md` v1.0 rédigé (2026-05-23).

**Phase 3 :** ✅ correctifs P0–P2 home/header/services/contact appliqués (2026-05-23). Reste : harmonisation pages `telephonie-entreprise/*`, dépréciation gradients `globals.css`.

**Permission :** modification de `CHARTE_GRAPHIQUE.md` non requise pour P0–P1 ci-dessus ; toute évolution de la charte reste soumise à validation explicite.

---

## Fichiers clés audités

- `app/page.tsx`
- `components/homepage-hero-section-simple.tsx`
- `components/layout/header-simple.tsx`
- `components/services-section-simple.tsx`
- `components/contact-section-simple.tsx`
- `components/ui/cta-button.tsx`
- `tailwind.config.js`, `app/globals.css`
- `docs/CHARTE_GRAPHIQUE.md`

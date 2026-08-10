# Design System — E2I VoIP

**Version :** 1.1 (2026-08-09 — corrections ponctuelles ; base v1.0 du 2026-05-23)  
**Statut :** Spécification normative pour Stitch, `agents.md` et le développement UI  
**Précédence :** `docs/CHARTE_GRAPHIQUE.md` > `DESIGN.md` (racine) > ce document > guides génériques  
**Audit source :** `docs/DESIGN-AUDIT.md` (phase 1)

> ⚠️ **Lire d'abord `DESIGN.md` à la racine du projet.** C'est le fichier que les agents chargent automatiquement, et il reflète l'état réel du code (audit du 2026-06-11 + consolidation du 2026-08-09). Le présent document reste la spécification versionnée de référence, mais certaines de ses sections décrivent des cibles de migration désormais atteintes ou dépassées — voir §10.
>
> Contexte stratégique (cibles, ton, anti-références) : `PRODUCT.md` à la racine.

---

## 1. Visual Theme & Atmosphere

**Positionnement :** Opérateur de services télécom · Spécialiste des DOM (Guadeloupe, Martinique, Guyane, La Réunion).

**Atmosphère cible :** Interface B2B professionnelle, rassurante et moderne — style **Monolithe / Google Stitch** : blocs nets, CTA uppercase à fort contraste, peu de fioritures. Pas de look « startup IA » (blobs colorés, néons, dégradés arc-en-ciel).

**Dials calibrés E2I** (taste adapté à la charte) :

| Dial | Valeur | Interprétation |
|------|--------|----------------|
| Variance layout | 6/10 | Hero centré accepté ; sections intérieures en grilles régulières |
| Motion | 4/10 | Transitions CSS courtes ; pas de scroll gimmicks |
| Density | 5/10 | Équilibre marketing : sections aérées, cartes services denses |

**Références visuelles :** maquette Stitch, `components/layout/header-simple.tsx`, `components/ui/cta-button.tsx`.

---

## 2. Color Palette & Roles

### 2.1 Tokens officiels (obligatoires)

Utiliser **uniquement** ces noms sémantiques — pas `red-600`, `blue-900`, `gray-900` sur les composants actifs.

| Nom sémantique | Hex | Rôle |
|----------------|-----|------|
| **Rouge principal** `red-primary` | `#E53E3E` | CTA primaire, chiffre « 2 » du logo, accents « IP », hover liens, badges DaisyUI `primary` |
| **Bleu marine** `blue-marine` | `#2D3848` | CTA secondaire, lettres « E » et « I » du logo, sous-titres, `accent` DaisyUI |
| **Gris secondaire** `gray-secondary` | `#818096` | Texte secondaire, baseline logo, métadonnées |
| **Gris foncé** `gray-dark` | `#1F2937` | Corps de texte, titres sur fond clair, `neutral` DaisyUI |
| **Blanc** `white` | `#FFFFFF` | Fonds, header scrollé, texte sur hero |

**Classes Tailwind :** `text-red-primary`, `bg-red-primary`, `text-blue-marine`, `bg-blue-marine`, `text-gray-secondary`, `text-gray-dark`, etc.  
**Variables CSS :** `:root` dans `app/globals.css`.  
**DaisyUI :** `data-theme="e2ivoip"` — thème `e2ivoip` dans `tailwind.config.js`.

### 2.2 Logo E2I (non négociable)

```
E  → blue-marine (#2D3848)
2  → red-primary (#E53E3E)
I  → blue-marine (#2D3848)
```

Implémentation de référence : `components/layout/header-simple.tsx` (à corriger si inversion détectée — voir §10).

### 2.3 Hero — overlay photo (non négociable produit)

Sur les heroes avec image de fond, l’overlay **doit** être :

```html
bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85
```

> **Note :** Ce dégradé PRD/CLAUDE diffère de l’exemple simplifié `from-red-primary to-blue-marine` dans `CHARTE_GRAPHIQUE.md`. **Le dégradé bleu→rouge semi-transparent prime** sur les pages marketing actuelles.

Fichier de référence : `components/homepage-hero-section-simple.tsx`.

### 2.4 Couleurs interdites sur nouveaux composants

- Vert / orange / jaune décoratif (`green-600`, `yellow-100`, blobs animés)
- Violet / néon « AI slop »
- `#000000` pur — utiliser `gray-dark`
- Dégradés hors charte dans `globals.css` (`.gradient-primary-red-green`, etc.) — **dépréciés**, ne pas réutiliser

### 2.5 Contraste & accessibilité

- Texte principal : `gray-dark` sur `white` ✅
- `gray-secondary` sur blanc : contraste moyen ⚠️ — réserver aux métadonnées, pas aux paragraphes longs
- Rouge principal : réservé aux accents et CTA, pas aux grands blocs de texte

---

## 3. Typography Rules

### 3.1 Familles

| Rôle | Police | Source |
|------|--------|--------|
| **Sans (UI + marketing)** | Inter — police officielle, cohérence logo E2I | `next/font/google` — `app/layout.tsx` |
| **Mono** | IBM Plex Mono — données chiffrées | `next/font/google` — `app/layout.tsx` |

**Pas de serif** sur l’UI produit. Inter est la police de marque (logo E2I), inscrite à `CHARTE_GRAPHIQUE.md`.

### 3.2 Échelle & hiérarchie

| Élément | Classes de référence | Couleur |
|---------|----------------------|---------|
| H1 hero | `text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight` | `text-white` sur hero |
| Accent titre hero | span en `text-red-primary` (éviter `bg-clip-text` dégradé) | |
| H2 section | `text-3xl md:text-4xl font-black tracking-[-0.04em]` | `text-gray-dark` |
| H2 contact (Monolithe) | `text-4xl font-black tracking-[-0.04em] leading-[0.95]` | |

> **Mis à jour le 2026-08-09.** Le style « monolithe » a été généralisé à tous les H2 le 2026-06-11 (75 titres migrés, commit `eac6b2d`). L'ancienne prescription `font-bold` réservée aux sections courantes est caduque.
| Corps | `text-base` à `text-xl`, `leading-relaxed` | `text-gray-secondary` ou `text-gray-dark` |
| CTA label | `text-sm font-black uppercase tracking-[0.2em]` | blanc sur fond rouge/marine |

**Largeur de lecture :** `max-w-3xl` à `max-w-4xl` pour les intros ; ~65 caractères cible sur paragraphes longs.

### 3.3 Contenu & SEO local

- Cibler explicitement **Guadeloupe, Martinique, Guyane, La Réunion / DOM** sur home et pages services
- **Ne pas répéter** la même promesse DOM entre le badge hero et le paragraphe d’intro (une seule couche sémantique)
- Français correct : accents obligatoires (« Prêt à économiser », « coûts télécoms »)

---

## 4. Component Stylings

### 4.1 Boutons CTA (Monolithe)

**Composants :** `CTAButton`, `CTAButtonMarine`, `CTAButtonSecondary` — `components/ui/cta-button.tsx`

| Variante | Fond | Usage |
|----------|------|--------|
| Primaire | `bg-red-primary` | Action principale (devis, contact) |
| Marine | `bg-blue-marine` | Action secondaire (découvrir offre, lecture) |
| Secondaire | `bg-white text-[#091421]` | Sur fond sombre / hero |

**Structure :** wrapper `monolith-btn` + span interne `px-10 py-4`.  
**Analytics :** `trackEvent('cta_click', …)` via `usePathname`.

**États :** hover via transition DaisyUI/Tailwind ; pas de glow néon. `:active` léger (`scale-[0.98]` optionnel).

### 4.2 Header

**Composant actif :** `components/layout/header-simple.tsx`

| Règle | Valeur |
|-------|--------|
| Breakpoint desktop | `lg` (1024px) — nav horizontale |
| Mobile | Hamburger uniquement `< lg` |
| Position | `fixed top-0 z-[100]` |
| Fond actuel (documenté) | `bg-white/95 backdrop-blur-md shadow-lg` |
| Fond cible charte (migration) | `gray-dark` au repos → `white` au scroll |
| Logo | Couleurs §2.2 |
| Liens | `text-gray-700 hover:text-red-primary` |
| Sous-menus | `bg-white rounded-xl shadow-2xl`, hover `bg-red-50` |

### 4.3 Hero (home)

**Composant :** `components/homepage-hero-section-simple.tsx`

- Hauteur : **`min-h-[100dvh]`** (cible) — remplacer `min-h-screen`
- Image : `object-cover`, overlay §2.3
- Layout : centré (exception variance pour la marque)
- Badge : discret `bg-red-primary/10 border-red-primary/20` — **ne pas dupliquer** le message DOM du sous-titre
- Stats : grille `grid-cols-2 md:grid-cols-4`
- **À retirer (migration) :** indicateur « Découvrir » + chevron scroll

### 4.4 Cartes services

**Composant :** `components/services-section-simple.tsx`

- Conteneur : `card bg-base-100 shadow-xl` (DaisyUI)
- Icône : carré `bg-red-100`, icône `text-red-primary`
- Badge : `badge badge-primary`
- Liste features : `CheckCircle` (Phosphor, via `@/lib/icons`) en `text-success`
- **Alignement CTA :** `flex flex-col h-full` + `mt-auto` sur `card-actions` (tests Playwright)
- **Grille cible :** éviter `lg:grid-cols-3` avec 5 items — préférer `md:grid-cols-2` + carte pleine largeur ou rangée 2+2+1

**Liens canoniques (produits) :**

| Carte | href correct |
|-------|----------------|
| Trunk SIP DOM | `/telephonie-entreprise/trunk-sip-compteur` |
| 3CX SMB PRO | `/telephonie-entreprise/3cx-smb-mutualisee` |
| 3CX PRO Cloud | `/3cx-cloud` |
| Trunk SIP agents IA | `/telephonie-entreprise/trunk-sip-agents-ia` |
| Studio | `/studio-attente` |

### 4.5 Formulaires & HubSpot

- Champs : label au-dessus, erreur en dessous
- Embeds HubSpot : cartes avec header `from-red-primary to-blue-marine` (`hubspot-form-simple.tsx`)
- États chargement : texte discret, pas de spinner générique plein écran

### 4.6 Icônes

> **Corrigé le 2026-08-09.** Ce document indiquait « Lucide React » ; la librairie réellement installée est `@phosphor-icons/react` (`package.json`). Aucune dépendance Lucide n'existe dans le projet.

- **Phosphor Icons** (`@phosphor-icons/react`) — importer exclusivement depuis `@/lib/icons` (barrel centralisé), jamais directement depuis le paquet
- `weight="bold"` appliqué globalement via `IconContext.Provider` dans `layout-client-chrome.tsx` ; `weight="fill"` explicite conservé là où il est sémantique (étoiles, coches pleines)
- Échelle : 16 / 24 / 32 px
- Pas d’emojis dans le markup ; pas de classes `lni-*` (Line Icons retiré du projet)

---

## 5. Layout Principles

### 5.1 Conteneurs

- Largeur max : `max-w-7xl mx-auto`
- Padding horizontal : `px-4 sm:px-6 lg:px-8`
- Sections marketing : `py-20` (ajuster avec `clamp` si besoin)

### 5.2 Grilles

- **Préférer CSS Grid** à la math flex (`grid-cols-1 md:grid-cols-2 lg:grid-cols-…`)
- **Interdit sur nouveaux blocs :** rangée 3 cartes égales générique sans justification
- Mobile `< 768px` : une colonne, pas de scroll horizontal

### 5.3 Fond de page (home)

- **Cible :** `bg-white` ou `bg-gray-50` sobre
- **À retirer :** blobs `animate-blob` jaune/bleu (`app/page.tsx`)

### 5.4 Header offset

- `main` avec `pt-16` (64px) pour compenser header fixe `h-16 lg:h-20`

---

## 6. Motion & Interaction

| Niveau | Règle E2I |
|--------|-----------|
| Par défaut | `transition-all duration-200` ou `duration-300` sur hover cartes/liens |
| Hero | Pas d’animation scroll « Découvrir » |
| Carousel clients | `animate-scroll-left` 60s — OK si performant |
| Framer Motion | Déjà en dépendance — isoler en `'use client'`, pas sur RSC parents |
| Interdit | `window scroll` listeners, animation `top/left/width/height`, grain sur conteneurs scrollables |

**Spring / stagger :** optionnel phase 2 polish — pas requis pour conformité charte.

---

## 7. Anti-Patterns (Banned)

### Identité & tokens

- ❌ `red-600`, `blue-700`, `gray-900` sur nouveaux PRs (utiliser tokens §2.1)
- ❌ Logo E2I avec couleurs inversées
- ❌ Modifier `CHARTE_GRAPHIQUE.md` sans permission explicite

### UI générique (AI slop)

- ❌ Emojis dans le code ou le contenu UI
- ❌ Blobs/flous décoratifs multicolores
- ❌ « Scroll to explore », chevrons bounce, filler scroll
- ❌ Dégradé sur gros titres (`bg-clip-text`) sauf décision produit
- ❌ Grille 3 colonnes × N cartes sans traitement de la dernière ligne
- ❌ `h-screen` sur hero pleine page (utiliser `min-h-[100dvh]`)

### Contenu

- ❌ « Elevate », « Seamless », « Next-Gen » et clichés IA
- ❌ Répétition badge hero = paragraphe intro (même angle DOM)
- ❌ URLs produit obsolètes (`/mobilite`, `/3cx-smb-pro`, `/nos-services/studio-attente`)

### Technique

- ❌ Importer une lib d’icônes non listée dans `package.json`
- ❌ Composants client lourds dans le tree RSC sans isolation

---

## 8. Responsive & Breakpoints

| Token | px | Usage |
|-------|-----|--------|
| `sm` | 640 | Padding, typo |
| `md` | 768 | 2 colonnes, collapse asymétrie |
| `lg` | 1024 | **Navigation desktop**, grilles 3 col si justifié |
| `xl` | 1280 | Titres hero max |

**Touch targets :** min 44×44px sur liens et boutons mobile.

---

## 9. Implementation Map

| Zone | Fichier(s) principal(aux) |
|------|---------------------------|
| Layout racine | `app/layout.tsx`, `app/globals.css` |
| Home | `app/page.tsx`, `components/homepage-hero-section-simple.tsx` |
| Services home | `components/services-section-simple.tsx` |
| Header / footer | `components/layout/header-simple.tsx`, `components/layout/footer.tsx` |
| CTA | `components/ui/cta-button.tsx` |
| Tokens Tailwind | `tailwind.config.js` |
| Tests alignement | `tests/playwright/services-cards-alignment.spec.ts` |

**Composants legacy** (harmoniser ou retirer) : `header.tsx`, `contact-section.tsx`, `pricing-tiers.tsx`.

---

## 10. Known Gaps & Migration Backlog

Aligné sur `docs/DESIGN-AUDIT.md` — à traiter en phase 3 (code).

### P0 — ✅ fait (2026-05-23)

1. ~~Couleurs logo header~~  
2. ~~Hrefs cartes services~~  
3. `TypeError` dev `HeaderSimple` — non reproduit après validate ; surveiller en local  
4. ~~Accents FR contact~~

### P1 — ✅ fait (home)

5. Tokens charte sur hero, services, contact (partiel site)  
6. ~~Grille 5 cartes → 2 col + 5e centrée~~  
7. ~~Badge / intro hero dédupliqués~~  
8. ~~`min-h-[100dvh]` hero~~

### P2 — ✅ fait (home)

9. ~~Blobs + scroll indicator home~~  
10. Déprécier `.gradient-*` dans `globals.css` — **à faire**  
11. Audit pages `telephonie-entreprise/*` — **à faire**

---

## 11. References

| Document | Rôle |
|----------|------|
| `docs/CHARTE_GRAPHIQUE.md` | Couleurs et logo — **autorité légale** |
| `docs/DESIGN-AUDIT.md` | Constats et scores phase 1 |
| `docs/PRD.md` | Dégradé hero, parcours produit |
| `CLAUDE.md` / `AGENTS.md` | Règles agents, process livraison |
| `docs/CHARTE_GRAPHIQUE.md` | Ne pas confondre avec `Design.md` (absent) — ce fichier le remplace |

---

## Pour les agents & Stitch

**Prompt court à injecter :**

> Site E2I VoIP — télécom B2B DOM. Tokens : red-primary #E53E3E, blue-marine #2D3848, gray-dark #1F2937. Hero overlay `from-blue-900/85 via-blue-800/80 to-red-600/85`. CTA Monolithe uppercase Inter. Pas d’emojis, pas de red-600, pas de blobs. Header desktop à lg. Voir `docs/DESIGN.md`.

**Stitch :** utiliser ce fichier comme `DESIGN.md` projet ; les écrans générés doivent respecter §2 et §4 avant toute créativité layout (§1 dials).

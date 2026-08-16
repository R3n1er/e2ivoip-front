# Design System : E2I VoIP

**Projet :** e2ivoip-front (Next.js 16 App Router · Tailwind v3 · DaisyUI · shadcn/ui · Framer Motion)
**Source de vérité couleurs :** `docs/CHARTE_GRAPHIQUE.md` (règle absolue — ne jamais sortir de la charte)
**Contexte stratégique :** `PRODUCT.md` (racine) — cibles, ton, anti-références, principes
**Dernière analyse :** 2026-08-15 — audit technique « impeccable » (a11y, perf, theming, responsive, anti-patterns) : **20/20**
**Analyse précédente :** 2026-06-11 — grille « design-taste » (variance 8 / motion 6 / densité 4)
**Consolidation :** 2026-08-09 — blocs normatifs remontés depuis `docs/DESIGN.md` (v1.0, 2026-05-23)

**Précédence :** `docs/CHARTE_GRAPHIQUE.md` > ce document > `docs/DESIGN.md` > guides génériques.
Ce fichier est celui que lisent les agents (résolution racine). `docs/DESIGN.md` reste la spécification versionnée de référence pour Stitch et `agents.md`.

---

## 1. Thème visuel & atmosphère

Site vitrine B2B télécom, **clair, confiant et institutionnel**. Fond blanc dominant, sections aérées (`py-16`/`py-20`), conteneurs `max-w-7xl`. L'identité repose sur un duo à fort contraste : un **rouge corail énergique** réservé à l'action, posé sur des **bleus-gris ardoise** qui portent le sérieux. L'ensemble vise « opérateur télécom de confiance », pas « startup SaaS ».

Le hero d'accueil superpose une photo métier à un voile dégradé bleu nuit → rouge — **élément verrouillé par le PRD** :

```
bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85
```

Densité actuelle : ~4/10 (app quotidienne, ni galerie ni cockpit). Motion : discret, concentré sur le header et les CTA.

---

## 2. Palette & rôles

### Couleurs officielles (charte — intouchables)

| Nom descriptif | Hex | Token | Rôle fonctionnel |
|---|---|---|---|
| Rouge corail signal | `#E53E3E` | `red-primary` | CTA, accents, hover de liens, le « 2 » et « IP » du logo |
| Ardoise marine profonde | `#2D3848` | `blue-marine` | Boutons secondaires, sous-titres, « E » et « I » du logo |
| Gris lavande discret | `#818096` | `gray-secondary` | Baseline, textes secondaires, « VO » du logo |
| Charbon doux | `#1F2937` | `gray-dark` | Texte principal, header non scrollé |
| Blanc pur | `#FFFFFF` | `white` | Fonds, inversions, header scrollé |

### Mapping logo E2I (non négociable)

```
E  → blue-marine   (#2D3848)
2  → red-primary   (#E53E3E)
I  → blue-marine   (#2D3848)
VO → gray-secondary (#818096)
IP → red-primary   (#E53E3E)
```

Implémentation de référence : `components/layout/header-simple.tsx`. Une inversion des couleurs du logo est un défaut bloquant, jamais une variante.

### Arbitrage du dégradé hero

Deux écritures coexistent dans la documentation. **Le dégradé semi-transparent du PRD prime** sur toutes les pages marketing :

```
bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85
```

L'exemple simplifié `from-red-primary to-blue-marine` de `CHARTE_GRAPHIQUE.md` est une illustration de principe, pas la valeur d'implémentation. Ne pas le substituer au dégradé PRD.

### Couleurs satellites en usage réel (hors charte, à officialiser ou purger — voir §8)

- Teintes Tailwind génériques : `red-50/100/600`, `blue-50/100/600/900`, `green-50/100`, `gray-50→800`
- Sémantiques DaisyUI déjà déclarées : `success #16A34A`, `warning #F59E0B`, `error #E53E3E`
- `text-red-300` (rouge éclairci) utilisé sur le hero sombre pour la lisibilité

---

## 3. Typographie

- **Famille :** `Inter` (sans, police officielle — cohérence avec le logo E2I) + `IBM Plex Mono` (données chiffrées), chargées via `next/font/google` dans `app/layout.tsx`
- **H1 hero :** `text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight` — grande échelle, blanc sur voile sombre, accent `text-red-300`
- **H2 — deux écoles concurrentes (incohérence à trancher) :**
  - Standard : `text-3xl md:text-4xl font-bold` (~30 occurrences)
  - « Monolith » : `text-4xl font-black tracking-[-0.04em] leading-[0.95]` (contact-section-simple, testimonials)
- **Corps :** `text-gray-600`/`text-gray-dark`, `leading-relaxed`, pas de `max-w-[65ch]` systématique
- **Chiffres clés :** `text-3xl font-bold font-mono tabular-nums` — IBM Plex Mono pour les données

---

## 4. Composants

### Boutons
- **CTA primaire (« monolith ») :** bloc plein rouge `bg-red-primary px-10 py-4 text-sm font-black uppercase tracking-[0.2em]` — signature forte, angles francs (`components/ui/cta-button.tsx`)
- **CTA marine :** même forme en `bg-blue-marine`
- **CTA inversé :** fond blanc, texte `#091421` (hex hors tokens, à remplacer par `blue-marine`/`gray-dark`)
- Variants concurrents : DaisyUI `btn btn-primary` (header), liens `rounded-lg bg-red-primary` (pages) — **5 écritures pour 3 intentions**
- Feedback : `whileHover scale 1.05` / `whileTap 0.95` sur certains, rien sur d'autres

### Cards / conteneurs — trois écoles concurrentes
1. DaisyUI : `card bg-base-100 shadow-xl hover:shadow-2xl`
2. shadcn : `<Card className="hover:shadow-lg transition-shadow">`
3. Custom : `bg-white p-6 rounded-lg shadow-sm border`

Rayons en usage : `rounded-lg` (61×, dominant), `rounded-full` (47×, badges/icônes), `rounded-xl` (19×), `rounded-2xl` (7×). Ombres : `shadow-sm` → `shadow-2xl` sans règle d'élévation.

### Formulaires
- shadcn `input.tsx`/`textarea.tsx` + react-hook-form + zod ; labels au-dessus, structure saine
- Embeds Tally/HubSpot : **7 fichiers `tally-*`** + variantes `.bak`/`.backup` — dette de variantes

### Icônes
- `@phosphor-icons/react` centralisé dans `lib/icons.ts` (86 icônes + alias) — très bon pattern
- Tailles 16/20/24/32 sans règle ; `weight` mixte (`bold`, `fill`)
- Résidus : classes `lni-` hardcodées (feature-card.tsx), 3 emojis dans le markup (❓ FAQ, ★ footer, 👋 popup)

---

## 5. Principes de layout

- **Conteneur :** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (18×) — mais `container mx-auto` concurrent (7×)
- **Heroes :** texte centré sur image sombre + voile dégradé (accueil, qui-sommes-nous) ; `min-h-[100dvh]` correctement utilisé
- **Grilles :** `md:grid-cols-2` (paires texte/visuel), `md:grid-cols-3` (features), `grid-cols-2 md:grid-cols-4` (stats) — le « 3 cards égales » est récurrent
- **Rythme vertical :** `py-20` (9×) vs `py-16` (8×) vs `py-12` (2×) — pas de règle

---

## 6. Motion

- **Framer Motion :** header (slide-in `y:-100→0`), dropdowns (`AnimatePresence` + spring), CTA (`scale`), sous-menus (`x:4`)
- **CSS custom :** `animate-scroll-left` (carousel clients 60 s), `animate-shake` (chat), `animate-pulse-soft` — ⚠️ ce dernier contient des ombres **rose/violet** (`rgba(236,72,153)` / `rgba(147,51,234)`) hors charte
- Durées en usage : 200/300/500 ms, non standardisées
- Sections principales : aucune apparition au scroll (entrées sèches)

---

## 7. Audit « taste » — synthèse

### Points forts (à protéger)
1. Inter via `next/font` — police officielle (logo E2I), optimale pour le web
2. Tokens couleurs charte présents dans Tailwind **et** CSS vars
3. Abstraction icônes `lib/icons.ts`
4. CTA « monolith » uppercase : une vraie signature, pas un bouton générique
5. `min-h-[100dvh]`, `max-w-7xl`, grilles CSS (pas de flex-math) — fondations saines

### AI tells / clichés — état au 2026-08-15
Tous les tells du relevé de juin sont résolus. Vérifié par grep sur `app/` et `components/` :

| Tell | Statut |
|---|---|
| Adresse placeholder « 123 Avenue des Télécoms » | ✅ supprimée |
| Ombres rose/violet dans `animate-pulse-soft` | ✅ supprimées |
| `.text-gradient` / `bg-clip-text` | ✅ 0 occurrence |
| `#091421` (hex hors tokens) | ✅ supprimé |
| Emojis et `✓` dans le markup | ✅ 0 occurrence (icônes Phosphor) |
| `h-screen` sur un hero | ✅ 0 occurrence |
| Bordures latérales colorées (`border-l-4`) | ✅ 0 occurrence |
| Fichiers `.bak` / `.backup` / `globals-backup.css` | ✅ 0 fichier |

Tells de *composition* conservés comme choix assumés : heroes centrés sur dégradé PRD (décision Alban 2026-06-12, cf. §8 P3.12) et grilles de cards courtes (le zig-zag n'a été appliqué que là où le contenu le justifiait, cf. P3.11).

### Dette de cohérence — résorbée
- Cards, H2, boutons, conteneurs, rythme vertical, icônes : unifiés (cf. §8 P2, juin 2026)
- **Variantes Tally : 9 fichiers → 2** (2026-08-15). Seuls `tally-embed-tarifs` (utilisé par `trunk-sip-compteur`) et `tally-tracking` subsistent ; les 7 autres étaient du code mort
- **14 fichiers morts supprimés** au total le 2026-08-15 : variantes Tally, composants images obsolètes (`lazy-component`, `lazy-background-image`, `integration-test`, `tawk-test`), `devis-hero-section`, `hubspot-form-inline`
- **Dette résiduelle connue :** la famille `optimized-image` → `optimized-blog-image` n'a plus aucun consommateur. Non supprimée : elle touche le blog, dont les pages peuvent évoluer. À trancher explicitement.

---

## 8. Améliorations recommandées — dans le respect strict de la charte

Priorisées. Aucune ne touche aux 5 couleurs officielles ni au hero gradient PRD.

### P1 — Corrections (hors-charte ou factuel) — ✅ TERMINÉ
1. ✅ **`globals.css` purgé** : classes de dégradés inutilisées et `animate-pulse-soft` (ombres rose/violet) supprimées
2. ✅ **Adresse fictive supprimée** de `contact-section.tsx`
3. ✅ **`#091421` remplacé** par les tokens charte
4. ✅ Fichiers `.bak`/`.backup` et `globals-backup.css` supprimés

### P2 — Unification (un seul système) — ✅ TERMINÉ 2026-06-11
5. ✅ **Cards :** style canonique unique appliqué (commit e6c69da)
6. ✅ **H2 :** style « monolith » généralisé — 75 H2 unifiés sur `text-3xl md:text-4xl font-black tracking-[-0.04em]`, gris hors charte → `gray-dark` (commit eac6b2d)
7. ✅ **Boutons :** tout passe par `CTAButton`/`CTAButtonMarine`/`CTAButtonSecondary` ; faux boutons et classes `btn` DaisyUI éliminés ; tracking analytics dédupliqué (commits 7e39de5, d769e00)
8. ✅ **Conteneur :** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` partout ; `container mx-auto` éradiqué (commit 1b4eb3b)
9. ✅ **Rythme :** `py-20`/`py-16` appliqué ; bandes utilitaires téléphones `py-8` (D-09) conservées comme exception volontaire (commit 1b4eb3b)
10. ✅ **Icônes :** échelle 16/24/32 appliquée (101/170/40) ; emojis et `lni-` déjà absents. **`weight="bold"` global** via `IconContext.Provider` dans `layout-client-chrome.tsx` (2026-06-12, validé visuellement) — une seule source, surchargeable au cas par cas. `weight="fill"` explicite préservé où sémantique (étoiles, checks pleins) : Phosphor donne priorité au prop sur le contexte (commits d769e00, ce commit)

### P3 — Élévation du goût (anti-générique, charte respectée)
11. ✅ **Casser le « 3 cards égales »** : zig-zag appliqué de façon **ciblée** (pas massive, pour éviter un nouveau cliché) — `telephonie-entreprise` (3 solutions, commit 0f0e6d9) et `qui-sommes-nous` valeurs (3 blocs riches, commit f1471d0). Les grilles de cards courtes restent en grille centrée (bon format pour le contenu bref)
12. ⏪ **Heroes intérieurs en split 50/50** : **décision Alban 2026-06-12 — NON généralisé**. Revue visuelle des 7 heros : ils sont déjà bons et cohérents (texte centré sur dégradé PRD verrouillé charte). Généraliser le split casserait l'uniformité de gamme. Le pilote split de trunk-sip-illimite a été **repassé en centré** pour cohérence totale
13. ✅ **Mono pour les chiffres** : fait. **Police révisée 2026-06-12** : Geist (défaut create-next-app, jamais validée) → **Inter** (police du logo E2I, inscrite à la charte) + **IBM Plex Mono** pour les chiffres. Le body applique désormais `font-sans` (avant : ni Geist ni Inter ne rendaient, fallback système/serif)
14. ✅ **Apparitions au scroll sobres** : composants `Reveal`/`RevealGroup`/`RevealItem` (`components/motion/reveal.tsx`), appliqués aux grilles services et stats de l'accueil (commit ec2bacb)
15. ✅ **Feedback tactile uniforme** : `active:scale-[0.98]` sur CTAButton, PhoneLink, chat ; widget chat remis en charte (gradient violet → rouge, Phosphor, Input shadcn) (commit 23b0e5a)
16. ✅ **Stats organiques** : décision Alban 2026-06-11 — pas de communication sur le nombre de clients (remplacé par « 4 territoires DOM couverts ») ; 15 ans d'expérience ; « 20 % d'économies sur le coût des communications DROM » ; support communiqué uniquement comme « par mail et téléphone » (fin des « 24/7 » et « support local réactif » pour le support humain ; les 24/7 produit — agents IA, monitoring, uptime — conservés)
17. ✅ **États vides/chargement** : `FormSkeleton` calqué sur le layout, branché sur les embeds Tally tarifs/devis et HubSpot (spinner circulaire éliminé) (commit c72f770)

### P4 — Audit technique pré-mise en ligne — ✅ TERMINÉ 2026-08-15

Audit « impeccable » sur 5 dimensions : **13/20 → 20/20**.

18. ✅ **Accessibilité (WCAG 2.2 AA)**
    - `prefers-reduced-motion` dans `globals.css` (`@layer base`, avec `!important` pour l'emporter sur les couches Tailwind et les styles inline de Framer Motion) — critère 2.3.3
    - Lien d'évitement « Aller au contenu » dans `layout-client-chrome.tsx`, avec `tabIndex={-1}` sur `<main>` (sans lui, Safari déplace le scroll mais pas le focus) — critère 2.4.1
    - `aria-expanded` + `aria-controls` sur le bouton du menu mobile
    - `focus-visible:ring` sur les 6 variantes de CTA (aucune n'en avait) — 43 occurrences au total sur le site
    - Cible tactile du hamburger : 40 → 44 px

19. ✅ **Performance images**
    - 17 `<img>` convertis en `next/image` (heroes en `fill`/`priority`/`sizes`, logos en `width`/`height`)
    - 5 images sources redimensionnées de 4000–6000 px → 2560 px : **~5,5 Mo économisés**
    - Mesuré en build de production : accueil servie en 768 px, chargement 187 ms
    - **Exceptions volontaires :** `<img>` natifs conservés dans `header-simple.tsx` et `footer.tsx` (contournement documenté d'un bug d'hydratation, cf. commentaires en place) et sur le logo de `testimonial-card` (source dynamique, dimensions inconnues)

20. ✅ **Couleurs hors charte (décoratives)**
    - Dégradé orange de `feature-card` → marine ; badge témoignage vert-bleu et étoiles jaunes → `red-primary` ; 8 fonds d'icônes orange/jaune de `politique-confidentialite` → charte
    - **Conservés délibérément :** statuts vert/orange de `trunk-sip-agents-ia` (sémantiques, doublés d'un libellé texte, cf. §9.2) et vert du logo WhatsApp (couleur de marque d'un tiers)

21. ✅ **Nettoyage du code mort** : 14 fichiers supprimés (cf. §7 « Dette de cohérence »), 15 `console.log` éliminés avec eux. Les 4 restants sont légitimes : 2 en exemples JSDoc, 1 côté serveur, 1 fonctionnel dans du legacy référencé.

> **Note d'environnement.** Le serveur de dev annule le preload d'image (`ERR_ABORTED`) lors d'un changement de viewport, si bien que l'événement `load` n'arrive jamais. Les tests Playwright concernés attendent donc `domcontentloaded`. Comportement vérifié sain en build de production (187 ms). Ne pas « corriger » ce point en repassant à `load`.

---

## 9. Options proposées à AJOUTER à la charte graphique

> ⚠️ La charte ne se modifie qu'avec permission explicite. Ceci est un menu de propositions, pas une modification.

### 9.1 Teintes dérivées officielles (déjà utilisées de facto, à légitimer)
| Token proposé | Valeur | Usage |
|---|---|---|
| `red-primary-50` | `#FDECEC` (rouge à ~6 %) | Fonds de badges, callouts |
| `red-primary-100` | `#FAD4D4` | Fonds d'icônes |
| `blue-marine-50` | `#EEF1F5` | Fonds de sections alternées |
| `blue-marine-100` | `#D8DEE7` | Bordures, fonds d'icônes |
| `gray-50` | `#F9FAFB` | Fond de section alterné au blanc |

Règle d'accompagnement : **interdire** les teintes Tailwind génériques (`red-50`, `blue-100`…) une fois ces tokens créés.

### 9.2 Couleurs sémantiques (déjà dans le thème DaisyUI, absentes de la charte)
- Succès : `#16A34A` · Avertissement : `#F59E0B` · Erreur : `#E53E3E`
- Usage strictement fonctionnel (formulaires, statuts), jamais décoratif.

### 9.3 Échelle typographique officielle
- H1 : `text-4xl md:text-6xl font-bold tracking-tight`
- H2 : `text-3xl md:text-4xl font-black tracking-[-0.04em]` (style « monolith » généralisé)
- H3 : `text-xl font-semibold`
- Corps : `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- Données/chiffres : `font-mono tabular-nums` (IBM Plex Mono)

### 9.4 Élévation & rayons (3 niveaux maximum)
- Rayons : `rounded-lg` (contrôles) · `rounded-xl` (cards) · `rounded-full` (badges/pills)
- Ombres : `shadow-sm` (repos) · `shadow-md` (hover) · `shadow-xl` (1 seul élément vedette par page) — ombres teintées vers le fond, jamais de glow

### 9.5 Motion tokens
- Durées : 150 ms (micro) · 300 ms (standard) · 500 ms (sections)
- Easing unique : `cubic-bezier(0.16, 1, 0.3, 1)` ; springs Framer `stiffness 100, damping 20`
- Tactile : `active:scale-[0.98]` systématique
- Interdits : glows néon, dégradés animés, curseurs custom

### 9.6 Interdits explicites à inscrire (verrouillage anti-dérive)
- Pas de violet/rose/néon (cf. `animate-pulse-soft` actuel)
- Pas de texte en dégradé (`.text-gradient`) sur les titres
- Pas de `#000000` pur — `gray-dark` est le noir du site
- Pas d'emojis dans l'UI — icônes Phosphor uniquement
- 1 seule couleur d'accent par écran : le rouge ; le marine est structurel, pas décoratif

---

## 10. Éléments verrouillés (ne jamais toucher sans décision explicite)

1. Hero gradient accueil : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85` (PRD)
2. Les 5 couleurs officielles et leur mapping logo (§2)
3. Header : charbon non scrollé / blanc scrollé
4. CTA rouge `#E53E3E` comme couleur d'action unique

---

## 11. Anti-patterns bannis

Liste opérationnelle. Un élément de cette liste dans une PR est un défaut, pas une préférence.

### Identité & tokens
- Teintes Tailwind génériques sur du code neuf : `red-600`, `blue-700`, `gray-900` — utiliser les tokens (§2)
- Logo E2I avec couleurs inversées
- Modifier `docs/CHARTE_GRAPHIQUE.md` sans permission explicite

### UI générique (AI slop)
- Emojis dans le markup ou le contenu UI — icônes Phosphor uniquement
- Blobs et flous décoratifs multicolores
- « Scroll to explore », chevrons rebondissants, indicateurs de scroll de remplissage
- Dégradé sur les gros titres (`bg-clip-text`)
- Grille 3 colonnes × N cartes sans traitement de la dernière ligne
- `h-screen` sur un hero pleine page — utiliser `min-h-[100dvh]`

### Contenu
- Clichés : « Elevate », « Seamless », « Next-Gen », « révolutionnaire »
- Répétition du même angle DOM entre le badge hero et le paragraphe d'intro (une seule couche sémantique)
- URLs produit obsolètes : `/mobilite`, `/3cx-smb-pro`, `/nos-services/studio-attente`
- Chiffres, adresses ou témoignages placeholder — voir `PRODUCT.md` § Anti-references

### Technique
- Importer une librairie d'icônes absente de `package.json`
- Importer `@phosphor-icons/react` directement dans un composant — passer par `@/lib/icons`
- Composants client lourds dans l'arbre RSC sans isolation `'use client'`
- Listeners `window scroll`, animation de `top`/`left`/`width`/`height`

---

## 12. Responsive & breakpoints

| Token | px | Usage |
|---|---|---|
| `sm` | 640 | Padding, échelle typographique |
| `md` | 768 | Passage à 2 colonnes |
| `lg` | 1024 | **Navigation desktop** (hamburger en dessous), grilles 3 colonnes si justifié |
| `xl` | 1280 | Titres hero à leur taille maximale |

- **Cibles tactiles :** minimum 44 × 44 px sur tous les liens et boutons en mobile
- **Sous 768 px :** une seule colonne, aucun scroll horizontal
- **Offset header :** `main` en `pt-16` pour compenser le header fixe (`h-16 lg:h-20`)

---

## 13. Liens produits canoniques

Toute carte, tout CTA ou lien de navigation pointant vers une offre doit utiliser ces URLs.

| Offre | href |
|---|---|
| Trunk SIP DOM (au compteur) | `/telephonie-entreprise/trunk-sip-compteur` |
| 3CX SMB PRO (mutualisé) | `/telephonie-entreprise/3cx-smb-mutualisee` |
| 3CX PRO Cloud (dédié) | `/3cx-cloud` |
| Trunk SIP agents IA | `/telephonie-entreprise/trunk-sip-agents-ia` |
| Studio d'attente | `/studio-attente` |
| Devis | `/devis` |

---

## 14. Implementation map

| Zone | Fichier(s) |
|---|---|
| Layout racine | `app/layout.tsx`, `app/globals.css` |
| Accueil | `app/page.tsx`, `components/homepage-hero-section-simple.tsx` |
| Services (accueil) | `components/services-section-simple.tsx` |
| Header / footer | `components/layout/header-simple.tsx`, `components/layout/footer.tsx` |
| CTA | `components/ui/cta-button.tsx` (`CTAButton`, `CTAButtonMarine`, `CTAButtonSecondary`) |
| Icônes | `lib/icons.ts` (barrel Phosphor — point d'entrée unique) |
| Motion | `components/motion/reveal.tsx` (`Reveal`, `RevealGroup`, `RevealItem`) |
| Tokens Tailwind | `tailwind.config.js` (thème DaisyUI `e2ivoip`) |
| Images | `components/ui/safe-image.tsx` (wrapper `next/image` anti-mutation d'extensions) |
| Formulaire Tally | `components/tally-embed-tarifs.tsx` (seul embed vivant), `components/tally-tracking.tsx` |
| Tests d'alignement | `tests/playwright/services-cards-alignment.spec.ts` |

**Composants legacy restants :** `pricing-tiers.tsx` (1 import). `header.tsx` et `contact-section.tsx` ont été supprimés.

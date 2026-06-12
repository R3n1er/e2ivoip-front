# Design System : E2I VoIP

**Projet :** e2ivoip-front (Next.js 15 App Router · Tailwind v3 · DaisyUI · shadcn/ui · Framer Motion)
**Source de vérité couleurs :** `docs/CHARTE_GRAPHIQUE.md` (règle absolue — ne jamais sortir de la charte)
**Dernière analyse :** 2026-06-11 — audit réalisé avec la grille « design-taste » (variance 8 / motion 6 / densité 4)

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

### AI tells / clichés détectés
| Tell | Où | Gravité |
|---|---|---|
| Hero texte centré sur image sombre ×2 | accueil, qui-sommes-nous | Moyenne (gradient verrouillé PRD, mais la *composition* peut évoluer) |
| Rangées de 3–4 cards égales | services, stats, CTA « pourquoi » | Moyenne |
| Callout boxes dégradées `from-blue-50 to-red-50` | pricing, transformation, CTA | Faible |
| Stats rondes répétées « 100+ / 15+ / 20% » sur 4–5 pages | partout | Moyenne |
| `.text-gradient` (texte dégradé rouge→bleu) défini dans globals.css | globals.css:181 | Faible (peu utilisé — à supprimer) |
| Emojis dans le markup (❓ ★ 👋) | faq, footer, popup | Faible |
| Adresse placeholder « 123 Avenue des Télécoms, 75001 Paris » | contact-section.tsx | **Haute** (fausse info publiée) |
| Ombres rose/violet dans `animate-pulse-soft` | globals.css:226 | Haute (hors charte) |

### Dette de cohérence
- 3 écoles de cards, 2 écoles de H2, 5 écritures de boutons, 2 conteneurs, 2 headers (`header.tsx` / `header-simple.tsx`), 2 sections contact, 7 fichiers Tally
- `globals.css` déclare ~15 classes de dégradés (`gradient-primary-red-green`, etc.) **jamais référencées** dans le markup — dont des verts/oranges hors charte
- Fichiers morts : `globals-backup.css`, `chat-preoverlay-old.tsx.bak`, `chat-preoverlay.tsx.backup`

---

## 8. Améliorations recommandées — dans le respect strict de la charte

Priorisées. Aucune ne touche aux 5 couleurs officielles ni au hero gradient PRD.

### P1 — Corrections (hors-charte ou factuel)
1. **Purger `globals.css`** : supprimer les ~15 classes de dégradés inutilisées (vert, orange, radial) et corriger `animate-pulse-soft` (ombres rose/violet → ombre teintée `rgba(229,62,62,…)` ou neutre)
2. **Remplacer l'adresse fictive** de `contact-section.tsx` par la vraie adresse
3. **Remplacer `#091421`** (CTA inversé) par `gray-dark`/`blue-marine`
4. Supprimer les fichiers `.bak`/`.backup` et `globals-backup.css`

### P2 — Unification (un seul système) — ✅ TERMINÉ 2026-06-11
5. ✅ **Cards :** style canonique unique appliqué (commit e6c69da)
6. ✅ **H2 :** style « monolith » généralisé — 75 H2 unifiés sur `text-3xl md:text-4xl font-black tracking-[-0.04em]`, gris hors charte → `gray-dark` (commit eac6b2d)
7. ✅ **Boutons :** tout passe par `CTAButton`/`CTAButtonMarine`/`CTAButtonSecondary` ; faux boutons et classes `btn` DaisyUI éliminés ; tracking analytics dédupliqué (commits 7e39de5, d769e00)
8. ✅ **Conteneur :** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` partout ; `container mx-auto` éradiqué (commit 1b4eb3b)
9. ✅ **Rythme :** `py-20`/`py-16` appliqué ; bandes utilitaires téléphones `py-8` (D-09) conservées comme exception volontaire (commit 1b4eb3b)
10. ✅ **Icônes :** échelle 16/24/32 appliquée (101/170/40) ; emojis et `lni-` déjà absents ; `weight="fill"` conservé où sémantique (étoiles, checks pleins). ⏳ Reporté : `weight="bold"` global — à trancher avec validation visuelle (commit d769e00)

### P3 — Élévation du goût (anti-générique, charte respectée)
11. ✅ **Casser le « 3 cards égales »** : zig-zag appliqué de façon **ciblée** (pas massive, pour éviter un nouveau cliché) — `telephonie-entreprise` (3 solutions, commit 0f0e6d9) et `qui-sommes-nous` valeurs (3 blocs riches, commit f1471d0). Les grilles de cards courtes restent en grille centrée (bon format pour le contenu bref)
12. ⏪ **Heroes intérieurs en split 50/50** : **décision Alban 2026-06-12 — NON généralisé**. Revue visuelle des 7 heros : ils sont déjà bons et cohérents (texte centré sur dégradé PRD verrouillé charte). Généraliser le split casserait l'uniformité de gamme. Le pilote split de trunk-sip-illimite a été **repassé en centré** pour cohérence totale
13. ✅ **Mono pour les chiffres** : fait. **Police révisée 2026-06-12** : Geist (défaut create-next-app, jamais validée) → **Inter** (police du logo E2I, inscrite à la charte) + **IBM Plex Mono** pour les chiffres. Le body applique désormais `font-sans` (avant : ni Geist ni Inter ne rendaient, fallback système/serif)
14. ✅ **Apparitions au scroll sobres** : composants `Reveal`/`RevealGroup`/`RevealItem` (`components/motion/reveal.tsx`), appliqués aux grilles services et stats de l'accueil (commit ec2bacb)
15. ✅ **Feedback tactile uniforme** : `active:scale-[0.98]` sur CTAButton, PhoneLink, chat ; widget chat remis en charte (gradient violet → rouge, Phosphor, Input shadcn) (commit 23b0e5a)
16. ✅ **Stats organiques** : décision Alban 2026-06-11 — pas de communication sur le nombre de clients (remplacé par « 4 territoires DOM couverts ») ; 15 ans d'expérience ; « 20 % d'économies sur le coût des communications DROM » ; support communiqué uniquement comme « par mail et téléphone » (fin des « 24/7 » et « support local réactif » pour le support humain ; les 24/7 produit — agents IA, monitoring, uptime — conservés)
17. ✅ **États vides/chargement** : `FormSkeleton` calqué sur le layout, branché sur les embeds Tally tarifs/devis et HubSpot (spinner circulaire éliminé) (commit c72f770)

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

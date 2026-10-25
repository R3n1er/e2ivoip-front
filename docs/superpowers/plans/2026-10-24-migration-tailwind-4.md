# Plan — Migration Tailwind CSS 3 → 4

> Statut : **v3 — APPROUVÉE par Codex (round 3), décisions D0 à D4 en attente d'Alban** (voir `2026-10-24-migration-tailwind-4-review-log.md`)
> Branches prévues : `fix/override-postcss-selector-parser` (volet A) puis `chore/tailwind-4` (volet B), chacune en PR vers `dev`

## 0. Changement de cap après relecture

La v1 justifiait la migration par la sécurité. **C'était faux** (Codex, point 4, vérifié) :
`@tailwindcss/typography@0.5.20`, dernière version publiée, dépend **en dur** de
`postcss-selector-parser@6.0.10`, la version vulnérable. Tailwind 4 ne ferme donc pas la faille.

Le plan est scindé en deux volets indépendants :

| Volet | Contenu | Effort | Risque visuel |
|---|---|---|---|
| **A — Sécurité** | `overrides` npm `postcss-selector-parser: ^7.1.6` | 1 commit | très faible : CSS identique au test (§1) |
| **B — Modernisation** | Migration Tailwind 4 | 5 à 8 commits | réel, à encadrer (§3 à §8) |

A règle la sécurité seul. B devient un choix de modernisation, sans urgence.

## 1. Volet A — override de `postcss-selector-parser`

Test réalisé le 2026-10-24 sur `dev` @ 7e25ffc, sur Tailwind 3 :

- `npm ls` : `@tailwindcss/typography` et `tailwindcss` utilisent `postcss-selector-parser@7.1.7`.
- `npm audit` : plus aucune alerte `postcss-selector-parser` / `postcss-nested` / `tailwindcss` / typography.
- CSS compilé (`npx tailwindcss -i app/globals.css`) avant et après : **identique**, hors la ligne
  de bannière de version (97 044 octets).
- Contre-vérification Codex (round 2) : les API utilisées par `tailwindcss@3` (`astSync`,
  `processSync`, mutations d'AST, `dist/util/unesc`) et par typography (`astSync`, `selector`,
  `remove`, `prepend`) fonctionnent en 7.1.7 ; CSS du projet et fixture (group/peer,
  pseudo-éléments, typography, `@apply`) strictement identiques.
- Risque résiduel : override majeur hors des plages déclarées par les paquets. D'où le lockfile
  commité et la validation complète.

Étapes :

1. Partir de `dev` **après merge de la PR #86**.
2. Ajouter dans `package.json` : `"overrides": { "postcss-selector-parser": "^7.1.6" }`, puis `npm install`.
3. Preuve : CSS compilé avant/après comparé par `cmp` (hors bannière), `npm audit` → 0 vulnérabilité,
   `npm run validate` vert.
4. ADR courte : « override temporaire, à retirer quand typography publiera une dépendance corrigée ».

## 2. État des lieux pour le volet B (relevé le 2026-10-24)

| Élément | Actuel | Cible |
|---|---|---|
| `tailwindcss` | 3.4.x | 4.3.x |
| PostCSS | `tailwindcss` + `autoprefixer` | `@tailwindcss/postcss` |
| `@tailwindcss/typography` | 0.5.20 | 0.5.20 via `@plugin` + override du volet A maintenu |
| `daisyui` | 5.1.27 — **ne génère aucun CSS** sous Tailwind 3 (0 occurrence de `.btn`, `.badge`, `.card`, `.loading` dans le CSS buildé) | à décider (D1) |
| `tailwindcss-animate` | 1.0.7 — non déclaré dans `plugins` → inerte | retirer |
| `tailwind-merge` | 1.14.0 | 3.x |
| Config | `tailwind.config.js` | `@theme` dans `app/globals.css` |

### 2.1 Classes renommées (codemod `@tailwindcss/upgrade`)

`shadow-sm` 73 occ., `shadow` 6, `rounded` 13, `blur`/`backdrop-blur` 24, `drop-shadow` 24,
`outline-none` 22, `flex-shrink/grow` 61, `bg-gradient-to-*` 109, préfixe `!` 30.

### 2.2 Changements de comportement (pas de renommage, traitement manuel)

| Changement | Exposition | Traitement |
|---|---|---|
| `border` sans couleur : `gray-200` → `currentColor` | 200 occ. / 58 fichiers | règle de compat en `@layer base` |
| `space-x/y` et `divide-x/y` : nouveau sélecteur | 248 + 2 occ. (ex. `app/telephonie-3cx/page.tsx:358`) | captures |
| `hover:` limité à `@media (hover: hover)` | 310 occ. ; sous-menus desktop en `group-hover` seul (`components/layout/header-simple.tsx:135`) | **voir D4** |
| Transformations indépendantes (`translate`, `scale`, `rotate`) | transition limitée à une liste de propriétés + translate/scale (`app/devis-en-ligne/page.tsx:174`) ; `motion-reduce:transform-none` ne neutralise plus translate/scale/rotate (`app/devis-en-ligne/page.tsx:177`, `components/faq-section.tsx:83`) | devis : `transition-[background-color,box-shadow,translate,scale]` et `motion-reduce:translate-none motion-reduce:scale-none` ; FAQ : `motion-reduce:rotate-none`. `transition-transform` reste valable ailleurs (couvre déjà translate/scale/rotate en v4). Test de style calculé |
| Preflight : boutons sans `cursor: pointer`, placeholder, anneau `ring-*` par défaut (couleur `currentColor` au lieu de `blue-500`, largeur 1px) | `components/ui/button.tsx:8`, `input.tsx:11`, `sheet.tsx:75` | règles de compat explicites : curseur, placeholder, `--default-ring-color` et `--default-ring-width` figés aux valeurs v3 dans `@theme` ; test de style calculé pour chacun |
| Dégradés interpolés en **oklab** par défaut | hero `components/homepage-hero-section-simple.tsx:34` (règle absolue n°2) | `/srgb` sur les dégradés (voir D2) |
| Palette par défaut en oklch | `blue-800/900`, `red-600`, `gray-*`… | valeurs hex v3 figées dans `@theme` |
| Typography lit `tailwindcss/colors` en direct pour `--tw-prose-*` et les redéfinit sur `.prose` | `app/blog/[slug]/page.tsx:228` | surcharger les `--tw-prose-*` **au niveau `.prose`** (règle CSS ou `theme.typography` du plugin), pas dans `@theme` ; valeurs hex v3 |
| Détection automatique des sources | v3 ne scanne que `pages`, `components`, `app` ; `lib/faq-data.tsx:346` contient des classes | `@import "tailwindcss" source(none)` + `@source` explicites (`app`, `components`, `lib`, `hooks`) ; diff des classes générées |

### 2.3 Classes déjà « v4 » aujourd'hui inertes, qui vont s'activer

`shadow-xs`, `outline-hidden`, `rounded-xs`, `field-sizing-content` dans `components/ui/button.tsx`,
`input.tsx`, `textarea.tsx`, `sheet.tsx` (composants shadcn récents). Inventaire exhaustif à produire
à l'étape B1 en comparant les classes du code au CSS v3. Règle : **on préserve le rendu actuel**
(retrait de la classe) sauf décision contraire d'Alban.

### 2.4 Cascade : règles hors couche dans `globals.css`

`app/globals.css:15-38` redéfinit `.text-red-primary`, `.bg-red-primary`… hors `@layer`. En v4
(couches CSS natives), ces règles l'emporteraient sur **toutes** les utilitaires, variantes comprises :
`text-red-primary hover:text-red-700` (`components/layout/footer.tsx:168`) perdrait son survol.
→ Supprimer ces doublons : les couleurs existent déjà dans le thème.

### 2.5 Polices

`app/layout.tsx:13` déclare `next/font` en `--font-sans`, nom repris par le thème. Transcrire
littéralement donnerait `--font-sans: var(--font-sans)` (autoréférence). → Renommer les variables
`next/font` (`--font-inter`, `--font-plex-mono`) et les aliaser dans `@theme inline` avec les fallbacks actuels.

### 2.6 Tests qui dépendent de Tailwind

- 19 fichiers testent des noms de classes (`toHaveClass("bg-gradient-to-r")`…).
- **2 garde-fous de charte lisent `tailwind.config.js`** : `tests/charte-gris-site-entier.test.ts:124`,
  `tests/charte-couleurs-layout-global.test.ts:214`. À réécrire pour lire les tokens `@theme`,
  en séparant **palette de marque** (autorisée) et **couleurs v3 figées pour compat** (pas un
  élargissement de la charte).
- Aucun test de régression visuelle aujourd'hui.

## 3. Décisions à valider par Alban

- **D0 — Faire le volet B maintenant ?** Recommandé : **A tout de suite, B plus tard** (aucun
  gain de sécurité, risque visuel réel, environ une journée de travail encadré).
- **D1 — daisyUI.** Recommandé : **le désinstaller**. Inerte aujourd'hui → le retirer ne change rien ;
  le garder restylerait ~120 occurrences (`badge`, `card`, `loading`, `stat`, `btn`…).
- **D2 — Hero.** Le codemod renomme `bg-gradient-to-r` en `bg-linear-to-r`, et il faut ajouter
  `/srgb` pour garder le même dégradé. Recommandé : écrire `bg-linear-to-r/srgb from-blue-900/85 …`
  et mettre à jour le texte de la règle n°2 dans `CLAUDE.md`, `agents.md`, `CHARTE_GRAPHIQUE.md`
  (permission requise, règle n°3).
- **D3 — Navigateurs.** Tailwind 4 exige Safari 16.4+, Chrome 111+, Firefox 128+. À confirmer avec
  les statistiques PostHog / Vercel Analytics.
- **D4 — Survol sur tablette tactile.** Recommandé : rétablir le comportement v3 avec
  `@custom-variant hover (&:hover)` (zéro changement), plutôt que d'accepter un menu desktop
  inaccessible sur tablette large.

## 4. Volet B — étapes (TDD, un commit par étape)

**B0. Référence verte.** Volet A mergé. Token HubSpot renouvelé : `npm run validate` doit être
**entièrement vert sur Tailwind 3** avant de commencer (sinon, aucune comparaison fiable).

**B1. Filet de non-régression, généré sur Tailwind 3.**
- `tests/playwright/visual-regression.spec.ts` avec `toHaveScreenshot()`, Chromium uniquement,
  `maxDiffPixelRatio: 0.001`, environnement figé (port 3100, serveur neuf `reuseExistingServer: false`,
  build de production).
- Matrice : accueil, 3CX, trunk SIP, contact, tarifs, devis, blog (listing + **un article complet**
  avec titres, listes, liens, citation, tableau, code, logo), page légale, formulaire RGPD (vide,
  en erreur, rempli) ; en 1440 px et 390 px ; états : sous-menu desktop ouvert, menu mobile ouvert,
  focus clavier sur bouton/champ/lien, survol d'une carte.
- Données HubSpot **déterministes côté serveur** (fixture), pas seulement masquées.
- Tests de styles calculés : `cursor`, couleur de placeholder, `border-color` par défaut,
  couleur et largeur d'anneau au focus, rotation FAQ et translate/scale du devis avec et sans
  `prefers-reduced-motion`.
- Snapshot texte de la liste des classes générées (CSS v3) pour le diff de l'étape B5.

**B2. Retraits sans effet visuel.** `daisyui` (si D1), `tailwindcss-animate`. Filet B1 : vert.

**B3. Migration.** `npx @tailwindcss/upgrade` sur branche propre, puis corrections manuelles §2.2 à §2.5 :
PostCSS, `@import "tailwindcss" source(none)`, `@plugin` typography, `@source`, `@theme` (marque +
hex v3 figés + anneau par défaut), `--tw-prose-*` sur `.prose`, `@theme inline` polices, règles de
compat (bordure, curseur, placeholder),
`@custom-variant hover` (D4), `/srgb` sur les dégradés (D2), suppression des doublons hors couche,
classes inertes retirées, `tailwind-merge@3`, suppression de `tailwind.config.js`.
Relecture du diff du codemod fichier par fichier.

**B4. Tests.** Mise à jour des 19 tests de classes et réécriture des 2 garde-fous de charte, dans le
même commit que B3 si nécessaire pour garder la suite verte.

**B5. Comparaison.** Filet B1 rejoué **sans régénérer les références**. Diff des classes générées.
Toute différence est corrigée. Une exception visuelle n'est acceptée que par décision explicite
d'Alban, consignée dans la PR (captures avant/après).

**B6. Documentation.** ADR, `docs/ARCHITECTURE.md`, règle hero (si D2).

## 5. Critères de fin (volet B)

- `npm audit` (tous niveaux, pas seulement `--audit-level=high`) : 0 vulnérabilité.
- `npm run validate` **entièrement vert**, lancé sur un serveur neuf.
- Filet visuel vert, sans référence régénérée.
- `next dev` (Turbopack) et `next build` vérifiés.
- Contrôle manuel sur la preview Vercel : accueil, menu mobile, sous-menu desktop, formulaire RGPD, un article.

## 6. Risques

| Risque | Parade |
|---|---|
| Écart de teinte (charte) | hex v3 figés + `/srgb` + captures |
| Cascade inversée (règles hors couche) | suppression des doublons + capture des survols |
| Classes inertes qui s'activent | inventaire B1 + retrait |
| Codemod qui modifie du texte non-CSS | relecture du diff + tests |
| Captures instables (HubSpot, polices) | fixtures serveur, polices attendues, Chromium figé |
| `@tailwindcss/postcss` sous Turbopack | `next dev` + `next build` à B3 |

## 7. Retour arrière

Chaque volet est une PR squashée : `git revert` du commit sur `dev`.

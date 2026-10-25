# Journal de relecture — Plan migration Tailwind 4

Relecteur : Codex CLI 0.163 (`codex exec --sandbox read-only`). Auteur du plan : Claude.
Le plugin `claudex-loop` est déclaré dans `.claude/settings.json` mais n'est pas installé
sur le poste : relecture faite en appelant Codex directement.

## Round 1 — 2026-10-24 — verdict : À RÉVISER

| # | Gravité | Point soulevé par Codex | Vérifié | Suite donnée (v2) |
|---|---|---|---|---|
| 1 | BLOQUANT | 2 tests de charte lisent `tailwind.config.js` | oui | §2.6, B4 |
| 2 | BLOQUANT | Règles hors couche de `globals.css` gagneraient la cascade en v4 (survols perdus) | oui (lecture) | §2.4 : suppression des doublons |
| 3 | BLOQUANT | Dégradés interpolés en oklab en v4 → hero modifié même avec hex figés | doc officielle | D2 : `/srgb` |
| 4 | IMPORTANT | Typography 0.5.20 dépend en dur de `postcss-selector-parser@6.0.10` → la migration ne règle pas la faille | **oui** (`npm view`) | **Changement de cap** : volet A (override) testé, CSS identique |
| 5 | IMPORTANT | Classes v4 déjà présentes et inertes (`shadow-xs`, `outline-hidden`, `rounded-xs`, `field-sizing-content`) | oui (grep) | §2.3 |
| 6 | IMPORTANT | Autoréférence `--font-sans` | oui (`app/layout.tsx:13`) | §2.5 |
| 7 | IMPORTANT | Transformations indépendantes, `motion-reduce:transform-none` | lecture | §2.2 |
| 8 | IMPORTANT | Couleurs `--tw-prose-*` hors du gel de palette | lecture | §2.2, B1 (article complet) |
| 9 | IMPORTANT | Preflight : curseur, placeholder, couleur d'anneau | lecture | §2.2, B1 (styles calculés) |
| 10 | IMPORTANT | `hover:` en v4 casse les sous-menus sur tablette large | lecture | D4 : `@custom-variant hover` |
| 11 | IMPORTANT | Filet visuel trop pauvre (états, article, formulaires, données HubSpot) | — | B1 enrichi |
| 12 | IMPORTANT | Critères de fin contradictoires (e2e rouges tolérés, écarts « justifiés ») | — | B0 + §5 : tout vert, exceptions validées par Alban |
| 13 | MINEUR | Détection automatique des sources élargie | oui (`lib/faq-data.tsx`) | `@source` explicites + diff des classes |

Sans anomalie selon Codex : `components.json` (`"config": ""`), Jest via `next/jest`,
pas d'attribut `hidden` ni de variante `prose-*:` empilée.

Test complémentaire mené par Claude après le round 1 : override `postcss-selector-parser@^7.1.6`
sur Tailwind 3 → `npm audit` sans alerte Tailwind, CSS compilé identique (hors bannière).

## Round 2 — 2026-10-24 — verdict : À RÉVISER (aucun bloquant)

Volet A contre-vérifié par Codex : API v7 compatible, CSS projet + fixture strictement identiques.
Nuance : « risque nul » jugé trop absolu → reformulé en « très faible ».

| # | Point | Suite donnée (v3) |
|---|---|---|
| 7 | PARTIEL — devis utilise aussi `motion-reduce:transform-none` | `translate-none` + `scale-none` |
| 8 | PARTIEL — `--tw-prose-*` redéfinies sur `.prose`, `@theme` ne suffit pas | surcharge au niveau `.prose` |
| 9 | PARTIEL — couleur/largeur d'anneau non traitées | `--default-ring-*` figés + test |
| 13 | PARTIEL — `@source` n'empêche pas le scan auto | `source(none)` |
| N1 | IMPORTANT — `transition-[translate,scale]` supprimerait les transitions de fond et d'ombre du devis | `transition-[background-color,box-shadow,translate,scale]` |

## Round 3 — 2026-10-24 — verdict : APPROUVÉ

Les 5 points du round 2 sont traités. Noms vérifiés par Codex contre la documentation
officielle : `translate-none`, `scale-none`, `--default-ring-color`, `--default-ring-width`,
`source(none)`. Aucune correction supplémentaire.

Reste à trancher par Alban : D0 à D4 (§3 du plan).

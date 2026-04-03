# E2I VoIP — Guide Developpement

Prends en compte CLAUDE.md et .agents.md

## Preferences Utilisateur

- Chef de projet / dev JS NextJS debutant avec TDAH
- Explications simples + techniques avancees
- Decomposition taches complexes en petites etapes
- Challenger l'approche si necessaire

## Stack Technique

| Categorie | Choix |
|-----------|-------|
| Framework | NextJS 15 (App Router) |
| CSS | DaisyUI (priorite) > Tailwind > shadcn/ui |
| Icons | Lineicons (priorite) > React Icons |
| State UI | Zustand |
| State serveur | Custom hooks (TanStack Query supprime cote client — ADR 2025-10-05) |
| Validation | Zod + React Hook Form |
| Animations | Framer Motion (lazy via `lib/utils/lazy-motion.tsx`) |
| Deploy | Vercel (Fluid Compute) |
| Env | Cursor + Claude Code + MCP Servers |
| Tests | Jest + Playwright (TDD obligatoire) |

## Methodologie TDD

RED (test fail) > GREEN (code minimal) > REFACTOR > DOCUMENT > COMMIT > DEPLOY

## Design System Monolithe 2026

> Ref : `docs/Design.md` + `docs/CHARTE_GRAPHIQUE.md` + `.stitch/designs/landing-page-desktop.html`

### Regles OBLIGATOIRES

**Philosophie Carree** : Tous `border-radius` a `0px` dans `tailwind.config.js`. Aucun `rounded-*` sauf `rounded-full` pour icones circulaires.

**Palette STRICTE** :
```
red-primary: #E53E3E    blue-marine: #2D3848    gray-dark: #1F2937
gray-secondary: #818096  surface-dim: #091421    white: #FFFFFF
```
INTERDIT : gradients generiques, couleurs Tailwind hors charte (`blue-600`, `green-500`, `pink-*`, `indigo-*`).

**Boutons** : classe `.monolith-btn` (hard shadow, hover mecanique). INTERDIT : `shadow-lg`, `hover:scale-105`.

**Typographie** :
| Element | Classes |
|---------|---------|
| H1/H2 | `font-black tracking-[-0.04em] leading-tight` |
| Nav links | `font-bold tracking-[-0.03em] uppercase text-sm` |
| CTA | `font-black uppercase tracking-[0.2em] text-xs` |
| Micro-labels | `font-black uppercase tracking-[0.3em] text-[10px]` |

**Hero** : fond `bg-[#091421]` + `.monolith-grid-lines` + layout 60/40. Pas de gradient overlay.

**Inputs** : `rounded-none`, `bg-gray-50`, focus `border-b-2 border-red-primary`. Pas de `input-bordered` DaisyUI.

**Classes CSS** : `.monolith-btn`, `.monolith-grid-lines`, `.bento-grid/.bento-item`, `.glass-card`

### Patterns INTERDITS (checklist rapide)

`rounded-lg/xl/2xl/3xl/md` | `shadow-lg/xl/2xl` | `hover:scale-105` | `from-blue-900` | `pink-to-indigo` | `input-bordered` sur composants Monolithe | `<button>` imbrique dans `<Link>` (Next.js)

## Orchestration Agents

Les 7 agents sont dans `.claude/agents/`. Voici quand les utiliser :

| Tache | Agent | Modele | Declenchement |
|-------|-------|--------|---------------|
| Modifier un composant .tsx | `test-matcher` | haiku | AVANT de committer — identifie les tests impactes |
| Valider Design System (audit) | `stitch-compliance` | haiku | APRES modification composant — audit lecture seule |
| Scan rapide pre-commit | `pre-commit-validator` | haiku | AVANT `git commit` — <10s, patterns interdits |
| Scan securite | `security-guardian` | sonnet | AVANT `git commit/push` — secrets, .env, deps |
| Tests E2E navigateur | `e2e-browser-tester` | sonnet | APRES feature majeure — Playwright MCP |
| **Audit SEO page** | **`seo-orchestrator`** | **sonnet** | **PROACTIF nouvelle page / SUR DEMANDE existante** |
| Contenu SEO | `content-writer-seo` | sonnet | Pour pages/copy/meta — ref `docs/ligne-editoriale.md` |

### Workflow type : Feature

```
1. Ecrire tests (TDD RED)
2. Implementer (GREEN)
3. Refactor
4. test-matcher → quels tests adapter ?
5. stitch-compliance → Design System OK ?
6. seo-orchestrator → si nouvelle page (proactif)
7. pre-commit-validator → scan rapide
8. security-guardian → secrets ?
9. git commit + push
```

### Workflow type : Nouvelle Page

```
1. Creer page.tsx + layout
2. content-writer-seo → redaction contenu
3. seo-orchestrator → audit SEO + corrections techniques auto
4. content-writer-seo → appliquer recommandations contenu du rapport
5. stitch-compliance → Design System OK ?
6. pre-commit-validator + security-guardian → avant commit
```

### Workflow type : Contenu/SEO

```
1. content-writer-seo → redaction
2. seo-orchestrator → audit + corrections techniques
3. Skill claude-seo ou blog → optimisation avancee si besoin
4. stitch-compliance → si nouveau composant
5. security-guardian → avant commit
```

## Skills & Plugins disponibles

| Besoin | Skill/Plugin | Quand l'utiliser |
|--------|-------------|-----------------|
| SEO audit complet | `seo-audit` ou `seo` | Audit site entier ou page |
| SEO technique | `seo-technical` | Crawlability, indexability, CWV |
| Schema markup | `seo-schema` | JSON-LD, structured data |
| Contenu editorial | `content-writer-seo` (agent) | Copy pages, hero, meta descriptions |
| Blog complet | `blog` | Lifecycle blog (ecriture, scoring, audit) |
| Design UI | `stitch-design` | Generation ecrans haute-fidelite |
| Composants UI | `shadcn-ui` | Integration shadcn/ui |
| Tests E2E | `e2e-browser-tester` (agent) | Validation navigateur Playwright |
| Docs framework | Context7 MCP | Docs NextJS, Tailwind, etc. |
| Debug Chrome | `chrome-devtools-mcp` | DevTools, a11y, performance |

## Integrations

**Tally** : Popup conversion (`TallyPopupClean` + `ClientWrapperTally`), ID: `mDY1bl`, 3s auto.

**HubSpot** : Forms universels (`components/hubspot/`), config centralisee (`lib/constants/hubspot.ts`).

**dotenvx** : `.env` chiffre. `.env.keys` et `.mcp.json` JAMAIS commites.

## Structure Projet

```
app/                    → Pages NextJS App Router
components/
  hubspot/              → Universal form + legacy/
  layout/               → header.tsx, header-simple.tsx, footer.tsx
  ui/                   → DaisyUI customises
  chat-preoverlay.tsx   → Widget livechat
  *-section*.tsx        → Sections homepage
lib/
  constants/hubspot.ts
  hooks/                → hubspot/, forms/, ui/
  utils/lazy-motion.tsx
  validation/           → Zod schemas
tests/                  → Jest + Playwright
docs/                   → Design.md, CHARTE_GRAPHIQUE.md, ligne-editoriale.md, BrandBrief
.stitch/designs/        → Template Stitch reference
.claude/agents/         → 6 agents custom
```

## Code Style

- TypeScript strict, single quotes, no semicolons
- Server Components par defaut, `'use client'` seulement si necessaire
- React.memo (composants lourds), useCallback (handlers)
- DaisyUI classes prioritaires sur CSS custom
- Functional patterns
- **Liens Next.js** : Ne JAMAIS imbriquer une balise `<button>` dans un composant `<Link>`. Appliquez directement les classes (ex: `.monolith-btn`) sur le composant `<Link>`.

## Git & Deploy

**Branches** : `feature/nom`, `fix/description`, `docs/description`, `test/description`
**Commits** : `feat:`, `fix:`, `test:`, `docs:` (conventionnel)
**Validation pre-push** : `npm run validate` (lint + type-check + tests + audit + build)
**Deploy** : git push main → Vercel auto-deploy

## Permissions Fichiers

**Auto (sans permission)** : `components/**`, `app/**`, `lib/**`, `tests/**`, configs (package.json, tailwind, next, tsconfig, jest, playwright), docs techniques, CI/CD

**Permission requise** : `docs/PRD.md`, `docs/roadmap.md`, `.env.production`, schemas DB

## Ressources

- NextJS: nextjs.org/docs | DaisyUI: daisyui.com/components
- Lineicons: lineicons.com/icons | Playwright: playwright.dev
- Vercel: vercel.com/docs

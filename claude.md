# Claude Config - NextJS + DaisyUI

Prends en compte CLAUDE.md et .agents.md

# Préférences Utilisateur

- Chef de projet/dev JS NextJS débutant avec TDAH
- Explications simples + techniques avancées
- Décomposition tâches complexes
- Challenger l'approche si nécessaire

## Stack Technique

**Core**: NextJS 15 (App Router) + DaisyUI + Tailwind CSS
**Icônes**: Lineicons (priorité) → React Icons (fallback)
**État**: Zustand (UI) + TanStack Query (serveur)
**Validation**: Zod + React Hook Form
**Perf**: React.memo + useCallback + Lazy Motion (`lib/utils/lazy-motion.tsx`)
**Déploiement**: Vercel
**Env**: Cursor + Claude Code + MCP Servers

### Hiérarchie UI

1. DaisyUI (composants principaux)
2. Lineicons (icônes CDN/React)
3. Tailwind (layout/spacing)
4. React Icons (fallback)
5. shadcn/ui (si DaisyUI insuffisant)
6. Framer Motion (animations)

### MCP Servers

- **Context7**: Contexte projet
- **Playwright**: E2E tests
- **Browser**: Validation UI

### Intégrations

**Tally**: Popup conversion (`TallyPopupClean` + `ClientWrapperTally`)
- ID: `mDY1bl`
- Déclenchement: 3s auto
- Script: `https://tally.so/widgets/embed.js`

## Méthodologie

**TDD**: RED → GREEN → REFACTOR → DOCUMENT → COMMIT → DEPLOY

**Gestion État**:
- Zustand: UI local (loading/erreur)
- TanStack Query: API mutations
- Zod + RHF: validation forms

**Performance**:
- React.memo (composants lourds)
- useCallback (handlers)
- Lazy Motion (~60KB économisés)

**Tests**: Jest + Playwright obligatoires pour chaque feature

## Structure Projet

```
e2ivoip-front/
├── app/                    (pages NextJS App Router)
├── components/
│   ├── hubspot/            (universal form + legacy/)
│   ├── layout/             (header.tsx, header-simple.tsx, footer.tsx)
│   ├── ui/                 (DaisyUI customises)
│   ├── chat-preoverlay.tsx (widget livechat)
│   └── *-section*.tsx      (sections homepage)
├── lib/
│   ├── constants/hubspot.ts
│   ├── hooks/              (hubspot/, forms/, ui/)
│   ├── utils/lazy-motion.tsx
│   └── validation/         (Zod schemas)
├── tests/                  (Jest + Playwright)
├── docs/                   (Design.md, CHARTE_GRAPHIQUE.md, ADR.md, etc.)
└── .stitch/designs/        (template Stitch reference)
```

## Configuration Icônes

### Installation

```bash
npm install react-lineicons
# CDN: <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
```

### Usage

```tsx
import { LineIcon } from 'react-lineicons'
<LineIcon name="lni-home" />
<button className="btn btn-primary">
  <LineIcon name="lni-plus" className="mr-2" />
  Ajouter
</button>
```

## Design System Monolithe 2026

> **Ref** : `docs/Design.md` + `docs/CHARTE_GRAPHIQUE.md` + `.stitch/designs/landing-page-desktop.html`

### Philosophie Carree (OBLIGATOIRE)

Tous les `border-radius` sont forces a `0px` dans `tailwind.config.js`. Aucune classe `rounded-*` ne produit d'arrondi (sauf `rounded-full` pour icones circulaires).

### Couleurs (STRICTES)

```
red-primary: #E53E3E    (CTA, accents, liens hover)
blue-marine: #2D3848    (texte principal, headers)
gray-dark:   #1F2937    (fonds sombres, hard shadows)
gray-secondary: #818096 (texte secondaire)
surface-dim: #091421    (Hero, sections sombres)
white:       #FFFFFF    (fonds clairs)
```

**INTERDIT** : Gradients generiques (`pink-to-indigo`, `red-to-green`), couleurs Tailwind non-charte (`blue-600`, `green-500`).

### Boutons Monolithe (OBLIGATOIRE)

```tsx
{/* Primaire — CTA principaux */}
<button className="monolith-btn bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 rounded-none">
  Texte du CTA
</button>

{/* Secondaire — sur fond sombre */}
<button className="monolith-btn bg-white text-[#091421] font-black uppercase tracking-[0.2em] text-xs px-8 py-4 rounded-none">
  Texte du CTA
</button>
```

`.monolith-btn` (defini dans `globals.css`) applique automatiquement :
- Hard shadow : `bottom: -5px, right: -5px, bg: #050f1c`
- Hover : `translate(2px, 2px)` + shadow reduite (pression mecanique)

### Hero Sections (Standard 2026)

Fond sombre `bg-[#091421]` + `.monolith-grid-lines` + layout asymetrique 60/40. **Plus de gradient overlay sur image.**

### Classes CSS Design System

- `.monolith-btn` : Bouton avec hard shadow
- `.monolith-grid-lines` : Motif grille subtil pour fonds sombres
- `.bento-grid` / `.bento-item` / `.bento-item-large` / `.bento-item-wide` : Grilles asymetriques
- `.glass-card` : Glassmorphism pour badges flottants et header sticky

### Typographie Stitch

| Element | Classes |
|---------|---------|
| Titres H1/H2 | `font-black tracking-[-0.04em] leading-tight` |
| Liens navigation | `font-bold tracking-[-0.03em] uppercase text-sm` |
| Boutons CTA | `font-black uppercase tracking-[0.2em] text-xs` |
| Micro-labels | `font-black uppercase tracking-[0.3em] text-[10px]` |

## Tests & Validation

### Exemple Test Jest

```tsx
import { render, screen } from "@testing-library/react";
describe("Button", () => {
  it("renders with DaisyUI classes", () => {
    render(<Button variant="primary">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn", "btn-primary");
  });
});
```

### Exemple Playwright

```ts
test("user login", async ({ page }) => {
  await page.goto("/login");
  await page.fill('[data-testid="email"]', "test@example.com");
  await page.click(".btn-primary");
  await expect(page).toHaveURL("/dashboard");
});
```

### Accessibilité Icônes

```tsx
<LineIcon name="lni-home" aria-label="Accueil" role="img" />
<LineIcon name="lni-star" aria-hidden="true" /> {/* décorative */}
```

## Configuration

### tailwind.config.js

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "red-primary": "#E53E3E",
        "blue-marine": "#2D3848",
        "gray-secondary": "#818096",
        "gray-dark": "#1F2937",
      },
      borderRadius: {
        // TOUS a 0px — Philosophie Carree
        none: '0px', sm: '0px', DEFAULT: '0px', md: '0px',
        lg: '0px', xl: '0px', '2xl': '0px', '3xl': '0px', full: '0px',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["e2ivoip"], styled: true, utils: true, logs: false },
};
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test:ci": "jest --coverage",
    "test:e2e": "playwright test",
    "test:all": "npm run test:ci && npm run test:e2e",
    "validate": "npm run lint && npm run type-check && npm run test:all && npm audit --audit-level=high && npm run build",
    "deploy": "npm run validate && git push origin main"
  }
}
```

## Workflow Pre-Push (OBLIGATOIRE)

### Checklist

```bash
npm run test:ci         # Tests Jest
npm run test:e2e        # Tests Playwright
npm run lint            # ESLint
npm run type-check      # TypeScript
npm audit --audit-level=high  # Sécurité
npm run build           # Build prod
```

### Script Validation (`validate.sh`)

```bash
#!/bin/bash
set -e
echo "🧪 Tests Jest..." && npm run test:ci
echo "🎭 Tests Playwright..." && npm run test:e2e
echo "✨ Linting..." && npm run lint
echo "🔍 TypeScript..." && npm run type-check
echo "🔐 Sécurité..." && npm audit --audit-level=high
echo "🏗️ Build..." && npm run build
echo "✅ Validation réussie!"
```

### Husky Automation

```bash
npm install --save-dev husky
npx husky init
npx husky add .husky/pre-push "npm run test:all && npm audit --audit-level=high"
```

### ✅ Push Autorisé Si:

1. Tests Jest ✅ (100%)
2. Tests Playwright ✅ (100%)
3. Linting ✅
4. TypeScript ✅
5. Sécurité ✅ (no HIGH/CRITICAL)
6. Build prod ✅

### ❌ Push Interdit Si:

1 seul test échoue OU erreur lint/TS OU vulnérabilité OU build fail

## Workflow Git + Vercel

```bash
git checkout -b feature/nom
# TDD: écrire tests → implémenter → refactor
npm run validate
git add . && git commit -m "feat: description"
git push origin feature/nom
# Vercel auto-preview
gh pr create --title "feat: description"
# Merge → auto-deploy prod
```

## Permissions Fichiers

### ✅ Auto-Modification (Sans Permission)

**Config**: package.json, next.config.js, tailwind.config.js, vercel.json, tsconfig.json, jest.config.js, playwright.config.ts, .env.local, .gitignore
**Code**: `components/**`, `app/**`, `lib/**`, `tests/**`
**Docs Techniques**: README.md, `docs/api/**`, `docs/components/**`
**CI/CD**: `.github/workflows/**`, `.husky/**`

### ⚠️ Permission Requise

- `docs/PRD.md` (Product Requirements)
- `docs/roadmap.md` (Planning)
- `.env.production` (Var prod)
- Schémas DB / Migrations

## Instructions Claude Code

### Processus TDD

1. ❓ "Dois-je d'abord écrire les tests?"
2. ✍️ Générer tests AVANT code prod
3. ⚡ Auto-modifier fichiers "Safe to Edit"
4. 🔐 Demander permission PRD/roadmap
5. 🎨 Utiliser DaisyUI dans tests
6. 📝 Documenter auto (tech docs)
7. 🚀 Valider AVANT push

### Questions Pre-Génération

- DaisyUI couvre ce besoin?
- Quelle icône Lineicons?
- Fallback React Icons nécessaire?
- Tests Jest + Playwright requis?
- Server ou Client Component?
- Optimisation NextJS 15/Vercel?
- Accessibilité testée?
- Permission PRD/roadmap?

### Workflow Auto vs Permission

```ts
// ✅ Auto (sans permission)
["Créer composant DaisyUI+Lineicons", "Tests Jest+Playwright",
 "Modifier package.json", "Docs techniques", "Config Tailwind/Vercel"]

// ⚠️ Permission requise
["Modifier PRD.md", "Mettre à jour roadmap.md",
 "Variables prod", "Supprimer features"]
```

### Resources

- **NextJS**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs
- **DaisyUI**: https://daisyui.com/components/
- **Lineicons**: https://lineicons.com/icons/
- **Playwright**: https://playwright.dev/

### Interaction Example

```ts
// ✅ Auto OK
"Je crée le composant Button DaisyUI+Lineicons + tests + docs tech."

// ⚠️ Demander
"Puis-je modifier docs/roadmap.md pour cette feature?"

// ❌ Interdit sans permission
"Je modifie le PRD pour ajouter..."
```

---

*Config TDD NextJS 15 + Vercel optimisée | Documentation auto | Déploiement continu*

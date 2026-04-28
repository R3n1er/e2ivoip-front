# Claude Config - NextJS + DaisyUI

Prends en compte CLAUDE.md et .agents.md

> 📌 **Mémoire projet** : consulter `memory.md` à la racine pour le suivi global (décisions, contexte, références). À mettre à jour à chaque décision structurante.

# 🎨 Charte Graphique (RÈGLE ABSOLUE)

**Source de vérité unique** :
- `docs/CHARTE_GRAPHIQUE.md` — référentiel technique (Markdown)
- `docs/Charte_Graphique_E2I_VoIP.docx` — version Word (documents commerciaux)
- `docs/BrandBrief_e2ivoip.md` — brief de marque (positionnement, ton, persona)

**Couleurs officielles — interdiction d'introduire toute couleur hors charte** :

| Rôle | Hex | Variable CSS | Tailwind |
|---|---|---|---|
| Rouge Principal | `#E53E3E` | `--red-primary` | `text-red-primary` / `bg-red-primary` |
| Bleu Marine | `#2D3848` | `--blue-marine` | `text-blue-marine` / `bg-blue-marine` |
| Gris Secondaire | `#818096` | `--gray-secondary` | `text-gray-secondary` |
| Gris Foncé | `#1F2937` | `--gray-dark` | `text-gray-dark` |
| Blanc | `#FFFFFF` | — | — |

**Hero gradient OBLIGATOIRE** : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`

**Règles** :
1. Toujours utiliser les classes Tailwind/DaisyUI mappées à la charte (jamais d'inline color hors palette).
2. Avant toute nouvelle teinte, vérifier `docs/CHARTE_GRAPHIQUE.md`. Si manquante, **demander validation** avant d'ajouter.
3. Les fichiers `docs/CHARTE_GRAPHIQUE.md`, `docs/Charte_Graphique_E2I_VoIP.docx` et `docs/BrandBrief_e2ivoip.md` sont en **permission requise** : ne jamais les modifier sans accord explicite.
4. Toute modification de la charte doit être propagée dans les 3 fichiers (md + docx + brand brief) ET dans `memory.md`.

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
├── app/ (pages NextJS)
├── components/
│   ├── hubspot/ (universal form)
│   ├── layout/ (header/footer)
│   ├── ui/ (DaisyUI customisés)
│   └── features/ (métier)
├── lib/
│   ├── constants/hubspot.ts
│   ├── hooks/ (domain-organized)
│   ├── utils/lazy-motion.tsx
│   └── validation/ (Zod schemas)
├── tests/ (Jest + Playwright)
└── docs/ (PRD, roadmap, ARCHITECTURE, etc.)
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

### Mapping Commun (`lib/icons.ts`)

```ts
export const AppIcons = {
  home: "lni-home", user: "lni-user", settings: "lni-cog",
  add: "lni-plus", edit: "lni-pencil", delete: "lni-trash-can"
} as const;
```

## Styles E2I VoIP

### Hero Dégradé (OBLIGATOIRE)

```css
bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85
```

### FeatureCard (Standard)

```tsx
<FeatureCard
  title="Titre"
  description="Description"
  icon="lni-icon-name"
  badge={{ text: "Badge", icon: "lni-checkmark-circle" }}
  variant="primary" // primary|secondary|accent
/>
```

**Variantes**:
- **Primary**: Rouge E2I (`from-red-primary via-red-500 to-orange-500`)
- **Secondary**: Gris (`from-gray-800 via-gray-600 to-gray-500`)
- **Accent**: Mix (`from-gray-800 via-red-primary to-gray-500`)

### Boutons CTA (Standard)

```tsx
<button className="btn btn-lg bg-red-primary hover:bg-red-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold relative overflow-hidden group">
  <span className="flex items-center justify-center">
    Texte
    <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
  </span>
  <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
</button>
```

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
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate"],
    styled: true, utils: true, logs: false,
  },
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
**Code**: `src/components/**`, `src/app/**`, `src/lib/**`, `__tests__/**`
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

### Checklist Pre-Push

```md
- [ ] `npm run test:ci` ✅
- [ ] `npm run test:e2e` ✅
- [ ] `npm run lint` ✅
- [ ] `npm run type-check` ✅
- [ ] `npm run build` ✅
- [ ] Docs tech à jour ✅
- [ ] Permission PRD/roadmap ✅
- [ ] Vercel vars OK ✅
```

### Règle Absolue Push

**AVANT** tout push Git:
1. Exécuter `npm run validate`
2. Vérifier TOUS résultats ✅
3. Afficher résumé user
4. BLOQUER si 1 échec
5. Proposer corrections

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

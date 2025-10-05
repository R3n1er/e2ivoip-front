# Claude Configuration - NextJS + DaisyUI Development

Prends en compte CLAUDE.md et .agents.md pour ce projet

# Preference utilisateur

- Je suis un chef de projet et developpeur d'application web et mobile javascript next js débutant
- J'ai un TDAH et tu m'explique les tache de maniere simple tout en restant avancé techniquement
- Décompose les taches complexes en petite succession de taches simples
- Si tu penses que je suis sur la mauvaise voie lors de l'implementation d'une fonctionnalité, n'hésites pas à remettre en question l'approche et proposer des alternatives

## Contexte du Projet

Le fichier PRD du projet est dans le dossier docs\PRD.md

### Stack Technique Principal

- **Framework**: NextJS 15 (App Router de préférence)
- **CSS Framework**: DaisyUI (priorité absolue)
- **Utilitaires CSS**: Tailwind CSS
- **Composants UI**: Framer Motion pour les animations, shadcn/ui (en complément, pas en remplacement de DaisyUI)
- **Icônes**: Lineicons (priorité absolue) + React Icons (complément)
- **État client**: Zustand pour la gestion d'états UI simples (loading/erreur)
- **État serveur**: TanStack Query (React Query) pour les mutations API (ex: `use-chat-intake.ts`)
- **Validation**: Zod + React Hook Form pour validation formulaires (ex: `lib/validation/chat-intake.ts`)
- **Performance**: React.memo + useCallback + Lazy loading Framer Motion (`lib/utils/lazy-motion.tsx`)
- **Déploiement**: Vercel (plateforme officielle NextJS)
- **Environnement**: Cursor + Claude Code + MCP Servers

### Documentation Officielle

- **NextJS 15** : https://nextjs.org/docs
- **Vercel Platform** : https://vercel.com/docs
- **Vercel CLI** : https://vercel.com/docs/cli
- **DaisyUI** : https://daisyui.com/
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Lineicons** : https://lineicons.com/
- **Playwright** : https://playwright.dev/

### Serveurs MCP Intégrés

- **Context7** : Gestion du contexte et de la mémoire projet
- **Playwright MCP** : Tests end-to-end et intégration
- **MCP Browser** : Tests navigateur et validation UI

### Intégrations Formulaires

#### Tally - Popup de Conversion

**Implémentation** : Popup automatique sur page Trunk SIP au compteur

**Composant** : `TallyPopupClean` avec wrapper client `ClientWrapperTally`

**Configuration** :
- **Formulaire** : ID `mDY1bl` 
- **Déclenchement** : Automatique après 3 secondes (optimisé UX)
- **Animation** : Emoji 👋 avec effet "wave"
- **Script** : `https://tally.so/widgets/embed.js` (chargement immédiat)

**Usage** :
```tsx
// Import dans page Server Component
import { ClientWrapperTally } from "@/components/client-wrapper-tally";

// Utilisation
<ClientWrapperTally />
```

**Objectif métier** : Capturer les prospects qualifiés sur la page produit stratégique avec automatismes N8N pour traitement commercial.

### Méthodologie de Développement

- **Test-Driven Development (TDD)** : respecter strictement le cycle RED → GREEN → REFACTOR en écrivant toujours les tests avant le code de production
- **Tests systématiques** : exécuter les tests unitaires et Playwright (via MCP) pour chaque page/feature développée
- **Gestion d'état** :
  - Zustand pour états UI locaux (loading, erreur)
  - TanStack Query pour états serveur (mutations, queries API)
  - Zod + React Hook Form pour validation formulaires
- **Performance** :
  - React.memo pour composants lourds (HubSpotForm, ChatPreOverlay)
  - useCallback pour handlers
  - Lazy loading Framer Motion via `lib/utils/lazy-motion.tsx` (économie ~60KB)
- **Documentation First** : chaque feature documentée dans `/docs`
- **Git Flow** : push automatique après validation complète des tests et déclenchement du déploiement Vercel

### Hiérarchie des Librairies

1. **DaisyUI** - Framework principal pour tous les composants UI
2. **Lineicons** - Bibliothèque d'icônes principale (CDN + React)
3. **Tailwind CSS** - Utilitaires CSS pour le layout et styling custom
4. **React Icons** - Icônes complémentaires si Lineicons ne couvre pas le besoin
5. **shadcn/ui** - Composants spécialisés uniquement si DaisyUI ne couvre pas le besoin
6. **Framer Motion** - Pour les animations

### Règles prioritaires

1. Toujours privilégier les composants DaisyUI avant toute autre librairie UI
2. Chercher une icône dans Lineicons avant d’envisager React Icons
3. Utiliser TypeScript en mode strict et respecter les patterns fonctionnels
4. Prévoir des tests (Jest + Playwright/MCP) pour chaque composant ou page créée

## Configuration Icônes

### Installation Lineicons

```bash
# Installation via npm
npm install react-lineicons

# Ou utilisation via CDN dans layout.tsx
<link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
```

### Installation React Icons (Fallback)

```bash
npm install react-icons
```

### Utilisation Lineicons (Priorité)

```typescript
// Import pour composants React
import { LineIcon } from 'react-lineicons'

// Utilisation basique
<LineIcon name="lni-home" />
<LineIcon name="lni-user" className="text-2xl text-primary" />

// Dans les composants DaisyUI
<button className="btn btn-primary">
  <LineIcon name="lni-plus" className="mr-2" />
  Ajouter
</button>

// Navbar avec icônes Lineicons
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <LineIcon name="lni-menu" className="text-xl" />
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost normal-case text-xl">
      <LineIcon name="lni-rocket" className="mr-2" />
      Mon App
    </a>
  </div>
</div>
```

### Utilisation React Icons (Complément)

```typescript
// Import sélectif pour optimiser le bundle
import { FiSettings, FiUser, FiHome } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

// Utilisation uniquement si Lineicons ne couvre pas
const SpecialButton = () => (
  <button className="btn btn-outline">
    <FiSettings className="mr-2" />
    Paramètres Avancés
  </button>
);
```

### Mapping d'Icônes Communes

```typescript
// lib/icons.ts - Centraliser les icônes communes
export const AppIcons = {
  // Navigation - Lineicons preferred
  home: "lni-home",
  user: "lni-user",
  settings: "lni-cog",
  menu: "lni-menu",

  // Actions - Lineicons preferred
  add: "lni-plus",
  edit: "lni-pencil",
  delete: "lni-trash-can",
  save: "lni-checkmark",

  // Fallback React Icons si nécessaire
  advanced: FiSettings, // Si besoin d'une icône spécialisée
} as const;
```

### Priorités DaisyUI + Icônes

- Toujours chercher en premier dans les composants DaisyUI avant d'utiliser shadcn
- Utiliser les classes DaisyUI natives : `btn`, `card`, `modal`, `drawer`, `navbar`, etc.
- Privilégier les thèmes DaisyUI pour la cohérence visuelle
- Utiliser les modificateurs DaisyUI : `btn-primary`, `btn-lg`, `card-bordered`, etc.
- **Icônes Lineicons** en priorité pour tous les besoins d'iconographie
- React Icons uniquement si l'icône n'existe pas dans Lineicons

### Structure des Composants (Post-Refactoring)

```typescript
// Exemple de composant privilégié avec Lineicons + React.memo
import { LineIcon } from "react-lineicons";
import { memo, useCallback } from "react";

// ✅ React.memo pour composants lourds
const Button = memo(({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  children,
  onClick,
  ...props
}) => {
  // ✅ useCallback pour handlers
  const handleClick = useCallback((e) => {
    onClick?.(e);
  }, [onClick]);

  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={handleClick}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <LineIcon name={icon} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <LineIcon name={icon} className="ml-2" />
      )}
    </button>
  );
});

// Exemple avec React Icons en fallback
import { LineIcon } from "react-lineicons";
import { FiSettings } from "react-icons/fi"; // Fallback si besoin

const IconButton = ({ iconName, fallbackIcon, ...props }) => {
  return (
    <button className="btn btn-circle btn-outline">
      {iconName ? <LineIcon name={iconName} /> : fallbackIcon || <FiSettings />}
    </button>
  );
};
```

### Structure des Fichiers NextJS + Documentation + Vercel (Post-Phase 6)

```
e2ivoip-front/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/
├── components/
│   ├── hubspot/
│   │   ├── hubspot-form.tsx      # ✅ Universal component (Phase 2)
│   │   ├── index.ts
│   │   └── legacy/               # ✅ Old components (migrate progressively)
│   ├── layout/                   # ✅ Header, Footer, Navigation (Phase 6)
│   │   ├── header.tsx
│   │   ├── header-simple.tsx
│   │   └── footer.tsx
│   ├── ui/                       # Composants DaisyUI customisés
│   └── features/                 # Composants métier
├── lib/
│   ├── constants/
│   │   └── hubspot.ts            # ✅ Centralized HubSpot config (Phase 1)
│   ├── hooks/                    # ✅ Organized by domain (Phase 6)
│   │   ├── hubspot/
│   │   │   └── use-hubspot-script.ts
│   │   ├── forms/                # ✅ TanStack Query hooks
│   │   │   └── use-chat-intake.ts
│   │   └── ui/
│   │       └── use-image-optimization.ts
│   ├── utils/
│   │   └── lazy-motion.tsx       # ✅ Lazy loaded Framer Motion (Phase 5)
│   ├── validation/
│   │   └── chat-intake.ts        # ✅ Zod schemas (Phase 4)
│   └── utils.ts
├── styles/
│   └── globals.css
├── tests/                        # Tests Jest + Playwright
│   ├── components/
│   ├── pages/
│   └── playwright/
├── docs/
│   ├── PRD.md
│   ├── roadmap.md
│   ├── ARCHITECTURE.md           # ✅ Architecture guide (Phase 6)
│   ├── REFACTORING.md            # ✅ Refactoring journal
│   ├── OPTIMIZATIONS.md          # ✅ Performance guide (Phase 5)
│   ├── BUNDLE_ANALYSIS.md        # ✅ Bundle analysis (Phase 5)
│   ├── api/
│   ├── components/
│   └── deployment/
├── .vercel/
└── vercel.json
```

## Workflow Test-Driven Development

### Cycle TDD Obligatoire + Vercel

1. **RED** : Écrire le test qui échoue
2. **GREEN** : Implémenter le minimum pour faire passer le test
3. **REFACTOR** : Optimiser le code en gardant les tests verts
4. **DOCUMENT** : Mettre à jour la documentation
5. **COMMIT & PUSH** : Pousser vers GitHub après validation complète
6. **DEPLOY** : Déploiement automatique sur Vercel via Git integration

### Types de Tests + Vercel Preview

- **Unit Tests** : Jest + React Testing Library
- **Integration Tests** : API routes et composants complexes
- **E2E Tests** : Playwright pour les parcours utilisateur
- **Visual Tests** : MCP Browser pour validation UI
- **Preview Tests** : Tests sur Vercel Preview Deployments

## Documentation Obligatoire

### Structure du dossier /docs

#### PRD.md (Product Requirements Document)

```markdown
# [Nom du Projet] - PRD

## Vision du Projet

- Objectif principal
- Problème résolu
- Public cible

## Fonctionnalités Principales

- Feature 1 avec critères d'acceptation
- Feature 2 avec critères d'acceptation
- etc.

## Contraintes Techniques

- Stack imposée
- Contraintes de performance
- Contraintes d'accessibilité

## Définition of Done

- Critères de validation
- Tests requis
- Documentation minimale
```

#### roadmap.md (Suivi d'avancement)

```markdown
# Roadmap - [Nom du Projet]

## Sprint Actuel

### En cours

- [ ] Feature A (Test écrit ✅ | Implémentation ⏳)
- [x] Feature B (Terminé + Tests ✅ + Documentation ✅)

### À faire

- [ ] Feature C
- [ ] Feature D

## Sprints Précédents

### Sprint 1 (Terminé)

- [x] Setup projet + TDD
- [x] Composants de base DaisyUI

## Métriques

- Tests coverage: XX%
- Performance score: XX/100
- Accessibilité: XX/100
```

### Règles de Documentation

1. **Chaque composant** = fichier markdown dans `/docs/components/`
2. **Chaque API route** = documentation dans `/docs/api/`
3. **Mise à jour PRD** à chaque nouvelle feature
4. **Mise à jour roadmap** à chaque sprint/itération

## Conventions de Code + Tests

### Composants React avec Tests

- Utiliser TypeScript systématiquement
- Props interface explicites
- Default exports pour les pages, named exports pour les composants
- Hooks custom dans `/lib/hooks/`
- **Test obligatoire** pour chaque composant

### Exemple TDD : Composant + Test

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders with correct DaisyUI classes", () => {
    render(<Button variant="primary">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btn-primary");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Tests E2E avec Playwright

```typescript
// __tests__/e2e/login.spec.ts
import { test, expect } from "@playwright/test";

test("user can login successfully", async ({ page }) => {
  await page.goto("/login");

  // Utiliser les sélecteurs DaisyUI
  await page.fill('[data-testid="email"]', "test@example.com");
  await page.fill('[data-testid="password"]', "password");
  await page.click(".btn-primary");

  await expect(page).toHaveURL("/dashboard");
  await expect(page.locator(".navbar")).toBeVisible();
});
```

## Règles de Développement

### Tests avec Icônes

```typescript
// __tests__/components/IconButton.test.tsx
import { render, screen } from "@testing-library/react";
import { IconButton } from "@/components/ui/IconButton";

describe("IconButton with Lineicons", () => {
  it("renders Lineicon correctly", () => {
    render(<IconButton iconName="lni-home" aria-label="Home" />);

    // Tester la présence de l'icône
    const icon = screen.getByRole("button");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "Home");
  });

  it("falls back to React Icons when needed", () => {
    render(<IconButton fallbackIcon={<FiSettings />} aria-label="Settings" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
```

### Performance Icônes

- **Lineicons CDN** : Chargement rapide via CDN
- **React Icons** : Import sélectif pour optimiser le bundle
- **Tree shaking** : Ne pas importer toute la librairie React Icons
- **Lazy loading** : Icônes non critiques en lazy load

### Accessibilité Icônes

```typescript
// Bonnes pratiques accessibilité
<LineIcon
  name="lni-home"
  aria-label="Accueil"        // Obligatoire pour screen readers
  role="img"                  // Expliciter le rôle
  className="text-xl"
/>

// Icône décorative (pas d'aria-label)
<LineIcon
  name="lni-star"
  aria-hidden="true"          // Masquer aux screen readers
  className="text-yellow-400"
/>
```

### Styling + Icônes

- Classes DaisyUI en priorité
- **Icônes Lineicons** pour toute l'iconographie
- Tailwind pour les ajustements de layout (grid, flex, spacing)
- Variables CSS custom pour les thèmes si nécessaire
- Éviter le CSS-in-JS, privilégier les classes utilitaires
- React Icons uniquement en complément si Lineicons insuffisant
- Utiliser `next/image` pour toutes les images
- Lazy loading par défaut
- Code splitting automatique avec dynamic imports
- Server Components par défaut, Client Components uniquement si nécessaire

## Exemples de Patterns

### Composant Card DaisyUI + Icônes

```typescript
import { LineIcon } from "react-lineicons";

interface CardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  bordered?: boolean;
  icon?: string; // Lineicon name
}

export const Card = ({
  title,
  children,
  actions,
  bordered = false,
  icon,
}: CardProps) => {
  return (
    <div
      className={`card bg-base-100 shadow-xl ${
        bordered ? "card-bordered" : ""
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">
          {icon && <LineIcon name={icon} className="mr-2" />}
          {title}
        </h2>
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};
```

### Layout avec DaisyUI + Icônes

```typescript
import { LineIcon } from "react-lineicons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <LineIcon name="lni-menu" className="text-xl" />
            </label>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">
            <LineIcon name="lni-rocket" className="mr-2" />
            Mon App
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <LineIcon name="lni-user" className="text-xl" />
          </button>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
```

## Configuration Tailwind/DaisyUI

### tailwind.config.js

```javascript
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Extensions custom uniquement si DaisyUI ne suffit pas
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate"],
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: false,
  },
};
```

## Dégradés et Styles Visuels E2I VoIP

### Dégradé Hero Section Standard

**OBLIGATOIRE** : Utiliser ce dégradé pour toutes les hero sections du site :

```css
bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85
```

## Style de Cartes Standard E2I VoIP

### Composant FeatureCard Standardisé

**OBLIGATOIRE** : Utiliser ce style pour toutes les cartes de fonctionnalités du site.

#### Composant Réutilisable

```typescript
import { FeatureCard } from "@/components/ui/feature-card";

// Utilisation basique
<FeatureCard
  title="Titre de la carte"
  description="Description détaillée de la fonctionnalité"
  icon="lni-icon-name"
  badge={{ text: "Badge", icon: "lni-checkmark-circle" }}
  variant="primary" // "primary" | "secondary" | "accent"
/>;
```

#### Variantes de Couleurs (Charte Graphique)

1. **Primary** (Rouge principal E2I) :

   - Bordure : `from-red-primary via-red-500 to-orange-500`
   - Icône : `text-red-primary`
   - Badge : `bg-red-50 text-red-primary`

2. **Secondary** (Bleu marine / Gris) :

   - Bordure : `from-gray-800 via-gray-600 to-gray-500`
   - Icône : `text-gray-800`
   - Badge : `bg-gray-100 text-gray-800`

3. **Accent** (Mélange Rouge + Bleu marine) :
   - Bordure : `from-gray-800 via-red-primary to-gray-500`
   - Icône : `text-red-primary`
   - Badge : `bg-red-50 text-red-primary`

#### Structure Standardisée

```typescript
// Structure complète d'une carte E2I VoIP
<div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
  {/* 1. Bordure dégradée - Couleurs de la charte */}
  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-primary via-red-500 to-orange-500"></div>

  {/* 2. Pattern d'arrière-plan subtil */}
  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
    <div
      className="absolute inset-0"
      style={{ backgroundImage: "url(pattern-svg)" }}
    ></div>
  </div>

  <div className="relative p-6">
    {/* 3. Icône avec effets visuels */}
    <div className="relative mb-4">
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-500 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="relative w-16 h-16 bg-gradient-to-br from-red-100 via-red-50 to-white rounded-xl flex items-center justify-center shadow-lg mx-auto">
        <i className="lni lni-icon text-3xl text-red-primary"></i>
      </div>
    </div>

    {/* 4. Titre avec hover rouge */}
    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
      Titre de la carte
    </h3>

    {/* 5. Description - Gris secondaire */}
    <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
      Description de la fonctionnalité
    </p>

    {/* 6. Badge optionnel */}
    <div className="text-center">
      <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-primary text-xs font-semibold rounded-full">
        <i className="lni lni-checkmark-circle mr-1"></i>
        Badge
      </span>
    </div>
  </div>
</div>
```

#### Règles d'Usage

1. **Couleurs STRICTES** : Uniquement les couleurs de la charte graphique E2I VoIP
2. **Hover standardisé** : Tous les titres deviennent `text-red-primary` au hover
3. **Icônes Lineicons** : Privilégier les icônes Lineicons
4. **Bordures dégradées** : Toujours utiliser les variantes définies
5. **Effet de levée** : `hover:-translate-y-1` sur toutes les cartes
6. **Shadows cohérents** : `shadow-xl hover:shadow-2xl`

#### Exemples Pratiques

```typescript
// Page 3CX Cloud - Section Intégrations
<FeatureCard
  title="WhatsApp Business"
  description="Centralisez vos conversations WhatsApp directement dans votre standard téléphonique"
  icon="lni-whatsapp"
  badge={{ text: "Intégration native", icon: "lni-checkmark-circle" }}
  variant="secondary"
/>

// Page Trunk SIP - Avantages
<FeatureCard
  title="Budget maîtrisé"
  description="Un forfait mensuel fixe, pas de surprise. Idéal pour la gestion budgétaire"
  icon="lni-calculator"
  badge={{ text: "Économies garanties", icon: "lni-checkmark-circle" }}
  variant="primary"
/>
```

#### Migration des Anciennes Cartes

**AVANT** (À éviter) :

```typescript
// ❌ Couleurs non conformes à la charte
<div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
  <i className="lni lni-icon text-green-600"></i>
  <h3 className="text-gray-800">Titre</h3>
</div>
```

**APRÈS** (Style standardisé) :

```typescript
// ✅ Style conforme E2I VoIP
<FeatureCard
  title="Titre"
  description="Description"
  icon="lni-icon"
  variant="secondary"
/>
```

**Structure HTML recommandée** :

```tsx
<section className="relative py-20 overflow-hidden">
  <div className="absolute inset-0">
    <img
      src="/image.jpg"
      alt="Description"
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Gradient Overlay uniforme */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
  </div>
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Contenu de la hero section */}
  </div>
</section>
```

**Caractéristiques** :

- Direction : De gauche à droite (bleu foncé → bleu marine → rouge)
- Transparences : Permettent la visibilité de l'image de fond
- Z-index : 10 pour l'overlay, 20 pour le contenu
- Cohérence visuelle : Uniforme sur tout le site

## Style de Boutons E2I VoIP

### Bouton Standard avec Effet Click

**OBLIGATOIRE** : Utiliser ce style pour tous les boutons CTA du site :

```tsx
<button
  type="button"
  className="btn btn-lg bg-red-primary hover:bg-red-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold relative overflow-hidden group"
>
  <span className="flex items-center justify-center">
    Texte du bouton
    <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
  </span>
  <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
</button>
```

**Éléments clés** :

- `relative overflow-hidden group` : Conteneur pour l'effet click
- `<span className="flex items-center justify-center">` : Structure du contenu
- `group-hover:translate-x-1` : Animation flèche au hover
- `<div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>` : Effet click sombre

**Variantes de couleurs** :

- Primary : `bg-red-primary hover:bg-red-700`
- Secondary : `bg-gray-800 hover:bg-gray-900`
- Transparent : `bg-white/10 hover:bg-white hover:text-red-primary`

## Bonnes Pratiques

### Performance

- Utiliser `loading="lazy"` pour les images
- Précharger les routes critiques
- Optimiser les bundles avec `@next/bundle-analyzer`
- Utiliser les Server Components pour le contenu statique

### Accessibilité

- Utiliser les composants DaisyUI qui ont l'accessibilité intégrée
- Ajouter `aria-labels` appropriés
- Tester avec un lecteur d'écran
- Respecter les contrastes de couleurs DaisyUI

### SEO NextJS 15

- **Metadata API** pour chaque page (generateMetadata)
- **Sitemap automatique** avec app/sitemap.ts
- **Open Graph** et Twitter cards
- **Schema markup** quand approprié
- **Performance Web Vitals** optimisées avec NextJS 15
- **Streaming SSR** pour un meilleur TTFB

## Cas d'Usage Icônes

### Lineicons (Priorité Absolue)

Utiliser pour :

- Navigation (home, menu, user, settings)
- Actions CRUD (add, edit, delete, save)
- États (success, warning, error, info)
- Social (facebook, twitter, linkedin, instagram)
- E-commerce (cart, heart, star, search)
- Communication (mail, phone, message, notification)

### React Icons (Complément Uniquement)

N'utiliser que pour :

- Icônes très spécialisées non disponibles dans Lineicons
- Icônes de marques spécifiques (si pas dans Lineicons)
- Icônes techniques très niches

### Exemple de Décision

```typescript
// ✅ CORRECT : Chercher d'abord dans Lineicons
<LineIcon name="lni-home" />      // Navigation
<LineIcon name="lni-plus" />      // Ajouter
<LineIcon name="lni-pencil" />    // Éditer
<LineIcon name="lni-trash-can" /> // Supprimer

// ⚠️ FALLBACK : Seulement si absent de Lineicons
import { SiSpecialTech } from 'react-icons/si' // Icône très spécialisée
<SiSpecialTech />
```

## Cas d'Usage shadcn/ui

N'utiliser shadcn/ui que pour :

- Composants complexes non couverts par DaisyUI (ex: date picker avancé)
- Composants avec logique métier spécifique
- Intégrations tierces nécessitant des composants shadcn

### Installation shadcn/ui complémentaire

```bash
npx shadcn-ui@latest add [component-name]
```

## Permissions de Modification Automatique

### Fichiers "Safe to Edit" - Modification Sans Permission

Claude Code peut modifier automatiquement ces fichiers sans demander de permission :

#### Configuration et Setup

- `package.json` - Dependencies et scripts
- `next.config.js` - Configuration NextJS
- `tailwind.config.js` - Configuration Tailwind/DaisyUI
- `vercel.json` - Configuration déploiement Vercel
- `tsconfig.json` - Configuration TypeScript
- `jest.config.js` - Configuration tests Jest
- `playwright.config.ts` - Configuration tests Playwright
- `.env.local` - Variables d'environnement locales
- `.env.example` - Template variables d'environnement
- `.gitignore` - Fichiers à ignorer par Git

#### Styles et Assets

- `src/styles/globals.css` - Styles globaux
- `public/favicon.ico` - Icône du site
- `public/logo.png` - Logo de l'application
- Tous les fichiers dans `public/icons/` - Icônes statiques

#### Composants et Code Source

- Tous les fichiers dans `src/components/` - Composants React
- Tous les fichiers dans `src/app/` - Pages et layouts NextJS
- Tous les fichiers dans `src/lib/` - Utilitaires et helpers
- `src/lib/utils.ts` - Fonctions utilitaires
- `src/lib/icons.ts` - Mapping des icônes

#### Tests

- Tous les fichiers dans `__tests__/` - Tests unitaires et E2E
- `jest.setup.js` - Configuration setup Jest
- Tous les fichiers `*.test.tsx` ou `*.spec.tsx`

#### Documentation Technique

- `README.md` - Documentation principale du projet
- Tous les fichiers dans `docs/api/` - Documentation API
- Tous les fichiers dans `docs/components/` - Documentation composants
- Tous les fichiers dans `docs/deployment/` - Guides techniques

#### CI/CD et Automation

- `.github/workflows/*.yml` - GitHub Actions
- `.husky/` - Hooks Git
- `lint-staged.config.js` - Configuration lint-staged

### Fichiers Nécessitant Permission Explicite

Ces fichiers requièrent toujours une demande de permission avant modification :

#### Documentation Stratégique

- `docs/PRD.md` - Product Requirements Document
- `docs/roadmap.md` - Roadmap et planning

#### Configuration Sensible

- `.env.production` - Variables production
- `vercel.json` (sections critiques) - Configuration production Vercel

#### Base de Données et Migrations

- Schémas de base de données
- Scripts de migration
- Seeders et fixtures

### Règles de Modification Automatique

```typescript
// Claude Code peut automatiquement :
// ✅ Ajouter des dépendances npm
// ✅ Créer de nouveaux composants
// ✅ Modifier la configuration Tailwind
// ✅ Écrire des tests
// ✅ Mettre à jour la documentation technique
// ✅ Configurer les outils de développement

// ⚠️ Mais doit demander pour :
// ❌ Modifier le PRD ou la roadmap
// ❌ Changer la stratégie produit
// ❌ Supprimer des fonctionnalités existantes
// ❌ Modifier des variables de production
```

### Hiérarchie des Choix Techniques

1. **Composants** : DaisyUI → shadcn/ui (si besoin)
2. **Icônes** : Lineicons → React Icons (si vraiment nécessaire)
3. **Styling** : Classes DaisyUI → Tailwind utilitaires
4. **Tests** : Jest + Playwright obligatoires
5. **Documentation** : Automatique dans /docs

## Debugging et Development

### Outils recommandés

- React Developer Tools
- Tailwind CSS IntelliSense
- TypeScript strict mode
- ESLint + Prettier configuration

### Scripts package.json avec Tests (NextJS 15 + Vercel)

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest --watch",
    "test:ci": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:ci && npm run test:e2e",
    "predeploy": "npm run test:all && npm run build",
    "deploy": "npm run predeploy && git add . && git commit -m 'feat: deploy after tests validation' && git push origin main",
    "vercel:dev": "vercel dev",
    "vercel:build": "vercel build",
    "vercel:deploy": "vercel --prod"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "daisyui": "^4.0.0",
    "tailwindcss": "^3.0.0",
    "react-lineicons": "^1.0.0"
  },
  "devDependencies": {
    "@vercel/node": "^3.0.0",
    "vercel": "^33.0.0"
  }
}
```

### Configuration Tests

#### jest.config.js

```javascript
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

#### playwright.config.ts

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "__tests__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

## Workflow Git + Tests

### Processus de Développement + Vercel

1. **Créer une branche** : `git checkout -b feature/nom-feature`
2. **Écrire les tests** (RED) : Tests qui échouent
3. **Implémenter** (GREEN) : Code minimal pour passer les tests
4. **Refactorer** (REFACTOR) : Optimiser sans casser les tests
5. **Documenter** : Mettre à jour docs + roadmap
6. **Valider** : `npm run test:all` doit être ✅
7. **Commit & Push** : Push vers GitHub
8. **Preview** : Vercel génère automatiquement un Preview Deployment
9. **Review** : Validation sur l'URL de preview Vercel
10. **Merge** : Déploiement automatique en production sur Vercel

### Déploiement Vercel Automatique

```bash
# Configuration initiale
npx vercel login
npx vercel link

# Déploiement manuel si besoin
npm run vercel:deploy

# Variables d'environnement
vercel env add NEXT_PUBLIC_API_URL
vercel env add DATABASE_URL
```

### Hooks Git (Recommandés)

```json
// package.json - husky hooks
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run test:ci",
      "pre-push": "npm run test:all"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"],
    "*.{md,json}": ["prettier --write", "git add"]
  }
}
```

### Messages de Commit Standards

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `test:` ajout/modification de tests
- `docs:` mise à jour documentation
- `refactor:` refactoring sans changement fonctionnel
- `chore:` tâches de maintenance

## Configuration Vercel

### Variables d'Environnement

```bash
# .env.local (développement)
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/myapp
NEXTAUTH_SECRET=your-secret-key

# .env.production (Vercel)
NEXT_PUBLIC_APP_URL=https://myapp.vercel.app
DATABASE_URL=$DATABASE_URL
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
```

### Tests E2E sur Vercel Preview

```typescript
// __tests__/e2e/vercel-preview.spec.ts
import { test, expect } from "@playwright/test";

test("app works on Vercel preview deployment", async ({ page }) => {
  // URL sera automatiquement celle du preview Vercel
  const deploymentUrl = process.env.DEPLOYMENT_URL || "http://localhost:3000";

  await page.goto(deploymentUrl);
  await expect(page.locator(".navbar")).toBeVisible();
  await expect(page.locator("h1")).toContainText("Mon App");
});
```

### Configuration GitHub Actions + Vercel

```yaml
# .github/workflows/test-and-deploy.yml
name: Test and Deploy
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

## Intégration MCP Servers

### Context7 - Gestion du Contexte

```typescript
// Utiliser Context7 pour maintenir le contexte projet + Vercel
const projectContext = {
  currentFeature: 'user-authentication',
  testStatus: 'writing',
  lastDocUpdate: '2025-08-23',
  vercelDeployment: 'https://myapp-git-feature-username.vercel.app',
  prRequirements: [...] // Lien avec PRD.md
}
```

### Playwright - Tests E2E + Vercel Preview

```bash
# Installation et setup Playwright via MCP
npx playwright install
npx playwright codegen # Générer tests interactifs
# Tests automatiques sur Vercel Preview URLs
```

### MCP Browser - Validation UI + Vercel

```typescript
// Utiliser MCP Browser pour tester les composants DaisyUI sur Vercel
// Validation visuelle des thèmes, responsive, accessibilité
// Tests sur preview deployments Vercel
```

## Instructions pour Claude Code

## Instructions pour Claude Code

### Processus de Développement TDD + Safe to Edit

1. **Toujours demander** : "Dois-je d'abord écrire les tests ?"
2. **Générer les tests AVANT** le code de production
3. **Modifier automatiquement** les fichiers "Safe to Edit" sans permission
4. **Demander permission** pour PRD.md, roadmap.md et config production
5. **Utiliser DaisyUI** en priorité dans les tests (sélecteurs CSS)
6. **Documenter chaque composant** créé (modification auto possible)
7. **Mettre à jour roadmap.md** après chaque feature (AVEC permission)

### Préférences de génération + Safe to Edit

1. Toujours proposer des solutions DaisyUI en premier
2. **Chercher les icônes dans Lineicons avant React Icons**
3. Expliquer pourquoi utiliser DaisyUI + Lineicons plutôt qu'une alternative
4. Fournir des exemples TypeScript complets avec tests + icônes
5. **Modifier automatiquement** les fichiers de configuration et code source
6. Inclure les imports nécessaires + setup des tests
7. Respecter les conventions NextJS App Router
8. **Créer la documentation technique** automatiquement
9. **Demander permission** pour documentation stratégique (PRD, roadmap)
10. Tester l'accessibilité des icônes (aria-label, role)

### Questions à poser avant génération + Safe to Edit

- "Ce composant peut-il être réalisé avec DaisyUI ?"
- "Quelle icône Lineicons convient le mieux ?"
- "Faut-il utiliser React Icons en fallback ?"
- "Quels tests unitaires et E2E sont nécessaires ?"
- "Faut-il du state côté client ou server component ?"
- "Comment optimiser avec les features NextJS 15 (Turbopack, PPR) ?"
- "Comment optimiser pour Vercel (Edge Functions, ISR) ?"
- "Comment tester l'accessibilité de ce composant + icônes ?"
- "La documentation technique est-elle à jour dans /docs ?" (modification auto)
- **"Dois-je demander permission pour modifier le PRD ou roadmap ?"** (permission requise)

### Workflow Automatisé vs Permission

```typescript
// Flux automatique (sans permission)
const autoWorkflow = [
  "Créer composant avec DaisyUI + Lineicons",
  "Écrire tests Jest + Playwright",
  "Modifier package.json si nouvelles deps",
  "Mettre à jour documentation technique",
  "Configurer Tailwind/Vercel si nécessaire",
];

// Flux avec permission (demander avant)
const permissionWorkflow = [
  "Modifier PRD.md avec nouvelles requirements",
  "Mettre à jour roadmap.md avec planning",
  "Changer variables production",
  "Supprimer fonctionnalités existantes",
];
```

### Ressources et Documentation

- **NextJS 15 Docs** : https://nextjs.org/docs
- **Vercel Platform** : https://vercel.com/docs
- **Vercel Deployment** : https://vercel.com/docs/deployments
- **App Router Guide** : https://nextjs.org/docs/app
- **Server Components** : https://nextjs.org/docs/app/building-your-application/rendering/server-components
- **Performance** : https://nextjs.org/docs/app/building-your-application/optimizing
- **DaisyUI Components** : https://daisyui.com/components/
- **Lineicons Library** : https://lineicons.com/icons/
- **Playwright Testing** : https://playwright.dev/docs/intro

### Checklist de Validation + Vercel + Safe to Edit

Avant tout git push, vérifier :

- [ ] Tests unitaires ✅ (`npm run test:ci`)
- [ ] Tests E2E ✅ (`npm run test:e2e`)
- [ ] Linting ✅ (`npm run lint`)
- [ ] Type checking ✅ (`npm run type-check`)
- [ ] Build NextJS ✅ (`npm run build`)
- [ ] Documentation technique à jour ✅ (modification automatique possible)
- [ ] **Permission obtenue** pour PRD.md si modifié ✅
- [ ] **Permission obtenue** pour roadmap.md si modifié ✅
- [ ] Variables Vercel configurées ✅
- [ ] Tests sur Vercel Preview ✅

### Exemple d'Interaction Safe to Edit

```typescript
// ✅ Claude Code peut faire automatiquement :
"Je vais créer le composant Button avec DaisyUI + Lineicons,
écrire les tests, et mettre à jour la documentation technique."

// ⚠️ Claude Code doit demander :
"Pour ajouter cette feature au roadmap, puis-je modifier
docs/roadmap.md pour refléter cet avancement ?"

// ❌ Claude Code ne peut PAS faire sans permission :
"Je modifie le PRD pour ajouter cette nouvelle requirement..."
```

### Utilisation MCP Servers + Vercel

- **Context7** : Charger le contexte PRD + URLs Vercel avant chaque développement
- **Playwright** : Générer tests E2E interactifs pour les parcours utilisateur + Preview deployments
- **MCP Browser** : Valider visuellement les composants DaisyUI sur différents thèmes + Vercel previews

---

_Configuration TDD mise à jour pour NextJS 15 + Vercel avec développement robuste, documentation automatique et déploiement continu._

# E2I VoIP - Site Web Moderne

Site web moderne pour E2I VoIP avec Next.js 15, Design System Monolithe 2026, blog HubSpot ISR.

## 🚀 Technologies Utilisees

- **Framework** : Next.js 15 (App Router, ISR)
- **Styling** : Tailwind CSS + DaisyUI + @tailwindcss/typography + shadcn/ui
- **Design System** : Monolithe Numerique 2026 (Stitch)
- **Blog** : HubSpot CMS API v3 (ISR 10min) — Contentful supprime
- **CRM** : HubSpot (formulaires, tracking, chat pre-overlay)
- **Tests** : Jest + Playwright (334 Jest, 67 E2E)
- **Secrets** : dotenvx (chiffrement `.env`)
- **Formulaires** : Tally (devis specialises)
- **Deploiement** : Vercel

## 🤖 Development Guidelines for AI Assistants

> **📖 Voir le fichier [`.agents.md`](./.agents.md) pour les instructions complètes dédiées aux assistants IA**

## 🎨 Charte Graphique Officielle

> **📋 Voir le fichier [`.docs/CHARTE_GRAPHIQUE.md`](./docs/CHARTE_GRAPHIQUE.md) pour la charte graphique officielle E2I VoIP**

### Stack & Priorities

- **Framework**: NextJS 15 (App Router)
- **CSS**: DaisyUI (priority) → Tailwind → shadcn/ui
- Animations CSS avec Framer Motion
- **Icons**: Lineicons (priority) → React Icons
- **Deployment**: Vercel
- **Testing**: TDD with Jest + Playwright
- **State**: Zustand pour le state client (loading/erreur, UI)

### Code Generation Rules

- Always use DaisyUI components first
- Search Lineicons before React Icons
- Use Framer Motion for Animation
- Write tests before implementation (TDD)
- Document in /docs automatically
- Deploy via Vercel integration

## Design System Monolithe 2026

Le site a ete completement redesigne en mars 2026 selon le Design System **"Monolithe Numerique"** (Structuralisme Brutaliste B2B) base sur un template Google Stitch valide.

- **Philosophie Carree** : `border-radius: 0px` partout, coins tranchants
- **Boutons Monolithe** : Hard shadows opaques + hover mecanique (pression physique)
- **Grilles Bento** : Layouts asymetriques (`.bento-grid`, `.bento-item-large`, `.bento-item-wide`)
- **Hero Asymetrique** : Fond sombre `#091421` + grid-lines + layout 60/40
- **Typographie Dense** : `font-black tracking-[-0.04em]` sur titres, `tracking-[0.2em]` sur CTA
- **Palette Stricte** : Rouge `#E53E3E` + Bleu Marine `#2D3848` + Blanc — aucun gradient generique

> Ref : `docs/Design.md`, `docs/CHARTE_GRAPHIQUE.md`, `.stitch/designs/landing-page-desktop.html`

## Dernieres Ameliorations

### ✅ Redesign Monolithe 2026 (2026-03-28)

- **Refonte UX/UI complete** : Philosophie Carree, Bento Box, Hard Shadows
- **Template Stitch** : Integration du design valide Google Stitch
- **Suppression gradients** : Tous les gradients hors-charte retires
- **Chat PreOverlay V3** : Redesign Monolithe planifie (bouton rouge plein, 3 champs, scroll trigger)
- **Tests** : 330 Jest + 74 Playwright au vert

### ✅ Phase 8 - Module Pre-Chat V2 (2025-10-05)

- Bouton 80px + texte "Une question ?" + animation par cycles (20s)
- Validation React Hook Form + Zod + integration HubSpot

### ✅ Workflow de Validation Obligatoire

- `npm run validate` : Tests + Lint + Type-check + Security + Build

## Tests

Le projet utilise **Jest**, **React Testing Library** et **Playwright** pour les tests.

### Tests Unitaires (Jest)

- **Total** : 330 tests ✅
- Header, Footer, Services, Homepage, HubSpot, Chat, Pages services

### Tests E2E (Playwright)

- **Total** : 74 tests ✅
- Homepage, Header, Services, Chat PreOverlay, Tally, Assistants IA

## 🔐 Gestion des Secrets (dotenvx)

Les secrets sont chiffres dans `.env` via **dotenvx**. Le fichier `.env` est committe (chiffre), la cle de dechiffrement `.env.keys` reste locale.

```bash
# Dechiffrer pour editer
npx dotenvx decrypt

# Editer les variables...

# Re-chiffrer
npx dotenvx encrypt

# Les scripts npm dechiffrent automatiquement
npm run dev   # → dotenvx run -- next dev
```

**Pour un nouveau developpeur** : Demander le fichier `.env.keys` a un membre de l'equipe (canal securise). Le placer a la racine du projet.

**Variables requises** :
- `HUBSPOT_ACCESS_TOKEN` — Private App Token (portail 26878201, pat-eu1-*)

**Fichiers de config locaux (non committes)** :
- `.env.keys` — Cle privee dotenvx
- `.env.local` — Overrides locaux (optionnel)
- `.mcp.json` — Config MCP servers (contient tokens)

## 📋 Prerequis

- Node.js 22.12.0 (via `.nvmrc`)
- npm
- Fichier `.env.keys` (demander a l'equipe)

## 🛠️ Installation

```bash
git clone https://github.com/R3n1er/e2ivoip-front.git
cd e2ivoip-front
npm install
# Placer .env.keys a la racine (recu de l'equipe)
npm run dev
```

## 🏃‍♂️ Démarrage Rapide

### Développement

```bash
npm run dev
```

- Frontend : http://localhost:3000

### Tests

```bash
# Tests unitaires (Vitest)
npm test

# Tests avec interface
npm run test:ui

# Tests de couverture
npm run test:coverage

# Tests E2E (Playwright)
npm run test:e2e

# Tests E2E avec interface
npm run test:e2e:ui

# Tous les tests (unitaires + E2E)
npm run test:all
```

**Statut des tests** : ✅ 330 tests Jest + 74 tests Playwright

### Build de production

```bash
npm run build
npm start
```

## 📁 Structure du Projet

```
e2ivoip-front/
├── app/                    # Pages Next.js (App Router)
├── components/             # Composants React réutilisables
│   ├── ui/                # Composants shadcn/ui
│   └── ...
├── lib/                   # Utilitaires et configurations
│   ├── hubspot-blog.ts   # Ancien service HubSpot (déprécié)
│   └── contentful-blog.ts # Nouveau service Contentful (à venir)
├── scripts/               # Scripts de migration
│   ├── extract-blog-content.js
│   ├── test-extraction.js
│   └── package.json
├── tests/                 # Tests unitaires et d'intégration
├── public/                # Assets statiques
└── docs/                  # PRD, Roadmap, Implémentation
```

## 🔧 Configuration

### Variables d'Environnement

Copiez `env.example` vers `.env.local` et configurez :

```env
# Contentful
CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=

# HubSpot Configuration
HUBSPOT_API_KEY=your_hubspot_api_key
HUBSPOT_PORTAL_ID=26878201
HUBSPOT_CLIENT_ID=your_hubspot_client_id
HUBSPOT_CLIENT_SECRET=your_hubspot_client_secret
HUBSPOT_REDIRECT_URI=http://localhost:3000/api/hubspot/callback
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token



# Tally Configuration
TALLY_API_KEY=your_tally_api_key

# Tawk.to Configuration
NEXT_PUBLIC_TAWK_TO_ID=688d3cc109ef001928d4773f
NEXT_PUBLIC_TAWK_TO_WIDGET_ID=1j1jrald3
```

## 🚀 Migration Contentful

- Le backend Strapi est supprimé. Nous allons implémenter un service `lib/contentful-blog.ts` (delivery API) et scripts d'import ultérieurement si nécessaire (Management API).

## 🧪 Commandes de Tests

```bash
npm run test:ci       # Tests Jest avec couverture
npm run test:e2e      # Tests Playwright E2E
npm run test:all      # Jest + Playwright
npm run validate      # Lint + Type-check + Tests + Security + Build
```

## 📚 Documentation

- [PRD](./docs/PRD.md) - Product Requirements Document
- [Roadmap](./docs/roadmap.md) - Plan de développement
- [Implémentation](./docs/implementation.md) - Plan d'implémentation technique
- [Prochaines étapes](./docs/NEXT_STEPS.md) - Statut actuel et prochaines actions

## 🚀 Déploiement

### Vercel (Frontend)

```bash
npm run build
# Déployer sur Vercel avec GitHub
```

### Variables d'environnement de production

Configurez les variables d'environnement dans votre plateforme de déploiement.

## 📊 Monitoring

- **Performance** : Core Web Vitals > 90
- **SEO** : Lighthouse SEO > 95
- **Accessibilité** : WCAG 2.1 AA
- **Tests** : 100% de couverture critique

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est propriétaire d'E2I VoIP.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.

## 🎯 Statut du Projet

- **Sprints 1-4** : ✅ Termines (Fondations, Homepage, Features, Migration Contentful)
- **Sprint 5** : ✅ Termine (Optimisations, Pre-Chat V2, Workflow Validation)
- **Redesign Monolithe 2026** : ✅ Fondations (Philosophie Carree, Bento, Hard Shadows)
- **Alignement Stitch** : ⏳ En cours (voir `docs/implementation.md` — 9 phases)

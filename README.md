# E2I VoIP - Site Web Moderne

Site web moderne pour E2I VoIP avec Next.js 16, Tailwind CSS, DaisyUI et shadcn/ui. Le blog public est alimenté par l’API CMS HubSpot.

## 🚀 Technologies Utilisées

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion
- **État** : Zustand (gestion d'état UI)
- **Tests** : Vitest + Testing Library
- **Blog** : HubSpot CMS API (`HUBSPOT_ACCESS_TOKEN`)
- **CRM / formulaires** : HubSpot
- **Formulaires** : Tally (devis spécialisés)
- **Automatisation** : n8n (workflows)

## 🤖 Development Guidelines for AI Assistants

> **📖 Voir le fichier [`.agents.md`](./.agents.md) pour les instructions complètes dédiées aux assistants IA**

## 🎨 Charte Graphique Officielle

> **📋 Voir le fichier [`.docs/CHARTE_GRAPHIQUE.md`](./docs/CHARTE_GRAPHIQUE.md) pour la charte graphique officielle E2I VoIP**

### Stack & Priorities

- **Framework**: NextJS 16 (App Router)
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

## Dernières Améliorations

### ✅ Phase 8 - Module Pré-Chat V2 avec Animation Intelligente (Terminée)

- **Bouton agrandi** : De 56px à 80px pour meilleure visibilité
- **Texte attractif** : "Une question ?" avec animation de rebond au-dessus du bouton
- **Animation par cycles** :
  - Vibration pendant 3 secondes
  - Pause de 2 secondes
  - Répétition pendant 20 secondes maximum (~4 cycles)
  - Arrêt définitif après clic ou annulation du formulaire
- **Validation de formulaire** : React Hook Form + Zod pour validation robuste
- **Intégration HubSpot** : Création automatique de contacts et conversations
- **Tests complets** : 12 tests Playwright (6 flow + 5 animation + 1 debug)
- **Performance attendue** : +200-300% de clics, 4 opportunités d'engagement

### ✅ Workflow de Validation Obligatoire (Terminé)

- **Validation automatique** : Tests + Lint + Type-check + Security audit + Build
- **Script dédié** : `validate.sh` avec affichage coloré et rapport détaillé
- **Hook pre-deploy** : Exécution automatique avant push Git
- **Commande unique** : `npm run validate` pour valider tous les critères
- **Documentation** : `docs/WORKFLOW_VALIDATION.md` avec checklist complète

### ✅ Phase 7 - Résolution Problèmes Techniques & Optimisations (Terminée)

- **ChunkLoadError résolu** : Simplification configuration webpack Next.js
- **Page assistance refonte** : Chat Tawk.to intégré, suppression composants défaillants
- **Configuration NextJS optimisée** : Headers sécurité, compression, redirections
- **Corrections TypeScript** : Tests et build sans erreurs
- **Nettoyage codebase** : Suppression composants obsolètes et pages debug
- **FAQ fonctionnel** : Remplacement accordéon défaillant par composant stable

### ✅ Phase 6 - Amélioration UX Header (Terminée)

- **Problème résolu** : Délai trop court des sous-menus empêchant la navigation
- **Solution** : Délai intelligent de 300ms avec zone de sécurité et gestion d'état avancée
- **Tests** : 18 tests header UX créés et validés
- **Menu "Qui sommes-nous"** : Suppression des liens "Notre Histoire" et "Notre équipe" du menu de navigation
- **Page "Qui sommes-nous"** : Section équipe conservée et testée (4 tests spécifiques)

## Tests

Le projet utilise **Vitest**, **React Testing Library** et **Playwright** pour les tests.

### Tests Unitaires et d'Intégration (Vitest)

- **Total des tests** : 158 tests qui passent ✅
- **Tests header UX** : 18 tests (délai, intégration, hydratation)
- **Tests page "Qui sommes-nous"** : 4 tests spécifiques
- **Tests d'hydratation** : Vérification de la cohérence client/serveur
- **Tests de composants** : Validation des fonctionnalités et de l'accessibilité

### Tests E2E (Playwright)

- **Module pré-chat** : 12 tests
  - 6 tests de flow complet (ouverture, validation, soumission, erreurs)
  - 5 tests d'animation par cycles (timing, arrêt, cycles)
  - 1 test de diagnostic
- **Couverture** : Parcours utilisateur complet avec validation HubSpot

## 📋 Prérequis

- Node.js 22.12.0 (LTS)
- npm ou yarn
- Compte HubSpot
- Compte Tally
- Instance n8n

## 🛠️ Installation

1. **Cloner le repository**

```bash
git clone https://github.com/alban/e2ivoip-front.git
cd e2ivoip-front
```

2. **Installer toutes les dépendances**

```bash
npm run install:all
```

3. **Configurer les variables d'environnement**

```bash
cp env.example .env.local
# Éditer .env.local avec vos clés API
```

4. **Vérifier la configuration**

```bash
node scripts/check-setup.js
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

**Statut des tests** : ✅ 158 tests Vitest + 12 tests Playwright

- **Header UX** : 18 tests (délai, intégration, hydratation)
- **Composants** : 140 tests (fonctionnalités, responsive, accessibilité)
- **Module pré-chat** : 12 tests E2E (flow, animation, diagnostic)

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
│   ├── hubspot-blog.ts    # API CMS HubSpot (articles blog)
│   └── blog-source.ts     # Façade blog public → HubSpot
├── scripts/               # Scripts d’archives blog (extraction legacy)
│   ├── extract-blog-content.js
│   └── package.json
├── tests/                 # Tests unitaires et d'intégration
├── public/                # Assets statiques
└── docs/                  # PRD, Roadmap, Implémentation
```

## 🔧 Configuration

### Variables d'Environnement

Copiez `env.example` vers `.env.local` et configurez :

```env
# Blog HubSpot (obligatoire) — Private App, scopes cms.blog.read + cms.blog_posts.read
HUBSPOT_ACCESS_TOKEN=your_hubspot_private_app_token

# OAuth admin HubSpot (optionnel — /admin/hubspot uniquement)
# HUBSPOT_CLIENT_ID=...
# HUBSPOT_CLIENT_SECRET=...
# HUBSPOT_REDIRECT_URI=http://localhost:3000/api/hubspot/callback

# Tally Configuration
TALLY_API_KEY=your_tally_api_key

# Tawk.to Configuration
NEXT_PUBLIC_TAWK_TO_ID=688d3cc109ef001928d4773f
NEXT_PUBLIC_TAWK_TO_WIDGET_ID=1j1jrald3
```

## 🧪 Tests

Le projet utilise Vitest pour les tests unitaires :

```bash
# Exécuter tous les tests
npm test

# Tests en mode watch
npm test -- --watch

# Tests avec couverture
npm run test:coverage
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

- **Sprint 1** : ✅ Terminé (Fondations)
- **Sprint 2** : ✅ Terminé (Homepage modernisée)
- **Sprint 3** : ✅ Terminé (Fonctionnalités avancées + Blog + Pages légales)
- **Sprint 4** : ✅ **Terminé** (Blog HubSpot CMS + UI/UX)
- **Sprint 5** : ⏳ Planifié (Optimisations et finalisation)

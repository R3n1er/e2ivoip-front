# E2I VoIP - Site Web Moderne

Site web moderne pour E2I VoIP avec Next.js 15, Tailwind CSS, DaisyUI et shadcn/ui, avec migration du blog vers Contentful.

## 🚀 Technologies Utilisées

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion
- **Tests** : Vitest + Testing Library
- **CMS** : Contentful (blog) + HubSpot (CRM + Analytics)
- **Formulaires** : Tally (devis spécialisés)
- **Automatisation** : n8n (workflows)

## 🤖 Development Guidelines for AI Assistants

### Stack & Priorities

- **Framework**: NextJS 15 (App Router)
- **CSS**: DaisyUI (priority) → Tailwind → shadcn/ui
- Animations CSS avec Framer Motion
- **Icons**: Lineicons (priority) → React Icons
- **Deployment**: Vercel
- **Testing**: TDD with Jest + Playwright

### Code Generation Rules

- Always use DaisyUI components first
- Search Lineicons before React Icons
- Use Framer Motion for Animation
- Write tests before implementation (TDD)
- Document in /docs automatically
- Deploy via Vercel integration

## Dernières Améliorations

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

Le projet utilise **Vitest** et **React Testing Library** pour les tests unitaires et d'intégration.

- **Total des tests** : 158 tests qui passent ✅
- **Tests header UX** : 18 tests (délai, intégration, hydratation)
- **Tests page "Qui sommes-nous"** : 4 tests spécifiques
- **Tests d'hydratation** : Vérification de la cohérence client/serveur
- **Tests de composants** : Validation des fonctionnalités et de l'accessibilité

## 📋 Prérequis

- Node.js 18+
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
# Tests unitaires
npm test

# Tests avec interface
npm run test:ui

# Tests de couverture
npm run test:coverage
```

**Statut des tests** : ✅ 148 tests passants

- **Header UX** : 18 tests (délai, intégration, hydratation)
- **Composants** : 130 tests (fonctionnalités, responsive, accessibilité)

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
- **Sprint 4** : 🔄 **EN COURS** (Migration Contentful + UI/UX)
- **Sprint 5** : ⏳ Planifié (Optimisations et finalisation)

**Progression globale** : 92% (Strapi retiré, transition Contentful en cours)

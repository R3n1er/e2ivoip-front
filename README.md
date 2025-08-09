# E2I VoIP - Site Web Moderne

Site web moderne pour E2I VoIP avec Next.js 15, Tailwind CSS, DaisyUI et shadcn/ui, avec migration du blog vers Strapi CMS.

## 🚀 Technologies Utilisées

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion
- **Tests** : Vitest + Testing Library
- **CMS** : Strapi (blog) + HubSpot (CRM + Analytics)
- **Formulaires** : Tally (devis spécialisés)
- **Automatisation** : n8n (workflows)

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

### Développement simultané (Frontend + Backend)

```bash
npm run dev
```

- Frontend : [http://localhost:3000](http://localhost:3000)
- Backend Strapi : [http://localhost:1337](http://localhost:1337)
- Admin Strapi : [http://localhost:1337/admin](http://localhost:1337/admin)

### Développement séparé

```bash
# Frontend seulement
npm run dev:frontend

# Backend Strapi seulement
npm run dev:backend
```

### Tests

```bash
# Tests unitaires
npm test

# Tests avec interface
npm run test:ui

# Tests de couverture
npm run test:coverage
```

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
│   └── strapi-blog.ts    # Nouveau service Strapi
├── backend/               # Strapi CMS
│   ├── src/
│   ├── config/
│   └── package.json
├── scripts/               # Scripts de migration
│   ├── extract-blog-content.js
│   ├── import-to-strapi.js
│   ├── test-extraction.js
│   └── package.json
├── tests/                 # Tests unitaires et d'intégration
├── public/                # Assets statiques
└── documentations/        # PRD, Roadmap, Implémentation
```

## 🔧 Configuration

### Variables d'Environnement

Copiez `env.example` vers `.env.local` et configurez :

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token_here

# Database Configuration (pour Strapi)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# JWT Configuration (pour Strapi)
JWT_SECRET=your_jwt_secret_here
ADMIN_JWT_SECRET=your_admin_jwt_secret_here
API_TOKEN_SALT=your_api_token_salt_here
APP_KEYS=your_app_keys_here

# HubSpot Configuration
HUBSPOT_API_KEY=your_hubspot_api_key
HUBSPOT_PORTAL_ID=26878201
HUBSPOT_CLIENT_ID=your_hubspot_client_id
HUBSPOT_CLIENT_SECRET=your_hubspot_client_secret
HUBSPOT_REDIRECT_URI=http://localhost:3000/api/hubspot/callback
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token

<!-- Algolia retiré: plus nécessaire -->

# Tally Configuration
TALLY_API_KEY=your_tally_api_key

# Tawk.to Configuration
NEXT_PUBLIC_TAWK_TO_ID=688d3cc109ef001928d4773f
NEXT_PUBLIC_TAWK_TO_WIDGET_ID=1j1jrald3
```

## 🖼️ Icônes & Favicon

- Fichiers:
  - `app/favicon.ico` (pris en charge automatiquement par Next.js App Router)
  - `public/favicon.svg`
- Déclaration dans `app/layout.tsx`:
  - `metadata.icons.icon`: ico + svg
  - `metadata.icons.shortcut`: ico
  - Extrait:

```ts
export const metadata: Metadata = {
  // ...
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
}
```

## 🚀 Migration Strapi

### Scripts de Migration

```bash
# Test d'extraction d'un article
cd scripts && npm run test

# Extraction complète des articles
npm run extract:blog

# Import dans Strapi (après configuration du token)
cd scripts && npm run import

# Migration complète (extraction + import)
cd scripts && npm run full-migration
```

### Service Strapi

Le service `lib/strapi-blog.ts` fournit toutes les fonctions nécessaires :

```typescript
// Récupérer tous les articles
const posts = await getStrapiBlogPosts(page, pageSize);

// Récupérer un article par slug
const post = await getStrapiBlogPost(slug);

// Rechercher des articles
const results = await searchStrapiBlogPosts(query, filters);

// Articles par catégorie
const categoryPosts = await getStrapiBlogPostsByCategory(category);
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

- [PRD](./documentations/PRD.md) - Product Requirements Document
- [Roadmap](./documentations/roadmap.md) - Plan de développement
- [Implémentation](./documentations/implementation.md) - Plan d'implémentation technique
- [Prochaines étapes](./documentations/NEXT_STEPS.md) - Statut actuel et prochaines actions
- [Migration Strapi](./README-STRAPI-MIGRATION.md) - Guide complet de migration

## 🚀 Déploiement

### Vercel (Frontend) + Railway/Render (Strapi)

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
- **Sprint 4** : 🔄 **EN COURS** (Migration Strapi + Architecture monorepo)
- **Sprint 5** : ⏳ Planifié (Optimisations et finalisation)

**Progression globale** : 95% (Architecture Strapi mise en place, scripts de migration prêts)

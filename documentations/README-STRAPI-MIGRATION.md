# Migration Blog E2I VoIP vers Strapi

## 🎯 Vue d'ensemble

Ce guide explique la migration de votre blog HubSpot/Algolia vers Strapi, une solution CMS headless moderne qui vous permettra de gérer vos articles de blog de manière indépendante.

## 📋 Architecture Monorepo

```
e2ivoip-front/
├── app/                    # Frontend Next.js (existant)
├── components/             # Composants React (existant)
├── lib/                    # Services et utilitaires
│   ├── hubspot-blog.ts    # Ancien service HubSpot (déprécié)
│   └── strapi-blog.ts     # Nouveau service Strapi
├── backend/                # Strapi CMS
│   ├── src/
│   ├── config/
│   └── package.json
├── scripts/                # Scripts de migration
│   ├── extract-blog-content.js
│   ├── import-to-strapi.js
│   └── package.json
└── package.json           # Configuration monorepo
```

## 🚀 Installation et Configuration

### 1. Installation des dépendances

```bash
# Installer toutes les dépendances
npm run install:all

# Ou manuellement
npm install
cd backend && npm install
cd ../scripts && npm install
```

### 2. Configuration des variables d'environnement

Copiez le fichier `env.example` vers `.env.local` et configurez :

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token_here

# Database Configuration
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
ADMIN_JWT_SECRET=your_admin_jwt_secret_here
API_TOKEN_SALT=your_api_token_salt_here
APP_KEYS=your_app_keys_here
```

### 3. Démarrage de Strapi

```bash
# Démarrer Strapi en mode développement
cd backend
npm run develop
```

Accédez à l'interface d'administration : http://localhost:1337/admin

## 📊 Migration des Articles Existants

### 1. Extraction des articles depuis votre site actuel

```bash
# Extraire tous les articles de https://www.e2i-voip.com/blog
npm run extract:blog
```

Ce script va :

- Récupérer tous les articles de votre site existant
- Télécharger les images de couverture
- Sauvegarder les données dans `extracted-blog-content.json`

### 2. Import dans Strapi

```bash
# Importer les articles extraits dans Strapi
cd scripts
npm run import
```

Ou en une seule commande :

```bash
# Migration complète
cd scripts
npm run full-migration
```

## 🔧 Configuration Strapi

### Content-Type Blog Post

Le schéma est déjà configuré avec les champs suivants :

- **title** : Titre de l'article (requis)
- **slug** : URL unique (généré automatiquement)
- **content** : Contenu riche (requis)
- **excerpt** : Extrait de l'article
- **publishDate** : Date de publication
- **author** : Auteur (défaut: "E2I VoIP")
- **tags** : Tags de l'article (JSON)
- **categories** : Catégories (JSON)
- **featuredImage** : Image de couverture
- **metaDescription** : Description SEO
- **seoTitle** : Titre SEO
- **status** : Statut (draft/published)
- **readingTime** : Temps de lecture estimé
- **originalUrl** : URL originale sur l'ancien site

### Permissions API

Dans l'interface Strapi Admin :

1. Allez dans **Settings > Users & Permissions Plugin > Roles**
2. Sélectionnez **Public**
3. Activez les permissions pour **Blog Post** :
   - `find` ✅
   - `findOne` ✅
4. Sauvegardez

## 🔄 Intégration avec Next.js

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

### Adaptation des composants

Les composants existants peuvent être adaptés pour utiliser Strapi :

```typescript
// Ancien (HubSpot)
import { getHubSpotBlogPosts } from "@/lib/hubspot-blog";

// Nouveau (Strapi)
import { getStrapiBlogPosts, transformStrapiPost } from "@/lib/strapi-blog";

// Utilisation
const strapiResponse = await getStrapiBlogPosts();
const posts = strapiResponse.data.map(transformStrapiPost);
```

## 🎨 Interface d'Administration Strapi

### Accès à l'admin

1. Démarrez Strapi : `cd backend && npm run develop`
2. Accédez à : http://localhost:1337/admin
3. Créez votre compte administrateur

### Gestion des articles

- **Créer un article** : Content Manager > Blog Post > Create new entry
- **Modifier un article** : Sélectionnez l'article dans la liste
- **Publier/Dépublier** : Utilisez le bouton "Publish" ou "Unpublish"
- **Gérer les médias** : Media Library pour les images

### Fonctionnalités avancées

- **Éditeur riche** : Interface WYSIWYG pour le contenu
- **Gestion des médias** : Upload et optimisation d'images
- **Workflow de publication** : Draft/Publish
- **SEO intégré** : Métadonnées automatiques
- **API REST/GraphQL** : Accès programmatique

## 🚀 Déploiement

### Option 1 : Déploiement hybride (Recommandé)

```bash
# Frontend sur Vercel
vercel --prod

# Backend Strapi sur Railway/Render
# 1. Connectez votre repo GitHub
# 2. Configurez les variables d'environnement
# 3. Déployez automatiquement
```

### Option 2 : Tout sur Vercel

```bash
# Configuration vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    },
    {
      "src": "backend/package.json",
      "use": "@vercel/node"
    }
  ]
}
```

## 🔍 Tests et Validation

### Tests des scripts de migration

```bash
# Test d'extraction
cd scripts
npm run extract

# Test d'import
npm run import

# Test complet
npm run full-migration
```

### Tests de l'intégration

```bash
# Tests unitaires
npm test

# Tests d'intégration
npm run test:integration
```

## 📈 Avantages de Strapi

### ✅ Avantages

1. **Contrôle total** : CMS indépendant de l'hébergement
2. **Interface intuitive** : Administration facile pour vos équipes
3. **API flexible** : REST et GraphQL disponibles
4. **Gestion des médias** : Upload et optimisation intégrée
5. **SEO optimisé** : Métadonnées complètes
6. **Performance** : Headless = meilleures performances
7. **Extensibilité** : Plugins et personnalisations

### 🔄 Migration progressive

1. **Phase 1** : Extraction des articles existants
2. **Phase 2** : Import dans Strapi
3. **Phase 3** : Adaptation des composants Next.js
4. **Phase 4** : Tests et validation
5. **Phase 5** : Déploiement en production

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev                    # Frontend + Backend
npm run dev:frontend          # Frontend seulement
npm run dev:backend           # Backend seulement

# Build
npm run build                 # Build complet
npm run build:frontend       # Build frontend
npm run build:backend        # Build backend

# Migration
npm run extract:blog         # Extraire les articles
cd scripts && npm run import # Importer dans Strapi

# Tests
npm test                     # Tests unitaires
npm run test:integration     # Tests d'intégration
```

## 📞 Support

Pour toute question ou problème :

1. Vérifiez les logs Strapi : `cd backend && npm run develop`
2. Consultez la documentation Strapi : https://docs.strapi.io/
3. Vérifiez les variables d'environnement
4. Testez les scripts de migration étape par étape

---

**Date de création** : Décembre 2024  
**Version** : 1.0.0  
**Statut** : ✅ **PRÊT POUR LA MIGRATION**

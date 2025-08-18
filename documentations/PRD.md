# PRD - E2I VoIP Website

## Vue d'ensemble

Le site web E2I VoIP est une plateforme moderne et professionnelle présentant les solutions de téléphonie IP et de communications d'entreprise. Le site est construit avec Next.js 15, utilise Tailwind CSS avec DaisyUI, et intègre Contentful comme CMS principal.

## Architecture Technique

### Frontend

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI
- **Animations** : Framer Motion
- **Tests** : Vitest + Testing Library
- **État** : React Hooks (useState, useEffect)

### Backend & CMS

- **CMS Principal** : Contentful
  - Content Delivery API pour la lecture
  - Content Management API pour l'import
  - Rich Text pour le contenu des articles
- **API Routes** : Next.js API routes (/api/blog/\*)
- **Base de données** : Aucune (Contentful gère tout)

### Intégrations

- **HubSpot** : Formulaires de contact et tracking
- **Tally** : Formulaires spécialisés avec automatismes N8N
- **Tawk.to** : Chat en direct
- **OpenAI** : Génération d'images de couverture via DALL-E

## Structure du Contenu

### Articles de Blog

- **Modèle Contentful** : `blogPost`
- **Champs** : titre, slug, extrait, contenu (Rich Text), image de couverture, auteur, date de publication, meta description, SEO title, tags
- **Images** : Génération automatique SVG + PNG via AI
- **Import** : Scripts automatisés depuis l'ancien site

### Navigation

- **Header** : Menu principal avec sous-menus au survol
- **Sous-menus** : Apparition fluide au survol avec animations Framer Motion
- **Responsive** : Menu mobile avec Sheet component

## Fonctionnalités Principales

### Blog

- **Liste des articles** : Grille responsive avec pagination
- **Recherche** : Par titre, auteur, tags
- **Filtres** : Par catégorie, année, auteur
- **Articles individuels** : Rendu Rich Text avec métadonnées SEO

### Formulaires

- **Contact général** : HubSpot (intégration complète)
- **Formulaires spécialisés** : Tally (automatismes N8N)
- **Validation** : Côté client et serveur

### Performance

- **SSR/SSG** : Next.js 15 avec génération statique
- **Images** : Optimisation automatique Next.js
- **Lazy Loading** : Composants et images

## Charte Graphique

### Couleurs

- **Rouge primaire** : #DC2626 (red-600)
- **Bleu marine** : #1E40AF (blue-700)
- **Gris secondaire** : #6B7280 (gray-500)
- **Vert** : #16A34A (green-600)

### Typographie

- **Titres** : Font-bold, tailles responsives
- **Corps** : Font-medium, lisibilité optimisée
- **Navigation** : Font-medium, transitions fluides

### Composants UI

- **Boutons** : Composants shadcn/ui personnalisés
- **Cartes** : Ombres, bordures, hover effects
- **Animations** : Transitions CSS + Framer Motion

## Tests et Qualité

### Tests Automatisés

- **Unitaires** : Vitest + Testing Library
- **Composants** : Rendu, interactions, états
- **Pages** : Hydratation, métadonnées, navigation
- **API** : Endpoints, gestion d'erreurs

### Qualité du Code

- **ESLint** : Règles strictes activées
- **TypeScript** : Typage strict
- **Prettier** : Formatage automatique
- **Git Hooks** : Vérifications pré-commit

## Déploiement

### Environnements

- **Développement** : Port 3000 local
- **Staging** : Vercel Preview
- **Production** : Vercel Production

### Variables d'Environnement

```env
# Contentful
CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
CONTENTFUL_MANAGEMENT_TOKEN=
CONTENTFUL_CONTENT_TYPE_ID=blogPost
CONTENTFUL_LOCALE=en-US

# OpenAI (Images de couverture)
OPENAI_API_KEY=

# HubSpot
HUBSPOT_CLIENT_ID=
HUBSPOT_CLIENT_SECRET=
HUBSPOT_REFRESH_TOKEN=

# Tawk.to
TAWK_TO_ID=
```

## Maintenance et Évolutions

### Scripts de Maintenance

- **Import Contentful** : Migration des articles
- **Génération d'images** : SVG + PNG AI
- **Sauvegarde** : Export des données

### Monitoring

- **Performance** : Core Web Vitals
- **Erreurs** : Logs Next.js + Sentry
- **Analytics** : HubSpot + Google Analytics

## Roadmap

### Phase 1 - Complétée ✅

- [x] Migration Strapi → Contentful
- [x] Intégration API Contentful
- [x] Refactorisation header
- [x] Génération d'images de couverture
- [x] Tests automatisés

### Phase 2 - En cours

- [ ] Optimisation SEO avancée
- [ ] Cache Contentful
- [ ] Analytics avancés
- [ ] A/B Testing

### Phase 3 - Planifiée

- [ ] Multilangue (FR/EN)
- [ ] PWA
- [ ] API publique
- [ ] Intégrations tierces avancées

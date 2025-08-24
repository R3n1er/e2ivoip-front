# PRD - E2I VoIP Website

## Vue d'ensemble

Le site web E2I VoIP est une plateforme moderne et professionnelle présentant les solutions de téléphonie IP et de communications d'entreprise. Le site est construit avec Next.js 15, utilise Tailwind CSS avec DaisyUI, et intègre Contentful comme CMS principal.

## Architecture Technique

### Frontend

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI
- **Icônes** : Lineicons (CDN 4.0)
- **Animations** : Framer Motion
- **Tests** : Jest + Testing Library + Playwright
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

## Charte Graphique Officielle

### Couleurs Principales

- **Rouge principal** : #E53E3E (229, 62, 62)

  - Utilisation : Chiffre "2", lettres "IP" dans VOIP, hover E/I
  - Code Tailwind : `text-red-600` ou `bg-red-600`

- **Bleu marine** : #2D3848 (45, 56, 72)

  - Utilisation : Lettres E et I dans E2I
  - Code Tailwind : `text-gray-800` ou `bg-gray-800`

- **Gris secondaire** : #818096 (129, 128, 150)

  - Utilisation : Lettres "VO" dans VOIP, baseline
  - Code Tailwind : `text-gray-500` ou `bg-gray-500`

- **Gris foncé** : #1F2937 (31, 41, 55)

  - Utilisation : Texte, version non scrolled du header
  - Code Tailwind : `text-gray-800` ou `bg-gray-800`

- **Blanc** : #FFFFFF (255, 255, 255)

  - Utilisation : Fond clair, inversions
  - Code Tailwind : `text-white` ou `bg-white`

- **Orange** : Pour les dégradé de bleu vers l'orange des sections héro et de certains composants card.

### Application dans l'Identité Visuelle

#### Logo E2I VoIP

- **E2I** :
  - E et I : Bleu marine (#2D3848)
  - 2 : Rouge principal (#E53E3E)
- **VOIP** :
  - VO : Gris secondaire (#818096)
  - IP : Rouge principal (#E53E3E)

#### Éléments d'Interface

- **Header** :
  - Version normale : Gris foncé (#1F2937)
  - Version scrolled : Blanc (#FFFFFF)
- **Boutons CTA** : Rouge principal (#E53E3E)
- **Liens hover** : Rouge principal (#E53E3E)
- **Texte principal** : Gris foncé (#1F2937)
- **Texte secondaire** : Gris secondaire (#818096)

### Variables CSS Personnalisées

```css
:root {
  /* Couleurs officielles E2I VoIP */
  --red-primary: #e53e3e; /* Rouge principal */
  --blue-marine: #2d3848; /* Bleu marine */
  --gray-secondary: #818096; /* Gris secondaire */
  --gray-dark: #1f2937; /* Gris foncé */
  --white: #ffffff; /* Blanc */
}

/* Classes utilitaires */
.text-red-primary {
  color: var(--red-primary);
}
.bg-red-primary {
  background-color: var(--red-primary);
}
.text-blue-marine {
  color: var(--blue-marine);
}
.bg-blue-marine {
  background-color: var(--blue-marine);
}
.text-gray-secondary {
  color: var(--gray-secondary);
}
.bg-gray-secondary {
  background-color: var(--gray-secondary);
}
.text-gray-dark {
  color: var(--gray-dark);
}
.bg-gray-dark {
  background-color: var(--gray-dark);
}
```

### Dégradés

#### Dégradés Principaux

- **Dégradé Rouge-Bleu** : `bg-gradient-to-r from-red-600 to-blue-700`

  - Utilisation : Boutons CTA, sections héro, éléments d'accent
  - Direction : De gauche à droite
  - Couleurs : Rouge primaire vers bleu marine

- **Dégradé Rouge-Vert** : `bg-gradient-to-br from-red-600 to-green-600`

  - Utilisation : Cartes de services, badges, indicateurs de statut
  - Direction : Diagonal (bas-droite)
  - Couleurs : Rouge primaire vers vert

- **Dégradé Bleu-Gris** : `bg-gradient-to-b from-blue-700 to-gray-500`
  - Utilisation : Arrière-plans de sections, cartes d'information
  - Direction : Du haut vers le bas
  - Couleurs : Bleu marine vers gris secondaire

#### Dégradés Secondaires

- **Dégradé Rouge-Orange** : `bg-gradient-to-r from-red-600 to-orange-500`

  - Utilisation : Éléments d'alerte, notifications importantes
  - Direction : De gauche à droite
  - Couleurs : Rouge primaire vers orange

- **Dégradé Bleu-Vert** : `bg-gradient-to-br from-blue-700 to-green-600`

  - Utilisation : Sections de succès, indicateurs positifs
  - Direction : Diagonal (bas-droite)
  - Couleurs : Bleu marine vers vert

- **Dégradé Gris-Blanc** : `bg-gradient-to-b from-gray-100 to-white`
  - Utilisation : Arrière-plans de cartes, sections de contenu
  - Direction : Du haut vers le bas
  - Couleurs : Gris clair vers blanc

#### Dégradés Spéciaux

- **Dégradé Transparent-Rouge** : `bg-gradient-to-t from-red-600/80 to-transparent`

  - Utilisation : Overlays d'images, effets de superposition
  - Direction : Du bas vers le haut
  - Couleurs : Rouge semi-transparent vers transparent

- **Dégradé Radial Rouge** : `bg-gradient-radial from-red-600 to-transparent`
  - Utilisation : Effets de focus, points d'accent
  - Type : Radial (du centre vers l'extérieur)
  - Couleurs : Rouge vers transparent

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

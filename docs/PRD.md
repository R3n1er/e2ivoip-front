# PRD - E2I VoIP Website

## Vue d'ensemble

Le site web E2I VoIP est une plateforme moderne et professionnelle présentant les solutions de téléphonie IP et de communications d'entreprise. Le site est construit avec Next.js 15, utilise Tailwind CSS avec DaisyUI, et intègre Contentful comme CMS principal.

### Statut d'avancement

- Sprints 1 → 4 : ✅ Terminés (UI/UX + Contact + Blog + HubSpot)
- Sprint 5 : 📅 Planifié (post‑lancement: monitoring, optimisations continues)

## Architecture Technique

### Frontend

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI
- **Icônes** : Lineicons (CDN 4.0)
- **Animations** : Framer Motion
- **Tests** : Jest + Testing Library + Playwright
- **État** : Zustand (state client) + React Hooks (useState, useEffect)

### Backend & CMS

- **CMS Principal** : Contentful
  - Content Delivery API pour la lecture
  - Content Management API pour l'import
  - Rich Text pour le contenu des articles
- **API Routes** : Next.js API routes (/api/blog/\*)
- **Base de données** : Aucune (Contentful gère tout)

### Intégrations

- **HubSpot** : Formulaires de contact et tracking
  - Centralisation de l'API `window.hbspt` (typage unique) dans `types/hubspot.d.ts`
  - Embed fiable via composant `HubSpotFormSimpleEmbed` :
    - Chargement du script avec URL à protocole relatif `//js-<region>.hsforms.net/forms/embed/v2.js`
    - `target` accepté en `HTMLElement` pour injection directe
    - Loader léger uniquement avant disponibilité du script
  - Couverture tests: Jest + Playwright validés
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

### Module Pré-Chat Interactif (V2)

**Objectif** : Maximiser l'engagement des visiteurs en proposant un point de contact visible et attractif sans être intrusif.

**Design** :
- **Bouton agrandi** : 80px × 80px (vs 56px avant) - Visibilité +43%
- **Texte accrocheur** : "Une question ?" au-dessus du bouton
- **Icône** : SVG message 36px × 36px en dégradé rose/violet/indigo
- **Position** : Fixe en bas à droite (`z-index: 9999`)

**Animation Intelligente par Cycles** :
- **Cycle** : Vibration 3s → Pause 2s (répété 4 fois)
- **Durée totale** : 20 secondes d'animation
- **Animations** :
  - Bouton : `animate-shake` (vibration ±2px horizontal + ±1deg rotation)
  - Texte : `animate-bounce` (rebond vertical Tailwind)
- **Arrêt automatique** : Après 20 secondes
- **Arrêt au clic** : Définitif, même si l'utilisateur annule le formulaire
- **Timeline** :
  ```
  0s  → Vibration (3s)
  3s  → Pause (2s)
  5s  → Vibration (3s)
  8s  → Pause (2s)
  10s → Vibration (3s)
  13s → Pause (2s)
  15s → Vibration (3s)
  18s → Pause (2s)
  20s → Arrêt définitif
  ```

**Formulaire Pré-Chat** :
- **Validation** : React Hook Form + Zod schema
- **Champs obligatoires** : Prénom, Nom, Entreprise, Email
- **Champ optionnel** : Téléphone (format français)
- **Soumission** : API `/api/hubspot/ingest-conversation`
- **Intégration HubSpot** : Identification automatique du contact
- **UX** : Messages d'erreur en temps réel, bouton désactivé si invalide

**Comportement** :
1. Page chargée → Animation démarre
2. 4 cycles de vibration sur 20 secondes
3. Clic utilisateur → Formulaire s'ouvre + animation s'arrête définitivement
4. Soumission → Données envoyées à HubSpot + fermeture
5. Annulation → Fermeture sans reprise d'animation

**Avantages** :
- **+200-300% clics attendus** (vs bouton statique petit)
- **4 opportunités d'engagement** au lieu d'une seule
- **Respectueux** : Arrêt automatique, pas d'agacement
- **Mobile-friendly** : Grande taille tactile, responsive
- **Accessible** : ARIA labels, focus keyboard

**Tests E2E** :
- 6 tests flux complet (ouverture, validation, soumission)
- 5 tests animation (cycles, arrêts, responsive)
- 100% coverage du comportement utilisateur

### Chat en direct Tawk.to (Désactivé)

**Note** : Le chat Tawk.to a été désactivé au profit du module pré-chat HubSpot pour une expérience unifiée et un meilleur tracking CRM.

~~Le script de chat en direct doit etre lancé avec un délais de 10 secondes sur les pages suivantes :~~

- ~~Home~~
- ~~Trunk SIP au Compteur~~
- ~~Devis en ligne~~
- ~~Qui sommes-nous~~

### Formulaires

- **Contact général** : HubSpot (intégration complète)
- **Formulaires spécialisés** : Tally (automatismes N8N)
- **Validation** : Côté client et serveur

#### Popup Tally - Page Trunk SIP au Compteur

**Objectif** : Augmenter la conversion sur la page produit "Trunk SIP au Compteur" en capturant les prospects qualifiés avec un formulaire contextuel non-intrusif.

**Fonctionnement** :
- **Déclenchement** : Popup automatique après 3 secondes de présence sur la page (optimisé pour UX réactive)
- **Formulaire** : Tally ID `mDY1bl` (formulaire de qualification commerciale)
- **Animation** : Emoji 👋 avec animation "wave" pour attirer l'attention
- **Comportement** : 
  - Fermeture manuelle possible
  - Ne réapparaît pas après soumission (`doNotShowAfterSubmit: true`)
  - Pas de fermeture automatique (`autoClose: 0`)

**Intégration technique** :
- **Composant** : `TallyPopupClean` avec chargement asynchrone optimisé du script Tally
- **Script source** : `https://tally.so/widgets/embed.js`
- **Chargement** : Immédiat après montage du composant (sans délai artificiel)
- **Gestion d'erreurs** : Logs en cas d'échec de chargement du script

**Configuration Tally** :
```javascript
TallyConfig = {
  formId: "mDY1bl",
  popup: {
    emoji: {
      text: "👋",
      animation: "wave"
    },
    open: {
      trigger: "time", 
      ms: 3000
    },
    autoClose: 0,
    doNotShowAfterSubmit: true
  }
}
```

**Justification métier** :
- **Page stratégique** : Trunk SIP au compteur = solution phare pour PME DOM-TOM
- **Timing optimal** : 3 secondes permettent de capter l'attention sans sur-attendre
- **Qualification** : Formulaire Tally connecté aux automatismes N8N pour traitement commercial
- **UX optimisée** : Popup réactif qui respecte l'expérience utilisateur moderne

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

- **Dégradé Hero Uniforme** : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`

  - Utilisation : **STANDARD pour toutes les hero sections du site**
  - Direction : De gauche à droite (bleu vers rouge)
  - Couleurs : Bleu foncé semi-transparent vers bleu marine vers rouge
  - Structure : Image de fond + overlay avec ce dégradé + contenu
  - Opacité : Transparences pour permettre la visibilité de l'image de fond

- **Dégradé Rouge-Bleu** : `bg-gradient-to-r from-red-600 to-blue-700`

  - Utilisation : Boutons CTA, sections héro alternatives, éléments d'accent
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

#### Boutons Standard E2I VoIP

**Style officiel** : Tous les boutons du site doivent suivre cette structure standardisée.

##### Bouton Principal (Primary)

```tsx
<button className="btn btn-lg bg-red-primary text-white border-0 shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold min-w-[240px] relative overflow-hidden group">
  <span className="flex items-center justify-center">
    <i className="lni lni-icon mr-2 text-lg"></i>
    Texte du bouton
    <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
  </span>
  <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
</button>
```

##### Bouton Secondaire (Secondary)

```tsx
<button className="btn btn-lg bg-white/10 text-white border-2 border-white/60 backdrop-blur-sm shadow-xl hover:bg-white hover:text-red-primary hover:border-white hover:scale-105 transition-all duration-300 font-semibold min-w-[200px] relative overflow-hidden group">
  <span className="flex items-center justify-center">
    <i className="lni lni-icon mr-2 text-lg"></i>
    Texte du bouton
    <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
  </span>
  <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
</button>
```

##### Caractéristiques Obligatoires

1. **Structure à deux niveaux** :
   - `<button>` avec classes de base et group
   - `<span>` pour le contenu avec flexbox
   - `<div>` pour l'effet de clic

2. **Effet de clic** (OBLIGATOIRE) :
   ```html
   <div class="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
   ```

3. **Animation flèche** :
   - Icône `lni-arrow-right` en fin de bouton
   - Animation au hover : `group-hover:translate-x-1`

4. **Classes essentielles** :
   - `relative overflow-hidden group` sur le button
   - `flex items-center justify-center` sur le span
   - `transition-transform group-hover:translate-x-1` sur la flèche

5. **Tailles minimales** :
   - Bouton principal : `min-w-[240px]`
   - Bouton secondaire : `min-w-[200px]`
   - Ajustable selon le contenu

6. **Icônes** :
   - Lineicons en priorité (`lni-*`)
   - Icône principale à gauche
   - Flèche à droite (obligatoire)

##### Composants Réutilisables

Utiliser les composants `CTAButton` et `CTAButtonSecondary` qui implémentent déjà ce style standard.

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

### HOTJAR Analytics

Mettre en place le script Hotjar

Lien vers la documentation Hotjar : https://help.hotjar.com/hc/en-us

Script Hotjar à intégrer :

<!-- Hotjar Tracking Code for https://www.e2i-voip.com -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6502550,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>

## Nouveaux Composants de Conversion - Page 3CX Cloud

### HubSpot Calendar Component

Composant React pour intégrer le calendrier de rendez-vous HubSpot avec optimisations pour la conversion :

**Localisation** : `/components/hubspot-calendar.tsx`

**Fonctionnalités** :
- Intégration du script HubSpot Meetings Embed
- Gestion du chargement asynchrone et des erreurs
- Interface personnalisable (titre, description, hauteur)
- Placeholder de chargement avec spinner
- Informations de contact alternatives pour tous les DOM-TOM
- Support des numéros de téléphone cliquables

**Script HubSpot intégré** :
```html
<!-- Start of Meetings Embed Script -->
<div class="meetings-iframe-container" data-src="https://www.e2i-voip.com/meetings/alban-renier?embed=true"></div>
<script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
<!-- End of Meetings Embed Script -->
```

**Props disponibles** :
- `meetingUrl` : URL du calendrier HubSpot
- `title` : Titre affiché au-dessus du calendrier
- `description` : Description sous le titre  
- `height` : Hauteur du calendrier en pixels
- `className` : Classes CSS personnalisées
- `showContactInfo` : Afficher les contacts alternatifs

### ProblemSolutionSection Component

Composant de conversion présentant les problèmes clients vs solutions E2I VoIP :

**Localisation** : `/components/problem-solution-section.tsx`

**Structure** :
- Section problèmes (fond rouge) avec icônes Lineicons
- Section solutions (fond vert) avec badges de mise en valeur
- Layout responsive en 2 colonnes sur desktop
- Messages d'impact et d'urgence intégrés

### PricingTiers Component

Composant de tarification par paliers d'appels simultanés :

**Localisation** : `/components/pricing-tiers.tsx`

**Fonctionnalités** :
- Grille responsive des paliers (8, 16, 24, 32, 64 appels)
- Mise en valeur du palier "Populaire" (16 appels)
- Badges personnalisables par palier
- Fonctionnalités listées avec checkmarks
- Message d'économie (40%) mis en évidence
- CTA intégré sur chaque palier

### TestimonialsSection & TestimonialCard Components

Composants pour afficher les témoignages clients :

**Localisation** : `/components/testimonial-card.tsx`

**Fonctionnalités** :
- Cartes témoignages avec logo entreprise
- Statistiques visuelles (utilisateurs, solution)
- Badge de confiance "Client satisfait"
- Section secteurs d'activité avec icônes
- Layout adaptatif pour mobile/desktop

### GeographicAdvantage Component

Composant spécifique à l'expertise DOM-TOM d'E2I VoIP :

**Localisation** : `/components/geographic-advantage.tsx`

**Fonctionnalités** :
- Mise en valeur de la présence locale dans 5 régions
- Numéros de téléphone cliquables par région
- Fonctionnalités spécifiques à chaque région
- Message de proximité et réactivité
- Design avec dégradés de la charte graphique

### CTACalendarSection Component

Section Call-to-Action principale avec intégration calendrier :

**Localisation** : `/components/cta-calendar-section.tsx`

**Fonctionnalités** :
- Titre et sous-titre personnalisables
- Liste des bénéfices de la démonstration
- Intégration du HubSpotCalendar component
- Section urgence avec 3 raisons d'agir maintenant
- Contacts alternatifs (email + devis en ligne)
- Ancre `#calendrier` pour navigation directe

### Page 3CX Cloud Optimisée

**Localisation** : `/app/3cx-cloud/page.tsx`

**Structure de conversion** :
1. **Hero Section** - Dégradé standardisé + CTA calendrier principal
2. **Problèmes vs Solutions** - Identification des pain points clients
3. **Intégrations avancées** - WhatsApp, CRM, Microsoft 365, IA
4. **Tarification transparent** - Paliers par appels simultanés
5. **Témoignages et secteurs** - Preuve sociale et crédibilité
6. **Avantage géographique** - Expertise DOM-TOM unique
7. **CTA final avec calendrier** - Conversion principale

**Optimisations SEO** :
- Titre meta optimisé : "3CX PRO Cloud - Solution Téléphonique d'Entreprise"
- Description longue avec mots-clés stratégiques
- Keywords DOM-TOM, calls simultanés, WhatsApp Business
- OpenGraph optimisé pour partage social

### Données Structurées Intégrées

**Problèmes identifiés** :
- Saturation d'appels (lignes occupées)
- Coûts téléphoniques explosifs
- Obsolescence technique (arrêt cuivre)
- Sites multiples non centralisés
- Absence d'intégrations CRM/Office 365

**Solutions proposées** :
- Serveur cloud dédié AWS EU
- Tarification transparente (40% d'économies)
- Hébergement souverain France/UE
- Expertise certifiée 3CX Silver
- Minimum 8 appels simultanés garantis

**Paliers tarifaires** :
- 8 appels : TPE Dynamiques
- 16 appels : PME Multi-sites (Populaire)
- 24 appels : Entreprises en croissance
- 32 appels : Structures importantes  
- 64 appels : Solution haute capacité

### Intégrations de Conversion

**HubSpot Calendar** :
- URL : `https://www.e2i-voip.com/meetings/alban-renier`
- Embed automatique avec paramètre `?embed=true`
- Titre : "Réservez votre démonstration gratuite"
- Description : "Échangeons 15 minutes pour comprendre vos enjeux"

**Contacts régionaux intégrés** :
- Guyane : 0594 963 500
- Guadeloupe : 0590 173 500  
- Martinique : 0596 313 500
- La Réunion : +262 263 085 500
- France : 0189 563 500

**Email commercial** : commerciaux@e2i-voip.com
**Devis en ligne** : www.e2i-voip.com/devis

## Roadmap

### Phase 1 - Complétée ✅

- [x] Migration Strapi → Contentful
- [x] Intégration API Contentful
- [x] Refactorisation header
- [x] Génération d'images de couverture
- [x] Tests automatisés
- [x] Popup Tally page Trunk SIP au compteur
- [x] Optimisation UX header (fond blanc permanent)

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

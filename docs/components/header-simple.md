# HeaderSimple Component

## Purpose

Composant de navigation principal du site E2I VoIP avec fond blanc permanent et navigation responsive. Ce composant gère la navigation desktop et mobile avec des menus déroulants CSS et une accessibilité optimisée.

## Props

Aucune prop requise - composant autonome avec navigation statique.

## Usage Examples

### Import et utilisation basique

```tsx
import { HeaderSimple } from "@/components/header-simple";

export default function Layout() {
  return (
    <div>
      <HeaderSimple />
      <main>{/* Contenu de la page */}</main>
    </div>
  );
}
```

### Intégration dans une page

```tsx
import { HeaderSimple } from "@/components/header-simple";

export default function HomePage() {
  return (
    <>
      <HeaderSimple />
      <section className="hero">{/* Section héros */}</section>
    </>
  );
}
```

## Features

### Navigation Desktop

- **Logo E2I** avec couleurs constantes (rouge et bleu)
- **Navigation principale** avec liens vers toutes les pages
- **Menus déroulants** pour "Téléphonie d'entreprise" et "Nos services"
- **Bouton Contact** avec icône téléphone

### Navigation Mobile

- **Menu hamburger** responsive avec icônes Lineicons
- **Navigation mobile** avec tous les liens principaux
- **Accessibilité** avec aria-labels dynamiques

### Design System

- **Fond blanc permanent** même lors du défilement
- **Classes Tailwind** pour la responsivité et les transitions
- **Icônes Lineicons** pour tous les éléments interactifs
- **Hover states** avec transitions CSS fluides

## Accessibility

### ARIA Labels

- `aria-label` dynamique sur le bouton mobile ("Ouvrir le menu" / "Fermer le menu")
- Rôles de navigation appropriés
- Structure sémantique avec `<header>`, `<nav>`, `<button>`

### Navigation au clavier

- Tous les liens sont accessibles au clavier
- Focus visible sur les éléments interactifs
- Ordre de tabulation logique

### Screen Readers

- Textes alternatifs appropriés
- Structure de navigation claire
- Labels descriptifs pour les actions

## CSS Classes

### Classes principales

- `bg-white/95 backdrop-blur-md shadow-lg` - Fond blanc permanent avec effet de flou
- `text-red-primary text-blue-marine` - Couleurs du logo E2I
- `text-gray-700 hover:text-red-primary` - Navigation avec états de survol
- `lg:hidden lg:flex` - Responsive design avec breakpoints

### Transitions

- `transition-colors duration-200` - Transitions fluides sur les couleurs
- `transition-transform duration-200` - Animations des icônes chevron
- `transition-all duration-200 ease-out` - Transitions des menus déroulants

### Responsive

- `hidden sm:block` - Affichage conditionnel sur mobile/desktop
- `lg:hidden` - Masquage sur grands écrans
- `max-w-7xl mx-auto` - Largeur maximale centrée

## Icon Usage

### Lineicons utilisés

- `lni-chevron-down` - Indicateurs de menus déroulants
- `lni-menu` - Bouton menu mobile (ouvert)
- `lni-close` - Bouton menu mobile (fermé)
- `lni-phone` - Icône du bouton Contact

### Classes d'icônes

- `w-3 h-3` - Taille standard pour les chevrons
- `w-5 h-5` - Taille pour les boutons mobile
- `text-gray-600` - Couleur des icônes secondaires
- `group-hover:rotate-180` - Animation des chevrons au survol

## Navigation Structure

### Liens principaux

- **Qui sommes-nous** → `/qui-sommes-nous`
- **Téléphonie d'entreprise** → Menu déroulant
- **Mobilité** → `/mobilite`
- **Nos services** → Menu déroulant
- **Blog** → `/blog`
- **Devis en ligne** → `/devis-en-ligne`
- **Contact** → `/contact`

### Sous-menus

#### Téléphonie d'entreprise

- Trunk SIP au compteur → `/telephonie-entreprise/trunk-sip-compteur`
- Trunk SIP illimité → `/telephonie-entreprise/trunk-sip-illimite`
- 3CX PRO → `/3cx-cloud`
- 3CX SMB mutualisée → `/telephonie-entreprise/3cx-smb-mutualisee`
- PBX Yeastar → `/telephonie-entreprise/pbx-yeastar`

#### Nos services

- Studio attente téléphonique → `/nos-services/studio-attente`
- Assistants vocaux IA → `/nos-services/assistants-vocaux-ia`

## State Management

### États locaux

- `isOpen` - État du menu mobile (ouvert/fermé)
- Pas d'état de scroll - fond blanc permanent

### Gestion des événements

- `onClick` sur le bouton mobile pour toggle
- Pas de gestion du scroll - simplification pour éviter les erreurs d'hydratation

## Performance

### Optimisations

- **Composant client** avec `"use client"`
- **Pas de re-renders** inutiles
- **CSS pur** pour les animations et transitions
- **Icônes inline** sans chargement externe

### Bundle size

- **Taille minimale** - pas de dépendances lourdes
- **Tree-shaking** compatible avec Next.js
- **Code splitting** automatique avec App Router

## Browser Support

### Navigateurs supportés

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### Features utilisées

- CSS Grid et Flexbox
- CSS Custom Properties
- CSS Transitions et Animations
- ES6+ JavaScript

## Testing

### Tests unitaires

- **28 tests** couvrant tous les aspects du composant
- **Tests d'accessibilité** avec Testing Library
- **Tests de responsive** sur différents breakpoints
- **Tests d'interactions** (clicks, hover states)

### Couverture de tests

- **100% de couverture** pour les nouvelles fonctionnalités
- **Tests d'intégration** avec les composants enfants
- **Tests de régression** pour éviter les régressions

## Dependencies

### Dépendances directes

- `react` - Hooks et composants React
- `next/link` - Navigation Next.js
- `@/components/ui/cta-button` - Bouton CTA personnalisé

### Dépendances indirectes

- `tailwindcss` - Classes utilitaires CSS
- `lineicons` - Icônes via CDN

## Changelog

### Version actuelle

- **Fond blanc permanent** - Plus de changement de couleur au scroll
- **Navigation simplifiée** - Suppression de la logique de scroll complexe
- **Accessibilité améliorée** - ARIA labels dynamiques
- **Tests complets** - 28 tests couvrant tous les aspects

### Versions précédentes

- Suppression de la logique de changement de couleurs au scroll
- Simplification des états pour éviter les erreurs d'hydratation
- Refactorisation pour utiliser des classes CSS statiques

## Troubleshooting

### Problèmes courants

#### Erreurs d'hydratation

- Utilisation de `suppressHydrationWarning` sur le header
- Classes CSS statiques au lieu de classes conditionnelles
- Pas de logique de scroll côté client

#### Problèmes de responsive

- Vérifier les classes `lg:hidden` et `hidden lg:flex`
- Tester sur différents breakpoints
- Utiliser les outils de développement du navigateur

#### Problèmes d'accessibilité

- Vérifier les aria-labels sur le bouton mobile
- Tester la navigation au clavier
- Valider avec des lecteurs d'écran

### Solutions recommandées

- **Toujours tester** sur mobile et desktop
- **Vérifier l'accessibilité** avec les outils de développement
- **Maintenir la cohérence** avec le design system E2I VoIP

## Future Improvements

### Fonctionnalités potentielles

- **Menu sticky** avec animation au scroll
- **Mega menu** pour les sections complexes
- **Recherche intégrée** dans le header
- **Notifications** ou badges d'alerte

### Optimisations techniques

- **Lazy loading** des sous-menus
- **Virtual scrolling** pour les menus très longs
- **Service Worker** pour le cache des icônes
- **PWA support** avec manifest approprié

---

_Composant HeaderSimple - Documentation générée automatiquement selon les standards E2I VoIP_

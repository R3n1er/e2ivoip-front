# Documentation - Page Qui sommes-nous

## Vue d'ensemble

La page "Qui sommes-nous" d'E2I VoIP présente l'entreprise, son équipe, ses valeurs, certifications et implantations géographiques. Elle suit strictement les standards du projet avec DaisyUI et Lineicons.

## Stack Technique

- **Framework** : NextJS 15 App Router
- **Styling** : DaisyUI (priorité absolue)
- **Icônes** : Lineicons React (priorité absolue)
- **Tests** : Jest + React Testing Library + Playwright
- **Accessibilité** : ARIA labels, rôles sémantiques, navigation clavier

## Structure de la Page

### Sections Principales

1. **Hero Section** - Présentation principale avec gradient
2. **Histoire d'E2I VoIP** - Présentation de l'entreprise
3. **Valeurs et Engagements** - 3 cards DaisyUI avec icônes Lineicons
4. **Solutions Phares** - Services avec détails techniques
5. **Équipe** - Membres avec photos et rôles
6. **Certifications** - Partenariats et certifications officielles
7. **Support Local** - Contacts par région DOM
8. **CTA Final** - Appels à l'action

### Composants DaisyUI Utilisés

```typescript
// Cards principales
.card              // Conteneur principal
.card-body         // Contenu de la card
.card-title        // Titre de la card
.card-actions      // Actions de la card

// Boutons
.btn               // Bouton de base
.btn-primary       // Bouton principal
.btn-outline       // Bouton avec bordure
.btn-lg            // Bouton large

// Utilitaires
.shadow-xl         // Ombres
.hover:shadow-2xl  // Ombres au hover
.transition-shadow // Transition fluide
```

## Icônes Lineicons

### Icônes Principales Utilisées

| Contexte | Nom Lineicon | Usage |
|----------|--------------|-------|
| Téléphonie | `lni-phone` | Téléphone, contact |
| Navigation | `lni-target` | Proximité, réactivité |
| Certification | `lni-award` | Certifications, partenariats |
| Équipe | `lni-user` | Membres de l'équipe |
| Utilisateurs | `lni-users` | Résultats, clients |
| Validation | `lni-checkmark-circle` | Solutions, services |
| Localisation | `lni-map-marker` | DOM |
| International | `lni-world` | France métropole |
| Email | `lni-envelope` | Contact email |
| Chat | `lni-comments` | Support |

### Accessibilité des Icônes

```typescript
// Icônes informatives (avec aria-label)
<LineIcon 
  name="lni-map-marker" 
  className="text-3xl text-white" 
  aria-label="Localisation Guyane"
  role="img"
/>

// Icônes décoratives (avec aria-hidden)
<LineIcon 
  name="lni-target" 
  className="text-3xl text-red-primary" 
  aria-hidden="true" 
/>
```

## Structure des Tests

### Tests Unitaires (Jest)

```typescript
// Fichier: tests/qui-sommes-nous-page.test.tsx
describe("Page Qui sommes-nous", () => {
  // Test du rendu DaisyUI
  test("La page se rend sans erreur avec DaisyUI", () => {
    expect(container.querySelector('.card')).toBeInTheDocument();
  });
  
  // Test des sections avec data-testid
  test("La section équipe utilise DaisyUI et Lineicons", () => {
    const teamTitle = screen.getByTestId("team-section-title");
    expect(teamTitle).toBeInTheDocument();
  });
  
  // Test d'accessibilité
  test("L'accessibilité des icônes est respectée", () => {
    const locationIcons = screen.getAllByRole("img");
    locationIcons.forEach(icon => {
      expect(icon).toHaveAttribute("aria-label");
    });
  });
});
```

### Tests E2E (Playwright)

```typescript
// Fichier: tests/playwright/qui-sommes-nous.spec.ts
test.describe('Page Qui sommes-nous E2E - DaisyUI et Lineicons', () => {
  // Test de chargement et structure
  test('La page se charge avec DaisyUI et Lineicons', async ({ page }) => {
    await expect(page.locator('.card').first()).toBeVisible();
    await expect(page.locator('[data-testid="icon-phone"]')).toBeVisible();
  });
  
  // Test responsive
  test('Design responsive DaisyUI et performance Lineicons', async ({ page }) => {
    await expect(page.locator('.card')).toHaveCount(11);
    await expect(page.locator('.btn')).toHaveCount(3);
  });
});
```

## Data-testids pour les Tests

### Sections Principales

| Élément | Data-testid |
|---------|-------------|
| Titre équipe | `team-section-title` |
| Card proximité | `proximity-card` |
| Card excellence | `excellence-card` |
| Card résultats | `results-card` |

### Équipe

| Membre | Data-testid |
|---------|-------------|
| Alban | `team-member-alban` |
| Valerie | `team-member-valerie` |
| Fabien | `team-member-fabien` |

### Certifications

| Certification | Data-testid |
|---------------|-------------|
| 3CX Silver | `3cx-certification` |
| Yeastar | `yeastar-certification` |
| Fanvil & Yealink | `fanvil-yealink-partnership` |

### Localisations

| Région | Data-testid |
|--------|-------------|
| Guyane | `location-guyane` |
| Guadeloupe | `location-guadeloupe` |
| Martinique | `location-martinique` |
| La Réunion | `location-la-réunion` |
| France Métropole | `location-france-métropole` |

### Boutons et Liens

| Action | Data-testid |
|--------|-------------|
| Support | `support-button` |
| Devis | `quote-cta` |
| Contact | `contact-cta` |
| Email | `email-link` |

## Métadonnées SEO

### Titre

```typescript
title: "Qui sommes-nous - E2I VoIP | Opérateur télécom DOM depuis 15 ans"
```

### Description

```typescript
description: "E2I VoIP : Opérateur de servicestélécom DOM, 15 ans d'expertise, 100+ clients. Trunk SIP, 3CX, support local Martinique, Guadeloupe, Guyane. -30% sur vos coûts télécoms."
```

### Mots-clés

```typescript
keywords: "E2I VoIP, opérateur télécom DOM, téléphonie IP Antilles, 3CX Martinique, Trunk SIP Guadeloupe, VoIP Guyane, téléphonie Réunion, support local DOM"
```

### Open Graph

```typescript
openGraph: {
  title: "Qui sommes-nous - E2I VoIP | Opérateur télécom DOM",
  description: "Opérateur de services télécom DOM depuis 15 ans. Support local, 100+ clients satisfaits. Économisez 30% sur vos coûts télécoms.",
  type: "website",
}
```

## Performance et Optimisation

### Chargement des Icônes

- **Lineicons React** : Import dynamique optimisé
- **Lazy Loading** : Icônes chargées à la demande
- **Tree Shaking** : Seulement les icônes utilisées
- **CDN Fallback** : Disponible si nécessaire

### Optimisations DaisyUI

- **Classes Utilitaires** : Maximum d'utilisation des classes DaisyUI natives
- **Purge CSS** : Classes inutilisées supprimées automatiquement
- **Responsive Design** : Grid system DaisyUI natif
- **Thèmes** : Support des thèmes DaisyUI

## Accessibilité

### Standards Respectés

- **WCAG 2.1 AA** : Contraste, navigation clavier
- **Aria Labels** : Icônes informatives
- **Aria Hidden** : Icônes décoratives
- **Structure Sémantique** : H1 unique, hiérarchie des headings
- **Navigation Clavier** : Tous les éléments interactifs

### Points de Contrôle

```typescript
// Vérification automatique dans les tests
test("L'accessibilité des icônes est respectée", () => {
  const locationIcons = screen.getAllByRole("img");
  locationIcons.forEach(icon => {
    expect(icon).toHaveAttribute("aria-label");
  });
});
```

## Migration depuis shadcn/ui

### Changements Apportés

1. **Cards** : `Card` + `CardContent` → `.card` + `.card-body`
2. **Boutons** : `Button` → `.btn` + modificateurs DaisyUI
3. **Icônes** : Lineicons (CDN 4.0)
4. **Badges** : `Badge` → Classes Tailwind natives

### Avantages de la Migration

- **Cohérence** : Conformité aux standards du projet
- **Performance** : Moins de JavaScript, plus de CSS
- **Accessibilité** : Intégrée par défaut dans DaisyUI
- **Maintenance** : Moins de dépendances externes

## Commandes de Test

```bash
# Tests unitaires
npm run test qui-sommes-nous-page.test.tsx

# Tests E2E
npm run test:e2e qui-sommes-nous.spec.ts

# Tests complets avec coverage
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## Validation TDD

### Cycle de Développement

1. ✅ **RED** : Tests écrits avant l'implémentation
2. ✅ **GREEN** : Implémentation minimale pour passer les tests
3. ✅ **REFACTOR** : Migration vers DaisyUI + Lineicons
4. ✅ **DOCUMENT** : Documentation technique complète

### Coverage Requis

- **Branches** : 80% minimum
- **Functions** : 80% minimum  
- **Lines** : 80% minimum
- **Statements** : 80% minimum

## Maintenance et Évolution

### Bonnes Pratiques

1. **Toujours privilégier DaisyUI** aux composants custom
2. **Utiliser Lineicons en priorité** pour toute nouvelle icône
3. **Ajouter data-testid** pour tous les nouveaux éléments
4. **Maintenir l'accessibilité** avec aria-labels appropriés
5. **Tester la responsivité** sur mobile/tablet/desktop

### Points d'Attention

- **Ne pas mélanger** shadcn/ui et DaisyUI
- **Éviter les CSS custom** quand DaisyUI suffit
- **Préférer les classes utilitaires** Tailwind
- **Maintenir la cohérence** des data-testids

---

*Documentation générée automatiquement selon les standards TDD du projet E2I VoIP - NextJS 15 + DaisyUI + Lineicons*
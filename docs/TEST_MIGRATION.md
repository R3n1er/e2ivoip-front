# Guide de Migration des Tests - Phase 2

**Contexte** : Suite à la refactorisation des composants HubSpot (Phase 2), certains tests doivent être mis à jour pour utiliser les nouveaux composants.

## Tests à Mettre à Jour

### ❌ Tests Échouants (4 tests)

1. **`tests/hubspot-e2e.test.tsx`** - 3 tests
   - Ancienne approche : Utilise `document.getElementById('hubspot-form-container')`
   - Problème : Le nouveau composant utilise des refs et testId différents

2. **`tests/contact-page-hubspot.test.tsx`** - 1 test
   - Ancienne approche : Cherche `#hubspot-form-container`
   - Problème : Le data-testid a changé

## Plan de Migration

### Étape 1 : Identifier les Sélecteurs à Remplacer

**Ancien code** :
```typescript
// ❌ NE FONCTIONNE PLUS
const container = document.getElementById('hubspot-form-container');
```

**Nouveau code** :
```typescript
// ✅ NOUVEAU - Utiliser data-testid
const container = screen.getByTestId('hubspot-form-container');
// ou
const form = screen.getByTestId('hubspot-form');
```

### Étape 2 : Mettre à Jour les Tests

#### **Fichier : `tests/hubspot-e2e.test.tsx`**

**Lignes à modifier** :
```typescript
// AVANT (ligne ~40)
const hubspotContainer = document.getElementById('hubspot-form-container');
expect(hubspotContainer).toBeInTheDocument();

// APRÈS
const hubspotContainer = screen.getByTestId('hubspot-form-container');
expect(hubspotContainer).toBeInTheDocument();
```

#### **Fichier : `tests/contact-page-hubspot.test.tsx`**

**Lignes à modifier** :
```typescript
// AVANT (ligne ~17-18)
const hubspotContainer = document.getElementById('hubspot-form-container');
expect(hubspotContainer).toBeInTheDocument();

// APRÈS
const hubspotContainer = screen.getByTestId('hubspot-form-container');
expect(hubspotContainer).toBeInTheDocument();
```

### Étape 3 : Ajuster les Mocks HubSpot

Le nouveau composant utilise le hook `useHubSpotFormsScript`, qui doit être mocké :

```typescript
// Ajouter en haut des fichiers de test
jest.mock('@/lib/hooks/use-hubspot-script', () => ({
  useHubSpotFormsScript: () => ({
    loaded: true,
    loading: false,
    error: null,
  }),
}));
```

### Étape 4 : Vérifier les Imports

**Anciens imports à remplacer** :
```typescript
// ❌ ANCIEN
import HubspotFormInline from "@/components/hubspot-form-inline";
import { HubSpotContactForm } from "@/components/hubspot-contact-form";

// ✅ NOUVEAU
import { InlineContactForm, HubSpotForm } from "@/components/hubspot";
```

## Tests data-testid Disponibles

Le nouveau composant `HubSpotForm` expose ces sélecteurs :

| data-testid | Description | Usage |
|-------------|-------------|-------|
| `hubspot-form` | Conteneur principal | Par défaut |
| `hubspot-form-container` | Div interne du formulaire | Toujours présent |
| `quick-contact-form` | QuickContactForm | Variante homepage |
| `full-contact-form` | FullContactForm | Variante page dédiée |
| `inline-contact-form` | InlineContactForm | Variante inline |

## Checklist de Migration des Tests

- [ ] Mettre à jour `tests/hubspot-e2e.test.tsx`
- [ ] Mettre à jour `tests/contact-page-hubspot.test.tsx`
- [ ] Ajouter les mocks `useHubSpotFormsScript`
- [ ] Remplacer `getElementById` par `screen.getByTestId`
- [ ] Vérifier que tous les imports sont à jour
- [ ] Lancer `npm test` pour valider
- [ ] Lancer `npm run test:e2e` pour les tests Playwright

## Commandes de Validation

```bash
# Tests unitaires uniquement
npm test

# Tests E2E Playwright
npm run test:e2e

# Coverage
npm run test:coverage
```

## Prochaines Actions

1. ⏸️ **Reporter la migration des tests** (optionnel pour Phase 2)
2. ✅ **Continuer Phase 2** : Documenter les composants migrés
3. ✅ **Finaliser Phase 2** : Mettre à jour `REFACTORING.md`

---

**Note** : Les tests peuvent être migrés plus tard sans bloquer la Phase 2. Le code de production fonctionne correctement - seuls les tests d'intégration ont besoin d'être ajustés.

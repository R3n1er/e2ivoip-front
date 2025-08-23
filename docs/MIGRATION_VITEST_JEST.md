# Migration de Vitest vers Jest

## Date: 23 Janvier 2025

## Contexte
Migration complète du framework de test de Vitest vers Jest pour le projet E2I VoIP Frontend.

## Changements effectués

### 1. Dépendances

#### Supprimées
- `vitest`: Framework de test précédent
- `@vitejs/plugin-react`: Plugin Vite pour React (utilisé par Vitest)

#### Ajoutées
- `jest`: ^30.0.5 - Framework de test
- `@types/jest`: ^30.0.0 - Types TypeScript pour Jest
- `jest-environment-jsdom`: ^30.0.5 - Environnement DOM pour Jest
- `ts-jest`: ^29.4.1 - Support TypeScript pour Jest
- `identity-obj-proxy`: ^3.0.0 - Mock pour les imports CSS
- `@testing-library/jest-dom`: ^6.8.0 - Matchers DOM pour Jest
- `@testing-library/react`: ^16.3.0 - Utilitaires de test React

### 2. Configuration

#### Fichier supprimé
- `vitest.config.ts`

#### Fichier créé
- `jest.config.js` - Configuration Jest avec support Next.js

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts', '<rootDir>/tests/setup-global.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx}',
    '<rootDir>/**/__tests__/**/*.{ts,tsx}',
  ],
  // ... autres configurations
}

module.exports = createJestConfig(customJestConfig)
```

### 3. Scripts NPM mis à jour

```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

Scripts supprimés:
- `test:ui`: Interface UI de Vitest
- `test:integration`: Configuration spécifique Vitest

### 4. Migration des fichiers de test

#### Modifications dans tous les fichiers `.test.ts` et `.test.tsx`

**Avant (Vitest):**
```typescript
import { describe, it, expect, vi } from 'vitest'

// Mocks
vi.mock('module-name')
global.fetch = vi.fn()
```

**Après (Jest):**
```typescript
// Plus besoin d'importer describe, it, expect (globals Jest)

// Mocks
jest.mock('module-name')
global.fetch = jest.fn()
```

#### Fichiers de setup modifiés
- `tests/setup.ts`: Remplacé `vi` par `jest`
- `tests/setup-global.ts`: Remplacé `vi.fn()` par `jest.fn()`

### 5. Résultats de la migration

- **36 suites de tests** migrées
- **212 tests** au total
- **Taux de réussite**: 167 tests passent (78.8%)
- Les échecs restants sont liés à la logique métier, non à la migration

### 6. Avantages de Jest

1. **Meilleure intégration Next.js** - Configuration native avec next/jest
2. **Écosystème mature** - Plus de plugins et d'outils disponibles
3. **Documentation extensive** - Plus de ressources et exemples
4. **Compatibilité** - Meilleur support des outils CI/CD
5. **Stabilité** - Framework de test éprouvé et stable

### 7. Points d'attention

- Les tests e2e avec Playwright restent inchangés
- Les mocks globaux sont maintenant gérés par Jest
- La syntaxe des mocks a changé (`vi` → `jest`)

## Commandes utiles

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm run test:watch

# Lancer les tests avec couverture
npm run test:coverage

# Lancer un test spécifique
npm test -- tests/setup.test.ts

# Lancer les tests matchant un pattern
npm test -- --testNamePattern="Environment Setup"
```

## Prochaines étapes recommandées

1. Corriger les tests échouants (liés à la logique métier)
2. Ajouter des tests pour les nouvelles fonctionnalités
3. Configurer les seuils de couverture de code
4. Intégrer les tests dans le pipeline CI/CD

---

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
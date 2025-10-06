# Workflow de Validation - E2I VoIP

## 📋 Vue d'ensemble

Ce document décrit le workflow **OBLIGATOIRE** de validation avant tout push Git vers GitHub. Ce processus garantit la qualité, la sécurité et la stabilité du code.

## 🎯 Objectifs

1. **Qualité du code** : Tous les tests passent (Jest + Playwright)
2. **Sécurité** : Aucune vulnérabilité critique
3. **Conformité** : Code conforme aux standards (ESLint + TypeScript)
4. **Stabilité** : Build de production réussit

## 🚀 Utilisation Rapide

### Option 1 : Script de Validation (Recommandé)

```bash
./validate.sh
```

Ce script exécute automatiquement toutes les vérifications requises.

### Option 2 : Commande NPM

```bash
npm run validate
```

### Option 3 : Vérifications Manuelles

```bash
# 1. Tests Jest
npm run test:ci

# 2. Tests Playwright
npm run test:e2e

# 3. Linting
npm run lint

# 4. Type checking
npm run type-check

# 5. Audit de sécurité
npm run security:audit

# 6. Build
npm run build
```

## 📊 Checklist de Validation

### ✅ Critères de Succès

Tous les points suivants doivent être satisfaits avant de pousser :

- [ ] **Tests Jest** : 100% des tests unitaires passent
- [ ] **Tests Playwright** : 100% des tests E2E passent
- [ ] **Linting** : Aucune erreur ESLint (warnings OK)
- [ ] **TypeScript** : Aucune erreur de type
- [ ] **Sécurité** : Aucune vulnérabilité HIGH/CRITICAL
- [ ] **Build** : Build de production réussit sans erreur

### ❌ Critères d'Échec

Le push est **INTERDIT** si :

- Un seul test échoue (Jest OU Playwright)
- Des erreurs de linting persistent
- Des erreurs TypeScript existent
- Des vulnérabilités HIGH/CRITICAL sont détectées
- Le build de production échoue
- Des fichiers sensibles (.env, credentials) sont trackés

## 🔄 Workflow Complet

### 1. Développement avec TDD

```bash
# Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Écrire les tests AVANT le code
# - Tests Playwright pour le comportement utilisateur
# - Tests Jest pour les composants React

# Implémenter le code pour faire passer les tests
# Suivre le cycle RED → GREEN → REFACTOR
```

### 2. Validation Locale

```bash
# Exécuter le script de validation
./validate.sh

# OU utiliser npm
npm run validate
```

### 3. Commit et Push

```bash
# Si validation OK
git add .
git commit -m "feat: nouvelle fonctionnalité avec tests"
git push origin feature/nouvelle-fonctionnalite
```

### 4. Vérification Vercel Preview

Après le push, Vercel génère automatiquement un **Preview Deployment** :
- Vérifier l'URL de preview
- Tester manuellement les fonctionnalités
- Valider le comportement en production

### 5. Pull Request

```bash
# Créer la PR
gh pr create --title "feat: nouvelle fonctionnalité" \
             --body "Description de la fonctionnalité"
```

## 🛠️ Scripts Disponibles

### Tests

| Script | Description |
|--------|-------------|
| `npm test` | Tests Jest en mode watch |
| `npm run test:ci` | Tests Jest avec couverture (CI) |
| `npm run test:e2e` | Tests Playwright E2E |
| `npm run test:e2e:ui` | Tests Playwright avec UI |
| `npm run test:all` | Tous les tests (Jest + Playwright) |

### Qualité de Code

| Script | Description |
|--------|-------------|
| `npm run lint` | Vérifier le linting |
| `npm run lint:fix` | Corriger automatiquement le linting |
| `npm run type-check` | Vérifier les types TypeScript |

### Sécurité

| Script | Description |
|--------|-------------|
| `npm run security:audit` | Audit de sécurité (HIGH/CRITICAL) |
| `npm audit fix` | Correction automatique des vulnérabilités |

### Build

| Script | Description |
|--------|-------------|
| `npm run build` | Build de production |
| `npm run analyze` | Analyse du bundle |

### Validation Complète

| Script | Description |
|--------|-------------|
| `npm run validate` | Exécute TOUTES les vérifications |
| `./validate.sh` | Script bash avec affichage détaillé |

## 🤖 Automatisation avec Husky

### Installation

```bash
# Installer Husky
npm install --save-dev husky
npx husky init

# Créer le hook pre-push
npx husky add .husky/pre-push "npm run validate"
```

### Comportement

Avec Husky configuré, **chaque `git push` déclenchera automatiquement** :
1. `npm run test:all`
2. `npm run lint`
3. `npm run type-check`
4. `npm run security:audit`
5. `npm run build`

Si une seule étape échoue, le push est **bloqué**.

## 🔐 Sécurité

### Fichiers Sensibles

**NE JAMAIS committer** :
- `.env` ou `.env.local`
- `credentials.json`
- Clés API en dur dans le code
- Tokens d'authentification

### Vérification Avant Commit

```bash
# Vérifier les fichiers trackés
git status

# Vérifier qu'aucun fichier sensible n'est ajouté
git diff --staged

# Si besoin, retirer un fichier
git reset HEAD <fichier>
```

### Audit de Sécurité

```bash
# Audit complet
npm audit

# Audit HIGH/CRITICAL seulement (utilisé par validate.sh)
npm audit --audit-level=high

# Corriger automatiquement
npm audit fix

# Corriger avec breaking changes
npm audit fix --force
```

## 📝 Exemples de Workflow

### Exemple 1 : Nouvelle Fonctionnalité

```bash
# 1. Créer la branche
git checkout -b feature/chat-preoverlay

# 2. Écrire les tests Playwright
# tests/playwright/chat-preoverlay-flow.spec.ts

# 3. Implémenter le composant
# components/chat-preoverlay.tsx

# 4. Valider localement
./validate.sh
# ✅ Toutes les vérifications passent

# 5. Commit et Push
git add .
git commit -m "feat: ajoute module pré-chat avec tests E2E complets"
git push origin feature/chat-preoverlay

# 6. Créer la PR
gh pr create --title "feat(chat): module pré-chat avec validation HubSpot"
```

### Exemple 2 : Correction de Bug

```bash
# 1. Créer la branche
git checkout -b fix/hubspot-form-validation

# 2. Écrire le test qui reproduit le bug
# tests/hubspot-form.test.tsx

# 3. Corriger le bug
# components/hubspot/hubspot-form.tsx

# 4. Valider
npm run validate
# ✅ OK

# 5. Commit et Push
git add .
git commit -m "fix(hubspot): corrige validation formulaire contact"
git push origin fix/hubspot-form-validation
```

### Exemple 3 : Échec de Validation

```bash
# Tenter de valider
./validate.sh

# ❌ Tests Playwright échoués
# Erreur: tests/playwright/chat-preoverlay-flow.spec.ts:77
# Expected: not visible
# Received: visible

# Corriger le problème dans le composant
# Puis re-valider
./validate.sh

# ✅ Toutes les vérifications passent
# Maintenant autoriser le push
```

## 🎓 Bonnes Pratiques

### 1. Toujours Écrire les Tests D'abord (TDD)

```bash
# ✅ BON
# 1. Écrire test Playwright
# 2. Voir le test échouer (RED)
# 3. Implémenter le code
# 4. Voir le test passer (GREEN)
# 5. Refactorer (REFACTOR)

# ❌ MAUVAIS
# 1. Implémenter le code
# 2. Espérer que ça marche
# 3. Push sans tests
```

### 2. Valider Localement AVANT de Push

```bash
# ✅ BON
./validate.sh
git push

# ❌ MAUVAIS
git push  # Espérer que la CI passe
```

### 3. Petits Commits Fréquents

```bash
# ✅ BON
git commit -m "feat(chat): ajoute bouton d'ouverture"
git commit -m "feat(chat): ajoute formulaire pré-chat"
git commit -m "test(chat): ajoute tests E2E complets"

# ❌ MAUVAIS
git commit -m "feat: gros changement avec plein de trucs"
```

### 4. Messages de Commit Clairs

Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `test:` Ajout/modification de tests
- `docs:` Documentation
- `refactor:` Refactoring
- `chore:` Tâches de maintenance
- `security:` Corrections de sécurité

## 🚨 Cas d'Urgence (Hotfix)

### Procédure Exceptionnelle

En cas de **hotfix critique en production** :

```bash
# 1. Créer une branche hotfix depuis main
git checkout main
git pull
git checkout -b hotfix/critical-security-fix

# 2. Appliquer le fix minimal

# 3. TOUJOURS exécuter au minimum
npm run test:e2e  # Tests E2E obligatoires
npm run security:audit  # Sécurité obligatoire

# 4. Push avec message explicite
git commit -m "security: corrige vulnérabilité critique XSS (hotfix)"
git push origin hotfix/critical-security-fix

# 5. Merge immédiat en main
gh pr create --title "HOTFIX: Sécurité critique" --body "Merge immédiat requis"

# 6. Documenter dans un post-mortem
```

**⚠️ IMPORTANT** : Les hotfix doivent être documentés et suivis d'un refactoring propre.

## 📊 Métriques de Qualité

### Objectifs

- **Coverage Jest** : > 80%
- **Tests Playwright** : 100% passants
- **Vulnerabilités** : 0 HIGH/CRITICAL
- **Build Size** : < 500KB (First Load JS)

### Vérification

```bash
# Coverage
npm run test:ci

# Bundle size
npm run analyze
```

## 🔗 Ressources

- [CLAUDE.md](../CLAUDE.md) - Configuration complète du projet
- [ADR.md](./ADR.md) - Décisions d'architecture
- [REFACTORING.md](./REFACTORING.md) - Journal de refactoring
- [OPTIMIZATIONS.md](./OPTIMIZATIONS.md) - Guide d'optimisation

---

**Dernière mise à jour** : 2025-10-05
**Maintenu par** : E2I VoIP Team

#!/bin/bash
# validate.sh - Script de validation avant push
# Usage: ./validate.sh

set -e  # Arrêter en cas d'erreur

echo ""
echo "🔍 ========================================"
echo "   VALIDATION PRÉ-PUSH - E2I VoIP"
echo "=========================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages de succès
success() {
  echo -e "${GREEN}✅ $1${NC}"
}

# Fonction pour afficher les messages d'erreur
error() {
  echo -e "${RED}❌ $1${NC}"
}

# Fonction pour afficher les messages d'avertissement
warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Tests Jest (Tests unitaires)
echo "🧪 [1/6] Exécution des tests Jest..."
if npm run test:ci; then
  success "Tests Jest réussis"
else
  error "Tests Jest échoués"
  exit 1
fi
echo ""

# 2. Tests Playwright (Tests E2E)
echo "🎭 [2/6] Exécution des tests Playwright E2E..."
if npm run test:e2e; then
  success "Tests Playwright réussis"
else
  error "Tests Playwright échoués"
  exit 1
fi
echo ""

# 3. Linting
echo "✨ [3/6] Vérification du linting..."
if npm run lint; then
  success "Linting OK"
else
  error "Erreurs de linting détectées"
  exit 1
fi
echo ""

# 4. Type checking TypeScript
echo "🔍 [4/6] Vérification des types TypeScript..."
if npm run type-check; then
  success "Types TypeScript OK"
else
  error "Erreurs TypeScript détectées"
  exit 1
fi
echo ""

# 5. Audit de sécurité
echo "🔐 [5/6] Audit de sécurité..."
if npm audit --audit-level=high; then
  success "Aucune vulnérabilité critique détectée"
else
  error "Vulnérabilités de sécurité détectées"
  warning "Exécutez 'npm audit fix' pour tenter une correction automatique"
  exit 1
fi
echo ""

# 6. Build de production
echo "🏗️  [6/6] Build de production..."
if npm run build; then
  success "Build de production réussi"
else
  error "Build de production échoué"
  exit 1
fi
echo ""

# Résumé final
echo "=========================================="
echo -e "${GREEN}🎉 TOUTES LES VALIDATIONS SONT PASSÉES !${NC}"
echo "=========================================="
echo ""
echo "✅ Tests Jest: OK"
echo "✅ Tests Playwright: OK"
echo "✅ Linting: OK"
echo "✅ Types TypeScript: OK"
echo "✅ Sécurité: OK"
echo "✅ Build: OK"
echo ""
echo "Vous pouvez maintenant pousser vos modifications vers GitHub."
echo ""
echo "Commandes suggérées:"
echo "  git add ."
echo "  git commit -m \"feat: votre message de commit\""
echo "  git push origin <nom-de-branche>"
echo ""

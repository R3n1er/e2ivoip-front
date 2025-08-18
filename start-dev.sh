#!/bin/bash

# Script de démarrage du serveur de développement E2I VoIP
# Respecte la charte graphique PRD strictement

echo "🎨 Démarrage du serveur de développement E2I VoIP"
echo "📋 Charte graphique PRD appliquée :"
echo "   • Rouge principal : #E53E3E (CTA, boutons)"
echo "   • Bleu marine : #2D3848 (texte principal, fond)"
echo "   • Gris : #818096 (texte secondaire)"
echo "   • Blanc : #FFFFFF (fond, cartes)"
echo ""

# Vérifier si npm est disponible
if command -v npm &> /dev/null; then
    echo "🚀 Lancement du serveur Next.js sur le port 3000 (forcé selon les règles)..."
    npx next dev --port 3000
elif command -v yarn &> /dev/null; then
    echo "🚀 Lancement du serveur Next.js avec Yarn sur le port 3000..."
    yarn next dev --port 3000
else
    echo "❌ Erreur : npm ou yarn non trouvé"
    echo "Veuillez installer Node.js et npm"
    exit 1
fi
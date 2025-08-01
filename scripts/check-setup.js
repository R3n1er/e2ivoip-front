#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification de la configuration du projet E2I VoIP...\n')

// Vérifier les fichiers essentiels
const requiredFiles = [
  'package.json',
  'tailwind.config.js',
  'next.config.ts',
  'tsconfig.json',
  'vitest.config.ts',
  'tests/setup.ts',
  'components.json'
]

let allFilesExist = true

console.log('📁 Vérification des fichiers de configuration...')
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - MANQUANT`)
    allFilesExist = false
  }
})

// Vérifier les dépendances
console.log('\n📦 Vérification des dépendances...')
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const requiredDeps = [
  'next',
  'react',
  'react-dom',
  'tailwindcss',
  'daisyui',
  'framer-motion',
  'vitest',
  '@testing-library/react'
]

requiredDeps.forEach(dep => {
  if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
    console.log(`✅ ${dep}`)
  } else {
    console.log(`❌ ${dep} - MANQUANT`)
    allFilesExist = false
  }
})

// Vérifier la configuration Tailwind
console.log('\n🎨 Vérification de la configuration Tailwind...')
const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8')
if (tailwindConfig.includes('daisyui')) {
  console.log('✅ DaisyUI configuré')
} else {
  console.log('❌ DaisyUI non configuré')
  allFilesExist = false
}

// Vérifier les scripts npm
console.log('\n⚙️ Vérification des scripts npm...')
const requiredScripts = ['dev', 'build', 'test', 'lint']
requiredScripts.forEach(script => {
  if (packageJson.scripts?.[script]) {
    console.log(`✅ npm run ${script}`)
  } else {
    console.log(`❌ npm run ${script} - MANQUANT`)
    allFilesExist = false
  }
})

console.log('\n' + '='.repeat(50))
if (allFilesExist) {
  console.log('🎉 Configuration complète ! Le projet est prêt pour le développement.')
  console.log('\nProchaines étapes :')
  console.log('1. Configurer les variables d\'environnement (voir env.example)')
  console.log('2. Configurer HubSpot, Tally et n8n')
  console.log('3. Lancer le serveur de développement : npm run dev')
  console.log('4. Exécuter les tests : npm test')
} else {
  console.log('⚠️ Certains éléments sont manquants. Veuillez corriger les erreurs ci-dessus.')
}
console.log('='.repeat(50)) 
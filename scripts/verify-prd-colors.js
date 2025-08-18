#!/usr/bin/env node

/**
 * Script de vérification de la conformité à la charte graphique PRD
 * Couleurs PRD strictes :
 * - Rouge principal : #E53E3E (CTA, boutons)
 * - Bleu marine : #2D3848 (texte principal, fond)
 * - Gris : #818096 (texte secondaire)
 * - Blanc : #FFFFFF (fond, cartes)
 */

const fs = require('fs');
const path = require('path');

// Couleurs PRD officielles
const PRD_COLORS = {
  'red-primary': '#E53E3E',
  'blue-marine': '#2D3848', 
  'gray-secondary': '#818096',
  'white-primary': '#FFFFFF'
};

// Couleurs interdites (non conformes au PRD)
const FORBIDDEN_COLORS = [
  'text-red-600', 'bg-red-600', 'text-red-500', 'bg-red-500',
  'text-gray-900', 'bg-gray-900', 'text-gray-700', 'bg-gray-700',
  'text-gray-600', 'bg-gray-600', 'text-gray-400', 'bg-gray-400',
  'text-gray-300', 'bg-gray-300', 'text-gray-200', 'bg-gray-200',
  'text-blue-600', 'bg-blue-600', 'text-blue-900', 'bg-blue-900'
];

function scanDirectory(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scan(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Vérifier les couleurs interdites
  for (const forbiddenColor of FORBIDDEN_COLORS) {
    const regex = new RegExp(`\\b${forbiddenColor}\\b`, 'g');
    const matches = content.match(regex);
    
    if (matches) {
      issues.push({
        type: 'FORBIDDEN_COLOR',
        color: forbiddenColor,
        count: matches.length,
        suggestion: getSuggestion(forbiddenColor)
      });
    }
  }
  
  // Vérifier les couleurs inline non conformes
  const inlineColorRegex = /#[0-9A-Fa-f]{6}/g;
  const inlineColors = content.match(inlineColorRegex) || [];
  
  for (const color of inlineColors) {
    if (!Object.values(PRD_COLORS).includes(color.toUpperCase())) {
      issues.push({
        type: 'NON_PRD_INLINE_COLOR',
        color: color,
        suggestion: getClosestPRDColor(color)
      });
    }
  }
  
  return issues;
}

function getSuggestion(forbiddenColor) {
  const suggestions = {
    'text-red-600': 'text-red-primary',
    'bg-red-600': 'bg-red-primary',
    'text-red-500': 'text-red-primary',
    'bg-red-500': 'bg-red-primary',
    'text-gray-900': 'text-blue-marine',
    'bg-gray-900': 'bg-blue-marine',
    'text-gray-700': 'text-blue-marine',
    'bg-gray-700': 'bg-blue-marine',
    'text-gray-600': 'text-gray-secondary',
    'bg-gray-600': 'bg-gray-secondary',
    'text-gray-400': 'text-gray-secondary',
    'bg-gray-400': 'bg-gray-secondary',
    'text-white': 'text-white-primary',
    'bg-white': 'bg-white-primary'
  };
  
  return suggestions[forbiddenColor] || 'Utiliser une couleur PRD conforme';
}

function getClosestPRDColor(color) {
  // Logique simple pour suggérer la couleur PRD la plus proche
  const colorLower = color.toLowerCase();
  
  if (colorLower.includes('red') || colorLower.includes('e5') || colorLower.includes('dc')) {
    return '#E53E3E (red-primary)';
  } else if (colorLower.includes('blue') || colorLower.includes('2d') || colorLower.includes('1e')) {
    return '#2D3848 (blue-marine)';
  } else if (colorLower.includes('gray') || colorLower.includes('81')) {
    return '#818096 (gray-secondary)';
  } else {
    return '#FFFFFF (white-primary)';
  }
}

function main() {
  console.log('🎨 Vérification de la conformité à la charte graphique PRD...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const componentsDir = path.join(projectRoot, 'components');
  const appDir = path.join(projectRoot, 'app');
  
  const files = [
    ...scanDirectory(componentsDir),
    ...scanDirectory(appDir)
  ];
  
  let totalIssues = 0;
  let filesWithIssues = 0;
  
  for (const file of files) {
    const issues = checkFile(file);
    
    if (issues.length > 0) {
      filesWithIssues++;
      totalIssues += issues.length;
      
      console.log(`❌ ${path.relative(projectRoot, file)}`);
      
      for (const issue of issues) {
        if (issue.type === 'FORBIDDEN_COLOR') {
          console.log(`   • ${issue.color} (${issue.count}x) → ${issue.suggestion}`);
        } else if (issue.type === 'NON_PRD_INLINE_COLOR') {
          console.log(`   • ${issue.color} → ${issue.suggestion}`);
        }
      }
      console.log('');
    }
  }
  
  console.log('📊 Résumé :');
  console.log(`   • Fichiers analysés : ${files.length}`);
  console.log(`   • Fichiers avec problèmes : ${filesWithIssues}`);
  console.log(`   • Total des problèmes : ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('\n✅ Parfait ! Tous les fichiers respectent la charte graphique PRD.');
  } else {
    console.log('\n⚠️  Des améliorations sont nécessaires pour respecter la charte PRD.');
    console.log('\nCouleurs PRD officielles :');
    for (const [name, color] of Object.entries(PRD_COLORS)) {
      console.log(`   • ${name}: ${color}`);
    }
  }
  
  process.exit(totalIssues > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}
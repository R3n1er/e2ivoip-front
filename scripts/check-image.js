const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, '..', 'public', 'man-oniphone-business-min.jpg');

console.log('🔍 Vérification de l\'image...');
console.log('Chemin:', imagePath);

if (fs.existsSync(imagePath)) {
  const stats = fs.statSync(imagePath);
  console.log('✅ Image trouvée');
  console.log('📏 Taille:', (stats.size / 1024 / 1024).toFixed(2) + ' MB');
  console.log('📅 Dernière modification:', stats.mtime);
  
  // Vérifier les permissions
  try {
    fs.accessSync(imagePath, fs.constants.R_OK);
    console.log('✅ Permissions de lecture: OK');
  } catch (err) {
    console.log('❌ Problème de permissions de lecture');
  }
} else {
  console.log('❌ Image non trouvée');
}

// Vérifier la structure du dossier public
console.log('\n📁 Contenu du dossier public:');
const publicPath = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicPath);
files.forEach(file => {
  const filePath = path.join(publicPath, file);
  const stats = fs.statSync(filePath);
  if (stats.isFile() && file.includes('man-oniphone')) {
    console.log(`  📄 ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
});
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapping des icônes lucide-react vers Lineicons
const iconMapping = {
  // Navigation & UI
  'Menu': 'lni-menu',
  'X': 'lni-close',
  'ChevronDown': 'lni-chevron-down',
  'ChevronUp': 'lni-chevron-up',
  'ChevronLeft': 'lni-chevron-left',
  'ChevronRight': 'lni-chevron-right',
  'ArrowRight': 'lni-arrow-right',
  'ArrowLeft': 'lni-arrow-left',
  'ExternalLink': 'lni-link',
  'Search': 'lni-search-alt',
  
  // Communication
  'Phone': 'lni-phone',
  'Mail': 'lni-envelope',
  'MessageSquare': 'lni-comments',
  'MessageCircle': 'lni-comments',
  
  // Business & Services
  'Users': 'lni-users',
  'User': 'lni-user',
  'Building': 'lni-apartment',
  'Building2': 'lni-apartment',
  'Briefcase': 'lni-briefcase',
  'Award': 'lni-certificate',
  'Shield': 'lni-shield',
  'ShieldCheck': 'lni-protection',
  
  // Technology
  'Cloud': 'lni-cloud',
  'Smartphone': 'lni-mobile',
  'Monitor': 'lni-display',
  'Laptop': 'lni-laptop',
  'Wifi': 'lni-signal',
  'Globe': 'lni-world',
  'Database': 'lni-database',
  'Server': 'lni-server',
  'Cpu': 'lni-pulse',
  
  // Features & Actions
  'CheckCircle': 'lni-checkmark-circle',
  'Check': 'lni-checkmark',
  'Plus': 'lni-plus',
  'Settings': 'lni-cog',
  'Star': 'lni-star',
  'Heart': 'lni-heart',
  'Clock': 'lni-timer',
  'Calendar': 'lni-calendar',
  'Target': 'lni-target',
  'TrendingUp': 'lni-stats-up',
  'BarChart3': 'lni-bar-chart',
  'BarChart': 'lni-bar-chart',
  'PieChart': 'lni-pie-chart',
  
  // Media & Content
  'Play': 'lni-play',
  'Pause': 'lni-pause',
  'Volume': 'lni-volume',
  'Volume2': 'lni-volume',
  'Mic': 'lni-microphone',
  'Camera': 'lni-camera',
  'Image': 'lni-image',
  'FileText': 'lni-text-format',
  
  // Location
  'MapPin': 'lni-map-marker',
  'Map': 'lni-map',
  'Navigation': 'lni-direction',
  
  // Status & Alerts
  'AlertCircle': 'lni-warning',
  'Info': 'lni-information',
  'HelpCircle': 'lni-question-circle',
  'XCircle': 'lni-cross-circle',
  
  // E-commerce & Finance
  'ShoppingCart': 'lni-cart',
  'CreditCard': 'lni-credit-cards',
  'DollarSign': 'lni-dollar',
  'Euro': 'lni-euro',
  
  // Social
  'Facebook': 'lni-facebook-filled',
  'Twitter': 'lni-twitter-filled',
  'Linkedin': 'lni-linkedin-original',
  'Instagram': 'lni-instagram-filled',
  'Youtube': 'lni-youtube',
  
  // Others
  'Zap': 'lni-bolt',
  'Key': 'lni-key',
  'Lock': 'lni-lock',
  'Unlock': 'lni-unlock',
  'Download': 'lni-download',
  'Upload': 'lni-upload',
  'Share': 'lni-share',
  'Share2': 'lni-share-alt',
  'Copy': 'lni-copy',
  'Clipboard': 'lni-clipboard',
  'Edit': 'lni-pencil',
  'Trash': 'lni-trash-can',
  'RefreshCw': 'lni-reload',
  'RotateCw': 'lni-reload',
  'Home': 'lni-home',
  'Layers': 'lni-layers',
  'Package': 'lni-package',
  'Gift': 'lni-gift',
  'Bookmark': 'lni-bookmark',
  'Flag': 'lni-flag',
  'Bell': 'lni-alarm',
  'BellRing': 'lni-alarm',
  'Sun': 'lni-sun',
  'Moon': 'lni-night',
  'Eye': 'lni-eye',
  'EyeOff': 'lni-eye',
  'Printer': 'lni-printer',
  'Send': 'lni-telegram',
  'Link': 'lni-link',
  'Paperclip': 'lni-paperclip',
  'Filter': 'lni-funnel',
  'Grid': 'lni-grid-alt',
  'List': 'lni-list',
  'Inbox': 'lni-inbox',
  'Archive': 'lni-archive',
  'Folder': 'lni-folder',
  'FolderOpen': 'lni-folder',
  'File': 'lni-empty-file',
  'Save': 'lni-save',
  'LogOut': 'lni-exit',
  'LogIn': 'lni-enter',
  'UserPlus': 'lni-user-plus',
  'UserMinus': 'lni-user-minus',
  'UserCheck': 'lni-user',
  'Activity': 'lni-pulse',
  'Anchor': 'lni-anchor',
  'Aperture': 'lni-focus',
  'AtSign': 'lni-at',
  'Battery': 'lni-battery',
  'Bluetooth': 'lni-bluetooth',
  'Bold': 'lni-bold',
  'Box': 'lni-package',
  'Circle': 'lni-circle',
  'Code': 'lni-code',
  'Coffee': 'lni-cup',
  'Command': 'lni-keyword-research',
  'Compass': 'lni-compass',
  'Crosshair': 'lni-target',
  'Disc': 'lni-save',
  'Droplet': 'lni-drop',
  'Feather': 'lni-write',
  'Film': 'lni-video',
  'Hash': 'lni-keyword-research',
  'Headphones': 'lni-headphone',
  'Italic': 'lni-italic',
  'Layout': 'lni-layout',
  'Loader': 'lni-spinner',
  'Maximize': 'lni-full-screen',
  'Minimize': 'lni-frame-expand',
  'Move': 'lni-move',
  'Music': 'lni-music',
  'Percent': 'lni-offer',
  'Power': 'lni-power-switch',
  'Radio': 'lni-radio-button',
  'Repeat': 'lni-reload',
  'Rss': 'lni-rss-feed',
  'Scissors': 'lni-cut',
  'Shuffle': 'lni-shuffle',
  'Slash': 'lni-ban',
  'Sliders': 'lni-control-panel',
  'Square': 'lni-rectangle',
  'Tag': 'lni-tag',
  'Terminal': 'lni-code-alt',
  'Thermometer': 'lni-temperature',
  'ToggleLeft': 'lni-switch',
  'ToggleRight': 'lni-switch',
  'Tool': 'lni-hammer',
  'Tv': 'lni-display',
  'Type': 'lni-text-format',
  'Underline': 'lni-underline',
  'Video': 'lni-video',
  'Watch': 'lni-timer',
  'Wind': 'lni-wind',
  'ZoomIn': 'lni-zoom-in',
  'ZoomOut': 'lni-zoom-out'
};

// Fonction pour obtenir le nom de l'icône Lineicons
function getLineiconName(lucideIcon) {
  return iconMapping[lucideIcon] || 'lni-question-circle'; // Icône par défaut si non trouvée
}

// Fonction pour traiter un fichier
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Supprimer l'import lucide-react
  const lucideImportRegex = /import\s*{([^}]+)}\s*from\s*["']lucide-react["'];?\n?/g;
  const lucideImportMatch = content.match(lucideImportRegex);
  
  if (lucideImportMatch) {
    // Extraire les icônes importées
    const iconsUsed = [];
    lucideImportMatch.forEach(match => {
      const icons = match.match(/{([^}]+)}/)[1].split(',').map(icon => icon.trim());
      iconsUsed.push(...icons);
    });
    
    // Supprimer l'import lucide-react
    content = content.replace(lucideImportRegex, '');
    
    // Remplacer chaque utilisation d'icône
    iconsUsed.forEach(icon => {
      const lineiconName = getLineiconName(icon);
      
      // Pattern 1: <Icon className="..." />
      const pattern1 = new RegExp(`<${icon}\\s+className="([^"]*)"\\s*/?>`, 'g');
      content = content.replace(pattern1, (match, className) => {
        return `<i className="lni ${lineiconName} ${className}"></i>`;
      });
      
      // Pattern 2: <Icon />
      const pattern2 = new RegExp(`<${icon}\\s*/?>`, 'g');
      content = content.replace(pattern2, `<i className="lni ${lineiconName}"></i>`);
      
      // Pattern 3: icon: Icon dans les objets
      const pattern3 = new RegExp(`icon:\\s*${icon}([,\\s}])`, 'g');
      content = content.replace(pattern3, `icon: "${lineiconName}"$1`);
      
      // Pattern 4: Icon={Icon} dans les props
      const pattern4 = new RegExp(`Icon={${icon}}`, 'g');
      content = content.replace(pattern4, `icon="${lineiconName}"`);
      
      // Pattern 5: <location.icon ... /> pour les objets avec propriété icon
      const pattern5 = new RegExp(`<([a-zA-Z]+)\\.icon\\s+className="([^"]*)"\\s*/?>`, 'g');
      content = content.replace(pattern5, '<i className={`lni ${$1.icon} $2`}></i>');
    });
    
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Migré: ${filePath}`);
    return true;
  }
  
  return false;
}

// Fonction pour parcourir récursivement les dossiers
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let count = 0;
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist' && file !== '.next') {
      count += processDirectory(filePath);
    } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      if (processFile(filePath)) {
        count++;
      }
    }
  });
  
  return count;
}

// Exécution principale
console.log('🔄 Démarrage de la migration vers Lineicons...\n');

const appDir = path.join(__dirname, '..', 'app');
const componentsDir = path.join(__dirname, '..', 'components');

let totalMigrated = 0;

console.log('📁 Traitement du dossier app/...');
totalMigrated += processDirectory(appDir);

console.log('\n📁 Traitement du dossier components/...');
totalMigrated += processDirectory(componentsDir);

console.log(`\n✨ Migration terminée! ${totalMigrated} fichiers migrés vers Lineicons.`);
console.log('\n⚠️  N\'oubliez pas de:');
console.log('1. Vérifier que le CDN Lineicons est ajouté dans app/layout.tsx');
console.log('2. Supprimer lucide-react du package.json (npm uninstall lucide-react)');
console.log('3. Vérifier visuellement que toutes les icônes s\'affichent correctement');
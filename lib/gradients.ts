/**
 * Configuration des dégradés selon la charte graphique E2I VoIP
 * Ce fichier centralise tous les styles de dégradé utilisés dans l'application
 */

// Couleurs de base de la charte graphique
export const COLORS = {
  RED_PRIMARY: '#DC2626',      // red-600
  BLUE_MARINE: '#1E40AF',      // blue-700
  GREEN: '#16A34A',            // green-600
  GRAY_SECONDARY: '#6B7280',   // gray-500
  GRAY_LIGHT: '#F3F4F6',       // gray-100
  WHITE: '#FFFFFF',
  ORANGE: '#F97316',           // orange-500
} as const;

// Types pour les directions de dégradé
export type GradientDirection = 
  | 'to-r'      // De gauche à droite
  | 'to-l'      // De droite à gauche
  | 'to-t'      // Du bas vers le haut
  | 'to-b'      // Du haut vers le bas
  | 'to-tr'     // Diagonal haut-droite
  | 'to-tl'     // Diagonal haut-gauche
  | 'to-br'     // Diagonal bas-droite
  | 'to-bl'     // Diagonal bas-gauche
  | 'radial';   // Radial (du centre vers l'extérieur)

// Interface pour un dégradé
export interface Gradient {
  name: string;
  direction: GradientDirection;
  colors: string[];
  usage: string[];
  tailwindClass: string;
  cssClass: string;
}

// Dégradés principaux
export const PRIMARY_GRADIENTS: Gradient[] = [
  {
    name: 'Rouge-Bleu',
    direction: 'to-r',
    colors: [COLORS.RED_PRIMARY, COLORS.BLUE_MARINE],
    usage: ['Boutons CTA', 'Sections héro', 'Éléments d\'accent'],
    tailwindClass: 'bg-gradient-to-r from-red-600 to-blue-700',
    cssClass: 'gradient-primary-red-blue'
  },
  {
    name: 'Rouge-Vert',
    direction: 'to-br',
    colors: [COLORS.RED_PRIMARY, COLORS.GREEN],
    usage: ['Cartes de services', 'Badges', 'Indicateurs de statut'],
    tailwindClass: 'bg-gradient-to-br from-red-600 to-green-600',
    cssClass: 'gradient-primary-red-green'
  },
  {
    name: 'Bleu-Gris',
    direction: 'to-b',
    colors: [COLORS.BLUE_MARINE, COLORS.GRAY_SECONDARY],
    usage: ['Arrière-plans de sections', 'Cartes d\'information'],
    tailwindClass: 'bg-gradient-to-b from-blue-700 to-gray-500',
    cssClass: 'gradient-primary-blue-gray'
  }
];

// Dégradés secondaires
export const SECONDARY_GRADIENTS: Gradient[] = [
  {
    name: 'Rouge-Orange',
    direction: 'to-r',
    colors: [COLORS.RED_PRIMARY, COLORS.ORANGE],
    usage: ['Éléments d\'alerte', 'Notifications importantes'],
    tailwindClass: 'bg-gradient-to-r from-red-600 to-orange-500',
    cssClass: 'gradient-secondary-red-orange'
  },
  {
    name: 'Bleu-Vert',
    direction: 'to-br',
    colors: [COLORS.BLUE_MARINE, COLORS.GREEN],
    usage: ['Sections de succès', 'Indicateurs positifs'],
    tailwindClass: 'bg-gradient-to-br from-blue-700 to-green-600',
    cssClass: 'gradient-secondary-blue-green'
  },
  {
    name: 'Gris-Blanc',
    direction: 'to-b',
    colors: [COLORS.GRAY_LIGHT, COLORS.WHITE],
    usage: ['Arrière-plans de cartes', 'Sections de contenu'],
    tailwindClass: 'bg-gradient-to-b from-gray-100 to-white',
    cssClass: 'gradient-secondary-gray-white'
  }
];

// Dégradés spéciaux
export const SPECIAL_GRADIENTS: Gradient[] = [
  {
    name: 'Transparent-Rouge',
    direction: 'to-t',
    colors: [`${COLORS.RED_PRIMARY}CC`, 'transparent'], // 80% d'opacité
    usage: ['Overlays d\'images', 'Effets de superposition'],
    tailwindClass: 'bg-gradient-to-t from-red-600/80 to-transparent',
    cssClass: 'gradient-special-transparent-red'
  },
  {
    name: 'Radial-Rouge',
    direction: 'radial',
    colors: [COLORS.RED_PRIMARY, 'transparent'],
    usage: ['Effets de focus', 'Points d\'accent'],
    tailwindClass: 'bg-gradient-radial from-red-600 to-transparent',
    cssClass: 'gradient-special-radial-red'
  }
];

// Tous les dégradés
export const ALL_GRADIENTS = [
  ...PRIMARY_GRADIENTS,
  ...SECONDARY_GRADIENTS,
  ...SPECIAL_GRADIENTS
];

// Fonction utilitaire pour obtenir un dégradé par nom
export function getGradientByName(name: string): Gradient | undefined {
  return ALL_GRADIENTS.find(gradient => gradient.name === name);
}

// Fonction utilitaire pour obtenir un dégradé par usage
export function getGradientsByUsage(usage: string): Gradient[] {
  return ALL_GRADIENTS.filter(gradient => 
    gradient.usage.some(u => u.toLowerCase().includes(usage.toLowerCase()))
  );
}

// Fonction utilitaire pour obtenir la classe Tailwind d'un dégradé
export function getTailwindClass(name: string): string {
  const gradient = getGradientByName(name);
  return gradient?.tailwindClass || '';
}

// Fonction utilitaire pour obtenir la classe CSS personnalisée d'un dégradé
export function getCssClass(name: string): string {
  const gradient = getGradientByName(name);
  return gradient?.cssClass || '';
}

// Fonction utilitaire pour valider les couleurs d'un dégradé
export function validateGradientColors(colors: string[]): boolean {
  return colors.every(color => 
    Object.values(COLORS).includes(color) || 
    color === 'transparent' ||
    /^#[0-9A-F]{6}$/i.test(color) ||
    /^#[0-9A-F]{8}$/i.test(color)
  );
}

// Export des constantes pour utilisation directe
export const GRADIENT_CLASSES = {
  PRIMARY_RED_BLUE: 'bg-gradient-to-r from-red-600 to-blue-700',
  PRIMARY_RED_GREEN: 'bg-gradient-to-br from-red-600 to-green-600',
  PRIMARY_BLUE_GRAY: 'bg-gradient-to-b from-blue-700 to-gray-500',
  SECONDARY_RED_ORANGE: 'bg-gradient-to-r from-red-600 to-orange-500',
  SECONDARY_BLUE_GREEN: 'bg-gradient-to-br from-blue-700 to-green-600',
  SECONDARY_GRAY_WHITE: 'bg-gradient-to-b from-gray-100 to-white',
  SPECIAL_TRANSPARENT_RED: 'bg-gradient-to-t from-red-600/80 to-transparent',
  SPECIAL_RADIAL_RED: 'bg-gradient-radial from-red-600 to-transparent'
} as const;

// Types pour les composants utilisant des dégradés
export type GradientComponent = 
  | 'HeroSection'
  | 'ServicesSection'
  | 'AboutSection'
  | 'ContactSection'
  | 'Footer'
  | 'Button'
  | 'Card'
  | 'Badge';

// Mapping des composants vers leurs dégradés recommandés
export const COMPONENT_GRADIENTS: Record<GradientComponent, string> = {
  HeroSection: GRADIENT_CLASSES.PRIMARY_RED_BLUE,
  ServicesSection: GRADIENT_CLASSES.PRIMARY_RED_GREEN,
  AboutSection: GRADIENT_CLASSES.PRIMARY_BLUE_GRAY,
  ContactSection: GRADIENT_CLASSES.PRIMARY_RED_BLUE,
  Footer: GRADIENT_CLASSES.SECONDARY_GRAY_WHITE,
  Button: GRADIENT_CLASSES.PRIMARY_RED_BLUE,
  Card: GRADIENT_CLASSES.PRIMARY_RED_GREEN,
  Badge: GRADIENT_CLASSES.PRIMARY_RED_GREEN
};

// Fonction utilitaire pour obtenir le dégradé recommandé d'un composant
export function getComponentGradient(component: GradientComponent): string {
  return COMPONENT_GRADIENTS[component] || '';
}

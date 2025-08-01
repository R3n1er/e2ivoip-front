// Configuration des breakpoints pour MacBook Pro
export const MACBOOK_BREAKPOINTS = {
  // MacBook Pro 13" - 1280px
  macbook13: "1280px",
  // MacBook Pro 14" - 1440px  
  macbook14: "1440px",
  // MacBook Pro 15" - 1680px
  macbook15: "1680px",
} as const

// Classes utilitaires pour MacBook Pro
export const MACBOOK_CLASSES = {
  // Header height optimisé
  headerHeight: {
    mobile: "h-16",
    macbook13: "lg:h-18",
    macbook14: "xl:h-20", 
    macbook15: "2xl:h-22"
  },
  
  // Logo size adaptatif
  logoSize: {
    mobile: "text-xl",
    macbook13: "lg:text-2xl",
    macbook14: "xl:text-3xl",
    macbook15: "2xl:text-4xl"
  },
  
  // Navigation spacing
  navSpacing: {
    mobile: "space-x-4",
    macbook13: "lg:space-x-6", 
    macbook14: "xl:space-x-8",
    macbook15: "2xl:space-x-10"
  },
  
  // Container max-width
  containerMaxWidth: {
    mobile: "max-w-6xl",
    macbook13: "lg:max-w-7xl",
    macbook14: "xl:max-w-8xl", 
    macbook15: "2xl:max-w-9xl"
  }
} as const

// Hook pour détecter la taille d'écran MacBook Pro
export function useMacBookBreakpoint() {
  if (typeof window === 'undefined') return 'mobile'
  
  const width = window.innerWidth
  
  if (width >= 1680) return 'macbook15'
  if (width >= 1440) return 'macbook14' 
  if (width >= 1280) return 'macbook13'
  
  return 'mobile'
}

// Fonction pour obtenir les classes CSS selon le breakpoint
export function getMacBookClasses(breakpoint: keyof typeof MACBOOK_CLASSES) {
  return MACBOOK_CLASSES[breakpoint]
} 
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  badge?: {
    text: string;
    icon?: string;
  };
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  badge,
  variant = "primary",
  className = ""
}: FeatureCardProps) {
  // Définition des couleurs selon la charte graphique E2I VoIP
  const variantStyles = {
    primary: {
      border: "from-red-primary via-red-500 to-orange-500",
      iconBg: "from-red-100 via-red-50 to-white",
      iconColor: "text-red-primary",
      glowBg: "from-red-400 to-red-500",
      badgeBg: "bg-red-50 text-red-primary",
      patternColor: "%23E53E3E"
    },
    secondary: {
      border: "from-gray-800 via-gray-600 to-gray-500",
      iconBg: "from-gray-100 via-gray-50 to-white",
      iconColor: "text-gray-800",
      glowBg: "from-gray-400 to-gray-500",
      badgeBg: "bg-gray-100 text-gray-800",
      patternColor: "%232D3848"
    },
    accent: {
      border: "from-gray-800 via-red-primary to-gray-500",
      iconBg: "from-red-50 via-gray-50 to-white",
      iconColor: "text-red-primary",
      glowBg: "from-red-400 to-gray-500",
      badgeBg: "bg-red-50 text-red-primary",
      patternColor: "%232D3848"
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={`
      bg-white rounded-2xl 
      shadow-lg hover:shadow-xl 
      transform hover:-translate-y-1 
      transition-all duration-300 group
      border border-gray-200
      ${className}
    `}>
      {/* Gradient border top - Couleurs de la charte graphique */}
      <div className={`h-1.5 bg-gradient-to-r ${styles.border} rounded-t-2xl`}></div>
      
      <div className="p-6">
        {/* Icon avec style simplifié */}
        <div className="mb-4">
          <div className={`w-16 h-16 ${styles.iconBg} rounded-xl flex items-center justify-center shadow-sm mx-auto group-hover:shadow-md transition-shadow border border-gray-100`}>
            <i className={`lni ${icon} text-3xl ${styles.iconColor}`}></i>
          </div>
        </div>
        
        {/* Titre avec hover rouge principal */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
          {title}
        </h3>
        
        {/* Description avec couleur gris secondaire */}
        <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Badge en bas (optionnel) */}
        {badge && (
          <div className="text-center">
            <span className={`inline-flex items-center px-3 py-1 ${styles.badgeBg} text-xs font-semibold rounded-full`}>
              {badge.icon && <i className={`lni ${badge.icon} mr-1`}></i>}
              {badge.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Variante simplifiée pour les cas où on a besoin d'encore plus de customisation
export function FeatureCardCustom({ 
  children,
  borderGradient = "from-gray-800 via-gray-500 to-red-primary",
  className = ""
}: {
  children: ReactNode;
  borderGradient?: string;
  className?: string;
}) {
  return (
    <div className={`
      bg-white rounded-2xl 
      shadow-lg hover:shadow-xl 
      transform hover:-translate-y-1 
      transition-all duration-300 group
      border border-gray-200
      ${className}
    `}>
      {/* Gradient border top personnalisable */}
      <div className={`h-1.5 bg-gradient-to-r ${borderGradient} rounded-t-2xl`}></div>
      
      {/* Contenu personnalisé */}
      <div>
        {children}
      </div>
    </div>
  );
}
"use client";

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
      relative overflow-hidden bg-white rounded-2xl 
      shadow-xl hover:shadow-2xl 
      transform hover:-translate-y-1 
      transition-all duration-300 group
      ${className}
    `}>
      {/* Gradient border top - Couleurs de la charte graphique */}
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${styles.border}`}></div>
      
      {/* Background pattern subtil avec couleurs officielles */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${styles.patternColor}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="relative p-6">
        {/* Icon avec style amélioré selon la charte */}
        <div className="relative mb-4">
          <div className={`absolute inset-0 bg-gradient-to-br ${styles.glowBg} rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
          <div className={`relative w-16 h-16 bg-gradient-to-br ${styles.iconBg} rounded-xl flex items-center justify-center shadow-lg mx-auto group-hover:shadow-xl transition-shadow`}>
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
  patternColor = "%232D3848",
  className = ""
}: {
  children: ReactNode;
  borderGradient?: string;
  patternColor?: string;
  className?: string;
}) {
  return (
    <div className={`
      relative overflow-hidden bg-white rounded-2xl 
      shadow-xl hover:shadow-2xl 
      transform hover:-translate-y-1 
      transition-all duration-300 group
      ${className}
    `}>
      {/* Gradient border top personnalisable */}
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${borderGradient}`}></div>
      
      {/* Background pattern personnalisable */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${patternColor}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      {/* Contenu personnalisé */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
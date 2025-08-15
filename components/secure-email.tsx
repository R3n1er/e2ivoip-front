"use client";

import { useState } from "react";

/**
 * Composant pour sécuriser une adresse email contre le spam
 * L'email est encodé par défaut et décodé au survol
 */
export function SecureEmail({ email }: { email: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Version simplifiée sans dangerouslySetInnerHTML
  const displayEmail = isHovered ? email : email.replace(/./g, '•');
  
  return (
    <span
      className="cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Copier l'email dans le presse-papiers
        navigator.clipboard.writeText(email);
      }}
      title="Cliquez pour copier l'email"
    >
      {displayEmail}
    </span>
  );
}

/**
 * Version simplifiée pour les liens mailto sécurisés
 */
export function SecureMailtoLink({ email, children }: { email: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <span
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="cursor-pointer"
    >
      {isVisible ? (
        <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800 underline">
          {children}
        </a>
      ) : (
        <span className="text-gray-600 select-none">
          {email.replace(/./g, '•')}
        </span>
      )}
    </span>
  );
}

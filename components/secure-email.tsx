"use client";

import { useState } from "react";

/**
 * Composant pour sécuriser une adresse email contre le spam
 * L'email est encodé par défaut et décodé au survol
 */
export function SecureEmail({ email }: { email: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Encoder l'email pour éviter la détection par les bots
  const encodedEmail = email
    .split('')
    .map(char => `&#${char.charCodeAt(0)};`)
    .join('');
  
  // Décoder l'email au survol
  const decodedEmail = email.replace(/[&#;]/g, '');
  
  return (
    <span
      className="cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Copier l'email dans le presse-papiers
        navigator.clipboard.writeText(decodedEmail);
      }}
      title="Cliquez pour copier l'email"
      dangerouslySetInnerHTML={{ __html: isHovered ? decodedEmail : encodedEmail }}
    />
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

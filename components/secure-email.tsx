"use client";

import { useState } from "react";

/**
 * Composant pour sécuriser une adresse email contre le spam
 * L'email est encodé par défaut et décodé au survol
 */
export function SecureEmail({ email }: { email: string }) {
  return (
    <a
      href="/contact"
      className="cursor-pointer select-none hover:text-red-600 transition-colors duration-200"
      title="Cliquez pour aller à la page de contact"
    >
      {email.replace(/./g, '•')}
    </a>
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

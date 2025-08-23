'use client';

import { useEffect } from 'react';

export function HubSpotSimple() {
  useEffect(() => {
    // Créer et injecter le script HubSpot
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    
    // Créer le script d'initialisation
    const initScript = document.createElement('script');
    initScript.textContent = `
      hbspt.forms.create({
        portalId: "26878201",
        formId: "312a9f67-e613-4651-9690-4586646554a0",
        region: "eu1"
      });
    `;
    
    // Ajouter les scripts au head
    document.head.appendChild(script);
    
    // Attendre que le script soit chargé puis ajouter l'initialisation
    script.onload = () => {
      document.head.appendChild(initScript);
    };
    
    // Nettoyage lors du démontage
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(initScript)) {
        document.head.removeChild(initScript);
      }
    };
  }, []);

  return (
    <div id="hubspot-form-simple">
      <div className="text-center text-gray-500 py-4">
        Chargement du formulaire HubSpot...
      </div>
    </div>
  );
}
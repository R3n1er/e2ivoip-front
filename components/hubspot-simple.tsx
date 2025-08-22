'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    hbspt: any;
  }
}

export function HubSpotSimple() {
  const formRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Éviter de charger plusieurs fois
    if (scriptLoaded.current) return;
    
    const loadHubSpotForm = () => {
      // Vérifier si le script existe déjà
      const existingScript = document.querySelector('script[src*="hsforms.net"]');
      if (existingScript) {
        // Si le script existe, attendre qu'il soit chargé
        if (window.hbspt && window.hbspt.forms) {
          window.hbspt.forms.create({
            portalId: "26878201",
            formId: "312a9f67-e613-4651-9690-4586646554a0",
            region: "eu1",
            target: "#hubspot-form-simple",
          });
        }
        return;
      }

      // Créer le script s'il n'existe pas
      const script = document.createElement('script');
      script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js';
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      
      script.addEventListener('load', () => {
        // Attendre que window.hbspt soit disponible
        const waitForHubSpot = setInterval(() => {
          if (window.hbspt && window.hbspt.forms && formRef.current) {
            window.hbspt.forms.create({
              portalId: "26878201",
              formId: "312a9f67-e613-4651-9690-4586646554a0",
              region: "eu1",
              target: "#hubspot-form-simple",
            });
            clearInterval(waitForHubSpot);
          }
        }, 100);
        
        // Timeout après 10 secondes
        setTimeout(() => clearInterval(waitForHubSpot), 10000);
      });

      document.head.appendChild(script);
      scriptLoaded.current = true;
    };

    // Charger le formulaire après un court délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(loadHubSpotForm, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={formRef} id="hubspot-form-simple">
      <div className="text-center text-gray-500 py-4">
        Chargement du formulaire...
      </div>
    </div>
  );
}
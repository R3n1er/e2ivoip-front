'use client';

import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HubSpotScript() {
  const [debugInfo, setDebugInfo] = useState<string>('Initialisation...');

  useEffect(() => {
    // Fonction pour créer le formulaire HubSpot
    const createForm = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hbspt = (window as any).hbspt;
        if (hbspt && hbspt.forms && document.getElementById('hubspot-form-container')) {
          hbspt.forms.create({
            portalId: "26878201",
            formId: "312a9f67-e613-4651-9690-4586646554a0",
            region: "eu1",
            target: "#hubspot-form-container"
          });
          setDebugInfo('✅ Formulaire HubSpot créé avec succès');
          console.log('✅ Formulaire HubSpot créé avec succès');
        } else {
          setDebugInfo('⏳ Attente du script HubSpot...');
        }
      } catch (error) {
        setDebugInfo(`❌ Erreur: ${error}`);
        console.error('❌ Erreur:', error);
      }
    };

    // Vérifier si HubSpot est déjà chargé
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hbspt = (window as any).hbspt;
    if (hbspt && hbspt.forms) {
      setDebugInfo('HubSpot déjà disponible, création du formulaire...');
      createForm();
      return;
    }

    // Charger le script HubSpot
    setDebugInfo('Chargement du script HubSpot...');
    
    const script = document.createElement('script');
    script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js';
    script.async = true;
    
    script.onload = () => {
      setDebugInfo('Script chargé, attente initialisation...');
      
      // Attendre que HubSpot soit initialisé
      const checkHubSpot = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hbspt = (window as any).hbspt;
        if (hbspt && hbspt.forms) {
          setDebugInfo('HubSpot initialisé, création du formulaire...');
          createForm();
        } else {
          setTimeout(checkHubSpot, 100);
        }
      };
      
      checkHubSpot();
    };
    
    script.onerror = () => {
      setDebugInfo('❌ Erreur chargement script');
    };
    
    document.head.appendChild(script);
    
    // Vérifier périodiquement si le formulaire peut être créé
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hbspt = (window as any).hbspt;
      if (hbspt && hbspt.forms && document.getElementById('hubspot-form-container')) {
        createForm();
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Debug info */}
      <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
        <strong>Debug HubSpot:</strong> {debugInfo}
      </div>
      
      {/* Fallback si le formulaire ne se charge pas */}
      {debugInfo.includes('❌') && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Le formulaire de contact ne peut pas être affiché pour le moment.
          </p>
          <a
            href="mailto:contact@e2ivoip.fr"
            className="inline-flex items-center px-6 py-3 bg-red-primary text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Nous contacter par email
          </a>
        </div>
      )}
    </>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    hbspt: any;
  }
}

export function HubSpotScript() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('Initialisation...');

  useEffect(() => {
    const checkHubSpot = () => {
      setDebugInfo('Vérification de HubSpot...');
      
      if (typeof window !== 'undefined') {
        setDebugInfo('Window disponible');
        
        if (window.hbspt) {
          setDebugInfo('HubSpot script chargé');
          setIsLoaded(true);
          
          // Vérifier si le conteneur existe
          const container = document.getElementById('hubspot-form-container');
          if (container) {
            setDebugInfo('Conteneur trouvé, création du formulaire...');
            
            try {
              window.hbspt.forms.create({
                portalId: "26878201",
                formId: "312a9f67-e613-4651-9690-4586646554a0",
                region: "eu1",
                target: "#hubspot-form-container"
              });
              setDebugInfo('✅ Formulaire HubSpot créé avec succès');
              console.log('✅ Formulaire HubSpot créé avec succès');
            } catch (error) {
              setDebugInfo(`❌ Erreur création: ${error}`);
              console.error('❌ Erreur lors de la création du formulaire:', error);
              setHasError(true);
            }
          } else {
            setDebugInfo('❌ Conteneur non trouvé');
            setHasError(true);
          }
        } else {
          setDebugInfo('❌ HubSpot script non chargé');
          setHasError(true);
        }
      } else {
        setDebugInfo('❌ Window non disponible');
        setHasError(true);
      }
    };

    // Attendre que le script se charge
    const timer = setTimeout(checkHubSpot, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleScriptLoad = () => {
    setDebugInfo('Script HubSpot chargé, attente initialisation...');
    console.log('✅ Script HubSpot chargé');
    
    // Attendre un peu que le script soit complètement initialisé
    setTimeout(() => {
      if (window.hbspt) {
        setDebugInfo('HubSpot initialisé, création du formulaire...');
        const container = document.getElementById('hubspot-form-container');
        if (container) {
          try {
            window.hbspt.forms.create({
              portalId: "26878201",
              formId: "312a9f67-e613-4651-9690-4586646554a0",
              region: "eu1",
              target: "#hubspot-form-container"
            });
            setDebugInfo('✅ Formulaire créé après chargement du script');
            setIsLoaded(true);
          } catch (error) {
            setDebugInfo(`❌ Erreur après chargement: ${error}`);
            setHasError(true);
          }
        }
      }
    }, 1000);
  };

  const handleScriptError = () => {
    setDebugInfo('❌ Erreur chargement script HubSpot');
    console.error('❌ Erreur lors du chargement du script HubSpot');
    setHasError(true);
  };

  return (
    <>
      <Script
        id="hs-script-loader"
        src="https://js-eu1.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      {/* Debug info */}
      <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
        <strong>Debug HubSpot:</strong> {debugInfo}
      </div>
      
      {/* Fallback si le formulaire ne se charge pas */}
      {hasError && (
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
"use client";

import { useEffect, useRef, useState } from "react";

interface HubspotFormInlineProps {
  className?: string;
}

export default function HubspotFormInline({ className = "" }: HubspotFormInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let scriptLoaded = false;
    
    const loadHubspotScript = async () => {
      try {
        // Vérifier si le script HubSpot Forms est déjà chargé
        if (!(window as any).hbspt) {
          const script = document.createElement("script");
          script.src = "https://js-eu1.hsforms.net/forms/embed/v2.js";
          script.charset = "utf-8";
          script.type = "text/javascript";
          script.async = true;
          
          const scriptPromise = new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
          
          document.head.appendChild(script);
          await scriptPromise;
        }

        // Créer le formulaire HubSpot
        if ((window as any).hbspt && containerRef.current && !scriptLoaded) {
          scriptLoaded = true;
          
          // Nettoyer le conteneur
          containerRef.current.innerHTML = '';
          
          (window as any).hbspt.forms.create({
            portalId: "26878201",
            formId: "312a9f67-e613-4651-9690-4586646554a0",
            region: "eu1",
            target: containerRef.current,
            onFormReady: () => {
              setIsLoading(false);
            },
            onFormSubmitted: () => {
              console.log("Formulaire HubSpot soumis avec succès");
            }
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement du formulaire HubSpot:", error);
        setIsLoading(false);
      }
    };

    loadHubspotScript();

    return () => {
      scriptLoaded = false;
    };
  }, []);

  return (
    <div className={className}>
      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du formulaire...</p>
          </div>
        </div>
      )}
      <div
        id="hubspot-form-container"
        ref={containerRef}
        className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}
        data-testid="hubspot-form-inline"
      />
    </div>
  );
}

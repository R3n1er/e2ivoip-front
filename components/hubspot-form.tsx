"use client";

import { useEffect, useRef } from "react";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  className?: string;
}

export function HubSpotForm({ 
  portalId, 
  formId, 
  region = "eu1",
  className = ""
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Vérifier si le script HubSpot est déjà chargé
    if (window.hbspt && window.hbspt.forms) {
      createForm();
      return;
    }

    // Charger le script HubSpot s'il n'est pas déjà chargé
    if (!scriptLoadedRef.current) {
      const script = document.createElement("script");
      script.src = `//js-${region}.hsforms.net/forms/embed/v2.js`;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.async = true;
      
      script.onload = () => {
        scriptLoadedRef.current = true;
        createForm();
      };

      document.head.appendChild(script);
    }

    function createForm() {
      if (window.hbspt && window.hbspt.forms && formRef.current) {
        // Nettoyer le contenu existant
        formRef.current.innerHTML = "";
        
        // Créer le formulaire
        window.hbspt.forms.create({
          portalId: portalId,
          formId: formId,
          region: region,
          target: formRef.current,
        });
      }
    }

    // Cleanup function
    return () => {
      if (formRef.current) {
        formRef.current.innerHTML = "";
      }
    };
  }, [portalId, formId, region]);

  return (
    <div 
      ref={formRef} 
      className={className}
      data-testid="hubspot-form-container"
    />
  );
}

// Déclaration TypeScript pour window.hbspt
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target?: HTMLElement;
        }) => void;
      };
    };
  }
}
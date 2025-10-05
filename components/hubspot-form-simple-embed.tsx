"use client";

/**
 * Composant HubSpot Form - Version Ultra-Simple et Fiable
 *
 * Utilise uniquement le script embed officiel de HubSpot.
 * AUCUNE clé API nécessaire - juste Portal ID + Form ID
 *
 * @see https://developers.hubspot.com/docs/cms/building-blocks/forms
 */

import { useEffect, useRef } from "react";

interface HubSpotFormSimpleProps {
  /**
   * Form ID HubSpot (UUID)
   * @default "312a9f67-e613-4651-9690-4586646554a0" (Contact général)
   */
  formId?: string;

  /**
   * Portal ID HubSpot
   * @default "26878201"
   */
  portalId?: string;

  /**
   * Région du serveur HubSpot
   * @default "eu1" (Europe)
   */
  region?: string;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export function HubSpotFormSimpleEmbed({
  formId = "312a9f67-e613-4651-9690-4586646554a0",
  portalId = "26878201",
  region = "eu1",
  className = "",
}: HubSpotFormSimpleProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formLoadedRef = useRef(false);

  useEffect(() => {
    // Éviter de charger le formulaire plusieurs fois
    if (formLoadedRef.current) {
      return;
    }

    // Fonction pour charger le formulaire
    const loadForm = () => {
      const win = window as any;
      if (win.hbspt && formContainerRef.current) {
        try {
          win.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#${formContainerRef.current.id}`,
          });
          formLoadedRef.current = true;
        } catch (error) {
          console.error("Erreur lors du chargement du formulaire HubSpot:", error);
        }
      }
    };

    // Charger le script HubSpot si pas déjà chargé
    const win = window as any;
    if (!win.hbspt) {
      const script = document.createElement("script");
      script.src = `https://js-${region}.hsforms.net/forms/embed/v2.js`;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        loadForm();
      };

      script.onerror = () => {
        console.error("Impossible de charger le script HubSpot");
      };

      document.body.appendChild(script);
    } else {
      // Script déjà chargé, créer le formulaire directement
      loadForm();
    }

    // Cleanup function
    return () => {
      // Le formulaire sera automatiquement nettoyé par React lors du démontage
    };
  }, [formId, portalId, region]);

  return (
    <div className={className}>
      {/* Loader pendant le chargement */}
      <div
        id={`hubspot-form-${formId}`}
        ref={formContainerRef}
        className="min-h-[400px]"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du formulaire...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export par défaut
export default HubSpotFormSimpleEmbed;

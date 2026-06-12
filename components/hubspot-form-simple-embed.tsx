"use client";

/**
 * Composant HubSpot Form - Version Ultra-Simple et Fiable
 *
 * Utilise uniquement le script embed officiel de HubSpot.
 * AUCUNE clé API nécessaire - juste Portal ID + Form ID
 *
 * @see https://developers.hubspot.com/docs/cms/building-blocks/forms
 */

import { useEffect, useRef, useState } from "react";
import { FormSkeleton } from "@/components/ui/form-skeleton";

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
  const [isScriptReady, setIsScriptReady] = useState<boolean>(
    typeof window !== "undefined" && !!window.hbspt?.forms
  );

  useEffect(() => {
    // Éviter de charger le formulaire plusieurs fois
    if (formLoadedRef.current) {
      return;
    }

    // Fonction pour charger le formulaire
    const loadForm = () => {
      if (!formContainerRef.current) {
        return;
      }

      const hubspot = window.hbspt;
      if (hubspot?.forms) {
        try {
          hubspot.forms.create({
            region,
            portalId,
            formId,
            target: formContainerRef.current,
          });
          formLoadedRef.current = true;
        } catch (error) {
          console.error(
            "Erreur lors du chargement du formulaire HubSpot:",
            error
          );
        }
      }
    };

    // Charger le script HubSpot si pas déjà chargé
    if (!window.hbspt?.forms) {
      const script = document.createElement("script");
      script.src = `//js-${region}.hsforms.net/forms/embed/v2.js`;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        setIsScriptReady(true);
        loadForm();
      };

      script.onerror = () => {
        console.error("Impossible de charger le script HubSpot");
      };

      // Les tests attendent une injection via appendChild observable
      (document.head || document.body).appendChild(script);
    } else {
      // Script déjà chargé, créer le formulaire directement
      setIsScriptReady(true);
      loadForm();
    }

    // Cleanup function
    return () => {
      // Le formulaire sera automatiquement nettoyé par React lors du démontage
    };
  }, [formId, portalId, region]);

  return (
    <div className={className}>
      {/* Conteneur du formulaire (vide au départ). Skeleton calqué sur le layout tant que le script n'est pas prêt. */}
      {!isScriptReady && <FormSkeleton rows={1} height={120} />}
      <div
        id={`hubspot-form-${formId}`}
        ref={formContainerRef}
        className="min-h-[120px]"
      />
    </div>
  );
}

// Export par défaut
export default HubSpotFormSimpleEmbed;

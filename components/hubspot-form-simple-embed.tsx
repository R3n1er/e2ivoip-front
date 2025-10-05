"use client";

/**
 * Composant HubSpot Form - Version Ultra-Simple et Fiable
 *
 * Utilise uniquement le script embed officiel de HubSpot.
 * AUCUNE clé API nécessaire - juste Portal ID + Form ID
 *
 * @see https://developers.hubspot.com/docs/cms/building-blocks/forms
 */

import { useEffect, useMemo, useRef } from "react";

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

/**
 * Déclarer le type global pour HubSpot
 */
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

export function HubSpotFormSimpleEmbed({
  formId = "312a9f67-e613-4651-9690-4586646554a0",
  portalId = "26878201",
  region = "eu1",
  className = "",
}: HubSpotFormSimpleProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formLoadedRef = useRef(false);
  const containerId = useMemo(
    () => `hubspot-form-${formId}`,
    [formId]
  );

  useEffect(() => {
    const container = formContainerRef.current;

    if (!container) {
      return;
    }

    formLoadedRef.current = false;
    container.innerHTML = "";

    const createForm = () => {
      if (!container) {
        return;
      }

      const hubspot = window.hbspt;
      const formsApi = hubspot?.forms;

      if (!formsApi?.create) {
        return;
      }

      if (formLoadedRef.current) {
        return;
      }

      try {
        formsApi.create({
          region,
          portalId,
          formId,
          target: `#${containerId}`,
        });
        formLoadedRef.current = true;
      } catch (error) {
        console.error("Erreur lors du chargement du formulaire HubSpot:", error);
      }
    };

    if (window.hbspt?.forms?.create) {
      createForm();
      return;
    }

    const scriptSrc = `//js-${region}.hsforms.net/forms/embed/v2.js`;
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptSrc}"]`
    );

    const handleLoad = () => {
      script?.setAttribute("data-hubspot-loaded", "true");
      createForm();
    };

    const handleError = (event: Event) => {
      console.error("Impossible de charger le script HubSpot Forms", event);
    };

    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-hubspot-loader", region);
      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);

      if (script.getAttribute("data-hubspot-loaded") === "true") {
        createForm();
      }
    }

    return () => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
    };
  }, [containerId, formId, portalId, region]);

  return (
    <div className={className}>
      <div id={containerId} ref={formContainerRef} />
    </div>
  );
}

// Export par défaut
export default HubSpotFormSimpleEmbed;

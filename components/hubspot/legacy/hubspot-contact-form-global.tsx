"use client";

import { useEffect } from "react";

interface HubSpotContactFormGlobalProps {
  portalId: string;
  formId: string;
  region?: string;
  className?: string;
}

export function HubSpotContactFormGlobal({
  portalId,
  formId,
  region = "eu1",
  className = "",
}: HubSpotContactFormGlobalProps) {
  useEffect(() => {
    // Charger le script HubSpot s'il n'est pas déjà chargé
    if (!window.hbspt) {
      const script = document.createElement("script");
      script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.type = "text/javascript";
      document.head.appendChild(script);

      script.onload = () => {
        createForm();
      };
    } else {
      createForm();
    }

    function createForm() {
      if (window.hbspt && (window.hbspt as any).forms) {
        (window.hbspt as any).forms.create({
          portalId: portalId,
          formId: formId,
          region: region,
          target: "#hubspot-form-container",
        });
      }
    }
  }, [portalId, formId, region]);

  return (
    <div className={`hubspot-contact-form ${className}`}>
      <div id="hubspot-form-container" className="w-full"></div>
    </div>
  );
}

 
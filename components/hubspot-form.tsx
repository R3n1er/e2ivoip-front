'use client';

import Script from 'next/script';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
}

declare global {
  interface Window {
    hbspt: any;
  }
}

export function HubSpotForm({ 
  portalId, 
  formId, 
  region = "eu1"
}: HubSpotFormProps) {
  
  const handleScriptLoad = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: portalId,
        formId: formId,
        region: region,
        target: "#hubspot-form"
      });
    }
  };

  return (
    <>
      <Script
        id="hs-script-loader"
        src="https://js-eu1.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div id="hubspot-form" />
    </>
  );
}
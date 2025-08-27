"use client";

import { useEffect, useRef } from "react";

const HUBSPOT_INLINE_HTML = `
  <script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/embed/v2.js"></script>
  <script>
    hbspt.forms.create({
      portalId: "26878201",
      formId: "312a9f67-e613-4651-9690-4586646554a0",
      region: "eu1"
    });
  </script>
`;

interface HubspotFormInlineProps {
  className?: string;
}

export function HubspotFormInline({ className = "" }: HubspotFormInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scripts = Array.from(container.querySelectorAll("script"));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, []);

  return (
    <div
      id="hubspot-form-container"
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: HUBSPOT_INLINE_HTML }}
      data-testid="hubspot-form-inline"
    />
  );
}

export default HubspotFormInline;

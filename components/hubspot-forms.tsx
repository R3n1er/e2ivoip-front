"use client";

import { useEffect, useRef } from "react";
import { useHubSpot } from "./hubspot-tracking";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  onFormSubmitted?: (data: any) => void;
  className?: string;
}

export function HubSpotForm({
  portalId,
  formId,
  region = "eu1",
  onFormSubmitted,
  className = "",
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useHubSpot();

  useEffect(() => {
    if (window.hbspt && formRef.current) {
      // Supprimer le formulaire existant s'il y en a un
      const existingForm = formRef.current.querySelector(".hs-form");
      if (existingForm) {
        existingForm.remove();
      }

      // Créer le formulaire HubSpot
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: formRef.current,
        onFormSubmitted: (form: any) => {
          // Tracking de l'événement de soumission
          trackEvent("form_submitted", {
            form_id: formId,
            form_type: "hubspot_form",
            portal_id: portalId,
          });

          // Callback personnalisé
          if (onFormSubmitted) {
            onFormSubmitted(form);
          }
        },
        onFormReady: (form: any) => {
          // Tracking de l'affichage du formulaire
          trackEvent("form_displayed", {
            form_id: formId,
            form_type: "hubspot_form",
            portal_id: portalId,
          });
        },
      });
    }
  }, [portalId, formId, region, onFormSubmitted, trackEvent]);

  return (
    <div
      ref={formRef}
      className={`hubspot-form ${className}`}
      data-portal-id={portalId}
      data-form-id={formId}
    />
  );
}

// Composants spécialisés pour chaque type de devis
export function TrunkSIPForm() {
  const { trackEvent } = useHubSpot();

  const handleFormSubmitted = (data: any) => {
    trackEvent("devis_trunk_sip_submitted", {
      form_type: "trunk_sip",
      lead_source: "website",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Devis Trunk SIP</h3>
      <p className="text-gray-600 mb-6">
        Recevez un devis personnalisé pour vos besoins en connectivité SIP
      </p>
      <HubSpotForm
        portalId="26878201"
        formId="trunk-sip-form" // À remplacer par l'ID réel du formulaire HubSpot
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  );
}

export function PortabiliteForm() {
  const { trackEvent } = useHubSpot();

  const handleFormSubmitted = (data: any) => {
    trackEvent("devis_portabilite_submitted", {
      form_type: "portabilite",
      lead_source: "website",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Devis Portabilité
      </h3>
      <p className="text-gray-600 mb-6">
        Conservez vos numéros existants avec notre service de portabilité
      </p>
      <HubSpotForm
        portalId="26878201"
        formId="portabilite-form" // À remplacer par l'ID réel du formulaire HubSpot
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  );
}

export function VoIP3CXForm() {
  const { trackEvent } = useHubSpot();

  const handleFormSubmitted = (data: any) => {
    trackEvent("devis_voip_3cx_submitted", {
      form_type: "voip_3cx",
      lead_source: "website",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Devis VoIP 3CX</h3>
      <p className="text-gray-600 mb-6">
        Solutions 3CX dédiées ou mutualisées adaptées à vos besoins
      </p>
      <HubSpotForm
        portalId="26878201"
        formId="voip-3cx-form" // À remplacer par l'ID réel du formulaire HubSpot
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  );
}

export function ProjetPBXForm() {
  const { trackEvent } = useHubSpot();

  const handleFormSubmitted = (data: any) => {
    trackEvent("devis_projet_pbx_submitted", {
      form_type: "projet_pbx",
      lead_source: "website",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Devis Projet PBX</h3>
      <p className="text-gray-600 mb-6">
        Solutions Yeastar et intégrations sur mesure pour votre projet
      </p>
      <HubSpotForm
        portalId="26878201"
        formId="projet-pbx-form" // À remplacer par l'ID réel du formulaire HubSpot
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  );
}

export function ContactForm() {
  const { trackEvent } = useHubSpot();

  const handleFormSubmitted = (data: any) => {
    trackEvent("contact_form_submitted", {
      form_type: "contact",
      lead_source: "website",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Contactez-nous</h3>
      <p className="text-gray-600 mb-6">
        Notre équipe d'experts est là pour vous accompagner
      </p>
      <HubSpotForm
        portalId="26878201"
        formId="contact-form" // À remplacer par l'ID réel du formulaire HubSpot
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  );
}

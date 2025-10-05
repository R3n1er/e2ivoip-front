"use client";

import { useEffect, useRef } from "react";
import { useHubSpot } from "./hubspot-tracking";
// Simple toast implementation
const useToast = () => ({
  toast: {
    error: (message: string) => console.error("Toast Error:", message),
    success: (message: string) => console.log("Toast Success:", message)
  }
});
import { validateEmail, validatePhone } from "@/lib/utils";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  onFormSubmitted?: (data: any) => void;
  className?: string;
  validation?: {
    email?: boolean;
    phone?: boolean;
    company?: boolean;
    message?: boolean;
  };
}

export function HubSpotForm({
  portalId,
  formId,
  region = "eu1",
  onFormSubmitted,
  className = "",
  validation = { email: true, phone: true, company: true, message: true },
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useHubSpot();
  const { toast } = useToast();

  const validateForm = (
    form: HTMLFormElement
  ): { isValid: boolean; errors: string[] } => {
    const fields = form.querySelectorAll("input, textarea");
    let isValid = true;
    const errors: string[] = [];

    fields.forEach((field: Element) => {
      const inputField = field as HTMLInputElement | HTMLTextAreaElement;
      const name = inputField.name;
      const value = inputField.value.trim();

      if (validation[name as keyof typeof validation] && !value) {
        isValid = false;
        errors.push(`Le champ ${name} est requis`);
        inputField.classList.add("border-red-500");
      } else {
        inputField.classList.remove("border-red-500");
      }

      if (name === "email" && validation.email && !validateEmail(value)) {
        isValid = false;
        errors.push("Veuillez entrer une adresse email valide");
        inputField.classList.add("border-red-500");
      }

      if (name === "phone" && validation.phone && !validatePhone(value)) {
        isValid = false;
        errors.push("Veuillez entrer un numéro de téléphone valide");
        inputField.classList.add("border-red-500");
      }
    });

    if (!isValid) {
      toast.error(`Erreur de validation: ${errors.join(", ")}`);
    }

    return { isValid, errors };
  };

  useEffect(() => {
    if (window.hbspt && formRef.current) {
      const existingForm = formRef.current.querySelector(".hs-form");
      if (existingForm) {
        existingForm.remove();
      }

      (window.hbspt as any).forms.create({
        portalId,
        formId,
        region,
        target: formRef.current,
        onFormSubmitted: (form: HTMLFormElement) => {
          const { isValid, errors } = validateForm(form);
          if (isValid) {
            trackEvent("form_submitted", {
              form_id: formId,
              form_type: "hubspot_form",
              portal_id: portalId,
            });

            if (onFormSubmitted) {
              onFormSubmitted(form);
            }
          } else {
            trackEvent("form_validation_error", {
              form_id: formId,
              form_type: "hubspot_form",
              portal_id: portalId,
              errors: errors,
            });
          }
        },
        onFormReady: () => {
          trackEvent("form_displayed", {
            form_id: formId,
            form_type: "hubspot_form",
            portal_id: portalId,
          });
        },
      });
    }
  }, [portalId, formId, region, onFormSubmitted, trackEvent, validateForm]);

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

  const handleFormSubmitted = (_data: any) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    // eslint-disable-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-line @typescript-eslint/no-unused-vars
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
  const { toast } = useToast();

  const handleFormSubmitted = (data: any) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    trackEvent("contact_form_submitted", {
      form_type: "contact",
      lead_source: "website",
      timestamp: new Date().toISOString(),
    });

    toast.success("Merci pour votre demande. Nous vous recontacterons dans les plus brefs délais.");
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
        validation={{
          email: true,
          phone: true,
          company: true,
          message: true,
        }}
      />
    </div>
  );
}

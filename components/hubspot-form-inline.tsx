"use client";

import { useEffect, useRef } from "react";
import { create } from "zustand";

interface HubspotFormState {
  loading: boolean;
  error: string | null;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

const useHubspotFormStore = create<HubspotFormState>((set) => ({
  loading: true,
  error: null,
  setLoading: (v) => set({ loading: v }),
  setError: (e) => set({ error: e }),
}));

interface HubspotFormInlineProps {
  className?: string;
}

export default function HubspotFormInline({ className = "" }: HubspotFormInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { loading, error, setLoading, setError } = useHubspotFormStore();

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
              setLoading(false);
            },
            onFormSubmitted: () => {
              console.log("Formulaire HubSpot soumis avec succès");
            }
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement du formulaire HubSpot:", error);
        setError(error instanceof Error ? error.message : "Erreur inconnue");
        setLoading(false);
      }
    };

    loadHubspotScript();

    return () => {
      scriptLoaded = false;
    };
  }, []);

  return (
    <div className={className}>
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du formulaire...</p>
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 mb-4">
          Une erreur est survenue lors du chargement du formulaire. Veuillez réessayer plus tard.
        </div>
      )}
      <div
        id="hubspot-form-container"
        ref={containerRef}
        className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}
        data-testid="hubspot-form-inline"
      />
    </div>
  );
}

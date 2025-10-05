"use client";

/**
 * Composant universel HubSpot Form
 *
 * Remplace tous les composants HubSpot existants par une solution unifiée
 * utilisant les constantes et hooks centralisés.
 *
 * @see docs/REFACTORING.md - Phase 2
 */

import { useEffect, useRef, ReactNode, memo } from "react";
import {
  HUBSPOT_CONFIG,
  getHubSpotFormId,
  type HubSpotFormId,
} from "@/lib/constants/hubspot";
import { useHubSpotFormsScript } from "@/lib/hooks/hubspot/use-hubspot-script";

/**
 * Props du composant HubSpotForm
 */
export interface HubSpotFormProps {
  /**
   * ID du formulaire (peut être le nom de la constante ou l'ID direct)
   * @default "CONTACT_GENERAL"
   */
  formId?: HubSpotFormId | string;

  /**
   * Portal ID HubSpot (surchargeable)
   * @default HUBSPOT_CONFIG.PORTAL_ID
   */
  portalId?: string;

  /**
   * Région du serveur HubSpot
   * @default "eu1"
   */
  region?: string;

  /**
   * Callback appelé quand le formulaire est prêt
   */
  onFormReady?: (form: any) => void;

  /**
   * Callback appelé quand le formulaire est soumis
   */
  onFormSubmitted?: (data: any) => void;

  /**
   * Classes CSS personnalisées pour le conteneur
   */
  className?: string;

  /**
   * Afficher le loader pendant le chargement
   * @default true
   */
  showLoading?: boolean;

  /**
   * Composant de chargement personnalisé
   */
  loadingComponent?: ReactNode;

  /**
   * Composant d'erreur personnalisé
   */
  errorComponent?: ReactNode;

  /**
   * Message d'erreur personnalisé
   */
  errorMessage?: string;

  /**
   * ID du conteneur (pour ciblage CSS)
   */
  containerId?: string;

  /**
   * Test ID pour les tests automatisés
   */
  testId?: string;
}

/**
 * Composant de chargement par défaut
 */
function DefaultLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du formulaire...</p>
      </div>
    </div>
  );
}

/**
 * Composant d'erreur par défaut
 */
function DefaultError({ message }: { message?: string }) {
  return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 mb-4">
      <p className="font-semibold mb-1">Erreur de chargement</p>
      <p className="text-sm">
        {message ||
          "Une erreur est survenue lors du chargement du formulaire. Veuillez réessayer plus tard."}
      </p>
    </div>
  );
}

/**
 * Composant universel HubSpot Form
 *
 * Optimisé avec React.memo pour éviter les re-renders inutiles.
 * @see docs/REFACTORING.md - Phase 5
 *
 * @example Utilisation basique
 * ```tsx
 * <HubSpotForm />
 * ```
 *
 * @example Avec callback de soumission
 * ```tsx
 * <HubSpotForm
 *   onFormSubmitted={(data) => {
 *     console.log('Formulaire soumis!', data);
 *   }}
 * />
 * ```
 *
 * @example Avec loader personnalisé
 * ```tsx
 * <HubSpotForm
 *   loadingComponent={<CustomLoader />}
 *   errorComponent={<CustomError />}
 * />
 * ```
 */
export const HubSpotForm = memo(function HubSpotForm({
  formId = "CONTACT_GENERAL",
  portalId = HUBSPOT_CONFIG.PORTAL_ID,
  region = HUBSPOT_CONFIG.REGION,
  onFormReady,
  onFormSubmitted,
  className = "",
  showLoading = true,
  loadingComponent,
  errorComponent,
  errorMessage,
  containerId,
  testId = "hubspot-form",
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCreatedRef = useRef(false);
  const { loaded, loading, error } = useHubSpotFormsScript();

  // Déterminer l'ID du formulaire (peut être une constante ou un ID direct)
  const resolvedFormId =
    formId in HUBSPOT_CONFIG.FORMS
      ? getHubSpotFormId(formId as HubSpotFormId)
      : formId;

  useEffect(() => {
    // Attendre que le script soit chargé et le conteneur prêt
    if (!loaded || !containerRef.current || formCreatedRef.current) {
      return;
    }

    // Vérifier que hbspt.forms est disponible
    if (!(window as any).hbspt?.forms) {
      console.error("HubSpot Forms API non disponible");
      return;
    }

    // Marquer comme créé pour éviter les duplications
    formCreatedRef.current = true;

    // Nettoyer le conteneur avant de créer le formulaire
    containerRef.current.innerHTML = "";

    try {
      // Créer le formulaire HubSpot
      (window as any).hbspt.forms.create({
        portalId,
        formId: resolvedFormId,
        region,
        target: containerRef.current,
        onFormReady: (form: any) => {
          if (onFormReady) {
            onFormReady(form);
          }
        },
        onFormSubmitted: (data: any) => {
          if (onFormSubmitted) {
            onFormSubmitted(data);
          }
        },
      });
    } catch (err) {
      console.error("Erreur lors de la création du formulaire HubSpot:", err);
      formCreatedRef.current = false;
    }

    // Cleanup: réinitialiser le flag si le composant est démonté
    return () => {
      formCreatedRef.current = false;
    };
  }, [loaded, portalId, resolvedFormId, region, onFormReady, onFormSubmitted]);

  return (
    <div className={className} data-testid={testId}>
      {/* Loader pendant le chargement du script */}
      {loading && showLoading && (loadingComponent || <DefaultLoader />)}

      {/* Message d'erreur si échec du chargement */}
      {error &&
        (errorComponent || <DefaultError message={errorMessage || error.message} />)}

      {/* Conteneur du formulaire */}
      <div
        id={containerId}
        ref={containerRef}
        className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}
        data-testid={`${testId}-container`}
      />
    </div>
  );
});

/**
 * Variante: Formulaire de contact rapide (page d'accueil)
 *
 * @example
 * ```tsx
 * <QuickContactForm />
 * ```
 */
export function QuickContactForm({
  className = "",
  onSubmitted,
}: {
  className?: string;
  onSubmitted?: () => void;
}) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-lg ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Contactez-nous rapidement
      </h3>
      <p className="text-gray-600 mb-6">
        Notre équipe d'experts est là pour vous accompagner
      </p>
      <HubSpotForm
        formId="CONTACT_GENERAL"
        onFormSubmitted={() => {
          if (onSubmitted) {
            onSubmitted();
          }
        }}
        testId="quick-contact-form"
      />
    </div>
  );
}

/**
 * Variante: Formulaire de contact complet (page dédiée)
 *
 * @example
 * ```tsx
 * <FullContactForm />
 * ```
 */
export function FullContactForm({
  className = "",
  title = "Contactez notre équipe",
  description = "Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais",
  onSubmitted,
}: {
  className?: string;
  title?: string;
  description?: string;
  onSubmitted?: () => void;
}) {
  return (
    <div className={`bg-white rounded-lg p-8 shadow-lg ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <HubSpotForm
        formId="CONTACT_GENERAL"
        onFormSubmitted={() => {
          if (onSubmitted) {
            onSubmitted();
          }
        }}
        testId="full-contact-form"
      />
    </div>
  );
}

/**
 * Variante: Formulaire inline simple (sans wrapper)
 *
 * @example
 * ```tsx
 * <InlineContactForm className="w-full" />
 * ```
 */
export function InlineContactForm({
  className = "",
  formId = "CONTACT_GENERAL",
  onSubmitted,
}: {
  className?: string;
  formId?: HubSpotFormId | string;
  onSubmitted?: () => void;
}) {
  return (
    <HubSpotForm
      formId={formId}
      className={className}
      onFormSubmitted={() => {
        if (onSubmitted) {
          onSubmitted();
        }
      }}
      testId="inline-contact-form"
    />
  );
}

/**
 * Export par défaut du composant principal
 */
export default HubSpotForm;

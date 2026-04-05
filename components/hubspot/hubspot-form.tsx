"use client";

/**
 * Composant universel HubSpot Form
 *
 * Remplace tous les composants HubSpot existants par une solution unifiée
 * avec gestion interne du chargement script HubSpot.
 *
 * @see docs/ADR.md
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
  memo,
} from "react";
import {
  HUBSPOT_CONFIG,
  getHubSpotFormId,
  type HubSpotFormId,
} from "@/lib/constants/hubspot";

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
 */
interface ScriptState {
  loading: boolean;
  error: Error | null;
}

function sanitizeIdSegment(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const HubSpotForm = memo(function HubSpotForm({
  formId = "CONTACT_GENERAL",
  portalId = HUBSPOT_CONFIG.PORTAL_ID,
  region = HUBSPOT_CONFIG.REGION,
  onFormReady,
  onFormSubmitted,
  className = "",
  errorComponent,
  errorMessage,
  containerId,
  testId = "hubspot-form",
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCreatedRef = useRef(false);
  const [scriptState, setScriptState] = useState<ScriptState>({
    loading: true,
    error: null,
  });

  // Déterminer l'ID du formulaire (peut être une constante ou un ID direct)
  const resolvedFormId =
    formId in HUBSPOT_CONFIG.FORMS
      ? getHubSpotFormId(formId as HubSpotFormId)
      : formId;

  const resolvedContainerId = useMemo(
    () => {
      if (containerId) {
        return containerId;
      }

      const sanitizedFormId = sanitizeIdSegment(resolvedFormId);
      const sanitizedTestId = testId ? sanitizeIdSegment(testId) : "";

      const suffix = [sanitizedFormId, sanitizedTestId]
        .filter(Boolean)
        .join("-");

      return `hubspot-form-${suffix || "auto"}`;
    },
    [containerId, resolvedFormId, testId]
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    let isMounted = true;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    const cleanupHandlers: Array<() => void> = [];
    let attempts = 0;
    const MAX_ATTEMPTS = 6;
    const RETRY_DELAY = Math.max(250, HUBSPOT_CONFIG.LOADING.RETRY_DELAY ?? 500);

    const updateState = (updater: (prev: ScriptState) => ScriptState) => {
      if (!isMounted) return;
      setScriptState((prev) => updater(prev));
    };

    const handleError = (message: string, error?: unknown) => {
      console.error(message, error);
      updateState(() => ({
        loading: false,
        error: error instanceof Error ? error : new Error(message),
      }));
      formCreatedRef.current = false;
    };

    const clearRetry = () => {
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
    };

    const scheduleRetry = () => {
      clearRetry();
      if (attempts >= MAX_ATTEMPTS) {
        handleError("HubSpot Forms API indisponible après plusieurs tentatives");
        return;
      }
      attempts += 1;
      retryTimer = setTimeout(ensureForm, RETRY_DELAY);
    };

    const createForm = () => {
      if (!isMounted || !containerRef.current) {
        return false;
      }

      const hubspot = (window as any).hbspt;
      const formsApi = hubspot?.forms;

      if (!formsApi?.create) {
        return false;
      }

      try {
        formCreatedRef.current = true;
        containerRef.current.innerHTML = "";

        updateState((prev) => ({ ...prev, loading: true, error: null }));

        let formCheckTimer: ReturnType<typeof setInterval> | null = setInterval(() => {
          if (!isMounted) {
            if (formCheckTimer) {
              clearInterval(formCheckTimer);
            }
            return;
          }

          if (containerRef.current?.querySelector(".hs-form")) {
            updateState((prev) => ({ ...prev, loading: false, error: null }));
            if (formCheckTimer) {
              clearInterval(formCheckTimer);
              formCheckTimer = null;
            }
          }
        }, 300);

        cleanupHandlers.push(() => {
          if (formCheckTimer) {
            clearInterval(formCheckTimer);
            formCheckTimer = null;
          }
        });

        formsApi.create({
          portalId,
          formId: resolvedFormId,
          region,
          target: `#${resolvedContainerId}`,
          onFormReady: (form: any) => {
            if (!isMounted) {
              return;
            }
            updateState((prev) => ({ ...prev, loading: false, error: null }));
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

        return true;
      } catch (err) {
        handleError("Erreur lors de la création du formulaire HubSpot", err);
        return false;
      }
    };

    const ensureForm = () => {
      if (!isMounted) return;

      // Si le formulaire est déjà présent dans le DOM, ne rien faire
      if (formCreatedRef.current && containerRef.current?.querySelector(".hs-form")) {
        updateState((prev) => ({ ...prev, loading: false, error: null }));
        return;
      }

      const hubspot = (window as any).hbspt;

      if (hubspot?.forms?.create && createForm()) {
        return;
      }

      const scriptSrc = HUBSPOT_CONFIG.SCRIPTS.FORMS;
      let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);

      const onLoad = () => {
        if (!createForm()) {
          scheduleRetry();
        }
      };

      const onError = (event: ErrorEvent | Event) => {
        handleError("Impossible de charger le script HubSpot Forms", event);
      };

      if (script) {
        script.addEventListener("load", onLoad);
        script.addEventListener("error", onError);
        cleanupHandlers.push(() => {
          script?.removeEventListener("load", onLoad);
          script?.removeEventListener("error", onError);
        });

        // Si le script est déjà chargé mais que hbspt n'est pas prêt, on retente
        if (script.getAttribute("data-hubspot-loaded") === "true") {
          scheduleRetry();
        }

        return;
      }

      script = document.createElement("script");
      script.src = scriptSrc;
      script.id = "hubspot-forms-script";
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = true;
      script.defer = true;

      script.addEventListener("load", () => {
        script?.setAttribute("data-hubspot-loaded", "true");
        onLoad();
      });
      script.addEventListener("error", onError);

      cleanupHandlers.push(() => {
        script?.removeEventListener("load", onLoad);
        script?.removeEventListener("error", onError);
      });

      document.body.appendChild(script);
    };

    updateState(() => ({ loading: true, error: null }));
    ensureForm();

    return () => {
      isMounted = false;
      clearRetry();
      cleanupHandlers.forEach((fn) => fn());
      formCreatedRef.current = false;
    };
  }, [portalId, resolvedFormId, region, resolvedContainerId, onFormReady, onFormSubmitted]);

  return (
    <div className={className} data-testid={testId}>
      {/* Message d'erreur si échec du chargement */}
      {scriptState.error &&
        (errorComponent || (
          <DefaultError
            message={errorMessage || scriptState.error.message}
          />
        ))}

      {/* Conteneur du formulaire */}
      <div
        id={resolvedContainerId}
        ref={containerRef}
        className="opacity-100 transition-opacity duration-300"
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

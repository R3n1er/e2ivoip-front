/**
 * Hook personnalisé pour charger les scripts HubSpot
 *
 * Ce hook centralise la logique de chargement des scripts HubSpot
 * (forms, tracking) avec gestion d'erreur et cache.
 *
 * @see docs/REFACTORING.md - Phase 1
 */

import { useState, useEffect, useCallback } from 'react';
import {
  HUBSPOT_CONFIG,
  getHubSpotScriptUrl,
  isHubSpotLoaded,
  isHubSpotFormsLoaded,
} from '@/lib/constants/hubspot';

/**
 * État du chargement du script
 */
interface ScriptLoadingState {
  loaded: boolean;
  loading: boolean;
  error: Error | null;
}

/**
 * Cache des scripts déjà chargés
 */
const scriptCache = new Map<string, Promise<void>>();

/**
 * Charge un script de manière asynchrone
 *
 * @param src - URL du script
 * @param id - ID unique pour le script (pour le cache)
 * @returns Promise qui se résout quand le script est chargé
 */
function loadScript(src: string, id: string): Promise<void> {
  // Vérifier le cache
  if (scriptCache.has(id)) {
    return scriptCache.get(id)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    // Vérifier si le script existe déjà
    const existingScript = document.getElementById(id);
    if (existingScript) {
      resolve();
      return;
    }

    // Créer le script
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;

    // Timeout pour éviter les attentes infinies
    const timeout = setTimeout(() => {
      reject(new Error(`Script loading timeout: ${src}`));
    }, HUBSPOT_CONFIG.LOADING.SCRIPT_TIMEOUT);

    script.onload = () => {
      clearTimeout(timeout);
      resolve();
    };

    script.onerror = () => {
      clearTimeout(timeout);
      scriptCache.delete(id); // Retirer du cache en cas d'erreur
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });

  scriptCache.set(id, promise);
  return promise;
}

/**
 * Hook pour charger le script HubSpot Forms
 *
 * @returns État du chargement
 *
 * @example
 * ```tsx
 * function MyFormComponent() {
 *   const { loaded, loading, error } = useHubSpotFormsScript();
 *
 *   if (loading) return <Loader />;
 *   if (error) return <Error message={error.message} />;
 *   if (!loaded) return null;
 *
 *   return <HubSpotForm />;
 * }
 * ```
 */
export function useHubSpotFormsScript(): ScriptLoadingState {
  const [state, setState] = useState<ScriptLoadingState>({
    loaded: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Vérifier si déjà chargé
    if (isHubSpotFormsLoaded()) {
      setState({ loaded: true, loading: false, error: null });
      return;
    }

    // Charger le script
    const scriptUrl = getHubSpotScriptUrl('FORMS');
    loadScript(scriptUrl, 'hubspot-forms-script')
      .then(() => {
        setState({ loaded: true, loading: false, error: null });
      })
      .catch((error) => {
        setState({ loaded: false, loading: false, error });
      });
  }, []);

  return state;
}

/**
 * Hook pour charger le script HubSpot Tracking
 *
 * @returns État du chargement
 *
 * @example
 * ```tsx
 * function TrackingComponent() {
 *   const { loaded, loading, error } = useHubSpotTrackingScript();
 *
 *   useEffect(() => {
 *     if (loaded) {
 *       // HubSpot tracking est prêt
 *       window._hsq.push(['trackPageView']);
 *     }
 *   }, [loaded]);
 *
 *   return null;
 * }
 * ```
 */
export function useHubSpotTrackingScript(): ScriptLoadingState {
  const [state, setState] = useState<ScriptLoadingState>({
    loaded: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Vérifier si déjà chargé
    if (isHubSpotLoaded()) {
      setState({ loaded: true, loading: false, error: null });
      return;
    }

    // Charger le script
    const scriptUrl = getHubSpotScriptUrl('TRACKING');
    loadScript(scriptUrl, 'hs-script-loader')
      .then(() => {
        setState({ loaded: true, loading: false, error: null });
      })
      .catch((error) => {
        setState({ loaded: false, loading: false, error });
      });
  }, []);

  return state;
}

/**
 * Hook générique pour charger un script HubSpot
 *
 * @param type - Type de script ('FORMS' ou 'TRACKING')
 * @returns État du chargement
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { loaded, loading, error } = useHubSpotScript('FORMS');
 *
 *   if (!loaded) return <Loader />;
 *   return <HubSpotForm />;
 * }
 * ```
 */
export function useHubSpotScript(
  type: 'FORMS' | 'TRACKING'
): ScriptLoadingState {
  const [state, setState] = useState<ScriptLoadingState>({
    loaded: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Déterminer la fonction de vérification
    const isLoaded =
      type === 'FORMS' ? isHubSpotFormsLoaded : isHubSpotLoaded;

    // Vérifier si déjà chargé
    if (isLoaded()) {
      setState({ loaded: true, loading: false, error: null });
      return;
    }

    // Déterminer l'ID du script
    const scriptId =
      type === 'FORMS' ? 'hubspot-forms-script' : 'hs-script-loader';

    // Charger le script
    const scriptUrl = getHubSpotScriptUrl(type);
    loadScript(scriptUrl, scriptId)
      .then(() => {
        setState({ loaded: true, loading: false, error: null });
      })
      .catch((error) => {
        setState({ loaded: false, loading: false, error });
      });
  }, [type]);

  return state;
}

/**
 * Hook pour attendre que HubSpot soit prêt
 *
 * Utile pour exécuter du code uniquement quand HubSpot est chargé
 *
 * @param callback - Fonction à exécuter quand HubSpot est prêt
 * @param type - Type de script à attendre ('FORMS' ou 'TRACKING')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useHubSpotReady(() => {
 *     // Code exécuté quand HubSpot Forms est prêt
 *     window.hbspt.forms.create({ ... });
 *   }, 'FORMS');
 *
 *   return <div id="form-container" />;
 * }
 * ```
 */
export function useHubSpotReady(
  callback: () => void,
  type: 'FORMS' | 'TRACKING' = 'FORMS'
): void {
  const { loaded } = useHubSpotScript(type);

  useEffect(() => {
    if (loaded) {
      callback();
    }
  }, [loaded, callback]);
}

/**
 * Hook pour charger HubSpot Forms avec retry automatique
 *
 * @param maxRetries - Nombre maximum de tentatives (défaut: 3)
 * @returns État du chargement avec nombre de tentatives
 *
 * @example
 * ```tsx
 * function RobustFormComponent() {
 *   const { loaded, loading, error, retries } = useHubSpotFormsWithRetry(3);
 *
 *   if (loading) return <Loader message={`Tentative ${retries + 1}/3`} />;
 *   if (error) return <Error />;
 *
 *   return <HubSpotForm />;
 * }
 * ```
 */
export function useHubSpotFormsWithRetry(maxRetries = 3) {
  const [retries, setRetries] = useState(0);
  const [state, setState] = useState<ScriptLoadingState>({
    loaded: false,
    loading: true,
    error: null,
  });

  const attemptLoad = useCallback(async () => {
    try {
      if (isHubSpotFormsLoaded()) {
        setState({ loaded: true, loading: false, error: null });
        return;
      }

      const scriptUrl = getHubSpotScriptUrl('FORMS');
      await loadScript(scriptUrl, 'hubspot-forms-script');
      setState({ loaded: true, loading: false, error: null });
    } catch (error) {
      if (retries < maxRetries - 1) {
        // Retry après délai
        setTimeout(() => {
          setRetries((r) => r + 1);
        }, HUBSPOT_CONFIG.LOADING.RETRY_DELAY);
      } else {
        setState({
          loaded: false,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }
  }, [retries, maxRetries]);

  useEffect(() => {
    attemptLoad();
  }, [attemptLoad]);

  return { ...state, retries };
}

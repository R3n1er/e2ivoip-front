"use client";

import { useEffect, useState, useCallback } from "react";

interface ServiceWorkerState {
  isSupported: boolean;
  isInstalled: boolean;
  isUpdating: boolean;
  hasUpdate: boolean;
  error: string | null;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isInstalled: false,
    isUpdating: false,
    hasUpdate: false,
    error: null,
  });

  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  // Vérifier si le service worker est supporté
  const checkSupport = useCallback(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      setState((prev) => ({ ...prev, isSupported: true }));
      return true;
    }
    setState((prev) => ({ ...prev, isSupported: false }));
    return false;
  }, []);

  // Enregistrer le service worker
  const register = useCallback(async () => {
    if (!checkSupport()) return;

    try {
      const reg = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      setRegistration(reg);
      setState((prev) => ({ ...prev, isInstalled: true, error: null }));

      // Écouter les mises à jour
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setState((prev) => ({ ...prev, hasUpdate: true }));
            }
          });
        }
      });

      // Écouter les changements d'état
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setState((prev) => ({ ...prev, hasUpdate: false }));
        window.location.reload();
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Erreur d'enregistrement",
      }));
    }
  }, [checkSupport]);

  // Mettre à jour le service worker
  const update = useCallback(async () => {
    if (!registration) return;

    try {
      setState((prev) => ({ ...prev, isUpdating: true }));
      await registration.update();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Erreur de mise à jour",
      }));
    } finally {
      setState((prev) => ({ ...prev, isUpdating: false }));
    }
  }, [registration]);

  // Forcer la mise à jour
  const forceUpdate = useCallback(async () => {
    if (!registration) return;

    try {
      setState((prev) => ({ ...prev, isUpdating: true }));

      // Envoyer un message au service worker pour forcer la mise à jour
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      await registration.update();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Erreur de mise à jour forcée",
      }));
    } finally {
      setState((prev) => ({ ...prev, isUpdating: false }));
    }
  }, [registration]);

  // Vérifier le statut du cache
  const getCacheStatus = useCallback(async () => {
    if (!registration) return null;

    try {
      const messageChannel = new MessageChannel();
      const cacheStatus = await new Promise((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          if (event.data.type === "CACHE_STATUS") {
            resolve(event.data);
          }
        };
        registration.active?.postMessage({ type: "GET_CACHE_STATUS" }, [
          messageChannel.port2,
        ]);
      });
      return cacheStatus;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du statut du cache:",
        error
      );
      return null;
    }
  }, [registration]);

  // Nettoyer le cache
  const clearCache = useCallback(async () => {
    if (!registration) return;

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );

      // Recharger la page pour appliquer les changements
      window.location.reload();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Erreur de nettoyage du cache",
      }));
    }
  }, [registration]);

  // Initialisation
  useEffect(() => {
    if (typeof window !== "undefined") {
      register();
    }
  }, [register]);

  return {
    ...state,
    registration,
    register,
    update,
    forceUpdate,
    getCacheStatus,
    clearCache,
  };
}

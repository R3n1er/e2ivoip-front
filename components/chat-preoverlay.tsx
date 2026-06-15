"use client";

/**
 * Composant ChatPreOverlay refactorisé avec React Hook Form + Zod
 *
 * Améliorations par rapport à la version précédente :
 * - Validation robuste avec Zod
 * - Gestion d'état simplifiée avec React Hook Form
 * - Messages d'erreur personnalisés
 * - Performance optimisée (moins de re-renders)
 * - Code plus maintenable
 * - Sans TanStack Query (utilise une fonction async simple)
 *
 * @see docs/REFACTORING.md - Phase 4
 */

import React, { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/icons";
import { submitChatIntake } from "@/lib/api/chat-intake";
import { getConsent, CONSENT_CHANGE_EVENT } from "@/lib/analytics/consent";
import {
  chatIntakeSchema,
  type ChatIntakeFormData,
} from "@/lib/validation/chat-intake";

export const ChatPreOverlay = memo(function ChatPreOverlay() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationStopped, setAnimationStopped] = useState(false);
  // Le bandeau cookies (fixed bottom, pleine largeur) recouvre le bouton chat
  // tant qu'aucun choix n'est fait : on remonte le chat au-dessus dans ce cas.
  const [bannerVisible, setBannerVisible] = useState(false);

  React.useEffect(() => {
    const sync = () => setBannerVisible(getConsent() === null);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  // Animation de vibration par cycles : vibration 3s → pause 2s → répéter
  // Arrêt définitif après 20 secondes
  React.useEffect(() => {
    if (animationStopped) return;

    const VIBRATION_DURATION = 3000; // 3 secondes de vibration
    const PAUSE_DURATION = 2000; // 2 secondes de pause
    const TOTAL_DURATION = 20000; // 20 secondes maximum

    let currentCycleTimeout: NodeJS.Timeout;
    const allTimers: NodeJS.Timeout[] = [];

    // Timer global pour arrêter après 20 secondes
    const stopTimer = setTimeout(() => {
      setIsAnimating(false);
      setAnimationStopped(true);
    }, TOTAL_DURATION);
    allTimers.push(stopTimer);

    // Fonction pour gérer les cycles vibration/pause
    const runAnimationCycle = () => {
      // Phase 1: Vibration (3s)
      setIsAnimating(true);

      const vibrationTimer = setTimeout(() => {
        // Phase 2: Pause (2s)
        setIsAnimating(false);

        const pauseTimer = setTimeout(() => {
          // Répéter le cycle
          runAnimationCycle();
        }, PAUSE_DURATION);
        allTimers.push(pauseTimer);
      }, VIBRATION_DURATION);
      allTimers.push(vibrationTimer);
    };

    // Démarrer le premier cycle immédiatement
    runAnimationCycle();

    return () => {
      // Nettoyer tous les timers
      allTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [animationStopped]);

  // Configuration React Hook Form avec Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChatIntakeFormData>({
    resolver: zodResolver(chatIntakeSchema),
    mode: "onChange", // Validation en temps réel
  });

  /**
   * Soumission du formulaire
   * Mémorisé avec useCallback pour optimiser les re-renders
   */
  const onSubmit = useCallback(
    async (data: ChatIntakeFormData) => {
      try {
        setIsSubmitting(true);

        // Envoi des données à l'API
        await submitChatIntake({
          ...data,
          pageUrl: window.location.href,
          source: "website-prechat",
        });

        // Identification HubSpot côté client
        try {
          (window as any)._hsq = (window as any)._hsq || [];
          (window as any)._hsq.push([
            "identify",
            {
              email: data.email,
              firstname: data.firstName,
              lastname: data.lastName,
              phone: data.phone || "",
            },
          ]);
          // Ne pas ouvrir automatiquement le widget de conversation HubSpot
          (window as any).HubSpotConversations?.widget?.hide?.();
        } catch (err) {
          console.error("Erreur identification HubSpot:", err);
        }

        // Fermeture de l'overlay et reset du formulaire
        setOpen(false);
        reset();
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset]
  );

  /**
   * Annulation et fermeture
   * Mémorisé avec useCallback
   * Arrête définitivement l'animation
   */
  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
    // Arrêter définitivement l'animation
    setIsAnimating(false);
    setAnimationStopped(true);
  }, [reset]);

  return (
    <div
      className={`fixed right-6 z-[9999] transition-all duration-300 ${
        bannerVisible ? "bottom-44 sm:bottom-28" : "bottom-6"
      }`}
    >
      {/* Bouton pour ouvrir le chat */}
      {!open && (
        <div className="flex flex-col items-end gap-3">
          {/* Texte "Une question?" */}
          <div
            className={`
              bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200
              ${isAnimating ? "animate-bounce" : ""}
            `}
          >
            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              Une question ?
            </p>
          </div>

          {/* Bouton chat agrandi */}
          <button
            onClick={() => {
              setOpen(true);
              // Arrêter définitivement l'animation au clic
              setIsAnimating(false);
              setAnimationStopped(true);
            }}
            className={`
              shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-[0.98]
              rounded-full w-20 h-20 flex items-center justify-center
              bg-red-primary hover:bg-red-600
              text-white cursor-pointer
              ${isAnimating ? "animate-shake" : ""}
            `}
            aria-label="Ouvrir le pré‑chat"
            data-testid="open-chat-button"
            style={{ pointerEvents: "auto" }}
          >
            <Chat size={32} weight="bold" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Overlay du formulaire */}
      {open && (
        <div
          className="w-[320px] p-4 rounded-2xl shadow-2xl bg-white border border-gray-200"
          data-testid="chat-preoverlay"
          style={{ pointerEvents: "auto" }}
        >
          <h3 className="font-bold text-gray-900 mb-2">Avant de commencer</h3>
          <p className="text-sm text-gray-600 mb-3">
            On fait connaissance en quelques infos simples.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Prénom */}
            <div>
              <Input
                {...register("firstName")}
                className={errors.firstName ? "border-red-primary" : ""}
                placeholder="Prénom*"
                data-testid="firstname-input"
              />
              {errors.firstName && (
                <p
                  className="text-xs text-red-primary mt-1"
                  data-testid="firstname-error"
                >
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <Input
                {...register("lastName")}
                className={errors.lastName ? "border-red-primary" : ""}
                placeholder="Nom*"
                data-testid="lastname-input"
              />
              {errors.lastName && (
                <p
                  className="text-xs text-red-primary mt-1"
                  data-testid="lastname-error"
                >
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Entreprise */}
            <div>
              <Input
                {...register("company")}
                className={errors.company ? "border-red-primary" : ""}
                placeholder="Entreprise*"
                data-testid="company-input"
              />
              {errors.company && (
                <p
                  className="text-xs text-red-primary mt-1"
                  data-testid="company-error"
                >
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                {...register("email")}
                type="email"
                className={errors.email ? "border-red-primary" : ""}
                placeholder="Email*"
                data-testid="email-input"
              />
              {errors.email && (
                <p
                  className="text-xs text-red-primary mt-1"
                  data-testid="email-error"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Téléphone (optionnel) */}
            <div>
              <Input
                {...register("phone")}
                type="tel"
                className={errors.phone ? "border-red-primary" : ""}
                placeholder="Téléphone (optionnel)"
                data-testid="phone-input"
              />
              {errors.phone && (
                <p
                  className="text-xs text-red-primary mt-1"
                  data-testid="phone-error"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300 transition-transform active:scale-[0.98]"
                data-testid="cancel-button"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-primary rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
                data-testid="submit-button"
              >
                {isSubmitting ? "Envoi..." : "Ouvrir le chat"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

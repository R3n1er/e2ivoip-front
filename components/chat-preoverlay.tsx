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
import { submitChatIntake } from "@/lib/api/chat-intake";
import {
  chatIntakeSchema,
  type ChatIntakeFormData,
} from "@/lib/validation/chat-intake";

export const ChatPreOverlay = memo(function ChatPreOverlay() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const onSubmit = useCallback(async (data: ChatIntakeFormData) => {
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
        (window as any).HubSpotConversations?.widget?.open?.();
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
  }, [reset]);

  /**
   * Annulation et fermeture
   * Mémorisé avec useCallback
   */
  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Bouton pour ouvrir le chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="btn btn-primary shadow-xl hover:shadow-2xl transition-shadow"
          data-testid="open-chat-button"
        >
          Démarrer le chat
        </button>
      )}

      {/* Overlay du formulaire */}
      {open && (
        <div
          className="w-[320px] p-4 rounded-2xl shadow-2xl bg-white border"
          data-testid="chat-preoverlay"
        >
          <h3 className="font-bold text-gray-900 mb-2">Avant de commencer</h3>
          <p className="text-sm text-gray-600 mb-3">
            On fait connaissance en quelques infos simples.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Prénom */}
            <div>
              <input
                {...register("firstName")}
                className={`input input-bordered w-full ${
                  errors.firstName ? "input-error" : ""
                }`}
                placeholder="Prénom*"
                data-testid="firstname-input"
              />
              {errors.firstName && (
                <p
                  className="text-xs text-error mt-1"
                  data-testid="firstname-error"
                >
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <input
                {...register("lastName")}
                className={`input input-bordered w-full ${
                  errors.lastName ? "input-error" : ""
                }`}
                placeholder="Nom*"
                data-testid="lastname-input"
              />
              {errors.lastName && (
                <p
                  className="text-xs text-error mt-1"
                  data-testid="lastname-error"
                >
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Entreprise */}
            <div>
              <input
                {...register("company")}
                className={`input input-bordered w-full ${
                  errors.company ? "input-error" : ""
                }`}
                placeholder="Entreprise*"
                data-testid="company-input"
              />
              {errors.company && (
                <p
                  className="text-xs text-error mt-1"
                  data-testid="company-error"
                >
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email")}
                type="email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Email*"
                data-testid="email-input"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1" data-testid="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Téléphone (optionnel) */}
            <div>
              <input
                {...register("phone")}
                type="tel"
                className={`input input-bordered w-full ${
                  errors.phone ? "input-error" : ""
                }`}
                placeholder="Téléphone (optionnel)"
                data-testid="phone-input"
              />
              {errors.phone && (
                <p className="text-xs text-error mt-1" data-testid="phone-error">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-ghost flex-1"
                data-testid="cancel-button"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="btn btn-primary flex-1"
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

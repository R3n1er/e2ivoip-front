"use client";

/**
 * ChatPreOverlay — Design System Monolithe 2026
 *
 * Bouton rouge plein + hard shadow, formulaire 3 champs (Prenom, Email, Entreprise),
 * animation declenchee par Intersection Observer post-Hero.
 *
 * @see docs/Design.md - Section 7.5bis
 */

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStopped, setAnimationStopped] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Intersection Observer — declenche l'animation quand on scrolle apres le Hero
  useEffect(() => {
    if (animationStopped || scrollTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scrollTriggered) {
          setScrollTriggered(true);
          setIsAnimating(true);
        }
      },
      { threshold: 0.1 }
    );

    // Observer le sentinel place apres le Hero dans le DOM
    // On cible le deuxieme <section> de la page (apres le Hero)
    const sections = document.querySelectorAll("main > section, main > div > section");
    if (sections.length > 1) {
      observer.observe(sections[1]);
    }

    return () => observer.disconnect();
  }, [animationStopped, scrollTriggered]);

  // Animation par cycles : vibration 3s -> pause 2s -> repeter (20s total)
  useEffect(() => {
    if (!scrollTriggered || animationStopped) return;

    const VIBRATION_DURATION = 3000;
    const PAUSE_DURATION = 2000;
    const TOTAL_DURATION = 20000;

    const allTimers: NodeJS.Timeout[] = [];

    const stopTimer = setTimeout(() => {
      setIsAnimating(false);
      setAnimationStopped(true);
    }, TOTAL_DURATION);
    allTimers.push(stopTimer);

    const runAnimationCycle = () => {
      setIsAnimating(true);
      const vibrationTimer = setTimeout(() => {
        setIsAnimating(false);
        const pauseTimer = setTimeout(() => {
          runAnimationCycle();
        }, PAUSE_DURATION);
        allTimers.push(pauseTimer);
      }, VIBRATION_DURATION);
      allTimers.push(vibrationTimer);
    };

    runAnimationCycle();

    return () => {
      allTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [scrollTriggered, animationStopped]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChatIntakeFormData>({
    resolver: zodResolver(chatIntakeSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: ChatIntakeFormData) => {
      try {
        setIsSubmitting(true);

        await submitChatIntake({
          ...data,
          pageUrl: window.location.href,
          source: "website-prechat",
        });

        try {
          (window as any)._hsq = (window as any)._hsq || [];
          (window as any)._hsq.push([
            "identify",
            {
              email: data.email,
              firstname: data.firstName,
            },
          ]);
          (window as any).HubSpotConversations?.widget?.hide?.();
        } catch (err) {
          console.error("Erreur identification HubSpot:", err);
        }

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

  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
    setIsAnimating(false);
    setAnimationStopped(true);
  }, [reset]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Bouton Monolithe Primaire */}
      {!open && (
        <div className="flex flex-col items-end gap-3">
          {/* Texte "Une question ?" — style industriel Stitch */}
          <div
            className={`
              bg-white px-4 py-2 rounded-none shadow-[3px_3px_0_0_#1F2937] border border-gray-200
              ${isAnimating ? "animate-bounce" : ""}
            `}
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#091421] whitespace-nowrap">
              Une question ?
            </p>
          </div>

          {/* Bouton chat — Monolithe Primaire rouge plein + hard shadow */}
          <button
            onClick={() => {
              setOpen(true);
              setIsAnimating(false);
              setAnimationStopped(true);
            }}
            className={`
              monolith-btn rounded-none w-20 h-20 flex items-center justify-center
              bg-red-primary text-white cursor-pointer
              ${isAnimating ? "animate-shake" : ""}
            `}
            aria-label="Ouvrir le pré‑chat"
            data-testid="open-chat-button"
            style={{ pointerEvents: "auto" }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 14c-2.761 0-5-1.79-5-4s2.239-4 5-4h6c2.761 0 5 1.79 5 4s-2.239 4-5 4H9l-2 2v-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 16c2.209 0 4-1.343 4-3 0-1.657-1.791-3-4-3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Formulaire PreChat — Carte Monolithe */}
      {open && (
        <div
          className="w-[320px] p-6 rounded-none shadow-[6px_6px_0_0_#1F2937] bg-white border border-gray-200"
          data-testid="chat-preoverlay"
          style={{ pointerEvents: "auto" }}
        >
          <h3 className="font-black uppercase tracking-[0.2em] text-sm text-[#091421] mb-2">
            Avant de commencer
          </h3>
          <p className="text-sm text-gray-secondary mb-4">
            On fait connaissance en quelques infos simples.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Prenom */}
            <div>
              <input
                {...register("firstName")}
                className={`w-full rounded-none bg-gray-50 border px-4 py-3 text-sm focus:outline-none focus:border-b-2 focus:border-red-primary ${
                  errors.firstName ? "border-red-primary" : "border-gray-200"
                }`}
                placeholder="Prénom*"
                data-testid="firstname-input"
              />
              {errors.firstName && (
                <p className="text-xs text-red-primary mt-1" data-testid="firstname-error">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email")}
                type="email"
                className={`w-full rounded-none bg-gray-50 border px-4 py-3 text-sm focus:outline-none focus:border-b-2 focus:border-red-primary ${
                  errors.email ? "border-red-primary" : "border-gray-200"
                }`}
                placeholder="Email*"
                data-testid="email-input"
              />
              {errors.email && (
                <p className="text-xs text-red-primary mt-1" data-testid="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Entreprise */}
            <div>
              <input
                {...register("company")}
                className={`w-full rounded-none bg-gray-50 border px-4 py-3 text-sm focus:outline-none focus:border-b-2 focus:border-red-primary ${
                  errors.company ? "border-red-primary" : "border-gray-200"
                }`}
                placeholder="Entreprise*"
                data-testid="company-input"
              />
              {errors.company && (
                <p className="text-xs text-red-primary mt-1" data-testid="company-error">
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* CTA Monolithe Primaire pleine largeur */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="monolith-btn w-full bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-8 py-4 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="submit-button"
              >
                {isSubmitting ? "Envoi..." : "Ouvrir le chat"}
              </button>
            </div>

            {/* Lien Annuler discret */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm text-gray-secondary hover:text-[#091421] transition-colors"
                data-testid="cancel-button"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

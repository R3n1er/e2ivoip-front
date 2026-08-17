"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
} from "react";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/icons";
import { getConsent, CONSENT_CHANGE_EVENT } from "@/lib/analytics/consent";

interface ChatFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
}

const FIELDS: {
  name: keyof ChatFormData;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete: string;
  inputMode?: "email" | "tel";
  testId: string;
  errorTestId: string;
}[] = [
  {
    name: "firstName",
    label: "Prénom",
    required: true,
    autoComplete: "given-name",
    testId: "firstname-input",
    errorTestId: "firstname-error",
  },
  {
    name: "lastName",
    label: "Nom",
    required: true,
    autoComplete: "family-name",
    testId: "lastname-input",
    errorTestId: "lastname-error",
  },
  {
    name: "company",
    label: "Entreprise",
    required: true,
    autoComplete: "organization",
    testId: "company-input",
    errorTestId: "company-error",
  },
  {
    name: "email",
    label: "Email professionnel",
    type: "email",
    required: true,
    autoComplete: "email",
    inputMode: "email",
    testId: "email-input",
    errorTestId: "email-error",
  },
  {
    name: "phone",
    label: "Téléphone (optionnel)",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    testId: "phone-input",
    errorTestId: "phone-error",
  },
];

const initialForm: ChatFormData = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
};

const HUBSPOT_WIDGET_TIMEOUT_MS = 20000;

function waitForHubSpotConversations(timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.HubSpotConversations) {
      resolve();
      return;
    }

    const start = Date.now();
    const timer = window.setInterval(() => {
      if (window.HubSpotConversations) {
        window.clearInterval(timer);
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        window.clearInterval(timer);
        reject(new Error("Le script HubSpot n'a pas chargé à temps"));
      }
    }, 100);

    window.hsConversationsOnReady ??= [];
    window.hsConversationsOnReady.push(() => {
      window.clearInterval(timer);
      resolve();
    });
  });
}

function openHubSpotWidget(): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false;

    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      callback();
    };

    const open = () => {
      if (settled) return;

      try {
        const widget = window.HubSpotConversations?.widget;
        if (!widget) {
          finish(() =>
            reject(new Error("Le widget HubSpot n'est pas disponible"))
          );
          return;
        }

        if (widget.status?.().loaded) {
          widget.open();
        } else {
          widget.load({ widgetOpen: true });
        }
        finish(resolve);
      } catch (error) {
        finish(() => reject(error));
      }
    };

    const timeout = window.setTimeout(() => {
      finish(() =>
        reject(new Error("Le chargement du widget HubSpot a expiré"))
      );
    }, HUBSPOT_WIDGET_TIMEOUT_MS);

    if (window.HubSpotConversations) {
      open();
      return;
    }

    window.hsConversationsOnReady ??= [];
    window.hsConversationsOnReady.push(open);
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  if (!phone.trim()) return true;
  return /^[\d\s+\-\(\)]{8,20}$/.test(phone);
}

function validateField(name: keyof ChatFormData, value: string): string | null {
  const trimmed = value.trim();
  if (name === "firstName" || name === "lastName" || name === "company") {
    return trimmed.length >= 2
      ? null
      : "Ce champ doit contenir au moins 2 caractères";
  }
  if (name === "email") {
    if (!trimmed) return "L'email est obligatoire";
    return isValidEmail(trimmed) ? null : "L'adresse email n'est pas valide";
  }
  if (name === "phone") {
    return isValidPhone(value) ? null : "Le numéro de téléphone n'est pas valide";
  }
  return null;
}

function isFormValid(form: ChatFormData): boolean {
  return (
    form.firstName.trim().length >= 2 &&
    form.lastName.trim().length >= 2 &&
    form.company.trim().length >= 2 &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone)
  );
}

interface ChatPreOverlayProps {
  /**
   * Signale que le visiteur demande explicitement le chat. Le parent s'en sert
   * pour monter le script HubSpot même sans consentement préalable (ADR
   * 2026-08-16) : le refus des cookies ne doit jamais empêcher de discuter.
   */
  onRequestChat?: () => void;
}

export const ChatPreOverlay = memo(function ChatPreOverlay({
  onRequestChat,
}: ChatPreOverlayProps = {}) {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const formErrorRef = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [form, setForm] = useState<ChatFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ChatFormData, string | null>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ChatFormData, boolean>>>({});
  const [wiggle, setWiggle] = useState(true);

  useEffect(() => {
    const sync = () => setBannerVisible(getConsent() === null);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!wiggle) return;
    const timer = setTimeout(() => setWiggle(false), 20000);
    return () => clearTimeout(timer);
  }, [wiggle]);

  const updateField = useCallback((name: keyof ChatFormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError((previous) => (previous ? null : previous));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }, [touched]);

  const handleBlur = useCallback((name: keyof ChatFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }));
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof ChatFormData, string | null>> = {};
    (Object.keys(form) as (keyof ChatFormData)[]).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      company: true,
      email: true,
      phone: true,
    });
    if (!isFormValid(form)) {
      const firstInvalidField = FIELDS.find(
        ({ name }) => newErrors[name] !== null
      );
      if (firstInvalidField) {
        window.requestAnimationFrame(() => {
          document.getElementById(`chat-${firstInvalidField.name}`)?.focus();
        });
      }
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      // Filet de sécurité : garantit le montage du script même si le formulaire
      // a été ouvert sans passer par le bouton (test, lien direct).
      onRequestChat?.();
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        company: form.company.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        pageUrl: window.location.href,
        source: "website-prechat",
      };

      const res = await fetch("/api/hubspot/ingest-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erreur lors de la soumission");
      }

      window._hsq ??= [];
      window._hsq.push([
        "identify",
        {
          email: payload.email,
          firstname: payload.firstName,
          lastname: payload.lastName,
          phone: payload.phone,
        },
      ]);
      window._hsq.push(["trackPageView"]);

      // Sur les connexions lentes ou les cold-start Vercel, le script HubSpot
      // n'est pas encore exécuté quand l'API répond. On attend explicitement la
      // présence de l'API avant d'ouvrir le widget.
      await waitForHubSpotConversations(HUBSPOT_WIDGET_TIMEOUT_MS);
      await openHubSpotWidget();

      setOpen(false);
      setForm(initialForm);
      setErrors({});
      setTouched({});
    } catch (error) {
      // Diagnostic réservé au développement : en production le détail n'apporte
      // rien au visiteur et expose le fonctionnement interne dans la console.
      if (process.env.NODE_ENV !== "production") {
        console.error("Erreur lors de la soumission:", error);
      }
      setFormError(
        "Impossible d’ouvrir le chat pour le moment. Vérifiez votre connexion, puis réessayez."
      );
      window.requestAnimationFrame(() => formErrorRef.current?.focus());
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onRequestChat]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setFormError(null);
    setWiggle(false);
    window.requestAnimationFrame(() => openButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    dialogRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCancel();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => document.removeEventListener("keydown", handleDialogKeyDown);
  }, [handleCancel, open]);

  return (
    <div
      className={`fixed right-6 z-[9999] transition-[bottom] duration-300 ${
        bannerVisible ? "bottom-44 sm:bottom-28" : "bottom-6"
      }`}
    >
      {!open && (
        <div className="flex flex-col items-end gap-3">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              Une question ?
            </p>
          </div>

          <button
            ref={openButtonRef}
            onClick={() => {
              setOpen(true);
              setFormError(null);
              setWiggle(false);
              // Le script HubSpot se charge pendant la saisie : au moment de
              // l'envoi, le widget est prêt et la latence reste invisible.
              onRequestChat?.();
            }}
            className={`
              shadow-xl hover:shadow-2xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-[0.98]
              rounded-full w-20 h-20 flex items-center justify-center
              bg-red-primary hover:bg-red-600
              text-white cursor-pointer touch-manipulation
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-primary/30 focus-visible:ring-offset-2
              ${wiggle ? "animate-bounce" : ""}
            `}
            aria-label="Ouvrir le pré‑chat"
            data-testid="open-chat-button"
            style={{ pointerEvents: "auto" }}
          >
            <Chat size={32} weight="bold" aria-hidden="true" />
          </button>
        </div>
      )}

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-preoverlay-title"
          aria-describedby="chat-preoverlay-description"
          tabIndex={-1}
          className="w-[320px] overscroll-contain rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl focus:outline-none"
          data-testid="chat-preoverlay"
          style={{ pointerEvents: "auto" }}
        >
          <h3
            id="chat-preoverlay-title"
            className="mb-2 text-pretty font-bold text-gray-900"
          >
            Avant de commencer
          </h3>
          <p
            id="chat-preoverlay-description"
            className="mb-3 text-sm text-gray-600"
          >
            On fait connaissance en quelques infos simples.
          </p>

          <form onSubmit={handleSubmit} className="space-y-2">
            {FIELDS.map(({
              name,
              label,
              type,
              required,
              autoComplete,
              inputMode,
              testId,
              errorTestId,
            }) => (
              <div key={name}>
                <label
                  htmlFor={`chat-${name}`}
                  className="mb-1 block text-xs font-semibold text-gray-700"
                >
                  {label}
                  {required && (
                    <>
                      <span aria-hidden="true"> *</span>
                      <span className="sr-only"> (obligatoire)</span>
                    </>
                  )}
                </label>
                <Input
                  id={`chat-${name}`}
                  name={name}
                  type={type || "text"}
                  autoComplete={autoComplete}
                  inputMode={inputMode}
                  spellCheck={name === "email" ? false : undefined}
                  aria-required={required || undefined}
                  aria-invalid={Boolean(errors[name] && touched[name])}
                  aria-describedby={
                    errors[name] && touched[name] ? errorTestId : undefined
                  }
                  value={form[name]}
                  onChange={(e) => updateField(name, e.target.value)}
                  onBlur={() => handleBlur(name)}
                  className={errors[name] && touched[name] ? "border-red-primary" : ""}
                  data-testid={testId}
                />
                {errors[name] && touched[name] && (
                  <p
                    id={errorTestId}
                    className="mt-1 text-xs text-red-primary"
                    data-testid={errorTestId}
                  >
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            {formError && (
              <p
                ref={formErrorRef}
                role="status"
                aria-live="polite"
                tabIndex={-1}
                className="rounded-lg border border-red-primary/30 bg-red-primary/5 p-2 text-sm text-red-primary focus:outline-none"
                data-testid="chat-submit-error"
              >
                {formError}
              </p>
            )}

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 touch-manipulation rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-[color,background-color,transform] duration-300 hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                data-testid="cancel-button"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 touch-manipulation rounded-lg bg-red-primary px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:bg-red-600 active:scale-[0.98] disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
                data-testid="submit-button"
              >
                {isSubmitting ? "Ouverture…" : "Ouvrir le chat"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

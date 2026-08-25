"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RGPD_RIGHTS } from "@/lib/rgpd/rights";

type Status = "idle" | "sending" | "success" | "error";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    __e2iSetRgpdTurnstileToken?: (token: string) => void;
  }
}

/**
 * Dépôt d'une demande d'exercice de droits RGPD.
 *
 * La validation côté client sert le confort de l'utilisateur, pas la
 * sécurité : la route /api/rgpd/demande revalide tout, seule source de
 * vérité. On refuse néanmoins un envoi sans droit coché ici, pour éviter
 * qu'un aller-retour réseau soit nécessaire à dire une évidence.
 */
export function RgpdRequestForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRights, setSelectedRights] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [company, setCompany] = useState("");
  const [formStartedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    window.__e2iSetRgpdTurnstileToken = setTurnstileToken;
    return () => {
      delete window.__e2iSetRgpdTurnstileToken;
    };
  }, []);

  function toggleRight(id: string) {
    setSelectedRights((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (selectedRights.length === 0) {
      setError("Sélectionnez au moins un droit à exercer.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/rgpd/demande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-E2I-Form": "rgpd-rights",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          // L'ordre suit la liste de référence, pas l'ordre des clics :
          // l'email interne reste lisible quel que soit le parcours.
          requestTypes: RGPD_RIGHTS.filter((right) =>
            selectedRights.includes(right.id)
          ).map((right) => right.id),
          details,
          company,
          formStartedAt,
          turnstileToken,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
      setStatus("error");
    } catch {
      setError("Une erreur réseau est survenue. Veuillez réessayer.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-dark">
          Votre demande est enregistrée
        </h2>
        <p className="mb-4 text-gray-600">
          Un accusé de réception vient de vous être envoyé à l&rsquo;adresse{" "}
          <strong>{email}</strong>. Conservez-le : il atteste de votre
          démarche.
        </p>
        <p className="text-gray-600">
          Nous vous répondrons dans un délai d&rsquo;un mois à compter de
          aujourd&rsquo;hui. Un justificatif d&rsquo;identité pourra vous être
          demandé avant toute communication de données personnelles.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
    >
      {TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <fieldset className="mb-8">
        <legend className="mb-4 text-lg font-bold text-gray-dark">
          Vos coordonnées
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="rgpd-firstname"
              className="mb-1 block text-sm font-medium text-gray-dark"
            >
              Prénom <span className="text-red-primary">*</span>
            </label>
            <Input
              id="rgpd-firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="rgpd-lastname"
              className="mb-1 block text-sm font-medium text-gray-dark"
            >
              Nom <span className="text-red-primary">*</span>
            </label>
            <Input
              id="rgpd-lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="rgpd-email"
              className="mb-1 block text-sm font-medium text-gray-dark"
            >
              Adresse email <span className="text-red-primary">*</span>
            </label>
            <Input
              id="rgpd-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <p className="mt-1 text-xs text-gray-secondary">
              L&rsquo;accusé de réception et notre réponse seront envoyés à
              cette adresse.
            </p>
          </div>

          <div>
            <label
              htmlFor="rgpd-phone"
              className="mb-1 block text-sm font-medium text-gray-dark"
            >
              Téléphone <span className="text-gray-secondary">(facultatif)</span>
            </label>
            <Input
              id="rgpd-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-1 text-lg font-bold text-gray-dark">
          Droits que vous souhaitez exercer{" "}
          <span className="text-red-primary">*</span>
        </legend>
        <p className="mb-4 text-sm text-gray-secondary">
          Vous pouvez en sélectionner plusieurs.
        </p>

        <div className="space-y-3">
          {RGPD_RIGHTS.map((right) => (
            <div
              key={right.id}
              className="flex gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-red-primary/40"
            >
              <input
                type="checkbox"
                id={`rgpd-right-${right.id}`}
                checked={selectedRights.includes(right.id)}
                onChange={() => toggleRight(right.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-red-primary"
              />
              <label
                htmlFor={`rgpd-right-${right.id}`}
                className="cursor-pointer"
              >
                <span className="block font-semibold text-gray-dark">
                  {right.label}{" "}
                  <span className="font-normal text-gray-secondary">
                    ({right.article})
                  </span>
                </span>
                <span className="block text-sm text-gray-600">
                  {right.description}
                </span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mb-8">
        <label
          htmlFor="rgpd-details"
          className="mb-1 block text-sm font-medium text-gray-dark"
        >
          Précisions <span className="text-gray-secondary">(facultatif)</span>
        </label>
        <Textarea
          id="rgpd-details"
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Décrivez votre demande : traitement concerné, période, adresse email utilisée lors d’un formulaire…"
        />
      </div>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="rgpd-company">Entreprise</label>
        <Input
          id="rgpd-company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div
          className="mb-4 min-h-16"
          aria-label="Vérification anti-robot"
        >
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-callback="__e2iSetRgpdTurnstileToken"
            data-theme="light"
          />
        </div>
      ) : null}

      {error && (
        <p role="alert" className="mb-4 text-sm font-medium text-red-primary">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "sending" || Boolean(TURNSTILE_SITE_KEY && !turnstileToken)}
        className="w-full sm:w-auto"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>

      <p className="mt-4 text-xs text-gray-secondary">
        Les données saisies dans ce formulaire ne servent qu&rsquo;au
        traitement de votre demande. Elles sont conservées trois ans à des fins
        de preuve, conformément à la recommandation de la CNIL.
      </p>
    </form>
  );
}

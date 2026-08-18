"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  getConsent,
  acceptCookies,
  declineCookies,
  CONSENT_CHANGE_EVENT,
} from "@/lib/analytics/consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Côté client uniquement : on n'affiche que si aucun choix n'a été fait.
    const sync = () => setVisible(getConsent() === null);
    sync();

    // « Gérer mes cookies » (footer) efface le choix mémorisé et émet cet
    // événement : sans cette écoute, le bandeau ne reviendrait qu'au prochain
    // chargement de page et le retrait paraîtrait sans effet.
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  const handleAccept = useCallback(async () => {
    await acceptCookies();
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    declineCookies();
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-[10000] bg-blue-marine text-white px-4 py-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed">
          Nous utilisons des cookies pour mesurer l&apos;audience du site et
          améliorer votre expérience.{" "}
          <Link href="/politique-confidentialite" className="underline">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded border border-white/60 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded bg-red-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

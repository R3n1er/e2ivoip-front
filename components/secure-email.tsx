"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  EMAIL_CONTACT_PAGE,
  type EmailAddressKey,
} from "@/lib/constants/emails";
import { decodeEmail, getMaskedEmailLabel } from "@/lib/email/decode-email";
import { openMailto } from "@/lib/email/open-mailto";

type SecureEmailProps = {
  address: EmailAddressKey;
  /** contact = lien /contact ; mailto = ouverture client mail au clic */
  mode?: "contact" | "mailto";
  className?: string;
  /** Surcharge du libellé masqué (ex. « Nous écrire ») */
  label?: string;
};

export function SecureEmail({
  address,
  mode = "contact",
  className = "",
  label,
}: SecureEmailProps) {
  const display = label ?? getMaskedEmailLabel(address);

  if (mode === "contact") {
    return (
      <Link
        href={EMAIL_CONTACT_PAGE}
        className={`hover:text-red-primary transition-colors ${className}`}
        title="Page contact"
      >
        {display}
      </Link>
    );
  }

  const handleMailto = () => {
    openMailto(decodeEmail(address));
  };

  return (
    <button
      type="button"
      onClick={handleMailto}
      className={`cursor-pointer bg-transparent border-0 p-0 text-inherit hover:text-red-primary transition-colors ${className}`}
      title="Ouvrir votre client mail"
    >
      {display}
    </button>
  );
}

type SecureMailtoButtonProps = {
  address: EmailAddressKey;
  children: ReactNode;
  icon?: import("@phosphor-icons/react").Icon | string;
  className?: string;
  variant?: "marine" | "primary";
};

/** Bouton style CTA qui n’expose pas mailto: dans le HTML. */
export function SecureMailtoButton({
  address,
  children,
  icon,
  className = "",
  variant = "marine",
}: SecureMailtoButtonProps) {
  const handleMailto = () => {
    openMailto(decodeEmail(address));
  };

  const spanClass =
    variant === "marine"
      ? "block bg-blue-marine text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em]"
      : "block bg-red-primary text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em]";

  return (
    <button
      type="button"
      onClick={handleMailto}
      className={`monolith-btn ${className}`}
    >
      <span className={spanClass}>
        {icon && (() => { const IconComp = typeof icon === 'string' ? undefined : icon; return IconComp ? <IconComp size={16} weight="bold" className="inline mr-2 align-middle" aria-hidden="true" /> : null; })()}
        {children}
      </span>
    </button>
  );
}

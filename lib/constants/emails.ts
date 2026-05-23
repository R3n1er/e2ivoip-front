/**
 * Adresses email publiques — valeurs encodées (Base64), jamais en clair dans le JSX/HTML.
 * Décodage uniquement côté client au clic (voir `decodeEmail`).
 */
export type EmailAddressKey = "contact" | "assistance" | "sales";

/** Préfixe affiché dans l’UI masquée (sans domaine). */
export const EMAIL_DISPLAY_PREFIX: Record<EmailAddressKey, string> = {
  contact: "contact",
  assistance: "assistance",
  sales: "commerciaux",
};

/** Payloads Base64 des adresses (ne pas décoder dans le rendu SSR). */
export const EMAIL_PAYLOADS: Record<EmailAddressKey, string> = {
  contact: "Y29udGFjdEBlMmktdm9pcC5jb20=",
  assistance: "YXNzaXN0YW5jZUBlMmktdm9pcC5jb20=",
  sales: "Y29tbWVyY2lhdXhAZTJpLXZvaXAuY29t",
};

export const EMAIL_CONTACT_PAGE = "/contact";

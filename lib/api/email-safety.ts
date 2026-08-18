/**
 * Assainissement des données publiques avant expédition d'un email.
 *
 * Les routes publiques du site envoient des emails depuis un domaine
 * authentifié SPF/DKIM : un champ de formulaire non traité permettrait à un
 * tiers d'insérer un lien de phishing crédible dans un message signé par
 * nous, ou d'ajouter un destinataire caché via un en-tête forgé. Ces
 * fonctions sont volontairement regroupées pour que toute nouvelle route
 * hérite des mêmes garde-fous.
 */

/** Normalise une valeur non fiable en chaîne bornée. */
export function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

/** Échappe les métacaractères HTML avant interpolation dans l'email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Échappe puis convertit les retours ligne : l'ordre est important. */
export function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

/** Un en-tête d'email tient sur une ligne : tout CR/LF est retiré. */
export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

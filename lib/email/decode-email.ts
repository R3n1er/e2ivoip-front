import {
  EMAIL_DISPLAY_PREFIX,
  EMAIL_PAYLOADS,
  type EmailAddressKey,
} from "@/lib/constants/emails";

function decodePayload(payload: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(payload, "base64").toString("utf8");
  }
  return atob(payload);
}

/** Décode une adresse — à appeler uniquement au clic (client). */
export function decodeEmail(key: EmailAddressKey): string {
  const payload = EMAIL_PAYLOADS[key];
  if (!payload) {
    throw new Error(`Unknown email key: ${key}`);
  }
  return decodePayload(payload);
}

/** Libellé masqué pour l’affichage (aucun caractère du domaine réel). */
export function getMaskedEmailLabel(key: EmailAddressKey): string {
  return `${EMAIL_DISPLAY_PREFIX[key]}@…`;
}

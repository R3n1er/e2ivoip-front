/**
 * Lien Microsoft Bookings de prise de rendez-vous commercial (créneau partagé
 * Valérie LOPES / Alban RENIER, 30 min). Confirmé par Alban le 2026-10-13.
 *
 * NE PAS utiliser `RDVCommercialE2IVOIP@e2i-voip.com` (sans le « 1 ») : page
 * concurrente encore publiée, à dépublier côté Bookings.
 */
export const BOOKINGS_COMMERCIAL_URL =
  "https://bookings.cloud.microsoft/book/RDVcommercialE2IVOIP1@e2i-voip.com/";

/**
 * Source d'iframe telle que fournie par le code d'intégration Bookings
 * (2026-10-27) : le paramètre évite une redirection dans le cadre.
 */
export const BOOKINGS_COMMERCIAL_EMBED_URL = `${BOOKINGS_COMMERCIAL_URL}?ismsaljsauthenabled`;

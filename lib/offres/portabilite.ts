/**
 * Tarifs de portabilité — source : catalogue articles HubSpot du 2026-10-07
 * (cerveau-e2ivoip 10-wiki/adv/2026-10-07_catalogue-articles-e2ivoip-hubspot.md),
 * qui fait foi sur la grille. Frais uniques, HT.
 *
 * Décision Alban 2026-11-03 : ce service est facturé. Le test
 * tests/portabilite-payante.test.tsx interdit toute annonce de gratuité.
 */
export const TARIFS_PORTABILITE = {
  /** FAS - Portabilité numéro NDI et SDA unique. */
  numeroUniqueHT: 60,
  /** FAS - Portabilité tranche de 10 numéros SDA consécutifs. */
  trancheDe10HT: 90,
  /** FAS - Fiabilisation portabilité de ligne NDI (si nécessaire). */
  fiabilisationHT: 60,
} as const;

/** Phrase courte réutilisable dans les textes du site. */
export const PORTABILITE_TARIF_TEXTE = `${TARIFS_PORTABILITE.numeroUniqueHT} € HT pour un numéro, ${TARIFS_PORTABILITE.trancheDe10HT} € HT par tranche de 10 numéros consécutifs`;

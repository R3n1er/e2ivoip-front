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

/**
 * Création de numéro — même catalogue (« Création Numero SDA France et DOM »
 * 50 € ponctuel, « Redevance mensuelle numero SDA » 2 €/mois). Le numéro
 * personnalisé avec suite logique est aussi à 50 € en frais unique.
 */
export const TARIFS_CREATION_NUMERO = {
  creationSdaHT: 50,
  redevanceMensuelleHT: 2,
  suiteLogiqueHT: 50,
} as const;

export const CREATION_NUMERO_TARIF_TEXTE = `${TARIFS_CREATION_NUMERO.creationSdaHT} € HT de création, puis ${TARIFS_CREATION_NUMERO.redevanceMensuelleHT} € HT par mois et par numéro`;

/** Phrase courte réutilisable dans les textes du site. */
export const PORTABILITE_TARIF_TEXTE = `${TARIFS_PORTABILITE.numeroUniqueHT} € HT pour un numéro, ${TARIFS_PORTABILITE.trancheDe10HT} € HT par tranche de 10 numéros consécutifs`;

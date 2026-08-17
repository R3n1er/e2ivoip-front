/**
 * Formulaires Tally — source de vérité unique.
 *
 * Chaque identifiant correspond à un formulaire réel de l'espace E2I VoIP.
 * Ne jamais y écrire d'URL descriptive (« tally.so/r/trunk-sip-devis ») : ce
 * type de placeholder a déjà été livré en 404. Un identifiant Tally est une
 * chaîne alphanumérique courte générée par la plateforme.
 *
 * Vérification : `tests/lib/tally-urls.test.ts`.
 */

const TALLY_BASE = "https://tally.so/r";

export const TALLY_FORMS = {
  /** Devis Trunk SIP opérateur */
  TRUNK_SIP: `${TALLY_BASE}/mDY1bl`,
  /** Étude de portabilité des numéros */
  PORTABILITE: `${TALLY_BASE}/w5r7rM`,
  /** Devis 3CX PRO (dédié) et IA */
  VOIP_3CX_PRO: `${TALLY_BASE}/EkALv4`,
  /** Devis 3CX SMB (mutualisé, 3 à 10 utilisateurs) */
  VOIP_3CX_SMB: `${TALLY_BASE}/44Gprk`,
  /** Projet d'intégration d'un PBX existant */
  PROJET_PBX: `${TALLY_BASE}/mJgNo7`,
  /** Devis PBX Yeastar */
  YEASTAR: `${TALLY_BASE}/ODVoz8`,
  /** Demande de rappel Aircall */
  AIRCALL: `${TALLY_BASE}/kdr0do`,
  /** Trunk SIP pour agents vocaux IA */
  AGENTS_IA: `${TALLY_BASE}/ODVd1K`,
} as const;

export type TallyFormKey = keyof typeof TALLY_FORMS;

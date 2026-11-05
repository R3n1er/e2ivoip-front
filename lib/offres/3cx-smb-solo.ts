/**
 * Offre 3CX SMB SOLO — source unique des prix, volumes et conditions.
 *
 * Base : devis DV-3CX-2026-10102 (Palmeiras Karaib', 2026-10-29) et plaquette
 * commerciale « 3CX SMB SOLO — Entrepreneur solo » édition 2026-11
 * (`~/Cowork/e2ivoip/plaquette-3cx-solo-entrepreneur/`).
 *
 * ⚠️ Une seule offre du catalogue s'adresse à UN utilisateur. Au-delà, c'est
 * `3cx-smb-mutualisee` (3 à 8 utilisateurs, tarif par utilisateur) ou 3CX PRO.
 *
 * Les frais annexes (création de numéro, portabilité) ne sont PAS recopiés ici :
 * ils vivent dans `lib/offres/portabilite.ts`, qui fait foi. Un montant dupliqué
 * finit toujours par diverger de sa source.
 */

export interface FormuleSmbSolo {
  id: string;
  nom: string;
  /** Prix mensuel HT, pour l'entreprise (un seul utilisateur). */
  prixMensuelHT: number;
  /** Heures d'appels entrants incluses par mois. */
  heuresEntrantes: number;
  /** Heures d'appels sortants incluses par mois. */
  heuresSortantes: number;
  /** Formule mise en avant visuellement. */
  vedette: boolean;
  /** Usage type, en une phrase. */
  usage: string;
}

export const FORMULES_SMB_SOLO: readonly FormuleSmbSolo[] = [
  {
    id: "essential",
    nom: "Essential",
    prixMensuelHT: 39.99,
    heuresEntrantes: 3,
    heuresSortantes: 3,
    vedette: false,
    usage: "Pour un usage régulier mais modéré.",
  },
  {
    id: "advanced",
    nom: "Advanced",
    prixMensuelHT: 49.99,
    heuresEntrantes: 5,
    heuresSortantes: 5,
    vedette: true,
    usage: "Le double de volume, pour 10 € de plus.",
  },
];

export const CONDITIONS_SMB_SOLO = {
  utilisateurs: 1,
  appelsSimultanes: 2,
  engagementMois: 12,
  /** Durée retenue pour les équivalents « nombre d'appels ». */
  dureeAppelMinutes: 3,
  /** Jours ouvrés moyens par mois, pour ramener un volume au quotidien. */
  joursOuvresParMois: 21,
} as const;

/** Ce qui est compris dans l'abonnement, quel que soit le forfait. */
export const INCLUS_SMB_SOLO: readonly string[] = [
  "1 utilisateur 3CX et son application mobile",
  "2 appels simultanés — le second appelant est mis en attente",
  "1 numéro géographique local",
  "Les heures de communication de la formule",
  "Hébergement, mises à jour et sauvegardes",
  "Assistance standard par mail et téléphone",
];

/** Prestations facturées en plus de l'abonnement. */
export const HORS_FORFAIT_SMB_SOLO: readonly { libelle: string; prix: string }[] = [
  { libelle: "Mise en service", prix: "sur devis" },
  { libelle: "Dépassement des heures", prix: "au tarif en vigueur" },
  { libelle: "Téléphone IP de bureau", prix: "optionnel" },
  { libelle: "Intervention sur site", prix: "150 € HT/h" },
];

/**
 * Repères d'usage : à combien d'appels correspond chaque forfait.
 * Calculé, jamais saisi à la main — 3 h = 180 min.
 */
export function repereAppels(formule: FormuleSmbSolo) {
  const { dureeAppelMinutes, joursOuvresParMois } = CONDITIONS_SMB_SOLO;
  const entrants = Math.floor((formule.heuresEntrantes * 60) / dureeAppelMinutes);
  const sortants = Math.floor((formule.heuresSortantes * 60) / dureeAppelMinutes);
  return {
    entrants,
    sortants,
    entrantsParJour: Math.round(entrants / joursOuvresParMois),
    sortantsParJour: Math.round(sortants / joursOuvresParMois),
  };
}

/**
 * Offre 3CX Free — source unique des prix, plafonds et limites.
 *
 * Validée par Alban le 2026-11-02. Base : handoff cerveau-e2ivoip
 * 30-handoffs/2026-11-02-3cx-4as-licence-gratuite.md, puis arbitrages :
 * - marge ×2 minimum sur tout coût, appels entrants compris ;
 * - prix par ENTREPRISE (une instance), jamais par utilisateur ;
 * - hors plafond d'usage : grille au compteur (déjà margée ×2 au moins).
 *
 * Licence : édition 3CX « 4SC Basic Free » auto-hébergée. 4 appels
 * simultanés et 10 utilisateurs au plus, sans montée possible : au-delà,
 * licence payante à partir de 8 appels simultanés (SMB ou PRO).
 * Fonctions vérifiées sur la matrice officielle le 2026-11-02 :
 * https://www.3cx.com/ordering/pricing/features/
 *
 * ⚠️ Publication : le raccordement du trunk E2I à 3CX Free doit être validé
 * par un pilote avant la mise en production de la page.
 */

export type ModeFormule = "compteur" | "illimite";

export interface PlafondUsage {
  /** Minutes sortantes vers les fixes France métropolitaine + DOM, par mois. */
  fixes: number;
  /** Minutes sortantes vers les mobiles France métropolitaine + DOM, par mois. */
  mobiles: number;
  /** Minutes entrantes, par mois. */
  entrants: number;
}

export interface Formule3cxFree {
  id: string;
  nom: string;
  mode: ModeFormule;
  /** Appels simultanés vers l'extérieur (capacité du trunk). */
  appels: 2 | 4;
  /** Prix mensuel HT, hébergement + trunk + 1 numéro compris. */
  prixMensuelHT: number;
  /** `null` au compteur : chaque minute est facturée. */
  plafond: PlafondUsage | null;
}

export const FORMULES_3CX_FREE: readonly Formule3cxFree[] = [
  { id: "compteur-2", nom: "Compteur 2 appels", mode: "compteur", appels: 2, prixMensuelHT: 76, plafond: null },
  { id: "compteur-4", nom: "Compteur 4 appels", mode: "compteur", appels: 4, prixMensuelHT: 96, plafond: null },
  {
    id: "illimite-2",
    nom: "Illimité 2 appels",
    mode: "illimite",
    appels: 2,
    prixMensuelHT: 139,
    plafond: { fixes: 1500, mobiles: 1000, entrants: 3000 },
  },
  {
    id: "illimite-4",
    nom: "Illimité 4 appels",
    mode: "illimite",
    appels: 4,
    prixMensuelHT: 219,
    plafond: { fixes: 3000, mobiles: 2000, entrants: 6000 },
  },
] as const;

export const CONDITIONS_3CX_FREE = {
  miseEnServiceHT: 199,
  engagementMois: 12,
  utilisateursMax: 10,
  appelsSimultanesMax: 4,
  /** Part hébergement géré, incluse dans chaque formule. */
  hebergementMensuelHT: 29,
} as const;

/** Ce que couvre l'hébergement géré (29 € HT/mois, inclus dans les formules). */
export const HEBERGEMENT_INCLUS = [
  "Serveur dédié à votre entreprise, adresse IP fixe et certificat de sécurité",
  "Mises à jour de 3CX et du système, sur une plage planifiée",
  "Renouvellement annuel de la licence gratuite, géré par E2I VoIP",
  "Sauvegarde quotidienne conservée 7 jours et sauvegarde hebdomadaire hors serveur",
  "Envoi des e-mails du standard (messagerie, notifications)",
  "Surveillance du serveur et alerte en cas de panne",
  "Support panne aux heures ouvrées",
  "Une modification simple par mois : utilisateur, horaires ou message d'accueil",
] as const;

/** Prestations facturées en plus (catalogue existant). */
export const HORS_FORFAIT = [
  { libelle: "Maintenance pour modifications fréquentes", prix: "49 € HT/mois" },
  { libelle: "Formation des utilisateurs", prix: "250 € HT par session" },
  { libelle: "Portabilité de vos numéros", prix: "90 € HT par tranche de 10" },
] as const;

/** Fonctions incluses dans la licence 3CX Free (matrice officielle 3CX). */
export const FONCTIONS_3CX_FREE = [
  "Jusqu'à 10 utilisateurs et 4 appels simultanés",
  "Applications 3CX pour iPhone, Android, Windows et navigateur web",
  "Accueil personnalisé et serveur vocal (SVI) à plusieurs niveaux",
  "Groupes d'appels : sonnerie simultanée ou à tour de rôle",
  "Horaires d'ouverture, fermeture et jours fériés",
  "Transferts, parcage et journaux d'appels",
] as const;

/** Ce que la licence 3CX Free ne fait pas. */
export const LIMITES_3CX_FREE = [
  "Pas de postes IP de bureau ni de téléphones DECT : uniquement les applications 3CX",
  "Pas de files d'attente : un groupe d'appels ne met pas l'appelant en attente jusqu'à ce qu'un collaborateur se libère",
  "Pas d'enregistrement des conversations",
  "Pas d'intégration CRM, d'API ni d'agent IA",
  "Pas plus de 4 appels simultanés : au-delà, il faut une licence payante à partir de 8 appels",
] as const;

/** Conditions d'usage raisonnable de l'illimité. */
export const FAIR_USE_3CX_FREE = [
  "Usage humain : pas de centre d'appels, d'automate ni de renvoi permanent vers un mobile",
  "Mayotte, l'international et les numéros spéciaux sont facturés à la grille au compteur",
  "Au-delà du plafond, les minutes sont facturées à la grille au compteur",
  "Plafond dépassé deux mois de suite : nous vous proposons la formule supérieure",
] as const;

// ── Encart « Quelle version 3CX ? » ──────────────────────────────────────────

export interface ReponsesChoix3cx {
  /** Files d'attente, enregistrement des appels ou intégration CRM. */
  avance: boolean;
  /** Postes IP de bureau ou téléphones DECT. */
  postesBureau: boolean;
  /** Plus de 4 appels simultanés ou plus de 10 utilisateurs. */
  auDela4Appels: boolean;
}

export interface Recommandation3cx {
  version: "free" | "smb" | "pro";
  titre: string;
  raison: string;
  href: string;
  lien: string;
}

/**
 * Logique de l'encart. PRO l'emporte (seule édition avec files d'attente,
 * enregistrement et CRM) ; SMB couvre les postes de bureau et les besoins
 * au-delà de 4 appels ; sinon 3CX Free suffit.
 */
export function recommanderVersion3cx(r: ReponsesChoix3cx): Recommandation3cx {
  if (r.avance) {
    return {
      version: "pro",
      titre: "3CX PRO",
      raison:
        "Files d'attente, enregistrement des appels et intégration CRM ne sont disponibles qu'avec 3CX PRO, sur une instance dédiée.",
      href: "/3cx-pro",
      lien: "Voir 3CX PRO",
    };
  }
  if (r.postesBureau || r.auDela4Appels) {
    return {
      version: "smb",
      titre: "3CX SMB",
      raison: r.auDela4Appels
        ? "La licence gratuite s'arrête à 4 appels simultanés. Au-delà, il faut une licence payante, à partir de 8 appels simultanés : 3CX SMB y répond, postes de bureau compris."
        : "3CX SMB accepte les postes IP de bureau et les téléphones DECT, que la licence gratuite n'accepte pas. Licence payante à partir de 8 appels simultanés.",
      href: "/telephonie-entreprise/3cx-smb-mutualisee",
      lien: "Voir 3CX SMB",
    };
  }
  return {
    version: "free",
    titre: "3CX Free",
    raison:
      "Une petite équipe sur smartphone et ordinateur, sans file d'attente : la licence gratuite suffit. Vous payez l'hébergement et le trunk SIP, pas la licence.",
    href: "/3cx-free",
    lien: "Voir les formules 3CX Free",
  };
}

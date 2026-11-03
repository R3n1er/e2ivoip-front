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
  "Mises à jour de 3CX et du système sur un créneau prévu à l'avance",
  "Renouvellement annuel de la licence gratuite, géré par E2I VoIP",
  "Sauvegarde quotidienne conservée 7 jours et sauvegarde hebdomadaire hors serveur",
  "Envoi des e-mails du standard : messagerie et notifications",
  "Surveillance du serveur et alerte en cas de panne",
  "Assistance en cas de panne aux heures ouvrées",
  "Une modification simple par mois : utilisateur, horaires ou message d'accueil",
] as const;

/** Prestations facturées en plus (catalogue existant). */
export const HORS_FORFAIT = [
  { libelle: "Maintenance : modifications au-delà de celle incluse chaque mois, selon le périmètre du devis", prix: "49 € HT/mois" },
  { libelle: "Formation des utilisateurs", prix: "250 € HT par session" },
  { libelle: "Portabilité : conservation de vos numéros", prix: "90 € HT par tranche de 10" },
] as const;

/** Fonctions incluses dans la licence 3CX Free (matrice officielle 3CX). */
export const FONCTIONS_3CX_FREE = [
  "Jusqu'à 10 utilisateurs et 4 appels simultanés, c'est-à-dire en même temps",
  "Applications 3CX pour iPhone, Android, Windows et navigateur web",
  "Accueil personnalisé et serveur vocal interactif (SVI) : menus de choix à plusieurs niveaux",
  "Groupes d'appels : les collaborateurs sont appelés en même temps ou à tour de rôle",
  "Gestion des horaires d'ouverture, de fermeture et des jours fériés",
  "Transferts, parcage (mise en attente pour reprendre l'appel ailleurs) et journaux d'appels (historique)",
] as const;

/** Ce que la licence 3CX Free ne fait pas. */
export const LIMITES_3CX_FREE = [
  "Pas de postes IP de bureau ni de téléphones sans fil DECT : vous utilisez uniquement les applications 3CX",
  "Pas de files d'attente : un groupe d'appels ne met pas l'appelant en attente jusqu'à ce qu'un collaborateur se libère",
  "Pas d'enregistrement des conversations",
  "Pas de connexion à votre outil de suivi client (CRM), d'interface avec d'autres logiciels (API) ni d'agent d'intelligence artificielle (IA)",
  "Pas plus de 4 appels simultanés, sans extension possible : au-delà, il faut une licence payante à partir de 8 appels",
] as const;

/** Conditions d'usage raisonnable de l'illimité. */
export const FAIR_USE_3CX_FREE = [
  "Réservé aux appels entre personnes : pas de centre d'appels, d'automate ni de renvoi permanent vers un mobile",
  "Mayotte n'est pas comprise dans l'illimité : ses appels, comme l'international et les numéros spéciaux, sont facturés selon la grille au compteur",
  "Au-delà de chaque plafond mensuel, les minutes sont facturées selon la grille au compteur",
  "Plafond dépassé deux mois de suite : nous vous proposons la formule supérieure, ou une licence payante si vous êtes déjà en Illimité 4 appels",
] as const;

// ── Encart « Quelle version 3CX ? » ──────────────────────────────────────────

export interface ReponsesChoix3cx {
  /** Files d'attente, enregistrement des appels ou intégration CRM. */
  avance: boolean;
  /** Plus de 8 utilisateurs : seuil de recommandation E2I vers PRO (validé le 2026-11-03). */
  plusDe8Utilisateurs: boolean;
  /** Postes IP de bureau / DECT, ou plus de 4 appels simultanés. */
  postesOuPlusDe4Appels: boolean;
}

export interface Recommandation3cx {
  version: "free" | "smb" | "pro";
  titre: string;
  raison: string;
  href: string;
  lien: string;
}

/**
 * Logique de l'encart.
 * - PRO : seule édition avec files d'attente, enregistrement et CRM, et
 *   recommandée par E2I au-delà de 8 utilisateurs (la licence gratuite
 *   accepte techniquement 10 utilisateurs).
 * - SMB : postes de bureau, ou plus de 4 appels simultanés (licence payante
 *   à partir de 8 appels), jusqu'à 8 utilisateurs.
 * - Sinon 3CX Free.
 */
export function recommanderVersion3cx(r: ReponsesChoix3cx): Recommandation3cx {
  if (r.avance || r.plusDe8Utilisateurs) {
    return {
      version: "pro",
      titre: "3CX PRO",
      raison: r.avance
        ? "Files d'attente, enregistrement des appels et intégration CRM ne sont disponibles qu'avec 3CX PRO, sur une instance dédiée."
        : "Au-delà de 8 utilisateurs, nous recommandons 3CX PRO : il se dimensionne selon vos appels simultanés, sur une instance dédiée.",
      href: "/3cx-pro",
      lien: "Voir 3CX PRO",
    };
  }
  if (r.postesOuPlusDe4Appels) {
    return {
      version: "smb",
      titre: "3CX SMB",
      raison:
        "3CX SMB accepte les postes IP de bureau et les téléphones DECT, et dépasse les 4 appels simultanés de la licence gratuite. Licence payante à partir de 8 appels simultanés, jusqu'à 8 utilisateurs.",
      href: "/telephonie-entreprise/3cx-smb-mutualisee",
      lien: "Voir 3CX SMB",
    };
  }
  return {
    version: "free",
    titre: "3CX Free",
    raison:
      "Pour votre petite équipe sur smartphone et ordinateur, sans file d'attente, 3CX Free répond aux besoins indiqués. La licence est gratuite. Vous payez l'hébergement géré, le trunk SIP et le numéro.",
    href: "/3cx-free",
    lien: "Voir les formules 3CX Free",
  };
}

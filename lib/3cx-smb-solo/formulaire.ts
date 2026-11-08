/**
 * Constantes partagées par le formulaire de devis 3CX SMB SOLO et sa route API.
 *
 * Une seule source pour les choix proposés et le texte du consentement : le
 * texte enregistré dans le lead est exactement celui que le client a lu.
 */

export const EN_TETE_FORMULAIRE = "devis-3cx-smb-solo";

/** Longueur maximale du message libre (formulaire et route). */
export const LONGUEUR_MAX_MESSAGE = 5000;

/** Formules de l'offre. `a-conseiller` laisse le choix à E2I. */
export const FORMULES = [
  { valeur: "essential", libelle: "Essential — 39,99 € HT/mois (3 h + 3 h)" },
  { valeur: "advanced", libelle: "Advanced — 49,99 € HT/mois (5 h + 5 h)" },
  { valeur: "a-conseiller", libelle: "Je ne sais pas encore, conseillez-moi" },
] as const;

export type FormuleChoisie = (typeof FORMULES)[number]["valeur"];

/** Ce que le client veut faire de son numéro. */
export const BESOINS_NUMEROS = [
  { valeur: "portabilite", libelle: "Je garde mon numéro actuel (portabilité)" },
  { valeur: "creation", libelle: "Je veux un nouveau numéro local" },
  { valeur: "sans-numero", libelle: "Je n'ai pas encore de numéro à transférer" },
  { valeur: "a-definir", libelle: "Je ne sais pas encore" },
] as const;

export type BesoinNumeros = (typeof BESOINS_NUMEROS)[number]["valeur"];

export const TEXTE_CONSENTEMENT_RGPD =
  "J’accepte qu’E2I VoIP traite mes données pour la relation commerciale liée à ma demande.";

export function estFormule(v: unknown): v is FormuleChoisie {
  return FORMULES.some((f) => f.valeur === v);
}

export function libelleFormule(v: FormuleChoisie): string {
  return FORMULES.find((f) => f.valeur === v)!.libelle;
}

export function estBesoinNumeros(v: unknown): v is BesoinNumeros {
  return BESOINS_NUMEROS.some((b) => b.valeur === v);
}

export function libelleBesoin(v: BesoinNumeros): string {
  return BESOINS_NUMEROS.find((b) => b.valeur === v)!.libelle;
}

/**
 * L'offre ne comprend qu'un numéro. On le déclare au workflow plutôt que de
 * laisser un champ vide : `nombreNumeros` reste null quand il n'y a rien à
 * porter ni à créer.
 */
export function nombreNumerosPour(besoin: BesoinNumeros): number | null {
  return besoin === "portabilite" || besoin === "creation" ? 1 : null;
}

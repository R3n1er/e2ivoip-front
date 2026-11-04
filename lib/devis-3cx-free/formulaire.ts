/**
 * Constantes partagées par le formulaire de devis 3CX Free et sa route API.
 * Une seule source pour les choix proposés et le texte du consentement :
 * le texte enregistré dans le lead est exactement celui que le client a vu.
 */

export const EN_TETE_FORMULAIRE = "devis-3cx-free";

/** Longueur maximale du message libre (formulaire et route). */
export const LONGUEUR_MAX_MESSAGE = 5000;

export const BESOINS_NUMEROS = [
  { valeur: "creation", libelle: "Créer de nouveaux numéros" },
  { valeur: "portabilite", libelle: "Conserver mes numéros actuels (portabilité)" },
  { valeur: "creation-et-portabilite", libelle: "Les deux : créer et conserver des numéros" },
  { valeur: "a-definir", libelle: "Je ne sais pas encore" },
] as const;

export type BesoinNumeros = (typeof BESOINS_NUMEROS)[number]["valeur"];

export const TEXTE_CONSENTEMENT_RGPD =
  "J’accepte qu’E2I VoIP traite mes données pour la relation commerciale liée à ma demande.";

export function estBesoinNumeros(v: unknown): v is BesoinNumeros {
  return BESOINS_NUMEROS.some((b) => b.valeur === v);
}

export function libelleBesoin(v: BesoinNumeros): string {
  return BESOINS_NUMEROS.find((b) => b.valeur === v)!.libelle;
}

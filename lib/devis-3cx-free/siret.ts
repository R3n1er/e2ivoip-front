/**
 * Vérification du SIRET saisi dans le formulaire de devis 3CX Free.
 *
 * Arbitrage Alban (2026-11-03) : un SIRET fermé, introuvable ou non vérifié
 * ne bloque jamais l'envoi. Le statut accompagne le lead jusqu'à n8n, qui
 * s'en sert pour le tri.
 *
 * Source : API Recherche d'entreprises (DINUM), publique et sans clé,
 * alimentée par la base Sirene de l'INSEE.
 */

export const API_RECHERCHE_ENTREPRISES =
  "https://recherche-entreprises.api.gouv.fr/search";

const DELAI_MAX_MS = 3000;
const SIREN_LA_POSTE = "356000000";

export type StatutSiret =
  | "actif"
  | "ferme"
  | "introuvable"
  | "non-verifie"
  | "format-invalide"
  | "non-renseigne";

export interface VerificationSiret {
  siret: string;
  statut: StatutSiret;
  raisonSociale?: string;
}

type FetchLike = (
  input: string,
  init?: { signal?: AbortSignal; headers?: Record<string, string> },
) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>;

export function normaliserSiret(valeur: string): string {
  return valeur.replace(/[\s.]/g, "");
}

function cleLuhnValide(chiffres: string): boolean {
  let somme = 0;
  for (let i = 0; i < chiffres.length; i++) {
    let n = Number(chiffres[chiffres.length - 1 - i]);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    somme += n;
  }
  return somme % 10 === 0;
}

/** 14 chiffres et clé de Luhn ; La Poste suit une règle propre (somme modulo 5). */
export function siretFormatValide(siret: string): boolean {
  if (!/^\d{14}$/.test(siret)) return false;
  if (cleLuhnValide(siret)) return true;
  if (siret.startsWith(SIREN_LA_POSTE)) {
    const somme = [...siret].reduce((s, c) => s + Number(c), 0);
    return somme % 5 === 0;
  }
  return false;
}

interface Etablissement {
  siret?: string;
  etat_administratif?: string;
}

interface ResultatApi {
  nom_complet?: string;
  siege?: Etablissement;
  matching_etablissements?: Etablissement[];
}

export async function verifierSiret(
  saisie: string,
  fetchImpl: FetchLike = fetch as unknown as FetchLike,
): Promise<VerificationSiret> {
  const siret = normaliserSiret(saisie ?? "");
  if (!siret) return { siret, statut: "non-renseigne" };
  if (!siretFormatValide(siret)) return { siret, statut: "format-invalide" };

  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), DELAI_MAX_MS);
  try {
    const reponse = await fetchImpl(
      `${API_RECHERCHE_ENTREPRISES}?q=${siret}&per_page=5`,
      { signal: controleur.signal, headers: { Accept: "application/json" } },
    );
    if (!reponse.ok) return { siret, statut: "non-verifie" };

    const data = (await reponse.json()) as { results?: ResultatApi[] };
    for (const resultat of data.results ?? []) {
      const etablissements = [
        ...(resultat.matching_etablissements ?? []),
        ...(resultat.siege ? [resultat.siege] : []),
      ];
      const trouve = etablissements.find((e) => e.siret === siret);
      if (trouve) {
        return {
          siret,
          statut: trouve.etat_administratif === "A" ? "actif" : "ferme",
          raisonSociale: resultat.nom_complet,
        };
      }
    }
    return { siret, statut: "introuvable" };
  } catch {
    return { siret, statut: "non-verifie" };
  } finally {
    clearTimeout(minuteur);
  }
}

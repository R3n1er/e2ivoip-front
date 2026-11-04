/**
 * Vérification du SIRET saisi dans le formulaire de devis 3CX Free.
 *
 * Arbitrage Alban (2026-11-03) : un SIRET introuvable ou fermé ne bloque
 * jamais l'envoi. Le lead part avec un statut que n8n utilise pour le tri.
 * Source : API Recherche d'entreprises (recherche-entreprises.api.gouv.fr),
 * publique et sans clé, alimentée par la base Sirene de l'INSEE.
 */
import {
  normaliserSiret,
  siretFormatValide,
  verifierSiret,
} from "@/lib/devis-3cx-free/siret";

function reponseApi(body: unknown, ok = true, status = 200) {
  return jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  });
}

describe("SIRET — format", () => {
  it("retire espaces et points", () => {
    expect(normaliserSiret(" 552 081 317 66522 ")).toBe("55208131766522");
    expect(normaliserSiret("552.081.317.66522")).toBe("55208131766522");
  });

  it("accepte un SIRET de 14 chiffres dont la clé de Luhn est juste", () => {
    expect(siretFormatValide("55208131766522")).toBe(true);
  });

  it("refuse une clé de Luhn fausse", () => {
    expect(siretFormatValide("55208131766523")).toBe(false);
  });

  it("refuse une longueur différente de 14 chiffres", () => {
    expect(siretFormatValide("552081317")).toBe(false);
    expect(siretFormatValide("5520813176652A")).toBe(false);
  });

  it("accepte les établissements de La Poste (règle de la somme modulo 5)", () => {
    expect(siretFormatValide("35600000000001")).toBe(true);
  });
});

describe("SIRET — vérification sur l'API de l'État", () => {
  it("non renseigné : aucun appel réseau", async () => {
    const fetchMock = jest.fn();
    const r = await verifierSiret("", fetchMock);
    expect(r.statut).toBe("non-renseigne");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("format invalide : aucun appel réseau", async () => {
    const fetchMock = jest.fn();
    const r = await verifierSiret("12345", fetchMock);
    expect(r.statut).toBe("format-invalide");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("établissement actif", async () => {
    const fetchMock = reponseApi({
      results: [
        {
          nom_complet: "ELECTRICITE DE FRANCE (EDF)",
          matching_etablissements: [
            { siret: "55208131766522", etat_administratif: "A" },
          ],
        },
      ],
    });
    const r = await verifierSiret("552 081 317 66522", fetchMock);
    expect(r).toEqual({
      siret: "55208131766522",
      statut: "actif",
      raisonSociale: "ELECTRICITE DE FRANCE (EDF)",
    });
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      "recherche-entreprises.api.gouv.fr/search?q=55208131766522",
    );
  });

  it("établissement fermé", async () => {
    const fetchMock = reponseApi({
      results: [
        {
          nom_complet: "ANCIENNE SARL",
          matching_etablissements: [
            { siret: "55208131766522", etat_administratif: "F" },
          ],
        },
      ],
    });
    const r = await verifierSiret("55208131766522", fetchMock);
    expect(r.statut).toBe("ferme");
    expect(r.raisonSociale).toBe("ANCIENNE SARL");
  });

  it("SIRET absent des résultats : introuvable", async () => {
    const fetchMock = reponseApi({ results: [] });
    const r = await verifierSiret("55208131766522", fetchMock);
    expect(r.statut).toBe("introuvable");
  });

  it("API en erreur : non vérifié, sans exception", async () => {
    const fetchMock = reponseApi({}, false, 503);
    const r = await verifierSiret("55208131766522", fetchMock);
    expect(r.statut).toBe("non-verifie");
  });

  it("réseau coupé : non vérifié, sans exception", async () => {
    const fetchMock = jest.fn().mockRejectedValue(new Error("timeout"));
    const r = await verifierSiret("55208131766522", fetchMock);
    expect(r.statut).toBe("non-verifie");
  });
});

import {
  copperSentence,
  enumererFr,
  STANDARD_TELEPHONE_TERRITORIES,
  type CopperSchedule,
} from "@/lib/territoires/standard-telephonique";

/**
 * `copperSentence` produit la phrase la plus sensible du silo : elle porte
 * des dates réglementaires opposables et s'affiche sur quatre pages.
 *
 * Elle existe parce que le JSX énumérait les communes avec un `.map()` sans
 * séparateur. La Guyane n'ayant qu'une commune par liste, le défaut restait
 * invisible ; la Guadeloupe, qui en a deux, aurait rendu « Basse-Terre
 * bascule au 31 janvier 2027Deshaies bascule… ».
 *
 * Les tests de contrat du silo vérifient que les bons mots sont présents.
 * Ceux-ci vérifient que la phrase est française — ce qu'aucun `toMatch` sur
 * un fichier source ne peut établir.
 */
const SOURCE = {
  lot: "lot 3",
  sourceLabel: "Arcep",
  sourceUrl: "https://www.arcep.fr/",
};

describe("enumererFr", () => {
  it("rend une liste vide comme chaîne vide", () => {
    expect(enumererFr([])).toBe("");
  });

  it("n'ajoute rien à un élément seul", () => {
    expect(enumererFr(["Kourou"])).toBe("Kourou");
  });

  it("relie deux éléments par « et »", () => {
    expect(enumererFr(["Basse-Terre", "Deshaies"])).toBe(
      "Basse-Terre et Deshaies",
    );
  });

  it("sépare par des virgules et termine par « et »", () => {
    expect(enumererFr(["A", "B", "C"])).toBe("A, B et C");
  });
});

describe("copperSentence", () => {
  it("dit qu'aucune date n'est publiée plutôt que d'en inventer une", () => {
    const vide: CopperSchedule = {
      ...SOURCE,
      alreadyClosed: [],
      scheduled: [],
    };
    expect(copperSentence(vide)).toMatch(/aucune commune/i);
  });

  it("cite le fait accompli avant l'échéance à venir", () => {
    const schedule: CopperSchedule = {
      ...SOURCE,
      alreadyClosed: [
        { commune: "Rémire-Montjoly", commercialDate: null, technicalDate: "2025" },
      ],
      scheduled: [
        {
          commune: "Kourou",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
      ],
    };
    const phrase = copperSentence(schedule);
    expect(phrase.indexOf("Rémire-Montjoly")).toBeLessThan(
      phrase.indexOf("Kourou"),
    );
  });

  it("sépare les communes énumérées", () => {
    const schedule: CopperSchedule = {
      ...SOURCE,
      alreadyClosed: [],
      scheduled: [
        {
          commune: "Basse-Terre",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
        {
          commune: "Deshaies",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
      ],
    };
    // Le défaut d'origine : « 2027Deshaies », sans espace ni séparateur.
    expect(copperSentence(schedule)).not.toMatch(/\d(?=[A-ZÉÈÀÎÔÛŒ])/);
    expect(copperSentence(schedule)).toMatch(/Basse-Terre et Deshaies|Basse-Terre .* et Deshaies/);
  });

  it("ne répète pas un arrêt commercial partagé derrière chaque commune", () => {
    const schedule: CopperSchedule = {
      ...SOURCE,
      alreadyClosed: [],
      scheduled: [
        {
          commune: "Basse-Terre",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
        {
          commune: "Deshaies",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
      ],
    };
    const occurrences = copperSentence(schedule).match(
      /nouvelles souscriptions/g,
    );
    expect(occurrences?.length).toBe(1);
  });

  it("n'attache pas l'arrêt commercial à une commune déjà coupée", () => {
    // Une commune déjà coupée n'a pas de date commerciale : la mention ne
    // doit pas pouvoir se lire comme la concernant.
    const schedule: CopperSchedule = {
      ...SOURCE,
      alreadyClosed: [
        { commune: "Petit-Bourg", commercialDate: null, technicalDate: "2025" },
      ],
      scheduled: [
        {
          commune: "Basse-Terre",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
      ],
    };
    const phrase = copperSentence(schedule);
    const mention = phrase.slice(phrase.indexOf("souscriptions"));
    expect(mention).not.toMatch(/Petit-Bourg/);
  });

  it("n'écrit pas « au » devant une date qui n'en est pas une", () => {
    // La Réunion : « janvier, mai ou octobre 2029 selon la commune » n'est
    // pas une date ferme — « bascule au janvier… » n'est pas français.
    const schedule: CopperSchedule = {
      ...SOURCE,
      lot: "lot 5",
      alreadyClosed: [],
      scheduled: [
        {
          commune: "tout le département",
          commercialDate: null,
          technicalDate: "janvier, mai ou octobre 2029 selon la commune",
        },
      ],
    };
    expect(copperSentence(schedule)).not.toMatch(/au janvier/);
    expect(copperSentence(schedule)).toMatch(/en janvier/);
  });
});

describe("copperSentence — sur les données réelles", () => {
  it.each(STANDARD_TELEPHONE_TERRITORIES.map((t) => [t.label, t]))(
    "%s produit une phrase française bien formée",
    (_label, territoire) => {
      const phrase = copperSentence(
        (territoire as (typeof STANDARD_TELEPHONE_TERRITORIES)[number]).copper,
      );
      expect(phrase.length).toBeGreaterThan(20);
      // Pas de mot collé à un chiffre, pas de double espace, pas de
      // ponctuation orpheline — les trois signatures d'un template cassé.
      expect(phrase).not.toMatch(/\d(?=[A-ZÉÈÀÎÔÛŒ])/);
      expect(phrase).not.toMatch(/ {2}/);
      expect(phrase).not.toMatch(/,\s*\.|\.\s*,|,\s*et\s*\./);
    },
  );
});

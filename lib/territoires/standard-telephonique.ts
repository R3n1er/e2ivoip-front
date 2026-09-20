/**
 * Registre central de la section /standard-telephonique.
 *
 * Source unique pour : le hub, les pages territoriales, le fil d'Ariane et le
 * sitemap. Aucune URL de cette section ne doit être codée en dur ailleurs.
 *
 * ── Pourquoi cette section existe ────────────────────────────────────────────
 * « Standard téléphonique » est le vocabulaire de l'acheteur ; « IPBX » et
 * « Trunk SIP » celui du technicien. Le site n'avait aucune page servant cette
 * requête (relevé du 19/09/2026 : /standard-telephonique → 404).
 *
 * ── Règle de publication ─────────────────────────────────────────────────────
 * Un territoire n'est `published: true` que s'il porte du contenu réellement
 * unique : numéro local, calendrier cuivre du territoire avec source, zones
 * d'intervention, référence client. Une déclinaison où seul le nom change est
 * une page satellite — pattern pénalisé, et sans effet de bord positif.
 *
 * ── Interdits ────────────────────────────────────────────────────────────────
 * - Pas de `LocalBusiness` avec une adresse hors Guyane : le code légal ne
 *   connaît qu'une adresse, à Cayenne. Déclarer un établissement fictif est
 *   risqué. Voir `organizationSchema()` dans lib/structured-data.ts.
 * - Ne jamais nommer un concurrent : le dénigrement est constitué même si les
 *   propos sont exacts dès lors qu'ils sont publics (Cass. com. 7 janvier 2026,
 *   n° 24-18.085).
 */

import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";

/**
 * Une échéance de fermeture du cuivre, pour UNE commune.
 *
 * La granularité est communale et non départementale : l'Arcep publie ses lots
 * commune par commune. Une version antérieure de ce registre ne portait qu'une
 * paire de dates par territoire, ce qui rendait structurellement impossible
 * d'écrire la vérité — la page Guyane annonçait « le cuivre guyanais ferme le
 * 31 janvier 2027 » en listant Rémire-Montjoly, coupée depuis 2025.
 */
export interface CopperCommune {
  /** Nom de la commune, tel qu'il s'écrit sur la page. */
  commune: string;
  /** Fin des nouvelles souscriptions cuivre. `null` si le lot n'en publie pas. */
  commercialDate: string | null;
  /** Coupure physique des lignes — au moins 12 mois après la commerciale. */
  technicalDate: string;
}

export interface CopperSchedule {
  /**
   * Communes DÉJÀ coupées. C'est l'argument le plus fort du corpus : un
   * précédent ne se conteste pas et ne périme jamais. À citer avant les
   * échéances futures, jamais après.
   */
  alreadyClosed: CopperCommune[];
  /** Communes dont la fermeture est planifiée et sourcée. */
  scheduled: CopperCommune[];
  /** Libellé court du lot, tel que publié par le régulateur. */
  lot: string;
  /** Source vérifiable — jamais une date de mémoire. */
  sourceLabel: string;
  sourceUrl: string;
}

/**
 * Prochaine échéance connue d'un territoire, pour les usages où une seule date
 * peut être affichée (carte de liste, meta description).
 *
 * Retourne `null` quand aucune commune n'a d'échéance planifiée : le territoire
 * n'a alors pas de date à annoncer, et la page doit le dire plutôt que d'en
 * inventer une.
 */
export function nextCopperDeadline(copper: CopperSchedule): CopperCommune | null {
  return copper.scheduled[0] ?? null;
}

export interface StandardTerritory {
  /** Segment d'URL sous /standard-telephonique. */
  slug: string;
  /** Libellé affiché (H1, fil d'Ariane). */
  label: string;
  /** Nom du territoire tel qu'utilisé dans la home (« Antilles-Guyane »…). */
  longLabel: string;
  /**
   * Adjectif du territoire, accordé au féminin (« la réalité guyanaise »).
   * Stocké plutôt que dérivé : aucune règle ne fait passer de « Guadeloupe »
   * à « guadeloupéenne » ni de « La Réunion » à « réunionnaise ».
   */
  adjective: string;
  /**
   * Le territoire en position de sujet, article compris : « La Guyane
   * relève du lot 3 ». Stocké parce que l'article ne se dérive pas du
   * label — « La Réunion » le porte déjà, « Guyane » non.
   */
  subjectLabel: string;
  /**
   * Préposition de lieu : « en Guyane », « à La Réunion ». Le français ne
   * la dérive pas du genre — les noms d'île en prennent une autre — donc
   * elle est déclarée plutôt que devinée.
   */
  preposition: "en" | "à";
  /** Titre SEO de la page. */
  title: string;
  /** Meta description. */
  description: string;
  /** Indicatif local, ex. « 0594 ». */
  indicatif: string;
  /** Numéro local réel — importé de la source unique, jamais recopié. */
  phone: { territory: string; number: string; tel: string };
  /** Calendrier de fermeture du cuivre du territoire. */
  copper: CopperSchedule;
  /** Zones d'intervention réellement desservies. */
  zones: string[];
  /**
   * Preuve locale nommée. Référence un client figurant déjà publiquement dans
   * components/clients-carousel.tsx — ne rien inventer.
   */
  localProof: { client: string; sector: string }[];
  /** Contexte terrain propre au territoire (activité économique, contraintes). */
  context: string;
  /**
   * Nature de la présence d'E2I VoIP sur le territoire.
   *
   * ⚠️ Ce champ existe parce qu'il ne se déduit PAS du territoire. E2I VoIP
   * est immatriculée en Guyane et nulle part ailleurs : écrire « entreprise
   * immatriculée en Martinique » en interpolant le label produirait une
   * affirmation fausse, et une mention d'établissement inexacte engage au
   * titre de l'article L121-2 du code de la consommation.
   *
   * - `established` : siège social sur place, mention d'immatriculation permise.
   * - `served`      : territoire desservi depuis le siège guyanais.
   */
  presence: "established" | "served";
  /**
   * Fuseau du support, tel qu'il s'annonce au client. Les Antilles-Guyane
   * partagent UTC−4 ; La Réunion est à UTC+4, soit huit heures d'écart —
   * une promesse de support « sur votre horaire » y serait mensongère si
   * elle était recopiée depuis la page guyanaise.
   */
  supportTimezone: string;
  /** Page publiée ? Voir « règle de publication » en tête de fichier. */
  published: boolean;
}

export const STANDARD_TELEPHONE_HUB = {
  slug: "standard-telephonique",
  title: "Standard téléphonique entreprise DOM",
  description:
    "Remplacer votre PABX avant la fermeture du cuivre : standard hébergé pour les entreprises de Guyane, des Antilles et de La Réunion. Opérateur et intégrateur.",
} as const;

/**
 * Numéro local par territoire — lu depuis la source unique
 * (`lib/constants/phone-numbers.ts`) plutôt que recopié, pour qu'une
 * correction du numéro ne puisse pas se désynchroniser d'une page.
 */
function phoneFor(territory: string) {
  const found = TERRITORY_PHONES.find((p) => p.territory === territory);
  if (!found) {
    throw new Error(
      `Aucun numéro local déclaré pour « ${territory} » — vérifier lib/constants/phone-numbers.ts`,
    );
  }
  return found;
}

export const STANDARD_TELEPHONE_TERRITORIES: readonly StandardTerritory[] = [
  {
    slug: "guyane",
    label: "Guyane",
    adjective: "guyanaise",
    subjectLabel: "La Guyane",
    preposition: "en",
    longLabel: "Guyane",
    title: "Standard téléphonique en Guyane",
    description:
      "Standard téléphonique en Guyane : opérateur établi à Cayenne, ligne locale 0594, portabilité incluse. Le cuivre ferme déjà — vérifions votre commune.",
    indicatif: "0594",
    phone: phoneFor("Guyane"),
    copper: {
      // Source : docs/ligne-editoriale.md, tableau vérifié le 2026-08-30.
      alreadyClosed: [
        {
          commune: "Rémire-Montjoly",
          commercialDate: null,
          technicalDate: "2025",
        },
      ],
      scheduled: [
        {
          commune: "Kourou",
          commercialDate: "31 janvier 2026",
          technicalDate: "31 janvier 2027",
        },
      ],
      lot: "lot 3",
      sourceLabel: "Arcep / Orange — plan de fermeture du réseau cuivre",
      sourceUrl:
        "https://www.arcep.fr/nos-sujets/la-fermeture-du-reseau-cuivre.html",
    },
    zones: [
      "Cayenne",
      "Rémire-Montjoly",
      "Matoury",
      "Kourou",
      "Saint-Laurent-du-Maroni",
      "Macouria",
    ],
    localProof: [
      { client: "APAJH Guyane", sector: "médico-social" },
      { client: "Zoo de Guyane", sector: "loisirs et tourisme" },
    ],
    presence: "established",
    supportTimezone: "heure de Guyane (UTC−3)",
    context:
      "Le tissu économique guyanais combine structures médico-sociales, collectivités, sous-traitants du spatial à Kourou et commerces de Cayenne. Beaucoup de ces sites ont été raccordés en cuivre et basculent au 31 janvier 2027 : le standard doit être migré avant la coupure, pas après.",
    published: true,
  },
  {
    slug: "martinique",
    label: "Martinique",
    adjective: "martiniquaise",
    subjectLabel: "La Martinique",
    preposition: "en",
    longLabel: "Martinique",
    title: "Standard téléphonique en Martinique",
    description:
      "Standard téléphonique d'entreprise en Martinique : migration de votre PABX, portabilité des numéros 0596 et calendrier communal de fermeture du cuivre.",
    indicatif: "0596",
    phone: phoneFor("Martinique"),
    copper: {
      // Source : docs/ligne-editoriale.md, tableau vérifié le 2026-08-30.
      // Aucune commune martiniquaise n'est publiée au 31/01/2027 : ne pas
      // reprendre l'échéance guyanaise ou guadeloupéenne par analogie de lot.
      alreadyClosed: [
        { commune: "Schœlcher", commercialDate: null, technicalDate: "2025" },
      ],
      scheduled: [],
      lot: "lot 3",
      sourceLabel: "Arcep / Orange — plan de fermeture du réseau cuivre",
      sourceUrl:
        "https://www.arcep.fr/nos-sujets/la-fermeture-du-reseau-cuivre.html",
    },
    zones: ["Fort-de-France", "Le Lamentin", "Ducos", "Schœlcher", "Le Robert"],
    localProof: [{ client: "Zoo de Martinique", sector: "loisirs et tourisme" }],
    presence: "served",
    supportTimezone: "heure des Antilles (UTC−4)",
    context:
      "La Martinique concentre son activité tertiaire autour de Fort-de-France et de la zone d'activité du Lamentin. Les parcs installés y sont souvent des PABX constructeur arrivés en fin de commercialisation : c'est le moment de basculer vers un standard hébergé.",
    // Publié le 2026-09-19 : contenu propre vérifié — calendrier cuivre
    // distinct (Schœlcher coupée, aucune échéance 2027), zones propres,
    // contexte économique du Lamentin, client nommable.
    published: true,
  },
  {
    slug: "guadeloupe",
    label: "Guadeloupe",
    adjective: "guadeloupéenne",
    subjectLabel: "La Guadeloupe",
    preposition: "en",
    longLabel: "Guadeloupe",
    title: "Standard téléphonique en Guadeloupe",
    description:
      "Standard téléphonique en Guadeloupe : migration de votre PABX, portabilité des numéros 0590 et calendrier communal de fermeture du cuivre.",
    indicatif: "0590",
    phone: phoneFor("Guadeloupe"),
    copper: {
      // Source : docs/ligne-editoriale.md, tableau vérifié le 2026-08-30.
      alreadyClosed: [
        { commune: "Petit-Bourg", commercialDate: null, technicalDate: "2025" },
      ],
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
      lot: "lot 3",
      sourceLabel: "Arcep / Orange — plan de fermeture du réseau cuivre",
      sourceUrl:
        "https://www.arcep.fr/nos-sujets/la-fermeture-du-reseau-cuivre.html",
    },
    zones: [
      "Baie-Mahault",
      "Pointe-à-Pitre",
      "Les Abymes",
      "Le Gosier",
      "Petit-Bourg",
    ],
    localProof: [{ client: "Zoo de Guadeloupe", sector: "loisirs et tourisme" }],
    presence: "served",
    supportTimezone: "heure des Antilles (UTC−4)",
    context:
      "La zone industrielle de Jarry à Baie-Mahault concentre une part importante de l'activité économique de l'archipel, avec des sites multi-bâtiments où le routage des appels entre services est le premier irritant.",
    // Publié le 2026-09-19 : calendrier distinct (Petit-Bourg coupée,
    // Basse-Terre et Deshaies au 31/01/2027), contexte propre à Jarry,
    // client nommable.
    published: true,
  },
  {
    slug: "la-reunion",
    label: "La Réunion",
    adjective: "réunionnaise",
    subjectLabel: "La Réunion",
    preposition: "à",
    longLabel: "La Réunion",
    title: "Standard téléphonique à La Réunion",
    description:
      "Standard téléphonique à La Réunion : migration de votre PABX, portabilité des numéros 0263 et calendrier communal de fermeture du cuivre.",
    indicatif: "0263",
    phone: phoneFor("La Reunion"),
    copper: {
      // Source : docs/ligne-editoriale.md, tableau vérifié le 2026-08-30.
      // Le lot 5 s'étale sur trois vagues (janvier, mai, octobre 2029) et
      // l'Arcep ne publie pas d'arrêt commercial : `commercialDate: null`
      // plutôt qu'une date fabriquée par analogie avec le lot 3.
      alreadyClosed: [],
      scheduled: [
        {
          commune: "tout le département",
          commercialDate: null,
          technicalDate: "janvier, mai ou octobre 2029 selon la commune",
        },
      ],
      lot: "lot 5",
      sourceLabel: "Arcep / Orange — plan de fermeture du réseau cuivre",
      sourceUrl:
        "https://www.arcep.fr/nos-sujets/la-fermeture-du-reseau-cuivre.html",
    },
    zones: ["Saint-Denis", "Saint-Pierre", "Le Port", "Saint-Paul", "Le Tampon"],
    localProof: [],
    presence: "served",
    supportTimezone: "heure de La Réunion (UTC+4)",
    context:
      "À La Réunion, la fermeture technique relève du lot 5 : la coupure intervient en 2029, plus tard qu'aux Antilles-Guyane. L'échéance reste à préparer, notamment pour les sites qui utilisent encore fax, alarmes ou terminaux de paiement sur paire de cuivre.",
    // Publié le 2026-09-19 sur arbitrage d'Alban, malgré `localProof` vide :
    // aucun client réunionnais n'est nommable à ce jour. La page tient sur
    // son calendrier propre (lot 5, 2029 — huit ans après les Antilles), ses
    // zones et son contexte fax/alarmes/TPE. Dès qu'une référence locale est
    // publiable, l'ajouter ici : c'est le seul élément qu'un concurrent ne
    // peut pas reproduire.
    published: true,
  },
] as const;

/** URL canonique d'une page de la section. Sans argument : le hub. */
export function standardTelephoneHref(slug?: string): string {
  return slug
    ? `/standard-telephonique/${slug}`
    : `/${STANDARD_TELEPHONE_HUB.slug}`;
}

/** Territoires dont la page est publiée (source des liens et du sitemap). */
export function getPublishedTerritories(): StandardTerritory[] {
  return STANDARD_TELEPHONE_TERRITORIES.filter((t) => t.published);
}

/** Un territoire par son slug. `undefined` s'il n'existe pas. */
export function getTerritory(slug: string): StandardTerritory | undefined {
  return STANDARD_TELEPHONE_TERRITORIES.find((t) => t.slug === slug);
}

/**
 * Énumération française : « A », « A et B », « A, B et C ».
 *
 * Écrite parce que la page territoriale énumérait ses communes avec un
 * `.map()` JSX sans séparateur. La Guyane n'ayant qu'une commune par liste,
 * le défaut restait invisible — la Guadeloupe, qui en a deux au calendrier,
 * aurait rendu « Basse-Terre bascule au 31 janvier 2027Deshaies bascule… ».
 */
export function enumererFr(elements: string[]): string {
  if (elements.length === 0) return "";
  if (elements.length === 1) return elements[0];
  return `${elements.slice(0, -1).join(", ")} et ${elements[elements.length - 1]}`;
}

/**
 * Phrase décrivant l'état du cuivre sur un territoire, prête à afficher.
 *
 * Le fait accompli passe avant l'échéance : une commune déjà coupée est une
 * preuve, une date future se discute. Les trois cas — déjà coupées,
 * planifiées, aucune des deux — produisent chacun une phrase correcte, ce
 * qu'un template unique ne permettait pas (la Martinique n'a aucune commune
 * planifiée, La Réunion aucune commune déjà coupée).
 */
export function copperSentence(copper: CopperSchedule): string {
  const coupees = copper.alreadyClosed.map(
    (c) => `${c.commune} est coupée depuis ${c.technicalDate}`,
  );
  // « au 31 janvier 2027 » se dit, « au janvier, mai ou octobre 2029 selon
  // la commune » non : la préposition ne s'applique qu'à une date ferme.
  const dateAvecPreposition = (date: string) =>
    /^\d/.test(date) ? `au ${date}` : `en ${date}`;

  // Quand toutes les communes planifiées partagent le même arrêt commercial
  // — le cas du lot 3 — la mention est sortie en facteur commun plutôt que
  // répétée à l'identique derrière chaque commune.
  const commerciales = new Set(
    copper.scheduled.map((c) => c.commercialDate ?? ""),
  );
  const commercialeCommune =
    commerciales.size === 1 ? [...commerciales][0] : "";

  const prevues = copper.scheduled.map((c) => {
    const base = `${c.commune} bascule ${dateAvecPreposition(c.technicalDate)}`;
    if (commercialeCommune || !c.commercialDate) return base;
    return `${base}, après un arrêt des nouvelles souscriptions au ${c.commercialDate}`;
  });

  const phrases = [...coupees, ...prevues];
  if (phrases.length === 0) {
    return "aucune commune n'a encore de date de fermeture publiée";
  }

  const enumeration = enumererFr(phrases);
  if (!commercialeCommune) return enumeration;

  // L'arrêt commercial est une PHRASE à part, pas une apposition. Accolé à
  // l'énumération par une virgule, il se lisait comme ne concernant que la
  // dernière commune citée — ou pire, comme s'appliquant aussi aux communes
  // déjà coupées, qui n'ont par définition aucune date commerciale.
  const communes = enumererFr(copper.scheduled.map((c) => c.commune));
  return `${enumeration}. À ${communes}, les nouvelles souscriptions cuivre se sont arrêtées au ${commercialeCommune}`;
}

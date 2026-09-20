/**
 * Identité légale et sous-traitants — source unique des pages légales.
 *
 * Mentions légales, politique de confidentialité et page d'exercice des
 * droits lisent ces constantes. Objectif : qu'une correction d'adresse ou
 * l'ajout d'un sous-traitant ne puisse pas être appliqué à une page en
 * oubliant l'autre, situation qui a produit les incohérences corrigées ici.
 *
 * ── Arbitrages Alban (2026-09-19), tous vérifiés ────────────────────────────
 *  - Forme juridique : entreprise individuelle sous régime micro-entreprise
 *    (auto-entrepreneur). Ni capital social ni RCS : ces mentions n'existent
 *    pas pour une EI, les afficher serait une fausse déclaration d'identité.
 *  - TVA : « TVA non applicable ». DOUBLE fondement — l'article 293 B du CGI
 *    (franchise en base du micro-entrepreneur) ET l'article 294, qui place la
 *    Guyane hors du champ territorial de la TVA. Mention obligatoire sur les
 *    supports commerciaux, absente jusqu'ici.
 *  - Pas d'adresse e-mail publiée : le site expose un formulaire de contact
 *    et quatre numéros de téléphone. L'article 6-III de la LCEN exige des
 *    « coordonnées permettant de contacter rapidement » l'éditeur, sans
 *    imposer l'e-mail ; publier une adresse exposerait la boîte au spam.
 *    Corollaire : le formulaire doit rester fonctionnel — c'est lui qui
 *    porte la conformité.
 *  - Directeur de la publication : Alban RENIER (confirmé).
 */

export const COMPANY = {
  legalName: "E2I ASSISTANCE",
  brand: "E2I VoIP",
  siret: "51743457700014",
  siren: "517 434 577",
  /**
   * Forme juridique — mention obligatoire (LCEN art. 6-III), absente de la
   * page jusqu'au 2026-09-19 : elle affichait le nom sans dire ce qu'il
   * désigne.
   */
  legalForm: "Entreprise individuelle (micro-entreprise)",
  // Ni RCS ni capital social : une entreprise individuelle n'en a pas.
  // Les afficher — même « pour faire sérieux » — serait une fausse mention
  // d'identité de l'éditeur. Ne jamais ajouter ces champs ici.
  ape: "6203Z",
  apeLabel: "Gestion d’installations informatiques",
  publicationDirector: "Alban RENIER",
  address: {
    street: "23 Chemin Troubiran",
    postalCode: "97300",
    city: "Cayenne",
    country: "Guyane française",
  },
  /**
   * Mention TVA. Obligatoire sur les supports commerciaux d'un assujetti
   * qui ne facture pas de TVA (CGI art. 293 B), et doublement fondée ici :
   * la Guyane est hors du champ territorial de la taxe (CGI art. 294).
   * Aucun numéro de TVA intracommunautaire n'est donc à publier.
   */
  vatStatus: "TVA non applicable — articles 293 B et 294 du CGI",
  siteUrl: "www.e2i-voip.com",
} as const;

/** Date affichée en pied des pages légales. */
export const LEGAL_LAST_UPDATE = "24 août 2026";

export const HOSTING = {
  provider: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  site: "vercel.com",
  registrar: "OVHcloud",
  registrarAddress:
    "2 rue Kellermann, 59100 Roubaix, France",
} as const;

export interface SubProcessor {
  name: string;
  purpose: string;
  data: string;
  /** Où les données sont hébergées, et sur quelle base en cas de transfert. */
  location: string;
}

/**
 * Sous-traitants effectivement mobilisés par le site, vérifiés dans le code.
 *
 * PostHog est initialisé sur toutes les pages dès qu'un token est présent
 * (`instrumentation-client.ts`, `capture_pageview: 'history_change'`,
 * `autocapture: true`) : il traite donc réellement des données et doit figurer
 * ici au titre de l'article 28 du RGPD. Son hébergement est européen
 * (`eu.i.posthog.com`).
 */
export const SUB_PROCESSORS: readonly SubProcessor[] = [
  {
    name: "Vercel Inc.",
    purpose:
      "Hébergement du site et mesure d’audience agrégée (Vercel Web Analytics, sans cookie).",
    data: "Adresse IP, journaux de connexion, pages consultées.",
    location:
      "États-Unis — clauses contractuelles types de la Commission européenne.",
  },
  {
    name: "PostHog Inc.",
    purpose:
      "Mesure d’audience et suivi des interactions sur le site (pages consultées, clics, soumissions de formulaires).",
    data:
      "Identifiant pseudonyme de visiteur, pages et interactions observées, données techniques de navigation.",
    location:
      "Hébergement Union européenne (eu.i.posthog.com). La mesure d’audience est active dès la visite ; sans acceptation, aucun identifiant n’est conservé sur votre appareil (session en mémoire, effacée à la fermeture de l’onglet).",
  },
  {
    name: "HubSpot Inc.",
    purpose:
      "Gestion de la relation client, formulaires, chat en ligne et suivi de navigation. Le chat et son suivi sont actifs dès votre arrivée sur le site.",
    data:
      "Identité, coordonnées, contenu de vos demandes, pages consultées.",
    location:
      "Union européenne (instance eu1) — transferts encadrés par les clauses contractuelles types.",
  },
  {
    name: "Resend (Plus Five Five, Inc.)",
    purpose:
      "Acheminement des emails déclenchés par les formulaires du site.",
    data: "Identité, adresse email, contenu du message transmis.",
    location:
      "États-Unis — clauses contractuelles types de la Commission européenne.",
  },
  {
    name: "Tally BV",
    purpose:
      "Formulaires de demande de tarifs et de renseignements intégrés à certaines pages.",
    data: "Identité, coordonnées, réponses saisies dans le formulaire.",
    location: "Belgique — Union européenne.",
  },
] as const;

export interface Processing {
  purpose: string;
  legalBasis: string;
  data: string;
  retention: string;
}

/** Traitements mis en œuvre à travers le site. */
export const PROCESSINGS: readonly Processing[] = [
  {
    purpose: "Répondre à une demande de contact ou de devis",
    legalBasis:
      "Mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).",
    data: "Nom, prénom, email, téléphone, entreprise, contenu de la demande.",
    retention:
      "3 ans à compter du dernier contact resté sans suite commerciale.",
  },
  {
    purpose: "Gérer la relation contractuelle et la facturation",
    legalBasis: "Exécution du contrat et obligations légales comptables.",
    data: "Identité, coordonnées professionnelles, données de facturation.",
    retention:
      "Durée du contrat, puis 10 ans au titre des obligations comptables.",
  },
  {
    purpose: "Produire un message vocal via le Studio Voix Humaines",
    legalBasis:
      "Mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).",
    data:
      "Identité, coordonnées, texte du message, préférences de voix et de musique.",
    retention: "3 ans à compter de la dernière demande.",
  },
  {
    purpose: "Mesurer l’audience du site",
    legalBasis:
      "Votre consentement, recueilli par le bandeau cookies (article 6.1.a du RGPD).",
    data:
      "Pages consultées, provenance, données techniques de navigation. Aucune donnée directement identifiante.",
    retention: "13 mois maximum, conformément à la recommandation de la CNIL.",
  },
  {
    purpose: "Traiter une demande d’exercice de droits RGPD",
    legalBasis:
      "Obligation légale de répondre aux demandes (articles 15 à 22 du RGPD).",
    data:
      "Identité, coordonnées, objet de la demande et éventuel justificatif d’identité.",
    retention:
      "3 ans à des fins de preuve, conformément à la recommandation de la CNIL.",
  },
];

export interface CookieEntry {
  name: string;
  origin: string;
  purpose: string;
  retention: string;
  /** Un traceur soumis à consentement n'est déposé qu'après acceptation. */
  requiresConsent: boolean;
}

/**
 * Traceurs réellement déposés par le site, vérifiés dans le code.
 *
 * Arbitrage Alban (2026-09-19) : PostHog et HubSpot sont chargés dès l'arrivée
 * du visiteur, sans attendre le bandeau — ce sont des outils de travail
 * quotidiens. `requiresConsent` décrit donc ici ce que le code fait vraiment,
 * pas ce qu'on souhaiterait qu'il fasse. Toute valeur `true` doit correspondre
 * à un chargement effectivement conditionné dans le code.
 *
 * HubSpot : monté sans condition (components/layout/layout-client-chrome.tsx).
 * PostHog : initialisé sans condition (instrumentation-client.ts) ; le
 * consentement ne pilote que la persistance (mémoire vs cookie/localStorage).
 */
export const COOKIES: readonly CookieEntry[] = [
  {
    name: "e2i-cookie-consent",
    origin: "E2I VoIP (stockage local, pas un cookie)",
    purpose:
      "Mémoriser votre choix d’accepter ou de refuser la mesure d’audience.",
    retention: "Jusqu’à ce que vous l’effaciez via « Gérer mes cookies ».",
    requiresConsent: false,
  },
  {
    name: "ph_phc_…_posthog",
    origin: "PostHog",
    purpose:
      "Reconnaître votre navigateur d’une visite à l’autre pour la mesure d’audience et le suivi des interactions.",
    retention: "13 mois maximum, conformément à la recommandation de la CNIL.",
    requiresConsent: true,
  },
  {
    name: "__hstc, hubspotutk, __hssc, __hssrc",
    origin: "HubSpot",
    purpose:
      "Reconnaître votre navigateur d’une visite à l’autre pour la mesure d’audience et le chat. Déposés dès votre arrivée sur le site.",
    retention: "6 mois maximum pour le plus long d’entre eux.",
    requiresConsent: false,
  },
  {
    name: "Vercel Web Analytics",
    origin: "Vercel",
    purpose:
      "Compter les visites de façon agrégée. Ce dispositif ne dépose aucun cookie et ne suit pas les visiteurs entre les sites.",
    retention: "Sans objet — aucun identifiant déposé sur votre terminal.",
    requiresConsent: false,
  },
];

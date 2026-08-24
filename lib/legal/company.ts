/**
 * Identité légale et sous-traitants — source unique des pages légales.
 *
 * Mentions légales, politique de confidentialité et page d'exercice des
 * droits lisent ces constantes. Objectif : qu'une correction d'adresse ou
 * l'ajout d'un sous-traitant ne puisse pas être appliqué à une page en
 * oubliant l'autre, situation qui a produit les incohérences corrigées ici.
 *
 * TODO(alban) — informations à obtenir avant publication définitive :
 *  - forme juridique exacte (SARL, SAS…) et montant du capital social ;
 *  - numéro de TVA intracommunautaire, ou mention « TVA non applicable »
 *    (la TVA n'est pas applicable en Guyane, article 294 du CGI) ;
 *  - confirmation qu'Alban RENIER est bien directeur de la publication.
 */

export const COMPANY = {
  legalName: "E2I ASSISTANCE",
  brand: "E2I VoIP",
  siret: "51743457700014",
  siren: "517 434 577",
  rcs: "Cayenne 517 434 577",
  ape: "6203Z",
  apeLabel: "Gestion d’installations informatiques",
  publicationDirector: "Alban RENIER",
  address: {
    street: "23 Chemin Troubiran",
    postalCode: "97300",
    city: "Cayenne",
    country: "Guyane française",
  },
  siteUrl: "www.e2i-voip.com",
} as const;

/** Date affichée en pied des pages légales. */
export const LEGAL_LAST_UPDATE = "24 août 2026";

export const HOSTING = {
  provider: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  site: "vercel.com",
  registrar: "Hostinger International Ltd.",
  registrarAddress:
    "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
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
 * PostHog figure dans les dépendances du projet mais n'est jamais initialisé
 * (aucun `posthog.init`) : il ne collecte donc rien aujourd'hui et n'a pas sa
 * place ici. À réintroduire le jour où il sera réellement activé.
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
    name: "HubSpot Inc.",
    purpose:
      "Gestion de la relation client, formulaires, chat et suivi de navigation après consentement.",
    data:
      "Identité, coordonnées, contenu de vos demandes, pages consultées après consentement.",
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
 * Le bandeau conditionne le chargement du script HubSpot : sans acceptation,
 * aucun cookie de suivi n'est écrit.
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
    name: "__hstc, hubspotutk, __hssc, __hssrc",
    origin: "HubSpot",
    purpose:
      "Reconnaître votre navigateur d’une visite à l’autre pour la mesure d’audience et le chat.",
    retention: "6 mois maximum pour le plus long d’entre eux.",
    requiresConsent: true,
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

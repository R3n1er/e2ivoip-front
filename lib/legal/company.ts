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
export const LEGAL_LAST_UPDATE = "25 août 2026";

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
 * PostHog est initialisé par `instrumentation-client.ts` dès qu'une clé de
 * projet est configurée (`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`), avec
 * autocapture et suivi des navigations : il figure donc dans cette liste.
 * Sans clé (previews, CI), aucune donnée ne part.
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
      "Gestion de la relation client, formulaires, chat en ligne et suivi de navigation.",
    data:
      "Identité, coordonnées, contenu de vos demandes, pages consultées.",
    location:
      "Union européenne (instance eu1) — transferts encadrés par les clauses contractuelles types.",
  },
  {
    name: "PostHog Inc.",
    purpose:
      "Mesure d’audience et analyse d’usage du site (pages vues, clics, soumissions de formulaires).",
    data:
      "Adresse IP, pages consultées, interactions avec l’interface, identifiant de session.",
    location:
      "Union européenne — instance eu.i.posthog.com ; éditeur établi aux États-Unis.",
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

/**
 * Statut d'un traceur vis-à-vis du bandeau de consentement du site.
 *
 * - `exempt` : aucun consentement n'est requis (fonctionnement du site, ou
 *   dispositif ne déposant aucun identifiant sur le terminal) ;
 * - `apres-acceptation` : traceur soumis à consentement, effectivement déposé
 *   seulement après acceptation dans le bandeau ;
 * - `des-larrivee` : traceur soumis à consentement, mais déposé dès l'ouverture
 *   de la première page, avant tout choix du visiteur.
 *
 * Le troisième cas décrit une situation de fait, pas une exemption : il permet
 * au tableau publié de dire ce que le site fait réellement plutôt que ce qu'il
 * devrait faire. Voir la note sous le tableau de la politique de
 * confidentialité, et l'ADR 2026-08-26 côté technique.
 */
export type CookieConsentStatus = "exempt" | "apres-acceptation" | "des-larrivee";

/** Libellés affichés dans la colonne « Consentement » du tableau publié. */
export const COOKIE_CONSENT_LABELS: Record<CookieConsentStatus, string> = {
  exempt: "Non requis",
  "apres-acceptation": "Requis — déposé après acceptation",
  "des-larrivee": "Requis — déposé dès l’arrivée",
};

export interface CookieEntry {
  name: string;
  origin: string;
  purpose: string;
  retention: string;
  /** Statut réel vis-à-vis du bandeau, vérifié dans le code. */
  consent: CookieConsentStatus;
}

/**
 * Traceurs réellement déposés par le site, vérifiés dans le code.
 *
 * Le script HubSpot est chargé sans condition par `HubSpotTracking` (le chat
 * doit rester joignable à tout moment, cf. ADR 2026-08-26) : ses cookies sont
 * donc écrits dès l'arrivée, que le visiteur ait accepté ou non. PostHog, lui,
 * reste en persistance mémoire tant que le bandeau n'a pas été accepté.
 */
export const COOKIES: readonly CookieEntry[] = [
  {
    name: "e2i-cookie-consent",
    origin: "E2I VoIP (stockage local, pas un cookie)",
    purpose:
      "Mémoriser votre choix d’accepter ou de refuser la mesure d’audience.",
    retention: "Jusqu’à ce que vous l’effaciez via « Gérer mes cookies ».",
    consent: "exempt",
  },
  {
    name: "__hstc, hubspotutk, __hssc, __hssrc",
    origin: "HubSpot",
    purpose:
      "Faire fonctionner le chat en ligne et reconnaître votre navigateur d’une visite à l’autre pour la mesure d’audience.",
    retention: "6 mois maximum pour le plus long d’entre eux.",
    consent: "des-larrivee",
  },
  {
    name: "ph_<clé de projet>_posthog",
    origin: "PostHog",
    purpose:
      "Reconnaître votre navigateur d’une visite à l’autre pour la mesure d’audience. Avant acceptation, PostHog fonctionne sans cookie (mémoire de l’onglet uniquement).",
    retention: "12 mois à compter du dépôt.",
    consent: "apres-acceptation",
  },
  {
    name: "Vercel Web Analytics",
    origin: "Vercel",
    purpose:
      "Compter les visites de façon agrégée. Ce dispositif ne dépose aucun cookie et ne suit pas les visiteurs entre les sites.",
    retention: "Sans objet — aucun identifiant déposé sur votre terminal.",
    consent: "exempt",
  },
];

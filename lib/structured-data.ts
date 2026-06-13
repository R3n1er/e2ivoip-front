/**
 * Builders de données structurées Schema.org (JSON-LD) — centralisés.
 *
 * Objectif SEO : rich results Google/Bing + citabilité par les agents IA
 * (ChatGPT, Perplexity, Claude, Google AI Overviews), qui s'appuient fortement
 * sur le JSON-LD pour identifier l'entité, ses offres et ses Q/R.
 *
 * Toutes les données sont issues de sources fiables du projet :
 * - Numéros : lib/constants/phone-numbers.ts
 * - NAP / légal : app/mentions-legales (E2I ASSISTANCE, SIRET, siège Cayenne)
 */
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";

/** Identifiant stable de l'organisation, réutilisable comme @id dans les graphes. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Schema Organization / LocalBusiness global (à poser dans le layout racine).
 * Présent sur toutes les pages → ancre l'entité « E2I VoIP » pour Google et les IA.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: "E2I ASSISTANCE",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-e2i-voip.png`,
    image: `${SITE_URL}/images/logo-e2i-voip.png`,
    description:
      "Opérateur et intégrateur de téléphonie IP pour entreprises et intégrateurs IA en France et dans les DOM : Trunk SIP, 3CX, PBX Yeastar et interconnexion d'agents vocaux IA.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "23 Chemin Troubiran",
      postalCode: "97300",
      addressLocality: "Cayenne",
      addressCountry: "GF",
    },
    // Numéros locaux par territoire (DOM + métropole).
    contactPoint: TERRITORY_PHONES.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "customer service",
      areaServed: p.territory,
      availableLanguage: "French",
    })),
    // Zones desservies : les 4 DOM + France métropolitaine.
    areaServed: [
      { "@type": "Country", name: "Guadeloupe" },
      { "@type": "Country", name: "Martinique" },
      { "@type": "Country", name: "Guyane" },
      { "@type": "Country", name: "La Réunion" },
      { "@type": "Country", name: "France" },
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIRET",
      value: "51743457700014",
    },
  };
}

/**
 * Schema WebSite global — aide les moteurs à comprendre l'identité du site.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "fr-FR",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Une paire question/réponse pour un FAQPage. */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Schema FAQPage — à générer à partir des FAQ déjà présentes en HTML.
 * Très citable par les IA (paires Q/R structurées) + rich results Google.
 */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Un maillon de fil d'Ariane. */
export interface BreadcrumbEntry {
  name: string;
  /** Chemin relatif (ex: "/telephonie-entreprise") — résolu en absolu. */
  path: string;
}

/**
 * Schema BreadcrumbList — pour les pages profondes (fil d'Ariane dans la SERP).
 */
export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${SITE_URL}${entry.path}`,
    })),
  };
}

/** Champs d'un service pour le schema Service. */
export interface ServiceInput {
  name: string;
  description: string;
  /** Chemin canonique de la page produit. */
  path: string;
}

/**
 * Schema Service — à poser sur chaque page produit/offre.
 */
export function serviceSchema(service: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: ["Guadeloupe", "Martinique", "Guyane", "La Réunion", "France"],
  };
}

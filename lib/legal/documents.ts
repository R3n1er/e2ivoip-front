/**
 * Registre central de l'espace juridique (/juridique).
 *
 * Source unique pour : le hub /juridique, le fil d'ariane, et les liens
 * croisés entre pages légales. Miroir du manifest de production
 * (~/Cowork/e2ivoip/website-ready/manifest.json) : à mettre à jour en même
 * temps que les PDFs de public/documents/.
 *
 * Règle AGENTS.md : une correction d'URL ou d'intitulé ne doit jamais être
 * appliquée à une page en oubliant l'autre.
 */

export interface LegalPageDoc {
  kind: "page";
  /** Segment sous /juridique — ex. "mentions-legales" → /juridique/mentions-legales */
  slug: string;
  title: string;
  description: string;
  category: "contractuel" | "rgpd" | "information";
}

export interface LegalPdfDoc {
  kind: "pdf";
  slug: string;
  title: string;
  shortTitle: string;
  /** Chemin public du fichier — ex. "/documents/cgv.pdf" */
  href: string;
  pages: number;
  version: string;
  requiredAcceptance: boolean;
  category: "contractuel" | "rgpd";
}

export type LegalDoc = LegalPageDoc | LegalPdfDoc;

/** Pages HTML hébergées dans l'espace juridique. */
export const LEGAL_PAGES: readonly LegalPageDoc[] = [
  {
    kind: "page",
    slug: "conditions-generales-de-vente",
    title: "Conditions générales de vente",
    description:
      "Le contrat cadre : commande, tarifs, support, responsabilité et réversibilité des services E2I VoIP.",
    category: "contractuel",
  },
  {
    kind: "page",
    slug: "accord-sous-traitance-rgpd",
    title: "Accord de sous-traitance RGPD",
    description:
      "L'annexe conformité RGPD (art. 28) qui encadre les traitements réalisés pour le compte des clients.",
    category: "rgpd",
  },
  {
    kind: "page",
    slug: "politique-confidentialite",
    title: "Politique de confidentialité",
    description:
      "Quelles données sont collectées sur www.e2i-voip.com, pourquoi, combien de temps, et comment exercer vos droits.",
    category: "rgpd",
  },
  {
    kind: "page",
    slug: "exercer-mes-droits",
    title: "Exercer mes droits",
    description:
      "La procédure simple pour accéder à vos données, les rectifier, les effacer ou retirer votre consentement.",
    category: "rgpd",
  },
  {
    kind: "page",
    slug: "mentions-legales",
    title: "Mentions légales",
    description:
      "Identité de l'éditeur du site, hébergement, directeur de la publication et propriété intellectuelle.",
    category: "information",
  },
] as const;

/** PDFs contractuels servis depuis public/documents/ (miroir du manifest). */
export const LEGAL_PDFS: readonly LegalPdfDoc[] = [
  {
    kind: "pdf",
    slug: "cgv.pdf",
    title: "Conditions Générales de Vente (PDF)",
    shortTitle: "CGV",
    href: "/documents/cgv.pdf",
    pages: 17,
    version: "v1.2",
    requiredAcceptance: true,
    category: "contractuel",
  },
  {
    kind: "pdf",
    slug: "conditions-particulieres-voip.pdf",
    title: "Conditions Particulières — VoIP / IPBX (PDF)",
    shortTitle: "CP VoIP / IPBX",
    href: "/documents/conditions-particulieres-voip.pdf",
    pages: 10,
    version: "v1.1",
    requiredAcceptance: false,
    category: "contractuel",
  },
  {
    kind: "pdf",
    slug: "conditions-particulieres-trunk-sip.pdf",
    title: "Conditions Particulières — Trunk SIP (PDF)",
    shortTitle: "CP Trunk SIP",
    href: "/documents/conditions-particulieres-trunk-sip.pdf",
    pages: 12,
    version: "v1.1",
    requiredAcceptance: false,
    category: "contractuel",
  },
  {
    kind: "pdf",
    slug: "dpa-rgpd.pdf",
    title: "Accord de sous-traitance RGPD (PDF)",
    shortTitle: "DPA RGPD",
    href: "/documents/dpa-rgpd.pdf",
    pages: 11,
    version: "v1.2",
    requiredAcceptance: false,
    category: "rgpd",
  },
  {
    kind: "pdf",
    slug: "politique-confidentialite.pdf",
    title: "Politique de confidentialité (PDF)",
    shortTitle: "Politique",
    href: "/documents/politique-confidentialite.pdf",
    pages: 9,
    version: "v1.1",
    requiredAcceptance: true,
    category: "rgpd",
  },
] as const;

/** Tous les documents, pages d'abord puis PDFs — ordre d'affichage du hub. */
export const LEGAL_DOCS: readonly LegalDoc[] = [...LEGAL_PAGES, ...LEGAL_PDFS];

/** URL canonique absolue d'une page de l'espace juridique. */
export function legalHref(slug: string): string {
  return `/juridique/${slug}`;
}

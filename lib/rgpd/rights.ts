/**
 * Les six droits ouverts par le RGPD, source unique du site.
 *
 * La page /exercer-mes-droits, la politique de confidentialité et la route
 * /api/rgpd/demande consomment cette liste. Un identifiant reçu par la route
 * qui n'y figure pas est rejeté : cela évite qu'une valeur arbitraire se
 * retrouve relayée dans l'email interne comme si elle était un droit.
 */

export interface RgpdRight {
  /** Identifiant transmis par le formulaire. */
  id: string;
  label: string;
  /** Article du RGPD fondant le droit. */
  article: string;
  description: string;
}

export const RGPD_RIGHTS: readonly RgpdRight[] = [
  {
    id: "acces",
    label: "Droit d’accès",
    article: "article 15",
    description:
      "Obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.",
  },
  {
    id: "rectification",
    label: "Droit de rectification",
    article: "article 16",
    description:
      "Faire corriger des données inexactes ou compléter des données incomplètes.",
  },
  {
    id: "effacement",
    label: "Droit à l’effacement",
    article: "article 17",
    description:
      "Demander la suppression de vos données, sauf obligation légale de conservation de notre part.",
  },
  {
    id: "limitation",
    label: "Droit à la limitation du traitement",
    article: "article 18",
    description:
      "Geler l’utilisation de vos données pendant la vérification d’une contestation.",
  },
  {
    id: "portabilite",
    label: "Droit à la portabilité",
    article: "article 20",
    description:
      "Récupérer les données que vous nous avez fournies dans un format lisible par machine.",
  },
  {
    id: "opposition",
    label: "Droit d’opposition",
    article: "article 21",
    description:
      "Vous opposer à un traitement fondé sur notre intérêt légitime, dont la prospection commerciale.",
  },
] as const;

export function getRightById(id: string): RgpdRight | undefined {
  return RGPD_RIGHTS.find((right) => right.id === id);
}

/**
 * Démos audio du studio d’attente téléphonique.
 * Fichiers MP3 rapatriés avec l’accord du partenaire (attentetelephonique.fr)
 * et hébergés localement dans /public/audio/studio-demos/.
 *
 * L’email du contact commercial n’est jamais présent ici : l’envoi passe par
 * l’API /api/studio/devis qui lit les variables d’environnement.
 */

export type StudioDemoCategory =
  | "pre-decroche"
  | "attente"
  | "fermeture"
  | "occupation"
  | "additionnel";

export interface StudioDemo {
  id: string;
  category: StudioDemoCategory;
  title: string;
  duration: string;
  src: string;
  script: string;
  /** Variante d’exemple : "Bienvenue chez {entreprise}..." — remplacer {entreprise}. */
  placeholder?: string;
  voice: "masculine" | "feminine";
  language: string;
}

export const STUDIO_DEMO_CATEGORIES: Record<
  StudioDemoCategory,
  { label: string; description: string }
> = {
  "pre-decroche": {
    label: "Pré-décroché",
    description: "Message entendu avant la prise d’appel.",
  },
  attente: {
    label: "Attente",
    description: "Message pendant la mise en attente du correspondant.",
  },
  fermeture: {
    label: "Fermeture / répondeur",
    description: "Message hors horaires ou boîte vocale.",
  },
  occupation: {
    label: "Occupation / dissuasion",
    description: "Message lorsque toutes les lignes sont occupées.",
  },
  additionnel: {
    label: "Message additionnel",
    description: "Information ponctuelle : horaires, vœux, vacances…",
  },
};

export const STUDIO_DEMOS: StudioDemo[] = [
  // Pré-décroché
  {
    id: "pre-01",
    category: "pre-decroche",
    title: "Bienvenue, nous prenons votre appel",
    duration: "16 s",
    src: "/audio/studio-demos/pre01.mp3",
    script:
      "Bienvenue chez {entreprise}. Nous allons prendre votre appel dans quelques instants, merci de rester en ligne.",
    placeholder: "Bienvenue chez {entreprise}. Nous allons prendre votre appel dans quelques instants, merci de rester en ligne.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "pre-02",
    category: "pre-decroche",
    title: "Merci de patienter",
    duration: "14 s",
    src: "/audio/studio-demos/pre02.mp3",
    script:
      "{entreprise}, bonjour. Nous vous remercions de votre appel et vous prions de patienter quelques instants.",
    placeholder:
      "{entreprise}, bonjour. Nous vous remercions de votre appel et vous prions de patienter quelques instants.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "pre-03",
    category: "pre-decroche",
    title: "En communication",
    duration: "15 s",
    src: "/audio/studio-demos/pre03.mp3",
    script:
      "Vous êtes en communication avec {entreprise}. Nous allons donner suite à votre appel. Merci de ne pas quitter.",
    placeholder:
      "Vous êtes en communication avec {entreprise}. Nous allons donner suite à votre appel. Merci de ne pas quitter.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "pre-04",
    category: "pre-decroche",
    title: "Nous traitons votre appel",
    duration: "15 s",
    src: "/audio/studio-demos/pre04.mp3",
    script:
      "Bienvenue chez {entreprise}. Nous allons traiter votre appel, merci de bien vouloir patienter.",
    placeholder:
      "Bienvenue chez {entreprise}. Nous allons traiter votre appel, merci de bien vouloir patienter.",
    voice: "masculine",
    language: "fr",
  },
  // Attente
  {
    id: "att-01",
    category: "attente",
    title: "Patientez quelques instants",
    duration: "1 min",
    src: "/audio/studio-demos/at01.mp3",
    script:
      "Vous êtes en communication avec {entreprise}, merci de patienter quelques instants.",
    placeholder:
      "Vous êtes en communication avec {entreprise}, merci de patienter quelques instants.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "att-02",
    category: "attente",
    title: "Nous recherchons votre correspondant",
    duration: "1 min",
    src: "/audio/studio-demos/at02.mp3",
    script:
      "Bienvenue chez {entreprise}. Nous recherchons votre correspondant, merci de bien vouloir patienter quelques instants.",
    placeholder:
      "Bienvenue chez {entreprise}. Nous recherchons votre correspondant, merci de bien vouloir patienter quelques instants.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "att-03",
    category: "attente",
    title: "À votre service",
    duration: "1 min",
    src: "/audio/studio-demos/at03.mp3",
    script:
      "{entreprise} à votre service, nous allons traiter votre appel, merci de bien vouloir patienter.",
    placeholder:
      "{entreprise} à votre service, nous allons traiter votre appel, merci de bien vouloir patienter.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "att-04",
    category: "attente",
    title: "Nous nous efforçons d’écourter",
    duration: "2 min",
    src: "/audio/studio-demos/at04.mp3",
    script:
      "Bienvenue chez {entreprise}. Nous nous efforçons d’écourter agréablement votre attente. Merci de patienter quelques instants.",
    placeholder:
      "Bienvenue chez {entreprise}. Nous nous efforçons d’écourter agréablement votre attente. Merci de patienter quelques instants.",
    voice: "masculine",
    language: "fr",
  },
  // Fermeture / répondeur
  {
    id: "rep-01",
    category: "fermeture",
    title: "Services fermés",
    duration: "20 s",
    src: "/audio/studio-demos/rep01.mp3",
    script:
      "Bienvenue chez {entreprise}, nos services sont actuellement fermés, nous vous invitons à renouveler votre appel. Merci.",
    placeholder:
      "Bienvenue chez {entreprise}, nos services sont actuellement fermés, nous vous invitons à renouveler votre appel. Merci.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "rep-02",
    category: "fermeture",
    title: "Laissez un message",
    duration: "30 s",
    src: "/audio/studio-demos/rep02.mp3",
    script:
      "Bienvenue chez {entreprise}, nos services sont actuellement fermés. Vous pouvez nous laisser un message après le signal sonore en indiquant vos coordonnées et la raison de votre appel. Nous vous rappellerons dès que possible. À bientôt.",
    placeholder:
      "Bienvenue chez {entreprise}, nos services sont actuellement fermés. Vous pouvez nous laisser un message après le signal sonore en indiquant vos coordonnées et la raison de votre appel. Nous vous rappellerons dès que possible. À bientôt.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "rep-homme-gsm",
    category: "fermeture",
    title: "Répondeur mobile — voix masculine",
    duration: "25 s",
    src: "/audio/studio-demos/il_gsm.mp3",
    script:
      "Bienvenue sur la messagerie de {contact}. Il n’est pas joignable pour le moment. Merci de laisser vos coordonnées ainsi que l’objet de votre appel. Il vous recontactera très rapidement. À très bientôt.",
    placeholder:
      "Bienvenue sur la messagerie de {contact}. Il n’est pas joignable pour le moment. Merci de laisser vos coordonnées ainsi que l’objet de votre appel. Il vous recontactera très rapidement. À très bientôt.",
    voice: "masculine",
    language: "fr",
  },
  {
    id: "rep-femme-gsm",
    category: "fermeture",
    title: "Répondeur mobile — voix féminine",
    duration: "25 s",
    src: "/audio/studio-demos/elle_gsm.mp3",
    script:
      "Bienvenue sur la messagerie de {contact}. Elle n’est pas joignable pour le moment. Merci de laisser vos coordonnées ainsi que l’objet de votre appel. Elle vous recontactera très rapidement. À très bientôt.",
    placeholder:
      "Bienvenue sur la messagerie de {contact}. Elle n’est pas joignable pour le moment. Merci de laisser vos coordonnées ainsi que l’objet de votre appel. Elle vous recontactera très rapidement. À très bientôt.",
    voice: "feminine",
    language: "fr",
  },
];

export function getDemosByCategory(category: StudioDemoCategory): StudioDemo[] {
  return STUDIO_DEMOS.filter((d) => d.category === category);
}

export function getDemoById(id: string): StudioDemo | undefined {
  return STUDIO_DEMOS.find((d) => d.id === id);
}

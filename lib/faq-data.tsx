import type { ReactNode } from "react";
import type { FaqItem } from "@/lib/structured-data";

/**
 * Données FAQ partagées.
 *
 * Chaque entrée porte DEUX représentations de la réponse :
 * - `answer` : le rendu riche (JSX) pour l'affichage <details> accessible.
 * - `answerText` : la version texte brut, pour le JSON-LD FAQPage (Google et les
 *   IA veulent du texte, pas du JSX). C'est cette source qui alimente le schema.
 *
 * Garder les deux synchronisés lors des mises à jour de contenu.
 */
export interface RichFaqItem {
  question: string;
  answer: ReactNode;
  answerText: string;
}

/** FAQ générale VoIP (composant WorkingFAQ — pages assistance, contact, compteur). */
export const GENERAL_FAQ: RichFaqItem[] = [
  {
    question: "Définition de SIP et de la VoIP",
    answerText:
      "Le protocole SIP (Session Initiation Protocol) est l'un des protocoles utilisés en VoIP (Voix sur IP) pour assurer le bon acheminement des communications. C'est l'un des protocoles essentiels et les plus connus de la téléphonie IP : vous pouvez communiquer dès lors que vous avez accès à internet.",
    answer: (
      <p>
        Le protocole <strong>SIP</strong>, pour <strong>S</strong>ession{" "}
        <strong>I</strong>nitiation <strong>P</strong>rotocol, est un des
        protocoles utilisé en VoIP (Voix sur IP) pour assurer le bon
        acheminement de vos communications. Il est un des protocoles essentiels
        et les plus connus de la téléphonie IP. Vous pouvez communiquer dès
        lors que vous avez accès à internet !
      </p>
    ),
  },
  {
    question: "C'est quoi un PABX ou un IPBX ?",
    answerText:
      "Un PABX (Private Automatic Branch Exchange) est un autocommutateur téléphonique privé qui fournit les fonctionnalités d'un standard téléphonique d'entreprise. Un IPBX (IP Private Branch Exchange) est un PABX fonctionnant avec le protocole internet (IP) et la VoIP. Plus qu'un simple standard, un IPBX moderne offre des fonctionnalités de communication unifiée.",
    answer: (
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-2">Définition d'un PABX</h3>
          <p className="text-gray-600 mb-3">
            Aujourd'hui, les entreprises utilisent ou sont équipées d'un{" "}
            <strong>PABX</strong>, acronyme anglophone pour <strong>P</strong>
            rivate <strong>A</strong>utomatic <strong>B</strong>ranch{" "}
            <strong>EX</strong>change. C'est un autocommutateur téléphonique
            privé qui permet de livrer les fonctionnalités essentiels pour
            disposer d'un standard téléphonique.
          </p>
          <p className="text-gray-600">
            Un <strong>PABX</strong> est utilisé dans les systèmes de
            communication d'entreprise pour relier les standards et postes
            téléphoniques internes au réseau téléphonique.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Définition d'un IPBX</h3>
          <p className="text-gray-600 mb-3">
            La téléphonie IP et la VoIP ont pris le dessus sur les réseaux
            téléphoniques commutées (RTC) et cuivres classiques. Les IPBX, pour{" "}
            <strong>I</strong>nternet protocol <strong>P</strong>rivate{" "}
            <strong>B</strong>ranch e<strong>X</strong>change ou encore IP PBX,
            se sont ainsi imposés comme autocommutateurs téléphoniques privés de
            référence.
          </p>
          <p className="font-semibold text-gray-800 mb-3">
            Un IPBX c'est un PABX fonctionnant avec le protocole internet (IP)
            et la VoIP.
          </p>
          <p className="text-gray-600">
            Enfin, plus que de la simple téléphonie, un PBX IP vous permet de
            disposer de fonctionnalités de communication enrichies. On parle
            d'ailleurs souvent de communication unifiée lorsque l'on évoque un
            IPBX moderne.
          </p>
        </div>
      </div>
    ),
  },
  {
    question: "Qui peut souscrire aux offres de passerelles SIP et Trunk SIP ?",
    answerText:
      "Nos offres de Trunk SIP et de gestion de PBX sont réservées aux entreprises enregistrées et en activité en France ou dans les DROM. Un KBIS ou un avis INSEE est demandé à l'ouverture du compte. Nos clients sont notamment des bureaux d'études, des enseignes de la vente, des établissements de santé, des cabinets comptables ou d'assurance, des centres médicaux et des administrations.",
    answer: (
      <div className="space-y-3">
        <p>
          Nos offres de Trunk SIP ou de gestion de PBX sont réservées
          uniquement aux entreprises enregistrées et en activité en France ou
          dans les DROM. Un KBIS ou un avis INSEE est demandé lors de
          l'ouverture de votre compte.
        </p>
        <p>
          Nos clients sont généralement, des bureaux d'études, des enseignes du
          secteur de la vente, des établissements de santé, des cabinets
          comptables ou d'assurance, des centres médicaux, des administrations,
          et bien d'autres secteurs d'activités.
        </p>
        <p>
          Contactez notre service commercial pour plus d'informations au{" "}
          <a
            href="tel:+594594963500"
            suppressHydrationWarning
            className="text-red-primary hover:underline font-semibold"
          >
            +594 594 963 500
          </a>
        </p>
      </div>
    ),
  },
  {
    question:
      "Y a-t-il des pré-requis techniques à respecter afin de mettre en service une passerelle SIP et un standard téléphonique ?",
    answerText:
      "Nos passerelles Trunk SIP sont hébergées dans des centres de données en France métropolitaine, et nos serveurs de téléphonie IP sur Microsoft Azure ou Amazon AWS en régions françaises ou européennes (conformité RGPD). Pour une bonne qualité de voix, nous recommandons un accès internet de type Fibre FTTO entreprise, Fibre FTTH, Starlink, SDSL cuivre avec 2 Mo dédiés à la VoIP, ou une box 4G 200 Go / illimitée dédiée à la VoIP.",
    answer: (
      <div className="space-y-3">
        <p>
          Nos passerelles Trunk SIP sont hébergées dans des centres de données
          en France Métropolitaine sur une infrastructure opérateur robuste. Nos
          serveurs de téléphonie IP sont hébergés sur Microsoft Azure ou Amazon
          AWS dans des régions Françaises ou Européennes afin de respecter les
          contraintes RGPD.
        </p>
        <p>
          Dans le but de garantir un bon fonctionnement et une bonne qualité de
          la voix, nous vous recommandons d'avoir les accès internet suivants :
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li>Fibre Optique FFTO Entreprise</li>
          <li>Fibre Optique FTTH</li>
          <li>Starlink</li>
          <li>SDSL Cuivre avec 2Mo dédié à la VOIP</li>
          <li>Box 4G 200Go ou illimité dédié à la VOIP</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Puis-je conserver le numéro actuel de mon entreprise ?",
    answerText:
      "Oui. Nous pouvons lancer la portabilité de tous vos numéros actuels. La demande nécessite votre dernière facture opérateur et votre numéro RIO. Si vous ne connaissez pas tous les numéros existants sur votre ligne, nous pouvons effectuer une demande de fiabilisation de ligne, facturée 50 € HT.",
    answer: (
      <p>
        Oui ! Nous pouvons lancer la portabilité de tous vos numéros actuels.
        Lors de la demande de portabilité, il est nécessaire de fournir votre
        dernière facture opérateur et votre numéro RIO. Si vous ne connaissez
        pas tous les numéros existants sur votre ligne support, nous pouvons
        effectuer une demande de fiabilisation de ligne. Ce service est facturé
        50€ HT.
      </p>
    ),
  },
  {
    question:
      "Est-il possible de créer de nouveaux numéros en zone locale pour ma nouvelle passerelle SIP ?",
    answerText:
      "Oui. Avec notre service de Trunk SIP, il est possible de créer un nouveau numéro en zone locale pour la Guadeloupe, la Martinique, la Guyane ou la Réunion. Contactez-nous pour un devis.",
    answer: (
      <p>
        Oui, avec notre service de Trunk SIP, il est tout à fait possible de
        créer un nouveau numéro en zone locale pour la Guadeloupe, La
        Martinique, La Guyane ou La Réunion. Contactez-nous pour un devis{" "}
        <a
          href="/devis-en-ligne"
          className="text-red-primary hover:underline font-semibold"
        >
          en cliquant ici
        </a>
        .
      </p>
    ),
  },
  {
    question: "Est-il possible d'avoir un numéro de téléphone personnalisé ?",
    answerText:
      "Oui, nous pouvons créer un numéro de téléphone respectant une suite logique. Consultez-nous par mail. Ce service est facturé 50 €/mois.",
    answer: (
      <p>
        Oui nous pouvons bien sûr vous créer un numéro de téléphone respectant
        une suite logique. Consultez-nous par mail et nous vous répondrons. Ce
        service est facturé 50€/mois.
      </p>
    ),
  },
  {
    question: "Vous assurez un support technique VoIP ?",
    answerText:
      "Oui, nous proposons un support technique réactif grâce à nos équipes locales en Île-de-France, en Guadeloupe et en Guyane française. Nous supervisons et configurons à distance les postes Fanvil et Yealink via une console dédiée, et nos serveurs de téléphonie IP sont monitorés en temps réel. Cette combinaison de présence locale et de gestion à distance assure réactivité, disponibilité des lignes et suivi proactif.",
    answer: (
      <div className="space-y-3">
        <p>
          Oui, nous proposons un <strong>support technique réactif</strong>{" "}
          grâce à nos équipes locales en Île-de-France, en Guadeloupe et en
          Guyane Française. Nos experts interviennent rapidement pour garantir
          la continuité de votre service.
        </p>
        <p>
          La téléphonie IP offre une grande flexibilité, permettant une{" "}
          <strong>gestion à distance optimale</strong> :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>
            Si vous utilisez des postes <strong>Fanvil ou Yealink</strong>,
            notre console dédiée nous permet de superviser et configurer vos
            appareils à distance, sans intervention sur site.
          </li>
          <li>
            Tous vos serveurs de téléphonie IP sont{" "}
            <strong>monitorés en temps réel</strong>, assurant un
            fonctionnement fluide et sécurisé.
          </li>
        </ul>
        <p>
          Cette approche combinant présence locale et gestion à distance vous
          offre :
        </p>
        <ul className="space-y-1 text-gray-600">
          <li>✓ <strong>Réactivité</strong> pour les interventions urgentes</li>
          <li>✓ <strong>Disponibilité</strong> permanente de vos lignes</li>
          <li>✓ <strong>Sérénité</strong> avec un suivi proactif</li>
        </ul>
      </div>
    ),
  },
];

/**
 * FAQ spécifique Trunk SIP au compteur (texte brut pour le JSON-LD FAQPage).
 * Le rendu visuel reste dans components/faq-trunk-sip-compteur.tsx ; ici on ne
 * garde que la version texte qui alimente le schema de la page compteur.
 */
export const COMPTEUR_FAQ: FaqItem[] = [
  {
    question:
      "Quelle est la différence entre Trunk SIP au compteur et illimité ?",
    answer:
      "Le Trunk SIP au compteur facture uniquement vos appels émis à la seconde (idéal pour un faible volume, moins de 200 min/mois). L'offre illimitée propose un forfait fixe mensuel pour des appels illimités vers la France et les DOM (recommandée au-delà de 200 minutes/mois).",
  },
  {
    question: "Puis-je garder mes numéros actuels ?",
    answer:
      "Oui. Nous gérons gratuitement la portabilité de vos numéros existants et pouvons créer de nouveaux numéros géographiques dans votre zone DOM (0590 Guadeloupe, 0596 Martinique, 0594 Guyane).",
  },
  {
    question: "Quel équipement faut-il pour utiliser le Trunk SIP ?",
    answer:
      "Il faut un IPBX (3CX, Yeastar) ou une passerelle SIP, ainsi qu'une connexion Internet stable (ADSL/Fibre). Si vous n'en avez pas, nous proposons des solutions complètes avec l'équipement et la configuration. Marques compatibles : 3CX, Yeastar, Grandstream, Avaya, Asterisk, et d'autres.",
  },
  {
    question: "Le support technique est-il disponible localement ?",
    answer:
      "Oui. Nos équipes techniques sont présentes en Martinique, Guadeloupe et Guyane. Le support est disponible du lundi au vendredi de 8h à 18h (heure locale), avec intervention sur site possible. Numéros : Guyane 05 94 96 35 00, France 01 89 56 05 00.",
  },
  {
    question: "Quelle connexion Internet est recommandée ?",
    answer:
      "Nous recommandons une fibre optique FTTO entreprise (idéal), une SDSL cuivre avec au moins 2 Mb dédiés à la VoIP, une box 4G 200 Go/illimitée en secours, ou une fibre FTTH avec priorité VoIP. La qualité de la connexion impacte directement la qualité des appels.",
  },
  {
    question: "Comment fonctionne la facturation à la seconde ?",
    answer:
      "Avec le Trunk SIP au compteur, vous payez uniquement vos communications réelles : facturation dès la première seconde, sans minimum ni paliers de 30 secondes, avec une facture détaillée par appel. Les appels entrants sont gratuits ; seuls les appels sortants sont facturés. Exemple : un appel de 1 min 23 s vers un fixe DOM coûte 0,0275 € (83 s × 0,02 €/min ÷ 60).",
  },
];

/** Extrait les paires Q/R en texte brut pour le JSON-LD FAQPage. */
export function toFaqSchemaItems(items: RichFaqItem[]): FaqItem[] {
  return items.map(({ question, answerText }) => ({
    question,
    answer: answerText,
  }));
}

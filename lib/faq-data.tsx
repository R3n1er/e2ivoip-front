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
      "Oui, nous proposons un support technique réactif grâce à notre présence en Île-de-France, en Guadeloupe et en Guyane française. Nous supervisons et configurons à distance les postes Fanvil et Yealink via une console dédiée, et nos serveurs de téléphonie IP sont monitorés en temps réel. Cette combinaison de présence dans les DOM et de gestion à distance assure réactivité, disponibilité des lignes et suivi proactif.",
    answer: (
      <div className="space-y-3">
        <p>
          Oui, nous proposons un <strong>support technique réactif</strong>{" "}
          grâce à notre présence en Île-de-France, en Guadeloupe et en
          Guyane Française. Nos experts vous accompagnent pour assurer
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
          Cette approche combinant présence dans les DOM et gestion à distance vous
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
 * FAQ spécifique Trunk SIP au compteur (RichFaqItem[] — rendu JSX + texte pour JSON-LD).
 * Utilisée par le composant FaqSection sur la page /telephonie-entreprise/trunk-sip-compteur.
 */
export const COMPTEUR_FAQ: RichFaqItem[] = [
  {
    question:
      "Quelle est la différence entre Trunk SIP au compteur et illimité ?",
    answerText:
      "Le Trunk SIP au compteur facture uniquement vos appels émis à la seconde (idéal pour un faible volume, moins de 200 min/mois). L'offre illimitée propose un forfait fixe mensuel pour des appels illimités vers la France et les DOM (recommandée au-delà de 200 minutes/mois).",
    answer: (
      <p>
        Le <strong>Trunk SIP au compteur</strong> facture uniquement vos appels émis à la seconde (idéal pour faible volume &lt; 200 min/mois),
        tandis que <strong>l'illimité</strong> propose un forfait fixe mensuel pour des appels illimités vers France + DOM
        (recommandé pour plus de 200 minutes/mois).
      </p>
    ),
  },
  {
    question: "Puis-je garder mes numéros actuels ?",
    answerText:
      "Oui. Nous gérons gratuitement la portabilité de vos numéros existants et pouvons créer de nouveaux numéros géographiques dans votre zone DOM (0590 Guadeloupe, 0596 Martinique, 0594 Guyane).",
    answer: (
      <p>
        <strong>Oui, absolument !</strong> Nous gérons gratuitement la portabilité de vos numéros existants.
        Nous pouvons également créer de nouveaux numéros géographiques dans votre zone DOM
        (ex: 0590 pour Guadeloupe, 0596 pour Martinique, 0594 pour Guyane).
      </p>
    ),
  },
  {
    question: "Quel équipement faut-il pour utiliser le Trunk SIP ?",
    answerText:
      "Il faut un IPBX (3CX, Yeastar) ou une passerelle SIP, ainsi qu'une connexion Internet stable (ADSL/Fibre). Si vous n'en avez pas, nous proposons des solutions complètes avec l'équipement et la configuration. Marques compatibles : 3CX, Yeastar, Grandstream, Avaya, Asterisk, et d'autres.",
    answer: (
      <div className="space-y-3">
        <p>
          Vous avez besoin d'un <strong>IPBX</strong> (comme 3CX, Yeastar) ou d'une <strong>passerelle SIP</strong>.
          Si vous n'en avez pas, nous proposons des solutions complètes incluant l'équipement et la configuration.
        </p>
        <p>Une connexion Internet stable (ADSL/Fibre) est également requise.</p>
        <p>
          <strong>Marques compatibles :</strong> 3CX, Yeastar, Grandstream, Avaya, Asterisk, et bien d'autres.
        </p>
      </div>
    ),
  },
  {
    question: "Le support technique est-il disponible localement ?",
    answerText:
      "Oui. Nous sommes présents en Martinique, Guadeloupe et Guyane. Le support à distance est disponible du lundi au vendredi de 8h à 18h (heure locale). Numéros : Guyane 05 94 96 35 00, France 01 89 56 05 00.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Oui, c'est notre avantage principal !</strong> Nous sommes présents en
          <strong> Martinique, Guadeloupe et Guyane</strong>. Support à distance du lundi au vendredi de 8h à 18h (heure locale).
        </p>
        <p>Gestion à distance de vos postes et de votre instance de téléphonie.</p>
        <div className="space-y-1">
          <p><strong>Nos numéros de support :</strong></p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>Guyane : <a href="tel:+594****3500" suppressHydrationWarning className="text-red-primary hover:underline font-semibold">05 94 96 35 00</a></li>
            <li>France : <a href="tel:+331****0500" suppressHydrationWarning className="text-red-primary hover:underline font-semibold">01 89 56 05 00</a></li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "Quelle connexion Internet est recommandée ?",
    answerText:
      "Nous recommandons une fibre optique FTTO entreprise (idéal), une SDSL cuivre avec au moins 2 Mb dédiés à la VoIP, une box 4G 200 Go/illimitée en secours, ou une fibre FTTH avec priorité VoIP. La qualité de la connexion impacte directement la qualité des appels.",
    answer: (
      <div className="space-y-3">
        <p><strong>Recommandations techniques :</strong></p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li><strong>Fibre optique FTTO Entreprise</strong> (idéal)</li>
          <li><strong>SDSL Cuivre</strong> avec 2Mb dédiés à la VoIP minimum</li>
          <li><strong>Box 4G</strong> avec forfait 200GB/illimité VoIP en secours</li>
          <li><strong>Fibre FTTH</strong> avec priorité VoIP</li>
        </ul>
        <p className="text-sm text-gray-600 mt-3">
          <strong>Important :</strong> La qualité de votre connexion Internet impacte directement
          la qualité de vos appels. Nous vous accompagnons pour optimiser votre infrastructure.
        </p>
      </div>
    ),
  },
  {
    question: "Comment fonctionne la facturation à la seconde ?",
    answerText:
      "Avec le Trunk SIP au compteur, vous payez uniquement vos communications réelles : facturation dès la première seconde, sans minimum ni paliers de 30 secondes, avec une facture détaillée par appel. Les appels entrants sont gratuits ; seuls les appels sortants sont facturés. Exemple : un appel de 1 min 23 s vers un fixe DOM coûte 0,0275 € (83 s × 0,02 €/min ÷ 60).",
    answer: (
      <div className="space-y-3">
        <p>
          Avec notre <strong>Trunk SIP au compteur</strong>, vous payez uniquement vos communications réelles :
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span><strong>Facturation dès la première seconde</strong> de communication</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span><strong>Pas de minimum de facturation</strong> (pas de paliers de 30 secondes)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span><strong>Transparence totale</strong> : facture détaillée avec chaque appel</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span><strong>Appels entrants gratuits</strong> (seuls les appels sortants sont facturés)</span>
          </li>
        </ul>
        <p className="rounded-lg border border-red-primary/20 bg-red-primary/5 p-3 text-sm text-gray-700">
          <strong>Exemple concret :</strong> Un appel de 1 minute 23 secondes vers un fixe DOM
          vous coûtera exactement 0,0275€ (83 secondes × 0,02€/minute ÷ 60).
        </p>
      </div>
    ),
  },
];

/** FAQ Aircall (page /telephonie-entreprise/aircall). */
export const AIRCALL_FAQ: RichFaqItem[] = [
  {
    question: "Qu'est-ce qu'Aircall ?",
    answerText:
      "Aircall est la plateforme de communication client propulsée par l'IA, pensée pour les équipes commerciales et support modernes. Fondée à Paris en 2014, elle équipe plus de 22 000 entreprises dans 110+ pays et s'intègre nativement à plus de 200 CRM et outils métiers pour gérer appels, SMS et messages WhatsApp depuis un espace de travail unifié.",
    answer: (
      <p>
        Aircall est la plateforme de communication client propulsée par l'IA, pensée pour les équipes commerciales et support modernes. Fondée à Paris en 2014, elle équipe plus de 22 000 entreprises dans 110+ pays et s'intègre nativement à plus de 200 CRM et outils métiers pour gérer appels, SMS et messages WhatsApp depuis un espace de travail unifié.
      </p>
    ),
  },
  {
    question: "Quelle différence entre Aircall et nos solutions 3CX ou Yeastar ?",
    answerText:
      "3CX et Yeastar sont des standards téléphoniques (IPBX) qui équipent toute l'entreprise. Aircall est une plateforme de communication client 100 % cloud, pensée pour les équipes commerciales et support, avec une intégration native dans votre CRM. Les deux approches sont complémentaires : E2I VoIP vous conseille sur la solution la plus adaptée à votre usage.",
    answer: (
      <p>
        3CX et Yeastar sont des standards téléphoniques (IPBX) qui équipent toute l'entreprise. Aircall est une plateforme de communication client 100 % cloud, pensée pour les équipes commerciales et support, avec une intégration native dans votre CRM. Les deux approches sont complémentaires : E2I VoIP vous conseille sur la solution la plus adaptée à votre usage.
      </p>
    ),
  },
  {
    question: "Comment Aircall s'intègre-t-il à mon CRM ?",
    answerText:
      "Aircall propose plus de 200 intégrations natives, dont HubSpot, Salesforce, Zendesk, Pipedrive, Zoho ou Microsoft Teams. La fiche client s'ouvre à chaque appel et les données se synchronisent automatiquement. E2I VoIP paramètre l'intégration avec votre CRM de bout en bout.",
    answer: (
      <p>
        Aircall propose plus de 200 intégrations natives, dont HubSpot, Salesforce, Zendesk, Pipedrive, Zoho ou Microsoft Teams. La fiche client s'ouvre à chaque appel et les données se synchronisent automatiquement. E2I VoIP paramètre l'intégration avec votre CRM de bout en bout.
      </p>
    ),
  },
  {
    question: "Puis-je avoir des numéros locaux dans les DOM avec Aircall ?",
    answerText:
      "Oui. Nous mettons en place des numéros géographiques adaptés à votre zone (Guadeloupe, Martinique, Guyane, La Réunion) ainsi que des numéros internationaux selon vos besoins.",
    answer: (
      <p>
        Oui. Nous mettons en place des numéros géographiques adaptés à votre zone (Guadeloupe, Martinique, Guyane, La Réunion) ainsi que des numéros internationaux selon vos besoins.
      </p>
    ),
  },
  {
    question: "Combien coûte Aircall avec E2I VoIP ?",
    answerText:
      "La tarification dépend du nombre d'utilisateurs, des intégrations et de l'accompagnement souhaité. Nous établissons un devis personnalisé après l'étude de votre projet.",
    answer: (
      <p>
        La tarification dépend du nombre d'utilisateurs, des intégrations et de l'accompagnement souhaité. Nous établissons un devis personnalisé après l'étude de votre projet.
      </p>
    ),
  },
];

/** FAQ Devis en ligne (page /devis-en-ligne). */
export const DEVIS_FAQ: RichFaqItem[] = [
  {
    question: "Quel est le délai moyen pour obtenir un devis personnalisé ?",
    answerText:
      "Nous traitons votre demande de devis du lundi au vendredi. Si votre formulaire est complet, vous recevrez une proposition sous 24 heures ouvrées. Si des informations complémentaires sont nécessaires, notre équipe vous contactera rapidement pour affiner votre demande.",
    answer: (
      <p>
        Nous traitons votre demande de devis du lundi au vendredi. Si votre formulaire est complet,
        vous recevrez une proposition sous 24 heures ouvrées. Si des informations complémentaires
        sont nécessaires, notre équipe vous contactera rapidement pour affiner votre demande.
      </p>
    ),
  },
  {
    question: "Quelles différences entre un Trunk SIP 'au compteur' et 'illimité' ?",
    answerText:
      "Nous recommandons systématiquement à nos clients des Trunk SIP au compteur, soigneusement dimensionnés pour correspondre à leur consommation réelle. Cette solution offre l'avantage de ne payer que les appels effectués, ce qui est particulièrement adapté aux PME ayant un volume d'appels variable.",
    answer: (
      <p>
        Nous recommandons systématiquement à nos clients des Trunk SIP au compteur, soigneusement
        dimensionnés pour correspondre à leur consommation réelle. Cette solution offre l'avantage
        de ne payer que les appels effectués, ce qui est particulièrement adapté aux PME ayant un
        volume d'appels variable.
      </p>
    ),
  },
  {
    question: "Puis-je conserver mes numéros actuels avec votre solution ?",
    answerText:
      "Oui, nous prenons en charge la portabilité de vos numéros fixes en France métropolitaine et dans les DOM TOM. Vous devez nous communiquer votre numéro RIO pour cela. Par ailleurs, nous proposons des solutions flexibles adaptées à votre infrastructure existante.",
    answer: (
      <p>
        Oui, nous prenons en charge la portabilité de vos numéros fixes en France métropolitaine et
        dans les DOM TOM. Vous devez nous communiquer votre numéro RIO pour cela. Par ailleurs, nous
        proposons des solutions flexibles adaptées à votre infrastructure existante.
      </p>
    ),
  },
  {
    question: "Quel débit internet est nécessaire pour une qualité d'appel optimale ?",
    answerText:
      "Pour bénéficier d'une qualité d'appel optimale avec nos solutions de téléphonie IP, votre accès Internet doit être conforme à nos spécifications techniques. Nous acceptons les connexions Fibre, 4G, 5G et Starlink. Le débit nécessaire est de 100 Kbps par appel simultané.",
    answer: (
      <p>
        Pour bénéficier d'une qualité d'appel optimale avec nos solutions de téléphonie IP, votre
        accès Internet doit être conforme à nos spécifications techniques. Nous acceptons les
        connexions Fibre, 4G, 5G et Starlink. Le débit nécessaire est de 100 Kbps par appel simultané.
      </p>
    ),
  },
];

/** Extrait les paires Q/R en texte brut pour le JSON-LD FAQPage. */
export function toFaqSchemaItems(items: RichFaqItem[]): FaqItem[] {
  return items.map(({ question, answerText }) => ({
    question,
    answer: answerText,
  }));
}

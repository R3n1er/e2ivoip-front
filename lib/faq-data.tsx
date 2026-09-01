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

/** FAQ 3CX — page /telephonie-3cx */
export const FAQ_3CX: RichFaqItem[] = [
  {
    question: "Qu'est-ce que 3CX et pourquoi choisir cette solution ?",
    answerText:
      "3CX est un système de téléphonie IP (IPBX) logiciel qui remplace votre standard téléphonique traditionnel. Il s'installe sur Windows, Linux ou dans le cloud. Vous gardez vos numéros actuels, vos collaborateurs utilisent leur PC, smartphone ou téléphone IP. E2I installe et configure 3CX pour vous, avec un support local en Martinique, Guadeloupe et Guyane.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>3CX</strong> est un système de téléphonie IP (IPBX) logiciel qui remplace votre standard
          téléphonique traditionnel. Il s'installe sur Windows, Linux ou dans le cloud.
        </p>
        <p>
          Vous gardez vos numéros actuels, vos collaborateurs utilisent leur PC, smartphone ou téléphone IP.
          E2I installe et configure 3CX pour vous, avec un support local en Martinique, Guadeloupe et Guyane.
        </p>
      </div>
    ),
  },
  {
    question: "Quels téléphones et appareils sont compatibles avec 3CX ?",
    answerText:
      "3CX est compatible avec la plupart des téléphones IP du marché (Fanvil, Yealink, Grandstream, Snom) ainsi que les softphones 3CX gratuits pour Windows, Mac, iOS et Android. Vous pouvez aussi utiliser un casque USB. Si vous avez déjà des téléphones IP, ils sont probablement compatibles.",
    answer: (
      <div className="space-y-3">
        <p>
          3CX est compatible avec la plupart des téléphones IP du marché : <strong>Fanvil, Yealink,
          Grandstream, Snom</strong> et bien d'autres.
        </p>
        <p>
          Les softphones 3CX sont <strong>gratuits</strong> pour Windows, Mac, iOS et Android. Vous pouvez
          aussi utiliser un casque USB pour passer et recevoir vos appels depuis votre ordinateur.
        </p>
        <p>Si vous avez déjà des téléphones IP, ils sont probablement compatibles — contactez-nous pour vérifier.</p>
      </div>
    ),
  },
  {
    question: "Combien de temps faut-il pour installer 3CX ?",
    answerText:
      "L'installation d'un système 3CX prend généralement entre 1 et 3 jours selon le nombre de postes et la complexité de votre configuration (groupes d'appels, files d'attente, IVR). E2I gère toute la mise en service : installation, configuration des postes, portabilité des numéros et formation de vos équipes.",
    answer: (
      <div className="space-y-3">
        <p>
          L'installation prend généralement <strong>entre 1 et 3 jours</strong> selon le nombre de postes et
          la complexité de votre configuration (groupes d'appels, files d'attente, IVR).
        </p>
        <p>
          E2I gère toute la mise en service : installation, configuration des postes, portabilité des numéros
          et formation de vos équipes.
        </p>
      </div>
    ),
  },
  {
    question: "Puis-je garder mes numéros actuels avec 3CX ?",
    answerText:
      "Oui, nous prenons en charge la portabilité de vos numéros fixes et mobiles en France métropolitaine et dans les DOM-TOM. Vous nous communiquez votre numéro RIO et nous gérons toute la procédure de portabilité sans interruption de service.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Oui</strong>, nous prenons en charge la portabilité de vos numéros fixes et mobiles en
          France métropolitaine et dans les DOM-TOM.
        </p>
        <p>
          Vous nous communiquez votre numéro RIO et nous gérons toute la procédure de portabilité sans
          interruption de service.
        </p>
      </div>
    ),
  },
  {
    question: "Quel support technique E2I propose-t-il pour 3CX ?",
    answerText:
      "E2I propose un support technique local en Martinique, Guadeloupe et Guyane, du lundi au vendredi de 8h à 18h. Nous gérons à distance vos postes et votre instance 3CX. Nous sommes certifiés 3CX et assurons l'installation, la configuration et la maintenance de votre système.",
    answer: (
      <div className="space-y-3">
        <p>
          E2I propose un support technique <strong>local</strong> en Martinique, Guadeloupe et Guyane, du
          lundi au vendredi de 8h à 18h.
        </p>
        <p>
          Nous gérons à distance vos postes et votre instance 3CX. Nous sommes <strong>certifiés 3CX</strong> et
          assurons l'installation, la configuration et la maintenance de votre système.
        </p>
      </div>
    ),
  },
  {
    question: "Comment se passe la migration depuis mon ancien standard ?",
    answerText:
      "E2I accompagne la migration depuis votre ancien standard (PBX classique, autre IPBX) vers 3CX. Nous auditons votre installation actuelle, planifions la migration sans coupure, portons vos numéros et configurons les fonctionnalités équivalentes (groups, IVR, files d'attente). La transition est transparente pour vos collaborateurs.",
    answer: (
      <div className="space-y-3">
        <p>
          E2I accompagne la migration depuis votre ancien standard (PBX classique, autre IPBX) vers 3CX.
        </p>
        <p>Nous auditons votre installation actuelle, planifions la migration <strong>sans coupure</strong>,
          portons vos numéros et configurons les fonctionnalités équivalentes (groups, IVR, files d'attente).</p>
        <p>La transition est transparente pour vos collaborateurs.</p>
      </div>
    ),
  },
];

/** FAQ Téléphonie Entreprise — page /telephonie-entreprise (hub) */
export const FAQ_TELEPHONIE_ENTREPRISE: RichFaqItem[] = [
  {
    question: "Qu'est-ce que la téléphonie d'entreprise IP ?",
    answerText:
      "La téléphonie d'entreprise IP (VoIP) utilise votre connexion Internet pour passer et recevoir des appels, remplaçant les lignes téléphoniques traditionnelles. Elle offre plus de flexibilité, des coûts réduits et des fonctionnalités avancées (transfert, conférence, IVR, mobilité) accessibles depuis un PC, smartphone ou téléphone IP.",
    answer: (
      <div className="space-y-3">
        <p>
          La téléphonie d'entreprise IP (VoIP) utilise votre <strong>connexion Internet</strong> pour passer
          et recevoir des appels, remplaçant les lignes téléphoniques traditionnelles.
        </p>
        <p>
          Elle offre plus de flexibilité, des coûts réduits et des fonctionnalités avancées : transfert,
          conférence, IVR, mobilité — accessibles depuis un PC, smartphone ou téléphone IP.
        </p>
      </div>
    ),
  },
  {
    question: "Quels sont les avantages par rapport à un standard traditionnel ?",
    answerText:
      "La téléphonie IP supprime les contraintes matérielles (pas de carte T2/E1), réduit les coûts (appels via Internet), permet la mobilité (appels depuis n'importe où), et s'adapte à la croissance de l'entreprise (ajout de postes en quelques clics). Elle inclut aussi des fonctionnalités modernes : intégration CRM, vidéo, chat, présence.",
    answer: (
      <div className="space-y-3">
        <p>La téléphonie IP offre des avantages majeurs :</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li><strong>Coûts réduits</strong> — appels via Internet, pas de lignes téléphoniques dédiées</li>
          <li><strong>Mobilité</strong> — passez vos appels depuis n'importe où</li>
          <li><strong>Évolutivité</strong> — ajout de postes en quelques clics</li>
          <li><strong>Fonctionnalités modernes</strong> — intégration CRM, vidéo, chat, présence</li>
          <li><strong>Pas de contraintes matérielles</strong> — pas de carte T2/E1 à installer</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Quelles solutions E2I propose-t-elle pour la téléphonie d'entreprise ?",
    answerText:
      "E2I propose plusieurs solutions : 3CX (IPBX logiciel), PBX Yeastar (IPBX matériel), Trunk SIP (au compteur ou illimité pour relier votre IPBX existant), et 3CX SMB mutualisée pour les TPE. Nous adaptons la solution à vos besoins, votre budget et votre infrastructure existante.",
    answer: (
      <div className="space-y-3">
        <p>E2I propose plusieurs solutions adaptées à chaque besoin :</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li><strong>3CX</strong> — IPBX logiciel, idéal pour PME</li>
          <li><strong>PBX Yeastar</strong> — IPBX matériel, robuste et autonome</li>
          <li><strong>Trunk SIP</strong> — au compteur ou illimité, pour relier votre IPBX existant</li>
          <li><strong>3CX SMB mutualisée</strong> — solution légère pour TPE</li>
        </ul>
        <p>Nous adaptons la solution à vos besoins, votre budget et votre infrastructure existante.</p>
      </div>
    ),
  },
  {
    question: "Comment choisir la bonne solution pour mon entreprise ?",
    answerText:
      "Le choix dépend de votre nombre de collaborateurs, votre volume d'appels, votre infrastructure existante et votre budget. Pour une TPE : 3CX SMB mutualisée. Pour une PME : 3CX ou Yeastar avec Trunk SIP. Pour une structure avec un IPBX existant : Trunk SIP seul. Contactez-nous pour un audit gratuit et un devis personnalisé.",
    answer: (
      <div className="space-y-3">
        <p>Le choix dépend de plusieurs critères :</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li><strong>TPE</strong> : 3CX SMB mutualisée — solution légère et économique</li>
          <li><strong>PME</strong> : 3CX ou Yeastar avec Trunk SIP</li>
          <li><strong>IPBX existant</strong> : Trunk SIP seul pour vos appels sortants</li>
        </ul>
        <p>Contactez-nous pour un audit gratuit et un devis personnalisé.</p>
      </div>
    ),
  },
  {
    question: "E2I est-elle compatible avec mon opérateur actuel ?",
    answerText:
      "Oui. Nos solutions de téléphonie IP sont compatibles avec tous les opérateurs proposant un service SIP. Nous portons vos numéros actuels vers notre Trunk SIP via la portabilité. Vous gardez vos numéros fixes et mobiles sans interruption.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Oui</strong>. Nos solutions de téléphonie IP sont compatibles avec tous les opérateurs
          proposant un service SIP.
        </p>
        <p>
          Nous portons vos numéros actuels vers notre Trunk SIP via la portabilité. Vous gardez vos numéros
          fixes et mobiles sans interruption.
        </p>
      </div>
    ),
  },
];

/** FAQ Trunk SIP Illimité — page /telephonie-entreprise/trunk-sip-illimite */
export const FAQ_TRUNK_ILLIMITE: RichFaqItem[] = [
  {
    question: "Qu'est-ce qu'un Trunk SIP illimité ?",
    answerText:
      "Un Trunk SIP illimité est une liaison VoIP qui vous permet de passer un nombre illimité d'appels vers les fixes et mobiles en France métropolitaine et DOM-TOM, pour un coût mensuel fixe. Il se connecte à votre IPBX (3CX, Yeastar, Asterisk) et remplace vos abonnements téléphoniques traditionnels.",
    answer: (
      <div className="space-y-3">
        <p>
          Un <strong>Trunk SIP illimité</strong> est une liaison VoIP qui vous permet de passer un nombre
          <strong> illimité d'appels</strong> vers les fixes et mobiles en France métropolitaine et DOM-TOM,
          pour un coût mensuel fixe.
        </p>
        <p>
          Il se connecte à votre IPBX (3CX, Yeastar, Asterisk) et remplace vos abonnements téléphoniques
          traditionnels.
        </p>
      </div>
    ),
  },
  {
    question: "Trunk SIP illimité ou au compteur : que choisir ?",
    answerText:
      "Le Trunk SIP illimité est intéressant si vous avez un volume d'appels important et régulier. Le Trunk SIP au compteur, où vous ne payez que les appels effectués, est souvent plus avantageux pour les PME ayant un volume variable. E2I vous aide à choisir en fonction de votre consommation réelle — demandez une étude personnalisée.",
    answer: (
      <div className="space-y-3">
        <p>
          Le <strong>Trunk SIP illimité</strong> est intéressant si vous avez un volume d'appels important et
          régulier.
        </p>
        <p>
          Le <strong>Trunk SIP au compteur</strong>, où vous ne payez que les appels effectués, est souvent
          plus avantageux pour les PME ayant un volume variable.
        </p>
        <p>E2I vous aide à choisir en fonction de votre consommation réelle — demandez une étude personnalisée.</p>
      </div>
    ),
  },
  {
    question: "Le Trunk SIP illimité est-il compatible avec mon PBX ?",
    answerText:
      "Oui, notre Trunk SIP est compatible avec 3CX, Yeastar, Asterisk, Grandstream, Avaya et la plupart des IPBX du marché supportant le protocole SIP standard. Si vous avez un doute sur la compatibilité, contactez-nous pour vérification.",
    answer: (
      <div className="space-y-3">
        <p>
          Oui, notre Trunk SIP est compatible avec <strong>3CX, Yeastar, Asterisk, Grandstream, Avaya</strong> et
          la plupart des IPBX du marché supportant le protocole SIP standard.
        </p>
        <p>Si vous avez un doute sur la compatibilité, contactez-nous pour vérification.</p>
      </div>
    ),
  },
  {
    question: "Quelle est la qualité d'appel avec le Trunk SIP illimité ?",
    answerText:
      "La qualité d'appel dépend de votre connexion Internet. Nous recommandons la fibre optique (FTTO ou FTTH) pour une qualité optimale. Le codec G.711 assure une qualité voix identique au RTC. Nous surveillons en permanence la qualité de nos Trunks SIP et garantissons un taux de disponibilité élevé.",
    answer: (
      <div className="space-y-3">
        <p>
          La qualité d'appel dépend de votre connexion Internet. Nous recommandons la <strong>fibre
          optique</strong> (FTTO ou FTTH) pour une qualité optimale.
        </p>
        <p>
          Le codec <strong>G.711</strong> assure une qualité voix identique au RTC. Nous surveillons en
          permanence la qualité de nos Trunks SIP et garantissons un taux de disponibilité élevé.
        </p>
      </div>
    ),
  },
  {
    question: "Combien de canaux simultanés sont inclus ?",
    answerText:
      "Le Trunk SIP illimité inclut un nombre de canaux simultanés défini selon votre forfait. Les appels illimités couvrent les fixes et mobiles en France métropolitaine et DOM-TOM. Pour les appels internationaux, un forfait au compteur est ajouté. Contactez-nous pour définir le nombre de canaux adapté à votre activité.",
    answer: (
      <div className="space-y-3">
        <p>
          Le Trunk SIP illimité inclut un nombre de <strong>canaux simultanés</strong> défini selon votre
          forfait.
        </p>
        <p>
          Les appels illimités couvrent les <strong>fixes et mobiles en France métropolitaine et DOM-TOM</strong>.
          Pour les appels internationaux, un forfait au compteur est ajouté.
        </p>
        <p>Contactez-nous pour définir le nombre de canaux adapté à votre activité.</p>
      </div>
    ),
  },
];

/** FAQ 3CX SMB Mutualisée — page /telephonie-entreprise/3cx-smb-mutualisee */
export const FAQ_SMB_MUTUALISEE: RichFaqItem[] = [
  {
    question: "Qu'est-ce que 3CX SMB mutualisée ?",
    answerText:
      "3CX SMB mutualisée est une solution de téléphonie IP hébergée sur une infrastructure mutualisée. Vous bénéficiez des fonctionnalités 3CX (softphone, transfert, IVR) sans héberger le serveur chez vous. E2I gère l'infrastructure, vous ne gérez que vos postes. Idéal pour les TPE qui veulent une solution professionnelle sans investissement matériel.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>3CX SMB mutualisée</strong> est une solution de téléphonie IP hébergée sur une
          infrastructure mutualisée.
        </p>
        <p>
          Vous bénéficiez des fonctionnalités 3CX (softphone, transfert, IVR) <strong>sans héberger le serveur
          chez vous</strong>. E2I gère l'infrastructure, vous ne gérez que vos postes.
        </p>
        <p>Idéal pour les TPE qui veulent une solution professionnelle sans investissement matériel.</p>
      </div>
    ),
  },
  {
    question: "Quelle différence entre 3CX SMB mutualisée et 3CX dédié ?",
    answerText:
      "Avec 3CX SMB mutualisée, l'infrastructure est partagée entre plusieurs clients — coût réduit, mise en service rapide, maintenance incluse. Avec 3CX dédié, vous avez votre propre instance — contrôle total, personnalisation avancée, capacité supérieure. La solution mutualisée est idéale jusqu'à 10-15 postes, le dédié au-delà.",
    answer: (
      <div className="space-y-3">
        <p>
          Avec <strong>3CX SMB mutualisée</strong>, l'infrastructure est partagée entre plusieurs clients :
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li>Coût réduit</li>
          <li>Mise en service rapide</li>
          <li>Maintenance incluse</li>
        </ul>
        <p>
          Avec <strong>3CX dédié</strong>, vous avez votre propre instance : contrôle total, personnalisation
          avancée, capacité supérieure.
        </p>
        <p>La mutualisée est idéale jusqu'à 10-15 postes, le dédié au-delà.</p>
      </div>
    ),
  },
  {
    question: "Pour qui est destinée la solution 3CX SMB mutualisée ?",
    answerText:
      "3CX SMB mutualisée s'adresse aux TPE et petites PME (1 à 15 postes) qui veulent une téléphonie professionnelle sans gérer de serveur. Parfaite pour les commerçants, artisans, professions libérales, startups. Vous accédez à vos appels depuis un softphone sur PC, mobile ou téléphone IP, avec un coût mensuel prévisible.",
    answer: (
      <div className="space-y-3">
        <p>
          3CX SMB mutualisée s'adresse aux <strong>TPE et petites PME</strong> (1 à 15 postes) qui veulent une
          téléphonie professionnelle sans gérer de serveur.
        </p>
        <p>
          Parfaite pour les commerçants, artisans, professions libérales, startups. Vous accédez à vos appels
          depuis un softphone sur PC, mobile ou téléphone IP, avec un coût mensuel prévisible.
        </p>
      </div>
    ),
  },
  {
    question: "Mes données sont-elles sécurisées en mutualisé ?",
    answerText:
      "Oui. Chaque client a son propre environnement isolé. Les données d'appels, configurations et journaux sont séparés entre les clients. L'accès à votre interface d'administration est protégé par mot de passe et chiffrement. E2I applique les mises à jour de sécurité 3CX régulièrement.",
    answer: (
      <div className="space-y-3">
        <p><strong>Oui</strong>. Chaque client a son propre <strong>environnement isolé</strong>.</p>
        <p>
          Les données d'appels, configurations et journaux sont séparés entre les clients. L'accès à votre
          interface d'administration est protégé par mot de passe et chiffrement.
        </p>
        <p>E2I applique les mises à jour de sécurité 3CX régulièrement.</p>
      </div>
    ),
  },
  {
    question: "Puis-je migrer de 3CX SMB mutualisée vers un 3CX dédié ?",
    answerText:
      "Oui, la migration de 3CX SMB mutualisée vers une instance dédiée est possible à tout moment. E2I gère la transition sans interruption : export de votre configuration, déploiement de l'instance dédiée, bascule des canaux SIP. C'est une évolution naturelle quand votre entreprise grandit.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Oui</strong>, la migration de 3CX SMB mutualisée vers une instance dédiée est possible à
          tout moment.
        </p>
        <p>
          E2I gère la transition sans interruption : export de votre configuration, déploiement de l'instance
          dédiée, bascule des canaux SIP.
        </p>
        <p>C'est une évolution naturelle quand votre entreprise grandit.</p>
      </div>
    ),
  },
];

/** FAQ PBX Yeastar — page /telephonie-entreprise/pbx-yeastar */
export const FAQ_PBX_YEASTAR: RichFaqItem[] = [
  {
    question: "Qu'est-ce qu'un PBX Yeastar ?",
    answerText:
      "Un PBX Yeastar est un standard téléphonique IP matériel (IPBX) fabriqué par Yeastar, leader des solutions de communications unifiées. Il s'installe dans vos locaux et gère tous vos appels. Contrairement à un IPBX logiciel, le Yeastar est un appareil autonome avec son propre système d'exploitation. E2I est partenaire Yeastar et assure vente, installation et support.",
    answer: (
      <div className="space-y-3">
        <p>
          Un <strong>PBX Yeastar</strong> est un standard téléphonique IP matériel (IPBX) fabriqué par Yeastar,
          leader des solutions de communications unifiées.
        </p>
        <p>
          Il s'installe dans vos locaux et gère tous vos appels. Contrairement à un IPBX logiciel, le Yeastar
          est un appareil <strong>autonome</strong> avec son propre système d'exploitation.
        </p>
        <p>E2I est partenaire Yeastar et assure vente, installation et support.</p>
      </div>
    ),
  },
  {
    question: "Pourquoi choisir Yeastar plutôt que 3CX ?",
    answerText:
      "Yeastar est un IPBX matériel — il fonctionne de manière autonome, sans dépendre d'un serveur Windows/Linux. Il est idéal si vous voulez une solution robuste, peu gourmande en ressources, qui tourne 24/7 sans intervention. 3CX est un logiciel plus flexible et évolutif. Le choix dépend de vos préférences : matériel autonome (Yeastar) vs logiciel flexible (3CX).",
    answer: (
      <div className="space-y-3">
        <p>
          Yeastar est un <strong>IPBX matériel</strong> — il fonctionne de manière autonome, sans dépendre
          d'un serveur Windows/Linux.
        </p>
        <p>Il est idéal si vous voulez une solution :</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li><strong>Robuste</strong> et peu gourmande en ressources</li>
          <li>Qui tourne <strong>24/7</strong> sans intervention</li>
          <li><strong>Autonome</strong> sans dépendance serveur</li>
        </ul>
        <p>
          3CX est un logiciel plus flexible et évolutif. Le choix dépend de vos préférences : matériel autonome
          (Yeastar) vs logiciel flexible (3CX).
        </p>
      </div>
    ),
  },
  {
    question: "Quels modèles Yeastar sont disponibles chez E2I ?",
    answerText:
      "E2I propose plusieurs modèles Yeastar selon la taille de votre entreprise : P-Series pour les PME (20 à 200 postes), S-Series pour les petites entreprises (jusqu'à 100 postes). Chaque modèle supporte un nombre différent de canaux SIP et d'extensions. Contactez-nous pour déterminer le modèle adapté à vos besoins.",
    answer: (
      <div className="space-y-3">
        <p>E2I propose plusieurs modèles Yeastar selon la taille de votre entreprise :</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
          <li><strong>P-Series</strong> — PME (20 à 200 postes)</li>
          <li><strong>S-Series</strong> — petites entreprises (jusqu'à 100 postes)</li>
        </ul>
        <p>
          Chaque modèle supporte un nombre différent de canaux SIP et d'extensions. Contactez-nous pour
          déterminer le modèle adapté à vos besoins.
        </p>
      </div>
    ),
  },
  {
    question: "Le PBX Yeastar est-il compatible avec les opérateurs SIP ?",
    answerText:
      "Oui, le PBX Yeastar est compatible avec tous les opérateurs proposant un service SIP standard. E2I fournit son propre Trunk SIP (au compteur ou illimité) mais vous pouvez aussi utiliser un opérateur tiers. La configuration des trunks SIP se fait via l'interface web du Yeastar.",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Oui</strong>, le PBX Yeastar est compatible avec tous les opérateurs proposant un service
          SIP standard.
        </p>
        <p>
          E2I fournit son propre <strong>Trunk SIP</strong> (au compteur ou illimité) mais vous pouvez aussi
          utiliser un opérateur tiers.
        </p>
        <p>La configuration des trunks SIP se fait via l'interface web du Yeastar.</p>
      </div>
    ),
  },
  {
    question: "Quel support E2I propose-t-elle pour les PBX Yeastar ?",
    answerText:
      "E2I est partenaire Yeastar et propose un support complet : installation, configuration, maintenance et mise à jour. Support local en Martinique, Guadeloupe et Guyane du lundi au vendredi de 8h à 18h. Nous gérons à distance votre PBX et assurons les évolutions de firmware.",
    answer: (
      <div className="space-y-3">
        <p>
          E2I est <strong>partenaire Yeastar</strong> et propose un support complet : installation,
          configuration, maintenance et mise à jour.
        </p>
        <p>
          Support <strong>local</strong> en Martinique, Guadeloupe et Guyane, du lundi au vendredi de 8h à 18h.
        </p>
        <p>Nous gérons à distance votre PBX et assurons les évolutions de firmware.</p>
      </div>
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

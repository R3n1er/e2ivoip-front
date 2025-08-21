"use client";

import { useState } from "react";
import { ChevronDown, Plus, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

const defaultFAQItems: FAQItem[] = [
  {
    question: "Définition de SIP et de la VoIP",
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

export function FAQAccordion({
  items = defaultFAQItems,
  title = "FAQ",
  subtitle = "Réponses aux questions fréquemment posées par nos clients",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/10 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-red-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>

      {/* Accordion Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card
            key={index}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "shadow-lg" : "hover:shadow-md"
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span className="font-semibold text-gray-900 pr-4">
                {item.question}
              </span>
              <div
                className={`flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                {openIndex === index ? (
                  <ChevronDown className="w-5 h-5 text-red-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            <div
              id={`faq-content-${index}`}
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="px-6 pb-6 text-gray-600">
                {typeof item.answer === "string" ? (
                  <p>{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
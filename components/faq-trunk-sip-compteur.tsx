'use client'

interface FAQItem {
  question: string
  answer: string | React.ReactNode
}

const faqData: FAQItem[] = [
  {
    question: "Quelle est la différence entre Trunk SIP au compteur et illimité ?",
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
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Oui, c'est notre avantage principal !</strong> Nos équipes techniques sont présentes en 
          <strong> Martinique, Guadeloupe et Guyane</strong>. Support disponible du lundi au vendredi de 8h à 18h (heure locale).
        </p>
        <p>Intervention sur site possible si nécessaire.</p>
        <div className="space-y-1">
          <p><strong>Nos numéros de support local :</strong></p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>Guyane : <a href="tel:+594594963500" className="text-red-primary hover:underline font-semibold">05 94 96 35 00</a></li>
            <li>France : <a href="tel:+33189560500" className="text-red-primary hover:underline font-semibold">01 89 56 05 00</a></li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "Quelle connexion Internet est recommandée ?",
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
    answer: (
      <div className="space-y-3">
        <p>
          Avec notre <strong>Trunk SIP au compteur</strong>, vous payez uniquement vos communications réelles :
        </p>
        <ul className="space-y-2 text-gray-600">
          <li>✓ <strong>Facturation dès la première seconde</strong> de communication</li>
          <li>✓ <strong>Pas de minimum de facturation</strong> (pas de paliers de 30 secondes)</li>
          <li>✓ <strong>Transparence totale</strong> : facture détaillée avec chaque appel</li>
          <li>✓ <strong>Appels entrants gratuits</strong> (seuls les appels sortants sont facturés)</li>
        </ul>
        <p className="text-sm bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
          <strong>Exemple concret :</strong> Un appel de 1 minute 23 secondes vers un fixe DOM 
          vous coûtera exactement 0,0275€ (83 secondes × 0,02€/minute ÷ 60).
        </p>
      </div>
    ),
  },
]

export default function TrunkSipCompteurFAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/10 rounded-full mb-4">
          <i className="lni lni-question-circle text-4xl text-red-primary" role="img" aria-label="FAQ"></i>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
          Questions <span className="text-red-primary">fréquentes</span>
        </h2>
        <p className="text-xl text-gray-600">
          Tout ce qu'il faut savoir sur notre Trunk SIP au compteur DOM
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <details 
            key={index}
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md open:shadow-lg"
          >
            <summary className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-primary focus:ring-offset-2 list-none">
              <span className="font-semibold text-gray-dark pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
                <svg 
                  className="w-5 h-5 text-red-primary" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </summary>
            
            <div className="border-t border-gray-100 bg-gray-50">
              <div className="px-6 py-6 text-gray-600">
                {typeof item.answer === 'string' ? (
                  <p>{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
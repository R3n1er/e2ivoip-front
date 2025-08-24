import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trunk SIP au Compteur DOM-TOM - E2I VoIP | Passerelle SIP Antilles-Guyane-Réunion",
  description:
    "Trunk SIP au compteur DOM-TOM : payez uniquement vos consommations réelles. Connexions SIP locales Antilles-Guyane-Réunion. Numéros locaux gratuits. Économisez jusqu'à 30%.",
  keywords:
    "trunk SIP compteur DOM-TOM, passerelle SIP Antilles, VoIP Guadeloupe Martinique Guyane Réunion, connexion SIP locale, numéros géographiques DOM-TOM, opérateur télécom local",
  openGraph: {
    title: "Trunk SIP au Compteur DOM-TOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM-TOM. Payez uniquement vos consommations réelles. Numéros locaux gratuits.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-compteur",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP au Compteur DOM-TOM - E2I VoIP",
    description: "Connexions SIP au compteur pour entreprises DOM-TOM. Économisez jusqu'à 30%.",
  },
};

export default function TrunkSIPCompteur() {
  const compatibleBrands = [
    { name: "3CX", description: "IPBX cloud leader mondial" },
    { name: "Yeastar", description: "Solutions économiques PME" },
    { name: "Grandstream", description: "Passerelles VoIP robustes" },
    { name: "Avaya", description: "Solutions entreprise" },
    { name: "Asterisk", description: "Open source flexible" }
  ];

  const useCases = [
    {
      icon: "lni-store",
      title: "Commerce de proximité",
      description: "Boutiques, magasins, restaurants avec volume d'appels modéré",
      users: "3-8 postes",
      savings: "Économies : 150-300€/mois"
    },
    {
      icon: "lni-heart-pulse",
      title: "Cabinets médicaux",
      description: "Médecins, dentistes, kinés avec prise de RDV téléphonique",
      users: "2-5 postes",
      savings: "Économies : 80-200€/mois"
    },
    {
      icon: "lni-law",
      title: "Professions libérales",
      description: "Avocats, notaires, experts-comptables, consultants",
      users: "2-10 postes",
      savings: "Économies : 100-400€/mois"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <i className="lni lni-phone text-white mr-2"></i>
                <span className="text-white/90 text-sm font-medium">Opérateur SIP DOM-TOM</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP au <span className="text-white">compteur</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                <strong>Payez uniquement vos consommations réelles</strong> avec notre passerelle SIP DOM-TOM
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Économisez jusqu'à <strong>30%</strong> sur vos coûts télécom • Connexions SIP locales Antilles-Guyane-Réunion
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <i className="lni lni-checkmark-circle text-white"></i>
                  <span className="text-sm">Facturation à la seconde</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-phone text-white"></i>
                  <span className="text-sm">Numéros locaux gratuits</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="lni lni-users text-white"></i>
                  <span className="text-sm">Support technique local</span>
                </div>
              </div>

              {/* CTA Hero */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/devis-en-ligne">
                  <button className="btn btn-primary btn-lg shadow-xl">
                    <i className="lni lni-calculator mr-2"></i>
                    Calculer mes économies
                  </button>
                </Link>
                <a href="tel:+33189560500">
                  <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                    <i className="lni lni-phone mr-2"></i>
                    01 89 56 05 00
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problématique */}
        <section className="py-16 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Vos factures télécom <span className="text-red-primary">explosent</span> ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                <strong>Les entreprises DOM-TOM paient 40% plus cher</strong> leurs communications que nécessaire
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-6">
                    <i className="lni lni-money-location text-red-primary text-3xl"></i>
                  </div>
                  <h3 className="card-title text-lg text-gray-dark">Coûts imprévisibles</h3>
                  <p className="text-gray-600">Factures qui varient de <strong>200 à 800€</strong> selon les mois sans visibilité sur la consommation</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-6">
                    <i className="lni lni-network text-red-primary text-3xl"></i>
                  </div>
                  <h3 className="card-title text-lg text-gray-dark">PABX obsolète</h3>
                  <p className="text-gray-600">Ancien système limité, <strong>coûteux à maintenir</strong> et incompatible avec le télétravail</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-6">
                    <i className="lni lni-map-marker text-red-primary text-3xl"></i>
                  </div>
                  <h3 className="card-title text-lg text-gray-dark">Numéros non-locaux</h3>
                  <p className="text-gray-600"><strong>Aucun numéro géographique</strong> dans votre zone DOM-TOM, pénalisant votre image locale</p>
                </div>
              </div>
            </div>

            {/* Statistiques d'impact */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-primary mb-2">40%</div>
                  <p className="text-gray-600">Coûts supplémentaires DOM-TOM</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-primary mb-2">65%</div>
                  <p className="text-gray-600">Entreprises avec PABX obsolète</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-primary mb-2">85%</div>
                  <p className="text-gray-600">Sans numéros locaux DOM-TOM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <i className="lni lni-checkmark-circle mr-2"></i>
                  Solution certifiée DOM-TOM
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                  <span className="text-red-primary">Trunk SIP au compteur</span> : payez seulement ce que vous consommez
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  <strong>Passerelle SIP spécialisée DOM-TOM</strong> qui connecte votre IPBX au réseau téléphonique. 
                  Facturation <strong>transparente à la seconde</strong> dès la première seconde.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-money-location text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">Facturation au compteur transparente</h3>
                      <p className="text-gray-600"><strong>Payez uniquement vos appels émis</strong>, facturation à la seconde dès le premier décroché. Idéal pour les centres d'appels et TPE/PME.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-phone text-blue-marine text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">Numéros locaux DOM-TOM gratuits</h3>
                      <p className="text-gray-600"><strong>Création et portabilité gratuites</strong> de numéros géographiques Antilles-Guyane-Réunion pour renforcer votre image locale.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-network text-red-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">Compatible tous IPBX</h3>
                      <p className="text-gray-600">Compatible avec <strong>3CX, Yeastar, Grandstream, Avaya, Asterisk</strong>. Connexions flexibles de 2 à 30 appels simultanés.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="lni lni-users text-gray-secondary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">Support technique local réactif</h3>
                      <p className="text-gray-600">Équipes présentes localement en <strong>Martinique, Guadeloupe, Guyane</strong>. Réponse en moins de 2h.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tarification DOM-TOM</h3>
                  <p className="text-gray-600">Facturation à la seconde dès la première seconde</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Appels locaux Antilles-Guyane-Réunion</span>
                      <span className="text-green-600 font-bold text-lg">0,02€/min</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Appels France métropolitaine</span>
                      <span className="text-blue-600 font-bold text-lg">0,015€/min</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Appels mobiles France + DOM</span>
                      <span className="text-orange-600 font-bold text-lg">0,09€/min</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Création numéro local + Portabilité</span>
                      <span className="text-green-600 font-bold text-lg">GRATUIT</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <i className="lni lni-information text-yellow-600 mt-0.5"></i>
                    <div className="text-sm text-yellow-800">
                      <p><strong>Exemple concret :</strong> 200 minutes/mois = 6€ au lieu de 45€ (ancien opérateur)</p>
                      <p className="text-xs mt-1">* Tarifs HT - Connexion Internet ADSL/Fibre requise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibilité IPBX */}
        <section className="py-16 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Compatible avec <span className="text-red-primary">tous les IPBX</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre Trunk SIP s'intègre parfaitement avec toutes les marques d'IPBX du marché
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {compatibleBrands.map((brand, index) => (
                <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="card-body items-center text-center p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="lni lni-checkmark text-green-600 text-xl"></i>
                    </div>
                    <h3 className="card-title text-base text-gray-dark">{brand.name}</h3>
                    <p className="text-gray-600 text-sm">{brand.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                <strong>Pas d'IPBX ?</strong> Nous proposons des solutions complètes incluant l'équipement
              </p>
              <Link 
                href="/nos-services" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Découvrir nos solutions IPBX
                <i className="lni lni-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
                Idéal pour votre <span className="text-red-primary">entreprise</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Le Trunk SIP au compteur s'adapte parfaitement aux besoins des TPE et PME DOM-TOM
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="card bg-gradient-to-br from-blue-50 to-red-50 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                      <i className={`lni ${useCase.icon} text-blue-600 text-3xl`}></i>
                    </div>
                    <h3 className="card-title text-xl text-gray-dark">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                    <div className="card-actions flex-col space-y-2">
                      <div className="badge bg-blue-marine text-white">
                        {useCase.users}
                      </div>
                      <div className="text-green-600 font-semibold text-sm">
                        {useCase.savings}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignage client */}
        <section className="py-16 bg-base-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="lni lni-quotation text-green-600 text-3xl"></i>
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 italic">
                  "Avec le Trunk SIP au compteur d'E2I VoIP, nous avons <strong>réduit notre facture télécom de 35%</strong> 
                  tout en gardant nos numéros locaux martiniquais. La facturation transparente nous permet enfin de maîtriser notre budget."
                </blockquote>
                <div className="text-gray-600">
                  <div className="font-semibold text-gray-900">Dr. Marie Dubois</div>
                  <div>Cabinet médical • Fort-de-France, Martinique</div>
                  <div className="text-sm mt-2">
                    <span className="inline-flex items-center text-green-600">
                      <i className="lni lni-checkmark-circle mr-1"></i>
                      Client E2I VoIP depuis 2 ans
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions <span className="text-red-primary">fréquentes</span>
              </h2>
            </div>

            <div className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title text-lg font-medium">
                  Quelle est la différence entre Trunk SIP au compteur et illimité ?
                </div>
                <div className="collapse-content">
                  <p className="text-gray-600">
                    Le <strong>Trunk SIP au compteur</strong> facture uniquement vos appels émis à la seconde (idéal pour faible volume &lt; 200 min/mois), 
                    tandis que <strong>l'illimité</strong> propose un forfait fixe mensuel pour des appels illimités vers France + DOM-TOM 
                    (recommandé pour plus de 200 minutes/mois).
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">
                  Puis-je garder mes numéros actuels ?
                </div>
                <div className="collapse-content">
                  <p className="text-gray-600">
                    <strong>Oui, absolument !</strong> Nous gérons gratuitement la portabilité de vos numéros existants. 
                    Nous pouvons également créer de nouveaux numéros géographiques dans votre zone DOM-TOM 
                    (ex: 0590 pour Guadeloupe, 0596 pour Martinique, 0594 pour Guyane).
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">
                  Quel équipement faut-il pour utiliser le Trunk SIP ?
                </div>
                <div className="collapse-content">
                  <p className="text-gray-600">
                    Vous avez besoin d'un <strong>IPBX</strong> (comme 3CX, Yeastar) ou d'une <strong>passerelle SIP</strong>. 
                    Si vous n'en avez pas, nous proposons des solutions complètes incluant l'équipement et la configuration.
                    Une connexion Internet stable (ADSL/Fibre) est également requise.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">
                  Le support technique est-il disponible localement ?
                </div>
                <div className="collapse-content">
                  <p className="text-gray-600">
                    <strong>Oui, c'est notre avantage principal !</strong> Nos équipes techniques sont présentes en 
                    <strong>Martinique, Guadeloupe et Guyane</strong>. Support disponible du lundi au vendredi de 8h à 18h (heure locale).
                    Intervention sur site possible si nécessaire.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">
                  Quelle connexion Internet est recommandée ?
                </div>
                <div className="collapse-content">
                  <div className="text-gray-600">
                    <p><strong>Recommandations techniques :</strong></p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Fibre optique FTTO Entreprise</strong> (idéal)</li>
                      <li><strong>SDSL Cuivre</strong> avec 2Mb dédiés à la VoIP minimum</li>
                      <li><strong>Box 4G</strong> avec forfait 200GB/illimité VoIP en secours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section finale */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Calculez vos <span className="text-white">économies</span> maintenant
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Obtenez votre <strong>devis personnalisé en 2 minutes</strong> et découvrez combien vous pouvez économiser avec notre Trunk SIP au compteur
            </p>
            
            {/* Avantages finaux */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-white/90">
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-checkmark-circle text-white"></i>
                <span className="text-sm">Devis gratuit</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-timer text-white"></i>
                <span className="text-sm">Réponse en 2h</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="lni lni-shield text-white"></i>
                <span className="text-sm">Sans engagement</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/devis-en-ligne">
                <button className="btn btn-primary btn-lg shadow-xl">
                  <i className="lni lni-calculator mr-2"></i>
                  Calculer mes économies gratuitement
                </button>
              </Link>
              <a href="tel:+33189560500">
                <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-red-primary">
                  <i className="lni lni-phone mr-2"></i>
                  Parler à un expert : 01 89 56 05 00
                </button>
              </a>
            </div>
            
            <p className="text-white/70 text-sm mt-6">
              <strong>Expertise DOM-TOM depuis 15 ans</strong> • Plus de 100 entreprises nous font confiance
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
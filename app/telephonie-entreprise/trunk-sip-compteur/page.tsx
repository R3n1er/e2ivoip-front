import { Metadata } from "next";
import Link from "next/link";
import TrunkSipCompteurFAQ from "@/components/faq-trunk-sip-compteur";
// Tally embed inséré en iframe (pas de popup)
import { TallyEmbedDevis } from "@/components/tally-embed-devis";

export const metadata: Metadata = {
  title: "Trunk SIP au Compteur DOM — Antilles-Guyane | E2I VoIP",
  description:
    "Trunk SIP au compteur DOM : payez uniquement vos consommations réelles. Connexions SIP locales Antilles-Guyane-Réunion. Numéros locaux gratuits. Économisez jusqu'à 30%.",
  keywords:
    "trunk SIP compteur DOM, passerelle SIP Antilles, VoIP Guadeloupe Martinique Guyane Réunion, connexion SIP locale, numéros géographiques DOM, opérateur télécom local",
  alternates: {
    canonical: "/telephonie-entreprise/trunk-sip-compteur",
  },
  openGraph: {
    title: "Trunk SIP au Compteur DOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM. Payez uniquement vos consommations réelles. Numéros locaux gratuits.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-compteur",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP au Compteur DOM - E2I VoIP",
    description:
      "Connexions SIP au compteur pour entreprises DOM. Économisez jusqu'à 30%.",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Trunk SIP au Compteur DOM",
  "description": "Connexions SIP facturees a la consommation reelle. Numeros locaux gratuits. Economisez jusqu'a 30%.",
  "url": "https://www.e2i-voip.com/telephonie-entreprise/trunk-sip-compteur",
  "provider": { "@type": "Organization", "name": "E2I VoIP", "url": "https://www.e2i-voip.com" },
  "serviceType": "Trunk SIP",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Martinique" },
    { "@type": "AdministrativeArea", "name": "Guadeloupe" },
    { "@type": "AdministrativeArea", "name": "Guyane francaise" },
    { "@type": "AdministrativeArea", "name": "La Reunion" }
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.e2i-voip.com" },
      { "@type": "ListItem", "position": 2, "name": "Telephonie Entreprise", "item": "https://www.e2i-voip.com/telephonie-entreprise" },
      { "@type": "ListItem", "position": 3, "name": "Trunk SIP Compteur", "item": "https://www.e2i-voip.com/telephonie-entreprise/trunk-sip-compteur" }
    ]
  }
};

function JsonLdScript() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function TrunkSIPCompteur() {
  return (
    <>
      <JsonLdScript />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#091421] py-32 px-8 lg:px-24">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
            alt="Professionnel utilisant la téléphonie IP E2I VoIP"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Micro-label */}
          <div className="inline-flex items-center gap-2 mb-8 border border-red-primary/40 px-4 py-2 bg-red-primary/10">
            <i className="lni lni-phone text-red-primary" aria-hidden="true" />
            <span className="text-red-primary font-black uppercase text-[10px] tracking-[0.3em]">
              Opérateur SIP en France métropolitaine, en Guadeloupe, Martinique, Guyane et La Réunion
            </span>
          </div>

          {/* Left-aligned layout */}
          <div className="max-w-3xl">
            {/* Red left border accent */}
            <div className="border-l-8 border-red-primary pl-8 mb-10">
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-[-0.05em] leading-tight mb-6">
                Trunk SIP au{" "}
                <span className="text-red-primary">compteur</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-4">
                <strong className="text-white">
                  Payez uniquement vos consommations réelles
                </strong>{" "}
                avec notre passerelle SIP DOM
              </p>
              <p className="text-lg text-white/70">
                Économisez jusqu&apos;à <strong className="text-white">30%</strong>{" "}
                sur vos coûts télécom — Connexions SIP locales
                Antilles-Guyane-Réunion
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 border border-white/20 px-4 py-2 bg-white/5">
                <i className="lni lni-checkmark-circle text-red-primary" aria-hidden="true" />
                <span className="text-white/80 text-sm font-bold uppercase tracking-[0.1em]">
                  Facturation à la seconde
                </span>
              </div>
              <div className="flex items-center gap-2 border border-white/20 px-4 py-2 bg-white/5">
                <i className="lni lni-phone text-red-primary" aria-hidden="true" />
                <span className="text-white/80 text-sm font-bold uppercase tracking-[0.1em]">
                  Numéros locaux gratuits
                </span>
              </div>
              <div className="flex items-center gap-2 border border-white/20 px-4 py-2 bg-white/5">
                <i className="lni lni-users text-red-primary" aria-hidden="true" />
                <span className="text-white/80 text-sm font-bold uppercase tracking-[0.1em]">
                  Support technique local
                </span>
              </div>
            </div>

            {/* Single CTA */}
            <Link href="/devis-en-ligne" className="monolith-btn bg-red-primary inline-block">
              <span className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5">
                <i className="lni lni-calculator" aria-hidden="true" />
                Calculer mes économies
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section explicative */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#2D3848] text-lg leading-relaxed">
            <strong>E2I VoIP</strong> est opérateur télécom et vous fournit des
            Trunks SIP de qualité professionnelle en France métropolitaine et en
            Guadeloupe, Martinique, Guyane et La Réunion. Avec la fin programmée
            du réseau RTC, le Trunk SIP est aujourd&apos;hui la solution de
            référence pour maintenir et moderniser votre téléphonie
            d&apos;entreprise. Il assure la liaison entre votre IPBX et le réseau
            téléphonique, via Internet — autrement dit, c&apos;est votre ligne
            téléphonique IP. Un seul interlocuteur gère l&apos;ensemble de votre
            déploiement : ouverture des lignes, portabilité des numéros, support
            technique. Pas d&apos;intermédiaire, pas de délai inutile.
          </p>
          <p className="text-[#2D3848] text-lg leading-relaxed mt-6">
            La décommission progressive du réseau RTC par votre opérateur
            historique accélère la fin des{" "}
            <strong className="text-[#091421]">lignes RNIS T0</strong> et T2.
            C&apos;est une occasion concrète de moderniser votre téléphonie : en
            basculant vers un{" "}
            <strong className="text-[#091421]">Trunk SIP au compteur</strong>,
            vous conservez vos numéros existants grâce à la{" "}
            <strong className="text-[#091421]">portabilité</strong>, vous gardez
            votre IPBX actuel (3CX, Yeastar, Grandstream…) et vous réduisez
            généralement votre facture de{" "}
            <strong className="text-[#091421]">30 %</strong> par rapport à votre
            abonnement T0 actuel.
          </p>
          <p className="text-[#2D3848] text-lg leading-relaxed mt-4">
            E2I VoIP gère l&apos;intégralité de la{" "}
            <strong className="text-[#091421]">
              migration T0 vers la téléphonie IP
            </strong>{" "}
            : audit de votre installation, configuration du Trunk SIP sur votre
            équipement, suivi de la portabilité et bascule — le tout sans
            interruption de service. Un interlocuteur unique vous accompagne de
            la première analyse jusqu&apos;à la mise en production.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="mb-16">
            <div className="w-12 h-1 bg-red-primary mb-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary block mb-4">
              Solution certifiée DOM
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#091421] uppercase tracking-[-0.05em] leading-tight">
              <span className="text-red-primary">Trunk SIP</span> au compteur
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: features */}
            <div>
              <p className="text-xl text-[#818096] mb-10 leading-relaxed">
                <strong className="text-[#091421]">
                  Passerelle SIP spécialisée DOM
                </strong>{" "}
                qui connecte votre IPBX au réseau téléphonique. Facturation{" "}
                <strong className="text-[#091421]">transparente à la seconde</strong>{" "}
                dès la première seconde.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 border-l-4 border-red-primary pl-6">
                  <div className="w-12 h-12 bg-red-primary/10 flex items-center justify-center flex-shrink-0">
                    <i
                      className="lni lni-money-location text-red-primary text-xl"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-[#091421] uppercase tracking-[-0.03em] mb-2">
                      Facturation au compteur transparente
                    </h3>
                    <p className="text-[#818096]">
                      <strong className="text-[#1F2937]">
                        Payez uniquement vos appels émis
                      </strong>
                      , facturation à la seconde dès le premier décroché. Idéal
                      pour les centres d&apos;appels et TPE/PME.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 border-l-4 border-[#2D3848] pl-6">
                  <div className="w-12 h-12 bg-[#2D3848]/10 flex items-center justify-center flex-shrink-0">
                    <i
                      className="lni lni-phone text-[#2D3848] text-xl"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-[#091421] uppercase tracking-[-0.03em] mb-2">
                      Numéros locaux DOM (Création et Portabilité)
                    </h3>
                    <p className="text-[#818096]">
                      <strong className="text-[#1F2937]">
                        Création et portabilité
                      </strong>{" "}
                      de numéros géographiques Antilles-Guyane-Réunion pour
                      renforcer votre image locale.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 border-l-4 border-red-primary pl-6">
                  <div className="w-12 h-12 bg-red-primary/10 flex items-center justify-center flex-shrink-0">
                    <i
                      className="lni lni-network text-red-primary text-xl"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-[#091421] uppercase tracking-[-0.03em] mb-2">
                      Compatible tous IPBX
                    </h3>
                    <p className="text-[#818096]">
                      Compatible avec{" "}
                      <strong className="text-[#1F2937]">
                        3CX, Yeastar, Grandstream, Avaya
                      </strong>
                      . Connexions flexibles de 2 à plus de 30 appels simultanés
                      sur un Trunk SIP.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 border-l-4 border-[#1F2937] pl-6">
                  <div className="w-12 h-12 bg-[#1F2937]/10 flex items-center justify-center flex-shrink-0">
                    <i
                      className="lni lni-users text-[#818096] text-xl"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-[#091421] uppercase tracking-[-0.03em] mb-2">
                      Un interlocuteur dédié, présent dans vos territoires
                    </h3>
                    <p className="text-[#818096]">
                      Nos équipes sont implantées localement en{" "}
                      <strong className="text-[#1F2937]">
                        Guadeloupe, Martinique, Guyane et La Réunion
                      </strong>
                      . Un seul contact suit votre dossier de bout en bout :
                      migration RTC, ouverture des canaux, incidents. Réponse
                      garantie en moins de 2h.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: pricing card */}
            <div className="border-4 border-[#2D3848] shadow-[8px_8px_0px_0px_#1F2937]">
              <div className="bg-[#091421] px-8 py-6">
                <h3 className="text-xl font-black text-white uppercase tracking-[-0.03em]">
                  Tarifs à la minute
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  Facturation à la seconde dès la première seconde — Pas de
                  frais cachés
                </p>
              </div>

              <div className="bg-white divide-y divide-[#2D3848]/10">
                <div className="flex justify-between items-center px-8 py-5">
                  <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">
                    France Fixe
                  </span>
                  <span className="text-red-primary font-black text-lg">
                    0,0120 €/min
                  </span>
                </div>
                <div className="flex justify-between items-center px-8 py-5">
                  <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">
                    France Mobile
                  </span>
                  <span className="text-[#2D3848] font-black text-lg">
                    0,0600 €/min
                  </span>
                </div>
                <div className="flex justify-between items-center px-8 py-5">
                  <span className="font-bold text-sm uppercase tracking-wider text-[#091421] max-w-[200px] leading-tight">
                    DOM Fixe (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)
                  </span>
                  <span className="text-[#1F2937] font-black text-lg whitespace-nowrap ml-4">
                    0,0160 €/min
                  </span>
                </div>
                <div className="flex justify-between items-center px-8 py-5">
                  <span className="font-bold text-sm uppercase tracking-wider text-[#091421] max-w-[200px] leading-tight">
                    DOM Mobile (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)
                  </span>
                  <span className="text-[#1F2937] font-black text-lg whitespace-nowrap ml-4">
                    0,0800 €/min
                  </span>
                </div>
                <div className="flex justify-between items-center px-8 py-5">
                  <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">
                    Création Numéro
                  </span>
                  <span className="text-[#818096] font-black uppercase tracking-[0.3em] text-[10px]">
                    Sur devis
                  </span>
                </div>
                <div className="flex justify-between items-center px-8 py-5">
                  <span className="font-bold text-sm uppercase tracking-wider text-[#091421]">
                    Portabilité
                  </span>
                  <span className="text-[#818096] font-black uppercase tracking-[0.3em] text-[10px]">
                    Sur devis
                  </span>
                </div>
              </div>

              {/* Info box */}
              <div className="bg-[#2D3848]/5 border-t-4 border-[#2D3848] px-8 py-6">
                <div className="flex items-start gap-3">
                  <i
                    className="lni lni-information text-[#2D3848] mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div className="text-sm text-[#2D3848]">
                    <p>
                      <strong>Facturation transparente :</strong> Pas de frais
                      de connexion, pas de minimum de consommation, facturation
                      à la seconde dès la première seconde.
                    </p>
                    <p className="mt-2">
                      <strong>Numéros locaux :</strong> Création et portabilité
                      de numéros géographiques DOM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibilité IPBX */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421]">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="mb-16">
            <div className="w-12 h-1 bg-red-primary mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[-0.05em] leading-tight">
              Compatible avec{" "}
              <span className="text-red-primary">tous les IPBX</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mt-4">
              Notre Trunk SIP s&apos;intègre parfaitement avec toutes les marques
              d&apos;IPBX du marché
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* 3CX */}
            <div className="bg-white border-4 border-white shadow-[8px_8px_0px_0px_#1F2937] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img
                  src="/images/logos-sip-compatibility/logo-3cx.webp"
                  alt="Logo 3CX"
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-black text-[#091421] uppercase tracking-wider mb-2">
                3CX
              </h3>
              <p className="text-[#818096] text-xs uppercase tracking-wider">
                IPBX cloud leader mondial
              </p>
            </div>

            {/* Yeastar */}
            <div className="bg-white border-4 border-white shadow-[8px_8px_0px_0px_#1F2937] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img
                  src="/images/logos-sip-compatibility/Yeastar_Logo.webp"
                  alt="Logo Yeastar"
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-black text-[#091421] uppercase tracking-wider mb-2">
                Yeastar
              </h3>
              <p className="text-[#818096] text-xs uppercase tracking-wider">
                Solutions économiques PME
              </p>
            </div>

            {/* Grandstream */}
            <div className="bg-white border-4 border-white shadow-[8px_8px_0px_0px_#1F2937] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img
                  src="/images/logos-sip-compatibility/logo-grandstream.webp"
                  alt="Logo Grandstream"
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-black text-[#091421] uppercase tracking-wider mb-2">
                Grandstream
              </h3>
              <p className="text-[#818096] text-xs uppercase tracking-wider">
                Passerelles VoIP robustes
              </p>
            </div>

            {/* Avaya */}
            <div className="bg-white border-4 border-white shadow-[8px_8px_0px_0px_#1F2937] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <img
                  src="/images/logos-sip-compatibility/avaya-logo.webp"
                  alt="Logo Avaya"
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-black text-[#091421] uppercase tracking-wider mb-2">
                Avaya
              </h3>
              <p className="text-[#818096] text-xs uppercase tracking-wider">
                Solutions entreprise
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-white/60 mb-6">
              <strong className="text-white">Pas d&apos;IPBX ?</strong> Nous
              proposons des solutions complètes incluant l&apos;équipement
            </p>
            <Link
              href="/nos-services"
              className="monolith-btn bg-white inline-block"
            >
              <span className="flex items-center gap-2 text-[#091421] font-black uppercase text-xs tracking-[0.2em] px-8 py-4">
                <i className="lni lni-arrow-right" aria-hidden="true" />
                Découvrir nos solutions IPBX
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <TrunkSipCompteurFAQ />
        </div>
      </section>

      {/* Formulaire Tally (embed) */}
      <TallyEmbedDevis />

      {/* CTA Section finale */}
      <section className="py-32 px-8 lg:px-24 relative overflow-hidden bg-[#091421]">
        <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Section title */}
          <div className="mb-12">
            <div className="w-12 h-1 bg-red-primary mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[-0.05em] leading-tight">
              Calculez vos{" "}
              <span className="text-red-primary">économies</span> maintenant
            </h2>
            <p className="text-xl text-white/70 mt-4 max-w-2xl">
              Obtenez votre{" "}
              <strong className="text-white">devis personnalisé en 2 minutes</strong>{" "}
              et découvrez combien vous pouvez économiser avec notre Trunk SIP
              au compteur.
            </p>
          </div>

          {/* Final advantages */}
          <div className="flex flex-wrap gap-6 mb-12">
            <div className="flex items-center gap-2 border border-white/20 px-4 py-2">
              <i
                className="lni lni-checkmark-circle text-red-primary"
                aria-hidden="true"
              />
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/80">
                Devis gratuit
              </span>
            </div>
            <div className="flex items-center gap-2 border border-white/20 px-4 py-2">
              <i
                className="lni lni-timer text-red-primary"
                aria-hidden="true"
              />
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/80">
                Réponse rapide
              </span>
            </div>
            <div className="flex items-center gap-2 border border-white/20 px-4 py-2">
              <i
                className="lni lni-shield text-red-primary"
                aria-hidden="true"
              />
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/80">
                Expert VoIP
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/devis-en-ligne" className="monolith-btn bg-red-primary inline-block">
              <span className="flex items-center justify-center gap-2 text-white font-black uppercase text-xs tracking-[0.2em] px-10 py-5">
                <i className="lni lni-calculator" aria-hidden="true" />
                Calculer mes économies
              </span>
            </Link>
            <a href="tel:+33189560500" className="monolith-btn bg-white inline-block">
              <span className="flex items-center justify-center gap-2 text-[#091421] font-black uppercase text-xs tracking-[0.2em] px-8 py-5">
                <i className="lni lni-phone" aria-hidden="true" />
                01 89 56 05 00
              </span>
            </a>
          </div>

          <p className="text-white/50 text-sm mt-8">
            <strong className="text-white/70">Opérateur de référence en Guadeloupe, Martinique, Guyane et La Réunion</strong>{" "}
            — Plus de 100 entreprises nous font confiance
          </p>
        </div>
      </section>
    </>
  );
}

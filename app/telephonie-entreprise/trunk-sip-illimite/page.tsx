import { Metadata } from "next";
import Link from "next/link";
import { HubSpotForm } from "@/components/hubspot";

// Données structurées FAQ (schema.org)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est la différence entre le Trunk SIP illimité et le Trunk SIP au compteur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le Trunk SIP illimité vous facture un forfait mensuel fixe qui inclut tous vos appels vers les fixes et mobiles en France métropolitaine et dans les DOM. Le Trunk SIP au compteur, lui, facture à la minute consommée : idéal si votre volume d'appels est faible ou irrégulier. Si vous passez plus de 500 minutes par mois, l'illimité devient généralement plus économique.",
      },
    },
    {
      "@type": "Question",
      name: "Que signifie concrètement la politique Fair Use ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La politique Fair Use garantit un usage professionnel normal : appels entrants et sortants liés à votre activité courante, relation client, coordination interne. Elle exclut les usages intensifs atypiques tels que les campagnes d'appels sortants en masse (télémarketing automatisé, predictive dialing) qui relèvent d'offres dédiées aux centres de contacts. E2I VoIP vous contacte avant toute mesure si un usage inhabituel est détecté.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je porter mes numéros existants vers le Trunk SIP Illimité ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, la portabilité de vos numéros géographiques ou non-géographiques est incluse sans frais supplémentaires. Nous gérons l'intégralité de la procédure auprès des opérateurs concernés. La portabilité prend en moyenne 5 à 10 jours ouvrés. Vos numéros restent actifs pendant toute la durée du transfert, sans coupure.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai d'activation d'un Trunk SIP Illimité ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Après signature du contrat, votre Trunk SIP Illimité est activé sous 24 à 48 heures ouvrées pour de nouveaux numéros. Si vous portez vos numéros depuis un autre opérateur, comptez 5 à 10 jours ouvrés selon les délais réglementaires de portabilité. Un Customer Success Manager E2I VoIP vous accompagne tout au long de la mise en service.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title:
    "Trunk SIP Illimité DOM - E2I VoIP | Appels Illimités France & DOM",
  description:
    "Trunk SIP illimité vers fixes et mobiles France métropolitaine et DOM. De 2 à 8 appels simultanés. Forfait tout inclus avec fair use. Solution idéale pour centres d'appels et entreprises.",
  keywords:
    "trunk SIP illimité, appels illimités DOM, forfait téléphonie entreprise, 8 appels simultanés, VoIP illimité Guadeloupe Martinique Guyane Réunion, trunk SIP fair use",
  alternates: {
    canonical: "/telephonie-entreprise/trunk-sip-illimite",
  },
  openGraph: {
    title: "Trunk SIP Illimité - Appels Illimités France & DOM",
    description:
      "Forfait trunk SIP illimité de 2 à 8 appels simultanés. Appels illimités vers fixes et mobiles France et DOM.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-illimite",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP Illimité - E2I VoIP",
    description:
      "Forfait trunk SIP illimité. Appels illimités France & DOM. De 2 à 8 appels simultanés.",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Trunk SIP Illimite DOM",
  "description": "Appels illimites vers fixes et mobiles France metropolitaine et DOM. De 2 a 8 appels simultanees. Forfait tout inclus avec fair use.",
  "url": "https://www.e2i-voip.com/telephonie-entreprise/trunk-sip-illimite",
  "provider": { "@type": "Organization", "name": "E2I VoIP", "url": "https://www.e2i-voip.com" },
  "serviceType": "Trunk SIP Illimite",
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
      { "@type": "ListItem", "position": 3, "name": "Trunk SIP Illimite", "item": "https://www.e2i-voip.com/telephonie-entreprise/trunk-sip-illimite" }
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

export default function TrunkSIPIllimite() {
  const forfaits = [
    {
      appels: 2,
      ideal: "TPE, petites structures",
      popular: false,
    },
    {
      appels: 4,
      ideal: "PME et entreprises actives",
      popular: true,
    },
    {
      appels: 8,
      ideal: "Grandes structures et centres d'appels",
      popular: false,
    },
  ];

  // JSON-LD : données statiques, aucune entrée utilisateur — pas de risque XSS
  const faqSchemaJson = JSON.stringify(faqSchema);

  return (
    <>
      <JsonLdScript />
      <main className="pt-20 bg-white">
      {/* JSON-LD FAQ Schema — contenu statique uniquement */}
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
      {/* ── Hero ── */}
      <section className="bg-[#091421] py-32 px-8 lg:px-24 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Micro-label */}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-6">
            Forfait illimité
          </p>

          <div className="border-l-8 border-[#E53E3E] pl-8 mb-10 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
              Trunk SIP
              <br />
              <span className="text-[#E53E3E]">Illimité</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-4">
              <strong className="text-white">Appels illimités</strong> vers
              fixes et mobiles France métropolitaine &amp; DOM
            </p>
            <p className="text-lg text-white/60">
              <strong className="text-white/80">2, 4 ou 8 appels simultanés</strong>{" "}
              &bull; Forfait tout inclus avec politique fair use
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-6 mb-12 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <i className="lni lni-checkmark-circle text-[#E53E3E]" aria-hidden="true"></i>
              <span>Appels illimités France</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="lni lni-world text-[#E53E3E]" aria-hidden="true"></i>
              <span>Appels illimités DOM</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="lni lni-users text-[#E53E3E]" aria-hidden="true"></i>
              <span>2, 4 ou 8 lignes simultanées</span>
            </div>
          </div>

          {/* Single CTA */}
          <Link
            href="#contact-form"
            className="inline-flex items-center gap-3 bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-all shadow-[5px_5px_0px_0px_#050f1c] hover:shadow-[3px_3px_0px_0px_#050f1c] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <i className="lni lni-bubble" aria-hidden="true"></i>
            Demander un devis
          </Link>
        </div>
      </section>

      {/* ── Section explicative ── */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Features list */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Solution forfaitaire
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#2D3848] mb-4 leading-tight">
              <span className="text-[#E53E3E]">L&rsquo;illimité</span> pour
              votre téléphonie
              <br />
              d&rsquo;entreprise
            </h2>
            <div className="w-16 h-1 bg-[#E53E3E] mb-8" />

            <p className="text-lg text-[#818096] mb-10 leading-relaxed">
              Notre <strong className="text-[#2D3848]">Trunk SIP Illimité</strong> est la
              solution idéale pour les entreprises avec un volume d&rsquo;appels
              important. Maîtrisez votre budget télécom avec un forfait tout inclus.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: "lni-phone",
                  title: "Appels illimités France métropolitaine",
                  desc: (
                    <>
                      <strong>Fixes et mobiles</strong> en illimité vers la France
                      métropolitaine. Appelez sans compter, sans surprise sur votre
                      facture.
                    </>
                  ),
                },
                {
                  icon: "lni-map",
                  title: "Appels illimités vers les DOM",
                  desc: (
                    <>
                      <strong>Guadeloupe, Martinique, Guyane, Réunion</strong> :
                      communiquez librement avec tous les DOM en illimité.
                    </>
                  ),
                },
                {
                  icon: "lni-users",
                  title: "3 paliers : 2, 4 ou 8 appels simultanés",
                  desc: (
                    <>
                      Choisissez le forfait adapté à votre volume d&rsquo;appels.
                      <strong> Évolutif à tout moment</strong> pour accompagner votre
                      croissance.
                    </>
                  ),
                },
                {
                  icon: "lni-shield",
                  title: "Politique Fair Use transparente",
                  desc: (
                    <>
                      Usage professionnel normal sans limitation.
                      <strong> Pas de frais cachés</strong>, pas de mauvaise surprise.
                      Transparence garantie.
                    </>
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#E53E3E]/10 flex items-center justify-center flex-shrink-0 border-l-4 border-[#E53E3E]">
                    <i className={`lni ${item.icon} text-[#E53E3E] text-xl`} aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-[-0.03em] text-[#2D3848] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#818096] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pricing cards */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096] mb-6">
              Nos forfaits illimités
            </p>
            <p className="text-[#818096] mb-8">
              Choisissez selon vos besoins en appels simultanés
            </p>

            <div className="space-y-4">
              {forfaits.map((forfait) => (
                <div
                  key={forfait.appels}
                  className={`relative bg-white p-6 border-4 transition-transform duration-150 ${
                    forfait.popular
                      ? "border-[#E53E3E]"
                      : "border-[#2D3848]"
                  }`}
                  style={{
                    boxShadow: forfait.popular
                      ? "8px 8px 0px 0px #E53E3E"
                      : "8px 8px 0px 0px #1F2937",
                  }}
                >
                  {forfait.popular && (
                    <div className="absolute -top-4 left-6">
                      <span className="bg-[#E53E3E] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1">
                        Populaire
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-black text-lg uppercase tracking-[-0.03em] text-[#2D3848]">
                        {forfait.appels} appels simultanés
                      </span>
                      <p className="text-sm text-[#818096] mt-1">{forfait.ideal}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#E53E3E] font-black text-xl">Sur devis</span>
                      <p className="text-xs text-[#818096] mt-1">/mois</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="mt-8 p-6 bg-[#091421] border-l-4 border-[#2D3848]">
              <div className="flex items-start gap-3">
                <i className="lni lni-information text-white mt-0.5 flex-shrink-0" aria-hidden="true"></i>
                <div className="text-sm text-white/80 space-y-1">
                  <p>
                    <strong className="text-white">Tout inclus :</strong> Appels
                    illimités France + DOM, numéros géographiques, support technique
                    local.
                  </p>
                  <p>
                    <strong className="text-white">Fair Use :</strong> Usage
                    professionnel normal, pas de centre d&rsquo;appels sortants intensifs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Avantages ── */}
      <section className="py-32 px-8 lg:px-24 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Pourquoi nous choisir
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-4">
              Trunk SIP Illimité —
              <br />
              <span className="text-[#E53E3E]">Les avantages clés</span>
            </h2>
            <div className="w-16 h-1 bg-[#E53E3E]" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "lni-calculator",
                title: "Budget maîtrisé",
                desc: "Un forfait mensuel fixe, pas de surprise. Idéal pour la gestion budgétaire de votre entreprise.",
                accent: "Économies garanties",
                accentIcon: "lni-checkmark-circle",
              },
              {
                icon: "lni-world",
                title: "Couverture France + DOM",
                desc: "Appelez sans limite vers la métropole et tous les départements d'outre-mer.",
                accent: "National & DOM-TOM",
                accentIcon: "lni-map-marker",
              },
              {
                icon: "lni-grow",
                title: "Solution évolutive",
                desc: "Ajustez le nombre d'appels simultanés selon l'évolution de votre activité.",
                accent: "Croissance flexible",
                accentIcon: "lni-rocket",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-[#2D3848] p-8"
                style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
              >
                <div className="w-14 h-14 bg-[#E53E3E]/10 border-l-4 border-[#E53E3E] flex items-center justify-center mb-6">
                  <i className={`lni ${card.icon} text-[#E53E3E] text-2xl`} aria-hidden="true"></i>
                </div>
                <h3 className="text-xl font-black uppercase tracking-[-0.03em] text-[#2D3848] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#818096] leading-relaxed mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 text-[#E53E3E] font-black text-xs uppercase tracking-[0.2em]">
                  <i className={`lni ${card.accentIcon}`} aria-hidden="true"></i>
                  <span>{card.accent}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tout inclus */}
          <div
            className="bg-white border-4 border-[#2D3848] p-10"
            style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
          >
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-2">
                Inclus dans votre forfait
              </p>
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-[#2D3848]">
                Tout est inclus — sans frais cachés
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  text: "Compatible avec tous les IPBX (3CX, Yeastar, Grandstream)",
                  icon: "lni-plug",
                },
                {
                  text: "Portabilité gratuite de vos numéros existants",
                  icon: "lni-phone-set",
                },
                {
                  text: "Support technique local et réactif",
                  icon: "lni-headphone-alt",
                },
                {
                  text: "Qualité HD garantie sur tous les appels",
                  icon: "lni-signal",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 border-l-4 border-[#E53E3E] bg-[#E53E3E]/5">
                  <i className={`lni ${item.icon} text-[#E53E3E] text-xl flex-shrink-0 mt-0.5`} aria-hidden="true"></i>
                  <div>
                    <span className="text-[#2D3848] font-black text-sm leading-relaxed block">
                      {item.text}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E53E3E] mt-1 flex items-center gap-1">
                      <i className="lni lni-checkmark-circle" aria-hidden="true"></i>
                      Inclus
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Formulaire HubSpot ── */}
      <section id="contact-form" className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Contact commercial
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#2D3848] leading-tight mb-4">
              Obtenez votre
              <br />
              <span className="text-[#E53E3E]">devis personnalisé</span>
            </h2>
            <div className="w-16 h-1 bg-[#E53E3E] mb-6" />
            <p className="text-lg text-[#818096]">
              Nos experts vous conseillent et établissent un devis adapté à vos besoins
            </p>
          </div>

          <div id="hubspot-contact-form">
            <HubSpotForm />
          </div>

          {/* Alternatives de contact */}
          <div className="mt-16 pt-10 border-t-4 border-[#1F2937]">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096] mb-6">
              Vous préférez nous appeler directement ?
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="tel:+33189560500"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 text-[#E53E3E] font-black text-sm uppercase tracking-[0.1em] hover:underline"
              >
                <i className="lni lni-phone-set text-lg" aria-hidden="true"></i>
                <span>France : 01 89 56 05 00</span>
              </a>
              <a
                href="tel:+594594963500"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 text-[#E53E3E] font-black text-sm uppercase tracking-[0.1em] hover:underline"
              >
                <i className="lni lni-phone-set text-lg" aria-hidden="true"></i>
                <span>Guyane : 0594 96 35 00</span>
              </a>
              <a
                href="tel:+590590173500"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 text-[#E53E3E] font-black text-sm uppercase tracking-[0.1em] hover:underline"
              >
                <i className="lni lni-phone-set text-lg" aria-hidden="true"></i>
                <span>Guadeloupe : 0590 17 35 00</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA finale ── */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421] relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-6">
            Passez à l&rsquo;illimité
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
            Passez à l&rsquo;illimité
            <br />
            <span className="text-[#E53E3E]">dès maintenant</span>
          </h2>
          <div className="w-16 h-1 bg-[#E53E3E] mb-8" />
          <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            Rejoignez les entreprises qui ont choisi la simplicité et la
            tranquillité avec notre Trunk SIP Illimité
          </p>

          {/* Features row */}
          <div className="flex flex-wrap gap-8 mb-12 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <i className="lni lni-checkmark-circle text-[#E53E3E]" aria-hidden="true"></i>
              <span>Activation rapide</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="lni lni-timer text-[#E53E3E]" aria-hidden="true"></i>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="lni lni-shield text-[#E53E3E]" aria-hidden="true"></i>
              <span>Garantie qualité</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-3 bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-all shadow-[5px_5px_0px_0px_#050f1c] hover:shadow-[3px_3px_0px_0px_#050f1c] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <i className="lni lni-bubble" aria-hidden="true"></i>
              Demander mon devis illimite
            </Link>
            <a
              href="tel:+33189560500"
              className="inline-flex items-center gap-3 bg-[#2D3848] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-all shadow-[5px_5px_0px_0px_#050f1c] hover:shadow-[3px_3px_0px_0px_#050f1c] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <i className="lni lni-phone" aria-hidden="true"></i>
              Appeler un conseiller
            </a>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

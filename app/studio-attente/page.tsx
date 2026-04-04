import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Attente Téléphonique — Messages et Musiques Professionnels | E2I VoIP",
  description:
    "Créez une expérience d'attente professionnelle avec nos messages vocaux sur mesure. Voix off en français, créole et anglais. Accueil, attente, répondeur, fermeture. Livraison 48h. Devis gratuit.",
  keywords:
    "studio attente téléphonique, message d'attente professionnel, musique attente téléphone, voix off professionnelle, message accueil standard, message répondeur entreprise, VoIP DOM, Martinique Guadeloupe Guyane Réunion",
  alternates: {
    canonical: "/studio-attente",
  },
  openGraph: {
    title: "Studio Attente Téléphonique — Messages et Musiques Professionnels | E2I VoIP",
    description:
      "Messages vocaux et musiques professionnelles pour votre standard téléphonique. Sur mesure, tous formats, livraison 48h.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Attente Téléphonique — Messages et Musiques Professionnels | E2I VoIP",
    description:
      "Messages vocaux professionnels pour votre standard téléphonique. Voix off français, créole, anglais. Livraison 48h.",
  },
};

export default function StudioAttente() {
  const services = [
    {
      icon: "lni-microphone",
      title: "Enregistrement professionnel",
      description:
        "Voix off sélectionnées pour leur clarté et leur naturel. Tonalité chaleureuse, dynamique ou institutionnelle selon votre secteur d'activité.",
    },
    {
      icon: "lni-music",
      title: "Habillage musical",
      description:
        "Catalogue de musiques libres de droits soigneusement sélectionnées : ambiances corporate, jazz, acoustique ou world music selon votre image.",
    },
    {
      icon: "lni-volume",
      title: "Messages sur mesure",
      description:
        "Textes rédigés ou retravaillés avec vous pour refléter fidèlement votre identité de marque, vos offres et votre secteur d'activité.",
    },
    {
      icon: "lni-download",
      title: "Formats multiples",
      description:
        "Livraison dans tous les formats audio compatibles : MP3, WAV, G711, G729 — directement intégrables dans votre IPBX 3CX, Yeastar ou tout autre standard VoIP.",
    },
  ];

  const messageTypes = [
    {
      icon: "lni-phone",
      title: "Message d'accueil",
      tag: "Essentiel",
      tagColor: "bg-[#E53E3E]",
      description:
        "Le premier contact entre votre entreprise et votre appelant. Un message d'accueil bien rédigé rassure, oriente et donne le ton de votre relation client dès la première sonnerie.",
      exemple:
        "\"Bonjour et bienvenue chez [Entreprise]. Pour le service commercial, tapez le 1. Pour le service technique, tapez le 2. Pour toute autre demande, restez en ligne.\"",
    },
    {
      icon: "lni-timer",
      title: "Message d'attente",
      tag: "Le plus demandé",
      tagColor: "bg-[#2D3848]",
      description:
        "Transformez le temps d'attente en opportunité de communication. Présentez vos offres, vos horaires, vos actualités ou vos valeurs pendant que l'appelant patiente.",
      exemple:
        "\"Votre appel est important pour nous. Pendant votre attente, saviez-vous que vous pouvez aussi nous contacter via notre site web pour un devis en ligne ?\"",
    },
    {
      icon: "lni-envelope",
      title: "Message répondeur",
      tag: "Indispensable",
      tagColor: "bg-[#E53E3E]",
      description:
        "Quand vous n'êtes pas disponible, votre répondeur prend le relais. Un message clair et professionnel invite l'appelant à laisser ses coordonnées et lui indique quand il sera rappelé.",
      exemple:
        "\"Vous avez bien joint [Entreprise]. Nos bureaux sont actuellement fermés. Veuillez laisser votre nom, numéro et l'objet de votre appel, nous vous rappellerons dans les plus brefs délais.\"",
    },
    {
      icon: "lni-alarm-clock",
      title: "Message de fermeture",
      tag: "Recommandé",
      tagColor: "bg-[#2D3848]",
      description:
        "Informez vos appelants de vos horaires d'ouverture, de vos jours de fermeture ou de vos périodes de congés. Évitez la frustration et renforcez la confiance de vos clients.",
      exemple:
        "\"Nos bureaux sont fermés jusqu'au [date]. Vous pouvez nous contacter par email ou laisser un message. Nous reprenons nos activités le [date] et vous répondrons dès notre retour.\"",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Brief & Rédaction",
      description:
        "Vous nous transmettez vos textes ou nous les rédigeons ensemble. Nous précisons ensemble le ton souhaité, la langue, le style musical et les spécificités de votre secteur d'activité.",
    },
    {
      number: "02",
      title: "Enregistrement & Montage",
      description:
        "Notre équipe produit enregistre en studio avec la voix off sélectionnée et assemble le message avec la musique de fond choisie. Chaque production est mixée et masterisée pour une qualité optimale.",
    },
    {
      number: "03",
      title: "Livraison & Intégration",
      description:
        "Vous recevez vos fichiers audio dans les formats adaptés à votre système téléphonique sous 48h. Notre équipe technique E2I VoIP peut également intégrer directement les messages dans votre IPBX.",
    },
  ];

  const benefits = [
    {
      icon: "lni-star",
      title: "Première impression décisive",
      description:
        "73 % des entreprises perdent des clients à cause d'une expérience téléphonique décevante. Un message professionnel soigné rassure dès le premier contact et renforce votre crédibilité.",
    },
    {
      icon: "lni-briefcase",
      title: "Image de marque cohérente",
      description:
        "Votre standard téléphonique est un canal de communication à part entière. Un message sur mesure reflète l'identité, les valeurs et le positionnement de votre entreprise.",
    },
    {
      icon: "lni-bullhorn",
      title: "Outil marketing actif",
      description:
        "Le temps d'attente n'est plus du temps perdu. Valorisez vos offres, annoncez vos promotions ou orientez vos clients vers votre site web pendant qu'ils patientent.",
    },
    {
      icon: "lni-globe",
      title: "Multilingue et adapté aux DOM",
      description:
        "Nous enregistrons vos messages en français, en créole martiniquais ou guadeloupéen, en anglais et en d'autres langues selon vos besoins. Idéal pour les entreprises des Antilles, de la Guyane et de La Réunion.",
    },
  ];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Studio Attente Telephonique",
  "description": "Messages vocaux et musiques professionnelles sur mesure pour votre standard telephonique. Voix off professionnelles, habillage musical, formats multiples.",
  "url": "https://www.e2i-voip.com/studio-attente",
  "provider": { "@type": "Organization", "name": "E2I VoIP", "url": "https://www.e2i-voip.com" },
  "serviceType": "Studio enregistrement vocal / Attente telephonique",
  "areaServed": [
    { "@type": "Country", "name": "France" },
    { "@type": "AdministrativeArea", "name": "Martinique" },
    { "@type": "AdministrativeArea", "name": "Guadeloupe" },
    { "@type": "AdministrativeArea", "name": "Guyane francaise" },
    { "@type": "AdministrativeArea", "name": "La Reunion" }
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.e2i-voip.com" },
      { "@type": "ListItem", "position": 2, "name": "Studio Attente", "item": "https://www.e2i-voip.com/studio-attente" }
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

  return (
    <>
      <JsonLdScript />
      {/* Hero Section */}
      <section className="py-32 px-8 lg:px-24 relative overflow-hidden bg-[#091421]">
        {/* Dot pattern radial */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E53E3E 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.08,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Micro-label */}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-6">
            Studio Attente Téléphonique
          </p>

          <div className="border-l-8 border-[#E53E3E] pl-8 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
              Studio Attente Téléphonique —{" "}
              <span className="text-[#E53E3E]">
                Messages et Musiques Professionnels
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-bold leading-relaxed mb-4">
              Votre standard téléphonique est souvent le premier contact entre
              votre entreprise et vos clients. Donnez-leur une expérience à la
              hauteur de votre professionnalisme.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-10">
              Messages d&apos;accueil, d&apos;attente, répondeur et fermeture — en
              français, en créole et en anglais. Enregistrés en studio,
              livrés en 48h, dans tous les formats compatibles avec votre
              système VoIP.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/devis-en-ligne"
                className="inline-flex items-center gap-3 bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-all shadow-[-5px_5px_0px_0px_#050f1c] hover:shadow-[-3px_3px_0px_0px_#050f1c] hover:translate-x-[2px] hover:-translate-y-[2px]"
              >
                <i className="lni lni-headphone-alt" aria-hidden="true" />
                Demander un devis gratuit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border-4 border-white/40 text-white/80 font-black uppercase tracking-[0.2em] text-xs px-8 py-5 hover:border-white hover:text-white transition-all"
              >
                <i className="lni lni-phone" aria-hidden="true" />
                Nous appeler
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices Section */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Pourquoi c&apos;est important
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#091421] max-w-3xl leading-tight">
              Pourquoi un message d&apos;attente{" "}
              <span className="text-[#E53E3E]">professionnel ?</span>
            </h2>
            <p className="text-[#818096] text-base mt-4 max-w-2xl leading-relaxed">
              Un message d&apos;attente bien conçu n&apos;est pas un simple
              habillage sonore. C&apos;est un outil de communication qui travaille
              pour votre image à chaque appel entrant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="border-4 border-[#2D3848] p-8 flex gap-6"
                style={{ boxShadow: "8px 8px 0px 0px #1F2937" }}
              >
                <div className="w-14 h-14 border-4 border-[#E53E3E] flex items-center justify-center shrink-0 bg-[#091421]">
                  <i
                    className={`lni ${benefit.icon} text-2xl text-[#E53E3E]`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-[#091421] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#818096] text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types de messages Section */}
      <section className="py-32 px-8 lg:px-24 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Catalogue de prestations
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white max-w-3xl leading-tight">
              Les 4 types de messages{" "}
              <span className="text-[#E53E3E]">essentiels</span>
            </h2>
            <p className="text-white/60 text-base mt-4 max-w-2xl leading-relaxed">
              Chaque message remplit un rôle précis dans le parcours
              téléphonique de vos clients. Nous les produisons individuellement
              ou en pack complet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {messageTypes.map((msg, index) => (
              <div
                key={index}
                className="border-4 border-[#2D3848] bg-[#091421] p-8 flex flex-col"
                style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="border-l-8 border-[#E53E3E] pl-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096] mb-2">
                      Type de message
                    </p>
                    <h3 className="text-xl font-black uppercase tracking-[-0.03em] text-white">
                      {msg.title}
                    </h3>
                  </div>
                  <span
                    className={`${msg.tagColor} text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 shrink-0 ml-4`}
                  >
                    {msg.tag}
                  </span>
                </div>

                <div className="w-10 h-10 border-4 border-[#2D3848] flex items-center justify-center mb-4 bg-[#1F2937]">
                  <i
                    className={`lni ${msg.icon} text-lg text-white/60`}
                    aria-hidden="true"
                  />
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {msg.description}
                </p>

                <div className="border-l-4 border-[#E53E3E] pl-4 mt-auto">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#818096] mb-2">
                    Exemple de script
                  </p>
                  <blockquote className="text-white/50 italic text-xs leading-relaxed">
                    {msg.exemple}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus Section */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Comment ça marche
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#091421] max-w-3xl leading-tight">
              Votre message prêt en{" "}
              <span className="text-[#E53E3E]">3 étapes</span>
            </h2>
            <p className="text-[#818096] text-base mt-4 max-w-2xl leading-relaxed">
              Un processus simple et rapide, de la prise de brief à la
              livraison de vos fichiers audio. Notre studio prend en charge
              l&apos;intégralité de la production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line (desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-8 h-1 bg-[#E53E3E] z-10 -translate-x-4" />
                )}
                <div
                  className="border-4 border-[#2D3848] p-8"
                  style={{ boxShadow: "8px 8px 0px 0px #1F2937" }}
                >
                  <div className="text-6xl font-black tracking-[-0.05em] text-[#E53E3E] opacity-20 mb-4 leading-none">
                    {step.number}
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-[#091421] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#818096] text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Tarifs Section */}
      <section className="py-32 px-8 lg:px-24 bg-[#091421]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Nos prestations
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white max-w-2xl leading-tight">
              Ce qui est inclus dans{" "}
              <span className="text-[#E53E3E]">chaque production</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-4 border-[#2D3848] p-8 flex flex-col"
                style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
              >
                <div className="w-14 h-14 border-4 border-[#E53E3E] flex items-center justify-center mb-6 bg-[#1F2937]">
                  <i
                    className={`lni ${service.icon} text-2xl text-[#E53E3E]`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-[#818096] text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tarifs indicatifs */}
          <div
            className="border-4 border-[#E53E3E] p-10 bg-[#1F2937]"
            style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-3">
                  Tarifs indicatifs
                </p>
                <h3 className="text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-white mb-4">
                  À partir de{" "}
                  <span className="text-[#E53E3E]">59 € HT</span> par message
                </h3>
                <ul className="space-y-2">
                  {[
                    "1 message isolé (accueil, attente, répondeur ou fermeture) : à partir de 59 € HT",
                    "Pack 4 messages complet : à partir de 199 € HT",
                    "Mise à jour saisonnière ou promotionnelle : à partir de 39 € HT",
                    "Version multilingue (créole, anglais) : sur devis",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <i
                        className="lni lni-checkmark-circle text-[#E53E3E] text-base mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-white/70 text-xs leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#818096] text-[11px] mt-4">
                  Tarifs indicatifs. Devis personnalisé selon volume et
                  complexité.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/devis-en-ligne"
                  className="inline-flex items-center gap-3 bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5 transition-all shadow-[-5px_5px_0px_0px_#050f1c] hover:shadow-[-3px_3px_0px_0px_#050f1c] hover:translate-x-[2px] hover:-translate-y-[2px]"
                >
                  <i className="lni lni-calculator" aria-hidden="true" />
                  Obtenir mon devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 lg:px-24 bg-[#E53E3E] border-y-8 border-[#2D3848]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">
              Passez à l&apos;action
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white leading-tight">
              Votre message d&apos;attente
              <br />
              en 48h chrono
            </h2>
            <p className="text-white/80 text-lg font-bold mt-4 max-w-lg">
              Devis gratuit et sans engagement. Notre studio vous livre vos
              fichiers audio dans tous les formats compatibles avec votre
              système téléphonique VoIP.
            </p>
            <p className="text-white/60 text-sm mt-2">
              Compatible 3CX, Yeastar, Grandstream et tous les IPBX du marché.
              Service disponible pour les entreprises des DOM et de métropole.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/devis-en-ligne">
              <span
                className="inline-flex items-center gap-3 bg-white text-[#091421] font-black uppercase tracking-[0.2em] text-xs px-10 py-5"
                style={{ boxShadow: "5px 5px 0px 0px #050f1c" }}
              >
                <i className="lni lni-microphone" aria-hidden="true" />
                Devis gratuit
              </span>
            </Link>
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-3 bg-transparent border-4 border-white text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5"
                style={{ boxShadow: "5px 5px 0px 0px #050f1c" }}
              >
                <i className="lni lni-phone" aria-hidden="true" />
                Nous contacter
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

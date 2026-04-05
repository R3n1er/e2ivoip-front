import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Studio vocal standard téléphonique | SVI, accueil, attente, fermeture | E2I VoIP",
  description:
    "Studio d'enregistrement vocal spécialisé standards téléphoniques : messages d'accueil, SVI, attente et fermeture. Portail automatisé pour écouter exemples et réalisations clients ; fichiers compatibles tout IPBX. Guadeloupe, Martinique, Guyane, Réunion, DOM.",
  keywords:
    "studio vocal standard téléphonique, message accueil téléphonique, SVI serveur vocal interactif, message attente professionnel, studio enregistrement téléphonie entreprise, portail démos messages vocaux, musique attente IPBX, voix off standard 3CX Yeastar, message fermeture standard, téléphonie pro Guadeloupe Martinique Guyane Réunion DOM",
  alternates: {
    canonical: "/studio-attente",
  },
  openGraph: {
    title:
      "Studio vocal pour standard téléphonique — SVI, accueil, attente | E2I VoIP",
    description:
      "Enregistrements pro pour IPBX et standards téléphoniques. Portail démos, exemples clients, livraison formats compatibles. DOM & métropole.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Studio vocal standard téléphonique — SVI, accueil, attente | E2I VoIP",
    description:
      "Spécialiste standards téléphoniques : accueil, SVI, attente, fermeture. Portail exemples & productions clients. DOM.",
  },
};

export default function StudioAttente() {
  const services = [
    {
      icon: "lni-world",
      title: "Portail automatisé démos & exemples",
      description:
        "Accédez en ligne à des extraits types et à des réalisations déjà produites pour nos clients (selon autorisations), pour vous projeter avant commande. Idéal pour comparer voix, débit et habillage musical.",
    },
    {
      icon: "lni-microphone",
      title: "Studio spécialisé standards téléphoniques",
      description:
        "Enregistrements calibrés pour la téléphonie d'entreprise : niveaux compatibles attente et SVI, voix claires, découpe par fichier si votre IPBX le requiert. Conçu pour 3CX, Yeastar, Grandstream et tout standard acceptant WAV, MP3 ou codecs télécom.",
    },
    {
      icon: "lni-music",
      title: "Habillage musical libre de droits",
      description:
        "Musiques d'attente et fonds sonores sélectionnés pour l'image pro : corporate, jazz, acoustique ou ambiances adaptées aux marques en Guadeloupe, Martinique, Guyane, Réunion ou métropole.",
    },
    {
      icon: "lni-download",
      title: "Livraison tous formats & tout standard",
      description:
        "Fichiers MP3, WAV, G711, G729 et autres formats utiles à votre IPBX ou votre opérateur. Les productions peuvent être installées sur n'importe quel standard téléphonique compatible import audio.",
    },
  ];

  const messageTypes = [
    {
      icon: "lni-phone",
      title: "Message d'accueil",
      tag: "Essentiel",
      tagColor: "bg-[#E53E3E]",
      description:
        "Le premier contact entre votre entreprise et votre appelant : ton de marque, identification claire et transition vers le SVI ou un conseiller. Pensé pour les standards professionnels.",
      exemple:
        "\"Bonjour, vous êtes bien chez [Entreprise]. Merci de votre appel ; veuillez patienter, un membre de l'équipe vous répond dans un instant.\"",
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
      icon: "lni-target",
      title: "SVI & menu vocal",
      tag: "Routage",
      tagColor: "bg-[#E53E3E]",
      description:
        "Serveur vocal interactif : structurez votre menu numérique, orientez vers les services et réduisez la charge sur votre standard. Scripts clairs, voix posée, fichiers découpés pour une intégration simple sur votre IPBX.",
      exemple:
        "\"Pour le service commercial, tapez le 1. Pour le support technique, tapez le 2. Pour connaître nos horaires, tapez le 3. Pour parler à un opérateur, tapez le 0 ou restez en ligne.\"",
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
      title: "Portail, brief & rédaction",
      description:
        "Vous explorez les démos sur notre portail automatisé, puis nous validons le brief : textes fournis ou co-rédaction, ton, langues (français, créole, anglais…), musiques et contraintes de votre standard téléphonique.",
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
      icon: "lni-network",
      title: "Opérateur télécom — pas un studio « généraliste »",
      description:
        "Contrairement à de nombreuses offres web centrées uniquement sur la musique ou la voix sans expertise IPBX, E2I VoIP combine studio vocal et métier télécom : fichiers éprouvés sur le terrain pour les entreprises en Guadeloupe, Martinique, Guyane, La Réunion et métropole, avec intégration possible sur votre IPBX.",
    },
  ];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Studio vocal pour standard telephonique — SVI, accueil, attente, fermeture",
  "description": "Studio d'enregistrement vocal specialise standards telephoniques et IPBX. Portail demos, messages d'accueil, SVI, attente, fermeture. Formats compatibles tout standard. DOM et metropole.",
  "url": "https://www.e2i-voip.com/studio-attente",
  "provider": { "@type": "Organization", "name": "E2I VoIP", "url": "https://www.e2i-voip.com" },
  "serviceType": "Studio enregistrement vocal professionnel pour telephonie entreprise",
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
      { "@type": "ListItem", "position": 2, "name": "Studio vocal standard telephonique", "item": "https://www.e2i-voip.com/studio-attente" }
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
            Studio vocal · standards téléphoniques · portail démos
          </p>

          <div className="border-l-8 border-[#E53E3E] pl-8 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
              Studio d&apos;enregistrement vocal pour{" "}
              <span className="text-[#E53E3E]">standard téléphonique</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-bold leading-relaxed mb-4 normal-case tracking-normal">
              Messages d&apos;accueil,{" "}
              <span className="text-white">SVI &amp; menu vocal</span>, attente et
              fermeture — pensés pour votre IPBX et installables sur tout
              standard compatible.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-10">
              Notre{" "}
              <strong className="text-white/80 font-bold">
                portail automatisé
              </strong>{" "}
              vous permet d&apos;écouter des exemples et des enregistrements déjà
              produits pour nos clients avant de commander. Voix pro, musiques
              libres de droits, livraison sous 48h en français, créole ou
              anglais — pour les entreprises en Guadeloupe, Martinique, Guyane,
              La Réunion et métropole.
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

      {/* Portail démos & lecture marché DOM */}
      <section className="py-24 px-8 lg:px-24 bg-[#f4f7fa] border-y-4 border-[#2D3848]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Portail automatisé
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.05em] uppercase text-[#091421] max-w-4xl leading-tight">
              Écoutez des{" "}
              <span className="text-[#E53E3E]">exemples &amp; réalisations</span>{" "}
              avant de commander
            </h2>
            <p className="text-[#818096] text-base mt-5 max-w-3xl leading-relaxed">
              En Guadeloupe, en Martinique, en Guyane ou sur d&apos;autres
              territoires d&apos;outre-mer, les prestations « studio vocal »
              trouvables en ligne sont souvent généralistes (pub, radio, réseaux
              sociaux) ou limitées à une musique d&apos;attente sans vision
              IPBX. Notre studio est{" "}
              <strong className="text-[#091421] font-bold">
                calibré pour les standards téléphoniques
              </strong>{" "}
              : démos en ligne, productions déjà livrées à des clients
              (extraits selon autorisations), et fichiers prêts à être chargés
              dans votre 3CX, Yeastar, Grandstream ou tout autre équipement
              acceptant des messages vocaux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="border-4 border-[#2D3848] p-8 bg-white"
              style={{ boxShadow: "8px 8px 0px 0px #1F2937" }}
            >
              <div className="w-12 h-12 border-4 border-[#E53E3E] flex items-center justify-center mb-6 bg-[#091421]">
                <i
                  className="lni lni-headphone-alt text-xl text-[#E53E3E]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-[#091421] mb-3">
                Portail démos
              </h3>
              <p className="text-[#818096] text-xs leading-relaxed">
                Parcourez des extraits types et des exemples de voix pour vous
                projeter sur le rendu réel sur ligne téléphonique, pas seulement
                sur une bande-annonce marketing.
              </p>
            </div>
            <div
              className="border-4 border-[#2D3848] p-8 bg-white"
              style={{ boxShadow: "8px 8px 0px 0px #1F2937" }}
            >
              <div className="w-12 h-12 border-4 border-[#E53E3E] flex items-center justify-center mb-6 bg-[#091421]">
                <i
                  className="lni lni-users text-xl text-[#E53E3E]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-[#091421] mb-3">
                Réalisations clients
              </h3>
              <p className="text-[#818096] text-xs leading-relaxed">
                Écoutez des enregistrements déjà produits pour nos clients
                (lorsque la diffusion publique est accordée), pour juger
                qualité, rythme et clarté — avant votre propre production.
              </p>
            </div>
            <div
              className="border-4 border-[#2D3848] p-8 bg-white"
              style={{ boxShadow: "8px 8px 0px 0px #1F2937" }}
            >
              <div className="w-12 h-12 border-4 border-[#E53E3E] flex items-center justify-center mb-6 bg-[#091421]">
                <i
                  className="lni lni-phone-set text-xl text-[#E53E3E]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-[#091421] mb-3">
                Tout standard téléphonique
              </h3>
              <p className="text-[#818096] text-xs leading-relaxed">
                Les fichiers sont livrés dans les formats attendus par votre
                IPBX ou votre opérateur ; vous pouvez les installer sur
                n&apos;importe quel standard compatible import audio, en DOM
                comme en métropole.
              </p>
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
              Accueil, SVI (menu vocal), attente et fermeture : chaque brique
              remplit un rôle précis sur votre standard. Production à l&apos;unité
              ou pack complet, avec livraison prête à intégrer.
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
              Un parcours guidé : écoute sur le portail, validation du brief,
              enregistrement studio et livraison des fichiers aux formats de
              votre standard téléphonique.
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
                    "1 message isolé (accueil, SVI, attente ou fermeture) : à partir de 59 € HT",
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
              Devis gratuit et sans engagement. Écoutez les démos sur notre
              portail, puis recevez vos fichiers prêts pour votre standard
              téléphonique ou IPBX.
            </p>
            <p className="text-white/60 text-sm mt-2">
              3CX, Yeastar, Grandstream et tout équipement acceptant des messages
              vocaux — entreprises des DOM (Guadeloupe, Martinique, Guyane,
              Réunion) et métropole.
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

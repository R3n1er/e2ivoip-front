import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Attente Téléphonique — Messages & Musiques sur mesure | E2I VoIP",
  description:
    "Créez une expérience d'attente professionnelle avec nos messages vocaux et musiques sur mesure. Voix off professionnelles, habillage musical, formats multiples. Devis gratuit.",
  keywords:
    "studio attente téléphonique, message d'attente, musique attente, voix off professionnelle, message accueil, VoIP DOM",
  alternates: {
    canonical: "/studio-attente",
  },
  openGraph: {
    title: "Studio Attente Téléphonique — E2I VoIP",
    description:
      "Messages vocaux et musiques professionnelles pour votre standard téléphonique. Sur mesure, tous formats.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Attente Téléphonique — E2I VoIP",
    description:
      "Messages vocaux et musiques professionnelles pour votre standard téléphonique.",
  },
};

export default function StudioAttente() {
  const services = [
    {
      icon: "lni-microphone",
      title: "Enregistrement professionnel",
      description:
        "Studio d'enregistrement avec voix off professionnelles en français et langues étrangères",
    },
    {
      icon: "lni-music",
      title: "Habillage musical",
      description:
        "Large choix de musiques libres de droits pour accompagner vos messages",
    },
    {
      icon: "lni-volume",
      title: "Messages sur mesure",
      description:
        "Création de messages personnalisés selon votre image de marque",
    },
    {
      icon: "lni-download",
      title: "Formats multiples",
      description:
        "Livraison dans tous les formats compatibles avec votre système téléphonique",
    },
  ];

  return (
    <>
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

          <div className="border-l-8 border-[#E53E3E] pl-8 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase text-white leading-tight mb-6">
              Votre attente,{" "}
              <span className="text-[#E53E3E]">professionnelle</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-bold leading-relaxed mb-10">
              Créez une expérience d&apos;attente agréable et professionnelle
              avec nos messages et musiques sur mesure
            </p>

            <Link href="/devis-en-ligne">
              <span
                className="inline-flex items-center gap-3 bg-[#E53E3E] text-white font-black uppercase tracking-[0.2em] text-xs px-10 py-5"
                style={{
                  boxShadow: "-5px 5px 0px 0px #050f1c",
                  display: "inline-flex",
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translate(2px, -2px)";
                  el.style.boxShadow = "-3px 3px 0px 0px #050f1c";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "";
                  el.style.boxShadow = "-5px 5px 0px 0px #050f1c";
                }}
              >
                <i className="lni lni-headphone-alt" aria-hidden="true" />
                Demander un devis
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Nos prestations
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#091421] max-w-2xl">
              Tout ce dont vous{" "}
              <span className="text-[#E53E3E]">avez besoin</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-4 border-[#2D3848] p-8 flex flex-col"
                style={{ boxShadow: "8px 8px 0px 0px #1F2937" }}
              >
                <div className="w-14 h-14 border-4 border-[#E53E3E] flex items-center justify-center mb-6 bg-[#091421]">
                  <i
                    className={`lni ${service.icon} text-2xl text-[#E53E3E]`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[-0.02em] text-[#091421] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#818096] text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-32 px-8 lg:px-24 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E53E3E] mb-4">
              Exemples de réalisations
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-white">
              Écoutez nos{" "}
              <span className="text-[#E53E3E]">créations</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div
              className="border-4 border-[#2D3848] bg-[#091421] p-8 flex flex-col"
              style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
            >
              <div className="border-l-8 border-[#E53E3E] pl-6 mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096] mb-2">
                  Type de message
                </p>
                <h3 className="text-xl font-black uppercase tracking-[-0.03em] text-white">
                  Message d&apos;accueil standard
                </h3>
                <p className="text-[#818096] text-xs mt-1">
                  Message professionnel pour l&apos;accueil de vos appelants
                </p>
              </div>

              <blockquote className="text-white/70 italic text-sm leading-relaxed mb-8 border-l-4 border-[#2D3848] pl-4 flex-grow">
                &ldquo;Bonjour et merci d&apos;appeler E2I VoIP, spécialiste des
                solutions de téléphonie IP. Votre appel est important pour
                nous, un conseiller va vous répondre dans quelques
                instants. Merci de patienter.&rdquo;
              </blockquote>

              <div>
                <button
                  className="w-full inline-flex items-center justify-center gap-3 border-4 border-[#E53E3E] text-[#E53E3E] font-black uppercase tracking-[0.2em] text-xs px-6 py-4 bg-transparent"
                  style={{ boxShadow: "4px 4px 0px 0px #050f1c" }}
                  type="button"
                >
                  <i className="lni lni-play" aria-hidden="true" />
                  Écouter l&apos;exemple
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="border-4 border-[#2D3848] bg-[#091421] p-8 flex flex-col"
              style={{ boxShadow: "8px 8px 0px 0px #050f1c" }}
            >
              <div className="border-l-8 border-[#2D3848] pl-6 mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#818096] mb-2">
                  Type de message
                </p>
                <h3 className="text-xl font-black uppercase tracking-[-0.03em] text-white">
                  Message promotionnel
                </h3>
                <p className="text-[#818096] text-xs mt-1">
                  Promotion de vos services pendant l&apos;attente
                </p>
              </div>

              <blockquote className="text-white/70 italic text-sm leading-relaxed mb-8 border-l-4 border-[#E53E3E] pl-4 flex-grow">
                &ldquo;Saviez-vous que nos solutions de téléphonie IP permettent
                de réduire vos coûts de communication jusqu&apos;à 50&nbsp;%&nbsp;?
                Découvrez nos offres sur notre site web e2i-voip.com&rdquo;
              </blockquote>

              <div>
                <button
                  className="w-full inline-flex items-center justify-center gap-3 border-4 border-[#2D3848] text-white font-black uppercase tracking-[0.2em] text-xs px-6 py-4 bg-transparent"
                  style={{ boxShadow: "4px 4px 0px 0px #050f1c" }}
                  type="button"
                >
                  <i className="lni lni-play" aria-hidden="true" />
                  Écouter l&apos;exemple
                </button>
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
              fichiers audio dans tous les formats compatibles.
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

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions legales | E2I VoIP",
  description:
    "Mentions legales et informations juridiques d'E2I Assistance (E2I VoIP). Informations legales, politique de confidentialite et droits d'auteur.",
  keywords:
    "mentions legales, E2I VoIP, politique confidentialite, droits auteur, RGPD, cookies",
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: {
    title: "Mentions legales | E2I VoIP",
    description:
      "Mentions legales et informations juridiques d'E2I Assistance (E2I VoIP).",
    url: "/mentions-legales",
    siteName: "E2I VoIP",
    type: "website",
  },
};

export default function MentionsLegales() {
  const contactInfo = [
    { region: "Guyane", phone: "+594 594 963 500" },
    { region: "Guadeloupe", phone: "+590 590 173 500" },
    { region: "Martinique", phone: "+596 596 313 500" },
    { region: "La Reunion", phone: "+262 263 085 500" },
  ];

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — fidele Stitch : h-[409px], titre split
          ══════════════════════════════════════ */}
      <section className="relative h-[409px] flex items-center justify-center bg-[#091421] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#091421]/80 z-10" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #E53E3E 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <h1 className="text-7xl md:text-8xl font-black tracking-[-0.05em] uppercase text-white leading-none">
            Mentions<br />
            <span className="text-red-primary">legales</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-2 bg-red-primary" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTENT GRID — 8/4 colonnes fidele Stitch
          ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ── Colonne principale (8 cols) ── */}
          <div className="md:col-span-8">

            {/* 01. Editeur du site */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">01.</span>
                EDITEUR DU SITE
              </h2>
              <div className="bg-[#121c2a] p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-8 border-red-primary">
                <p className="text-2xl font-bold text-white mb-6">E2I ASSISTANCE</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-white/60 uppercase tracking-tight text-sm font-medium">
                  <div className="space-y-4">
                    <div>
                      <p className="text-red-primary font-black mb-1">PROPRIETAIRE</p>
                      <p className="text-white">Alban RENIER / E2I ASSISTANCE</p>
                    </div>
                    <div>
                      <p className="text-red-primary font-black mb-1">SIRET</p>
                      <p className="text-white">51743457700014</p>
                    </div>
                    <div>
                      <p className="text-red-primary font-black mb-1">CODE APE</p>
                      <p className="text-white">6203Z</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-red-primary font-black mb-1">SIEGE SOCIAL</p>
                      <p className="text-white">23 Chemin Troubiran<br />97300 CAYENNE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02. Gestion des cookies */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">02.</span>
                GESTION DES COOKIES
              </h2>
              <div className="max-w-none font-light leading-relaxed space-y-6 text-gray-500">
                <p className="text-lg">
                  Le site E2I VoIP utilise des traceurs (cookies) pour ameliorer votre navigation et realiser des statistiques de visites. Ces fichiers sont deposes sur votre terminal pour une duree maximale de 13 mois.
                </p>
                <p>
                  Vous pouvez a tout moment configurer votre navigateur pour bloquer ces cookies. Cependant, certaines fonctionnalites du site pourraient etre degradees. La gestion des donnees personnelles est effectuee conformement au RGPD (Reglement General sur la Protection des Donnees).
                </p>
                <div className="bg-[#212b39] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-white/10">
                  <p className="text-red-primary font-bold uppercase tracking-widest text-xs mb-4">Action Requise</p>
                  <p className="text-white font-medium italic">
                    Pour toute demande de modification ou suppression de vos donnees personnelles, veuillez utiliser notre{" "}
                    <Link href="/contact" className="text-red-primary underline hover:text-white transition-colors">
                      formulaire de contact
                    </Link>.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. Droits d'auteur */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">03.</span>
                DROITS D&apos;AUTEUR
              </h2>
              <div className="bg-white p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#091421]">
                <p className="font-bold mb-6">
                  L&apos;integralite de ce site est protegee par les legislations francaises et internationales sur le droit d&apos;auteur et la propriete intellectuelle.
                </p>
                <p className="text-[#091421]/80 leading-relaxed">
                  Tous les droits de reproduction sont reserves, y compris pour les documents telechargeables et les representations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support electronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </div>
            </div>
          </div>

          {/* ── Sidebar (4 cols) ── */}
          <div className="md:col-span-4 space-y-12">

            {/* Hebergement — border-t-8 */}
            <div className="bg-[#212b39] p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-t-8 border-red-primary">
              <h3 className="text-2xl font-black tracking-tight uppercase mb-6 text-white">HEBERGEMENT</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-black text-red-primary uppercase mb-1">FOURNISSEUR CLOUD</p>
                  <p className="text-xl font-bold text-white">VERCEL INC.</p>
                  <p className="text-sm text-white/60">340 S Lemon Ave #4133<br />Walnut, CA 91789, USA</p>
                </div>
                <div>
                  <p className="text-xs font-black text-red-primary uppercase mb-1">GESTION DOMAINE</p>
                  <p className="text-xl font-bold text-white">HOSTINGER</p>
                  <p className="text-sm text-white/60">Hostinger International Ltd.<br />61 Lordou Vironos Street<br />6023 Larnaca, Cyprus</p>
                </div>
              </div>
            </div>

            {/* Certifications — bg rose clair, texte fonce */}
            <div className="bg-[#ffb3ad] text-[#5c0008] p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black tracking-tight uppercase mb-6">CERTIFICATIONS</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <i className="lni lni-shield text-4xl"></i>
                  <span className="font-bold tracking-tighter uppercase text-sm">Operateur declare ARCEP</span>
                </div>
                <div className="flex items-center gap-4">
                  <i className="lni lni-lock text-4xl"></i>
                  <span className="font-bold tracking-tighter uppercase text-sm">Securite VoIP Avancee</span>
                </div>
                <div className="flex items-center gap-4">
                  <i className="lni lni-customer text-4xl"></i>
                  <span className="font-bold tracking-tighter uppercase text-sm">Support Technique 24/7</span>
                </div>
              </div>
            </div>

            {/* CTA Mini — bg-surface-bright */}
            <div className="p-10 bg-[#303a48] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6">
              <p className="font-black text-xl uppercase tracking-tighter text-white">
                Besoin d&apos;un accompagnement legal ou technique ?
              </p>
              <Link
                href="/contact"
                className="w-full bg-white text-[#091421] py-4 font-black text-xs uppercase tracking-widest border-2 border-[#091421] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                NOUS CONTACTER
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT PAR REGION
          ══════════════════════════════════════ */}
      <section className="bg-[#091421] py-24 px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #E53E3E 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black tracking-[-0.05em] uppercase text-white mb-4">
              Nos <span className="text-red-primary">implantations</span>
            </h2>
            <div className="w-24 h-2 bg-red-primary mx-auto mb-6" />
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Contactez-nous dans votre region
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((contact, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-colors"
              >
                <div className="bg-white/10 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-phone text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">
                  {contact.region}
                </h3>
                <p className="text-white/80 text-sm font-bold">
                  {contact.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LEGAL BANNER — fidele Stitch
          ══════════════════════════════════════ */}
      <section className="bg-white py-12 px-12 border-y border-[#091421]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12 items-center grayscale opacity-60">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border border-gray-300 px-3 py-1">
              RGPD
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border border-gray-300 px-3 py-1">
              ARCEP
            </span>
          </div>
          <p className="text-[#091421] font-black tracking-tighter uppercase text-sm max-w-sm text-right">
            E2I VoIP : L&apos;excellence infrastructurelle au service de votre communication.
          </p>
        </div>
      </section>
    </>
  );
}

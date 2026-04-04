import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | E2I VoIP",
  description:
    "Politique de confidentialité d'E2I Assistance (E2I VoIP). Découvrez comment nous protégeons vos données personnelles conformément au RGPD.",
  keywords:
    "politique confidentialité, RGPD, protection données, E2I VoIP, cookies, droits utilisateurs",
  alternates: {
    canonical: "/politique-confidentialite",
  },
  openGraph: {
    title: "Politique de confidentialité | E2I VoIP",
    description:
      "Politique de confidentialité d'E2I Assistance (E2I VoIP). Découvrez comment nous protégeons vos données.",
    url: "/politique-confidentialite",
    siteName: "E2I VoIP",
    type: "website",
  },
};

export default function PolitiqueConfidentialitePage() {
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
            Politique<br />
            <span className="text-red-primary">confidentialité</span>
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

            {/* 01. Identité du responsable du traitement */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">01.</span>
                RESPONSABLE DU TRAITEMENT
              </h2>
              <div className="bg-[#121c2a] p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-8 border-red-primary">
                <p className="text-2xl font-bold text-white mb-6">E2I ASSISTANCE</p>
                <div className="space-y-4 text-white/80 tracking-tight text-sm">
                  <p>
                    La société E2I ASSISTANCE est responsable du traitement des données que vous confiez à l'occasion de nos relations en ligne à travers ce site internet.
                  </p>
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) en vigueur en Europe et à la Loi Informatique et Libertés, la société E2I ASSISTANCE vous informe des conditions d'utilisation et de protection de vos données et des moyens vous permettant d'exercer vos droits et recours.
                  </p>
                  <p className="pt-4 text-red-primary font-black uppercase">
                    Pour toute question : <Link href="/contact" className="underline hover:text-white transition-colors">Contact</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* 02. Collecte des données */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">02.</span>
                DONNEES COLLECTEES
              </h2>
              <div className="space-y-6">
                {/* 2.1 Cookies et navigation */}
                <div className="bg-[#121c2a] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-4 border-red-primary">
                  <h3 className="text-xl font-black text-white uppercase mb-4">2.1 Cookies et Navigation</h3>
                  <p className="text-white/70 leading-relaxed">
                    Le site peut collecter, lorsque vous l'y autorisez, des traces de votre navigation, appelées cookies. Ces traces, par défaut, ne sont pas collectées, sauf si vous l'acceptez par l'intermédiaire de notre bandeau concernant les cookies qui apparaît en page d'accueil. Elles sont utilisées par notre service informatique aux fins de statistiques et sont conservées <span className="font-bold text-red-primary">13 mois</span>.
                  </p>
                </div>

                {/* 2.2 Gestion des demandes de contact */}
                <div className="bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-4 border-[#091421]">
                  <h3 className="text-xl font-black text-[#091421] uppercase mb-4">2.2 Demandes de Contact</h3>
                  <p className="text-[#091421]/70 leading-relaxed mb-3">
                    Le site peut collecter vos données à travers un formulaire de gestion de demande de contact. La base juridique de ce traitement est l'intérêt légitime de la société. Les données concernent des données d'identification telles que le nom, prénom, téléphone et des données d'information sur votre demande.
                  </p>
                  <p className="font-black text-[#5c0008] uppercase text-sm">Conservation : 2 ans</p>
                </div>

                {/* 2.3 Candidatures */}
                <div className="bg-[#121c2a] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-4 border-red-primary">
                  <h3 className="text-xl font-black text-white uppercase mb-4">2.3 Candidatures</h3>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Le site peut collecter vos données à travers une demande de candidature afin de postuler à une offre d'emploi. La base juridique de ce traitement est l'intérêt légitime de la société et des relations pré-contractuelles. Les données concernent des données d'identification et des données d'information professionnelle.
                  </p>
                  <p className="font-black text-red-primary uppercase text-sm">Conservation : 2 ans</p>
                </div>

                {/* 2.4 Paiements */}
                <div className="bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-4 border-[#091421]">
                  <h3 className="text-xl font-black text-[#091421] uppercase mb-4">2.4 Paiements</h3>
                  <p className="text-[#091421]/70 leading-relaxed">
                    Les données de paiement sont traitées de manière sécurisée par nos prestataires de paiement certifiés, conformément aux standards de sécurité PCI DSS.
                  </p>
                </div>

                {/* 2.5 Images */}
                <div className="bg-[#121c2a] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-4 border-red-primary">
                  <h3 className="text-xl font-black text-white uppercase mb-4">2.5 Gestion de Vos Images</h3>
                  <p className="text-white/70 leading-relaxed">
                    Le site lorsque vous avez donné votre accord par écrit peut utiliser votre image. La base légale du traitement est votre consentement. La finalité est la diffusion de votre image dans le but de promouvoir les activités de la société. La durée de conservation des données correspond au temps de la durée de notre actualité et ne peut dépasser <span className="font-bold text-red-primary">10 ans</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. Protection des données */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">03.</span>
                PROTECTION DES DONNEES
              </h2>
              <div className="space-y-6">
                {/* 3.1 Lieux d'hébergement */}
                <div className="bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-black text-[#091421] uppercase mb-4">3.1 Lieux d'Hébergement</h3>
                  <p className="text-[#091421]/70 leading-relaxed">
                    Vos données sont stockées, en premier lieu, sur notre site, chez le prestataire hébergeur dûment conforme, puis sur nos serveurs en local. Dans le cas de certains traitements, vos données peuvent être stockées auprès de nos prestataires de services cloud comme Microsoft, Google, HubSpot.
                  </p>
                </div>

                {/* 3.2 Mesures de sécurité */}
                <div className="bg-[#121c2a] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-black text-white uppercase mb-4">3.2 Mesures de Sécurité</h3>
                  <p className="text-white/70 leading-relaxed">
                    Afin de préserver la confidentialité et la sécurité de vos données personnelles et notamment de les protéger contre la destruction illicite ou accidentelle, la perte ou l'altération accidentelle ou encore la divulgation ou l'accès non autorisé, notre société a pris les mesures techniques et organisationnelles appropriées, conformément aux dispositions légales applicables, comme, par exemple, le chiffrement des données pendant les transmissions.
                  </p>
                </div>

                {/* 3.3 Contenu embarqué */}
                <div className="bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-black text-[#091421] uppercase mb-4">3.3 Contenu Embarqué</h3>
                  <p className="text-[#091421]/70 leading-relaxed mb-3">
                    Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, articles...). Le contenu intégré depuis d'autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site.
                  </p>
                  <p className="text-[#091421]/70 leading-relaxed">
                    Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivi tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d'un compte connecté sur leur site web.
                  </p>
                </div>
              </div>
            </div>

            {/* 04. Vos droits */}
            <div className="mb-16">
              <h2 className="text-4xl font-black tracking-[-0.05em] uppercase mb-8 flex items-baseline gap-4">
                <span className="text-red-primary text-5xl">04.</span>
                VOS DROITS
              </h2>
              <div className="bg-[#121c2a] p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-white/80 mb-8">
                  Vous disposez de droits informatique et libertés. Pour les exercer, veuillez utiliser notre <Link href="/contact" className="text-red-primary underline hover:text-white transition-colors">formulaire de contact</Link>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-black text-red-primary uppercase text-sm">Droit d'Accès</h4>
                    <p className="text-white/70 text-sm">
                      Vous pouvez exercer votre droit d'accès pour connaître les données personnelles vous concernant.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-red-primary uppercase text-sm">Droit de Rectification</h4>
                    <p className="text-white/70 text-sm">
                      Vous pouvez demander la mise à jour de vos informations si inexactes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-red-primary uppercase text-sm">Droit à l'Oubli</h4>
                    <p className="text-white/70 text-sm">
                      Vous pouvez demander la suppression de vos données (article 17 RGPD).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-red-primary uppercase text-sm">Droit à la Portabilité</h4>
                    <p className="text-white/70 text-sm">
                      Vous pouvez demander à recevoir vos données (article 20 RGPD).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-red-primary uppercase text-sm">Droit d'Opposition</h4>
                    <p className="text-white/70 text-sm">
                      Vous pouvez vous opposer à certains traitements (article 21 RGPD).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-red-primary uppercase text-sm">Limitation du Traitement</h4>
                    <p className="text-white/70 text-sm">
                      Vous pouvez demander la limitation du traitement (article 18 RGPD).
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Sidebar (4 cols) ── */}
          <div className="md:col-span-4 space-y-12">

            {/* Délai de réponse */}
            <div className="bg-[#303a48] p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-t-8 border-red-primary">
              <h3 className="text-2xl font-black tracking-tight uppercase mb-6 text-white">Délai</h3>
              <p className="text-white/70 leading-relaxed text-sm mb-4">
                Toute demande d'exercice de vos droits fera l'objet d'un contrôle d'identité proportionné.
              </p>
              <p className="font-black text-red-primary uppercase text-xs tracking-widest">
                Réponse : 1 mois maximum
              </p>
            </div>

            {/* DPO / Responsable */}
            <div className="bg-[#212b39] p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black tracking-tight uppercase mb-6 text-white">DPO</h3>
              <div className="space-y-4">
                <p className="text-xs font-black text-red-primary uppercase">Délégué à la Protection des Données</p>
                <p className="text-white/70 text-sm">
                  Pour toute question relative à la protection de vos données personnelles
                </p>
                <Link
                  href="/contact"
                  className="inline-block text-red-primary font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
                >
                  Nous Contacter →
                </Link>
              </div>
            </div>

            {/* CNIL */}
            <div className="bg-[#ffb3ad] text-[#5c0008] p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black tracking-tight uppercase mb-6">CNIL</h3>
              <p className="text-sm font-medium leading-relaxed mb-4">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés).
              </p>
              <p className="text-xs font-black uppercase">
                www.cnil.fr
              </p>
            </div>

            {/* CTA */}
            <div className="p-10 bg-[#303a48] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6">
              <p className="font-black text-lg uppercase tracking-tighter text-white">
                Questions sur vos données?
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
          LEGAL BANNER — fidele Stitch
          ══════════════════════════════════════ */}
      <section className="bg-white py-12 px-12 border-y border-[#091421]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12 items-center grayscale opacity-60">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border border-gray-300 px-3 py-1">
              RGPD
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border border-gray-300 px-3 py-1">
              CNIL
            </span>
          </div>
          <p className="text-[#091421] font-black tracking-tighter uppercase text-sm max-w-sm text-right">
            E2I VoIP : L'excellence infrastructurelle au service de votre communication.
          </p>
        </div>
      </section>
    </>
  );
}
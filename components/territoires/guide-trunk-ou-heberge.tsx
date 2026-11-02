import NextLink from "next/link";
import { ArrowRight } from "@/lib/icons";
import type { StandardTerritory } from "@/lib/territoires/standard-telephonique";

/**
 * Guide de choix « trunk SIP ou standard hébergé » des pages territoriales.
 *
 * Volontairement sans prix : les cartes de service du site n'affichent pas de
 * prix d'appel (arbitrage du 2026-09-19). Le prix se lit sur la page d'offre
 * vers laquelle chaque carte renvoie.
 */
export function GuideTrunkOuHeberge({
  territory: t,
}: {
  territory: StandardTerritory;
}) {
  const cartes = [
    {
      titre: "Votre petite équipe a besoin d'un nouveau standard",
      texte: `Vous êtes une dizaine de personnes au plus ? Votre ancien standard doit être remplacé ou vos collaborateurs se déplacent souvent ? Le standard hébergé évite l'achat de matériel. Vous disposez de numéros locaux ${t.indicatif}, de l'accueil téléphonique, des renvois d'appels, de la messagerie et d'une application mobile.`,
      href: "/telephonie-entreprise/3cx-smb-mutualisee",
      lien: "Découvrir le standard hébergé pour votre équipe",
    },
    {
      titre: "Votre standard récent fonctionne : vous le gardez",
      texte: `Votre standard téléphonique (PABX) est récent et vos équipes le connaissent. Nous le raccordons à notre réseau avec un trunk SIP et transférons vos numéros ${t.indicatif} chez E2I VoIP. Vous gardez vos postes. La facturation se fait par canal, c'est-à-dire par appel pouvant être passé ou reçu en même temps.`,
      href: "/telephonie-entreprise/trunk-sip-compteur",
      lien: "Découvrir le raccordement trunk SIP",
    },
  ];

  return (
    <section
      aria-labelledby="guide-trunk-heberge"
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="guide-trunk-heberge"
          className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6"
        >
          Trunk SIP ou standard hébergé :{" "}
          <span className="text-red-primary">quel choix pour votre entreprise ?</span>
        </h2>
        <div className="max-w-4xl space-y-4 text-lg text-ui-muted leading-relaxed">
          <p>
            Pour votre standard téléphonique {t.preposition} {t.label}, deux
            solutions couvrent l&apos;essentiel des besoins. Le{" "}
            <strong>trunk SIP</strong> est le lien qui raccorde votre standard
            existant à notre réseau téléphonique. Avec votre standard Alcatel,
            Mitel, Panasonic, Avaya ou 3CX, vous conservez vos postes, vos
            groupes d&apos;appels et votre plan de numérotation. Le{" "}
            <strong>standard hébergé</strong> remplace le matériel : vous
            n&apos;avez plus de serveur dans vos locaux et utilisez des postes
            sur smartphone, ordinateur ou navigateur. Les deux solutions
            utilisent votre connexion internet actuelle.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {cartes.map((c) => (
            <div
              key={c.titre}
              className="rounded-xl p-6 shadow-sm border border-ui-border bg-ui-surface"
            >
              <h3 className="text-xl font-bold text-gray-dark mb-2">{c.titre}</h3>
              <p className="text-ui-muted mb-4 text-sm leading-relaxed">{c.texte}</p>
              <NextLink
                href={c.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 hover:gap-2 transition-all"
              >
                {c.lien} <ArrowRight size={14} aria-hidden="true" />
              </NextLink>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-4xl text-lg text-ui-muted leading-relaxed">
          Pour décider, regardez le coût du changement. Si votre standard est
          en bon état, le trunk SIP allège la facture et préserve les habitudes
          de vos équipes. Si votre standard arrive en fin de vie, si vous
          recrutez à distance ou si votre local technique est exposé à la
          chaleur et aux coupures, le standard hébergé évite de racheter du
          matériel. Dans les deux cas, E2I VoIP reste votre opérateur pour les
          appels.
        </p>
      </div>
    </section>
  );
}

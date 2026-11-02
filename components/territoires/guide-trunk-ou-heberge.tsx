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
      titre: "Petite équipe, pas de standard à conserver",
      texte: `Une dizaine de personnes au plus, un standard ancien à remplacer ou des collaborateurs souvent en déplacement : le standard hébergé évite d'acheter du matériel. Numéros ${t.indicatif}, accueil, renvois, messagerie et application mobile.`,
      href: "/telephonie-entreprise/3cx-smb-mutualisee",
      lien: "Voir le standard hébergé",
    },
    {
      titre: "Un PABX récent déjà en place",
      texte: `Votre standard fonctionne et vos équipes le connaissent : nous le raccordons en trunk SIP, nous portons vos numéros ${t.indicatif} et vous gardez vos postes. Facturation au canal d'appel simultané.`,
      href: "/telephonie-entreprise/trunk-sip-compteur",
      lien: "Voir le trunk SIP",
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
          <span className="text-red-primary">que choisir selon votre équipe</span>
        </h2>
        <div className="max-w-4xl space-y-4 text-lg text-ui-muted leading-relaxed">
          <p>
            Deux architectures couvrent l&apos;essentiel des besoins{" "}
            {t.preposition} {t.label}. Le <strong>trunk SIP</strong> raccorde
            le standard que vous avez déjà (Alcatel, Mitel, Panasonic, Avaya,
            3CX…) à notre réseau : postes, groupes d&apos;appels et plan de
            numérotation ne bougent pas. Le <strong>standard hébergé</strong>{" "}
            remplace le matériel : plus de serveur dans vos locaux, des postes
            sur smartphone, ordinateur ou navigateur. Les deux passent par
            votre accès internet actuel.
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
          Le bon critère, c&apos;est le coût de la bascule. Un standard en bon
          état : le trunk SIP allège la facture sans changer les habitudes de
          vos équipes. Un standard en fin de vie, des recrutements à distance
          ou un local technique exposé à la chaleur et aux coupures : le
          standard hébergé évite de racheter du matériel. Dans les deux cas,
          E2I VoIP reste votre opérateur voix.
        </p>
      </div>
    </section>
  );
}

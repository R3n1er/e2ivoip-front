import {
  enumererFr,
  type StandardTerritory,
} from "@/lib/territoires/standard-telephonique";

/**
 * Section « Migrer depuis … : portabilité » des pages territoriales.
 *
 * ⚠️ Seul emplacement du site où un concurrent est nommé (cadre arbitré le
 * 2026-11-02) : comme opérateur d'ORIGINE d'une portabilité, sans jugement,
 * sans comparaison de prix ni de qualité. Les noms viennent du registre
 * (`migrationOperators`), jamais écrits en dur ici.
 *
 * Aucun délai chiffré n'est annoncé tant qu'il n'est pas confirmé côté
 * grossiste ; aucun prix non plus (la grille et la FAQ divergent encore sur
 * la gratuité de la portabilité).
 */
export function MigrationOperateurs({
  territory: t,
}: {
  territory: StandardTerritory;
}) {
  const operateurs = enumererFr([...t.migrationOperators]);
  const etapes = [
    "Audit de votre facture actuelle et du nombre d'appels simultanés réellement utilisés.",
    "Choix de l'architecture : trunk SIP si votre standard est conservé, standard hébergé sinon.",
    "Signature du mandat et dépôt de la demande de portabilité par E2I VoIP.",
    "Tests d'appel sur votre accès internet, avant toute bascule.",
    "Bascule à la date convenue : vos clients composent toujours le même numéro.",
  ];

  return (
    <section
      aria-labelledby="migration-portabilite"
      className="py-16 bg-gradient-to-br from-ui-surface to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="migration-portabilite"
          className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6"
        >
          Migrer depuis {operateurs} :{" "}
          <span className="text-red-primary">
            la portabilité de vos numéros {t.indicatif}
          </span>
        </h2>
        <div className="max-w-4xl space-y-4 text-lg text-ui-muted leading-relaxed">
          <p>
            Changer d&apos;opérateur ne veut pas dire changer de numéro. La{" "}
            <strong>portabilité</strong> est un droit : vos numéros{" "}
            {t.indicatif} restent les vôtres, quel que soit votre opérateur
            actuel. E2I VoIP dépose la demande en tant que nouvel opérateur.
            Le dossier tient en trois pièces : le mandat de portabilité signé,
            votre RIO et votre dernière facture. Si vous ne connaissez pas tous
            les numéros rattachés à votre ligne, une fiabilisation les recense
            avant la demande.
          </p>
          <p>
            La portabilité peut être demandée en cours d&apos;engagement ; les
            éventuels frais de résiliation anticipée restent dus à
            l&apos;ancien opérateur, c&apos;est pourquoi nous relisons votre
            contrat avant de fixer la date. Elle vaut résiliation des seuls
            numéros portés : votre accès internet et vos lignes mobiles restent
            en place, chez le fournisseur de votre choix.
          </p>
        </div>

        <ol
          aria-label="Déroulé d'une migration"
          className="mt-8 max-w-4xl space-y-3"
        >
          {etapes.map((etape, i) => (
            <li key={etape} className="flex items-start gap-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-marine text-white text-sm font-bold font-mono tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="pt-1 text-gray-dark">{etape}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

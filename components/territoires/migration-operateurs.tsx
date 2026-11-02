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
    "Nous étudions votre facture actuelle et le nombre d'appels réellement passés ou reçus en même temps.",
    "Vous choisissez la solution : un raccordement trunk SIP pour garder votre standard, ou un standard hébergé pour le remplacer.",
    "Vous signez le mandat de portabilité. E2I VoIP dépose la demande de transfert de vos numéros.",
    "Nous testons les appels sur votre connexion internet avant de transférer vos numéros.",
    "Le transfert a lieu à la date convenue. Vos clients continuent de vous appeler au même numéro.",
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
            Vous changez d&apos;opérateur {t.preposition} {t.label} ? Vous
            conservez vos numéros locaux {t.indicatif}. Ce transfert, appelé{" "}
            <strong>portabilité</strong>, est un droit, quel que soit votre
            opérateur actuel. E2I VoIP, votre nouvel opérateur, dépose la
            demande. Préparez trois pièces : votre mandat de portabilité signé,
            votre RIO et votre dernière facture. Vous ne connaissez pas tous
            les numéros rattachés à votre ligne ? Une vérification, appelée
            fiabilisation, permet de les recenser avant la demande.
          </p>
          <p>
            Vous pouvez demander la portabilité même si votre engagement
            n&apos;est pas terminé. Les éventuels frais de résiliation anticipée
            restent dus à votre ancien opérateur. Nous relisons donc votre
            contrat avant de fixer la date du transfert. La portabilité vaut
            résiliation uniquement pour les numéros transférés. Votre accès
            internet et vos lignes mobiles restent en place, chez le fournisseur
            de votre choix.
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

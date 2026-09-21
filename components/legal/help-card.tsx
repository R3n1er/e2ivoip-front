import Link from "next/link";

/**
 * Encart d'aide affiché en bas des pages juridiques.
 * Renvoie vers /juridique/exercer-mes-droits et /contact.
 *
 * Couleurs : `gray-dark` (14,68:1) pour le texte et `blue-marine` (11,86:1)
 * pour les liens. `red-primary` est à 4,13:1 sur blanc — sous le seuil AA
 * de 4,5:1 — et reste réservé aux titres et aux icônes.
 *
 * Ce composant avait échappé à la PR #72 : son garde-fou lisait les
 * `page.tsx` du dossier app/juridique/ et ne suivait pas les imports. Le
 * test couvre désormais aussi components/legal/.
 */
export function LegalHelpCard() {
  return (
    <div className="p-6 bg-ui-surface rounded-lg border border-ui-border">
      <p className="text-sm text-gray-dark">
        <strong>Besoin d&rsquo;aide ?</strong> Pour toute question sur ces
        documents ou pour exercer vos droits sur vos données personnelles,
        consultez la page{" "}
        <Link
          href="/juridique/exercer-mes-droits"
          className="text-blue-marine underline"
        >
          Exercer mes droits
        </Link>{" "}
        ou{" "}
        <Link href="/contact" className="text-blue-marine underline">
          contactez-nous
        </Link>
        .
      </p>
    </div>
  );
}
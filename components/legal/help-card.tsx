import Link from "next/link";

/**
 * Encart d'aide affiché en bas des pages juridiques.
 * Renvoie vers /juridique/exercer-mes-droits et /contact.
 */
export function LegalHelpCard() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-600">
        <strong>Besoin d&rsquo;aide ?</strong> Pour toute question sur ces
        documents ou pour exercer vos droits sur vos données personnelles,
        consultez la page{" "}
        <Link
          href="/juridique/exercer-mes-droits"
          className="text-red-primary underline"
        >
          Exercer mes droits
        </Link>{" "}
        ou{" "}
        <Link href="/contact" className="text-red-primary underline">
          contactez-nous
        </Link>
        .
      </p>
    </div>
  );
}
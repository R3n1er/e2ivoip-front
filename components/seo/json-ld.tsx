/**
 * Injecte un bloc de données structurées JSON-LD (<script type="application/ld+json">).
 *
 * Server component : le script est rendu côté serveur, donc présent dans le HTML
 * initial → lisible par Googlebot, Bingbot et les crawlers IA sans exécution JS.
 *
 * Sécurité : `data` doit provenir de sources contrôlées (builders de
 * lib/structured-data.ts). La sérialisation ci-dessous reste défensive, car
 * certains schémas sont alimentés par du contenu distant (articles HubSpot).
 */

/**
 * Sérialise en JSON sûr à insérer dans un `<script>`.
 *
 * `JSON.stringify` échappe les guillemets et backslashes, mais pas :
 * - `<` : une valeur contenant `</script>` fermerait la balise, et le reste
 *   du document serait interprété comme du HTML.
 * - U+2028 / U+2029 : valides en JSON, mais interdits dans un littéral
 *   JavaScript, ce qui casse le parsing chez certains consommateurs.
 *
 * Ces séquences sont réécrites en échappements Unicode : le JSON reste
 * strictement équivalent une fois parsé.
 */
function serializeForScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- sérialisation échappée par serializeForScript
      dangerouslySetInnerHTML={{ __html: serializeForScript(data) }}
    />
  );
}

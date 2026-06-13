/**
 * Injecte un bloc de données structurées JSON-LD (<script type="application/ld+json">).
 *
 * Server component : le script est rendu côté serveur, donc présent dans le HTML
 * initial → lisible par Googlebot, Bingbot et les crawlers IA sans exécution JS.
 *
 * Sécurité : `data` doit toujours provenir de sources contrôlées (builders de
 * lib/structured-data.ts), jamais d'entrées utilisateur.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- contenu contrôlé (pas d'input utilisateur)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

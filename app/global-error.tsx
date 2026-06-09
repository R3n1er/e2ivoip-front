"use client";

/**
 * Boundary globale — remplace le global-error builtin Next.js
 * (évite l'erreur React Client Manifest avec Turbopack 15.5.x).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-gray-dark antialiased">
        <h1 className="text-2xl font-bold text-gray-dark mb-2">
          Une erreur est survenue
        </h1>
        <p className="text-gray-secondary text-center max-w-md mb-6">
          Le site a rencontré un problème inattendu. Vous pouvez réessayer ou
          revenir à l&apos;accueil.
        </p>
        {process.env.NODE_ENV === "development" && error.message ? (
          <pre className="mb-6 max-w-lg overflow-auto rounded-lg bg-gray-100 p-4 text-left text-xs text-gray-700">
            {error.message}
            {error.digest ? `\n\ndigest: ${error.digest}` : ""}
          </pre>
        ) : null}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-red-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-dark hover:bg-gray-50"
          >
            Accueil
          </a>
        </div>
      </body>
    </html>
  );
}

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-dark mb-2">
        Impossible d&apos;afficher cette page
      </h1>
      <p className="text-gray-secondary max-w-md mb-6">
        Un problème temporaire s&apos;est produit. Réessayez dans quelques
        instants.
      </p>
      {process.env.NODE_ENV === "development" && error.message ? (
        <p className="mb-6 max-w-lg text-left text-xs text-gray-500">
          {error.message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-red-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Réessayer
      </button>
    </section>
  );
}

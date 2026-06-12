interface FormSkeletonProps {
  /** Nombre de rangées label + champ simulées */
  rows?: number;
  /** Hauteur totale en px — calquer sur celle de l'embed remplacé */
  height?: number;
}

/**
 * Skeleton de formulaire calqué sur le layout (charte : pas de spinner
 * circulaire). À utiliser comme fallback des embeds Tally/HubSpot.
 */
export function FormSkeleton({ rows = 4, height = 500 }: FormSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Chargement du formulaire"
      style={{ height: `${height}px` }}
      className="w-full overflow-hidden rounded-xl bg-gray-50 p-6 animate-pulse space-y-6"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} data-skeleton-row className="space-y-2">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-10 w-full rounded-lg bg-gray-200" />
        </div>
      ))}
      <div className="h-12 w-40 rounded-lg bg-gray-300" />
      <span className="sr-only">Chargement du formulaire…</span>
    </div>
  );
}

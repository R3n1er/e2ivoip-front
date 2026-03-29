import Link from "next/link";
import type { BlogTag } from "@/lib/hubspot-blog";

interface BlogTagFilterProps {
  tags: BlogTag[];
  activeTag?: string;
}

export function BlogTagFilter({ tags, activeTag }: BlogTagFilterProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2 mb-8">
      {/* Bouton "Tous" */}
      <Link
        href="/blog"
        className={[
          "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-200",
          !activeTag
            ? "border-red-primary text-red-primary"
            : "border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary",
        ].join(" ")}
        aria-current={!activeTag ? "page" : undefined}
      >
        Tous
      </Link>

      {/* Boutons par tag */}
      {tags.map((tag) => {
        const isActive = activeTag === tag.slug;

        return (
          <Link
            key={tag.id}
            href={`/blog/categorie/${tag.slug}`}
            className={[
              "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-200",
              isActive
                ? "border-red-primary text-red-primary"
                : "border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {tag.name}
          </Link>
        );
      })}
    </nav>
  );
}

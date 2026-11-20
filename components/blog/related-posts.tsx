import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { Card, CardContent } from "@/components/ui/card";
import type { PublicBlogPost } from "@/lib/blog-types";
import { Calendar } from "@/lib/icons";

interface RelatedPostsProps {
  posts: PublicBlogPost[];
}

/**
 * Section « Articles liés » en bas d'un article de blog.
 *
 * Chaque carte affiche l'image de couverture de l'article quand elle existe,
 * comme la grille du listing. L'image est décorative (alt vide) et sort de
 * l'ordre de tabulation : le titre reste le seul lien accessible de la carte,
 * pour éviter d'annoncer deux fois le même lien au lecteur d'écran.
 */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-ui-surface">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-dark mb-2">
          Articles liés
        </h2>
        <p className="text-ui-muted">
          Découvrez d&apos;autres articles sur des sujets similaires
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const href = `/blog/${post.slug}`;
          const cover = post.featuredImageUrl || post.featuredImage;

          return (
            <Card
              key={post.slug}
              role="article"
              className="group overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              {cover && (
                <Link
                  href={href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block w-full aspect-[16/9] overflow-hidden"
                >
                  <Image
                    src={cover}
                    alt=""
                    fill
                    data-testid="related-post-cover"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
              )}
              <CardContent className="p-6 flex-grow">
                <h3 className="font-semibold text-gray-dark mb-2">
                  <Link
                    href={href}
                    className="hover:text-red-text transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-ui-muted text-sm line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-ui-muted">
                  <Calendar size={16} aria-hidden="true" />
                  <span>
                    {new Date(post.publishDate || "").toLocaleDateString(
                      "fr-FR",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

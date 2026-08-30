import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogMetadata, getBlogPosts } from "@/lib/blog-source";
import { blogSchema, breadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import type { PublicBlogPost } from "@/lib/blog-types";

const POSTS_PER_PAGE = 12;

// Les articles viennent de HubSpot : on revalide chaque heure plutôt que de
// rendre la page dynamique, pour garder un HTML servi depuis le cache CDN.
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Blog téléphonie IP & VoIP entreprise",
  description:
    "Conseils, guides et actualités sur la téléphonie IP d'entreprise : Trunk SIP, 3CX, portabilité, fin du réseau cuivre. Expertise opérateur DOM et France.",
  keywords:
    "blog téléphonie IP, VoIP entreprise, Trunk SIP, 3CX, PABX, portabilité, fin du cuivre, DOM",
  path: "/blog",
});

/**
 * Listing du blog, rendu côté serveur.
 *
 * Historique : cette page était un composant client qui chargeait les articles
 * après hydratation. Le HTML servi ne contenait donc aucun lien d'article, et
 * les crawlers sans exécution JS — dont plusieurs crawlers IA autorisés dans
 * `robots.txt` — voyaient un blog vide. Les articles sont désormais rendus par
 * le serveur ; `BlogBrowser` ne gère que l'interactivité.
 */
export default async function BlogPage() {
  let posts: PublicBlogPost[] = [];
  let total = 0;
  let metadataFacets = { tags: [] as string[], authors: [] as string[], years: [] as number[] };

  try {
    const [list, facets] = await Promise.all([
      getBlogPosts(1, POSTS_PER_PAGE),
      getBlogMetadata(),
    ]);
    posts = list.posts;
    total = list.total;
    metadataFacets = facets;
  } catch (cause) {
    // Le blog dépend de HUBSPOT_ACCESS_TOKEN : en cas d'indisponibilité, la page
    // doit rester servie (hero, CTA, maillage) plutôt que de renvoyer une erreur.
    console.error("[blog] chargement des articles impossible:", cause);
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          blogSchema(
            posts.map((post) => ({
              title: post.title,
              slug: post.slug,
              publishDate: post.publishDate,
            }))
          ),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-r from-red-primary to-blue-marine py-16">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
                <span className="text-white">Blog</span> E2I VoIP
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90">
                Actualités, conseils et guides sur la téléphonie IP et les
                communications d&apos;entreprise
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                {[
                  "Expertise téléphonie IP",
                  "Conseils techniques",
                  "Actualités secteur",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full bg-white"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlogBrowser
              initialPosts={posts}
              initialTotal={total}
              pageSize={POSTS_PER_PAGE}
              availableAuthors={metadataFacets.authors}
              availableYears={metadataFacets.years}
              availableTags={metadataFacets.tags}
            />

            {/* Maillage interne lisible sans JavaScript : garantit aux crawlers
                un lien vers chaque article même si le rendu client échoue. */}
            {posts.length > 0 && (
              <nav
                aria-label="Tous les articles du blog"
                className="mt-16 border-t border-gray-200 pt-8"
              >
                <h2 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gray-500">
                  Tous les articles
                </h2>
                <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm leading-relaxed text-gray-600 underline-offset-2 hover:text-red-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
              Besoin d&apos;expertise en téléphonie IP ?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Nos experts sont là pour vous accompagner dans vos projets de
              communication d&apos;entreprise.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/devis-en-ligne"
                className="inline-flex items-center justify-center rounded-lg bg-red-primary px-8 py-3 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-red-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
              >
                Demander un devis
              </Link>
              <Link
                href="/nos-services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

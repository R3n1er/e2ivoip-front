import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-source";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import { ArrowLeft, ShareNetwork, UserCircle, Calendar, Timer } from '@/lib/icons';
import { stripHtml } from "@/lib/blog-utils";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Les extraits HubSpot arrivent enrobés de HTML (`<p>…</p>`). Laissés tels
 * quels, ces balises se retrouvent dans les meta descriptions et les extraits
 * affichés en SERP. La fonction stripHtml est partagée via @/lib/blog-utils.
 */

// Génération des métadonnées dynamiques
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article non trouvé - E2I VoIP",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  const title = post.seoTitle || post.title;
  const description = stripHtml(post.metaDescription || post.excerpt);
  const image = post.featuredImageUrl || post.featuredImage;
  const images = image ? [image] : [];

  return {
    title,
    description,
    // Sans canonical, les variantes d'URL (paramètres de campagne, casse)
    // fragmentent l'autorité de l'article entre plusieurs adresses.
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishDate,
      // `modifiedDate` est disponible dans les données HubSpot : le recopier
      // depuis `publishDate` masquait les mises à jour aux moteurs.
      modifiedTime: post.modifiedDate || post.publishDate,
      authors: post.author ? [post.author] : [],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

// Génération des routes statiques
export async function generateStaticParams() {
  try {
    const { posts } = await getBlogPosts(1, 100);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    // Si l'API n'est pas disponible, retourner un tableau vide
    console.warn("Impossible de générer les paramètres statiques:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let relatedPosts: Awaited<ReturnType<typeof getBlogPosts>>["posts"] = [];
  try {
    const { posts: allPosts } = await getBlogPosts(1, 100);
    relatedPosts = allPosts
      .filter(
        (p) =>
          p.slug !== slug &&
          (p.tags || []).some((tag) => (post.tags || []).includes(tag))
      )
      .slice(0, 3);
  } catch (error) {
    console.warn("Articles liés indisponibles:", error);
  }

  const publishDate = new Date(post.publishDate || "");
  const contentText = post.content || "";
  const wordCount = stripHtml(contentText).split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const featuredImageUrl = post.featuredImageUrl || post.featuredImage;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          blogPostingSchema({
            title: post.seoTitle || post.title,
            description: stripHtml(post.metaDescription || post.excerpt),
            slug: post.slug,
            publishDate: post.publishDate,
            modifiedDate: post.modifiedDate,
            author: post.author,
            imageUrl: featuredImageUrl,
            wordCount,
            keywords: post.tags,
          }),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      {/* Header avec navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Retour au blog
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <ShareNetwork size={16} className="mr-2" aria-hidden="true" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-8">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image d'en-tête */}
          {featuredImageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={featuredImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          )}

          {/* En-tête de l'article */}
          <header className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-red-primary/10 text-red-primary hover:bg-red-primary/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <UserCircle size={16} aria-hidden="true" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} aria-hidden="true" />
                <span>
                  {publishDate.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={16} aria-hidden="true" />
                <span>{readingTime} min de lecture</span>
              </div>
            </div>

            {/* Extrait */}
            {post.excerpt && (
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {stripHtml(post.excerpt)}
              </p>
            )}
          </header>

          {/* Contenu de l'article */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: contentText }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-red-primary to-blue-marine text-white mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Besoin d&apos;expertise en téléphonie IP ?
              </h3>
              <p className="text-white/90 mb-6">
                Nos experts sont là pour vous accompagner dans vos projets de
                communication d&apos;entreprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/devis-en-ligne">
                  <Button className="bg-white text-red-primary hover:bg-gray-100">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/nos-services">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-red-primary"
                  >
                    Découvrir nos services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Articles liés */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Articles liés
              </h2>
              <p className="text-gray-600">
                Découvrez d&apos;autres articles sur des sujets similaires
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.slug}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-red-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={16} aria-hidden="true" />
                      <span>
                        {new Date(
                          relatedPost.publishDate || ""
                        ).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

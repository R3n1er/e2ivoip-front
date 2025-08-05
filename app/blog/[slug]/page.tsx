import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, User, Clock, Eye, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getHubSpotBlogPosts, getHubSpotBlogPost } from "@/lib/hubspot-blog";
import { searchBlogPosts } from "@/lib/algolia-blog";
import { useHubSpot } from "@/components/hubspot-tracking";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Génération des métadonnées dynamiques
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getHubSpotBlogPost(slug);
  
  if (!post) {
    return {
      title: "Article non trouvé - E2I VoIP",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Génération des routes statiques
export async function generateStaticParams() {
  const posts = await getHubSpotBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getHubSpotBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Récupérer des articles liés
  const relatedPosts = await searchBlogPosts("", {
    tags: post.tags.slice(0, 2),
  });

  const publishDate = new Date(post.publishDate);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-8">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image d'en-tête */}
          {post.featuredImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
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
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {publishDate.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min de lecture</span>
              </div>
            </div>

            {/* Extrait */}
            {post.excerpt && (
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Contenu de l'article */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
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
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-primary">
                    Découvrir nos services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Articles liés */}
        {relatedPosts.hits && relatedPosts.hits.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Articles liés
              </h2>
              <p className="text-gray-600">
                Découvrez d&apos;autres articles sur des sujets similaires
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.hits.slice(0, 3).map((relatedPost: any) => (
                <Card key={relatedPost.objectID} className="hover:shadow-lg transition-shadow">
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
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(relatedPost.publishDate).toLocaleDateString("fr-FR", {
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
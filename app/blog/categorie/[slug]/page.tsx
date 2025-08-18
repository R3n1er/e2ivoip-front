import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { BlogPagination } from "@/components/blog/blog-pagination";
import type { BlogPost } from "@/lib/hubspot-blog";
import { getMockBlogPosts } from "@/lib/mock-blog-data";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Génération des métadonnées dynamiques
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);
  
  return {
    title: `Articles ${categoryName} - Blog E2I VoIP`,
    description: `Découvrez tous nos articles sur ${categoryName} dans le domaine de la téléphonie IP et des communications d'entreprise.`,
    openGraph: {
      title: `Articles ${categoryName} - Blog E2I VoIP`,
      description: `Découvrez tous nos articles sur ${categoryName} dans le domaine de la téléphonie IP et des communications d'entreprise.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);
  

  const mockPosts = getMockBlogPosts();
  
  // Filtrer les articles de cette catégorie
  const filteredPosts = mockPosts.filter(post => 
    post.tags.includes(categoryName) || post.categories.includes(categoryName)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const results = {
    hits: filteredPosts,
    nbHits: filteredPosts.length
  };

  // Transformer les résultats
  const posts: BlogPost[] = results.hits.map((hit: any) => ({
    id: hit.objectID,
    title: hit.title,
    excerpt: hit.excerpt,
    content: hit.content,
    publishDate: hit.publishDate,
    modifiedDate: hit.modifiedDate,
    author: hit.author,
    authorId: hit.authorId,
    tags: hit.tags || [],
    categories: hit.categories || [],
    slug: hit.slug,
    url: hit.url,
    featuredImage: hit.featuredImage,
    metaDescription: hit.metaDescription,
    seoTitle: hit.seoTitle,
  }));

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
          </div>
        </div>
      </header>

      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Tag className="w-8 h-8 text-white" />
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {categoryName}
                </h1>
              </div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {results.nbHits} article{results.nbHits !== 1 ? "s" : ""} trouvé{results.nbHits !== 1 ? "s" : ""} dans cette catégorie
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogPostsGrid
              posts={posts}
              loading={false}
              emptyMessage={`Aucun article trouvé dans la catégorie "${categoryName}".`}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besoin d&apos;expertise en téléphonie IP ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nos experts sont là pour vous accompagner dans vos projets de
              communication d&apos;entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/devis-en-ligne"
                className="inline-flex items-center px-8 py-3 bg-red-primary hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Demander un devis
              </a>
              <a
                href="/nos-services"
                className="inline-flex items-center px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Découvrir nos services
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 
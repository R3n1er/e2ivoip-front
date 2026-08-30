import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";

import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogPostsByCategory } from "@/lib/blog-source";
import { breadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import type { PublicBlogPost } from "@/lib/blog-types";
import { ArrowLeft, Tag } from '@/lib/icons';

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
  
  // Le suffixe marque est ajouté par title.template du layout racine.
  const title = `Articles ${categoryName} - Blog`;
  const description = `Découvrez tous nos articles sur ${categoryName} dans le domaine de la téléphonie IP et des communications d'entreprise.`;

  return pageMetadata({
    title,
    description,
    path: `/blog/categorie/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);

  // Ces pages reçoivent les redirections 301 des URLs /blog/tag/<slug> de
  // l'ancien site : elles ne doivent jamais renvoyer un 404, sous peine de
  // perdre l'autorité SEO transmise par la redirection. En cas d'erreur API,
  // on dégrade vers une liste vide plutôt que d'échouer.
  let posts: PublicBlogPost[] = [];
  try {
    const result = await getBlogPostsByCategory(slug);
    posts = result.posts;
  } catch (error) {
    console.error(
      `[blog/categorie] Échec du chargement de la catégorie "${categoryName}":`,
      error
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: categoryName, path: `/blog/categorie/${slug}` },
        ])}
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
                <Tag size={32} className="text-white" aria-hidden="true" />
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {categoryName}
                </h1>
              </div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {posts.length} article{posts.length !== 1 ? "s" : ""} trouvé{posts.length !== 1 ? "s" : ""} dans cette catégorie
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
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
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
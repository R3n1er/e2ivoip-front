"use client";

import { Calendar, User, ArrowRight, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/hubspot-blog";
import { useHubSpot } from "@/components/hubspot-tracking";

interface BlogPostsGridProps {
  posts: BlogPost[];
  loading?: boolean;
  emptyMessage?: string;
}

export function BlogPostsGrid({
  posts,
  loading = false,
  emptyMessage = "Aucun article trouvé.",
}: BlogPostsGridProps) {
  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <Card className="border-gray-200">
              <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-full h-6 bg-gray-200 rounded"></div>
                <div className="w-full h-16 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const { trackEvent } = useHubSpot();
  const publishDate = new Date(post.publishDate);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200); // Estimation de lecture

  const handleReadMore = () => {
    trackEvent("blog_article_clicked", {
      article_id: post.id,
      article_title: post.title,
      article_author: post.author,
      source: "blog_grid",
    });
  };

  return (
    <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      {/* Image si disponible */}
      {post.featuredImage && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      )}

      <CardHeader className="flex-grow">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-red-primary/10 text-red-primary hover:bg-red-primary/20 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs text-gray-500">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        <CardTitle className="text-lg leading-tight group-hover:text-red-primary transition-colors mb-3">
          <Link href={`/blog/${post.slug}`} onClick={handleReadMore}>
            {post.title}
          </Link>
        </CardTitle>

        <CardDescription className="line-clamp-3 text-gray-600 mb-4">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        {/* Métadonnées */}
        <div className="flex items-center text-xs text-gray-500 mb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {publishDate.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{post.author}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readingTime} min</span>
          </div>
        </div>

        {/* Bouton de lecture */}
        <Link href={`/blog/${post.slug}`} onClick={handleReadMore}>
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent hover:bg-red-primary hover:text-white hover:border-red-primary transition-all duration-200 group/btn"
          >
            Lire l&apos;article
            <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

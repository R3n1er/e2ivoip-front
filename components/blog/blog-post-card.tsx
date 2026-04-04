import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/hubspot-blog";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const publishDate = new Date(post.publishDate);
  const formattedDate = publishDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white border-4 border-blue-marine shadow-[8px_8px_0px_0px_#1F2937] hover:shadow-[4px_4px_0px_0px_#1F2937] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      {post.featuredImage && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAltText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-5">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-[0.2em] bg-red-primary text-white px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Titre */}
        <h3 className="text-lg font-black tracking-[-0.02em] text-blue-marine group-hover:text-red-primary transition-colors duration-200 leading-tight mb-2 uppercase">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-secondary line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-gray-secondary">
            <i className="lni lni-user" aria-hidden="true"></i>
            {post.author}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-secondary">
            <i className="lni lni-calendar" aria-hidden="true"></i>
            {formattedDate}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-secondary">
            <i className="lni lni-timer" aria-hidden="true"></i>
            {post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

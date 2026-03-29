import { getHubSpotBlogPosts } from "@/lib/hubspot-blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";

interface BlogRelatedPostsProps {
  currentPostId: string;
  tags: string[];
  tagIds: string[];
}

export async function BlogRelatedPosts({
  currentPostId,
  tags,
  tagIds,
}: BlogRelatedPostsProps) {
  if (!tagIds || tagIds.length === 0) {
    return null;
  }

  const firstTagId = tagIds[0];

  const { posts } = await getHubSpotBlogPosts({
    tag: firstTagId,
    pageSize: 4,
  });

  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  const sectionLabel = tags[0] ? tags[0] : "la même catégorie";

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-black tracking-[-0.04em] text-[#091421] uppercase mb-2">
        Articles liés
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Plus d&apos;articles sur <span className="text-red-primary font-bold">{sectionLabel}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

import type { Post } from "@/lib/supabase/posts";
import PostCard from "@/components/PostCard";

type RecentPostsProps = {
  posts: Post[];
};

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Son Gönderiler
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Topluluktan gelen gerçek saha paylaşımları.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {posts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
              <p className="text-sm text-muted">
                Henüz paylaşılan bir keşif yok. İlk paylaşımı sen yap!
              </p>
            </div>
          )}

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

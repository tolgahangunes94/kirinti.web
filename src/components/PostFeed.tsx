"use client";

import { useState } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { getPosts, type Post } from "@/lib/supabase/posts";
import { getLikedPostIds } from "@/lib/supabase/likes";
import PostCard from "@/components/PostCard";

const PAGE_SIZE = 20;

type PostFeedProps = {
  initialPosts: Post[];
};

export default function PostFeed({ initialPosts }: PostFeedProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initialPosts.length >= PAGE_SIZE);
  const [prevInitialPosts, setPrevInitialPosts] = useState(initialPosts);

  if (initialPosts !== prevInitialPosts) {
    setPrevInitialPosts(initialPosts);
    setPosts(initialPosts);
    setHasMore(initialPosts.length >= PAGE_SIZE);
  }

  async function handleLoadMore() {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const nextBatch = await getPosts(supabase, PAGE_SIZE, posts.length);

      const existingIds = new Set(posts.map((post) => post.id));
      const newPosts = nextBatch.filter((post) => !existingIds.has(post.id));

      let enrichedPosts = newPosts;
      if (user && newPosts.length > 0) {
        const likedIds = await getLikedPostIds(
          supabase,
          user.id,
          newPosts.map((post) => post.id),
        );
        enrichedPosts = newPosts.map((post) => ({
          ...post,
          liked_by_me: likedIds.has(post.id),
        }));
      }

      setPosts((prev) => [...prev, ...enrichedPosts]);
      setHasMore(nextBatch.length >= PAGE_SIZE);
    } catch {
      setError("Gönderiler yüklenirken bir hata oluştu. Tekrar dene.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <div className="mt-2 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {loading ? "Yükleniyor..." : "Daha fazla göster"}
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      )}
    </>
  );
}

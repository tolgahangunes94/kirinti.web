import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import CommentForm from "@/components/CommentForm";
import CommentItem from "@/components/CommentItem";
import { createClient } from "@/lib/supabase/server";
import { getPostById } from "@/lib/supabase/posts";
import { getCommentsByPostId } from "@/lib/supabase/comments";
import { getLikedPostIds } from "@/lib/supabase/likes";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const post = await getPostById(supabase, id);
  if (!post) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const likedIds = user
    ? await getLikedPostIds(supabase, user.id, [post.id])
    : new Set<string>();

  const comments = await getCommentsByPostId(supabase, id);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <PostCard post={{ ...post, liked_by_me: likedIds.has(post.id) }} />

        <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
          Yorumlar
        </h2>

        <CommentForm postId={post.id} />

        <div className="mt-6 flex flex-col gap-4">
          {comments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
              <p className="text-sm text-muted">
                Henüz yorum yok. İlk yorumu sen yap!
              </p>
            </div>
          )}

          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </main>
    </>
  );
}

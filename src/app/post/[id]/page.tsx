import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostDetail from "@/components/PostDetail";
import CommentForm from "@/components/CommentForm";
import CommentItem from "@/components/CommentItem";
import { createClient } from "@/lib/supabase/server";
import { getPostById } from "@/lib/supabase/posts";
import { getCommentsByPostId } from "@/lib/supabase/comments";
import { getLikedPostIds } from "@/lib/supabase/likes";
import { SITE_OG_IMAGE } from "@/app/layout";

const FALLBACK_OG_IMAGE = { url: SITE_OG_IMAGE, width: 1045, height: 490 };

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const post = await getPostById(supabase, id);
  if (!post) return {};

  const title = post.location ? `${post.location} — Saha Paylaşımı` : "Saha Paylaşımı";
  const description =
    post.description.length > 160
      ? `${post.description.slice(0, 157)}...`
      : post.description;

  const hasValidPostImage =
    typeof post.image_url === "string" && post.image_url.trim().length > 0;
  const ogImages = hasValidPostImage
    ? [{ url: post.image_url as string }]
    : [FALLBACK_OG_IMAGE];

  return {
    title,
    description,
    alternates: {
      canonical: `/post/${id}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  };
}

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

  const { data: author } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", post.user_id)
    .single();

  const comments = await getCommentsByPostId(supabase, id);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <PostDetail
          post={{ ...post, liked_by_me: likedIds.has(post.id) }}
          author={author}
        />

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

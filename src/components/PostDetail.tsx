import type { Post } from "@/lib/supabase/posts";
import { getInitials } from "@/lib/getInitials";
import LikeButton from "@/components/LikeButton";
import DeletePostButton from "@/components/DeletePostButton";

function PostIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M3 14.5 7 9l3 3.5 3-4 4 6" />
      <circle cx="6" cy="6" r="1.5" />
      <rect x="2" y="3" width="16" height="13" rx="1.5" />
    </svg>
  );
}

type PostAuthor = {
  full_name: string | null;
  avatar_url: string | null;
};

type PostDetailProps = {
  post: Post;
  author: PostAuthor | null;
};

export default function PostDetail({ post, author }: PostDetailProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {author?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.avatar_url}
              alt={author.full_name ?? "Profil fotoğrafı"}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
              {getInitials(author?.full_name)}
            </span>
          )}
          <p className="text-sm font-semibold text-foreground">
            {author?.full_name ?? "İsimsiz Keşifçi"}
          </p>
        </div>

        <DeletePostButton
          postId={post.id}
          imageUrl={post.image_url}
          ownerId={post.user_id}
          afterDelete="redirect-home"
        />
      </div>

      <div className="bg-glow mt-5 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2 text-accent/70">
        {post.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image_url}
            alt={post.location ?? "Keşif görseli"}
            className="h-full w-full object-cover"
          />
        ) : (
          <PostIcon />
        )}
      </div>

      {post.location && (
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          {post.location}
        </div>
      )}

      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
        {post.description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-sm text-muted">
        <LikeButton
          postId={post.id}
          initialLikesCount={post.likes_count}
          initiallyLiked={post.liked_by_me}
        />
      </div>
    </div>
  );
}

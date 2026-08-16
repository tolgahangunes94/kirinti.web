import Link from "next/link";
import type { Post } from "@/lib/supabase/posts";
import LikeButton from "@/components/LikeButton";
import DeletePostButton from "@/components/DeletePostButton";
import PostImage from "@/components/PostImage";

function PostIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M3 14.5 7 9l3 3.5 3-4 4 6" />
      <circle cx="6" cy="6" r="1.5" />
      <rect x="2" y="3" width="16" height="13" rx="1.5" />
    </svg>
  );
}

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="relative flex items-start gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      <div className="absolute right-3 top-3">
        <DeletePostButton
          postId={post.id}
          imageUrl={post.image_url}
          ownerId={post.user_id}
          variant="icon"
        />
      </div>

      {post.image_url ? (
        <PostImage
          imageUrl={post.image_url}
          alt={post.location ?? "Keşif görseli"}
        />
      ) : (
        <Link
          href={`/post/${post.id}`}
          className="bg-glow flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2 text-accent/70"
        >
          <PostIcon />
        </Link>
      )}

      <div className="min-w-0 flex-1">
        <Link href={`/post/${post.id}`} className="block">
          {post.location && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
              <svg
                width="14"
                height="14"
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

          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-foreground">
            {post.description}
          </p>
        </Link>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <LikeButton
            postId={post.id}
            initialLikesCount={post.likes_count}
            initiallyLiked={post.liked_by_me}
          />
          <Link
            href={`/post/${post.id}`}
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M3 4h14v9H8l-4 3v-3H3V4Z" />
            </svg>
            {post.comments_count}
          </Link>
        </div>
      </div>
    </article>
  );
}

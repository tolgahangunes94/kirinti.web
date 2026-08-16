"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { deleteComment, type CommentWithAuthor } from "@/lib/supabase/comments";
import { getInitials } from "@/lib/getInitials";

type CommentItemProps = {
  comment: CommentWithAuthor;
};

export default function CommentItem({ comment }: CommentItemProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const isOwner = user?.id === comment.user_id;

  async function handleDelete() {
    setDeleting(true);
    try {
      const supabase = createClient();
      await deleteComment(supabase, comment.id);
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
      {comment.author_avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={comment.author_avatar_url}
          alt={comment.author_full_name ?? "Profil fotoğrafı"}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
          {getInitials(comment.author_full_name)}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">
            {comment.author_full_name ?? "İsimsiz Keşifçi"}
          </p>
          {isOwner && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs font-medium text-muted transition-colors hover:text-red-400 disabled:opacity-60"
            >
              {deleting ? "Siliniyor..." : "Sil"}
            </button>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-foreground">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

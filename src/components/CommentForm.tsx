"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { createClient } from "@/lib/supabase/client";
import { createComment } from "@/lib/supabase/comments";

type CommentFormProps = {
  postId: string;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-8 text-center">
        <p className="text-sm text-muted">
          Yorum yapmak için giriş yapmalısın.
        </p>
        <button
          type="button"
          onClick={() => openAuthModal("sign-in")}
          className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Giriş Yap / Katıl
        </button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) {
      setError("Yorum boş olamaz.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      await createComment(supabase, { post_id: postId, content });
      setContent("");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Yorum gönderilirken bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      <textarea
        required
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bir yorum yaz..."
        className="w-full resize-none rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-end rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {loading ? "Gönderiliyor..." : "Yorum Yap"}
      </button>
    </form>
  );
}

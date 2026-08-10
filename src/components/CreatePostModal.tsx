"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createPost } from "@/lib/supabase/posts";
import ImageUpload from "@/components/ImageUpload";

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export default function CreatePostModal({
  open,
  onClose,
  onCreated,
}: CreatePostModalProps) {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      await createPost(supabase, {
        location: location.trim(),
        description: description.trim(),
        image_url: imageUrl,
      });

      setLocation("");
      setDescription("");
      setImageUrl(null);
      onCreated?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gönderi paylaşılırken bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/70" />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto px-4 py-8">
        <div className="relative w-full max-w-lg rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>

          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Keşif Paylaş
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Bugünkü keşfini toplulukla paylaş.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <ImageUpload value={imageUrl} onChange={setImageUrl} />

            <div>
              <label
                htmlFor="location"
                className="text-xs font-medium text-muted"
              >
                Konum / Bölge
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Örn: İzmir / Nif"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-xs font-medium text-muted"
              >
                Açıklama
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Keşfini, numune sonucunu ya da saha deneyimini anlat..."
                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {loading ? "Paylaşılıyor..." : "Paylaş"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { useAuth, type Profile } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { updateProfileName } from "@/lib/supabase/profiles";
import AvatarUpload from "@/components/profile/AvatarUpload";

type EditProfileModalProps = {
  open: boolean;
  profile: Profile;
  onClose: () => void;
  onUpdated?: () => void;
};

export default function EditProfileModal({
  open,
  profile,
  onClose,
  onUpdated,
}: EditProfileModalProps) {
  const { refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleAvatarChange(url: string | null) {
    setAvatarUrl(url);
    await refreshProfile();
    onUpdated?.();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      await updateProfileName(supabase, fullName.trim());
      await refreshProfile();
      onUpdated?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Profil güncellenirken bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/70" />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8">
        <div className="relative flex max-h-[85vh] w-full max-w-md flex-col rounded-2xl border border-border bg-surface">
          <div className="flex items-start justify-between gap-4 border-b border-border p-6 sm:p-8 sm:pb-6">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Profili Düzenle
            </h2>

            <button
              type="button"
              aria-label="Kapat"
              onClick={onClose}
              className="shrink-0 text-muted transition-colors hover:text-foreground"
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
          </div>

          <form
            id="edit-profile-form"
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 py-6 sm:px-8"
          >
            <div>
              <label className="text-xs font-medium text-muted">
                Profil Fotoğrafı
              </label>
              <div className="mt-2">
                <AvatarUpload
                  value={avatarUrl}
                  fullName={fullName}
                  onChange={handleAvatarChange}
                />
              </div>
              <p className="mt-2 text-xs text-muted">
                Fotoğraf değişikliği anında kaydedilir.
              </p>
            </div>

            <div>
              <label
                htmlFor="edit-fullName"
                className="text-xs font-medium text-muted"
              >
                Ad Soyad
              </label>
              <input
                id="edit-fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Adını gir"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>
          </form>

          <div className="border-t border-border p-6 sm:p-8 sm:pt-6">
            {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              form="edit-profile-form"
              disabled={loading}
              className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

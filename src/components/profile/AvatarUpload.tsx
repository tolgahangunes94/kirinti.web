"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  deleteAvatarImage,
  updateProfileAvatar,
  uploadAvatarImage,
} from "@/lib/supabase/profiles";
import { getInitials } from "@/lib/getInitials";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

type AvatarUploadProps = {
  value: string | null;
  fullName: string | null;
  onChange: (url: string | null) => void;
};

export default function AvatarUpload({
  value,
  fullName,
  onChange,
}: AvatarUploadProps) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir görsel dosyası seç.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Dosya boyutu 10MB'ı geçemez.");
      return;
    }
    if (!user) {
      setError("Avatar yüklemek için giriş yapmalısın.");
      return;
    }

    setUploading(true);
    const previousUrl = value;
    let uploadedUrl: string | null = null;

    try {
      const { url } = await uploadAvatarImage(file, user.id);
      uploadedUrl = url;

      const supabase = createClient();
      await updateProfileAvatar(supabase, url);

      if (previousUrl) {
        deleteAvatarImage(previousUrl).catch(() => {});
      }

      onChange(url);
    } catch (err) {
      if (uploadedUrl) deleteAvatarImage(uploadedUrl).catch(() => {});
      setError(
        err instanceof Error
          ? err.message
          : "Avatar yüklenirken bir hata oluştu.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!value) return;
    if (!window.confirm("Profil fotoğrafını kaldırmak istediğine emin misin?"))
      return;

    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      await updateProfileAvatar(supabase, null);
      await deleteAvatarImage(value);
      onChange(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Avatar kaldırılırken bir hata oluştu.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 shrink-0">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Profil fotoğrafını değiştir"
          className="h-20 w-20 overflow-hidden rounded-full border border-border bg-surface-2 transition-colors hover:border-accent/60 disabled:opacity-60"
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt={fullName ?? "Profil fotoğrafı"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-accent text-2xl font-bold text-accent-foreground">
              {getInitials(fullName)}
            </span>
          )}
        </button>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}

        {value && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Profil fotoğrafını kaldır"
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-strong disabled:opacity-60"
        >
          {value ? "Fotoğrafı değiştir" : "Fotoğraf yükle"}
        </button>
        <p className="mt-1 text-xs text-muted">PNG, JPG — maks. 10MB</p>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}

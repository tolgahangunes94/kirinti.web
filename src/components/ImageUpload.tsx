"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { uploadPostImage } from "@/lib/supabase/storage";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

type ImageUploadProps = {
  value?: string | null;
  onChange?: (url: string | null) => void;
};

function UploadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M10 13V3M6.5 6.5 10 3l3.5 3.5" />
      <path d="M3 13v2.5A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5V13" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
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

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
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
        setError("Görsel yüklemek için giriş yapmalısın.");
        return;
      }

      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      setUploading(true);

      try {
        const { url } = await uploadPostImage(file, user.id);
        setPreview(url);
        onChange?.(url);
      } catch {
        setError("Görsel yüklenirken bir hata oluştu. Tekrar dene.");
        setPreview(value ?? null);
      } finally {
        setUploading(false);
        URL.revokeObjectURL(localPreview);
      }
    },
    [user, value, onChange],
  );

  function handleDrop(e: DragEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    setPreview(null);
    setError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
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

      {preview ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Yüklenen görsel önizlemesi"
            className="h-full w-full object-cover"
          />

          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span className="text-xs font-medium text-white">
                Yükleniyor...
              </span>
            </div>
          )}

          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Görseli kaldır"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 text-center transition-colors ${
            isDragging
              ? "border-accent bg-accent/5"
              : "border-border bg-surface-2 hover:border-accent/40"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
            <UploadIcon />
          </span>
          <span className="text-sm font-medium text-foreground">
            Görsel yüklemek için tıkla veya sürükle
          </span>
          <span className="text-xs text-muted">PNG, JPG — maks. 10MB</span>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

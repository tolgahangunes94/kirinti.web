"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import {
  deleteDiscoveryImageByPath,
  uploadDiscoveryImage,
  MAX_DISCOVERY_IMAGES,
} from "@/lib/supabase/discoveries";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

type StagedImage = {
  key: string;
  path: string;
  previewUrl: string;
  uploading: boolean;
};

type DiscoveryImagesUploadProps = {
  onChange?: (paths: string[]) => void;
};

function UploadIcon() {
  return (
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
      <path d="M10 13V3M6.5 6.5 10 3l3.5 3.5" />
      <path d="M3 13v2.5A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5V13" />
    </svg>
  );
}

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

export default function DiscoveryImagesUpload({
  onChange,
}: DiscoveryImagesUploadProps) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<StagedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onChange?.(
      images.filter((img) => !img.uploading && img.path).map((img) => img.path),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  async function handleFiles(fileList: FileList) {
    setError(null);

    if (!user) {
      setError("Görsel yüklemek için giriş yapmalısın.");
      return;
    }

    const files = Array.from(fileList);
    const remaining = MAX_DISCOVERY_IMAGES - images.length;

    if (files.length > remaining) {
      setError(`En fazla ${MAX_DISCOVERY_IMAGES} fotoğraf yükleyebilirsin.`);
    }

    for (const file of files.slice(0, remaining)) {
      if (!file.type.startsWith("image/")) {
        setError("Lütfen sadece görsel dosyası seç.");
        continue;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError("Dosya boyutu 10MB'ı geçemez.");
        continue;
      }

      const key = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);

      setImages((prev) => [...prev, { key, path: "", previewUrl, uploading: true }]);

      try {
        const { path } = await uploadDiscoveryImage(file, user.id);
        setImages((prev) =>
          prev.map((img) => (img.key === key ? { ...img, path, uploading: false } : img)),
        );
      } catch {
        setError("Görsel yüklenirken bir hata oluştu. Tekrar dene.");
        setImages((prev) => prev.filter((img) => img.key !== key));
      }
    }
  }

  function handleRemove(target: StagedImage) {
    setImages((prev) => prev.filter((img) => img.key !== target.key));
    if (target.path) {
      deleteDiscoveryImageByPath(target.path).catch(() => {});
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
          }
          e.target.value = "";
        }}
      />

      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <div
            key={img.key}
            className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.previewUrl}
              alt="Yüklenen görsel önizlemesi"
              className="h-full w-full object-cover"
            />

            {img.uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            )}

            {!img.uploading && (
              <button
                type="button"
                onClick={() => handleRemove(img)}
                aria-label="Görseli kaldır"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        ))}

        {images.length < MAX_DISCOVERY_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-surface-2 text-center transition-colors hover:border-accent/40"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
              <UploadIcon />
            </span>
            <span className="text-[11px] font-medium text-muted">Ekle</span>
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-muted">
        En fazla {MAX_DISCOVERY_IMAGES} fotoğraf ({images.length}/{MAX_DISCOVERY_IMAGES})
      </p>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

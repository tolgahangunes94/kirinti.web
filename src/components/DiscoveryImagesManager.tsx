"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  addDiscoveryImage,
  deleteDiscoveryImage,
  deleteDiscoveryImageByPath,
  uploadDiscoveryImage,
  MAX_DISCOVERY_IMAGES,
  type DiscoveryImage,
} from "@/lib/supabase/discoveries";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const POSITIONS = [0, 1, 2] as const;

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

type DiscoveryImagesManagerProps = {
  discoveryId: string;
  initialImages: DiscoveryImage[];
  onChange?: () => void;
};

export default function DiscoveryImagesManager({
  discoveryId,
  initialImages,
  onChange,
}: DiscoveryImagesManagerProps) {
  const { user } = useAuth();
  const [images, setImages] = useState<DiscoveryImage[]>(initialImages);
  const [busyPosition, setBusyPosition] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  async function handleAdd(position: number, file: File) {
    setError(null);

    if (!user) {
      setError("Görsel eklemek için giriş yapmalısın.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir görsel dosyası seç.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Dosya boyutu 10MB'ı geçemez.");
      return;
    }

    setBusyPosition(position);

    let uploadedPath: string | null = null;
    try {
      const { path } = await uploadDiscoveryImage(file, user.id);
      uploadedPath = path;

      const supabase = createClient();
      const image = await addDiscoveryImage(
        supabase,
        discoveryId,
        position,
        path,
      );

      setImages((prev) => [...prev, image]);
      onChange?.();
    } catch (err) {
      if (uploadedPath) {
        deleteDiscoveryImageByPath(uploadedPath).catch(() => {});
      }
      setError(
        err instanceof Error
          ? err.message
          : "Görsel eklenirken bir hata oluştu.",
      );
    } finally {
      setBusyPosition(null);
    }
  }

  async function handleRemove(image: DiscoveryImage) {
    if (!window.confirm("Bu fotoğrafı silmek istediğine emin misin?")) return;

    setError(null);
    setBusyPosition(image.position);

    try {
      const supabase = createClient();
      await deleteDiscoveryImage(supabase, image.id);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
      onChange?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Görsel silinirken bir hata oluştu.",
      );
    } finally {
      setBusyPosition(null);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {POSITIONS.map((position) => {
          const image = images.find((img) => img.position === position) ?? null;
          const busy = busyPosition === position;

          if (image) {
            return (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-2"
              >
                {image.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.url}
                    alt="Keşif görseli"
                    className="h-full w-full object-cover"
                  />
                )}

                {busy && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </div>
                )}

                {!busy && (
                  <button
                    type="button"
                    onClick={() => handleRemove(image)}
                    aria-label="Görseli sil"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            );
          }

          return (
            <div key={`empty-${position}`}>
              <input
                ref={inputRefs[position]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAdd(position, file);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => inputRefs[position].current?.click()}
                disabled={busy}
                className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-surface-2 text-center transition-colors hover:border-accent/40 disabled:opacity-60"
              >
                {busy ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <UploadIcon />
                    </span>
                    <span className="text-[11px] font-medium text-muted">
                      Ekle
                    </span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-muted">
        En fazla {MAX_DISCOVERY_IMAGES} fotoğraf ({images.length}/
        {MAX_DISCOVERY_IMAGES})
      </p>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

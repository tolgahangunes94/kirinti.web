"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createDiscovery } from "@/lib/supabase/discoveries";
import DiscoveryImageUpload from "@/components/DiscoveryImageUpload";

type CreateDiscoveryModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export default function CreateDiscoveryModal({
  open,
  onClose,
  onCreated,
}: CreateDiscoveryModalProps) {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [rockType, setRockType] = useState("");
  const [mineralTrace, setMineralTrace] = useState("");
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
      await createDiscovery(supabase, {
        city: city.trim(),
        district: district.trim(),
        rock_type: rockType.trim(),
        mineral_trace: mineralTrace.trim(),
        image_url: imageUrl,
      });

      setCity("");
      setDistrict("");
      setRockType("");
      setMineralTrace("");
      setImageUrl(null);
      onCreated?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Keşif kaydı oluşturulurken bir hata oluştu.",
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
            Yeni Keşif Kaydı
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Saha kaydını il, ilçe ve gözlemlerinle birlikte ekle.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <DiscoveryImageUpload value={imageUrl} onChange={setImageUrl} />

            <div>
              <label htmlFor="city" className="text-xs font-medium text-muted">
                İl
              </label>
              <input
                id="city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Örn: İzmir"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="district"
                className="text-xs font-medium text-muted"
              >
                İlçe
              </label>
              <input
                id="district"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Örn: Nif"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="rockType"
                className="text-xs font-medium text-muted"
              >
                Kayaç Türü
              </label>
              <input
                id="rockType"
                type="text"
                value={rockType}
                onChange={(e) => setRockType(e.target.value)}
                placeholder="Örn: Kuvars"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="mineralTrace"
                className="text-xs font-medium text-muted"
              >
                Mineral İzi
              </label>
              <input
                id="mineralTrace"
                type="text"
                value={mineralTrace}
                onChange={(e) => setMineralTrace(e.target.value)}
                placeholder="Örn: Pirit izleri"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createDiscovery } from "@/lib/supabase/discoveries";
import DiscoveryImagesUpload from "@/components/DiscoveryImagesUpload";

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
  const [villageOrArea, setVillageOrArea] = useState("");
  const [streamOrSiteName, setStreamOrSiteName] = useState("");
  const [rockType, setRockType] = useState("");
  const [fieldNotes, setFieldNotes] = useState("");
  const [imagePaths, setImagePaths] = useState<string[]>([]);
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
        village_or_area: villageOrArea.trim(),
        stream_or_site_name: streamOrSiteName.trim(),
        rock_type: rockType.trim(),
        field_notes: fieldNotes.trim(),
        image_paths: imagePaths,
      });

      setCity("");
      setDistrict("");
      setVillageOrArea("");
      setStreamOrSiteName("");
      setRockType("");
      setFieldNotes("");
      setImagePaths([]);
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
          <p className="mt-1.5 text-sm font-medium text-accent">
            Bu keşif yalnızca sana görünür.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="city" className="text-xs font-medium text-muted">
                İl *
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
                İlçe *
              </label>
              <input
                id="district"
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Örn: Nif"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="villageOrArea"
                className="text-xs font-medium text-muted"
              >
                Köy / Mevki
              </label>
              <input
                id="villageOrArea"
                type="text"
                value={villageOrArea}
                onChange={(e) => setVillageOrArea(e.target.value)}
                placeholder="Örn: Kaplan Köyü"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="streamOrSiteName"
                className="text-xs font-medium text-muted"
              >
                Dere / Saha Adı
              </label>
              <input
                id="streamOrSiteName"
                type="text"
                value={streamOrSiteName}
                onChange={(e) => setStreamOrSiteName(e.target.value)}
                placeholder="Örn: Kızılçay"
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
                htmlFor="fieldNotes"
                className="text-xs font-medium text-muted"
              >
                Saha Notlarım *
              </label>
              <textarea
                id="fieldNotes"
                required
                rows={4}
                value={fieldNotes}
                onChange={(e) => setFieldNotes(e.target.value)}
                placeholder="Saha gözlemlerini anlat..."
                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              <p className="mt-1.5 text-xs text-muted">
                Derinlik, taban yapısı, siyah kum, bulduğun parçalar ve
                sonraki deneyeceğin noktalar gibi saha detaylarını
                kaydedebilirsin.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-muted">
                Fotoğraflar
              </label>
              <div className="mt-1.5">
                <DiscoveryImagesUpload onChange={setImagePaths} />
              </div>
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

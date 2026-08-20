"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateDiscovery, type Discovery } from "@/lib/supabase/discoveries";
import DiscoveryLocationPicker, {
  type DiscoveryPoint,
} from "@/components/DiscoveryLocationPicker";
import PostImage from "@/components/PostImage";

type EditDiscoveryModalProps = {
  open: boolean;
  discovery: Discovery;
  onClose: () => void;
  onUpdated?: () => void;
};

export default function EditDiscoveryModal({
  open,
  discovery,
  onClose,
  onUpdated,
}: EditDiscoveryModalProps) {
  const [city, setCity] = useState(discovery.city);
  const [district, setDistrict] = useState(discovery.district);
  const [villageOrArea, setVillageOrArea] = useState(
    discovery.village_or_area ?? "",
  );
  const [streamOrSiteName, setStreamOrSiteName] = useState(
    discovery.stream_or_site_name ?? "",
  );
  const [rockType, setRockType] = useState(discovery.rock_type ?? "");
  const [fieldNotes, setFieldNotes] = useState(discovery.field_notes);
  const [point, setPoint] = useState<DiscoveryPoint | null>(
    discovery.latitude != null && discovery.longitude != null
      ? { latitude: discovery.latitude, longitude: discovery.longitude }
      : null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      await updateDiscovery(supabase, discovery.id, {
        city: city.trim(),
        district: district.trim(),
        village_or_area: villageOrArea.trim(),
        stream_or_site_name: streamOrSiteName.trim(),
        rock_type: rockType.trim(),
        field_notes: fieldNotes.trim(),
        latitude: point?.latitude ?? null,
        longitude: point?.longitude ?? null,
      });

      onUpdated?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Keşif kaydı güncellenirken bir hata oluştu.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/70" />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8">
        <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-surface">
          <div className="flex items-start justify-between gap-4 border-b border-border p-6 sm:p-8 sm:pb-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Keşfi Düzenle
              </h2>
              <p className="mt-1.5 text-sm font-medium text-accent">
                Bu keşif yalnızca sana görünür.
              </p>
            </div>

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
            id="edit-discovery-form"
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-6 sm:px-8"
          >
            <div>
              <label
                htmlFor="edit-city"
                className="text-xs font-medium text-muted"
              >
                İl *
              </label>
              <input
                id="edit-city"
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
                htmlFor="edit-district"
                className="text-xs font-medium text-muted"
              >
                İlçe *
              </label>
              <input
                id="edit-district"
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
                htmlFor="edit-villageOrArea"
                className="text-xs font-medium text-muted"
              >
                Köy / Mevki
              </label>
              <input
                id="edit-villageOrArea"
                type="text"
                value={villageOrArea}
                onChange={(e) => setVillageOrArea(e.target.value)}
                placeholder="Örn: Kaplan Köyü"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="edit-streamOrSiteName"
                className="text-xs font-medium text-muted"
              >
                Dere / Saha Adı
              </label>
              <input
                id="edit-streamOrSiteName"
                type="text"
                value={streamOrSiteName}
                onChange={(e) => setStreamOrSiteName(e.target.value)}
                placeholder="Örn: Kızılçay"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="edit-rockType"
                className="text-xs font-medium text-muted"
              >
                Kayaç Türü
              </label>
              <input
                id="edit-rockType"
                type="text"
                value={rockType}
                onChange={(e) => setRockType(e.target.value)}
                placeholder="Örn: Kuvars"
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="edit-fieldNotes"
                className="text-xs font-medium text-muted"
              >
                Saha Notlarım *
              </label>
              <textarea
                id="edit-fieldNotes"
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

            {discovery.images.length > 0 && (
              <div>
                <label className="text-xs font-medium text-muted">
                  Fotoğraflar
                </label>
                <div className="mt-1.5 flex gap-2">
                  {discovery.images.map(
                    (image) =>
                      image.url && (
                        <PostImage
                          key={image.id}
                          imageUrl={image.url}
                          alt={`${discovery.city} / ${discovery.district}`}
                        />
                      ),
                  )}
                </div>
                <p className="mt-1.5 text-xs text-muted">
                  Fotoğraflar bu ekrandan değiştirilemiyor.
                </p>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-muted">
                Harita Noktası (opsiyonel)
              </label>
              <div className="mt-1.5">
                <DiscoveryLocationPicker
                  initialPoint={point}
                  onChange={setPoint}
                />
              </div>
            </div>
          </form>

          <div className="border-t border-border p-6 sm:p-8 sm:pt-6">
            {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              form="edit-discovery-form"
              disabled={loading}
              className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {loading ? "Güncelleniyor..." : "Güncelle"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

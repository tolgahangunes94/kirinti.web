"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DiscoveryPoint } from "@/components/DiscoveryLocationPicker";

const IZMIR_CENTER: [number, number] = [38.42, 27.14];
const DEFAULT_ZOOM = 9;
const SELECTED_ZOOM = 12;

type DiscoveryLocationPickerModalProps = {
  open: boolean;
  initialPoint: DiscoveryPoint | null;
  onConfirm: (point: DiscoveryPoint) => void;
  onClose: () => void;
};

export default function DiscoveryLocationPickerModal({
  open,
  initialPoint,
  onConfirm,
  onClose,
}: DiscoveryLocationPickerModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const [point, setPoint] = useState<DiscoveryPoint | null>(initialPoint);

  useEffect(() => {
    if (!open) return;

    setPoint(initialPoint);
    let cancelled = false;

    async function initMap() {
      const { default: L } = await import("leaflet");
      if (cancelled || !mapContainerRef.current || mapRef.current) return;

      const map = L.map(mapContainerRef.current).setView(
        initialPoint
          ? [initialPoint.latitude, initialPoint.longitude]
          : IZMIR_CENTER,
        initialPoint ? SELECTED_ZOOM : DEFAULT_ZOOM,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap katkıda bulunanlar",
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:16px;height:16px;transform:rotate(45deg);background:#eab308;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.45);"></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      if (initialPoint) {
        markerRef.current = L.marker(
          [initialPoint.latitude, initialPoint.longitude],
          { icon },
        ).addTo(map);
      }

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        const nextPoint = { latitude: lat, longitude: lng };

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
        }

        setPoint(nextPoint);
      });

      mapRef.current = map;

      // Modal içinde ilk mount sırasında Leaflet konteynerinin gerçek boyutunu
      // henüz bilmediği için tile'lar yanlış hesaplanabiliyor; bir sonraki
      // tick'te yeniden ölçtürüyoruz.
      setTimeout(() => map.invalidateSize(), 0);
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[10998] bg-black/70" />

      <div className="fixed inset-0 z-[10999] flex items-center justify-center px-4 py-8">
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

          <h2 className="pr-8 text-xl font-semibold tracking-tight text-foreground">
            Harita Noktası Seç
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Haritaya tıklayarak bir nokta seç. Tekrar tıklarsan marker yeni
            noktaya taşınır.
          </p>

          <div className="mt-4 h-72 w-full overflow-hidden rounded-xl border border-border">
            <div ref={mapContainerRef} className="h-full w-full" />
          </div>

          <p className="mt-2 text-xs text-muted">
            {point
              ? `${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`
              : "Henüz nokta seçilmedi."}
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              İptal
            </button>
            <button
              type="button"
              disabled={!point}
              onClick={() => point && onConfirm(point)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              Noktayı Kullan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
